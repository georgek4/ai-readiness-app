import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { getAssessment } from '../../db/database';
import { getDepartmentById } from '../../data/departments';
import { classifications } from '../../data/aiClassification';
import { northStarTargets, getTierForScore } from '../../data/northStar';
import { getRecommendations, getTopRecommendations, toggleRecCompletion, getCompletedRecs } from '../../data/learningResources';
import { exportResultsPDF } from '../../utils/pdfExport';

const ROADMAP_STORAGE_KEY = 'ai_readiness_roadmap_progress';

function getRoadmapProgress(assessmentId) {
  try {
    const all = JSON.parse(localStorage.getItem(ROADMAP_STORAGE_KEY) || '{}');
    return all[assessmentId] || {};
  } catch { return {}; }
}

function setRoadmapProgress(assessmentId, progress) {
  try {
    const all = JSON.parse(localStorage.getItem(ROADMAP_STORAGE_KEY) || '{}');
    all[assessmentId] = progress;
    localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(all));
  } catch { /* ignore */ }
}

export default function Results() {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [roadmapChecked, setRoadmapChecked] = useState({});
  const [expandedDimension, setExpandedDimension] = useState(null);
  const [completedRecs, setCompletedRecs] = useState(new Set());
  const [showCompleted, setShowCompleted] = useState({});

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        let data = await getAssessment(Number(id));
        if (!data) {
          const emergency = sessionStorage.getItem('emergencyAssessment');
          if (emergency) {
            data = JSON.parse(emergency);
          }
        }
        if (data) {
          setAssessment(data);
          setRoadmapChecked(getRoadmapProgress(data.id));
          setCompletedRecs(getCompletedRecs(data.id));
        }
      } catch (err) {
        console.error('[Results] Error loading assessment:', err);
        const emergency = sessionStorage.getItem('emergencyAssessment');
        if (emergency) {
          setAssessment(JSON.parse(emergency));
        }
      }
    };
    loadAssessment();
  }, [id]);

  const toggleRoadmapItem = useCallback((phaseKey, index) => {
    if (!assessment) return;
    const itemKey = `${phaseKey}_${index}`;
    setRoadmapChecked(prev => {
      const next = { ...prev, [itemKey]: !prev[itemKey] };
      setRoadmapProgress(assessment.id, next);
      return next;
    });
  }, [assessment]);

  const handleToggleRec = useCallback((recKey) => {
    if (!assessment) return;
    const updated = toggleRecCompletion(assessment.id, recKey);
    setCompletedRecs(new Set(updated));
  }, [assessment]);

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
    { subject: 'Technical Fluency', score: assessment.scores.technicalFluency, fullMark: 100 },
  ];

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

  // Get personalized recommendations for weak areas (excluding completed ones)
  const topRecs = getTopRecommendations(assessment.scores, 10, assessment.id);

  // Count roadmap completion
  const allRoadmapItems = ['thirtyDays', 'sixtyDays', 'sixMonths'].flatMap(phase =>
    (assessment.roadmap?.[phase] || []).map((_, i) => `${phase}_${i}`)
  );
  const completedCount = allRoadmapItems.filter(key => roadmapChecked[key]).length;
  const totalRoadmapItems = allRoadmapItems.length;

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
            {strengths.map((s) => (
              <div key={s.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-text-secondary">{s.label}</span>
                <span className="font-bold text-accent-green">{s.val}%</span>
              </div>
            ))}
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-accent-red mb-3">🎯 Areas to Improve</h3>
            {weaknesses.map((w) => (
              <div key={w.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-text-secondary">{w.label}</span>
                <span className="font-bold text-accent-red">{w.val}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* NEW: Personalized Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-2">📚 Recommended Next Steps</h3>
        <p className="text-sm text-text-muted mb-1">Personalized courses, videos, podcasts, blogs, and actions based on your scores.</p>
        <p className="text-sm text-text-muted mb-5">✅ Check off items you've completed to get fresh recommendations.</p>

        {/* Dimension cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {Object.entries(assessment.scores).map(([key, score]) => {
            const rec = getRecommendations(key, score, assessment.id);
            if (!rec) return null;
            const isExpanded = expandedDimension === key;
            const levelColors = { low: 'accent-red', medium: 'accent-amber', high: 'accent-green' };
            const levelLabels = { low: 'Needs Focus', medium: 'Building', high: 'Strong' };
            const color = levelColors[rec.level];

            return (
              <button
                key={key}
                onClick={() => setExpandedDimension(isExpanded ? null : key)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isExpanded
                    ? `border-${color} bg-${color}/10`
                    : 'border-border bg-bg-dark hover:border-text-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-text-primary">{rec.label}</span>
                  <span className={`text-xs font-medium text-${color}`}>{score}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs text-${color}`}>{levelLabels[rec.level]}</span>
                  {rec.completedCount > 0 && (
                    <span className="text-xs text-accent-green">✅ {rec.completedCount}/{rec.totalCount}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded recommendations */}
        {expandedDimension && (() => {
          const score = assessment.scores[expandedDimension];
          const rec = getRecommendations(expandedDimension, score, assessment.id);
          if (!rec) return null;
          const showingCompleted = showCompleted[expandedDimension];

          const typeIcons = { course: '🎓', video: '🎬', podcast: '🎧', blog: '📝', reading: '📖', resource: '🔗', action: '⚡' };
          const typeLabels = { course: 'Course', video: 'Video', podcast: 'Podcast', blog: 'Blog', reading: 'Reading', resource: 'Resource', action: 'Action' };
          const typeColors = { course: 'bg-blue-500/15 text-blue-400', video: 'bg-red-500/15 text-red-400', podcast: 'bg-purple-500/15 text-purple-400', blog: 'bg-emerald-500/15 text-emerald-400', reading: 'bg-amber-500/15 text-amber-400', resource: 'bg-cyan-500/15 text-cyan-400', action: 'bg-orange-500/15 text-orange-400' };

          const renderRecItem = (action, isCompleted = false) => (
            <li key={action.recKey} className={`flex items-start gap-3 p-2.5 rounded-lg transition-all ${
              isCompleted ? 'bg-accent-green/5 opacity-70' : 'hover:bg-bg-card'
            }`}>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => handleToggleRec(action.recKey)}
                className="mt-1 w-4 h-4 rounded border-border text-accent-green focus:ring-accent-green cursor-pointer flex-shrink-0"
              />
              <span className="text-lg mt-0.5 flex-shrink-0">{typeIcons[action.type] || '📌'}</span>
              <div className="flex-1 min-w-0">
                <div className={`flex flex-wrap items-center gap-2 ${isCompleted ? 'line-through' : ''}`}>
                  {action.url ? (
                    <a href={action.url} target="_blank" rel="noopener noreferrer"
                      className={`text-sm ${isCompleted ? 'text-text-muted' : 'text-accent-blue hover:underline'}`}>
                      {action.text}
                    </a>
                  ) : (
                    <span className={`text-sm ${isCompleted ? 'text-text-muted' : 'text-text-secondary'}`}>{action.text}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[action.type] || 'bg-gray-500/15 text-gray-400'}`}>
                    {typeLabels[action.type] || action.type}
                  </span>
                  {action.duration && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-text-muted/10 text-text-muted">
                      ⏱ {action.duration}
                    </span>
                  )}
                  {action.url && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-accent-blue/10 text-accent-blue">
                      🔗 Link
                    </span>
                  )}
                </div>
              </div>
            </li>
          );

          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="rounded-xl border border-border bg-bg-dark p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-text-primary">{rec.label} — {score < 40 ? 'Getting Started' : score < 70 ? 'Level Up' : 'Lead & Scale'}</h4>
                {rec.completedCount > 0 && (
                  <span className="text-sm text-accent-green font-medium">✅ {rec.completedCount} completed</span>
                )}
              </div>
              <p className="text-sm text-text-secondary mb-4">{rec.summary}</p>

              {/* Progress bar for this dimension */}
              {rec.totalCount > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 bg-bg-card rounded-full h-2">
                    <div
                      className="bg-accent-green h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(rec.completedCount / rec.totalCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-muted whitespace-nowrap">{rec.completedCount}/{rec.totalCount}</span>
                </div>
              )}

              {/* Uncompleted recommendations */}
              <ul className="space-y-2">
                {rec.actions.map(action => renderRecItem(action, false))}
              </ul>

              {/* All done message */}
              {rec.actions.length === 0 && rec.completedCount > 0 && (
                <div className="text-center py-6">
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-sm text-accent-green font-medium">You've completed all recommendations for this dimension!</p>
                  <p className="text-xs text-text-muted mt-1">Amazing progress. Consider retaking the assessment to unlock new recommendations.</p>
                </div>
              )}

              {/* Completed items (collapsible) */}
              {rec.completedActions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <button
                    onClick={() => setShowCompleted(prev => ({ ...prev, [expandedDimension]: !prev[expandedDimension] }))}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {showingCompleted ? '▼' : '▶'} {rec.completedActions.length} completed item{rec.completedActions.length !== 1 ? 's' : ''}
                  </button>
                  {showingCompleted && (
                    <ul className="space-y-2 mt-2">
                      {rec.completedActions.map(action => renderRecItem(action, true))}
                    </ul>
                  )}
                </div>
              )}
            </motion.div>
          );
        })()}

        {/* Quick wins — top priority items across all dimensions */}
        {!expandedDimension && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <h4 className="font-semibold text-primary mb-1">⚡ Quick Wins — Start Here</h4>
            <p className="text-xs text-text-muted mb-3">Top priority actions from your weakest areas. Check items off as you complete them.</p>
            <ul className="space-y-2">
              {topRecs.slice(0, 6).map((rec) => {
                const typeIcons = { course: '🎓', video: '🎬', podcast: '🎧', blog: '📝', reading: '📖', resource: '🔗', action: '⚡' };
                const typeLabels = { course: 'Course', video: 'Video', podcast: 'Podcast', blog: 'Blog', reading: 'Reading', resource: 'Resource', action: 'Action' };
                const typeColors = { course: 'bg-blue-500/15 text-blue-400', video: 'bg-red-500/15 text-red-400', podcast: 'bg-purple-500/15 text-purple-400', blog: 'bg-emerald-500/15 text-emerald-400', reading: 'bg-amber-500/15 text-amber-400', resource: 'bg-cyan-500/15 text-cyan-400', action: 'bg-orange-500/15 text-orange-400' };
                const isCompleted = completedRecs.has(rec.recKey);
                return (
                  <li key={rec.recKey} className={`flex items-start gap-3 p-2 rounded-lg transition-all ${
                    isCompleted ? 'opacity-50' : 'hover:bg-primary/5'
                  }`}>
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => handleToggleRec(rec.recKey)}
                      className="mt-1 w-4 h-4 rounded border-border text-accent-green focus:ring-accent-green cursor-pointer flex-shrink-0"
                    />
                    <span className="text-base mt-0.5 flex-shrink-0">{typeIcons[rec.type] || '📌'}</span>
                    <div className="flex-1 min-w-0">
                      <div className={isCompleted ? 'line-through' : ''}>
                        {rec.url ? (
                          <a href={rec.url} target="_blank" rel="noopener noreferrer"
                            className={`text-sm ${isCompleted ? 'text-text-muted' : 'text-accent-blue hover:underline'}`}>
                            {rec.text}
                          </a>
                        ) : (
                          <span className={`text-sm ${isCompleted ? 'text-text-muted' : 'text-text-secondary'}`}>{rec.text}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[rec.type] || 'bg-gray-500/15 text-gray-400'}`}>
                          {typeLabels[rec.type] || rec.type}
                        </span>
                        {rec.duration && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-text-muted/10 text-text-muted">
                            ⏱ {rec.duration}
                          </span>
                        )}
                        <span className="text-xs text-text-muted">{rec.dimension}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {topRecs.length === 0 && (
              <div className="text-center py-4">
                <div className="text-2xl mb-2">🏆</div>
                <p className="text-sm text-accent-green font-medium">You've completed all quick wins! Click a dimension above for more.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>

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

      {/* Activity Classification Map — with clarifying subtitle and descriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-1">Activity Classification Map</h3>
        <p className="text-sm text-text-muted mb-4">
          This shows how your department's activities <span className="text-text-secondary font-medium">should ideally be classified</span> in an AI-enabled future — not your current state. Use this as a target to work toward.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(grouped).map(([key, items]) => {
            const cls = classifications[key];
            return (
              <div key={key} className="rounded-xl p-4 border" style={{ borderColor: cls.color, backgroundColor: cls.bgColor }}>
                <h4 className="font-semibold mb-1" style={{ color: cls.color }}>{cls.name} ({items.length})</h4>
                <p className="text-xs text-text-muted mb-3">{cls.description}</p>
                <ul className="space-y-2">
                  {items.map(a => (
                    <li key={a.id} className="text-sm">
                      <span className="text-text-secondary">{a.name}</span>
                      {a.rationale && (
                        <span className="block text-xs text-text-muted mt-0.5">{a.rationale}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Interactive Roadmap */}
      {assessment.roadmap && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-text-primary">🗺️ Your AI Readiness Roadmap</h3>
            {totalRoadmapItems > 0 && (
              <span className="text-sm font-medium text-text-muted">
                {completedCount}/{totalRoadmapItems} completed
              </span>
            )}
          </div>
          {totalRoadmapItems > 0 && (
            <div className="w-full bg-bg-dark rounded-full h-2 mb-6">
              <div
                className="bg-accent-green h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / totalRoadmapItems) * 100}%` }}
              />
            </div>
          )}
          <p className="text-sm text-text-muted mb-5">Check off items as you complete them. Already done something? Check it off and focus on the remaining items.</p>
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
                    {items.map((item, i) => {
                      const itemKey = `${phase.key}_${i}`;
                      const isChecked = roadmapChecked[itemKey];
                      return (
                        <li key={i}>
                          <label className={`flex items-start gap-3 cursor-pointer group p-2 rounded-lg transition-all ${
                            isChecked ? 'bg-accent-green/5' : 'hover:bg-bg-dark'
                          }`}>
                            <input
                              type="checkbox"
                              checked={!!isChecked}
                              onChange={() => toggleRoadmapItem(phase.key, i)}
                              className="mt-1 w-4 h-4 rounded border-border text-accent-green focus:ring-accent-green cursor-pointer"
                            />
                            <span className={`text-sm transition-all ${
                              isChecked
                                ? 'line-through text-text-muted'
                                : 'text-text-secondary group-hover:text-text-primary'
                            }`}>
                              {item}
                            </span>
                          </label>
                        </li>
                      );
                    })}
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
  technicalFluency: 'Technical Fluency',
};
