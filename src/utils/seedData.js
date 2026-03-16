/**
 * Seed Data Generator — Realistic anonymized SaaS AI readiness assessment data
 * Based on general industry trends in AI adoption across SaaS departments (2024-2026)
 */

import { cloudSaveAssessment, getSupabaseClient } from '../db/supabase';
import { calculateOverallScore } from './scoring';
import { getTierForScore } from '../data/northStar';

// Department-level score profiles based on real SaaS AI adoption trends
// Each entry: [awareness, currentUsage, skillDepth, strategicThinking, futureReadiness, technicalFluency]
// Ranges represent mean ± variance for that department
const DEPT_PROFILES = {
  marketing: {
    means: [72, 68, 55, 60, 58, 42],
    variance: 14,
    roles: ['CMO', 'VP Marketing', 'Director of Demand Gen', 'Content Marketing Manager', 'Product Marketing Manager', 'Digital Marketing Manager', 'Marketing Operations Manager', 'SEO/SEM Specialist', 'Social Media Manager', 'Marketing Analyst'],
    count: 8,
  },
  sales: {
    means: [70, 72, 48, 55, 52, 35],
    variance: 16,
    roles: ['VP Sales', 'Sales Director', 'Enterprise AE', 'Mid-Market AE', 'SDR Manager', 'SDR', 'Sales Operations Manager', 'Account Manager'],
    count: 10,
  },
  presales: {
    means: [75, 70, 62, 65, 60, 55],
    variance: 12,
    roles: ['VP Solutions Engineering', 'Senior Solutions Engineer', 'Solutions Engineer', 'Solutions Architect', 'Technical Consultant'],
    count: 5,
  },
  professional_services: {
    means: [68, 58, 52, 58, 50, 45],
    variance: 14,
    roles: ['VP Professional Services', 'Engagement Manager', 'Senior Consultant', 'Implementation Consultant', 'Project Manager', 'Technical Architect'],
    count: 6,
  },
  value_engineering: {
    means: [78, 72, 65, 72, 68, 58],
    variance: 10,
    roles: ['VP Value Engineering', 'Senior Value Engineer', 'Value Consultant', 'Business Value Analyst'],
    count: 3,
  },
  product_management: {
    means: [82, 78, 68, 75, 72, 55],
    variance: 11,
    roles: ['VP Product', 'Senior Product Manager', 'Product Manager', 'Associate PM', 'Product Analyst', 'Technical PM'],
    count: 6,
  },
  engineering: {
    means: [80, 82, 78, 68, 70, 75],
    variance: 12,
    roles: ['VP Engineering', 'Engineering Manager', 'Staff Engineer', 'Senior Engineer', 'Software Engineer', 'DevOps Engineer', 'QA Engineer', 'Data Engineer'],
    count: 12,
  },
  product_design: {
    means: [76, 70, 58, 65, 62, 48],
    variance: 13,
    roles: ['VP Design', 'Design Manager', 'Senior Product Designer', 'Product Designer', 'UX Researcher', 'Design System Lead'],
    count: 4,
  },
  customer_education: {
    means: [74, 66, 55, 60, 58, 40],
    variance: 13,
    roles: ['Director of Education', 'Senior Technical Writer', 'Curriculum Developer', 'Training Specialist', 'Knowledge Base Manager'],
    count: 4,
  },
  demo_engineering: {
    means: [78, 75, 68, 62, 65, 62],
    variance: 11,
    roles: ['Demo Engineering Manager', 'Senior Demo Engineer', 'Demo Engineer', 'Demo Automation Specialist'],
    count: 3,
  },
  industry_strategy: {
    means: [80, 65, 55, 78, 72, 48],
    variance: 12,
    roles: ['VP Industry Strategy', 'Industry Principal', 'Senior Industry Strategist', 'Industry Analyst'],
    count: 3,
  },
  revenue_operations: {
    means: [75, 74, 62, 68, 65, 55],
    variance: 13,
    roles: ['VP Revenue Operations', 'RevOps Manager', 'Sales Analytics Manager', 'Salesforce Admin', 'Data Analyst', 'Forecasting Analyst'],
    count: 5,
  },
  enablement: {
    means: [73, 68, 55, 62, 60, 42],
    variance: 14,
    roles: ['VP Enablement', 'Enablement Manager', 'Sales Enablement Specialist', 'Onboarding Specialist', 'Enablement Content Lead'],
    count: 4,
  },
};

const DIMENSION_KEYS = ['awareness', 'currentUsage', 'skillDepth', 'strategicThinking', 'futureReadiness', 'technicalFluency'];

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function gaussian() {
  // Box-Muller transform for normal distribution
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function generateScores(means, variance) {
  const scores = {};
  means.forEach((mean, i) => {
    const noise = gaussian() * variance;
    scores[DIMENSION_KEYS[i]] = clamp(Math.round(mean + noise), 5, 100);
  });
  return scores;
}

function randomDate(daysBack = 90) {
  const now = new Date();
  const offset = Math.floor(Math.random() * daysBack);
  const d = new Date(now.getTime() - offset * 86400000);
  // Add some hour variation
  d.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60));
  return d.toISOString();
}

function generateRoadmap(scores) {
  const roadmap = { thirtyDays: [], sixtyDays: [], sixMonths: [] };
  if (scores.awareness < 60) {
    roadmap.thirtyDays.push('Explore AI tools relevant to your role');
    roadmap.thirtyDays.push('Complete an introductory AI literacy course');
  }
  if (scores.currentUsage < 60) {
    roadmap.thirtyDays.push('Start using AI for one routine task this week');
    roadmap.sixtyDays.push('Integrate AI tools into at least 3 regular workflows');
  }
  if (scores.skillDepth < 60) {
    roadmap.sixtyDays.push('Take an advanced prompt engineering course');
    roadmap.sixtyDays.push('Practice AI tool usage daily for 30 days');
  }
  if (scores.strategicThinking < 60) {
    roadmap.sixMonths.push('Map department activities to H/A/R framework');
    roadmap.sixMonths.push('Build a business case for AI tooling');
  }
  if (scores.futureReadiness < 60) {
    roadmap.sixMonths.push('Develop skills in AI oversight and agent management');
  }
  if (scores.technicalFluency < 60) {
    roadmap.thirtyDays.push('Learn prompt engineering fundamentals');
    roadmap.sixtyDays.push('Compare capabilities across AI platforms');
  }
  return roadmap;
}

function generateGapAnalysis(department, scores) {
  const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / 6;
  const currentMaturity = Math.round((1 + (avgScore / 100) * 4) * 10) / 10;
  const targets = {
    marketing: 3.5, sales: 3.0, presales: 4.0, professional_services: 3.5,
    value_engineering: 4.0, product_management: 4.5, engineering: 4.5,
    product_design: 3.5, customer_education: 3.5, demo_engineering: 4.0,
    industry_strategy: 4.0, revenue_operations: 4.0, enablement: 3.5,
  };
  const targetMaturity = targets[department] || 3.5;
  const gap = Math.round((targetMaturity - currentMaturity) * 10) / 10;
  const gapSeverity = gap > 1.5 ? 'critical' : gap > 0.75 ? 'moderate' : 'low';
  return { department, currentMaturity, targetMaturity, gap, gapSeverity, transformation: '' };
}

function calculateXP(scores) {
  // Approximate XP from scores
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  return Math.round(total * 2.5 + Math.random() * 200);
}

function calculateBadges(scores) {
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

export function generateSeedAssessments() {
  const assessments = [];
  let userCounter = 1;

  Object.entries(DEPT_PROFILES).forEach(([deptId, profile]) => {
    for (let i = 0; i < profile.count; i++) {
      const scores = generateScores(profile.means, profile.variance);
      const overallScore = calculateOverallScore(scores);
      const tier = getTierForScore(overallScore);
      const role = profile.roles[Math.floor(Math.random() * profile.roles.length)];
      const anonymousId = `User_${String(userCounter).padStart(3, '0')}`;
      userCounter++;

      assessments.push({
        anonymousId,
        name: '',
        department: deptId,
        role,
        orgName: 'SaaS Corp',
        yearsExperience: ['0-2', '2-5', '5-10', '10+'][Math.floor(Math.random() * 4)],
        scores,
        overallScore,
        tier: tier.name,
        xpTotal: calculateXP(scores),
        badges: calculateBadges(scores),
        gapAnalysis: generateGapAnalysis(deptId, scores),
        roadmap: generateRoadmap(scores),
        timestamp: randomDate(90),
      });
    }
  });

  return assessments;
}

export async function seedToSupabase() {
  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, error: 'Supabase not configured' };
  }

  const assessments = generateSeedAssessments();
  let saved = 0;
  let errors = 0;

  for (const a of assessments) {
    try {
      const result = await cloudSaveAssessment(a);
      if (result) {
        saved++;
      } else {
        errors++;
      }
    } catch (err) {
      console.error('[Seed] Failed to save:', err);
      errors++;
    }
  }

  return {
    ok: errors === 0,
    message: `Seeded ${saved} assessments (${errors} errors) across ${Object.keys(DEPT_PROFILES).length} departments`,
    total: assessments.length,
    saved,
    errors,
  };
}
