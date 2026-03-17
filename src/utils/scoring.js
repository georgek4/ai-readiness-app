import { northStarTargets, getTierForScore } from '../data/northStar';

const LEVEL_WEIGHTS = {
  1: 0.12, // AI Awareness
  2: 0.20, // Current Usage
  3: 0.20, // Skill Depth
  4: 0.18, // Strategic Thinking
  5: 0.12, // Future Readiness
  6: 0.18, // Technical Fluency
};

const LEVEL_NAMES = {
  1: 'awareness',
  2: 'currentUsage',
  3: 'skillDepth',
  4: 'strategicThinking',
  5: 'futureReadiness',
  6: 'technicalFluency',
};

export function calculateLevelScore(responses) {
  if (!responses || responses.length === 0) return 0;
  const totalPoints = responses.reduce((sum, r) => sum + (r.score || 0), 0);
  const maxPoints = responses.length * 5;
  return Math.round((totalPoints / maxPoints) * 100);
}

export function calculateOverallScore(levelScores) {
  let weighted = 0;
  for (let level = 1; level <= 6; level++) {
    const key = LEVEL_NAMES[level];
    const score = levelScores[key] || 0;
    weighted += score * LEVEL_WEIGHTS[level];
  }
  return Math.round(weighted * 10) / 10;
}

export function calculateScoresFromResponses(allResponses) {
  const byLevel = {};
  for (let i = 1; i <= 6; i++) {
    byLevel[i] = allResponses.filter(r => r.level === i);
  }

  const levelScores = {};
  for (let level = 1; level <= 6; level++) {
    levelScores[LEVEL_NAMES[level]] = calculateLevelScore(byLevel[level]);
  }

  const overallScore = calculateOverallScore(levelScores);
  const tier = getTierForScore(overallScore);

  return { levelScores, overallScore, tier };
}

export function calculateXP(responses) {
  let xp = 0;
  let streak = 0;
  responses.forEach(r => {
    const baseXP = (r.score || 0) * 10;
    xp += baseXP;
    if (r.score >= 4) {
      streak++;
      if (streak >= 3) xp += 50; // streak bonus
    } else {
      streak = 0;
    }
  });
  return xp;
}

export function calculateBadges(levelScores) {
  const badges = [];
  if (levelScores.awareness >= 50) badges.push({ id: 'explorer', name: 'AI Explorer', icon: '🔭', description: 'Completed AI Awareness assessment' });
  if (levelScores.currentUsage >= 50) badges.push({ id: 'practitioner_start', name: 'AI User', icon: '🤖', description: 'Active AI user in daily workflows' });
  if (levelScores.skillDepth >= 50) badges.push({ id: 'practitioner', name: 'AI Practitioner', icon: '⚡', description: 'Demonstrated AI skill depth' });
  if (levelScores.strategicThinking >= 50) badges.push({ id: 'strategist_start', name: 'AI Thinker', icon: '🧠', description: 'Strategic AI thinking demonstrated' });
  if (levelScores.futureReadiness >= 50) badges.push({ id: 'strategist', name: 'AI Strategist', icon: '🌟', description: 'Ready for the AI-transformed future' });
  if (levelScores.technicalFluency >= 50) badges.push({ id: 'technician', name: 'AI Technician', icon: '🔬', description: 'Deep technical AI fluency demonstrated' });
  if (Object.values(levelScores).every(s => s >= 70)) badges.push({ id: 'champion', name: 'AI Champion', icon: '🏆', description: 'High scores across all dimensions' });
  return badges;
}

export function generateGapAnalysis(department, levelScores) {
  const target = northStarTargets[department];
  if (!target) return [];

  const currentLevel = Object.values(levelScores).reduce((a, b) => a + b, 0) / 6;
  const currentMaturity = 1 + (currentLevel / 100) * 4; // Map 0-100 to 1-5
  const gap = target.level - currentMaturity;

  const gapSeverity = gap > 1.5 ? 'critical' : gap > 0.75 ? 'moderate' : 'low';

  return {
    department,
    currentMaturity: Math.round(currentMaturity * 10) / 10,
    targetMaturity: target.level,
    gap: Math.round(gap * 10) / 10,
    gapSeverity,
    transformation: target.transformation,
  };
}

export function generateRoadmap(levelScores, department) {
  const roadmap = { thirtyDays: [], sixtyDays: [], sixMonths: [] };

  if (levelScores.awareness < 60) {
    roadmap.thirtyDays.push('Explore AI tools relevant to your role (ChatGPT, Claude, department-specific tools)');
    roadmap.thirtyDays.push('Complete an introductory AI literacy course');
    roadmap.thirtyDays.push('Identify 3 daily tasks where AI could assist you');
  }
  if (levelScores.currentUsage < 60) {
    roadmap.thirtyDays.push('Start using AI for one routine task this week');
    roadmap.sixtyDays.push('Integrate AI tools into at least 3 regular workflows');
    roadmap.sixtyDays.push('Track time savings from AI-assisted tasks');
  }
  if (levelScores.skillDepth < 60) {
    roadmap.sixtyDays.push('Take an advanced prompt engineering course');
    roadmap.sixtyDays.push('Practice AI tool usage daily for 30 days');
    roadmap.sixtyDays.push('Learn to evaluate and improve AI outputs critically');
  }
  if (levelScores.strategicThinking < 60) {
    roadmap.sixMonths.push('Map all department activities to Humanize/Agentify/Automate framework');
    roadmap.sixMonths.push('Build a business case for AI tooling in your top 3 workflows');
    roadmap.sixMonths.push('Present AI adoption recommendations to leadership');
  }
  if (levelScores.futureReadiness < 60) {
    roadmap.sixMonths.push('Develop skills in AI oversight and agent management');
    roadmap.sixMonths.push('Create a personal AI skill development plan');
    roadmap.sixMonths.push('Mentor a colleague on AI tool adoption');
  }
  if (levelScores.technicalFluency < 60) {
    roadmap.thirtyDays.push('Learn prompt engineering fundamentals (few-shot, chain-of-thought, system prompts)');
    roadmap.sixtyDays.push('Compare capabilities across AI platforms (Claude, ChatGPT, Gemini, Perplexity)');
    roadmap.sixtyDays.push('Understand context windows, RAG, and when to use fine-tuning vs. retrieval');
    roadmap.sixMonths.push('Master advanced techniques: temperature tuning, structured outputs, multi-model workflows');
  }

  // Add department-specific items
  const deptRoadmaps = {
    marketing: { thirtyDays: ['Try AI-powered content generation for your next blog post'], sixtyDays: ['Set up AI-driven A/B testing for email campaigns'], sixMonths: ['Implement AI agents for campaign optimization'] },
    sales: { thirtyDays: ['Use AI for prospect research before your next call'], sixtyDays: ['Automate CRM data entry with AI tools'], sixMonths: ['Deploy AI-powered pipeline forecasting'] },
    engineering: { thirtyDays: ['Use an AI coding assistant for your next feature'], sixtyDays: ['Implement AI-generated unit tests in your workflow'], sixMonths: ['Evaluate AI agents for monitoring and incident triage'] },
    product_management: { thirtyDays: ['Use AI to draft your next PRD'], sixtyDays: ['Set up AI-powered product analytics dashboards'], sixMonths: ['Implement AI-assisted user research synthesis'] },
    product_design: { thirtyDays: ['Experiment with AI for wireframe generation'], sixtyDays: ['Use AI accessibility auditing tools'], sixMonths: ['Integrate AI into your design system workflow'] },
    presales: { thirtyDays: ['Use AI to draft your next RFP response'], sixtyDays: ['Build AI-assisted competitive comparison matrices'], sixMonths: ['Automate demo environment provisioning'] },
    professional_services: { thirtyDays: ['Use AI to generate project status reports'], sixtyDays: ['Implement AI-assisted data migration mapping'], sixMonths: ['Deploy AI for project risk prediction'] },
    value_engineering: { thirtyDays: ['Try AI to build a first-draft business case'], sixtyDays: ['Set up automated value realization tracking'], sixMonths: ['Build AI-powered ROI models'] },
    customer_education: { thirtyDays: ['Use AI to draft a knowledge base article'], sixtyDays: ['Create AI-generated video scripts'], sixMonths: ['Implement AI-powered content localization'] },
    demo_engineering: { thirtyDays: ['Use AI for synthetic demo data generation', 'Map a customer use case to a reusable solution design template'], sixtyDays: ['Build reusable solution blueprints with AI-assisted architecture documentation'], sixMonths: ['Build AI-driven interactive demo flows', 'Develop AI-powered solution recommendation engine based on customer requirements'] },
    industry_strategy: { thirtyDays: ['Use AI to monitor industry news and trends'], sixtyDays: ['Generate AI-drafted industry whitepapers'], sixMonths: ['Build AI-powered vertical benchmark dashboards'] },
    revenue_operations: { thirtyDays: ['Use AI for CRM data quality auditing'], sixtyDays: ['Implement AI-powered forecasting models'], sixMonths: ['Deploy AI agents for lead routing optimization'] },
    enablement: { thirtyDays: ['Use AI to create micro-learning content'], sixtyDays: ['Implement AI call coaching insights'], sixMonths: ['Build AI-powered skills assessment programs'] },
    customer_success: { thirtyDays: ['Use AI to draft your next QBR deck from usage data'], sixtyDays: ['Set up AI-powered customer health scoring'], sixMonths: ['Deploy AI agents for digital-touch customer engagement'] },
    support: { thirtyDays: ['Use AI to draft knowledge base articles from resolved tickets'], sixtyDays: ['Implement AI-powered ticket triage and routing'], sixMonths: ['Deploy AI chatbot for Tier 1 resolution and ticket deflection'] },
    c_suite: { thirtyDays: ['Use AI to generate executive briefings from company data and market reports'], sixtyDays: ['Set up AI-powered competitive intelligence and market monitoring dashboards'], sixMonths: ['Establish enterprise AI governance framework and drive company-wide AI transformation strategy'] },
  };

  const deptItems = deptRoadmaps[department];
  if (deptItems) {
    roadmap.thirtyDays.push(...deptItems.thirtyDays);
    roadmap.sixtyDays.push(...deptItems.sixtyDays);
    roadmap.sixMonths.push(...deptItems.sixMonths);
  }

  return roadmap;
}

export function getStrengths(levelScores) {
  const entries = Object.entries(levelScores).map(([key, val]) => ({ key, val, label: getLevelLabel(key) }));
  return entries.sort((a, b) => b.val - a.val).slice(0, 3);
}

export function getWeaknesses(levelScores) {
  const entries = Object.entries(levelScores).map(([key, val]) => ({ key, val, label: getLevelLabel(key) }));
  return entries.sort((a, b) => a.val - b.val).slice(0, 3);
}

function getLevelLabel(key) {
  const labels = {
    awareness: 'AI Awareness',
    currentUsage: 'Current Usage',
    skillDepth: 'Skill Depth',
    strategicThinking: 'Strategic Thinking',
    futureReadiness: 'Future Readiness',
    technicalFluency: 'Technical Fluency',
  };
  return labels[key] || key;
}
