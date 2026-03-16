import { motion } from 'framer-motion';

const LEVEL_BADGES = {
  1: { icon: '🔭', name: 'AI Explorer' },
  2: { icon: '🤖', name: 'AI User' },
  3: { icon: '⚡', name: 'AI Practitioner' },
  4: { icon: '🧠', name: 'AI Thinker' },
  5: { icon: '🌟', name: 'AI Strategist' },
};

export default function LevelUpScreen({ level, levelName, score, xp, onContinue }) {
  const badge = LEVEL_BADGES[level];

  return (
    <div className="max-w-lg mx-auto text-center py-16">
      {/* Particle effects */}
      <div className="relative">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#8B5CF6'][i % 5],
              left: '50%',
              top: '50%',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((i * Math.PI * 2) / 12) * 150,
              y: Math.sin((i * Math.PI * 2) / 12) * 150,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 1.5, delay: 0.1 * i, ease: 'easeOut' }}
          />
        ))}

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-8xl mb-6"
        >
          {badge.icon}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-text-primary mb-2">Level {level} Complete!</h1>
        <p className="text-xl text-primary font-semibold mb-6">{levelName}</p>

        <div className="glass-card p-6 mb-6 inline-block">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold text-text-primary">{score}%</div>
              <div className="text-sm text-text-muted">Level Score</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-3xl font-bold text-accent-amber">{xp}</div>
              <div className="text-sm text-text-muted">Total XP</div>
            </div>
          </div>
        </div>

        {score >= 50 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/20 text-accent-green">
              <span>{badge.icon}</span>
              <span className="font-semibold">{badge.name} Badge Earned!</span>
            </div>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-lg transition-all"
        >
          🚀 Continue to Level {level + 1}
        </motion.button>
      </motion.div>
    </div>
  );
}
