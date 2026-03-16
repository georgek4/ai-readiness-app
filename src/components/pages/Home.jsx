import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAllAssessments } from '../../db/database';

export default function Home() {
  const [assessmentCount, setAssessmentCount] = useState(0);

  useEffect(() => {
    getAllAssessments().then(a => setAssessmentCount(a.length));
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center py-16 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-7xl mb-6"
        >
          🤖
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-6xl font-bold mb-4"
        >
          <span className="gradient-text">AI Readiness</span>
          <br />
          <span className="text-text-primary">Assessment Platform</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-text-secondary max-w-2xl mx-auto mb-8"
        >
          Discover where your organization stands on the AI maturity spectrum.
          Classify every activity as <span className="text-accent-green font-semibold">Humanize</span>,{' '}
          <span className="text-accent-amber font-semibold">Agentify</span>, or{' '}
          <span className="text-accent-red font-semibold">Automate</span> — and chart your path forward.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/setup"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-lg no-underline transition-all hover:scale-105 animate-pulse-glow"
          >
            🚀 Start Your Assessment
          </Link>
          {assessmentCount > 0 && (
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-bg-card hover:bg-bg-card-hover text-text-primary font-semibold text-lg no-underline transition-all border border-border"
            >
              📊 View Dashboard ({assessmentCount} assessments)
            </Link>
          )}
        </motion.div>
      </section>

      {/* How it Works */}
      <section>
        <h2 className="text-2xl font-bold text-center text-text-primary mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '📋', title: 'Select Your Department', desc: 'Choose from 13 SaaS departments and your specific role' },
            { icon: '🎮', title: 'Take the Assessment', desc: '50 questions across 5 levels — earn XP, badges, and tier rankings' },
            { icon: '🗺️', title: 'Get Your Roadmap', desc: 'Personalized 30/60/90-day action plan to boost your AI readiness' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              className="glass-card p-8 text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
              <p className="text-text-secondary">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Classification Framework */}
      <section>
        <h2 className="text-2xl font-bold text-center text-text-primary mb-10">The AI Classification Framework</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Humanize', color: 'bg-accent-green/20 border-accent-green', textColor: 'text-accent-green', icon: '🟢', desc: 'Activities that must remain human-led. Requires judgment, empathy, creativity, or relationship-building.' },
            { name: 'Agentify', color: 'bg-accent-amber/20 border-accent-amber', textColor: 'text-accent-amber', icon: '🟡', desc: 'Activities delegated to AI agents with human oversight. Agent executes, human reviews and approves.' },
            { name: 'Automate', color: 'bg-accent-red/20 border-accent-red', textColor: 'text-accent-red', icon: '🔴', desc: 'Activities fully automated by AI. Set up once, monitor periodically. No human in the loop needed.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              className={`rounded-2xl p-8 border ${item.color}`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${item.textColor}`}>{item.name}</h3>
              <p className="text-text-secondary">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Maturity Tiers */}
      <section>
        <h2 className="text-2xl font-bold text-center text-text-primary mb-10">AI Maturity Tiers</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {[
            { name: 'Analog', range: '0-20', color: '#6B7280' },
            { name: 'Experimenter', range: '21-40', color: '#F59E0B' },
            { name: 'Adopter', range: '41-60', color: '#3B82F6' },
            { name: 'Scaler', range: '61-80', color: '#8B5CF6' },
            { name: 'Transformer', range: '81-100', color: '#10B981' },
          ].map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex-1 rounded-xl p-4 text-center border"
              style={{ borderColor: tier.color, backgroundColor: `${tier.color}15` }}
            >
              <div className="font-bold text-text-primary">{tier.name}</div>
              <div className="text-sm text-text-muted">{tier.range}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8">
        <Link
          to="/departments"
          className="text-primary hover:text-accent-blue no-underline font-medium"
        >
          Explore all 13 departments and their AI classifications →
        </Link>
      </section>
    </div>
  );
}
