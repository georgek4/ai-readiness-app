// Learning resources and actionable recommendations for each assessment dimension
// Organized by score range: low (0-39), medium (40-69), high (70-100)
// Each tier has 8-12 resources so completed items can be replaced with fresh ones
// Resource types: course, video, podcast, blog, reading, resource, action

export const dimensionResources = {
  awareness: {
    label: 'AI Awareness',
    low: {
      summary: 'You\'re at the beginning of your AI journey. Focus on building foundational understanding of what AI can and can\'t do.',
      actions: [
        { text: 'Take "AI for Everyone" by Andrew Ng (4 weeks, ~2hrs/week)', type: 'course', url: 'https://www.coursera.org/learn/ai-for-everyone', duration: '8 hrs' },
        { text: 'Watch "But what is a neural network?" by 3Blue1Brown', type: 'video', url: 'https://www.youtube.com/watch?v=aircAruvnKk', duration: '19 min' },
        { text: 'Read "What Is Generative AI?" by McKinsey', type: 'reading', url: 'https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-generative-ai', duration: '10 min' },
        { text: 'Subscribe to "The Rundown AI" daily newsletter for 2 weeks', type: 'blog', url: 'https://www.therundown.ai/', duration: '5 min/day' },
        { text: 'Watch "How AI Works" by Code.org (full playlist)', type: 'video', url: 'https://www.youtube.com/playlist?list=PLzdnOPI1iJNfV5d_gUgKUH1GP7VCPfal4', duration: '45 min' },
        { text: 'Try ChatGPT or Claude for a simple work task (e.g., summarize meeting notes)', type: 'action' },
        { text: 'Listen to "Hard Fork" podcast — NYT\'s weekly AI & tech show', type: 'podcast', url: 'https://www.nytimes.com/column/hard-fork', duration: '60 min/ep' },
        { text: 'Read "State of AI Report 2024" executive summary', type: 'reading', url: 'https://www.stateof.ai/', duration: '20 min' },
        { text: 'Watch "The Inside Story of ChatGPT\'s Astonishing Potential" — TED Talk by Greg Brockman', type: 'video', url: 'https://www.youtube.com/watch?v=C_78DM8fG6E', duration: '17 min' },
        { text: 'Read Anthropic\'s "Claude\'s Character" blog post to understand AI design philosophy', type: 'blog', url: 'https://www.anthropic.com/research/claude-character', duration: '15 min' },
      ],
    },
    medium: {
      summary: 'You have a good foundation. Deepen your understanding of AI capabilities, limitations, and how it\'s transforming your industry.',
      actions: [
        { text: 'Complete Google\'s "Introduction to Generative AI" learning path', type: 'course', url: 'https://www.cloudskillsboost.google/paths/118', duration: '5 hrs' },
        { text: 'Read Ethan Mollick\'s "Co-Intelligence: Living and Working with AI"', type: 'reading', url: 'https://www.amazon.com/Co-Intelligence-Living-Working-Ethan-Mollick/dp/0593716736', duration: '6 hrs' },
        { text: 'Subscribe to Ethan Mollick\'s "One Useful Thing" Substack', type: 'blog', url: 'https://www.oneusefulthing.org/', duration: '10 min/post' },
        { text: 'Listen to "Latent Space" podcast — the AI engineer podcast', type: 'podcast', url: 'https://www.latent.space/podcast', duration: '60 min/ep' },
        { text: 'Watch "AI Explained" YouTube channel for clear breakdowns of new models', type: 'video', url: 'https://www.youtube.com/@aiexplained-official', duration: '15-30 min/ep' },
        { text: 'Identify 5 tasks in your daily workflow and classify them as Humanize/Agentify/Automate', type: 'action' },
        { text: 'Follow 3 AI thought leaders relevant to your industry on LinkedIn', type: 'action' },
        { text: 'Read "Why AI Will Save the World" by Marc Andreessen (counterpoint to AI doomerism)', type: 'reading', url: 'https://a16z.com/ai-will-save-the-world/', duration: '25 min' },
        { text: 'Watch Matt Wolfe\'s weekly AI news roundup on YouTube', type: 'video', url: 'https://www.youtube.com/@maboroshi', duration: '20 min/ep' },
        { text: 'Take "Generative AI: The Big Picture" on Pluralsight', type: 'course', url: 'https://www.pluralsight.com/courses/generative-ai-big-picture', duration: '2 hrs' },
        { text: 'Listen to "Practical AI" podcast by Changelog', type: 'podcast', url: 'https://changelog.com/practicalai', duration: '45 min/ep' },
      ],
    },
    high: {
      summary: 'Excellent awareness! Channel this into helping others and staying ahead of rapid changes in the AI landscape.',
      actions: [
        { text: 'Subscribe to research-focused sources: Anthropic blog, OpenAI blog, Google DeepMind blog', type: 'resource', url: 'https://www.anthropic.com/research', duration: '15 min/post' },
        { text: 'Read "Situational Awareness" by Leopold Aschenbrenner — the future of AI capabilities', type: 'reading', url: 'https://situational-awareness.ai/', duration: '2 hrs' },
        { text: 'Mentor a colleague who scored lower on AI Awareness', type: 'action' },
        { text: 'Present an "AI in Our Department" lunch-and-learn session', type: 'action' },
        { text: 'Listen to "Dwarkesh Podcast" — in-depth interviews with AI researchers', type: 'podcast', url: 'https://www.dwarkeshpatel.com/podcast', duration: '90 min/ep' },
        { text: 'Follow Simon Willison\'s blog for practical AI tool reviews and experiments', type: 'blog', url: 'https://simonwillison.net/', duration: '10 min/post' },
        { text: 'Join an AI-focused community (AI Tinkerers, Latent Space Discord)', type: 'action' },
        { text: 'Read key AI safety papers on Anthropic\'s research page', type: 'reading', url: 'https://www.anthropic.com/research', duration: '30 min each' },
        { text: 'Watch "Two Minute Papers" for bite-sized research breakdowns', type: 'video', url: 'https://www.youtube.com/@TwoMinutePapers', duration: '5 min/ep' },
        { text: 'Subscribe to "Import AI" newsletter by Jack Clark (Anthropic co-founder)', type: 'blog', url: 'https://importai.substack.com/', duration: '10 min/issue' },
        { text: 'Read Anthropic\'s "Core Views on AI Safety"', type: 'reading', url: 'https://www.anthropic.com/news/core-views-on-ai-safety', duration: '20 min' },
      ],
    },
  },
  currentUsage: {
    label: 'Current Usage',
    low: {
      summary: 'You\'re not yet using AI tools regularly. Start small with one tool and one task — consistency beats complexity.',
      actions: [
        { text: 'Set up a free Claude.ai account and bookmark it', type: 'action', url: 'https://claude.ai' },
        { text: 'Watch "How to Use ChatGPT — Complete Beginner\'s Guide" by Adrian Twarog', type: 'video', url: 'https://www.youtube.com/watch?v=JTxsNm9IdYU', duration: '25 min' },
        { text: 'Pick ONE routine task and use AI to help with it every day for 2 weeks', type: 'action' },
        { text: 'Ask a colleague who uses AI regularly to show you their workflow', type: 'action' },
        { text: 'Watch "How I Use AI as a [Your Role]" videos on YouTube for role-specific ideas', type: 'video', url: 'https://www.youtube.com/results?search_query=how+I+use+AI+at+work', duration: '15 min' },
        { text: 'Try using Perplexity.ai as your research assistant for one week', type: 'action', url: 'https://www.perplexity.ai' },
        { text: 'Use AI to draft 3 emails this week and compare with what you\'d normally write', type: 'action' },
        { text: 'Listen to "AI in Business" podcast for practical workplace AI examples', type: 'podcast', url: 'https://emerj.com/artificial-intelligence-podcast/', duration: '30 min/ep' },
        { text: 'Try Notion AI or Microsoft Copilot if your company provides it', type: 'action' },
        { text: 'Read "50 ChatGPT Prompts for [Your Field]" — curated prompt collections on GitHub', type: 'resource', url: 'https://github.com/f/awesome-chatgpt-prompts', duration: '20 min' },
      ],
    },
    medium: {
      summary: 'You\'re using AI but haven\'t fully embedded it. Focus on expanding the breadth of tasks and building muscle memory.',
      actions: [
        { text: 'Map your weekly tasks and identify 3 more that AI could assist with', type: 'action' },
        { text: 'Take "Work Smarter with AI" on LinkedIn Learning', type: 'course', url: 'https://www.linkedin.com/learning/how-to-use-generative-ai-building-an-ai-first-mindset', duration: '1.5 hrs' },
        { text: 'Create saved prompts/templates for your most common AI use cases', type: 'action' },
        { text: 'Track time savings: log how long tasks take with vs. without AI for 2 weeks', type: 'action' },
        { text: 'Watch "Master Claude in 20 Minutes" by Anthropic', type: 'video', url: 'https://www.youtube.com/results?search_query=how+to+use+claude+AI+tips', duration: '20 min' },
        { text: 'Explore a second AI tool beyond your primary one (add Perplexity for research, Claude for analysis)', type: 'action' },
        { text: 'Read "How People Are Really Using GenAI in 2024" by Harvard Business Review', type: 'reading', url: 'https://hbr.org/2024/03/how-people-are-really-using-genai-in-2024', duration: '12 min' },
        { text: 'Try Claude Projects to create a persistent AI workspace for a recurring task', type: 'action', url: 'https://claude.ai' },
        { text: 'Listen to "Lenny\'s Podcast" episodes on AI tools for product/business teams', type: 'podcast', url: 'https://www.lennyspodcast.com/', duration: '60 min/ep' },
        { text: 'Use AI to help prepare for your next meeting (agenda, talking points, background research)', type: 'action' },
        { text: 'Follow "There\'s An AI For That" to discover new AI tools for specific tasks', type: 'resource', url: 'https://theresanaiforthat.com/', duration: '5 min/day' },
      ],
    },
    high: {
      summary: 'You\'re a power user! Focus on systematizing, scaling, and teaching others your AI practices.',
      actions: [
        { text: 'Document your AI workflows into a team playbook others can follow', type: 'action' },
        { text: 'Build a prompt library for your team\'s top 10 use cases', type: 'action' },
        { text: 'Watch "Building AI-Powered Workflows" by Zapier', type: 'video', url: 'https://www.youtube.com/results?search_query=zapier+ai+workflow+automation', duration: '20 min' },
        { text: 'Set up automated workflows connecting AI tools (Zapier, Make, n8n)', type: 'action', url: 'https://zapier.com/ai' },
        { text: 'Propose an AI tool budget and governance policy to your manager', type: 'action' },
        { text: 'Evaluate if any workflows could move from "AI-assisted" to "AI-automated"', type: 'action' },
        { text: 'Read "The AI-First Company" by Ash Fontana', type: 'reading', url: 'https://www.amazon.com/AI-First-Company-Compete-Artificial-Intelligence/dp/0593330315', duration: '7 hrs' },
        { text: 'Create a 5-minute demo showing your best AI workflow to share with your team', type: 'action' },
        { text: 'Subscribe to Ben\'s Bites newsletter for daily AI tool roundups', type: 'blog', url: 'https://bensbites.beehiiv.com/', duration: '5 min/day' },
        { text: 'Try building a custom GPT or Claude Project for a team-specific use case', type: 'action' },
        { text: 'Listen to "The AI Breakdown" podcast for daily AI news in under 15 minutes', type: 'podcast', url: 'https://www.youtube.com/@TheAIBreakdown', duration: '15 min/ep' },
      ],
    },
  },
  skillDepth: {
    label: 'Skill Depth',
    low: {
      summary: 'Your AI skills are basic. Invest in structured learning to dramatically improve the quality of your AI outputs.',
      actions: [
        { text: 'Take "Prompt Engineering for Everyone" by DeepLearning.AI (free)', type: 'course', url: 'https://www.deeplearning.ai/short-courses/prompt-engineering-for-everyone/', duration: '1 hr' },
        { text: 'Read Anthropic\'s Prompt Engineering Guide — the gold standard', type: 'reading', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', duration: '30 min' },
        { text: 'Watch "Prompt Engineering Tutorial" by freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=_ZvnD96BbJI', duration: '1 hr' },
        { text: 'Practice the "Role → Context → Task → Format → Constraints" prompt framework for a week', type: 'action' },
        { text: 'When AI gives a poor output, try 3 different prompt approaches before giving up', type: 'action' },
        { text: 'Read "The Art of Prompting" from Google\'s prompt engineering guide', type: 'reading', url: 'https://ai.google.dev/gemini-api/docs/prompting-intro', duration: '20 min' },
        { text: 'Watch "Prompt Engineering Best Practices" by OpenAI', type: 'video', url: 'https://www.youtube.com/results?search_query=openai+prompt+engineering+best+practices', duration: '30 min' },
        { text: 'Try writing the same prompt 5 different ways and compare results', type: 'action' },
        { text: 'Listen to "Prompting with Swyx" on Latent Space podcast', type: 'podcast', url: 'https://www.latent.space/podcast', duration: '45 min' },
        { text: 'Bookmark and explore the Anthropic Prompt Library', type: 'resource', url: 'https://docs.anthropic.com/en/prompt-library/library', duration: '15 min' },
      ],
    },
    medium: {
      summary: 'You have solid skills. Push toward expertise with advanced techniques and workflow engineering.',
      actions: [
        { text: 'Take "ChatGPT Prompt Engineering for Developers" by DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', duration: '1.5 hrs' },
        { text: 'Learn chain-of-thought and task decomposition prompting techniques', type: 'action' },
        { text: 'Watch "Advanced Prompt Engineering" by Fireship', type: 'video', url: 'https://www.youtube.com/results?search_query=fireship+prompt+engineering', duration: '12 min' },
        { text: 'Read "Prompt Engineering Guide" by DAIR.AI — comprehensive open-source guide', type: 'reading', url: 'https://www.promptingguide.ai/', duration: '2 hrs' },
        { text: 'Build a reusable AI workflow for your most time-consuming weekly task', type: 'action' },
        { text: 'Create quality evaluation criteria for AI outputs in your domain', type: 'action' },
        { text: 'Take "Building AI Applications with Haystack" on DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/', duration: '1 hr' },
        { text: 'Experiment with Claude\'s system prompts to create role-specific assistants', type: 'action' },
        { text: 'Listen to "Cognitive Revolution" podcast for advanced AI application patterns', type: 'podcast', url: 'https://www.cognitiverevolution.ai/', duration: '60 min/ep' },
        { text: 'Read Simon Willison\'s posts on advanced prompting patterns', type: 'blog', url: 'https://simonwillison.net/tags/prompt-engineering/', duration: '15 min/post' },
        { text: 'Try multi-turn conversations: use AI to critique and improve its own outputs', type: 'action' },
      ],
    },
    high: {
      summary: 'Strong skills! Focus on teaching others, building scalable systems, and pushing into AI engineering.',
      actions: [
        { text: 'Create and share prompt templates that encode your team\'s best practices', type: 'action' },
        { text: 'Run a "Prompt Engineering Workshop" for your team', type: 'action' },
        { text: 'Take "Building with the Anthropic API" course on DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/', duration: '1.5 hrs' },
        { text: 'Read "Build Effective Agents" by Anthropic', type: 'reading', url: 'https://www.anthropic.com/research/building-effective-agents', duration: '25 min' },
        { text: 'Build automated quality checks for AI-generated outputs', type: 'action' },
        { text: 'Experiment with multi-step AI workflows that chain different tools together', type: 'action' },
        { text: 'Watch "AI Engineering" conference talks on YouTube', type: 'video', url: 'https://www.youtube.com/results?search_query=AI+engineer+summit+2024', duration: '20-40 min/talk' },
        { text: 'Contribute to an open-source prompt library or AI toolkit', type: 'action' },
        { text: 'Read OpenAI\'s prompt engineering best practices docs', type: 'reading', url: 'https://platform.openai.com/docs/guides/prompt-engineering', duration: '30 min' },
        { text: 'Design and document a department-wide AI style guide for consistent outputs', type: 'action' },
        { text: 'Subscribe to "Ahead of AI" newsletter by Sebastian Raschka', type: 'blog', url: 'https://magazine.sebastianraschka.com/', duration: '15 min/issue' },
      ],
    },
  },
  strategicThinking: {
    label: 'Strategic Thinking',
    low: {
      summary: 'You\'re focused on tactical AI use. Build strategic perspective on how AI transforms business functions and creates competitive advantage.',
      actions: [
        { text: 'Watch "AI Strategy for Business Leaders" on Coursera', type: 'course', url: 'https://www.coursera.org/learn/ai-strategy', duration: '6 hrs' },
        { text: 'Read HBR\'s collection on AI and Machine Learning', type: 'reading', url: 'https://hbr.org/topic/subject/ai-and-machine-learning', duration: '15 min/article' },
        { text: 'Map 10 of your department\'s activities to the Humanize/Agentify/Automate framework', type: 'action' },
        { text: 'Watch "How to Think About AI Strategy" — McKinsey talks', type: 'video', url: 'https://www.youtube.com/results?search_query=mckinsey+ai+strategy+business', duration: '20 min' },
        { text: 'Read "The Economic Potential of Generative AI" by McKinsey', type: 'reading', url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier', duration: '30 min' },
        { text: 'Have a conversation with your manager about AI strategy for your team', type: 'action' },
        { text: 'Listen to "a]6z" podcast episodes on AI business strategy', type: 'podcast', url: 'https://a16z.com/podcasts/', duration: '40 min/ep' },
        { text: 'Watch "How CEOs Are Actually Using AI" by Harvard Business School', type: 'video', url: 'https://www.youtube.com/results?search_query=harvard+business+school+ceo+ai+strategy', duration: '15 min' },
        { text: 'Read BCG\'s "AI at Scale" insights', type: 'reading', url: 'https://www.bcg.com/capabilities/artificial-intelligence', duration: '20 min' },
        { text: 'Follow "AI Supremacy" newsletter for business-focused AI analysis', type: 'blog', url: 'https://aisupremacy.substack.com/', duration: '10 min/issue' },
      ],
    },
    medium: {
      summary: 'Good strategic instincts. Develop the ability to build AI business cases and drive adoption initiatives.',
      actions: [
        { text: 'Build a one-page AI adoption business case for your team\'s top workflow', type: 'action' },
        { text: 'Take "AI Transformation" by DeepLearning.AI on Coursera', type: 'course', url: 'https://www.coursera.org/learn/ai-transformation', duration: '6 hrs' },
        { text: 'Read "Competing in the Age of AI" by Iansiti & Lakhani', type: 'reading', url: 'https://www.amazon.com/Competing-Age-AI-Leadership-Algorithms/dp/1633697622', duration: '8 hrs' },
        { text: 'Calculate the ROI of one AI-assisted workflow (time saved × hourly rate × frequency)', type: 'action' },
        { text: 'Watch "How Microsoft is Transforming Work with AI" case study', type: 'video', url: 'https://www.youtube.com/results?search_query=microsoft+copilot+enterprise+transformation+case+study', duration: '20 min' },
        { text: 'Interview 3 peers in other departments about their AI adoption journey', type: 'action' },
        { text: 'Listen to "No Priors" podcast — AI venture capital perspective', type: 'podcast', url: 'https://www.youtube.com/@NoPriorsPodcast', duration: '45 min/ep' },
        { text: 'Read Bain & Company\'s "AI in the Enterprise" survey results', type: 'reading', url: 'https://www.bain.com/insights/topics/artificial-intelligence/', duration: '20 min' },
        { text: 'Create a risk/benefit matrix for AI adoption in your top 5 workflows', type: 'action' },
        { text: 'Read "AI-First: How Startups Are Building AI Into Every Aspect" on TechCrunch', type: 'blog', url: 'https://techcrunch.com/tag/artificial-intelligence/', duration: '10 min/article' },
        { text: 'Attend a virtual "AI in Enterprise" webinar (Gartner, Forrester, or McKinsey)', type: 'action' },
      ],
    },
    high: {
      summary: 'You think strategically about AI. Now drive organizational change and position your team as AI leaders.',
      actions: [
        { text: 'Present an AI transformation roadmap to your leadership team', type: 'action' },
        { text: 'Watch "AI Governance and Strategy" talks from the World Economic Forum', type: 'video', url: 'https://www.youtube.com/results?search_query=world+economic+forum+AI+governance+strategy', duration: '30 min' },
        { text: 'Read "Power and Prediction: The Disruptive Economics of AI" by Agrawal, Gans & Goldfarb', type: 'reading', url: 'https://www.amazon.com/Power-Prediction-Disruptive-Economics-Artificial/dp/1647824192', duration: '8 hrs' },
        { text: 'Champion an AI Center of Excellence or AI Guild at your organization', type: 'action' },
        { text: 'Build cross-functional alignment on AI governance and standards', type: 'action' },
        { text: 'Listen to "The Exponential View" podcast with Azeem Azhar', type: 'podcast', url: 'https://www.exponentialview.co/podcast', duration: '45 min/ep' },
        { text: 'Develop metrics to track AI adoption maturity across your org', type: 'action' },
        { text: 'Read MIT Sloan Management Review\'s AI & analytics section', type: 'reading', url: 'https://sloanreview.mit.edu/topic/artificial-intelligence-and-business-strategy/', duration: '15 min/article' },
        { text: 'Write a "2027 Vision" doc for how AI will reshape your department\'s operations', type: 'action' },
        { text: 'Follow Stratechery by Ben Thompson for strategic tech analysis', type: 'blog', url: 'https://stratechery.com/', duration: '15 min/post' },
        { text: 'Benchmark your team\'s AI maturity against competitors using public case studies', type: 'action' },
      ],
    },
  },
  futureReadiness: {
    label: 'Future Readiness',
    low: {
      summary: 'AI agents and autonomous systems are coming fast. Start building the skills and mental models you\'ll need for a world with AI coworkers.',
      actions: [
        { text: 'Read "Building Effective Agents" by Anthropic', type: 'reading', url: 'https://www.anthropic.com/research/building-effective-agents', duration: '20 min' },
        { text: 'Take "AI Agents in LangGraph" by DeepLearning.AI (free)', type: 'course', url: 'https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/', duration: '1 hr' },
        { text: 'Watch "What are AI Agents?" explainer by IBM Technology', type: 'video', url: 'https://www.youtube.com/results?search_query=IBM+technology+what+are+AI+agents', duration: '12 min' },
        { text: 'Identify which of your skills are "uniquely human" and double down on them', type: 'action' },
        { text: 'Create a personal AI skill development plan for the next 6 months', type: 'action' },
        { text: 'Take "Future Skills: AI" collection on LinkedIn Learning', type: 'course', url: 'https://www.linkedin.com/learning/topics/artificial-intelligence', duration: '4 hrs' },
        { text: 'Listen to "Eye on AI" podcast — focused on enterprise AI and what\'s next', type: 'podcast', url: 'https://www.eye-on.ai/', duration: '30 min/ep' },
        { text: 'Read "The AI-First Company" to understand how AI reshapes organizations', type: 'reading', url: 'https://www.amazon.com/AI-First-Company-Compete-Artificial-Intelligence/dp/0593330315', duration: '7 hrs' },
        { text: 'Explore Claude\'s tool use and computer use capabilities (even just reading the docs)', type: 'resource', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use', duration: '20 min' },
        { text: 'Watch "The Jobs AI Will Create (Not Just Destroy)" by Harvard Business Review', type: 'video', url: 'https://www.youtube.com/results?search_query=HBR+jobs+AI+will+create', duration: '15 min' },
      ],
    },
    medium: {
      summary: 'You\'re thinking about the future. Now build hands-on experience with emerging AI patterns like agents and multi-modal systems.',
      actions: [
        { text: 'Experiment with an AI agent framework (Claude MCP, AutoGen, or CrewAI)', type: 'action' },
        { text: 'Take "Multi AI Agent Systems" by DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/', duration: '1.5 hrs' },
        { text: 'Watch "AI Agents Are Here — What You Need to Know" by Y Combinator', type: 'video', url: 'https://www.youtube.com/results?search_query=Y+combinator+AI+agents', duration: '20 min' },
        { text: 'Design an "AI-first" version of one of your team\'s core workflows', type: 'action' },
        { text: 'Read "The Future of Work with AI" report by World Economic Forum', type: 'reading', url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/', duration: '30 min' },
        { text: 'Develop oversight skills: learn to evaluate when AI agents succeed vs. fail', type: 'action' },
        { text: 'Listen to "Gradient Dissent" podcast by Weights & Biases', type: 'podcast', url: 'https://wandb.ai/fully-connected/gradient-dissent', duration: '45 min/ep' },
        { text: 'Try a multi-modal AI task: combine text + image + code in one workflow', type: 'action' },
        { text: 'Read about MCP (Model Context Protocol) and how it connects AI to tools', type: 'reading', url: 'https://modelcontextprotocol.io/', duration: '15 min' },
        { text: 'Follow Sequoia Capital\'s "AI 50" list to track emerging AI companies', type: 'resource', url: 'https://www.sequoiacap.com/article/ai-50-2024/', duration: '15 min' },
        { text: 'Mentor a colleague on AI tool adoption to strengthen your own understanding', type: 'action' },
      ],
    },
    high: {
      summary: 'You\'re well-prepared for the AI future. Lead the transformation and help build the AI-augmented organization.',
      actions: [
        { text: 'Design the "2027 version" of your department\'s operating model with AI agents', type: 'action' },
        { text: 'Take "AI Agentic Design Patterns" by DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/', duration: '1 hr' },
        { text: 'Watch "Building the AI-Native Enterprise" talks from AI Engineer Summit', type: 'video', url: 'https://www.youtube.com/results?search_query=AI+engineer+summit+2024+enterprise', duration: '30 min/talk' },
        { text: 'Build a new hire onboarding program that integrates AI fluency from day one', type: 'action' },
        { text: 'Pilot an AI agent for a semi-autonomous workflow in your team', type: 'action' },
        { text: 'Read "The Coming Wave" by Mustafa Suleyman (DeepMind co-founder)', type: 'reading', url: 'https://www.amazon.com/Coming-Wave-Technology-Twenty-first-Centurys/dp/0593593952', duration: '9 hrs' },
        { text: 'Present a "Future of [Your Department]" vision to leadership', type: 'action' },
        { text: 'Listen to "This Day in AI" podcast for daily cutting-edge AI developments', type: 'podcast', url: 'https://www.youtube.com/@ThisdayinAI', duration: '30 min/ep' },
        { text: 'Evaluate and pilot voice AI, vision AI, or code AI tools for your team', type: 'action' },
        { text: 'Read Anthropic\'s "Responsible Scaling Policy" for governance models', type: 'reading', url: 'https://www.anthropic.com/news/anthropics-responsible-scaling-policy', duration: '20 min' },
        { text: 'Create an "AI Innovation Lab" — a safe space for your team to experiment', type: 'action' },
      ],
    },
  },
  technicalFluency: {
    label: 'Technical Fluency',
    low: {
      summary: 'You don\'t yet understand how AI tools work under the hood. Even non-technical roles benefit from understanding the basics of how these systems function.',
      actions: [
        { text: 'Take "Generative AI for Everyone" by DeepLearning.AI (free, non-technical)', type: 'course', url: 'https://www.deeplearning.ai/courses/generative-ai-for-everyone/', duration: '3 hrs' },
        { text: 'Watch "Large Language Models explained briefly" by 3Blue1Brown', type: 'video', url: 'https://www.youtube.com/results?search_query=3blue1brown+large+language+models', duration: '20 min' },
        { text: 'Learn the basics: prompts, tokens, context windows, and temperature settings', type: 'action' },
        { text: 'Read "What Is an LLM?" plain-English explainer by Anthropic', type: 'reading', url: 'https://www.anthropic.com/news/what-is-an-llm', duration: '10 min' },
        { text: 'Compare outputs from 3 different AI tools (Claude, ChatGPT, Gemini) on the same task', type: 'action' },
        { text: 'Learn what "system prompts" and "custom instructions" do and set one up', type: 'action' },
        { text: 'Watch "How ChatGPT Works Technically" by Fireship', type: 'video', url: 'https://www.youtube.com/results?search_query=fireship+how+chatgpt+works', duration: '10 min' },
        { text: 'Listen to "Lex Fridman Podcast" episodes with AI researchers (e.g., Dario Amodei)', type: 'podcast', url: 'https://www.youtube.com/watch?v=ugvHCXCOmm4', duration: '2.5 hrs' },
        { text: 'Read Anthropic\'s "Claude 3 Model Card" to understand model capabilities', type: 'reading', url: 'https://www.anthropic.com/news/claude-3-family', duration: '15 min' },
        { text: 'Try asking AI to explain its own limitations — it\'s surprisingly honest about what it can\'t do', type: 'action' },
      ],
    },
    medium: {
      summary: 'You have a working understanding. Push into advanced concepts to unlock more powerful and reliable use cases.',
      actions: [
        { text: 'Take "Building Systems with the ChatGPT API" by DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/', duration: '1.5 hrs' },
        { text: 'Learn about RAG (Retrieval-Augmented Generation) and when to use it', type: 'action' },
        { text: 'Watch "RAG Explained in 10 Minutes" — visual walkthrough', type: 'video', url: 'https://www.youtube.com/results?search_query=RAG+retrieval+augmented+generation+explained', duration: '10 min' },
        { text: 'Set up a Claude Project with custom system prompt and knowledge files', type: 'action', url: 'https://claude.ai' },
        { text: 'Experiment with temperature settings: try 0 for data extraction, 0.8 for brainstorming', type: 'action' },
        { text: 'Read "Understanding AI Hallucinations" and learn mitigation techniques', type: 'reading', url: 'https://www.anthropic.com/news', duration: '15 min' },
        { text: 'Take "LangChain: Chat with Your Data" by DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/langchain-chat-with-your-data/', duration: '1.5 hrs' },
        { text: 'Listen to "The TWIML AI Podcast" (This Week in Machine Learning)', type: 'podcast', url: 'https://twimlai.com/podcast/', duration: '45 min/ep' },
        { text: 'Read about model context windows and how to work within them effectively', type: 'reading', url: 'https://docs.anthropic.com/en/docs/build-with-claude/context-windows', duration: '10 min' },
        { text: 'Try using AI APIs directly (even through a no-code tool like Postman)', type: 'action' },
        { text: 'Follow "The Batch" newsletter by DeepLearning.AI for weekly technical updates', type: 'blog', url: 'https://www.deeplearning.ai/the-batch/', duration: '10 min/week' },
      ],
    },
    high: {
      summary: 'Strong technical fluency. Help others understand the technology and push into cutting-edge capabilities.',
      actions: [
        { text: 'Build a multi-step AI workflow chaining different models for different strengths', type: 'action' },
        { text: 'Take "Building Agentic RAG with LlamaIndex" by DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/', duration: '1 hr' },
        { text: 'Watch "State of GPT" by Andrej Karpathy — deep dive into how LLMs work', type: 'video', url: 'https://www.youtube.com/watch?v=bZQun8Y4L2A', duration: '45 min' },
        { text: 'Create a "Which AI tool for which task?" decision guide for your team', type: 'action' },
        { text: 'Explore API access and building custom AI-powered tools (Anthropic API, OpenAI API)', type: 'action', url: 'https://docs.anthropic.com/en/docs/initial-setup' },
        { text: 'Read about fine-tuning vs. prompting vs. RAG — when to use each approach', type: 'reading', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', duration: '25 min' },
        { text: 'Evaluate emerging capabilities: multi-modal, code execution, tool use for your workflows', type: 'action' },
        { text: 'Listen to "Machine Learning Street Talk" for technical deep-dives', type: 'podcast', url: 'https://www.youtube.com/@MachineLearningStreetTalk', duration: '90 min/ep' },
        { text: 'Read "Attention Is All You Need" paper — the foundation of modern AI (or a good explainer)', type: 'reading', url: 'https://arxiv.org/abs/1706.03762', duration: '45 min' },
        { text: 'Build an evaluation framework to systematically test AI outputs for your use cases', type: 'action' },
        { text: 'Subscribe to "AI Papers to Read" by Interconnects (Nathan Lambert)', type: 'blog', url: 'https://www.interconnects.ai/', duration: '15 min/issue' },
      ],
    },
  },
};

// Completion tracking key in localStorage
const REC_COMPLETION_KEY = 'ai_readiness_rec_completed';

// Get set of completed recommendation keys for an assessment
export function getCompletedRecs(assessmentId) {
  try {
    const all = JSON.parse(localStorage.getItem(REC_COMPLETION_KEY) || '{}');
    return new Set(all[assessmentId] || []);
  } catch { return new Set(); }
}

// Toggle a recommendation as completed/uncompleted
export function toggleRecCompletion(assessmentId, recKey) {
  try {
    const all = JSON.parse(localStorage.getItem(REC_COMPLETION_KEY) || '{}');
    const completed = new Set(all[assessmentId] || []);
    if (completed.has(recKey)) {
      completed.delete(recKey);
    } else {
      completed.add(recKey);
    }
    all[assessmentId] = [...completed];
    localStorage.setItem(REC_COMPLETION_KEY, JSON.stringify(all));
    return completed;
  } catch { return new Set(); }
}

// Get recommendations for a specific dimension based on score
// Returns both primary (4 uncompleted) and completed items
export function getRecommendations(dimension, score, assessmentId = null) {
  const resource = dimensionResources[dimension];
  if (!resource) return null;

  const tier = score < 40 ? resource.low : score < 70 ? resource.medium : resource.high;
  const level = score < 40 ? 'low' : score < 70 ? 'medium' : 'high';
  const completedSet = assessmentId ? getCompletedRecs(assessmentId) : new Set();

  // Tag each action with a stable key
  const taggedActions = tier.actions.map((action, i) => ({
    ...action,
    recKey: `${dimension}_${level}_${i}`,
  }));

  const completed = taggedActions.filter(a => completedSet.has(a.recKey));
  const uncompleted = taggedActions.filter(a => !completedSet.has(a.recKey));

  return {
    summary: tier.summary,
    level,
    label: resource.label,
    actions: uncompleted,          // uncompleted items shown first
    completedActions: completed,    // completed items shown separately
    totalCount: taggedActions.length,
    completedCount: completed.length,
  };
}

// Get top recommendations across all weak dimensions (uncompleted only)
export function getTopRecommendations(scores, limit = 8, assessmentId = null) {
  const recommendations = [];
  const completedSet = assessmentId ? getCompletedRecs(assessmentId) : new Set();

  // Sort dimensions by score (lowest first) to prioritize weak areas
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => a - b);

  for (const [dimension, score] of sorted) {
    const resource = dimensionResources[dimension];
    if (!resource) continue;

    const tier = score < 40 ? resource.low : score < 70 ? resource.medium : resource.high;
    const level = score < 40 ? 'low' : score < 70 ? 'medium' : 'high';

    tier.actions.forEach((action, i) => {
      const recKey = `${dimension}_${level}_${i}`;
      if (!completedSet.has(recKey)) {
        recommendations.push({
          ...action,
          recKey,
          dimension: resource.label,
          dimensionKey: dimension,
          score,
          priority: score < 40 ? 'high' : score < 70 ? 'medium' : 'low',
        });
      }
    });
  }

  // Return top N, prioritizing high-priority items with URL links first
  return recommendations
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;
      // Within same priority, prefer items with URLs (actionable links)
      if (a.url && !b.url) return -1;
      if (!a.url && b.url) return 1;
      return 0;
    })
    .slice(0, limit);
}
