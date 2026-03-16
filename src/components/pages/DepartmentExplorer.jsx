import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { departments } from '../../data/departments';
import { classifications } from '../../data/aiClassification';
import { northStarTargets } from '../../data/northStar';

export default function DepartmentExplorer() {
  const [selectedDept, setSelectedDept] = useState(null);

  const dept = departments.find(d => d.id === selectedDept);
  const target = selectedDept ? northStarTargets[selectedDept] : null;

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
              onClick={() => setSelectedDept(selectedDept === d.id ? null : d.id)}
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
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{dept.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">{dept.name}</h2>
                  <p className="text-text-secondary">{dept.mission}</p>
                </div>
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
                  <h3 className="text-lg font-semibold mb-4" style={{ color: config.color }}>
                    {config.name} Activities ({items.length})
                  </h3>
                  <div className="space-y-3">
                    {items.map(activity => (
                      <div
                        key={activity.id}
                        className="p-4 rounded-xl border"
                        style={{ borderColor: `${config.color}40`, backgroundColor: config.bgColor }}
                      >
                        <div className="font-medium text-text-primary mb-1">{activity.name}</div>
                        <div className="text-sm text-text-secondary mb-2">{activity.description}</div>
                        <div className="text-xs text-text-muted italic">{activity.rationale}</div>
                      </div>
                    ))}
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
