import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { departments } from '../../data/departments';
import { classifications } from '../../data/aiClassification';
import { northStarTargets } from '../../data/northStar';
import { exportDepartmentPDF } from '../../utils/pdfExport';

export default function DepartmentExplorer() {
  const [selectedDept, setSelectedDept] = useState(null);
  const [expandedActivity, setExpandedActivity] = useState(null);

  const dept = departments.find(d => d.id === selectedDept);
  const target = selectedDept ? northStarTargets[selectedDept] : null;

  const handleExportPDF = () => {
    if (!dept) return;
    exportDepartmentPDF(dept, classifications, target);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Department Explorer</h1>
        <p className="text-text-secondary">Browse all 13 SaaS departments and their AI activity classifications</p>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {departments.map((d) => {
          const t = northStarTargets[d.id];
          const humanize = d.activities.filter(a => a.classification === 'humanize').length;
          const agentify = d.activities.filter(a => a.classification === 'agentify').length;
          const automate = d.activities.filter(a => a.classification === 'automate').length;

          return (
            <motion.button
              key={d.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedDept(selectedDept === d.id ? null : d.id); setExpandedActivity(null); }}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedDept === d.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-bg-card hover:bg-bg-card-hover'
              }`}
            >
              <div className="text-2xl mb-2">{d.icon}</div>
              <div className="font-semibold text-text-primary text-sm mb-1">{d.name}</div>
              <div className="flex gap-1 text-xs">
                <span className="text-accent-green">{humanize}H</span>
                <span className="text-accent-amber">{agentify}A</span>
                <span className="text-accent-red">{automate}R</span>
              </div>
              <div className="text-xs text-text-muted mt-1">Target: {t.level}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Department Detail */}
      <AnimatePresence>
        {dept && (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{dept.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{dept.name}</h2>
                    <p className="text-text-secondary">{dept.mission}</p>
                  </div>
                </div>
                <button
                  onClick={handleExportPDF}
                  className="flex-shrink-0 px-4 py-2 rounded-xl bg-accent-purple hover:bg-accent-purple/80 text-white text-sm font-medium transition-all"
                >
                  📄 Export PDF
                </button>
              </div>

              {target && (
                <div className="p-4 rounded-xl bg-accent-green/10 border border-accent-green/30 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-accent-green font-semibold">North Star Target: Level {target.level}</span>
                  </div>
                  <p className="text-text-secondary text-sm">{target.transformation}</p>
                </div>
              )}

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-text-muted mb-2">TYPICAL ROLES</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.roles.map(r => (
                    <span key={r} className="px-3 py-1 rounded-full bg-bg-dark border border-border text-xs text-text-secondary">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-text-muted mb-2">CORE METRICS</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.metrics.map(m => (
                    <span key={m} className="px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-xs text-accent-purple">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Activities by classification */}
            {['humanize', 'agentify', 'automate'].map(cls => {
              const config = classifications[cls];
              const items = dept.activities.filter(a => a.classification === cls);
              if (items.length === 0) return null;

              return (
                <div key={cls} className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: config.color }}>
                    {config.name} Activities ({items.length})
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">{config.description}</p>
                  <div className="space-y-3">
                    {items.map(activity => {
                      const isExpanded = expandedActivity === activity.id;
                      return (
                        <div key={activity.id}>
                          <button
                            onClick={() => setExpandedActivity(isExpanded ? null : activity.id)}
                            className="w-full text-left p-4 rounded-xl border transition-all"
                            style={{
                              borderColor: isExpanded ? config.color : `${config.color}40`,
                              backgroundColor: isExpanded ? `${config.color}15` : config.bgColor,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-text-primary">{activity.name}</div>
                              <svg
                                className={`w-5 h-5 text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            <div className="text-sm text-text-secondary mt-1">{activity.description}</div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 space-y-4 ml-4 border-l-2" style={{ borderColor: `${config.color}60` }}>
                                  {/* Detailed Description */}
                                  {activity.detailedDescription && (
                                    <div>
                                      <h5 className="text-sm font-semibold text-text-primary mb-1">📋 Overview</h5>
                                      <p className="text-sm text-text-secondary leading-relaxed">{activity.detailedDescription}</p>
                                    </div>
                                  )}

                                  {/* AI Opportunity */}
                                  {activity.aiOpportunity && (
                                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${config.color}10` }}>
                                      <h5 className="text-sm font-semibold mb-1" style={{ color: config.color }}>
                                        🤖 AI Opportunity ({config.name})
                                      </h5>
                                      <p className="text-sm text-text-secondary leading-relaxed">{activity.aiOpportunity}</p>
                                    </div>
                                  )}

                                  {/* Example Tools */}
                                  {activity.exampleTools?.length > 0 && (
                                    <div>
                                      <h5 className="text-sm font-semibold text-text-primary mb-2">🔧 Recommended Tools</h5>
                                      <div className="flex flex-wrap gap-2">
                                        {activity.exampleTools.map((tool, i) => (
                                          <a
                                            key={i}
                                            href={tool.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-bg-dark border border-border text-sm text-primary hover:bg-bg-card-hover hover:border-primary transition-all no-underline"
                                          >
                                            🔗 {tool.name}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Implementation Tips */}
                                  {activity.implementationTips?.length > 0 && (
                                    <div>
                                      <h5 className="text-sm font-semibold text-text-primary mb-2">💡 Implementation Tips</h5>
                                      <ul className="space-y-1.5">
                                        {activity.implementationTips.map((tip, i) => (
                                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                            <span className="text-accent-green mt-0.5 flex-shrink-0">✓</span>
                                            {tip}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Maturity Indicators */}
                                  {activity.maturityIndicators && (
                                    <div>
                                      <h5 className="text-sm font-semibold text-text-primary mb-2">📊 Maturity Levels</h5>
                                      <div className="space-y-2">
                                        {[
                                          { key: 'beginner', label: 'Beginner', color: 'text-accent-red', bgColor: 'bg-accent-red/10' },
                                          { key: 'intermediate', label: 'Intermediate', color: 'text-accent-amber', bgColor: 'bg-accent-amber/10' },
                                          { key: 'advanced', label: 'Advanced', color: 'text-accent-green', bgColor: 'bg-accent-green/10' },
                                        ].map(level => (
                                          <div key={level.key} className={`p-2 rounded-lg ${level.bgColor}`}>
                                            <span className={`text-xs font-semibold ${level.color}`}>{level.label}: </span>
                                            <span className="text-xs text-text-secondary">{activity.maturityIndicators[level.key]}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Rationale - always shown */}
                                  <div className="pt-2 border-t border-border">
                                    <p className="text-xs text-text-muted italic">
                                      <span className="font-semibold">Classification rationale:</span> {activity.rationale}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
