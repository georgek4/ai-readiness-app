// AI Readiness Assessment Question Bank
// 650 questions: 13 departments × 5 levels × 10 questions each

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
        { id: 'a', text: 'Software that follows pre-programmed rules to complete tasks', points: 1 },
        { id: 'b', text: 'AI that can create new content, analyze data, and assist with knowledge work based on patterns learned from training data', points: 5 },
        { id: 'c', text: 'A database that stores and retrieves information', points: 0 },
        { id: 'd', text: 'An advanced search engine', points: 1 },
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
        { id: 'a', text: 'Writing code to build AI models from scratch', points: 0 },
        { id: 'b', text: 'The practice of crafting effective instructions and context to get better outputs from AI tools', points: 5 },
        { id: 'c', text: 'A type of software engineering focused on speed', points: 0 },
        { id: 'd', text: 'Managing the timing of automated email campaigns', points: 0 },
      ],
    },
    {
      id: `${m.code}-L1-004`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: 'Which statement about AI-generated content is most accurate?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'AI-generated content is always factually accurate', points: 0 },
        { id: 'b', text: 'AI-generated content should always be reviewed by a human for accuracy, tone, and appropriateness', points: 5 },
        { id: 'c', text: 'AI-generated content is identical every time you give it the same prompt', points: 1 },
        { id: 'd', text: 'AI cannot generate content that looks human-written', points: 0 },
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
        { id: 'always', text: 'Always (daily conversations)', points: 5 },
      ],
    },
    {
      id: `${m.code}-L1-006`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: 'What is an "AI hallucination"?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'When AI makes up information that sounds plausible but is factually incorrect', points: 5 },
        { id: 'b', text: 'When AI generates images that look surreal', points: 1 },
        { id: 'c', text: "When AI stops responding because it's overloaded", points: 0 },
        { id: 'd', text: "I'm not sure what this term means", points: 0 },
      ],
    },
    {
      id: `${m.code}-L1-007`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `In the context of ${deptId.replace(/_/g, ' ')}, what is the primary benefit of AI adoption?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Replacing all human workers', points: 0 },
        { id: 'b', text: 'Augmenting human capabilities — handling repetitive tasks so people can focus on higher-value work', points: 5 },
        { id: 'c', text: 'Making technology more complicated', points: 0 },
        { id: 'd', text: 'Reducing the need for any human judgment', points: 1 },
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
      questionText: 'What does it mean to classify a task as "Agentify"?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'The task should only be done by humans', points: 0 },
        { id: 'b', text: 'The task can be delegated to an AI agent that works semi-autonomously with human oversight', points: 5 },
        { id: 'c', text: 'The task is fully automated with no human involvement', points: 2 },
        { id: 'd', text: "I'm not familiar with this classification", points: 0 },
      ],
    },
    {
      id: `${m.code}-L1-010`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `Which of these ${deptId.replace(/_/g, ' ')} tasks would be LEAST suitable for full AI automation?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Data entry and CRM field updates', points: 0 },
        { id: 'b', text: 'Scheduling and calendar management', points: 0 },
        { id: 'c', text: 'Strategic decision-making that requires empathy, trust, and organizational context', points: 5 },
        { id: 'd', text: 'Generating standard reports from existing data', points: 0 },
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
        { id: 'sometimes', text: 'Sometimes — a few times per month', points: 2 },
        { id: 'often', text: 'Often — multiple times per week', points: 4 },
        { id: 'always', text: 'Daily — AI is part of my standard workflow', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-002`, department: deptId, level: 2, weight: 1.0, difficulty: 'beginner',
      questionText: `Which of these ${deptId.replace(/_/g, ' ')} workflows have you personally used AI for? (Select the answer closest to your experience)`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I have not used AI for any work tasks', points: 0 },
        { id: 'b', text: `I've used AI for one specific task like ${m.workflows[0]}`, points: 2 },
        { id: 'c', text: `I use AI for multiple workflows including ${m.workflows[0]} and ${m.workflows[1]}`, points: 4 },
        { id: 'd', text: `I've integrated AI across most of my key workflows including ${m.workflows.slice(0, 4).join(', ')}`, points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-003`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: `When you use AI to assist with ${m.workflows[0]}, what is your typical approach?`,
      type: 'scenario',
      options: [
        { id: 'a', text: "I don't use AI for this workflow", points: 0 },
        { id: 'b', text: 'I use generic prompts and accept whatever output I get', points: 2 },
        { id: 'c', text: 'I provide detailed context and iterate on the output to improve quality', points: 4 },
        { id: 'd', text: 'I have refined prompt templates, provide structured context, and have a systematic review process', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-004`, department: deptId, level: 2, weight: 1.0, difficulty: 'beginner',
      questionText: 'Does your team have any shared guidelines or best practices for using AI tools?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'No, there are no guidelines at all', points: 0 },
        { id: 'b', text: 'Informal — some people share tips but nothing documented', points: 2 },
        { id: 'c', text: 'We have basic documented guidelines', points: 3 },
        { id: 'd', text: 'Yes, comprehensive guidelines covering tools, use cases, governance, and data handling', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-005`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How do you currently handle sensitive or confidential data when using AI tools?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: "I haven't thought about data sensitivity with AI tools", points: 0 },
        { id: 'b', text: 'I try to avoid putting sensitive data in AI tools but have no formal process', points: 2 },
        { id: 'c', text: 'I follow my company\'s data classification policy and only use approved AI tools for sensitive data', points: 4 },
        { id: 'd', text: 'We have enterprise AI tools with data protection, I follow strict protocols, and I anonymize data when needed', points: 5 },
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
        { id: 'a', text: 'No time savings — I don\'t use AI or it doesn\'t help', points: 0 },
        { id: 'b', text: 'Minimal — saves me maybe 30 minutes per week', points: 2 },
        { id: 'c', text: 'Moderate — saves me 2-5 hours per week', points: 4 },
        { id: 'd', text: 'Significant — saves me 5+ hours per week', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-008`, department: deptId, level: 2, weight: 1.0, difficulty: 'beginner',
      questionText: 'Have you shared AI techniques or prompt strategies with your teammates?',
      type: 'frequency',
      options: [
        { id: 'never', text: 'Never', points: 0 },
        { id: 'rarely', text: 'Rarely', points: 1 },
        { id: 'sometimes', text: 'Sometimes', points: 2 },
        { id: 'often', text: 'Often — I regularly share tips', points: 4 },
        { id: 'always', text: 'Always — I actively champion AI adoption on my team', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-009`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: `A colleague asks for help getting started with AI for ${m.workflows[1]}. What do you do?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'I can\'t help — I don\'t know enough about AI tools myself', points: 0 },
        { id: 'b', text: 'I suggest they try ChatGPT but can\'t give specific guidance', points: 2 },
        { id: 'c', text: 'I show them the specific tools and prompts I use and walk them through a basic workflow', points: 4 },
        { id: 'd', text: 'I provide a structured onboarding including tool recommendations, prompt templates, best practices, and follow up to see how they\'re doing', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-010`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How integrated is AI into your team\'s standard operating procedures?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Not at all — AI is not mentioned in any of our SOPs', points: 0 },
        { id: 'b', text: 'Minimally — a few individuals use AI but it\'s not in our processes', points: 1 },
        { id: 'c', text: 'Partially — AI is part of some workflows but not systematically embedded', points: 3 },
        { id: 'd', text: 'Extensively — AI tools and practices are built into most of our standard workflows', points: 5 },
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
        { id: 'a', text: 'Give up and do the task manually', points: 1 },
        { id: 'b', text: 'Try the same prompt again hoping for a better result', points: 2 },
        { id: 'c', text: 'Revise my prompt with more specific context, constraints, and examples', points: 4 },
        { id: 'd', text: 'Systematically diagnose why it failed — adjust context, try chain-of-thought, break down the task, or switch approaches entirely', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-002`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How skilled are you at writing effective prompts for complex, multi-step tasks?',
      type: 'self_rating',
      options: [
        { id: '1', text: 'Not skilled — I only use simple one-line prompts', points: 1 },
        { id: '2', text: 'Basic — I can add some context to my prompts', points: 2 },
        { id: '3', text: 'Moderate — I use structured prompts with role, context, and constraints', points: 3 },
        { id: '4', text: 'Advanced — I use techniques like chain-of-thought, few-shot examples, and systematic iteration', points: 4 },
        { id: '5', text: 'Expert — I design complex prompt workflows, create reusable templates, and can troubleshoot prompt failures systematically', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-003`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `You need to use AI to ${m.workflows[2]} but the output quality is inconsistent. What approach would you take?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Accept the inconsistency as a limitation of AI', points: 1 },
        { id: 'b', text: 'Try different phrasings until something works', points: 2 },
        { id: 'c', text: 'Create a detailed prompt template with examples of good output, clear constraints, and a structured format', points: 4 },
        { id: 'd', text: 'Build a multi-step workflow: break the task into smaller prompts, create quality checkpoints, provide examples, and establish a validation process', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-004`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How do you evaluate the quality and accuracy of AI-generated output?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I generally trust the output without checking', points: 0 },
        { id: 'b', text: 'I skim it quickly for obvious errors', points: 2 },
        { id: 'c', text: 'I review it carefully against known facts and our standards', points: 4 },
        { id: 'd', text: 'I have a systematic review process: fact-check, verify sources, check for bias, ensure brand voice, and validate with domain experts when needed', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-005`, department: deptId, level: 3, weight: 1.0, difficulty: 'advanced',
      questionText: `Can you customize or fine-tune AI tools for your specific ${deptId.replace(/_/g, ' ')} needs?`,
      type: 'self_rating',
      options: [
        { id: '1', text: 'No — I only use AI tools with default settings', points: 1 },
        { id: '2', text: 'Minimal — I\'ve saved a few favorite prompts', points: 2 },
        { id: '3', text: 'Moderate — I\'ve built prompt libraries and custom GPTs or similar', points: 3 },
        { id: '4', text: 'Advanced — I\'ve set up custom workflows, integrated AI via APIs, or built automations', points: 4 },
        { id: '5', text: 'Expert — I design AI-powered systems with custom integrations, automated pipelines, and sophisticated prompt engineering', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-006`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How effectively can you combine multiple AI tools to accomplish a complex workflow?',
      type: 'self_rating',
      options: [
        { id: '1', text: 'I don\'t combine AI tools', points: 1 },
        { id: '2', text: 'I occasionally copy output from one tool into another', points: 2 },
        { id: '3', text: 'I have workflows that chain 2-3 AI tools together', points: 3 },
        { id: '4', text: 'I\'ve built multi-tool workflows with structured handoffs', points: 4 },
        { id: '5', text: 'I design sophisticated multi-tool pipelines with automation connecting them', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-007`, department: deptId, level: 3, weight: 1.0, difficulty: 'advanced',
      questionText: `Your manager asks you to create a reusable AI workflow for ${m.workflows[3]}. What do you deliver?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'I\'m not sure how to create a reusable AI workflow', points: 1 },
        { id: 'b', text: 'A document with a few prompt suggestions', points: 2 },
        { id: 'c', text: 'A structured playbook with prompt templates, tool recommendations, step-by-step instructions, and example outputs', points: 4 },
        { id: 'd', text: 'A complete workflow system with prompt templates, tool integrations, quality gates, training materials, and metrics to track adoption and effectiveness', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-008`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: 'How do you handle AI tool limitations (e.g., context window limits, outdated training data)?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I\'m not aware of these limitations', points: 0 },
        { id: 'b', text: 'I know they exist but work around them ad hoc', points: 2 },
        { id: 'c', text: 'I understand key limitations and have strategies for each (chunking, RAG, web search, etc.)', points: 4 },
        { id: 'd', text: 'I systematically design my workflows to account for limitations and choose the right tool for each task based on its capabilities', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-009`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `How do you ensure AI-generated work for ${deptId.replace(/_/g, ' ')} maintains your company\'s brand voice and standards?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I don\'t — AI generates generic output', points: 0 },
        { id: 'b', text: 'I manually edit the output to match our style', points: 2 },
        { id: 'c', text: 'I include brand voice guidelines and examples in my prompts', points: 4 },
        { id: 'd', text: 'I\'ve built comprehensive prompt templates with brand guidelines, tone samples, do/don\'t lists, and systematic quality review checklists', points: 5 },
      ],
    },
    {
      id: `${m.code}-L3-010`, department: deptId, level: 3, weight: 1.0, difficulty: 'advanced',
      questionText: 'How often do you experiment with new AI tools, features, or techniques?',
      type: 'frequency',
      options: [
        { id: 'never', text: 'Never — I stick with what I know', points: 0 },
        { id: 'rarely', text: 'Rarely — maybe once a quarter', points: 1 },
        { id: 'sometimes', text: 'Sometimes — once a month', points: 3 },
        { id: 'often', text: 'Often — weekly experimentation', points: 4 },
        { id: 'always', text: 'Constantly — I actively follow AI developments and test new approaches regularly', points: 5 },
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
        { id: '4', text: 'Very confident — I understand the nuances of each classification', points: 4 },
        { id: '5', text: 'Extremely confident — I can classify, justify, and debate the borderline cases', points: 5 },
      ],
    },
    {
      id: `${m.code}-L4-002`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `What is the biggest risk of AI adoption in ${deptId.replace(/_/g, ' ')} that organizations should plan for?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'AI tools are too expensive', points: 1 },
        { id: 'b', text: 'Over-reliance on AI without proper governance, leading to quality degradation, data risks, or loss of critical human skills', points: 5 },
        { id: 'c', text: 'AI will make the department irrelevant', points: 0 },
        { id: 'd', text: 'There are no significant risks', points: 0 },
      ],
    },
    {
      id: `${m.code}-L4-003`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `You\'re asked to create an AI adoption strategy for your ${deptId.replace(/_/g, ' ')} team. Which approach is most effective?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Buy the most popular AI tools and let everyone figure them out', points: 1 },
        { id: 'b', text: 'Start with one high-impact workflow, prove value, then expand systematically', points: 5 },
        { id: 'c', text: 'Wait for competitors to adopt AI first so we can learn from their mistakes', points: 1 },
        { id: 'd', text: 'Automate everything possible as fast as possible', points: 2 },
      ],
    },
    {
      id: `${m.code}-L4-004`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: 'How should roles and job descriptions evolve as AI takes on more tasks in your department?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'They shouldn\'t change — AI is just a tool', points: 1 },
        { id: 'b', text: 'Some administrative tasks will be removed from JDs, but core responsibilities stay the same', points: 2 },
        { id: 'c', text: 'Roles should shift toward AI oversight, strategic thinking, and the uniquely human elements of each function', points: 5 },
        { id: 'd', text: 'Most roles should be eliminated as AI can do the work', points: 0 },
      ],
    },
    {
      id: `${m.code}-L4-005`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `How would you measure the ROI of AI adoption in ${deptId.replace(/_/g, ' ')}?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'I\'m not sure how to measure AI ROI', points: 0 },
        { id: 'b', text: 'Track tool subscription costs vs. headcount savings', points: 2 },
        { id: 'c', text: 'Measure time savings, quality improvements, and output volume changes', points: 4 },
        { id: 'd', text: 'Comprehensive framework: time savings, quality metrics, employee satisfaction, output velocity, error rates, revenue impact, and strategic value (better decisions, faster innovation)', points: 5 },
      ],
    },
    {
      id: `${m.code}-L4-006`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: 'What governance framework does your organization need for responsible AI use?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I haven\'t thought about AI governance', points: 0 },
        { id: 'b', text: 'Basic rules about what data can be shared with AI tools', points: 2 },
        { id: 'c', text: 'Data classification, approved tool list, and usage guidelines', points: 3 },
        { id: 'd', text: 'Comprehensive framework covering data governance, approved tools, use case guidelines, quality standards, ethical guidelines, audit processes, and continuous improvement', points: 5 },
      ],
    },
    {
      id: `${m.code}-L4-007`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `A senior leader asks: "What will our ${deptId.replace(/_/g, ' ')} team look like in 3 years with AI?" How do you respond?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'I\'m not sure — AI changes too fast to predict', points: 1 },
        { id: 'b', text: 'We\'ll use more AI tools but the team will be basically the same', points: 2 },
        { id: 'c', text: 'The team will be more productive with AI handling routine work, people will focus on strategy and relationships, and we\'ll need new skills like AI oversight', points: 4 },
        { id: 'd', text: 'I can articulate a clear vision: which activities shift to AI agents, which become more human-focused, how roles evolve, what new capabilities we need, and how this drives better outcomes', points: 5 },
      ],
    },
    {
      id: `${m.code}-L4-008`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: 'How should organizations handle the change management aspects of AI adoption?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Just deploy the tools and people will adapt', points: 0 },
        { id: 'b', text: 'Provide training sessions on new AI tools', points: 2 },
        { id: 'c', text: 'Create a structured change management plan with training, champions, feedback loops, and gradual rollout', points: 4 },
        { id: 'd', text: 'Design a comprehensive transformation program: address fears, celebrate wins, build AI champions, redesign workflows collaboratively, create new career paths, and measure adoption continuously', points: 5 },
      ],
    },
    {
      id: `${m.code}-L4-009`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `What competitive advantage does AI give a ${deptId.replace(/_/g, ' ')} team that adopts it well?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Cost savings from reduced headcount', points: 1 },
        { id: 'b', text: 'Faster execution of existing processes', points: 2 },
        { id: 'c', text: 'Ability to do more with the same resources', points: 3 },
        { id: 'd', text: 'Fundamental capability improvements: faster innovation, better decisions, personalization at scale, predictive insights, and freeing humans for creative/strategic work that AI can\'t do', points: 5 },
      ],
    },
    {
      id: `${m.code}-L4-010`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: 'How do you think about ethical AI use in your department?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I haven\'t considered ethical implications', points: 0 },
        { id: 'b', text: 'I know there are ethical concerns but haven\'t addressed them formally', points: 2 },
        { id: 'c', text: 'I consider bias, transparency, and privacy when using AI and raise concerns when I see issues', points: 4 },
        { id: 'd', text: 'I actively advocate for ethical AI practices including bias auditing, transparency about AI usage, data privacy, human oversight for high-stakes decisions, and inclusive design', points: 5 },
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
        { id: '1', text: 'Not prepared — I don\'t understand what AI agents are', points: 1 },
        { id: '2', text: 'Slightly prepared — I understand the concept but have no experience', points: 2 },
        { id: '3', text: 'Moderately prepared — I\'ve used some AI agents or autonomous tools', points: 3 },
        { id: '4', text: 'Well prepared — I regularly oversee AI-powered workflows and know how to intervene', points: 4 },
        { id: '5', text: 'Expert — I design human-AI collaboration systems and can manage complex multi-agent workflows', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-002`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `In 3-5 years, AI agents will likely handle much of the "Agentify" work in ${deptId.replace(/_/g, ' ')}. What skills should professionals develop now?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Focus on learning to use current AI tools better', points: 2 },
        { id: 'b', text: 'Develop technical skills like programming and data science', points: 2 },
        { id: 'c', text: 'Double down on uniquely human skills: strategic thinking, empathy, creativity, complex problem-solving, and leadership', points: 5 },
        { id: 'd', text: 'It\'s too early to change skill development strategies', points: 0 },
      ],
    },
    {
      id: `${m.code}-L5-003`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `Imagine your ${deptId.replace(/_/g, ' ')} team has AI agents handling all automatable and most agentifiable tasks. What becomes the primary role of the human team?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Supervising AI outputs and fixing errors', points: 2 },
        { id: 'b', text: 'Doing the same work but faster with AI assistance', points: 1 },
        { id: 'c', text: 'Strategic direction, relationship building, creative problem-solving, ethical oversight, and managing edge cases that require human judgment', points: 5 },
        { id: 'd', text: 'The human team would be significantly smaller with limited responsibilities', points: 1 },
      ],
    },
    {
      id: `${m.code}-L5-004`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'How do you stay current with the rapidly evolving AI landscape?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I don\'t actively follow AI developments', points: 0 },
        { id: 'b', text: 'I occasionally read articles or hear about new tools', points: 1 },
        { id: 'c', text: 'I regularly follow AI news, try new tools, and discuss developments with colleagues', points: 3 },
        { id: 'd', text: 'I systematically track AI developments, experiment weekly, contribute to AI communities, and help my organization anticipate changes', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-005`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'How would you design a new team member\'s onboarding to include AI fluency from day one?',
      type: 'scenario',
      options: [
        { id: 'a', text: 'I\'d point them to the AI tools we use and let them explore', points: 1 },
        { id: 'b', text: 'I\'d include a session on AI tools in the standard onboarding program', points: 2 },
        { id: 'c', text: 'I\'d create a structured AI onboarding track with tool training, prompt libraries, best practices, and shadowing opportunities', points: 4 },
        { id: 'd', text: 'I\'d design an immersive program where every onboarding task leverages AI, building fluency naturally while they learn the role, with mentorship and progressive challenges', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-006`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `What excites you most about the AI transformation of ${deptId.replace(/_/g, ' ')}?`,
      type: 'likert',
      options: [
        { id: '1', text: 'Not excited — I\'m concerned about the changes', points: 1 },
        { id: '2', text: 'Slightly interested but skeptical', points: 2 },
        { id: '3', text: 'Cautiously optimistic', points: 3 },
        { id: '4', text: 'Excited — I see tremendous opportunity', points: 4 },
        { id: '5', text: 'Extremely excited — I want to lead this transformation', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-007`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'How do you think about building resilience against AI disruption in your career?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I\'m not worried about AI disruption', points: 0 },
        { id: 'b', text: 'I\'m learning to use AI tools so I stay relevant', points: 2 },
        { id: 'c', text: 'I\'m developing a combination of AI skills and uniquely human capabilities that complement each other', points: 4 },
        { id: 'd', text: 'I\'m positioning myself as someone who bridges AI capability and human value — I can envision, implement, and lead AI-human collaboration systems', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-008`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `Your CEO announces the company will become "AI-first" in 12 months. What\'s your role in the ${deptId.replace(/_/g, ' ')} transformation?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Wait for leadership to tell me what to do', points: 0 },
        { id: 'b', text: 'Start learning more about AI to keep up', points: 2 },
        { id: 'c', text: 'Proactively identify opportunities in my workflows and volunteer to pilot AI initiatives', points: 4 },
        { id: 'd', text: 'Lead the transformation: map all activities to H/A/R framework, build the roadmap, champion adoption, measure results, and help redesign the department for AI-human collaboration', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-009`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'How important is it for professionals in your role to understand AI capabilities and limitations — even if they\'re not building AI?',
      type: 'likert',
      options: [
        { id: '1', text: 'Not important — AI is IT\'s responsibility', points: 1 },
        { id: '2', text: 'Slightly important — nice to know but not essential', points: 2 },
        { id: '3', text: 'Moderately important — it helps but isn\'t critical', points: 3 },
        { id: '4', text: 'Very important — it\'s becoming a core competency', points: 4 },
        { id: '5', text: 'Critical — AI fluency is now as essential as computer literacy was 20 years ago', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-010`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: 'If you could invest in one capability to prepare for the AI-transformed future of your department, what would it be?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Better AI tools and subscriptions', points: 1 },
        { id: 'b', text: 'Technical training (coding, data science)', points: 2 },
        { id: 'c', text: 'Strategic thinking and leadership development', points: 3 },
        { id: 'd', text: 'The ability to design and orchestrate human-AI collaborative systems — combining deep domain expertise with AI fluency to reimagine how work gets done', points: 5 },
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
