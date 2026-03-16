import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, CartesianGrid, Legend,
} from 'recharts';
import { getAllAssessments } from '../../db/database';
import { departments } from '../../data/departments';
import { northStarTargets, tierDefinitions } from '../../data/northStar';
import { exportDashboardPDF } from '../../utils/pdfExport';

export default function OrgDashboard() {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    getAllAssessments().then(setAssessments);
  }, []);

  if (assessments.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">📊</div>
        <h1 className="text-2xl font-bold text-text-primary mb-3">No Assessments Yet</h1>
        <p className="text-text-secondary mb-6">Complete at least one assessment to see organizational data.</p>
        <Link to="/setup" className="px-6 py-3 rounded-xl bg-primary text-white no-underline font-medium">
          🚀 Start Assessment
        </Link>
      </div>
    );
  }

  // North Star gap data
  const deptAverages = {};
  departments.forEach(dept => {
    const deptAssessments = assessments.filter(a => a.department === dept.id);
    if (deptAssessments.length > 0) {
      const avg = deptAssessments.reduce((s, a) => s + a.overallScore, 0) / deptAssessments.length;
      deptAverages[dept.id] = Math.round(avg * 10) / 10;
    }
  });

  const northStarData = departments
    .filter(d => deptAverages[d.id] !== undefined)
    .map(d => {
      const target = northStarTargets[d.id];
      const currentMaturity = 1 + (deptAverages[d.id] / 100) * 4;
      return {
        name: d.name.length > 12 ? d.name.slice(0, 12) + '...' : d.name,
        fullName: d.name,
        current: Math.round(currentMaturity * 10) / 10,
        target: target.level,
        count: assessments.filter(a => a.department === d.id).length,
      };
    });

  // Tier distribution
  const tierCounts = tierDefinitions.map(t => ({
    name: t.name,
    count: assessments.filter(a => a.overallScore >= t.min && a.overallScore <= t.max).length,
    color: t.color,
  }));

  // Scatter plot data
  const scatterData = assessments.map(a => ({
    x: a.overallScore,
    y: Object.values(a.scores || {}).reduce((s, v) => s + v, 0) / 5,
    dept: departments.find(d => d.id === a.department)?.name || a.department,
    id: a.id,
  }));

  // Heatmap data
  const heatmapData = departments.map(dept => {
    const deptAssessments = assessments.filter(a => a.department === dept.id);
    const avgScores = {};
    if (deptAssessments.length > 0) {
      ['awareness', 'currentUsage', 'skillDepth', 'strategicThinking', 'futureReadiness'].forEach(key => {
        avgScores[key] = Math.round(
          deptAssessments.reduce((s, a) => s + (a.scores?.[key] || 0), 0) / deptAssessments.length
        );
      });
    }
    return { dept: dept.name, icon: dept.icon, id: dept.id, count: deptAssessments.length, ...avgScores };
  }).filter(d => d.count > 0);

  const avgScore = Math.round(assessments.reduce((s, a) => s + a.overallScore, 0) / assessments.length * 10) / 10;

  return (
    <div className="space-y-8">
      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={() => exportDashboardPDF(assessments, departments, northStarTargets, tierDefinitions)}
          className="px-5 py-2.5 rounded-xl bg-accent-purple hover:bg-accent-purple/80 text-white text-sm font-medium transition-all"
        >
          📄 Export Dashboard PDF
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Assessments', value: assessments.length, icon: '📋' },
          { label: 'Avg Score', value: avgScore, icon: '📈' },
          { label: 'Departments', value: Object.keys(deptAverages).length, icon: '🏛️' },
          { label: 'Top Tier', value: tierCounts.filter(t => t.count > 0).pop()?.name || '-', icon: '🏆' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 text-center"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
            <div className="text-sm text-text-muted">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* North Star Gap Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-4">North Star Gap: Current vs. Target Maturity</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={northStarData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" domain={[0, 5]} tick={{ fill: '#94A3B8', fontSize: 12 }} />
            <YAxis dataKey="name" type="category" width={110} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#F1F5F9' }}
            />
            <Bar dataKey="current" fill="#3B82F6" name="Current" radius={[0, 4, 4, 0]} />
            <Bar dataKey="target" fill="#10B981" name="Target" radius={[0, 4, 4, 0]} opacity={0.5} />
            <Legend wrapperStyle={{ color: '#94A3B8' }} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Tier Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-4">Tier Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={tierCounts}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} />
            <YAxis tick={{ fill: '#94A3B8' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }} />
            <Bar dataKey="count" name="People" radius={[4, 4, 0, 0]}>
              {tierCounts.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Heatmap */}
      {heatmapData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4">Department Heatmap</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2 text-text-muted">Department</th>
                  <th className="p-2 text-text-muted">Awareness</th>
                  <th className="p-2 text-text-muted">Usage</th>
                  <th className="p-2 text-text-muted">Depth</th>
                  <th className="p-2 text-text-muted">Strategic</th>
                  <th className="p-2 text-text-muted">Readiness</th>
                  <th className="p-2 text-text-muted">N</th>
                </tr>
              </thead>
              <tbody>
                {heatmapData.map(row => (
                  <tr key={row.id} className="border-t border-border">
                    <td className="p-2 text-text-primary">{row.icon} {row.dept}</td>
                    {['awareness', 'currentUsage', 'skillDepth', 'strategicThinking', 'futureReadiness'].map(key => (
                      <td key={key} className="p-2 text-center">
                        <span
                          className="inline-block w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: getHeatColor(row[key]),
                            color: row[key] > 50 ? '#0F172A' : '#F1F5F9',
                          }}
                        >
                          {row[key] || '-'}
                        </span>
                      </td>
                    ))}
                    <td className="p-2 text-center text-text-muted">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Assessment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-4">All Assessments</h3>
        <div className="space-y-2">
          {assessments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(a => {
            const dept = departments.find(d => d.id === a.department);
            return (
              <Link
                key={a.id}
                to={`/results/${a.id}`}
                className="flex items-center justify-between p-3 rounded-xl bg-bg-dark hover:bg-bg-card-hover border border-border no-underline transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{dept?.icon}</span>
                  <div>
                    <div className="text-text-primary font-medium">{a.anonymousId || 'User'} — {dept?.name}</div>
                    <div className="text-xs text-text-muted">{a.role} &middot; {new Date(a.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-text-primary">{a.overallScore}</div>
                  <div className="text-xs text-text-muted">{a.tier}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function getHeatColor(value) {
  if (!value) return '#1E293B';
  if (value >= 80) return '#10B981';
  if (value >= 60) return '#3B82F6';
  if (value >= 40) return '#F59E0B';
  if (value >= 20) return '#F97316';
  return '#EF4444';
}
