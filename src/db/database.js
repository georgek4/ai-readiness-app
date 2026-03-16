import Dexie from 'dexie';
import { cloudSaveAssessment, cloudSaveResponses, cloudGetAllAssessments, getSupabaseConfig } from './supabase';

export const db = new Dexie('AIReadinessDB');

db.version(1).stores({
  assessments: '++id, department, role, timestamp, overallScore, tier, orgName, anonymousId',
  responses: '++id, assessmentId, level, questionId, answer, score',
});

// ── Fallback: localStorage-based storage if IndexedDB fails ──
const LS_ASSESSMENTS_KEY = 'ai_readiness_assessments';
const LS_RESPONSES_KEY = 'ai_readiness_responses';
let useLocalStorageFallback = false;

function getLSAssessments() {
  try {
    return JSON.parse(localStorage.getItem(LS_ASSESSMENTS_KEY) || '[]');
  } catch { return []; }
}

function setLSAssessments(data) {
  localStorage.setItem(LS_ASSESSMENTS_KEY, JSON.stringify(data));
}

function getLSResponses() {
  try {
    return JSON.parse(localStorage.getItem(LS_RESPONSES_KEY) || '[]');
  } catch { return []; }
}

function setLSResponses(data) {
  localStorage.setItem(LS_RESPONSES_KEY, JSON.stringify(data));
}

// Check if IndexedDB is actually working
async function checkIndexedDB() {
  try {
    await db.open();
    // Quick write/read test
    return true;
  } catch (err) {
    console.warn('IndexedDB not available, falling back to localStorage:', err);
    useLocalStorageFallback = true;
    return false;
  }
}

// Initialize on load
const dbReady = checkIndexedDB();

let anonymousCounter = null;

async function getNextAnonymousId() {
  await dbReady;
  if (anonymousCounter === null) {
    if (useLocalStorageFallback) {
      anonymousCounter = getLSAssessments().length;
    } else {
      const count = await db.assessments.count();
      anonymousCounter = count;
    }
  }
  anonymousCounter++;
  return `User_${String(anonymousCounter).padStart(3, '0')}`;
}

export async function saveAssessment(data) {
  await dbReady;
  const anonymousId = await getNextAnonymousId();
  const record = {
    ...data,
    anonymousId,
    timestamp: new Date().toISOString(),
  };

  let localId;

  if (useLocalStorageFallback) {
    const all = getLSAssessments();
    localId = all.length > 0 ? Math.max(...all.map(a => a.id || 0)) + 1 : 1;
    record.id = localId;
    all.push(record);
    setLSAssessments(all);
    console.log('[DB-LS] Assessment saved:', localId);
  } else {
    try {
      localId = await db.assessments.add(record);
      console.log('[DB] Assessment saved to IndexedDB:', localId);
    } catch (err) {
      console.error('[DB] IndexedDB save failed, falling back to localStorage:', err);
      const all = getLSAssessments();
      localId = all.length > 0 ? Math.max(...all.map(a => a.id || 0)) + 1 : 1;
      record.id = localId;
      all.push(record);
      setLSAssessments(all);
    }
  }

  // Cloud sync (fire-and-forget, don't block the user)
  if (getSupabaseConfig()) {
    cloudSaveAssessment(record).catch(err => console.warn('[Cloud] Sync failed:', err));
  }

  return { id: localId, anonymousId };
}

export async function saveResponses(assessmentId, responses) {
  await dbReady;
  const items = responses.map(r => ({ ...r, assessmentId }));

  if (useLocalStorageFallback) {
    const all = getLSResponses();
    let nextId = all.length > 0 ? Math.max(...all.map(r => r.id || 0)) + 1 : 1;
    items.forEach(item => { item.id = nextId++; });
    all.push(...items);
    setLSResponses(all);
    console.log('[DB-LS] Responses saved:', items.length);
  } else {
    try {
      await db.responses.bulkAdd(items);
      console.log('[DB] Responses saved to IndexedDB:', items.length);
    } catch (err) {
      console.error('[DB] IndexedDB response save failed, falling back to localStorage:', err);
      const all = getLSResponses();
      let nextId = all.length > 0 ? Math.max(...all.map(r => r.id || 0)) + 1 : 1;
      items.forEach(item => { item.id = nextId++; });
      all.push(...items);
      setLSResponses(all);
    }
  }

  // Cloud sync responses (fire-and-forget)
  // Note: cloud assessment ID may differ from local ID; we use local ID as reference
  if (getSupabaseConfig()) {
    cloudSaveResponses(assessmentId, responses).catch(err => console.warn('[Cloud] Response sync failed:', err));
  }
}

export async function getAssessment(id) {
  await dbReady;
  if (useLocalStorageFallback) {
    return getLSAssessments().find(a => a.id === id) || null;
  }

  try {
    const result = await db.assessments.get(id);
    if (result) return result;
    // Fallback: check localStorage too (in case some were saved there)
    const lsResult = getLSAssessments().find(a => a.id === id);
    return lsResult || null;
  } catch (err) {
    console.error('[DB] getAssessment failed:', err);
    return getLSAssessments().find(a => a.id === id) || null;
  }
}

export async function getAllAssessments({ includeCloud = false } = {}) {
  await dbReady;

  // Get local assessments
  let local = [];
  if (useLocalStorageFallback) {
    local = getLSAssessments();
  } else {
    try {
      const idbResults = await db.assessments.toArray();
      const lsResults = getLSAssessments();
      local = [...idbResults];
      const idbIds = new Set(idbResults.map(a => a.id));
      lsResults.forEach(a => {
        if (!idbIds.has(a.id)) local.push(a);
      });
    } catch (err) {
      console.error('[DB] getAllAssessments failed:', err);
      local = getLSAssessments();
    }
  }

  // If cloud is configured and requested, merge cloud data
  if (includeCloud && getSupabaseConfig()) {
    try {
      const cloudData = await cloudGetAllAssessments();
      if (cloudData.length > 0) {
        console.log('[DB] Fetched', cloudData.length, 'cloud assessments');
        // Cloud data takes priority for the dashboard — it has ALL users' data
        // Deduplicate by anonymousId + timestamp
        const localKeys = new Set(local.map(a => `${a.anonymousId}_${a.timestamp}`));
        cloudData.forEach(ca => {
          const key = `${ca.anonymousId}_${ca.timestamp}`;
          if (!localKeys.has(key)) {
            local.push(ca);
          }
        });
      }
    } catch (err) {
      console.warn('[DB] Cloud fetch failed, using local only:', err);
    }
  }

  return local;
}

export async function getAssessmentResponses(assessmentId) {
  await dbReady;
  if (useLocalStorageFallback) {
    return getLSResponses().filter(r => r.assessmentId === assessmentId);
  }

  try {
    const results = await db.responses.where('assessmentId').equals(assessmentId).toArray();
    if (results.length > 0) return results;
    // Fallback check
    return getLSResponses().filter(r => r.assessmentId === assessmentId);
  } catch (err) {
    console.error('[DB] getAssessmentResponses failed:', err);
    return getLSResponses().filter(r => r.assessmentId === assessmentId);
  }
}

export async function getAssessmentsByOrg(orgName) {
  await dbReady;
  if (useLocalStorageFallback) {
    return getLSAssessments().filter(a => a.orgName === orgName);
  }

  try {
    return db.assessments.where('orgName').equals(orgName).toArray();
  } catch (err) {
    return getLSAssessments().filter(a => a.orgName === orgName);
  }
}

export async function getAssessmentsByDepartment(department) {
  await dbReady;
  if (useLocalStorageFallback) {
    return getLSAssessments().filter(a => a.department === department);
  }

  try {
    return db.assessments.where('department').equals(department).toArray();
  } catch (err) {
    return getLSAssessments().filter(a => a.department === department);
  }
}

export async function deleteAssessment(id) {
  await dbReady;
  // Remove from localStorage
  const lsAssessments = getLSAssessments().filter(a => a.id !== id);
  setLSAssessments(lsAssessments);
  const lsResponses = getLSResponses().filter(r => r.assessmentId !== id);
  setLSResponses(lsResponses);

  if (!useLocalStorageFallback) {
    try {
      await db.responses.where('assessmentId').equals(id).delete();
      await db.assessments.delete(id);
    } catch (err) {
      console.error('[DB] deleteAssessment failed:', err);
    }
  }
}

export async function clearAllData() {
  await dbReady;
  // Clear localStorage
  localStorage.removeItem(LS_ASSESSMENTS_KEY);
  localStorage.removeItem(LS_RESPONSES_KEY);
  anonymousCounter = 0;

  if (!useLocalStorageFallback) {
    try {
      await db.responses.clear();
      await db.assessments.clear();
    } catch (err) {
      console.error('[DB] clearAllData failed:', err);
    }
  }
}

export async function exportData() {
  await dbReady;
  const assessments = await getAllAssessments();
  const responses = useLocalStorageFallback
    ? getLSResponses()
    : await db.responses.toArray();
  const anonymized = assessments.map(({ name, ...rest }) => rest);
  return { assessments: anonymized, responses, exportDate: new Date().toISOString(), version: 1 };
}

export async function importData(data) {
  await dbReady;
  if (useLocalStorageFallback) {
    if (data.assessments) {
      const existing = getLSAssessments();
      existing.push(...data.assessments);
      setLSAssessments(existing);
    }
    if (data.responses) {
      const existing = getLSResponses();
      existing.push(...data.responses);
      setLSResponses(existing);
    }
    return;
  }

  try {
    if (data.assessments) {
      await db.assessments.bulkAdd(data.assessments);
    }
    if (data.responses) {
      await db.responses.bulkAdd(data.responses);
    }
  } catch (err) {
    console.error('[DB] importData failed, using localStorage:', err);
    if (data.assessments) {
      const existing = getLSAssessments();
      existing.push(...data.assessments);
      setLSAssessments(existing);
    }
    if (data.responses) {
      const existing = getLSResponses();
      existing.push(...data.responses);
      setLSResponses(existing);
    }
  }
}
