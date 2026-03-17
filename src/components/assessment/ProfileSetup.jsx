import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { departments } from '../../data/departments';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    department: '',
    role: '',
    yearsExperience: '',
    orgName: '',
  });

  const selectedDept = departments.find(d => d.id === form.department);
  const roles = selectedDept?.roles || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.department || !form.role) return;
    sessionStorage.setItem('assessmentProfile', JSON.stringify(form));
    navigate('/assessment');
  };

  const update = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'department') next.role = '';
      return next;
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="text-5xl mb-4">🚀</div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Mission Briefing</h1>
        <p className="text-text-secondary">Tell us about yourself to begin your AI readiness assessment</p>
      </motion.div>

      {/* Privacy & Anonymization Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5 mb-6 border border-accent-blue/30 bg-accent-blue/5"
      >
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">🔒</span>
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-1">Your Privacy is Protected</h3>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Your responses are <span className="text-text-primary font-medium">fully anonymized</span> in all dashboards and reports</li>
              <li>• Individual answers are <span className="text-text-primary font-medium">never shared</span> with managers or leadership</li>
              <li>• Only aggregate department-level data is visible in organizational views</li>
              <li>• This assessment is designed to help <span className="text-text-primary font-medium">you</span> identify growth areas — not to evaluate your job performance</li>
            </ul>
            <p className="text-xs text-text-muted mt-2">Answer honestly for the most useful and accurate results.</p>
          </div>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="glass-card p-8 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Your Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full px-4 py-3 rounded-xl bg-bg-dark border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-xs text-text-muted">Your name is stored locally only and never shared</p>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Department *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {departments.map((dept) => (
              <button
                type="button"
                key={dept.id}
                onClick={() => update('department', dept.id)}
                className={`p-3 rounded-xl border text-left text-sm transition-all ${
                  form.department === dept.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-bg-dark text-text-secondary hover:border-text-muted'
                }`}
              >
                <span className="mr-1">{dept.icon}</span> {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Role */}
        {form.department && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <label className="block text-sm font-medium text-text-secondary mb-2">Role *</label>
            <select
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-bg-dark border border-border text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Select your role</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Years of Experience</label>
          <select
            value={form.yearsExperience}
            onChange={(e) => update('yearsExperience', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-bg-dark border border-border text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">Select</option>
            <option value="0-2">0-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="11-15">11-15 years</option>
            <option value="15+">15+ years</option>
          </select>
        </div>

        {/* Org Name */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Organization Name (optional)</label>
          <input
            type="text"
            value={form.orgName}
            onChange={(e) => update('orgName', e.target.value)}
            placeholder="Your company name"
            className="w-full px-4 py-3 rounded-xl bg-bg-dark border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-xs text-text-muted">Used for team grouping in aggregate dashboards</p>
        </div>

        <button
          type="submit"
          disabled={!form.name || !form.department || !form.role}
          className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all"
        >
          🚀 Launch Assessment
        </button>
      </motion.form>
    </div>
  );
}
