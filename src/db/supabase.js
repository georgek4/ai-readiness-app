import { createClient } from '@supabase/supabase-js';

// ── Supabase Configuration ──
// Priority: 1) Environment variables (build-time), 2) localStorage (runtime config)
// Environment variables are set via .env or GitHub Actions secrets.
// localStorage config is set via the Data Management page as a fallback.

const CONFIG_KEY = 'supabase_config';

// Build-time env vars (Vite exposes these via import.meta.env)
const ENV_URL = import.meta.env.VITE_SUPABASE_URL || '';
const ENV_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export function getSupabaseConfig() {
  // Environment variables take priority (always available, no user setup needed)
  if (ENV_URL && ENV_KEY) {
    return { url: ENV_URL, anonKey: ENV_KEY };
  }
  // Fallback to localStorage-based config (manual setup via Data Management)
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY) || 'null');
  } catch { return null; }
}

export function isEnvConfigured() {
  return !!(ENV_URL && ENV_KEY);
}

export function setSupabaseConfig(url, anonKey) {
  if (!url || !anonKey) {
    localStorage.removeItem(CONFIG_KEY);
    return;
  }
  localStorage.setItem(CONFIG_KEY, JSON.stringify({ url, anonKey }));
}

export function getSupabaseClient() {
  const config = getSupabaseConfig();
  if (!config?.url || !config?.anonKey) return null;
  try {
    return createClient(config.url, config.anonKey);
  } catch (err) {
    console.error('[Supabase] Failed to create client:', err);
    return null;
  }
}

// ── Cloud Sync Functions ──

export async function cloudSaveAssessment(assessmentData) {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('assessments')
      .insert({
        anonymous_id: assessmentData.anonymousId,
        name: assessmentData.name || '',
        department: assessmentData.department,
        role: assessmentData.role,
        org_name: assessmentData.orgName || '',
        years_experience: assessmentData.yearsExperience || '',
        scores: assessmentData.scores,
        overall_score: assessmentData.overallScore,
        tier: assessmentData.tier,
        xp_total: assessmentData.xpTotal || 0,
        badges: assessmentData.badges || [],
        gap_analysis: assessmentData.gapAnalysis || null,
        roadmap: assessmentData.roadmap || null,
      })
      .select()
      .single();

    if (error) {
      console.error('[Supabase] Save assessment error:', error.message);
      return null;
    }
    console.log('[Supabase] Assessment saved to cloud:', data.id);
    return data;
  } catch (err) {
    console.error('[Supabase] Save assessment failed:', err);
    return null;
  }
}

export async function cloudSaveResponses(cloudAssessmentId, responses) {
  const client = getSupabaseClient();
  if (!client || !cloudAssessmentId) return;

  try {
    const items = responses.map(r => ({
      assessment_id: cloudAssessmentId,
      level: r.level,
      question_id: r.questionId,
      answer: r.answer,
      score: r.score,
    }));

    const { error } = await client.from('responses').insert(items);
    if (error) {
      console.error('[Supabase] Save responses error:', error.message);
    } else {
      console.log('[Supabase] Responses saved to cloud:', items.length);
    }
  } catch (err) {
    console.error('[Supabase] Save responses failed:', err);
  }
}

export async function cloudGetAllAssessments() {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('assessments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] Fetch assessments error:', error.message);
      return [];
    }

    // Map snake_case columns back to camelCase for app compatibility
    return (data || []).map(row => ({
      id: row.id,
      anonymousId: row.anonymous_id,
      name: row.name,
      department: row.department,
      role: row.role,
      orgName: row.org_name,
      yearsExperience: row.years_experience,
      scores: row.scores,
      overallScore: row.overall_score,
      tier: row.tier,
      xpTotal: row.xp_total,
      badges: row.badges,
      gapAnalysis: row.gap_analysis,
      roadmap: row.roadmap,
      timestamp: row.created_at,
      _source: 'cloud',
    }));
  } catch (err) {
    console.error('[Supabase] Fetch assessments failed:', err);
    return [];
  }
}

export async function cloudTestConnection() {
  const client = getSupabaseClient();
  if (!client) return { ok: false, error: 'No Supabase configuration found' };

  try {
    const { data, error } = await client.from('assessments').select('id').limit(1);
    if (error) return { ok: false, error: error.message };
    return { ok: true, message: `Connected! ${data.length >= 0 ? 'Table accessible.' : ''}` };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ── SQL Setup Script (for reference) ──
export const SETUP_SQL = `
-- Run this in your Supabase SQL Editor to set up the tables

CREATE TABLE IF NOT EXISTS assessments (
  id BIGSERIAL PRIMARY KEY,
  anonymous_id TEXT,
  name TEXT DEFAULT '',
  department TEXT NOT NULL,
  role TEXT,
  org_name TEXT DEFAULT '',
  years_experience TEXT DEFAULT '',
  scores JSONB,
  overall_score NUMERIC,
  tier TEXT,
  xp_total INTEGER DEFAULT 0,
  badges JSONB DEFAULT '[]',
  gap_analysis JSONB,
  roadmap JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS responses (
  id BIGSERIAL PRIMARY KEY,
  assessment_id BIGINT REFERENCES assessments(id) ON DELETE CASCADE,
  level INTEGER,
  question_id TEXT,
  answer TEXT,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security with public access (anon key)
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read assessments" ON assessments FOR SELECT USING (true);
CREATE POLICY "Allow public insert assessments" ON assessments FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read responses" ON responses FOR SELECT USING (true);
CREATE POLICY "Allow public insert responses" ON responses FOR INSERT WITH CHECK (true);
`;
