import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllAssessments, exportData, importData, clearAllData, deleteAssessment } from '../../db/database';
import { departments } from '../../data/departments';
import { seedSampleData } from '../../utils/seedData';

export default function DataManagement() {
  const [assessments, setAssessments] = useState([]);
  const [importStatus, setImportStatus] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [seedStatus, setSeedStatus] = useState('');
  const [seeding, setSeeding] = useState(false);

  const load = () => getAllAssessments({ includeCloud: true }).then(setAssessments);

  useEffect(() => { load(); }, []);

  const handleExport = async () => {
    const data = await exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-readiness-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await importData(data);
      setImportStatus(`Imported ${data.assessments?.length || 0} assessments successfully!`);
      load();
    } catch (err) {
      setImportStatus(`Error: ${err.message}`);
    }
    e.target.value = '';
  };

  const handleClearAll = async () => {
    await clearAllData();
    setShowConfirmClear(false);
    load();
  };

  const handleDelete = async (id) => {
    await deleteAssessment(id);
    load();
  };

  const handleSeedData = async () => {
    setSeeding(true);
    setSeedStatus('Generating sample data... 0 / 73');
    try {
      const result = await seedSampleData((saved, total) => {
        setSeedStatus(`Saving assessments... ${saved} / ${total}`);
      });
      setSeedStatus(result.ok
        ? `Done! ${result.message}`
        : `Completed with issues: ${result.message}`
      );
      load();
    } catch (err) {
      setSeedStatus(`Error: ${err.message}`);
    }
    setSeeding(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Data Management</h1>
        <p className="text-text-secondary">Export, import, and manage your assessment data</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="glass-card p-6 text-center cursor-pointer"
        >
          <div className="text-3xl mb-2">📤</div>
          <div className="font-semibold text-text-primary">Export Data</div>
          <div className="text-sm text-text-muted">Download anonymized JSON</div>
        </motion.button>

        <motion.label
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass-card p-6 text-center cursor-pointer"
        >
          <div className="text-3xl mb-2">📥</div>
          <div className="font-semibold text-text-primary">Import Data</div>
          <div className="text-sm text-text-muted">Load from JSON file</div>
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </motion.label>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSeedData}
          disabled={seeding}
          className="glass-card p-6 text-center cursor-pointer border border-primary/30 disabled:opacity-50"
        >
          <div className="text-3xl mb-2">🌱</div>
          <div className="font-semibold text-primary">{seeding ? 'Seeding...' : 'Seed Sample Data'}</div>
          <div className="text-sm text-text-muted">Generate realistic SaaS data</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowConfirmClear(true)}
          className="glass-card p-6 text-center cursor-pointer border border-accent-red/30"
        >
          <div className="text-3xl mb-2">🗑️</div>
          <div className="font-semibold text-accent-red">Clear All Data</div>
          <div className="text-sm text-text-muted">Remove all assessments</div>
        </motion.button>
      </div>

      {importStatus && (
        <div className={`p-4 rounded-xl text-sm ${importStatus.startsWith('Error') ? 'bg-accent-red/20 text-accent-red' : 'bg-accent-green/20 text-accent-green'}`}>
          {importStatus}
        </div>
      )}

      {seedStatus && (
        <div className={`p-4 rounded-xl text-sm ${seedStatus.includes('Error') ? 'bg-accent-red/20 text-accent-red' : 'bg-accent-green/20 text-accent-green'}`}>
          {seedStatus}
        </div>
      )}

      {showConfirmClear && (
        <div className="glass-card p-6 border border-accent-red/50">
          <p className="text-text-primary mb-4">Are you sure? This will permanently delete all assessment data from your browser.</p>
          <div className="flex gap-3">
            <button onClick={handleClearAll} className="px-6 py-2 rounded-xl bg-accent-red text-white font-medium">Yes, Delete Everything</button>
            <button onClick={() => setShowConfirmClear(false)} className="px-6 py-2 rounded-xl bg-bg-card border border-border text-text-primary font-medium">Cancel</button>
          </div>
        </div>
      )}

      {/* Cloud Status */}
      <div className="glass-card p-4 flex items-center gap-3">
        <span className="text-xl">☁️</span>
        <div>
          <div className="text-sm font-medium text-text-primary">Cloud Storage Active</div>
          <div className="text-xs text-text-muted">All assessments are automatically synced to the central database</div>
        </div>
        <div className="ml-auto">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
        </div>
      </div>

      {/* Assessment List */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Stored Assessments ({assessments.length})</h3>
        {assessments.length === 0 ? (
          <p className="text-text-muted text-center py-8">No assessments stored</p>
        ) : (
          <div className="space-y-2">
            {assessments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(a => {
              const dept = departments.find(d => d.id === a.department);
              return (
                <div key={`${a.id}-${a._source || 'local'}`} className="flex items-center justify-between p-3 rounded-xl bg-bg-dark border border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{dept?.icon}</span>
                    <div>
                      <div className="text-text-primary font-medium text-sm">
                        {a.anonymousId} &mdash; {dept?.name}
                        {a._source === 'cloud' && <span className="ml-2 text-xs text-accent-blue">☁️</span>}
                      </div>
                      <div className="text-xs text-text-muted">{a.role} &middot; Score: {a.overallScore} &middot; {new Date(a.timestamp).toLocaleDateString()}</div>
                    </div>
                  </div>
                  {a._source !== 'cloud' && (
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-accent-red/60 hover:text-accent-red text-sm px-3 py-1"
                    >
                      Delete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
