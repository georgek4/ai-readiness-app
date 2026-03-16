import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { getAssessment } from '../../db/database';
import { getDepartmentById } from '../../data/departments';
import { classifications } from '../../data/aiClassification';
import { northStarTargets, getTierForScore } from '../../data/northStar';
import { exportResultsPDF } from '../../utils/pdfExport';

export default function Results() {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    getAssessment(Number(id)).then(setAssessment);
  }, [id]);

  if (!assessment) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl animate-float mb-4">🔄</div>
        <p className="text-text-secondary">Loading results...</p>
      </div>
    );
  }

  const tier = getTierForScore(assessment.overallScore);
  const department = getDepartmentById(assessment.department);
  const target = northStarTargets[assessment.department];

  const radarData = [
    { subject: 'AI Awareness', score: assessment.scores.awareness, fullMark: 100 },
    { subject: 'Current Usage', score: assessment.scores.currentUsage, fullMark: 100 },
    { subject: 'Skill Depth', score: assessment.scores.skillDepth, fullMark: 100 },
    { subject: 'Strategic Thinking', score: assessment.scores.strategicThinking, fullMark: 100 },
    { subject: 'Future Readiness', score: assessment.scores.futureReadiness, fullMark: 100 },
  ];

  const gapData = assessment.gapAnalysis ? [{
    name: department?.name,
    current: assessment.gapAnalysis.currentMaturity,
    target: assessment.gapAnalysis.targetMaturity,
  }] : [];

  // Group activities by classification
  const activities = department?.activities || [];
  const grouped = {
    humanize: activities.filter(a => a.classification === 'humanize'),
    agentify: activities.filter(a => a.classification === 'agentify'),
    automate: activities.filter(a => a.classification === 'automate'),
  };

  const strengths = Object.entries(assessment.scores)
    .map(([key, val]) => ({ key, val, label: labelMap[key] }))
    .sort((a, b) => b.val - a.val)
    .slice(0, 3);

  const weaknesses = Object.entries(assessment.scores)
    .map(([key, val]) => ({ key, val, label: labelMap[key] }))
    .sort((a, b) => a.val - b.val)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Score Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center"
      >
        <p className="text-text-muted mb-2">{assessment.name} &mdash; {department?.name} / {assessment.role}</p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-block"
        >
          <div className="w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-4 border-4"
            style={{ borderColor: tier.color, backgroundColor: `${tier.color}15` }}>
            <div>
              <div className="text-4xl font-bold text-text-primary">{assessment.overallScore}</div>
              <div className="text-sm text-text-muted">/ 100</div>
            </div>
          </div>
        </motion.div>
        <div className="text-2xl font-bold mb-1" style={{ color: tier.color }}>{tier.name}</div>
        <div className="text-text-secondary mb-4">{tier.description}</div>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="px-4 py-2 rounded-full bg-accent-amber/20 text-accent-amber font-semibold">
            ⚡ {assessment.xpTotal} XP
          </div>
          {assessment.badges?.map((badge, i) => (
            <div key={i} className="px-4 py-2 rounded-full bg-accent-purple/20 text-accent-purple font-semibold">
              🏅 {badge}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Radar Chart + Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4">Skills Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
              <Radar name="Score" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-accent-green mb-3">💪 Top Strengths</h3>
            {strengths.map((s, i) => (
              <div key={s.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-text-secondary">{s.label}</span>
                <span className="font-bold text-accent-green">{s.val}%</span>
              </div>
            ))}
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-accent-red mb-3">🎯 Areas to Improve</h3>
            {weaknesses.map((w, i) => (
              <div key={w.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-text-secondary">{w.label}</span>
                <span className="font-bold text-accent-red">{w.val}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* North Star Gap */}
      {assessment.gapAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4">North Star Gap Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 rounded-xl bg-bg-dark">
              <div className="text-2xl font-bold text-accent-blue">{assessment.gapAnalysis.currentMaturity}</div>
              <div className="text-sm text-text-muted">Current Maturity</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-bg-dark">
              <div className="text-2xl font-bold text-accent-green">{assessment.gapAnalysis.targetMaturity}</div>
              <div className="text-sm text-text-muted">North Star Target</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-bg-dark">
              <div className={`text-2xl font-bold ${
                assessment.gapAnalysis.gapSeverity === 'critical' ? 'text-accent-red' :
                assessment.gapAnalysis.gapSeverity === 'moderate' ? 'text-accent-amber' : 'text-accent-green'
              }`}>
                {assessment.gapAnalysis.gap}
              </div>
              <div className="text-sm text-text-muted">Gap ({assessment.gapAnalysis.gapSeverity})</div>
            </div>
          </div>
          <p className="text-text-secondary text-sm">{assessment.gapAnalysis.transformation}</p>
        </motion.div>
      )}

      {/* Activity Classification Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-4">Activity Classification Map</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(grouped).map(([key, items]) => {
            const cls = classifications[key];
            return (
              <div key={key} className="rounded-xl p-4 border" style={{ borderColor: cls.color, backgroundColor: cls.bgColor }}>
                <h4 className="font-semibold mb-2" style={{ color: cls.color }}>{cls.name} ({items.length})</h4>
                <ul className="space-y-1">
                  {items.map(a => (
                    <li key={a.id} className="text-sm text-text-secondary">{a.name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Roadmap */}
      {assessment.roadmap && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-6">🗺️ Your AI Readiness Roadmap</h3>
          <div className="space-y-6">
            {[
              { key: 'thirtyDays', label: 'Next 30 Days', icon: '🏃', color: 'accent-green' },
              { key: 'sixtyDays', label: '60-90 Days', icon: '📈', color: 'accent-amber' },
              { key: 'sixMonths', label: '6 Months', icon: '🚀', color: 'accent-purple' },
            ].map(phase => {
              const items = assessment.roadmap[phase.key] || [];
              if (items.length === 0) return null;
              return (
                <div key={phase.key}>
                  <h4 className={`font-semibold text-${phase.color} mb-2`}>
                    {phase.icon} {phase.label}
                  </h4>
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-secondary">
                        <span className="text-text-muted mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center pb-8">
        <button
          onClick={() => exportResultsPDF(assessment, department, tier, assessment.gapAnalysis)}
          className="px-6 py-3 rounded-xl bg-accent-purple hover:bg-accent-purple/80 text-white font-medium transition-all"
        >
          📄 Export PDF Report
        </button>
        <Link
          to="/dashboard"
          className="px-6 py-3 rounded-xl bg-bg-card hover:bg-bg-card-hover border border-border text-text-primary no-underline font-medium"
        >
          📊 View Org Dashboard
        </Link>
        <Link
          to="/setup"
          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white no-underline font-medium"
        >
          🔄 Take Again
        </Link>
      </div>
    </div>
  );
}

const labelMap = {
  awareness: 'AI Awareness',
  currentUsage: 'Current Usage',
  skillDepth: 'Skill Depth',
  strategicThinking: 'Strategic Thinking',
  futureReadiness: 'Future Readiness',
};
