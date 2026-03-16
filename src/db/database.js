import Dexie from 'dexie';

export const db = new Dexie('AIReadinessDB');

db.version(1).stores({
  assessments: '++id, department, role, timestamp, overallScore, tier, orgName, anonymousId',
  responses: '++id, assessmentId, level, questionId, answer, score',
});

let anonymousCounter = null;

async function getNextAnonymousId() {
  if (anonymousCounter === null) {
    const count = await db.assessments.count();
    anonymousCounter = count;
  }
  anonymousCounter++;
  return `User_${String(anonymousCounter).padStart(3, '0')}`;
}

export async function saveAssessment(data) {
  const anonymousId = await getNextAnonymousId();
  const id = await db.assessments.add({
    ...data,
    anonymousId,
    timestamp: new Date().toISOString(),
  });
  return { id, anonymousId };
}

export async function saveResponses(assessmentId, responses) {
  const items = responses.map(r => ({ ...r, assessmentId }));
  await db.responses.bulkAdd(items);
}

export async function getAssessment(id) {
  return db.assessments.get(id);
}

export async function getAllAssessments() {
  return db.assessments.toArray();
}

export async function getAssessmentResponses(assessmentId) {
  return db.responses.where('assessmentId').equals(assessmentId).toArray();
}

export async function getAssessmentsByOrg(orgName) {
  return db.assessments.where('orgName').equals(orgName).toArray();
}

export async function getAssessmentsByDepartment(department) {
  return db.assessments.where('department').equals(department).toArray();
}

export async function deleteAssessment(id) {
  await db.responses.where('assessmentId').equals(id).delete();
  await db.assessments.delete(id);
}

export async function clearAllData() {
  await db.responses.clear();
  await db.assessments.clear();
  anonymousCounter = 0;
}

export async function exportData() {
  const assessments = await db.assessments.toArray();
  const responses = await db.responses.toArray();
  const anonymized = assessments.map(({ name, ...rest }) => rest);
  return { assessments: anonymized, responses, exportDate: new Date().toISOString(), version: 1 };
}

export async function importData(data) {
  if (data.assessments) {
    await db.assessments.bulkAdd(data.assessments);
  }
  if (data.responses) {
    await db.responses.bulkAdd(data.responses);
  }
}
