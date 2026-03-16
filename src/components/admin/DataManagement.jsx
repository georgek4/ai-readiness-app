import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllAssessments, exportData, importData, clearAllData, deleteAssessment } from '../../db/database';
import { departments } from '../../data/departments';
import { getSupabaseConfig, setSupabaseConfig, cloudTestConnection, SETUP_SQL } from '../../db/supabase';

export default function DataManagement() {
  const [assessments, setAssessments] = useState([]);
  const [importStatus, setImportStatus] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [cloudStatus, setCloudStatus] = useState('');
  const [showSQL, setShowSQL] = useState(false);

  const load = () => getAllAssessments({ includeCloud: true }).then(setAssessments);

  useEffect(() => {
    load();
    const config = getSupabaseConfig();
    if (config) {
      setSupabaseUrl(config.url || '');
      setSupabaseKey(config.anonKey || '');
    }
  }, []);

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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Data Management</h1>
        <p className="text-text-secondary">Export, import, and manage your assessment data</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {showConfirmClear && (
        <div className="glass-card p-6 border border-accent-red/50">
          <p className="text-text-primary mb-4">Are you sure? This will permanently delete all assessment data from your browser.</p>
          <div className="flex gap-3">
            <button onClick={handleClearAll} className="px-6 py-2 rounded-xl bg-accent-red text-white font-medium">Yes, Delete Everything</button>
            <button onClick={() => setShowConfirmClear(false)} className="px-6 py-2 rounded-xl bg-bg-card border border-border text-text-primary font-medium">Cancel</button>
          </div>
        </div>
      )}

      {/* Supabase Cloud Storage */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">☁️ Cloud Storage (Supabase)</h3>
        <p className="text-sm text-text-muted mb-4">
          Connect to Supabase to centrally store all assessment data across browsers and sessions.
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-text-secondary mb-1">Supabase Project URL</label>
            <input
              type="url"
              value={supabaseUrl}
              onChange={e => setSupabaseUrl(e.target.value)}
              placeholder="https://your-project.supabase.co"
              className="w-full px-4 py-2 rounded-xl bg-bg-dark border border-border text-text-primary placeholder-text-muted focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Anon (Public) Key</label>
            <input
              type="password"
              value={supabaseKey}
              onChange={e => setSupabaseKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIs..."
              className="w-full px-4 py-2 rounded-xl bg-bg-dark border border-border text-text-primary placeholder-text-muted focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setSupabaseConfig(supabaseUrl, supabaseKey);
                setCloudStatus('Configuration saved!');
                load();
              }}
              className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-all"
            >
              Save Config
            </button>
            <button
              onClick={async () => {
                setSupabaseConfig(supabaseUrl, supabaseKey);
                setCloudStatus('Testing connection...');
                const result = await cloudTestConnection();
                setCloudStatus(result.ok ? `Connected! ${result.message}` : `Error: ${result.error}`);
                if (result.ok) load();
              }}
              className="px-5 py-2 rounded-xl bg-accent-green/20 hover:bg-accent-green/30 text-accent-green text-sm font-medium transition-all"
            >
              Test Connection
            </button>
            <button
              onClick={() => {
                setSupabaseConfig(null, null);
                setSupabaseUrl('');
                setSupabaseKey('');
                setCloudStatus('Cloud storage disconnected.');
              }}
              className="px-5 py-2 rounded-xl bg-bg-card border border-border text-text-muted text-sm font-medium transition-all hover:text-text-primary"
            >
              Disconnect
            </button>
          </div>
          {cloudStatus && (
            <div className={`p-3 rounded-xl text-sm ${cloudStatus.includes('Error') ? 'bg-accent-red/20 text-accent-red' : 'bg-accent-green/20 text-accent-green'}`}>
              {cloudStatus}
            </div>
          )}
          <div>
            <button
              onClick={() => setShowSQL(!showSQL)}
              className="text-sm text-primary hover:underline"
            >
              {showSQL ? 'Hide' : 'Show'} SQL Setup Script
            </button>
            {showSQL && (
              <pre className="mt-2 p-4 rounded-xl bg-bg-dark border border-border text-xs text-text-secondary overflow-x-auto whitespace-pre-wrap">
                {SETUP_SQL}
              </pre>
            )}
          </div>
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
                <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-dark border border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{dept?.icon}</span>
                    <div>
                      <div className="text-text-primary font-medium text-sm">{a.anonymousId} &mdash; {dept?.name}</div>
                      <div className="text-xs text-text-muted">{a.role} &middot; Score: {a.overallScore} &middot; {new Date(a.timestamp).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-accent-red/60 hover:text-accent-red text-sm px-3 py-1"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
