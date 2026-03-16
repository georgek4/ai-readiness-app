// AI Readiness Assessment Question Bank
// 390 questions: 13 departments × 5 levels × 6 questions each
// Trimmed from 50→30 per assessment to eliminate repetition
// Anti-gaming: randomized correct positions, plausible distractors, trap answers

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
  customer_success: { code: 'CS', tools: ['Gainsight', 'Totango', 'ChurnZero', 'Vitally', 'ChatGPT', 'Salesforce', 'Catalyst', 'Planhat'], workflows: ['customer onboarding', 'health scoring', 'QBR preparation', 'renewal management', 'adoption tracking', 'expansion identification', 'churn prevention', 'digital engagement'] },
  support: { code: 'SUP', tools: ['Zendesk', 'Intercom', 'Freshdesk', 'ServiceNow', 'ChatGPT', 'Ada', 'Forethought', 'Assembled'], workflows: ['ticket triage', 'first-response resolution', 'advanced troubleshooting', 'knowledge base management', 'chatbot management', 'incident management', 'SLA monitoring', 'root cause analysis'] },
  c_suite: { code: 'CSU', tools: ['ChatGPT', 'Claude', 'Perplexity', 'Tableau', 'Power BI', 'Notion AI', 'Gamma', 'Beautiful.ai'], workflows: ['strategic planning', 'board reporting', 'investor relations', 'M&A evaluation', 'organizational design', 'AI strategy', 'financial forecasting', 'executive communications'] },
};

// ──────────────────────────────────────────────────────
// Level 1: AI Awareness (6 questions)
// Tests: definition, tool familiarity, hallucination,
//        H/A/R framework, content accuracy, automation judgment
// ──────────────────────────────────────────────────────
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
      id: `${m.code}-L1-006`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
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

// ──────────────────────────────────────────────────────
// Level 2: Current Usage (6 questions)
// Tests: frequency, typical approach, data sensitivity,
//        helping others, time savings, team integration
// ──────────────────────────────────────────────────────
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
      id: `${m.code}-L2-002`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
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
      id: `${m.code}-L2-003`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
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
      id: `${m.code}-L2-004`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
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
      id: `${m.code}-L2-005`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
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
      id: `${m.code}-L2-006`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
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

// ──────────────────────────────────────────────────────
// Level 3: Skill Depth (6 questions)
// Tests: debugging output, handling inconsistency,
//        evaluating accuracy, building workflows,
//        handling limitations, maintaining standards
// ──────────────────────────────────────────────────────
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
      id: `${m.code}-L3-003`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
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
      id: `${m.code}-L3-004`, department: deptId, level: 3, weight: 1.0, difficulty: 'advanced',
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
      id: `${m.code}-L3-005`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
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
      id: `${m.code}-L3-006`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `How do you ensure AI-generated work for ${deptId.replace(/_/g, ' ')} maintains your company\'s brand voice and standards?`,
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'I include brand voice guidelines, tone examples, and formatting rules in my prompts so the AI gets it right from the start', points: 4 },
        { id: 'b', text: 'I don\'t worry about brand voice — I manually rewrite everything the AI generates to match our style anyway', points: 2 },
        { id: 'c', text: 'I\'ve built comprehensive prompt templates incorporating brand guidelines, tone samples, do/don\'t lists, and quality checklists', points: 5 },
        { id: 'd', text: 'I use the AI output as-is — it\'s usually close enough and editing takes too long to be worthwhile', points: 0 },
      ],
    },
  ];
}

// ──────────────────────────────────────────────────────
// Level 4: Strategic Thinking (6 questions)
// Tests: H/A/R classification confidence, risk awareness,
//        adoption strategy, ROI measurement,
//        future vision, ethical AI
// ──────────────────────────────────────────────────────
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
      id: `${m.code}-L4-005`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
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
      id: `${m.code}-L4-006`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
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

// ──────────────────────────────────────────────────────
// Level 5: Future Readiness (6 questions)
// Tests: agent management readiness, skills prioritization,
//        human team role, onboarding design,
//        AI-first transformation role, AI fluency importance
// ──────────────────────────────────────────────────────
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
      id: `${m.code}-L5-005`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
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
      id: `${m.code}-L5-006`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
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
  ];
}

// ──────────────────────────────────────────────────────
// Level 6: Technical Fluency (6 questions)
// Tests actual AI tool knowledge: prompt techniques,
// platform differences, context windows, RAG/projects,
// model parameters, tool selection for use cases
// ──────────────────────────────────────────────────────
function generateL6Questions(deptId) {
  const m = deptMeta[deptId];
  return [
    {
      id: `${m.code}-L6-001`, department: deptId, level: 6, weight: 1.0, difficulty: 'advanced',
      questionText: 'What is "few-shot prompting" and when is it most useful?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'A technique where you limit the AI to only a few words in its response, useful when you need concise outputs for dashboards or summaries', points: 0 },
        { id: 'b', text: 'Including 2-5 examples of desired input/output pairs in your prompt so the AI learns the pattern — most useful for consistent formatting, classification, or style matching', points: 5 },
        { id: 'c', text: 'Running the same prompt multiple times and selecting the best output from several "shots" — useful when AI output quality is inconsistent', points: 1 },
        { id: 'd', text: 'A fine-tuning technique where you train the model on a small dataset of a few hundred examples to customize it for your specific domain', points: 1 },
      ],
    },
    {
      id: `${m.code}-L6-002`, department: deptId, level: 6, weight: 1.0, difficulty: 'advanced',
      questionText: `You need to research a competitor's latest product announcement from last week and draft a ${deptId.replace(/_/g, ' ')} briefing. Which tool is best suited?`,
      type: 'scenario',
      options: [
        { id: 'a', text: 'Claude — its 200K context window means it can analyze the most data and produce the highest quality output for any research task', points: 1 },
        { id: 'b', text: 'Perplexity — it searches the live web and cites sources, so it can find recent announcements that LLMs with training data cutoffs would miss', points: 5 },
        { id: 'c', text: 'ChatGPT with GPT-4 — as the most widely-used AI, it has the most comprehensive training data and will know about recent events', points: 1 },
        { id: 'd', text: 'GitHub Copilot — its enterprise features include real-time market intelligence and competitive analysis capabilities', points: 0 },
      ],
    },
    {
      id: `${m.code}-L6-003`, department: deptId, level: 6, weight: 1.0, difficulty: 'advanced',
      questionText: 'You\'re trying to get an AI to analyze a 150-page document, but the model has a 32K token context window. What\'s the best approach?',
      type: 'scenario',
      options: [
        { id: 'a', text: 'Simply paste the entire document — modern AI models automatically summarize inputs that exceed their context window without losing important information', points: 0 },
        { id: 'b', text: 'Switch to a model with a larger context window (like Claude\'s 200K tokens), or chunk the document into sections with overlap and process each with targeted questions', points: 5 },
        { id: 'c', text: 'Use the AI\'s built-in file upload feature — uploaded files are stored in a separate memory space that doesn\'t count against the context window', points: 1 },
        { id: 'd', text: 'Compress the document by removing all formatting, images, and whitespace to reduce the token count below the 32K limit', points: 2 },
      ],
    },
    {
      id: `${m.code}-L6-004`, department: deptId, level: 6, weight: 1.0, difficulty: 'advanced',
      questionText: 'What is Retrieval-Augmented Generation (RAG) and how does it differ from fine-tuning?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'RAG and fine-tuning are the same thing — both involve training the AI model on your company\'s proprietary data to improve accuracy and relevance', points: 0 },
        { id: 'b', text: 'RAG retrieves relevant documents at query time and includes them in the prompt context; fine-tuning permanently modifies the model\'s weights. RAG is better for current data, fine-tuning for changing behavior patterns', points: 5 },
        { id: 'c', text: 'RAG generates multiple responses and retrieves the best one; fine-tuning adjusts the generation parameters like temperature. RAG improves quality, fine-tuning improves consistency', points: 1 },
        { id: 'd', text: 'RAG requires a vector database and embedding models, making it more expensive and complex than fine-tuning, which only needs a simple JSON file of examples', points: 2 },
      ],
    },
    {
      id: `${m.code}-L6-005`, department: deptId, level: 6, weight: 1.0, difficulty: 'advanced',
      questionText: 'When would you set an AI model\'s "temperature" to 0 versus a higher value like 0.8?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Temperature 0 uses less compute and is faster; 0.8 activates more processing power for complex tasks. Use 0 for simple tasks and 0.8 for difficult analysis', points: 0 },
        { id: 'b', text: 'Temperature 0 produces near-deterministic, consistent outputs (best for data extraction, classification, or factual Q&A); 0.8 introduces more randomness and creativity (best for brainstorming, content drafting)', points: 5 },
        { id: 'c', text: 'Temperature 0 means the model won\'t use any training data and only relies on the provided context; 0.8 means it blends context with training data. Use 0 when context is sufficient', points: 0 },
        { id: 'd', text: 'Temperature controls response length — 0 gives shorter responses and 0.8 gives longer, more detailed ones. Use lower values when you need concise output', points: 0 },
      ],
    },
    {
      id: `${m.code}-L6-006`, department: deptId, level: 6, weight: 1.0, difficulty: 'advanced',
      questionText: 'What are "system prompts" (or "custom instructions") and what is a Claude Project?',
      type: 'multiple_choice',
      options: [
        { id: 'a', text: 'System prompts are admin settings that control who can access the AI tool; Claude Projects are team workspaces for sharing chat history with colleagues', points: 0 },
        { id: 'b', text: 'System prompts define the AI\'s persistent role, behavior, and constraints for every interaction; Claude Projects combine system prompts with uploaded knowledge files to create a customized AI assistant for a specific domain or workflow', points: 5 },
        { id: 'c', text: 'System prompts are the initial training instructions used when building the AI model; Claude Projects are Anthropic\'s enterprise API offering for deploying custom models', points: 1 },
        { id: 'd', text: 'System prompts are templates that auto-fill your first message in a chat; Claude Projects are pre-built prompt libraries organized by industry that Anthropic maintains', points: 1 },
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
    all.push(...generateL6Questions(deptId));
  }
  return all;
}

export const questions = generateAllQuestions();

export const getQuestionsByDepartment = (deptId) => questions.filter(q => q.department === deptId);
export const getQuestionsByLevel = (deptId, level) => questions.filter(q => q.department === deptId && q.level === level);
