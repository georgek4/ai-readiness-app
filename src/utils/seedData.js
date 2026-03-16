/**
 * Seed Data Generator — Realistic anonymized SaaS AI readiness assessment data
 * Based on general industry trends in AI adoption across SaaS departments (2024-2026)
 *
 * Writes DIRECTLY to localStorage (guaranteed to work in all browsers),
 * then also attempts cloud sync. No dependency on IndexedDB/Dexie.
 */

import { getSupabaseConfig } from '../db/supabase';
import { createClient } from '@supabase/supabase-js';

// Department-level score profiles based on real SaaS AI adoption trends
const DEPT_PROFILES = {
  marketing: {
    means: [72, 68, 55, 60, 58, 42], variance: 14,
    roles: ['CMO', 'VP Marketing', 'Director of Demand Gen', 'Content Marketing Manager', 'Product Marketing Manager', 'Digital Marketing Manager', 'Marketing Operations Manager', 'SEO/SEM Specialist', 'Social Media Manager', 'Marketing Analyst'],
    count: 8,
  },
  sales: {
    means: [70, 72, 48, 55, 52, 35], variance: 16,
    roles: ['VP Sales', 'Sales Director', 'Enterprise AE', 'Mid-Market AE', 'SDR Manager', 'SDR', 'Sales Operations Manager', 'Account Manager'],
    count: 10,
  },
  presales: {
    means: [75, 70, 62, 65, 60, 55], variance: 12,
    roles: ['VP Solutions Engineering', 'Senior Solutions Engineer', 'Solutions Engineer', 'Solutions Architect', 'Technical Consultant'],
    count: 5,
  },
  professional_services: {
    means: [68, 58, 52, 58, 50, 45], variance: 14,
    roles: ['VP Professional Services', 'Engagement Manager', 'Senior Consultant', 'Implementation Consultant', 'Project Manager', 'Technical Architect'],
    count: 6,
  },
  value_engineering: {
    means: [78, 72, 65, 72, 68, 58], variance: 10,
    roles: ['VP Value Engineering', 'Senior Value Engineer', 'Value Consultant', 'Business Value Analyst'],
    count: 3,
  },
  product_management: {
    means: [82, 78, 68, 75, 72, 55], variance: 11,
    roles: ['VP Product', 'Senior Product Manager', 'Product Manager', 'Associate PM', 'Product Analyst', 'Technical PM'],
    count: 6,
  },
  engineering: {
    means: [80, 82, 78, 68, 70, 75], variance: 12,
    roles: ['VP Engineering', 'Engineering Manager', 'Staff Engineer', 'Senior Engineer', 'Software Engineer', 'DevOps Engineer', 'QA Engineer', 'Data Engineer'],
    count: 12,
  },
  product_design: {
    means: [76, 70, 58, 65, 62, 48], variance: 13,
    roles: ['VP Design', 'Design Manager', 'Senior Product Designer', 'Product Designer', 'UX Researcher', 'Design System Lead'],
    count: 4,
  },
  customer_education: {
    means: [74, 66, 55, 60, 58, 40], variance: 13,
    roles: ['Director of Education', 'Senior Technical Writer', 'Curriculum Developer', 'Training Specialist', 'Knowledge Base Manager'],
    count: 4,
  },
  demo_engineering: {
    means: [78, 75, 68, 62, 65, 62], variance: 11,
    roles: ['Demo Engineering Manager', 'Senior Demo Engineer', 'Demo Engineer', 'Demo Automation Specialist'],
    count: 3,
  },
  industry_strategy: {
    means: [80, 65, 55, 78, 72, 48], variance: 12,
    roles: ['VP Industry Strategy', 'Industry Principal', 'Senior Industry Strategist', 'Industry Analyst'],
    count: 3,
  },
  revenue_operations: {
    means: [75, 74, 62, 68, 65, 55], variance: 13,
    roles: ['VP Revenue Operations', 'RevOps Manager', 'Sales Analytics Manager', 'Salesforce Admin', 'Data Analyst', 'Forecasting Analyst'],
    count: 5,
  },
  enablement: {
    means: [73, 68, 55, 62, 60, 42], variance: 14,
    roles: ['VP Enablement', 'Enablement Manager', 'Sales Enablement Specialist', 'Onboarding Specialist', 'Enablement Content Lead'],
    count: 4,
  },
  customer_success: {
    means: [76, 72, 58, 66, 62, 40], variance: 13,
    roles: ['VP Customer Success', 'Director of Customer Success', 'Senior CSM', 'Customer Success Manager', 'Digital CS Manager', 'Renewal Manager'],
    count: 7,
  },
  support: {
    means: [70, 74, 55, 52, 55, 45], variance: 15,
    roles: ['VP Support', 'Support Manager', 'Senior Support Engineer', 'Support Engineer', 'Technical Support Specialist', 'Escalation Manager'],
    count: 8,
  },
};

const DIMENSION_KEYS = ['awareness', 'currentUsage', 'skillDepth', 'strategicThinking', 'futureReadiness', 'technicalFluency'];

const LEVEL_WEIGHTS = { awareness: 0.12, currentUsage: 0.20, skillDepth: 0.20, strategicThinking: 0.18, futureReadiness: 0.12, technicalFluency: 0.18 };

const TIER_THRESHOLDS = [
  { min: 81, name: 'Transformer' },
  { min: 61, name: 'Innovator' },
  { min: 41, name: 'Adopter' },
  { min: 21, name: 'Experimenter' },
  { min: 0, name: 'Analog' },
];

function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

function gaussian() {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function generateScores(means, variance) {
  const scores = {};
  means.forEach((mean, i) => {
    scores[DIMENSION_KEYS[i]] = clamp(Math.round(mean + gaussian() * variance), 5, 100);
  });
  return scores;
}

function calcOverall(scores) {
  let weighted = 0;
  DIMENSION_KEYS.forEach(key => { weighted += (scores[key] || 0) * LEVEL_WEIGHTS[key]; });
  return Math.round(weighted * 10) / 10;
}

function getTier(score) {
  for (const t of TIER_THRESHOLDS) {
    if (score >= t.min) return t.name;
  }
  return 'Analog';
}

function randomDate(daysBack = 90) {
  const d = new Date(Date.now() - Math.floor(Math.random() * daysBack) * 86400000);
  d.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60));
  return d.toISOString();
}

function calcXP(scores) {
  return Math.round(Object.values(scores).reduce((a, b) => a + b, 0) * 2.5 + Math.random() * 200);
}

function calcBadges(scores) {
  const badges = [];
  if (scores.awareness >= 50) badges.push('AI Explorer');
  if (scores.currentUsage >= 50) badges.push('AI User');
  if (scores.skillDepth >= 50) badges.push('AI Practitioner');
  if (scores.strategicThinking >= 50) badges.push('AI Thinker');
  if (scores.futureReadiness >= 50) badges.push('AI Strategist');
  if (scores.technicalFluency >= 50) badges.push('AI Technician');
  if (Object.values(scores).every(s => s >= 70)) badges.push('AI Champion');
  return badges;
}

function makeGapAnalysis(department, scores) {
  const avg = Object.values(scores).reduce((a, b) => a + b, 0) / 6;
  const currentMaturity = Math.round((1 + (avg / 100) * 4) * 10) / 10;
  const targets = {
    marketing: 3.5, sales: 3.0, presales: 4.0, professional_services: 3.5,
    value_engineering: 4.0, product_management: 4.5, engineering: 4.5,
    product_design: 3.5, customer_education: 3.5, demo_engineering: 4.0,
    industry_strategy: 4.0, revenue_operations: 4.0, enablement: 3.5,
    customer_success: 4.0, support: 4.5,
  };
  const targetMaturity = targets[department] || 3.5;
  const gap = Math.round((targetMaturity - currentMaturity) * 10) / 10;
  return { department, currentMaturity, targetMaturity, gap, gapSeverity: gap > 1.5 ? 'critical' : gap > 0.75 ? 'moderate' : 'low', transformation: '' };
}

function makeRoadmap(scores) {
  const roadmap = { thirtyDays: [], sixtyDays: [], sixMonths: [] };
  if (scores.awareness < 60) { roadmap.thirtyDays.push('Explore AI tools relevant to your role'); }
  if (scores.currentUsage < 60) { roadmap.sixtyDays.push('Integrate AI tools into at least 3 regular workflows'); }
  if (scores.skillDepth < 60) { roadmap.sixtyDays.push('Take an advanced prompt engineering course'); }
  if (scores.strategicThinking < 60) { roadmap.sixMonths.push('Map department activities to H/A/R framework'); }
  if (scores.futureReadiness < 60) { roadmap.sixMonths.push('Develop skills in AI oversight and agent management'); }
  if (scores.technicalFluency < 60) { roadmap.thirtyDays.push('Learn prompt engineering fundamentals'); }
  return roadmap;
}

/**
 * Generate and save seed data.
 * Writes directly to localStorage (always works) + attempts Supabase cloud sync.
 */
export async function seedSampleData(onProgress) {
  try {
    // 1. Generate all assessments
    const assessments = [];
    let userCounter = 1;

    for (const [deptId, profile] of Object.entries(DEPT_PROFILES)) {
      for (let i = 0; i < profile.count; i++) {
        const scores = generateScores(profile.means, profile.variance);
        const overallScore = calcOverall(scores);
        const tier = getTier(overallScore);
        const role = profile.roles[Math.floor(Math.random() * profile.roles.length)];
        const anonymousId = `User_${String(userCounter).padStart(3, '0')}`;
        const id = userCounter;
        userCounter++;

        assessments.push({
          id,
          anonymousId,
          name: '',
          department: deptId,
          role,
          orgName: 'SaaS Corp',
          yearsExperience: ['0-2', '2-5', '5-10', '10+'][Math.floor(Math.random() * 4)],
          scores,
          overallScore,
          tier,
          xpTotal: calcXP(scores),
          badges: calcBadges(scores),
          gapAnalysis: makeGapAnalysis(deptId, scores),
          roadmap: makeRoadmap(scores),
          timestamp: randomDate(90),
        });
      }
    }

    const total = assessments.length;
    console.log(`[Seed] Generated ${total} assessments`);

    // 2. Save directly to localStorage (guaranteed to work)
    const LS_KEY = 'ai_readiness_assessments';
    let existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    } catch { existing = []; }

    // Assign IDs that don't conflict with existing
    const maxExistingId = existing.length > 0 ? Math.max(...existing.map(a => a.id || 0)) : 0;
    assessments.forEach((a, idx) => {
      a.id = maxExistingId + idx + 1;
    });

    existing.push(...assessments);
    localStorage.setItem(LS_KEY, JSON.stringify(existing));
    console.log(`[Seed] Saved ${total} assessments to localStorage`);

    if (onProgress) onProgress(total, total);

    // 3. Also try cloud sync (fire-and-forget, don't block)
    const config = getSupabaseConfig();
    if (config?.url && config?.anonKey) {
      try {
        const client = createClient(config.url, config.anonKey);
        let cloudSaved = 0;
        for (const a of assessments) {
          try {
            const { error } = await client.from('assessments').insert({
              anonymous_id: a.anonymousId,
              name: '',
              department: a.department,
              role: a.role,
              org_name: a.orgName,
              years_experience: a.yearsExperience,
              scores: a.scores,
              overall_score: a.overallScore,
              tier: a.tier,
              xp_total: a.xpTotal,
              badges: a.badges,
              gap_analysis: a.gapAnalysis,
              roadmap: a.roadmap,
            });
            if (!error) cloudSaved++;
          } catch { /* ignore individual cloud failures */ }
        }
        console.log(`[Seed] Cloud sync: ${cloudSaved}/${total}`);
      } catch (err) {
        console.warn('[Seed] Cloud sync failed (data saved locally):', err);
      }
    }

    return {
      ok: true,
      message: `Seeded ${total} assessments across ${Object.keys(DEPT_PROFILES).length} departments`,
      total,
      saved: total,
      errors: 0,
    };
  } catch (err) {
    console.error('[Seed] Fatal error:', err);
    return {
      ok: false,
      message: `Failed to seed data: ${err.message || String(err)}`,
      total: 0,
      saved: 0,
      errors: 1,
    };
  }
}
