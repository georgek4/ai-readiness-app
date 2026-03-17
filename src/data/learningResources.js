// Learning resources and actionable recommendations for each assessment dimension
// Organized by score range: low (0-39), medium (40-69), high (70-100)
// Each level has recommendations that get progressively more advanced

export const dimensionResources = {
  awareness: {
    label: 'AI Awareness',
    low: {
      summary: 'You\'re at the beginning of your AI journey. Focus on building foundational understanding of what AI can and can\'t do.',
      actions: [
        { text: 'Watch "AI for Everyone" by Andrew Ng on Coursera (2 hours)', type: 'course', url: 'https://www.coursera.org/learn/ai-for-everyone' },
        { text: 'Subscribe to "The Rundown AI" daily newsletter for 2 weeks', type: 'resource', url: 'https://www.therundown.ai/' },
        { text: 'Try ChatGPT or Claude for a simple work task this week (e.g., summarize meeting notes)', type: 'action' },
        { text: 'Read "What Is Generative AI?" by McKinsey', type: 'reading', url: 'https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-generative-ai' },
      ],
    },
    medium: {
      summary: 'You have a good foundation. Now deepen your understanding of AI capabilities and limitations in your domain.',
      actions: [
        { text: 'Complete Google\'s "Introduction to Generative AI" learning path', type: 'course', url: 'https://www.cloudskillsboost.google/paths/118' },
        { text: 'Identify 5 tasks in your daily workflow and classify them as Humanize/Agentify/Automate', type: 'action' },
        { text: 'Read Ethan Mollick\'s "Co-Intelligence: Living and Working with AI"', type: 'reading', url: 'https://www.amazon.com/Co-Intelligence-Living-Working-Ethan-Mollick/dp/0593716736' },
        { text: 'Follow 3 AI thought leaders relevant to your industry on LinkedIn', type: 'action' },
      ],
    },
    high: {
      summary: 'Excellent awareness! Channel this into helping others and staying ahead of rapid changes.',
      actions: [
        { text: 'Mentor a colleague who scored lower on AI Awareness', type: 'action' },
        { text: 'Present an "AI in Our Department" lunch-and-learn session', type: 'action' },
        { text: 'Subscribe to research-focused sources: Anthropic blog, OpenAI blog, Google DeepMind', type: 'resource' },
        { text: 'Join an AI-focused community (AI Tinkerers, Latent Space Discord)', type: 'action' },
      ],
    },
  },
  currentUsage: {
    label: 'Current Usage',
    low: {
      summary: 'You\'re not yet using AI tools regularly. Start small with one tool and one task.',
      actions: [
        { text: 'Pick ONE routine task and use AI to help with it every day for 2 weeks', type: 'action' },
        { text: 'Set up a free Claude.ai or ChatGPT account and bookmark it', type: 'action' },
        { text: 'Watch "How to Use ChatGPT for Work" (YouTube, ~20 min)', type: 'course', url: 'https://www.youtube.com/results?search_query=how+to+use+chatgpt+for+work+beginner' },
        { text: 'Ask a colleague who uses AI regularly to show you their workflow', type: 'action' },
      ],
    },
    medium: {
      summary: 'You\'re using AI but haven\'t fully embedded it into your workflows. Focus on consistency and expansion.',
      actions: [
        { text: 'Map your weekly tasks and identify 3 more that AI could assist with', type: 'action' },
        { text: 'Create saved prompts/templates for your most common AI use cases', type: 'action' },
        { text: 'Track time savings: log how long tasks take with vs. without AI for 2 weeks', type: 'action' },
        { text: 'Explore a second AI tool beyond your primary one (e.g., add Perplexity for research or Claude for analysis)', type: 'action' },
      ],
    },
    high: {
      summary: 'You\'re a power user. Focus on systematizing and scaling your AI practices.',
      actions: [
        { text: 'Document your AI workflows into a team playbook others can follow', type: 'action' },
        { text: 'Build a prompt library for your team\'s top 10 use cases', type: 'action' },
        { text: 'Propose an AI tool budget and governance policy to your manager', type: 'action' },
        { text: 'Evaluate if any workflows could move from "AI-assisted" to "AI-automated"', type: 'action' },
      ],
    },
  },
  skillDepth: {
    label: 'Skill Depth',
    low: {
      summary: 'Your AI skills are basic. Invest in structured learning to improve output quality.',
      actions: [
        { text: 'Take "Prompt Engineering for Everyone" by DeepLearning.AI (free, 1 hour)', type: 'course', url: 'https://www.deeplearning.ai/short-courses/prompt-engineering-for-everyone/' },
        { text: 'Practice the "context → task → format → constraints" prompt framework for a week', type: 'action' },
        { text: 'When AI gives a poor output, try 3 different prompt approaches before giving up', type: 'action' },
        { text: 'Read Anthropic\'s prompt engineering guide', type: 'reading', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
      ],
    },
    medium: {
      summary: 'You have solid skills. Push toward expertise with advanced techniques and workflow building.',
      actions: [
        { text: 'Learn chain-of-thought and task decomposition prompting techniques', type: 'action' },
        { text: 'Build a reusable AI workflow for your most time-consuming weekly task', type: 'action' },
        { text: 'Take "ChatGPT Prompt Engineering for Developers" by DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
        { text: 'Create quality evaluation criteria for AI outputs in your domain', type: 'action' },
      ],
    },
    high: {
      summary: 'Strong skills! Focus on teaching others and building scalable AI systems.',
      actions: [
        { text: 'Create and share prompt templates that encode your team\'s best practices', type: 'action' },
        { text: 'Run a "prompt engineering workshop" for your team', type: 'action' },
        { text: 'Build automated quality checks for AI-generated outputs', type: 'action' },
        { text: 'Experiment with multi-step AI workflows that chain different tools together', type: 'action' },
      ],
    },
  },
  strategicThinking: {
    label: 'Strategic Thinking',
    low: {
      summary: 'You\'re focused on tactical AI use. Build strategic perspective on how AI transforms your function.',
      actions: [
        { text: 'Read "How to classify every activity: Humanize, Agentify, or Automate" framework overview', type: 'reading' },
        { text: 'Map 10 of your department\'s activities to the H/A/A framework', type: 'action' },
        { text: 'Watch a case study of AI transformation in your industry (Harvard Business Review)', type: 'course', url: 'https://hbr.org/topic/subject/ai-and-machine-learning' },
        { text: 'Have a conversation with your manager about AI strategy for your team', type: 'action' },
      ],
    },
    medium: {
      summary: 'Good strategic instincts. Develop the ability to build and present AI business cases.',
      actions: [
        { text: 'Build a one-page AI adoption business case for your team\'s top workflow', type: 'action' },
        { text: 'Calculate the ROI of one AI-assisted workflow (time saved × hourly rate × frequency)', type: 'action' },
        { text: 'Interview 3 peers in other departments about their AI adoption journey', type: 'action' },
        { text: 'Read "Competing in the Age of AI" by Marco Iansiti and Karim Lakhani', type: 'reading', url: 'https://www.amazon.com/Competing-Age-AI-Leadership-Algorithms/dp/1633697622' },
      ],
    },
    high: {
      summary: 'You think strategically about AI. Now drive organizational change.',
      actions: [
        { text: 'Present an AI transformation roadmap to your leadership team', type: 'action' },
        { text: 'Champion an AI Center of Excellence or AI Guild at your organization', type: 'action' },
        { text: 'Build cross-functional alignment on AI governance and standards', type: 'action' },
        { text: 'Develop metrics to track AI adoption maturity across your org', type: 'action' },
      ],
    },
  },
  futureReadiness: {
    label: 'Future Readiness',
    low: {
      summary: 'AI is evolving fast and you need to prepare for a world with AI agents. Start building future-proof skills.',
      actions: [
        { text: 'Learn what AI agents are and how they differ from chatbots (Anthropic\'s Claude Agent overview)', type: 'reading', url: 'https://www.anthropic.com/research/building-effective-agents' },
        { text: 'Identify which of your skills are "uniquely human" and double down on them', type: 'action' },
        { text: 'Create a personal AI skill development plan for the next 6 months', type: 'action' },
        { text: 'Take LinkedIn Learning\'s "Future Skills" AI courses', type: 'course', url: 'https://www.linkedin.com/learning/topics/artificial-intelligence' },
      ],
    },
    medium: {
      summary: 'You\'re thinking about the future. Now build hands-on experience with emerging AI patterns.',
      actions: [
        { text: 'Experiment with an AI agent framework (Claude Computer Use, AutoGPT, or similar)', type: 'action' },
        { text: 'Design an "AI-first" version of one of your team\'s core workflows', type: 'action' },
        { text: 'Develop oversight skills: learn to evaluate when AI agents succeed vs. fail', type: 'action' },
        { text: 'Mentor a colleague on AI tool adoption to strengthen your own understanding', type: 'action' },
      ],
    },
    high: {
      summary: 'You\'re well-prepared for the AI future. Lead the transformation.',
      actions: [
        { text: 'Design the "2027 version" of your department\'s operating model with AI agents', type: 'action' },
        { text: 'Build a new hire onboarding program that integrates AI fluency from day one', type: 'action' },
        { text: 'Pilot an AI agent for a semi-autonomous workflow in your team', type: 'action' },
        { text: 'Present a "Future of [Your Department]" vision to leadership', type: 'action' },
      ],
    },
  },
  technicalFluency: {
    label: 'Technical Fluency',
    low: {
      summary: 'You don\'t yet understand how AI tools work under the hood. This limits your ability to use them effectively.',
      actions: [
        { text: 'Learn the basics: what are prompts, tokens, context windows, and temperature', type: 'action' },
        { text: 'Take "Generative AI for Everyone" by DeepLearning.AI (free)', type: 'course', url: 'https://www.deeplearning.ai/courses/generative-ai-for-everyone/' },
        { text: 'Compare outputs from 3 different AI tools (Claude, ChatGPT, Gemini) on the same task', type: 'action' },
        { text: 'Learn what "system prompts" and "custom instructions" do and set one up', type: 'action' },
      ],
    },
    medium: {
      summary: 'You have a working understanding. Push into advanced concepts to unlock more powerful use cases.',
      actions: [
        { text: 'Learn about RAG (Retrieval-Augmented Generation) and when to use it vs. fine-tuning', type: 'action' },
        { text: 'Set up a Claude Project with custom system prompt and knowledge files for a work use case', type: 'action' },
        { text: 'Experiment with temperature settings: try 0 for data extraction, 0.8 for brainstorming', type: 'action' },
        { text: 'Take "Building Systems with the ChatGPT API" by DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/' },
      ],
    },
    high: {
      summary: 'Strong technical fluency. Help others and push into cutting-edge capabilities.',
      actions: [
        { text: 'Build a multi-step AI workflow that chains different models for different strengths', type: 'action' },
        { text: 'Create a "Which AI tool for which task?" decision guide for your team', type: 'action' },
        { text: 'Explore API access and building custom AI-powered tools for your team', type: 'action' },
        { text: 'Evaluate emerging AI capabilities (multi-modal, code execution, tool use) for your workflows', type: 'action' },
      ],
    },
  },
};

// Get recommendations for a specific dimension based on score
export function getRecommendations(dimension, score) {
  const resource = dimensionResources[dimension];
  if (!resource) return null;

  if (score < 40) return { ...resource.low, level: 'low', label: resource.label };
  if (score < 70) return { ...resource.medium, level: 'medium', label: resource.label };
  return { ...resource.high, level: 'high', label: resource.label };
}

// Get top recommendations across all weak dimensions
export function getTopRecommendations(scores, limit = 8) {
  const recommendations = [];

  // Sort dimensions by score (lowest first) to prioritize weak areas
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => a - b);

  for (const [dimension, score] of sorted) {
    const rec = getRecommendations(dimension, score);
    if (rec) {
      rec.actions.forEach(action => {
        recommendations.push({
          ...action,
          dimension: rec.label,
          dimensionKey: dimension,
          score,
          priority: score < 40 ? 'high' : score < 70 ? 'medium' : 'low',
        });
      });
    }
  }

  // Return top N, prioritizing high-priority items
  return recommendations
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, limit);
}
