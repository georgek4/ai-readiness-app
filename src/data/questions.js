// AI Readiness Assessment Question Bank
// 650 questions: 13 departments × 5 levels × 10 questions each
// Redesigned to resist gaming: randomized correct positions, plausible distractors,
// similarly-detailed options, trap answers, and non-linear ordering.

const deptMeta = {
  marketing: { code: 'MKT', tools: ['ChatGPT', 'Jasper', 'Copy.ai', 'HubSpot AI', 'Midjourney', 'DALL-E', 'Grammarly AI', 'Surfer SEO'], workflows: ['content creation', 'campaign management', 'SEO', 'email marketing', 'social media', 'analytics', 'lead scoring', 'A/B testing'] },
  sales: { code: 'SAL', tools: ['Gong', 'Outreach', 'Salesloft', 'ChatGPT', 'LinkedIn Sales Nav', 'Clari', 'People.ai', 'ZoomInfo'], workflows: ['prospecting', 'outreach', 'discovery calls', 'pipeline management', 'forecasting', 'CRM updates', 'proposal creation', 'deal review'] },
  presales: { code: 'PRE', tools: ['Consensus', 'Demostack', 'ChatGPT', 'Loopio', 'RFPIO', 'Reprise', 'Navattic'], workflows: ['demo preparation', 'RFP responses', 'POC management', 'technical discovery', 'competitive positioning', 'security questionnaires'] },
  professional_services: { code: 'PS', tools: ['Monday.com AI', 'Smartsheet', 'ChatGPT', 'Jira', 'Confluence AI', 'MS Project', 'Asana AI'], workflows: ['project planning', 'data migration', 'configuration', 'training delivery', 'status reporting', 'resource planning'] },
  value_engineering: { code: 'VE', tools: ['ChatGPT', 'Excel AI', 'Tableau', 'Power BI', 'Google Sheets AI', 'Notion AI'], workflows: ['business case building', 'ROI modeling', 'benchmark research', 'value realization tracking', 'EBR preparation'] },
  product_management: { code: 'PM', tools: ['ChatGPT', 'Notion AI', 'Productboard', 'Amplitude', 'Mixpanel', 'Figma AI', 'Linear', 'Jira'], workflows: ['PRD writing', 'user research synthesis', 'roadmap planning', 'sprint planning', 'data analysis', 'competitor monitoring'] },
  engineering: { code: 'ENG', tools: ['GitHub Copilot', 'Cursor', 'Claude', 'ChatGPT', 'Tabnine', 'Snyk AI', 'Datadog AI', 'SonarQube'], workflows: ['code writing', 'code review', 'testing', 'debugging', 'CI/CD', 'monitoring', 'documentation', 'architecture design'] },
  product_design: { code: 'DES', tools: ['Figma AI', 'Midjourney', 'DALL-E', 'Adobe Firefly', 'Uizard', 'Galileo AI', 'ChatGPT'], workflows: ['wireframing', 'prototyping', 'user research', 'accessibility auditing', 'design system maintenance', 'visual design'] },
  customer_education: { code: 'EDU', tools: ['ChatGPT', 'Synthesia', 'Descript', 'Loom AI', 'Notion AI', 'DeepL', 'Grammarly AI'], workflows: ['documentation writing', 'video production', 'course creation', 'content localization', 'release notes', 'community management'] },
  demo_engineering: { code: 'DMO', tools: ['Reprise', 'Navattic', 'Demostack', 'ChatGPT', 'Faker.js', 'Terraform', 'GitHub Actions'], workflows: ['demo data generation', 'environment provisioning', 'interactive demo building', 'video production', 'demo analytics'] },
  industry_strategy: { code: 'IND', tools: ['ChatGPT', 'Perplexity', 'AlphaSense', 'Gartner AI', 'CB Insights', 'Notion AI'], workflows: ['trend analysis', 'thought leadership', 'industry content creation', 'benchmark research', 'advisory board facilitation'] },
  revenue_operations: { code: 'REV', tools: ['Salesforce Einstein', 'Clari', 'Gong', 'LeanData', 'ChatGPT', 'Tableau', 'dbt'], workflows: ['CRM administration', 'pipeline analytics', 'forecasting', 'territory planning', 'data enrichment', 'reporting'] },
  enablement: { code: 'EN', tools: ['Gong', 'Highspot', 'Seismic', 'ChatGPT', 'Lessonly', 'Mindtickle', 'Allego'], workflows: ['onboarding design', 'content creation', 'call coaching', 'certification programs', 'competitive training', 'skills assessment'] },
};

// Level 1: AI Awareness (basic knowledge)
function generateL1Questions(deptId) {
  const m = deptMeta[deptId];
  return [
    {
      id: `${m.code}-L1-001`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `Which of the following best describes generative AI as it applies to ${deptId.replace(/_/g, ' ')}?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'AI that can create new content, analyze data, and assist with knowledge work based on patterns learned from training data', points: 5 },
        { id: 'b', text: 'An advanced machine learning system that autonomously writes code, manages databases, and replaces entire business processes end-to-end', points: 1 },
        { id: 'c', text: 'A database that stores and retrieves information using natural language queries instead of SQL commands', points: 1 },
        { id: 'd', text: 'Software that follows pre-programmed decision trees and rules to complete tasks without any learning capability', points: 0 },
      ],
    },
    {
      id: `${m.code}-L1-002`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `How familiar are you with AI tools commonly used in ${deptId.replace(/_/g, ' ')} (e.g., ${m.tools.slice(0, 3).join(', ')})?`,
      type: 'self_rating',
      options: [
        { id: '1', text: "I haven't heard of any of these tools", points: 1 },
        { id: '2', text: "I've heard of them but never used them", points: 2 },
        { id: '3', text: "I've tried one or two briefly", points: 3 },
        { id: '4', text: 'I use at least one regularly', points: 4 },
        { id: '5', text: 'I use multiple AI tools as part of my daily workflow', points: 5 },
      ],
    },
    {
      id: `${m.code}-L1-003`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: 'What does the term "prompt engineering" refer to?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Building custom AI models from scratch using large datasets and GPU clusters to train neural networks for specific business domains', points: 0 },
        { id: 'b', text: 'Managing the technical infrastructure that runs AI systems, including server provisioning, load balancing, and API gateway configuration', points: 0 },
        { id: 'c', text: 'Crafting effective instructions and context to get better, more relevant outputs from AI tools', points: 5 },
        { id: 'd', text: 'Optimizing the speed and latency of AI model responses through caching, batching, and hardware acceleration techniques', points: 0 },
      ],
    },
    {
      id: `${m.code}-L1-004`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: 'Which statement about AI-generated content is most accurate?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'AI-generated content is always factually accurate because the models are trained on verified information sources and peer-reviewed data', points: 0 },
        { id: 'b', text: 'AI-generated content is identical every time you give it the same prompt, making it reliable and consistent across all uses', points: 1 },
        { id: 'c', text: 'AI can now generate content that is indistinguishable from expert human work, making human review unnecessary for most applications', points: 0 },
        { id: 'd', text: 'AI-generated content should be reviewed by a human for accuracy, tone, and appropriateness before being used', points: 5 },
      ],
    },
    {
      id: `${m.code}-L1-005`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `How often do you encounter discussions about AI adoption in your ${deptId.replace(/_/g, ' ')} team?`,
      type: 'frequency',
      options: [
        { id: 'never', text: 'Never', points: 0 },
        { id: 'rarely', text: 'Rarely (a few times a year)', points: 1 },
        { id: 'sometimes', text: 'Sometimes (monthly)', points: 2 },
        { id: 'often', text: 'Often (weekly)', points: 4 },
        { id: 'always', text: 'Daily or near-daily', points: 5 },
      ],
    },
    {
      id: `${m.code}-L1-006`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: 'What is an "AI hallucination"?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'A visual artifact that appears when AI generates images using diffusion models at low resolution settings', points: 1 },
        { id: 'b', text: 'When an AI system crashes or produces error messages due to exceeding its computational limits', points: 0 },
        { id: 'c', text: 'When AI generates information that sounds plausible and confident but is factually incorrect or entirely fabricated', points: 5 },
        { id: 'd', text: 'A deliberate feature where AI creates imaginative, creative content that goes beyond the literal prompt instructions', points: 1 },
      ],
    },
    {
      id: `${m.code}-L1-007`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `In the context of ${deptId.replace(/_/g, ' ')}, what is the primary benefit of AI adoption?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Eliminating the need for domain expertise by having AI make all complex decisions based on its superior knowledge and pattern recognition', points: 0 },
        { id: 'b', text: 'Augmenting human capabilities — handling repetitive tasks so people can focus on higher-value work', points: 5 },
        { id: 'c', text: 'Reducing headcount by at least 40-60% within two years as AI agents take over most knowledge worker functions', points: 0 },
        { id: 'd', text: 'Creating a competitive moat through proprietary AI models that competitors cannot replicate or reverse-engineer', points: 1 },
      ],
    },
    {
      id: `${m.code}-L1-008`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: 'How would you rate your overall understanding of how AI can be applied in your day-to-day work?',
      type: 'self_rating',
      options: [
        { id: '1', text: 'No understanding at all', points: 1 },
        { id: '2', text: 'Very basic awareness', points: 2 },
        { id: '3', text: 'Moderate understanding — I can see some use cases', points: 3 },
        { id: '4', text: 'Good understanding — I know several ways AI could help', points: 4 },
        { id: '5', text: 'Strong understanding — I can identify AI opportunities across most of my workflows', points: 5 },
      ],
    },
    {
      id: `${m.code}-L1-009`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: 'In the Humanize / Agentify / Automate framework, what does "Agentify" mean?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Outsourcing the task to a third-party agency or freelancer who uses AI tools on your behalf to deliver faster results', points: 0 },
        { id: 'b', text: 'Fully automating the task with zero human involvement so it runs on autopilot 24/7 without any oversight needed', points: 2 },
        { id: 'c', text: 'Delegating the task to an AI agent that works semi-autonomously with human oversight at key decision points', points: 5 },
        { id: 'd', text: 'Assigning the task to a dedicated human agent who specializes in AI-assisted execution and acts as a liaison between teams', points: 0 },
      ],
    },
    {
      id: `${m.code}-L1-010`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `Which of these ${deptId.replace(/_/g, ' ')} tasks would be LEAST suitable for full AI automation?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Scheduling meetings and managing calendar invitations across multiple time zones and stakeholder groups', points: 0 },
        { id: 'b', text: 'Strategic decision-making that requires empathy, organizational context, and navigating ambiguity', points: 5 },
        { id: 'c', text: 'Generating standard weekly reports from dashboards and existing data sources using predefined templates', points: 0 },
        { id: 'd', text: 'Data entry, CRM field updates, and syncing information between systems based on defined rules', points: 0 },
      ],
    },
  ];
}

// Level 2: Current Usage
function generateL2Questions(deptId) {
  const m = deptMeta[deptId];
  return [
    {
      id: `${m.code}-L2-001`, department: deptId, level: 2, weight: 1.0, difficulty: 'beginner',
      questionText: `How frequently do you currently use AI tools in your ${deptId.replace(/_/g, ' ')} work?`,
      type: 'frequency',
      options: [
        { id: 'never', text: 'Never — I do everything manually', points: 0 },
        { id: 'rarely', text: 'Rarely — I tried it once or twice', points: 1 },
        { id: 'sometimes', text: 'A few times per month for specific tasks', points: 2 },
        { id: 'often', text: 'Multiple times per week across different tasks', points: 4 },
        { id: 'always', text: 'Daily — AI is part of my standard workflow', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-002`, department: deptId, level: 2, weight: 1.0, difficulty: 'beginner',
      questionText: `Which best describes your current AI usage for ${deptId.replace(/_/g, ' ')} workflows?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I have not used AI for any work tasks yet', points: 0 },
        { id: 'b', text: `I've integrated AI across most of my key workflows including ${m.workflows.slice(0, 4).join(', ')} and actively optimize my approach`, points: 5 },
        { id: 'c', text: `I've used AI for one specific task like ${m.workflows[0]} but haven't expanded beyond that`, points: 2 },
        { id: 'd', text: `I use AI for a few different workflows including ${m.workflows[0]} and ${m.workflows[1]}, with reasonable consistency`, points: 4 },
      ],
    },
    {
      id: `${m.code}-L2-003`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: `When you use AI to assist with ${m.workflows[0]}, what is your typical approach?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'I provide detailed context, iterate on the output, and refine until quality matches my standards', points: 4 },
        { id: 'b', text: "I don't use AI for this workflow yet", points: 0 },
        { id: 'c', text: 'I have refined prompt templates with structured context, systematic review process, and documented best practices I can share', points: 5 },
        { id: 'd', text: 'I type in a basic request and use whatever output I get, maybe with light editing', points: 2 },
      ],
    },
    {
      id: `${m.code}-L2-004`, department: deptId, level: 2, weight: 1.0, difficulty: 'beginner',
      questionText: 'Does your team have shared guidelines or best practices for using AI tools?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Yes, we have comprehensive documented guidelines covering tools, use cases, quality standards, and data handling protocols', points: 5 },
        { id: 'b', text: 'We have basic documented guidelines that cover the essentials like approved tools and general usage tips', points: 3 },
        { id: 'c', text: 'No formal guidelines exist — some people informally share tips but nothing is documented or standardized', points: 2 },
        { id: 'd', text: 'No, there are no guidelines at all and the topic hasn\'t been discussed at a team level', points: 0 },
      ],
    },
    {
      id: `${m.code}-L2-005`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How do you currently handle sensitive or confidential data when using AI tools?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I always use the most advanced AI model available and trust its built-in security features to protect any data I input', points: 0 },
        { id: 'b', text: 'I follow our data classification policy, only use approved enterprise AI tools for sensitive data, and anonymize when needed', points: 5 },
        { id: 'c', text: "I haven't given much thought to data sensitivity when using AI tools — I use whatever is fastest", points: 0 },
        { id: 'd', text: 'I try to avoid putting sensitive data in AI tools but I don\'t have a formal process — it\'s mostly gut feeling', points: 2 },
      ],
    },
    {
      id: `${m.code}-L2-006`, department: deptId, level: 2, weight: 1.0, difficulty: 'beginner',
      questionText: `How many distinct AI tools or features do you use regularly for ${deptId.replace(/_/g, ' ')} work?`,
      type: 'self_rating',
      options: [
        { id: '1', text: 'None', points: 0 },
        { id: '2', text: '1 tool', points: 2 },
        { id: '3', text: '2-3 tools', points: 3 },
        { id: '4', text: '4-5 tools', points: 4 },
        { id: '5', text: '6+ tools across different workflows', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-007`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How would you estimate the time savings from your current AI tool usage?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Significant — saves me 5+ hours per week on tasks I was already doing', points: 5 },
        { id: 'b', text: 'Moderate — saves me 2-5 hours per week across several workflows', points: 4 },
        { id: 'c', text: 'Minimal — maybe 30 minutes per week at most', points: 2 },
        { id: 'd', text: 'No measurable savings — I don\'t use AI regularly or it doesn\'t noticeably help yet', points: 0 },
      ],
    },
    {
      id: `${m.code}-L2-008`, department: deptId, level: 2, weight: 1.0, difficulty: 'beginner',
      questionText: 'Have you shared AI techniques or prompt strategies with your teammates?',
      type: 'frequency',
      options: [
        { id: 'never', text: 'Never', points: 0 },
        { id: 'rarely', text: 'Rarely — once or twice', points: 1 },
        { id: 'sometimes', text: 'Sometimes — when it comes up', points: 2 },
        { id: 'often', text: 'Often — I regularly share what works', points: 4 },
        { id: 'always', text: 'Actively and consistently — I champion adoption', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-009`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: `A colleague asks for help getting started with AI for ${m.workflows[1]}. What do you do?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'I show them specific tools and prompts I use, walk through a live example, and check in later to see how it\'s going', points: 4 },
        { id: 'b', text: 'I suggest they try ChatGPT and send them a few blog posts, but I can\'t give hands-on guidance for their specific workflow', points: 2 },
        { id: 'c', text: 'I recommend they immediately adopt a full AI-powered tech stack with automated pipelines and API integrations for maximum efficiency', points: 1 },
        { id: 'd', text: 'I honestly can\'t help much — I\'m still figuring out AI tools myself and wouldn\'t want to steer them wrong', points: 0 },
      ],
    },
    {
      id: `${m.code}-L2-010`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How integrated is AI into your team\'s standard operating procedures?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Partially — AI is part of some documented workflows but not systematically embedded across all processes', points: 3 },
        { id: 'b', text: 'Extensively — AI tools and practices are built into most of our standard workflows and onboarding', points: 5 },
        { id: 'c', text: 'Not at all — AI is not mentioned in any of our SOPs or process documentation', points: 0 },
        { id: 'd', text: 'Minimally — a few individuals use AI on their own initiative but it\'s not part of our official processes', points: 1 },
      ],
    },
  ];
}

// Level 3: Skill Depth
function generateL3Questions(deptId) {
  const m = deptMeta[deptId];
  return [
    {
      id: `${m.code}-L3-001`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: 'When an AI tool gives you a poor or irrelevant output, what is your usual response?',
      type: 'scenario',
      options: [
        { id: 'a', text: 'Systematically diagnose why it failed — examine the prompt structure, adjust context and constraints, try alternative approaches like chain-of-thought or task decomposition', points: 5 },
        { id: 'b', text: 'Switch to a different, more powerful AI model since the current one clearly isn\'t capable enough for this type of task', points: 1 },
        { id: 'c', text: 'Revise my prompt by adding more specific context, examples, and clearer constraints before trying again', points: 4 },
        { id: 'd', text: 'Run the same prompt 3-4 more times — AI outputs vary each time, so eventually I\'ll get something usable', points: 2 },
      ],
    },
    {
      id: `${m.code}-L3-002`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How skilled are you at writing effective prompts for complex, multi-step tasks?',
      type: 'self_rating',
      options: [
        { id: '1', text: 'Not skilled — I only use simple one-line prompts', points: 1 },
        { id: '2', text: 'Basic — I can add context but mostly trial-and-error', points: 2 },
        { id: '3', text: 'Moderate — I use structured prompts with role, context, and constraints', points: 3 },
        { id: '4', text: 'Advanced — I use chain-of-thought, few-shot examples, and systematic iteration', points: 4 },
        { id: '5', text: 'Expert — I design complex prompt workflows with reusable templates and can diagnose failures', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-003`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `You need to use AI for ${m.workflows[2]} but the output quality is inconsistent. What approach would you take?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Accept the inconsistency as a fundamental limitation of current AI technology and manually fix outputs each time', points: 1 },
        { id: 'b', text: 'Break the task into smaller steps with quality checkpoints at each stage, provide examples of good output, and establish validation criteria', points: 5 },
        { id: 'c', text: 'Fine-tune a custom large language model specifically for this task using your company\'s proprietary data to ensure consistent output quality', points: 1 },
        { id: 'd', text: 'Create a detailed prompt template with clear constraints, examples of desired output format, and explicit instructions about style and quality', points: 4 },
      ],
    },
    {
      id: `${m.code}-L3-004`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How do you evaluate the quality and accuracy of AI-generated output?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I run it through another AI tool to cross-verify — if two AI systems agree, the output is reliable enough to use without further checks', points: 1 },
        { id: 'b', text: 'I skim it quickly for obvious errors and typos before using it', points: 2 },
        { id: 'c', text: 'I review it carefully against known facts, our standards, and check for bias, then verify with domain experts for high-stakes content', points: 5 },
        { id: 'd', text: 'I generally trust the output since modern AI models have been trained on vast amounts of accurate data', points: 0 },
      ],
    },
    {
      id: `${m.code}-L3-005`, department: deptId, level: 3, weight: 1.0, difficulty: 'advanced',
      questionText: `Can you customize or fine-tune AI tools for your specific ${deptId.replace(/_/g, ' ')} needs?`,
      type: 'self_rating',
      options: [
        { id: '1', text: 'No — I only use AI tools with their default settings', points: 1 },
        { id: '2', text: 'Minimal — I\'ve saved a few favorite prompts or bookmarked useful templates', points: 2 },
        { id: '3', text: 'Moderate — I\'ve built prompt libraries, custom GPTs, or similar tailored configurations', points: 3 },
        { id: '4', text: 'Advanced — I\'ve set up custom workflows, integrated AI via APIs, or built automations connecting tools', points: 4 },
        { id: '5', text: 'Expert — I design end-to-end AI-powered systems with custom integrations and automated pipelines', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-006`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How effectively can you combine multiple AI tools to accomplish a complex workflow?',
      type: 'self_rating',
      options: [
        { id: '1', text: 'I don\'t combine AI tools — I use one at a time', points: 1 },
        { id: '2', text: 'I occasionally copy output from one tool into another manually', points: 2 },
        { id: '3', text: 'I have workflows that chain 2-3 AI tools with defined handoff points', points: 3 },
        { id: '4', text: 'I\'ve built structured multi-tool workflows with clear inputs and outputs at each stage', points: 4 },
        { id: '5', text: 'I design multi-tool pipelines with automation, error handling, and quality gates connecting them', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-007`, department: deptId, level: 3, weight: 1.0, difficulty: 'advanced',
      questionText: `Your manager asks you to create a reusable AI workflow for ${m.workflows[3]}. What do you deliver?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'A fully autonomous AI system that runs the entire workflow end-to-end without any human touchpoints, saving the team maximum time', points: 1 },
        { id: 'b', text: 'A structured playbook with prompt templates, tool recommendations, step-by-step instructions, and examples of expected output quality', points: 4 },
        { id: 'c', text: 'I\'m not sure how to create a reusable AI workflow — I\'d need to research this first before committing to a deliverable', points: 1 },
        { id: 'd', text: 'A complete workflow system with prompt templates, tool integrations, quality gates, training materials, and metrics to track effectiveness', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-008`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How do you handle AI tool limitations (e.g., context window limits, outdated training data)?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I understand key limitations and have specific strategies for each — chunking long documents, using RAG for current data, web search for recent info', points: 4 },
        { id: 'b', text: 'I\'m not aware of these limitations — I assume AI tools can handle whatever I give them', points: 0 },
        { id: 'c', text: 'I design my workflows to account for limitations proactively, choosing the right tool for each task based on its specific capabilities and constraints', points: 5 },
        { id: 'd', text: 'I know limitations exist and work around them on the fly, but I don\'t have systematic strategies for dealing with them', points: 2 },
      ],
    },
    {
      id: `${m.code}-L3-009`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `How do you ensure AI-generated work for ${deptId.replace(/_/g, ' ')} maintains your company\'s brand voice and standards?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I include brand voice guidelines, tone examples, and formatting rules in my prompts so the AI gets it right from the start', points: 4 },
        { id: 'b', text: 'I don\'t worry about brand voice — I manually rewrite everything the AI generates to match our style anyway', points: 2 },
        { id: 'c', text: 'I\'ve built comprehensive prompt templates incorporating brand guidelines, tone samples, do/don\'t lists, and quality checklists', points: 5 },
        { id: 'd', text: 'I use the AI output as-is — it\'s usually close enough and editing takes too long to be worthwhile', points: 0 },
      ],
    },
    {
      id: `${m.code}-L3-010`, department: deptId, level: 3, weight: 1.0, difficulty: 'advanced',
      questionText: 'How often do you experiment with new AI tools, features, or techniques?',
      type: 'frequency',
      options: [
        { id: 'never', text: 'Never — I stick with what I know works', points: 0 },
        { id: 'rarely', text: 'Rarely — maybe once a quarter', points: 1 },
        { id: 'sometimes', text: 'Monthly — when I hear about something interesting', points: 3 },
        { id: 'often', text: 'Weekly — I set aside time to explore', points: 4 },
        { id: 'always', text: 'Constantly — I actively follow AI news and test new tools regularly', points: 5 },
      ],
    },
  ];
}

// Level 4: Strategic Thinking
function generateL4Questions(deptId) {
  const m = deptMeta[deptId];
  return [
    {
      id: `${m.code}-L4-001`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `If you were to classify every activity in your ${deptId.replace(/_/g, ' ')} department as Humanize, Agentify, or Automate, how confident are you in making those classifications?`,
      type: 'self_rating',
      options: [
        { id: '1', text: 'Not confident — I\'m not sure how to apply this framework', points: 1 },
        { id: '2', text: 'Slightly confident — I could classify a few obvious ones', points: 2 },
        { id: '3', text: 'Moderately confident — I could classify most activities with some thought', points: 3 },
        { id: '4', text: 'Very confident — I understand the nuances and edge cases', points: 4 },
        { id: '5', text: 'Extremely confident — I can classify, justify, and debate borderline cases', points: 5 },
      ],
    },
    {
      id: `${m.code}-L4-002`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `What is the biggest risk of AI adoption in ${deptId.replace(/_/g, ' ')} that organizations should plan for?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'AI models becoming so capable that they make the entire department obsolete within 2-3 years, requiring radical organizational restructuring', points: 0 },
        { id: 'b', text: 'Vendor lock-in — once you build workflows on one AI platform, switching costs become prohibitively expensive', points: 2 },
        { id: 'c', text: 'Over-reliance on AI without proper governance, leading to quality degradation, data risks, or erosion of critical human skills', points: 5 },
        { id: 'd', text: 'The total cost of AI subscriptions, training, and infrastructure exceeding the productivity gains for most teams', points: 2 },
      ],
    },
    {
      id: `${m.code}-L4-003`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `You\'re asked to create an AI adoption strategy for your ${deptId.replace(/_/g, ' ')} team. Which approach is most effective?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Deploy enterprise AI across all workflows simultaneously with mandatory adoption targets to ensure the team doesn\'t fall behind competitors', points: 1 },
        { id: 'b', text: 'Start with one high-impact workflow, prove measurable value, then expand systematically based on learnings', points: 5 },
        { id: 'c', text: 'Invest heavily in building custom AI models trained on your company\'s proprietary data before rolling anything out to the team', points: 1 },
        { id: 'd', text: 'Let individual team members experiment freely with whatever AI tools they choose, then standardize around whatever gets the most organic adoption', points: 2 },
      ],
    },
    {
      id: `${m.code}-L4-004`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: 'How should roles and job descriptions evolve as AI takes on more tasks in your department?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Every role should be redesigned as an "AI operator" position focused primarily on managing and maintaining AI tools and pipelines', points: 1 },
        { id: 'b', text: 'Roles should shift toward AI oversight, strategic thinking, relationship building, and the uniquely human elements of each function', points: 5 },
        { id: 'c', text: 'Administrative tasks get removed from JDs, but core responsibilities and team structure should remain essentially the same', points: 2 },
        { id: 'd', text: 'They shouldn\'t change yet — AI is evolving too fast and any JD changes made now would quickly become outdated', points: 1 },
      ],
    },
    {
      id: `${m.code}-L4-005`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `How would you measure the ROI of AI adoption in ${deptId.replace(/_/g, ' ')}?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Track the ratio of AI tool subscription costs versus the headcount reduction those tools enabled over a 12-month period', points: 2 },
        { id: 'b', text: 'Measure time savings, quality improvements, output volume, error rates, employee satisfaction, and strategic value like faster decisions and innovation', points: 5 },
        { id: 'c', text: 'I\'m not sure how to measure AI ROI — it\'s hard to isolate AI\'s impact from other productivity factors', points: 0 },
        { id: 'd', text: 'Focus on time savings per task — calculate hours saved across the team and multiply by average hourly compensation rate', points: 3 },
      ],
    },
    {
      id: `${m.code}-L4-006`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: 'What governance framework does your organization need for responsible AI use?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'A strict policy that bans all AI usage until the legal and compliance team has individually approved each use case and tool', points: 1 },
        { id: 'b', text: 'Data governance, approved tool list, use case guidelines, quality standards, ethical guidelines, audit trails, and a continuous improvement process', points: 5 },
        { id: 'c', text: 'Data classification rules, an approved tool list, and general usage guidelines that cover the main risk areas', points: 3 },
        { id: 'd', text: 'Basic rules about what confidential data can and cannot be shared with AI tools — the rest can be self-governed', points: 2 },
      ],
    },
    {
      id: `${m.code}-L4-007`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `A senior leader asks: "What will our ${deptId.replace(/_/g, ' ')} team look like in 3 years with AI?" How do you respond?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'I\'m not sure — AI changes so fast that any prediction would be unreliable, so I\'d suggest we focus on adapting quarter by quarter', points: 1 },
        { id: 'b', text: 'I describe a vision where AI handles nearly all execution and the team shrinks to a small group of strategists overseeing AI systems', points: 1 },
        { id: 'c', text: 'I articulate which activities shift to AI agents, which become more human-focused, how roles evolve, what new capabilities we need, and how this improves outcomes', points: 5 },
        { id: 'd', text: 'I explain the team will be more productive with AI handling routine work and people focusing more on strategy, but the overall structure stays similar', points: 3 },
      ],
    },
    {
      id: `${m.code}-L4-008`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: 'How should organizations handle the change management aspects of AI adoption?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Make AI adoption a performance review criteria — people will adapt quickly when it affects their evaluations and career progression', points: 1 },
        { id: 'b', text: 'Provide comprehensive training sessions on all new AI tools, with certification requirements and monthly skills assessments', points: 2 },
        { id: 'c', text: 'Create a structured plan: address concerns openly, build AI champions, redesign workflows collaboratively, celebrate wins, and measure adoption continuously', points: 5 },
        { id: 'd', text: 'Start with leadership adoption first — once executives use AI daily, it naturally cascades down through the organization', points: 2 },
      ],
    },
    {
      id: `${m.code}-L4-009`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `What competitive advantage does AI give a ${deptId.replace(/_/g, ' ')} team that adopts it effectively?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Ability to operate with a significantly smaller team than competitors while maintaining the same output and quality levels', points: 2 },
        { id: 'b', text: 'Speed — executing every existing process 3-5x faster than competitors who haven\'t adopted AI tools yet', points: 2 },
        { id: 'c', text: 'Capability improvements: faster innovation, better decisions, personalization at scale, predictive insights, and freeing humans for creative and strategic work', points: 5 },
        { id: 'd', text: 'Access to proprietary AI-generated insights and data that competitors can\'t replicate without the same training data', points: 1 },
      ],
    },
    {
      id: `${m.code}-L4-010`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: 'How do you think about ethical AI use in your department?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Ethics is primarily the AI vendor\'s responsibility — they should ensure their models are unbiased and safe before releasing them to users', points: 0 },
        { id: 'b', text: 'I actively consider bias, transparency, and privacy when using AI, advocate for ethical practices, and raise concerns when I see issues', points: 5 },
        { id: 'c', text: 'I know there are ethical concerns with AI but haven\'t had the time to address them formally in our workflows', points: 2 },
        { id: 'd', text: 'Our legal and compliance team handles all AI ethics questions — individual practitioners shouldn\'t need to worry about this', points: 0 },
      ],
    },
  ];
}

// Level 5: Future Readiness
function generateL5Questions(deptId) {
  const m = deptMeta[deptId];
  return [
    {
      id: `${m.code}-L5-001`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'How prepared are you to manage and oversee AI agents that work semi-autonomously?',
      type: 'self_rating',
      options: [
        { id: '1', text: 'Not prepared — I don\'t understand what AI agents are or how they differ from chatbots', points: 1 },
        { id: '2', text: 'Slightly prepared — I understand the concept but have no hands-on experience', points: 2 },
        { id: '3', text: 'Moderately prepared — I\'ve used some AI agents or autonomous tools in limited scenarios', points: 3 },
        { id: '4', text: 'Well prepared — I regularly oversee AI-powered workflows and intervene when needed', points: 4 },
        { id: '5', text: 'Expert — I design human-AI collaboration systems and manage complex multi-agent workflows', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-002`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `As AI agents handle more "Agentify" work in ${deptId.replace(/_/g, ' ')}, what skills should professionals prioritize developing?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Deep technical skills like programming, machine learning, and data science so you can build and customize your own AI systems', points: 2 },
        { id: 'b', text: 'Uniquely human skills: strategic thinking, empathy, creative problem-solving, complex judgment, and cross-functional leadership', points: 5 },
        { id: 'c', text: 'Mastery of current AI tools and prompt engineering — becoming the most efficient AI operator in your domain', points: 2 },
        { id: 'd', text: 'It\'s premature to change skill development strategies — the technology is moving too fast to invest in any specific direction', points: 0 },
      ],
    },
    {
      id: `${m.code}-L5-003`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `Imagine your ${deptId.replace(/_/g, ' ')} team has AI agents handling all automatable and most agentifiable tasks. What becomes the primary role of the human team?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Quality control — reviewing, approving, and fixing all AI outputs before they reach customers or stakeholders', points: 2 },
        { id: 'b', text: 'The team would be dramatically smaller, focused mainly on maintaining the AI systems and handling occasional exceptions', points: 1 },
        { id: 'c', text: 'Strategic direction, relationship building, creative problem-solving, ethical oversight, and navigating novel situations requiring human judgment', points: 5 },
        { id: 'd', text: 'Same work as today but significantly faster — humans would still do everything, just with AI as a speed multiplier on each task', points: 1 },
      ],
    },
    {
      id: `${m.code}-L5-004`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'How do you stay current with the rapidly evolving AI landscape?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I wait for our company\'s IT or innovation team to evaluate new tools and tell us when something is worth adopting', points: 0 },
        { id: 'b', text: 'I systematically track AI developments, experiment weekly with new tools, contribute to communities, and help my organization anticipate changes', points: 5 },
        { id: 'c', text: 'I follow several AI influencers and newsletters so I\'m always aware of the latest model releases and funding announcements', points: 2 },
        { id: 'd', text: 'I regularly read AI news, try new tools when I hear about them, and discuss developments with colleagues', points: 3 },
      ],
    },
    {
      id: `${m.code}-L5-005`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'How would you design a new team member\'s onboarding to include AI fluency from day one?',
      type: 'scenario',
      options: [
        { id: 'a', text: 'Require them to complete an AI certification course before starting any real work, ensuring they have a strong theoretical foundation first', points: 2 },
        { id: 'b', text: 'Design an immersive program where every onboarding task leverages AI, building fluency naturally as they learn the role with mentorship and progressive challenges', points: 5 },
        { id: 'c', text: 'Give them access to all our AI tools on day one and let them explore at their own pace — self-directed learning is more effective than structured programs', points: 1 },
        { id: 'd', text: 'Create a structured AI track with tool training, prompt libraries, best practices docs, and shadowing sessions alongside AI-fluent colleagues', points: 4 },
      ],
    },
    {
      id: `${m.code}-L5-006`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `How do you feel about the AI transformation of ${deptId.replace(/_/g, ' ')}?`,
      type: 'likert',
      options: [
        { id: '1', text: 'Concerned — I worry about the disruption and uncertainty it brings', points: 1 },
        { id: '2', text: 'Skeptical — I\'m not convinced it will live up to the hype for our function', points: 2 },
        { id: '3', text: 'Cautiously optimistic — I see potential but also real challenges', points: 3 },
        { id: '4', text: 'Excited — I see genuine opportunity to improve how we work', points: 4 },
        { id: '5', text: 'Deeply motivated — I want to actively lead and shape this transformation', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-007`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'How do you think about building resilience against AI disruption in your career?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I\'m focused on becoming an AI power user — the people who master the tools will always be in demand regardless of how AI evolves', points: 2 },
        { id: 'b', text: 'I\'m developing a combination of deep domain expertise, AI fluency, and uniquely human capabilities that position me to design and lead human-AI collaboration', points: 5 },
        { id: 'c', text: 'I\'m not concerned — my role requires too much human judgment and relationship skills for AI to meaningfully disrupt it', points: 0 },
        { id: 'd', text: 'I\'m learning to code and understand ML fundamentals so I can transition into a more technical, AI-adjacent role if needed', points: 2 },
      ],
    },
    {
      id: `${m.code}-L5-008`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `Your CEO announces the company will become "AI-first" in 12 months. What\'s your role in the ${deptId.replace(/_/g, ' ')} transformation?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Immediately identify the 3-5 highest-impact AI opportunities in my area, build quick proof-of-concepts, and volunteer to lead the pilot program', points: 4 },
        { id: 'b', text: 'Wait for the transformation team to set direction — jumping ahead without coordination could create inconsistency and wasted effort', points: 0 },
        { id: 'c', text: 'Map all activities to the H/A/R framework, build the roadmap, champion adoption, measure results, and help redesign the department for AI-human collaboration', points: 5 },
        { id: 'd', text: 'Focus on upskilling myself first so I can contribute from a position of strength — start with AI certifications and intensive tool training', points: 2 },
      ],
    },
    {
      id: `${m.code}-L5-009`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'How important is it for professionals in your role to understand AI capabilities and limitations — even if they\'re not building AI?',
      type: 'likert',
      options: [
        { id: '1', text: 'Not important — AI tooling is IT\'s responsibility to manage', points: 1 },
        { id: '2', text: 'Nice to know but not essential for my performance', points: 2 },
        { id: '3', text: 'Moderately important — it helps me work more effectively', points: 3 },
        { id: '4', text: 'Very important — it\'s rapidly becoming a core competency', points: 4 },
        { id: '5', text: 'Critical — AI fluency is now as essential as computer literacy was 20 years ago', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-010`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'What would be the most valuable investment to prepare your team for the AI-transformed future?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Enterprise AI platform licenses with the most advanced models available and unlimited usage for every team member', points: 1 },
        { id: 'b', text: 'Hiring dedicated AI specialists and prompt engineers to embed within the team and handle all AI-related workflows', points: 2 },
        { id: 'c', text: 'Building the team\'s ability to design human-AI collaborative systems — combining deep domain expertise with AI fluency to reimagine how work gets done', points: 5 },
        { id: 'd', text: 'Intensive technical training (coding, data science, ML fundamentals) for the entire team so everyone can build custom AI solutions', points: 2 },
      ],
    },
  ];
}

// Generate all questions
function generateAllQuestions() {
  const deptIds = Object.keys(deptMeta);
  const all = [];
  for (const deptId of deptIds) {
    all.push(...generateL1Questions(deptId));
    all.push(...generateL2Questions(deptId));
    all.push(...generateL3Questions(deptId));
    all.push(...generateL4Questions(deptId));
    all.push(...generateL5Questions(deptId));
  }
  return all;
}

export const questions = generateAllQuestions();

export const getQuestionsByDepartment = (deptId) => questions.filter(q => q.department === deptId);
export const getQuestionsByLevel = (deptId, level) => questions.filter(q => q.department === deptId && q.level === level);
