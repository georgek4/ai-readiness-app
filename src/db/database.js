import Dexie from 'dexie';
import { cloudSaveAssessment, cloudSaveResponses, cloudGetAllAssessments, getSupabaseConfig } from './supabase';

export const db = new Dexie('AIReadinessDB');

db.version(1).stores({
  assessments: '++id, department, role, timestamp, overallScore, tier, orgName, anonymousId',
  responses: '++id, assessmentId, level, questionId, answer, score',
});

// ── Primary storage: localStorage (always works, always consistent) ──
// IndexedDB is used as secondary/legacy; localStorage is the source of truth.
const LS_ASSESSMENTS_KEY = 'ai_readiness_assessments';
const LS_RESPONSES_KEY = 'ai_readiness_responses';

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

// Check if IndexedDB is available (for legacy compat, not critical)
let idbAvailable = false;
const dbReady = (async () => {
  try {
    await db.open();
    idbAvailable = true;
    console.log('[DB] IndexedDB available');

    // One-time migration: copy any IndexedDB-only data to localStorage
    try {
      const idbAssessments = await db.assessments.toArray();
      if (idbAssessments.length > 0) {
        const lsAssessments = getLSAssessments();
        const lsKeys = new Set(lsAssessments.map(a => `${a.anonymousId}_${a.timestamp}`));
        let added = 0;
        idbAssessments.forEach(a => {
          const key = `${a.anonymousId}_${a.timestamp}`;
          if (!lsKeys.has(key)) {
            lsAssessments.push(a);
            added++;
          }
        });
        if (added > 0) {
          setLSAssessments(lsAssessments);
          console.log(`[DB] Migrated ${added} assessments from IndexedDB to localStorage`);
        }
      }
    } catch (migErr) {
      console.warn('[DB] IndexedDB migration failed (non-critical):', migErr);
    }
  } catch (err) {
    console.warn('[DB] IndexedDB not available:', err);
  }
})();

function getNextId(existingAssessments) {
  if (existingAssessments.length === 0) return 1;
  return Math.max(...existingAssessments.map(a => a.id || 0)) + 1;
}

function getNextAnonymousId(existingAssessments) {
  const maxNum = existingAssessments.reduce((max, a) => {
    const match = (a.anonymousId || '').match(/User_(\d+)/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 0);
  return `User_${String(maxNum + 1).padStart(3, '0')}`;
}

export async function saveAssessment(data) {
  await dbReady;

  // localStorage is the source of truth — always write here
  const all = getLSAssessments();
  const localId = getNextId(all);
  const anonymousId = getNextAnonymousId(all);

  const record = {
    ...data,
    id: localId,
    anonymousId,
    timestamp: new Date().toISOString(),
  };

  all.push(record);
  setLSAssessments(all);
  console.log('[DB] Assessment saved to localStorage:', localId, anonymousId);

  // Also write to IndexedDB for legacy compatibility (non-blocking)
  if (idbAvailable) {
    try {
      await db.assessments.add({ ...record });
    } catch (err) {
      console.warn('[DB] IndexedDB secondary save failed (non-critical):', err);
    }
  }

  // Cloud sync (fire-and-forget)
  if (getSupabaseConfig()) {
    cloudSaveAssessment(record).catch(err => console.warn('[Cloud] Sync failed:', err));
  }

  return { id: localId, anonymousId };
}

export async function saveResponses(assessmentId, responses) {
  await dbReady;
  const items = responses.map(r => ({ ...r, assessmentId }));

  // localStorage is the source of truth
  const all = getLSResponses();
  let nextId = all.length > 0 ? Math.max(...all.map(r => r.id || 0)) + 1 : 1;
  items.forEach(item => { item.id = nextId++; });
  all.push(...items);
  setLSResponses(all);
  console.log('[DB] Responses saved to localStorage:', items.length);

  // Also write to IndexedDB (non-blocking)
  if (idbAvailable) {
    try {
      await db.responses.bulkAdd(items);
    } catch (err) {
      console.warn('[DB] IndexedDB response save failed (non-critical):', err);
    }
  }

  // Cloud sync (fire-and-forget)
  if (getSupabaseConfig()) {
    cloudSaveResponses(assessmentId, responses).catch(err => console.warn('[Cloud] Response sync failed:', err));
  }
}

export async function getAssessment(id) {
  await dbReady;

  // Check localStorage first (source of truth)
  const lsResult = getLSAssessments().find(a => a.id === id);
  if (lsResult) return lsResult;

  // Fallback: check IndexedDB for legacy data
  if (idbAvailable) {
    try {
      const idbResult = await db.assessments.get(id);
      if (idbResult) return idbResult;
    } catch (err) {
      console.warn('[DB] IndexedDB getAssessment failed:', err);
    }
  }

  return null;
}

export async function getAllAssessments({ includeCloud = false } = {}) {
  await dbReady;

  // localStorage is the primary source
  let all = getLSAssessments();
  console.log(`[DB] getAllAssessments: ${all.length} from localStorage`);

  // Merge any IndexedDB-only data (legacy)
  if (idbAvailable) {
    try {
      const idbResults = await db.assessments.toArray();
      if (idbResults.length > 0) {
        const existingKeys = new Set(all.map(a => `${a.anonymousId}_${a.timestamp}`));
        let added = 0;
        idbResults.forEach(a => {
          const key = `${a.anonymousId}_${a.timestamp}`;
          if (!existingKeys.has(key)) {
            all.push(a);
            existingKeys.add(key);
            added++;
          }
        });
        if (added > 0) {
          console.log(`[DB] Merged ${added} additional assessments from IndexedDB`);
        }
      }
    } catch (err) {
      console.warn('[DB] IndexedDB read failed, using localStorage only:', err);
    }
  }

  // If cloud is configured, merge cloud data
  if (includeCloud && getSupabaseConfig()) {
    try {
      const cloudData = await cloudGetAllAssessments();
      if (cloudData.length > 0) {
        console.log('[DB] Fetched', cloudData.length, 'cloud assessments');
        const existingKeys = new Set(all.map(a => `${a.anonymousId}_${a.timestamp}`));
        let added = 0;
        cloudData.forEach(ca => {
          const key = `${ca.anonymousId}_${ca.timestamp}`;
          if (!existingKeys.has(key)) {
            all.push(ca);
            existingKeys.add(key);
            added++;
          }
        });
        console.log(`[DB] Added ${added} new cloud assessments (${cloudData.length - added} already local)`);
      }
    } catch (err) {
      console.warn('[DB] Cloud fetch failed, using local only:', err);
    }
  }

  console.log(`[DB] getAllAssessments total: ${all.length}`);
  return all;
}

export async function getAssessmentResponses(assessmentId) {
  await dbReady;

  // localStorage first
  const lsResults = getLSResponses().filter(r => r.assessmentId === assessmentId);
  if (lsResults.length > 0) return lsResults;

  // Fallback to IndexedDB
  if (idbAvailable) {
    try {
      return await db.responses.where('assessmentId').equals(assessmentId).toArray();
    } catch (err) {
      console.warn('[DB] getAssessmentResponses failed:', err);
    }
  }

  return [];
}

export async function getAssessmentsByOrg(orgName) {
  await dbReady;
  const all = await getAllAssessments();
  return all.filter(a => a.orgName === orgName);
}

export async function getAssessmentsByDepartment(department) {
  await dbReady;
  const all = await getAllAssessments();
  return all.filter(a => a.department === department);
}

export async function deleteAssessment(id) {
  await dbReady;

  // Remove from localStorage
  const lsAssessments = getLSAssessments().filter(a => a.id !== id);
  setLSAssessments(lsAssessments);
  const lsResponses = getLSResponses().filter(r => r.assessmentId !== id);
  setLSResponses(lsResponses);

  // Also remove from IndexedDB
  if (idbAvailable) {
    try {
      await db.responses.where('assessmentId').equals(id).delete();
      await db.assessments.delete(id);
    } catch (err) {
      console.warn('[DB] IndexedDB deleteAssessment failed:', err);
    }
  }
}

export async function clearAllData() {
  await dbReady;

  // Clear localStorage
  localStorage.removeItem(LS_ASSESSMENTS_KEY);
  localStorage.removeItem(LS_RESPONSES_KEY);

  // Clear IndexedDB
  if (idbAvailable) {
    try {
      await db.responses.clear();
      await db.assessments.clear();
    } catch (err) {
      console.warn('[DB] IndexedDB clearAllData failed:', err);
    }
  }
}

export async function exportData() {
  await dbReady;
  const assessments = await getAllAssessments();
  const responses = getLSResponses();
  const anonymized = assessments.map(({ name, ...rest }) => rest);
  return { assessments: anonymized, responses, exportDate: new Date().toISOString(), version: 1 };
}

export async function importData(data) {
  await dbReady;

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

  // Also try IndexedDB for legacy compat
  if (idbAvailable) {
    try {
      if (data.assessments) await db.assessments.bulkAdd(data.assessments);
      if (data.responses) await db.responses.bulkAdd(data.responses);
    } catch (err) {
      console.warn('[DB] IndexedDB importData failed (data saved to localStorage):', err);
    }
  }
}
