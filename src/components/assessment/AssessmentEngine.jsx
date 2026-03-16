import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuestionsByLevel } from '../../data/questions';
import { saveAssessment, saveResponses } from '../../db/database';
import { calculateScoresFromResponses, calculateXP, calculateBadges, generateGapAnalysis, generateRoadmap } from '../../utils/scoring';
import LevelUpScreen from './LevelUpScreen';

const LEVEL_NAMES = ['', 'AI Awareness', 'Current Usage', 'Skill Depth', 'Strategic Thinking', 'Future Readiness'];

export default function AssessmentEngine() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelScorePreview, setLevelScorePreview] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem('assessmentProfile');
    if (!stored) {
      navigate('/setup');
      return;
    }
    const p = JSON.parse(stored);
    setProfile(p);
    const qs = getQuestionsByLevel(p.department, 1);
    setQuestions(qs.length > 0 ? qs.slice(0, 10) : []);
  }, [navigate]);

  const loadLevel = useCallback((level) => {
    if (!profile) return;
    const qs = getQuestionsByLevel(profile.department, level);
    setQuestions(qs.length > 0 ? qs.slice(0, 10) : []);
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
  }, [profile]);

  const currentQuestion = questions[currentQuestionIdx];
  const totalQuestions = 50;
  const answeredTotal = allResponses.length;
  const progress = (answeredTotal / totalQuestions) * 100;

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = async () => {
    if (!selectedAnswer || !currentQuestion) return;

    const response = {
      level: currentLevel,
      questionId: currentQuestion.id,
      answer: selectedAnswer.id || selectedAnswer.text,
      score: selectedAnswer.points || 0,
    };

    const newResponses = [...allResponses, response];
    setAllResponses(newResponses);

    const pts = (selectedAnswer.points || 0) * 10;
    const newStreak = selectedAnswer.points >= 4 ? streak + 1 : 0;
    const streakBonus = newStreak >= 3 ? 50 : 0;
    setXp(prev => prev + pts + streakBonus);
    setStreak(newStreak);
    setSelectedAnswer(null);

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else if (currentLevel < 5) {
      // Level complete - show level up screen
      const levelResponses = newResponses.filter(r => r.level === currentLevel);
      const levelTotal = levelResponses.reduce((s, r) => s + r.score, 0);
      const levelMax = levelResponses.length * 5;
      setLevelScorePreview(Math.round((levelTotal / levelMax) * 100));
      setShowLevelUp(true);
    } else {
      // Assessment complete
      await finishAssessment(newResponses);
    }
  };

  const handleLevelUpContinue = () => {
    setShowLevelUp(false);
    const nextLevel = currentLevel + 1;
    setCurrentLevel(nextLevel);
    loadLevel(nextLevel);
  };

  const finishAssessment = async (responses) => {
    const { levelScores, overallScore, tier } = calculateScoresFromResponses(responses);
    const totalXP = calculateXP(responses);
    const badges = calculateBadges(levelScores);
    const gapAnalysis = generateGapAnalysis(profile.department, levelScores);
    const roadmap = generateRoadmap(levelScores, profile.department);

    const assessmentData = {
      name: profile.name,
      department: profile.department,
      role: profile.role,
      orgName: profile.orgName || '',
      yearsExperience: profile.yearsExperience || '',
      scores: levelScores,
      overallScore,
      tier: tier.name,
      xpTotal: totalXP,
      badges: badges.map(b => b.name),
      gapAnalysis,
      roadmap,
    };

    const { id } = await saveAssessment(assessmentData);
    await saveResponses(id, responses);
    navigate(`/results/${id}`);
  };

  if (!profile || !currentQuestion) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4 animate-float">🔄</div>
        <p className="text-text-secondary">Loading assessment...</p>
      </div>
    );
  }

  if (showLevelUp) {
    return (
      <LevelUpScreen
        level={currentLevel}
        levelName={LEVEL_NAMES[currentLevel]}
        score={levelScorePreview}
        xp={xp}
        onContinue={handleLevelUpContinue}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header bar */}
      <div className="glass-card p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-text-muted">Level {currentLevel}:</span>{' '}
            <span className="text-primary font-semibold">{LEVEL_NAMES[currentLevel]}</span>
          </div>
          <div className="text-sm">
            <span className="text-accent-amber font-bold">{xp} XP</span>
          </div>
          {streak >= 3 && (
            <div className="text-sm text-accent-green font-bold">
              🔥 {streak} streak!
            </div>
          )}
        </div>
        <div className="text-sm text-text-muted">
          Q{answeredTotal + 1} / {totalQuestions}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-bg-card rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent-blue"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-8"
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
              {currentQuestionIdx + 1}
            </span>
            <h2 className="text-xl font-semibold text-text-primary leading-relaxed">
              {currentQuestion.questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer?.id === option.id;
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-text-primary'
                      : 'border-border bg-bg-dark text-text-secondary hover:border-text-muted hover:bg-bg-card'
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-bg-card text-text-muted text-sm font-medium mr-3 flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option.text}
                </motion.button>
              );
            })}
          </div>

          {/* Next button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="mt-8 w-full py-4 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all"
          >
            {currentQuestionIdx === questions.length - 1 && currentLevel === 5
              ? '🏆 Complete Assessment'
              : currentQuestionIdx === questions.length - 1
              ? `⬆️ Complete Level ${currentLevel}`
              : 'Next Question →'}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
