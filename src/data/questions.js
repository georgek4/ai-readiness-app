// AI Readiness Assessment Question Bank
// 16 departments × 6 levels × 6 questions = 576 questions
// Anti-gaming: graduated scoring, plausible distractors, randomized correct positions,
// "trap" answers that sound impressive but miss the point, department-specific scenarios
//
// Scoring philosophy: All options have graduated points (0-5). No option is obviously absurd.
// Even "wrong" answers represent common, understandable perspectives.

const deptMeta = {
  marketing: { code: 'MKT', label: 'marketing', tools: ['ChatGPT', 'Jasper', 'Copy.ai', 'HubSpot AI', 'Midjourney', 'DALL-E', 'Grammarly AI', 'Surfer SEO'], workflows: ['content creation', 'campaign management', 'SEO optimization', 'email marketing', 'social media strategy', 'analytics reporting', 'lead scoring', 'A/B testing'] },
  sales: { code: 'SAL', label: 'sales', tools: ['Gong', 'Outreach', 'Salesloft', 'ChatGPT', 'LinkedIn Sales Nav', 'Clari', 'People.ai', 'ZoomInfo'], workflows: ['prospecting', 'outreach sequences', 'discovery calls', 'pipeline management', 'forecasting', 'CRM hygiene', 'proposal creation', 'deal review'] },
  presales: { code: 'PRE', label: 'presales / solutions engineering', tools: ['Consensus', 'Demostack', 'ChatGPT', 'Loopio', 'RFPIO', 'Reprise', 'Navattic'], workflows: ['demo preparation', 'RFP responses', 'POC management', 'technical discovery', 'competitive positioning', 'security questionnaires'] },
  professional_services: { code: 'PS', label: 'professional services', tools: ['Monday.com AI', 'Smartsheet', 'ChatGPT', 'Jira', 'Confluence AI', 'MS Project', 'Asana AI'], workflows: ['project planning', 'data migration', 'configuration management', 'training delivery', 'status reporting', 'resource planning'] },
  value_engineering: { code: 'VE', label: 'value engineering', tools: ['ChatGPT', 'Excel AI', 'Tableau', 'Power BI', 'Google Sheets AI', 'Notion AI'], workflows: ['business case building', 'ROI modeling', 'benchmark research', 'value realization tracking', 'EBR preparation'] },
  product_management: { code: 'PM', label: 'product management', tools: ['ChatGPT', 'Notion AI', 'Productboard', 'Amplitude', 'Mixpanel', 'Figma AI', 'Linear', 'Jira'], workflows: ['PRD writing', 'user research synthesis', 'roadmap planning', 'sprint planning', 'data analysis', 'competitor monitoring'] },
  engineering: { code: 'ENG', label: 'engineering', tools: ['GitHub Copilot', 'Cursor', 'Claude', 'ChatGPT', 'Tabnine', 'Snyk AI', 'Datadog AI', 'SonarQube'], workflows: ['code writing', 'code review', 'testing', 'debugging', 'CI/CD pipeline management', 'monitoring', 'documentation', 'architecture design'] },
  product_design: { code: 'DES', label: 'product design', tools: ['Figma AI', 'Midjourney', 'DALL-E', 'Adobe Firefly', 'Uizard', 'Galileo AI', 'ChatGPT'], workflows: ['wireframing', 'prototyping', 'user research', 'accessibility auditing', 'design system maintenance', 'visual design'] },
  customer_education: { code: 'EDU', label: 'customer education', tools: ['ChatGPT', 'Synthesia', 'Descript', 'Loom AI', 'Notion AI', 'DeepL', 'Grammarly AI'], workflows: ['documentation writing', 'video production', 'course creation', 'content localization', 'release notes', 'community management'] },
  demo_engineering: { code: 'DMO', label: 'demo & solution engineering', tools: ['Reprise', 'Navattic', 'Demostack', 'ChatGPT', 'Faker.js', 'Terraform', 'GitHub Actions', 'Lucidchart', 'Miro'], workflows: ['demo data generation', 'environment provisioning', 'interactive demo building', 'video production', 'demo analytics', 'solution design', 'solution architecture', 'customer requirements analysis'] },
  industry_strategy: { code: 'IND', label: 'industry strategy', tools: ['ChatGPT', 'Perplexity', 'AlphaSense', 'Gartner AI', 'CB Insights', 'Notion AI'], workflows: ['trend analysis', 'thought leadership content', 'industry research', 'benchmark research', 'advisory board facilitation'] },
  revenue_operations: { code: 'REV', label: 'revenue operations', tools: ['Salesforce Einstein', 'Clari', 'Gong', 'LeanData', 'ChatGPT', 'Tableau', 'dbt'], workflows: ['CRM administration', 'pipeline analytics', 'forecasting models', 'territory planning', 'data enrichment', 'dashboard reporting'] },
  enablement: { code: 'EN', label: 'enablement', tools: ['Gong', 'Highspot', 'Seismic', 'ChatGPT', 'Lessonly', 'Mindtickle', 'Allego'], workflows: ['onboarding design', 'content creation', 'call coaching', 'certification programs', 'competitive training', 'skills assessment'] },
  customer_success: { code: 'CS', label: 'customer success', tools: ['Gainsight', 'Totango', 'ChurnZero', 'Vitally', 'ChatGPT', 'Salesforce', 'Catalyst', 'Planhat'], workflows: ['customer onboarding', 'health scoring', 'QBR preparation', 'renewal management', 'adoption tracking', 'expansion identification', 'churn prevention', 'digital engagement'] },
  support: { code: 'SUP', label: 'support', tools: ['Zendesk', 'Intercom', 'Freshdesk', 'ServiceNow', 'ChatGPT', 'Ada', 'Forethought', 'Assembled'], workflows: ['ticket triage', 'first-response resolution', 'advanced troubleshooting', 'knowledge base management', 'chatbot management', 'incident management', 'SLA monitoring', 'root cause analysis'] },
  c_suite: { code: 'CSU', label: 'executive leadership', tools: ['ChatGPT', 'Claude', 'Perplexity', 'Tableau', 'Power BI', 'Notion AI', 'Gamma', 'Beautiful.ai'], workflows: ['strategic planning', 'board reporting', 'investor relations', 'M&A evaluation', 'organizational design', 'AI strategy', 'financial forecasting', 'executive communications'] },
};

// Seeded PRNG (mulberry32) for deterministic but well-distributed shuffling
function mulberry32(seed) {
  let t = seed | 0;
  return function () {
    t = (t + 0x6D2B79F5) | 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleOptions(options, seed) {
  const s = seed.split('').reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const rng = mulberry32(s);
  const arr = [...options];
  // Fisher-Yates shuffle with proper PRNG
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ──────────────────────────────────────────────────────
// Level 1: AI Awareness (6 questions)
// Tests foundational understanding of AI concepts,
// tool awareness, and limitations — tailored per dept
// ──────────────────────────────────────────────────────
function generateL1Questions(deptId) {
  const m = deptMeta[deptId];
  const dept = m.label;
  const t1 = m.tools[0], t2 = m.tools[1], t3 = m.tools[2];
  const w1 = m.workflows[0], w2 = m.workflows[1], w3 = m.workflows[2];

  return [
    {
      id: `${m.code}-L1-001`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `A ${dept} team member says: "AI can now fully replace humans for ${w1}." How would you assess this claim?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: `That's accurate — AI tools like ${t1} have advanced rapidly and can now handle ${w1} end-to-end with minimal human involvement in most standard scenarios`, points: 1 },
        { id: 'b', text: `AI can significantly assist with ${w1}, but human oversight is still needed for quality, context, and judgment`, points: 5 },
        { id: 'c', text: `AI isn't reliable enough for ${w1} yet — the technology still produces too many errors and hallucinations to be trusted with real deliverables without major rework`, points: 1 },
        { id: 'd', text: `It depends entirely on the specific AI tool and model version being used — some of the latest releases can handle ${w1} fully while older versions can't`, points: 2 },
      ], `${m.code}-L1-001`),
    },
    {
      id: `${m.code}-L1-002`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `Which of these ${dept} scenarios best illustrates an "AI hallucination" problem?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: `Using ${t1} to draft ${w1} content and it produces text in a completely wrong formatting style that doesn't match what you asked for`, points: 1 },
        { id: 'b', text: `AI confidently cites a specific statistic in a ${dept} deliverable, but the number doesn't exist — it was fabricated`, points: 5 },
        { id: 'c', text: `The AI tool crashes or times out when processing a large ${dept} dataset because the file size exceeds the system's upload or context limits`, points: 0 },
        { id: 'd', text: `AI generates multiple variations of ${w2} content and each version uses slightly different phrasing, tone, and emphasis even with the same prompt`, points: 1 },
      ], `${m.code}-L1-002`),
    },
    {
      id: `${m.code}-L1-003`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `How familiar are you with AI tools used in ${dept} (e.g., ${t1}, ${t2}, ${t3})?`,
      type: 'self_rating',
      options: [
        { id: '1', text: "I haven't heard of most of these tools", points: 1 },
        { id: '2', text: "I recognize the names but haven't used them", points: 2 },
        { id: '3', text: "I've tried one or two for basic tasks", points: 3 },
        { id: '4', text: 'I use at least one regularly in my workflow', points: 4 },
        { id: '5', text: 'I use multiple AI tools daily and understand their strengths and limitations', points: 5 },
      ],
    },
    {
      id: `${m.code}-L1-004`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `In the "Humanize / Agentify / Automate" framework, which of these ${dept} activities is the best example of "Agentify"?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: `Running ${w3} end-to-end without any human involvement, using scheduled automation, predefined rules, and triggered workflows`, points: 2 },
        { id: 'b', text: `Having AI draft ${w1} deliverables while a human reviews and approves each output`, points: 5 },
        { id: 'c', text: `A senior team member personally handling ${w2} because it requires deep relationship skills, strategic judgment, and contextual awareness`, points: 1 },
        { id: 'd', text: `Using AI to check spelling, grammar, and basic compliance in ${dept} documents before they're distributed to stakeholders`, points: 0 },
      ], `${m.code}-L1-004`),
    },
    {
      id: `${m.code}-L1-005`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `Your team just adopted ${t1} for ${dept} work. A colleague says the outputs are "always accurate because it was trained on reliable data." What's the most useful response?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: `That's mostly correct — ${t1} is trained on extensive, high-quality datasets and the latest models have dramatically reduced error rates compared to earlier versions`, points: 1 },
        { id: 'b', text: `AI outputs should always be verified — models can generate plausible content that's wrong or outdated`, points: 5 },
        { id: 'c', text: `The accuracy depends heavily on which specific model version and settings you're using — newer releases with the right configuration are significantly more reliable`, points: 2 },
        { id: 'd', text: `You should cross-check every important output with a second AI tool for validation — if both independently produce the same answer, the information is reliable enough to use`, points: 1 },
      ], `${m.code}-L1-005`),
    },
    {
      id: `${m.code}-L1-006`, department: deptId, level: 1, weight: 1.0, difficulty: 'beginner',
      questionText: `Which ${dept} task would benefit MOST from AI assistance while still requiring significant human judgment?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: `Scheduling ${dept} team meetings across time zones and sending automated calendar invitations based on availability`, points: 0 },
        { id: 'b', text: `${m.workflows[3].charAt(0).toUpperCase() + m.workflows[3].slice(1)} — AI provides analysis and drafts, humans decide`, points: 5 },
        { id: 'c', text: `Formatting ${dept} documents and deliverables according to company templates, brand guidelines, and standard compliance requirements`, points: 0 },
        { id: 'd', text: `Syncing data between ${dept} tools, deduplicating records, and keeping systems of record up to date based on predefined mapping rules`, points: 0 },
      ], `${m.code}-L1-006`),
    },
  ];
}

// ──────────────────────────────────────────────────────
// Level 2: Current Usage (6 questions)
// Tests actual usage patterns, workflows, data handling,
// and real-world AI integration — deeply dept-specific
// ──────────────────────────────────────────────────────
function generateL2Questions(deptId) {
  const m = deptMeta[deptId];
  const dept = m.label;
  const w1 = m.workflows[0], w2 = m.workflows[1], w3 = m.workflows[2];

  return [
    {
      id: `${m.code}-L2-001`, department: deptId, level: 2, weight: 1.0, difficulty: 'beginner',
      questionText: `How frequently do you currently use AI tools in your ${dept} work?`,
      type: 'frequency',
      options: [
        { id: 'never', text: 'Never — I haven\'t incorporated AI into my workflow', points: 0 },
        { id: 'rarely', text: 'Rarely — I\'ve experimented once or twice', points: 1 },
        { id: 'sometimes', text: 'A few times per month for specific tasks', points: 2 },
        { id: 'often', text: 'Multiple times per week across different workflows', points: 4 },
        { id: 'always', text: 'Daily — AI is embedded in my standard workflow', points: 5 },
      ],
    },
    {
      id: `${m.code}-L2-002`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: `You're using AI to help with ${w1}. The output is decent but not quite right. What happens next?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: 'I use the output as-is with minor edits — getting 80% of the way there quickly is more valuable than perfecting it', points: 2 },
        { id: 'b', text: 'I revise my prompt with more specific context, examples, and constraints, then iterate until the output meets my standards', points: 4 },
        { id: 'c', text: 'I have a systematic process: refined prompts, structured review criteria, and documented templates I\'ve built over time for this exact workflow', points: 5 },
        { id: 'd', text: 'I set the AI output aside and do it manually — it\'s faster than going back and forth with the tool', points: 1 },
      ], `${m.code}-L2-002`),
    },
    {
      id: `${m.code}-L2-003`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: `A ${dept} project requires you to use AI with customer data and internal metrics. How do you proceed?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'I use only approved enterprise AI tools, anonymize sensitive fields, and follow our data classification policy', points: 5 },
        { id: 'b', text: 'I avoid using AI for anything involving real data — it\'s safer to only use AI for general tasks without specific data inputs', points: 2 },
        { id: 'c', text: 'I use whatever AI tool is most capable for the task — the AI companies have strong security, so the data is protected', points: 0 },
        { id: 'd', text: 'I check with IT before each use to get approval, which means I only use AI for data-related tasks occasionally', points: 3 },
      ], `${m.code}-L2-003`),
    },
    {
      id: `${m.code}-L2-004`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: `How has AI tangibly changed the way you approach ${w2}?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: `I do ${w2} the same way as before — AI hasn't changed this workflow for me`, points: 0 },
        { id: 'b', text: 'I occasionally use AI to speed up parts of it, but my core approach is the same', points: 2 },
        { id: 'c', text: `I've redesigned how I approach ${w2} — AI handles the first pass and I focus on strategy, refinement, and quality`, points: 4 },
        { id: 'd', text: `I've built a complete AI-assisted system for ${w2} with templates, quality checks, and documented processes my team can replicate`, points: 5 },
      ], `${m.code}-L2-004`),
    },
    {
      id: `${m.code}-L2-005`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: `A new team member in ${dept} asks how they should start using AI. What do you recommend?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: 'I point them to some online tutorials and suggest they experiment on their own — self-directed exploration is the best way to learn', points: 1 },
        { id: 'b', text: `I walk them through specific AI workflows for ${dept} tasks, share my prompts, and check in to see how it's going`, points: 4 },
        { id: 'c', text: 'I suggest they wait until the team has an official AI training program — ad hoc adoption can create bad habits', points: 1 },
        { id: 'd', text: 'I\'m still figuring it out myself, so I\'d suggest they ask someone more experienced with AI tools', points: 0 },
      ], `${m.code}-L2-005`),
    },
    {
      id: `${m.code}-L2-006`, department: deptId, level: 2, weight: 1.0, difficulty: 'intermediate',
      questionText: `How embedded is AI in your ${dept} team's standard operating procedures?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'Not at all — our SOPs don\'t reference AI tools or AI-assisted workflows', points: 0 },
        { id: 'b', text: 'A few individuals use AI on their own initiative, but it\'s not officially part of our processes', points: 1 },
        { id: 'c', text: 'AI is included in some documented workflows but adoption is inconsistent across the team', points: 3 },
        { id: 'd', text: 'AI is systematically built into our processes with documented prompts, tool guidelines, and onboarding materials', points: 5 },
      ], `${m.code}-L2-006`),
    },
  ];
}

// ──────────────────────────────────────────────────────
// Level 3: Skill Depth (6 questions)
// Tests ability to debug, iterate, evaluate quality,
// build workflows, and handle limitations — dept-specific
// ──────────────────────────────────────────────────────
function generateL3Questions(deptId) {
  const m = deptMeta[deptId];
  const dept = m.label;
  const t1 = m.tools[0], t2 = m.tools[1];
  const w1 = m.workflows[0], w2 = m.workflows[1], w3 = m.workflows[2], w4 = m.workflows[3];

  return [
    {
      id: `${m.code}-L3-001`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `You're using AI for ${w1} and the output misses important nuances specific to your ${dept} context. What do you do?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: 'Add more context about the specific situation, include concrete examples of what good output looks like, and explicitly call out the nuances that matter most', points: 4 },
        { id: 'b', text: 'Diagnose why it missed the nuances — context gap, framing issue, or model limitation — then adjust accordingly', points: 5 },
        { id: 'c', text: 'Switch to a more capable AI model — the latest frontier models have much stronger understanding of domain-specific nuance and professional context', points: 1 },
        { id: 'd', text: 'Manually fix the output directly — sometimes editing the AI\'s work is more efficient than iterating through multiple rounds of prompting for diminishing returns', points: 2 },
      ], `${m.code}-L3-001`),
    },
    {
      id: `${m.code}-L3-002`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `You need consistent, high-quality AI outputs for ${w3} across your ${dept} team. How do you achieve this?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: `Standardize on one AI platform for all ${dept} work — consistency comes from everyone using the same tool with the same model and settings`, points: 1 },
        { id: 'b', text: 'Create detailed prompt templates with instructions, examples, and quality criteria the team can follow', points: 4 },
        { id: 'c', text: 'Build a system with templates, quality gates, review checkpoints, and a feedback loop', points: 5 },
        { id: 'd', text: 'Train the team on foundational prompting techniques through a structured workshop, then let each person develop their own approach that suits their style and workflow', points: 2 },
      ], `${m.code}-L3-002`),
    },
    {
      id: `${m.code}-L3-003`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `How do you evaluate whether an AI-generated ${dept} deliverable is ready to share with stakeholders?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'I read through it carefully for obvious errors, check that all the main points and requirements are covered, and do a quick sanity check on any numbers', points: 2 },
        { id: 'b', text: 'I verify facts against sources, check for bias, and have experts review high-stakes content', points: 5 },
        { id: 'c', text: 'I run it through a second AI tool to cross-check — if two independent models produce substantially the same output, the content is reliable enough to share', points: 1 },
        { id: 'd', text: 'I focus on tone, formatting, and brand alignment — AI factual content is generally reliable for standard business deliverables that don\'t involve novel claims', points: 1 },
      ], `${m.code}-L3-003`),
    },
    {
      id: `${m.code}-L3-004`, department: deptId, level: 3, weight: 1.0, difficulty: 'advanced',
      questionText: `Your manager asks you to create a reusable AI-assisted workflow for ${w4} that the whole ${dept} team can use. What do you deliver?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: `A detailed recommendation document covering which AI tool to use for ${w4}, configuration best practices, and tips for getting consistently good results`, points: 1 },
        { id: 'b', text: 'A structured playbook with prompt templates, step-by-step instructions, and quality examples', points: 4 },
        { id: 'c', text: 'A system with templates, quality gates, metrics, and training materials', points: 5 },
        { id: 'd', text: 'A fully automated end-to-end pipeline that handles the entire workflow autonomously — eliminating manual steps to maximize time savings and consistency', points: 1 },
      ], `${m.code}-L3-004`),
    },
    {
      id: `${m.code}-L3-005`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `You're trying to use AI to analyze a very long ${dept} document but the tool can't process it all at once. How do you handle this?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'I chunk the document strategically and process each section with targeted questions', points: 5 },
        { id: 'b', text: 'I paste the whole document in and let the AI process what it can — most tools handle truncation gracefully and prioritize the most relevant sections automatically', points: 0 },
        { id: 'c', text: 'I create a detailed manual summary of the key points first, then provide that condensed version to the AI as the foundation for analysis', points: 2 },
        { id: 'd', text: 'I switch to a frontier model with a larger context window — Claude\'s 200K tokens or Gemini\'s 1M tokens can handle most business documents in a single pass', points: 3 },
      ], `${m.code}-L3-005`),
    },
    {
      id: `${m.code}-L3-006`, department: deptId, level: 3, weight: 1.0, difficulty: 'intermediate',
      questionText: `How do you ensure AI-generated ${dept} content matches your company's voice, standards, and domain expertise?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'I include brand guidelines, tone examples, and formatting rules directly in my prompts', points: 4 },
        { id: 'b', text: 'I\'ve built comprehensive prompt templates with brand guidelines, "do/don\'t" examples, quality checklists, and domain-specific terminology', points: 5 },
        { id: 'c', text: 'I rewrite the AI output to match our voice — it\'s faster than trying to get the AI to match it perfectly', points: 2 },
        { id: 'd', text: 'Modern AI tools already produce professional-quality content that works for most situations without much customization', points: 0 },
      ], `${m.code}-L3-006`),
    },
  ];
}

// ──────────────────────────────────────────────────────
// Level 4: Strategic Thinking (6 questions)
// Tests ability to think about AI at the organizational
// level — strategy, ROI, risk, transformation vision
// ──────────────────────────────────────────────────────
function generateL4Questions(deptId) {
  const m = deptMeta[deptId];
  const dept = m.label;
  const w1 = m.workflows[0], w2 = m.workflows[1];

  return [
    {
      id: `${m.code}-L4-001`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `How confident are you in classifying every ${dept} activity as Humanize, Agentify, or Automate — and defending those classifications?`,
      type: 'self_rating',
      options: [
        { id: '1', text: 'I\'m not sure how to apply this framework to our specific activities', points: 1 },
        { id: '2', text: 'I could classify the obvious ones but would struggle with borderline cases', points: 2 },
        { id: '3', text: 'I could classify most activities with reasonable confidence', points: 3 },
        { id: '4', text: 'I understand the nuances and could defend my classifications with clear reasoning', points: 4 },
        { id: '5', text: 'I can classify, justify, debate edge cases, and explain how classifications will evolve over time', points: 5 },
      ],
    },
    {
      id: `${m.code}-L4-002`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `Your ${dept} team is excited about AI but moving fast without guardrails. What's the most important risk to address first?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'The total cost of AI subscriptions, training programs, and infrastructure potentially exceeding the quantifiable productivity gains for the team', points: 2 },
        { id: 'b', text: 'Over-reliance without governance — risking quality issues, data exposure, or skill erosion', points: 5 },
        { id: 'c', text: 'Vendor lock-in — if the team builds critical workflows entirely on one AI platform, switching costs become prohibitive when pricing changes or better alternatives emerge', points: 2 },
        { id: 'd', text: 'Team members spending excessive time experimenting with new AI tools and techniques instead of focusing on their core deliverables and KPIs', points: 1 },
      ], `${m.code}-L4-002`),
    },
    {
      id: `${m.code}-L4-003`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `You're building an AI adoption strategy for ${dept}. Two team members disagree: one wants to go all-in immediately, the other wants to wait for better tools. What approach do you recommend?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: 'Start with one high-impact workflow, prove value, then expand systematically', points: 5 },
        { id: 'b', text: 'Let each person decide their own adoption pace and timeline — forcing AI adoption on reluctant team members typically backfires and creates resentment', points: 2 },
        { id: 'c', text: 'Go all-in across the department — the team that adopts fastest gains a compounding competitive advantage, and hesitation is the bigger risk in a fast-moving market', points: 1 },
        { id: 'd', text: 'Wait 6 months for the landscape to stabilize — investing heavily in today\'s rapidly-evolving tools risks significant wasted effort when better alternatives inevitably arrive', points: 0 },
      ], `${m.code}-L4-003`),
    },
    {
      id: `${m.code}-L4-004`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `Your VP asks: "How do we measure whether AI is actually helping our ${dept} team?" What framework do you propose?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: 'Track hours saved per week across the team and multiply by average hourly compensation cost — this gives a clear, quantifiable dollar value that leadership can act on', points: 3 },
        { id: 'b', text: 'Compare output volume before and after AI adoption — measuring throughput increases across key deliverables gives the most tangible evidence of impact', points: 1 },
        { id: 'c', text: 'Measure time savings, quality improvements, error rates, satisfaction, and strategic value', points: 5 },
        { id: 'd', text: 'It\'s very difficult to isolate AI\'s specific impact from other productivity factors — better to track overall team performance metrics holistically and attribute proportionally', points: 1 },
      ], `${m.code}-L4-004`),
    },
    {
      id: `${m.code}-L4-005`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `A board member asks: "What will ${dept} look like in 3 years with AI?" How do you respond?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: `The team will be significantly more productive while maintaining roughly the same structure — everyone uses AI tools as a daily force multiplier on their existing work`, points: 2 },
        { id: 'b', text: `AI will handle nearly all execution tasks — the team shrinks considerably and the remaining professionals focus primarily on overseeing, tuning, and maintaining AI systems`, points: 1 },
        { id: 'c', text: `Activities shift to AI agents, human roles evolve toward strategy, and outcomes improve`, points: 5 },
        { id: 'd', text: `AI is evolving so rapidly that any 3-year prediction would be unreliable — it's more responsible to focus on quarterly adaptation and stay flexible rather than commit to a speculative vision`, points: 1 },
      ], `${m.code}-L4-005`),
    },
    {
      id: `${m.code}-L4-006`, department: deptId, level: 4, weight: 1.0, difficulty: 'advanced',
      questionText: `A ${dept} colleague uses AI to generate client-facing content without disclosure or review. They say: "It's fine — the output is indistinguishable from human work." What's your response?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'If the quality is genuinely good and the client is happy, there\'s no practical issue — quality matters more than process', points: 1 },
        { id: 'b', text: 'I raise concerns about transparency, review processes, and the risk of AI errors reaching clients — and advocate for clear guidelines', points: 5 },
        { id: 'c', text: 'I flag it to management — using AI for client work without approval could be a compliance issue', points: 3 },
        { id: 'd', text: 'I agree it\'s fine as long as they personally reviewed it before sending — that provides sufficient quality control', points: 2 },
      ], `${m.code}-L4-006`),
    },
  ];
}

// ──────────────────────────────────────────────────────
// Level 5: Future Readiness (6 questions)
// Tests preparedness for AI agents, evolving roles,
// organizational transformation — dept-specific vision
// ──────────────────────────────────────────────────────
function generateL5Questions(deptId) {
  const m = deptMeta[deptId];
  const dept = m.label;
  const w1 = m.workflows[0], w2 = m.workflows[1];

  return [
    {
      id: `${m.code}-L5-001`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `How prepared are you to manage AI agents that work semi-autonomously on ${dept} tasks?`,
      type: 'self_rating',
      options: [
        { id: '1', text: 'I\'m not clear on what AI agents are or how they differ from current AI chat tools', points: 1 },
        { id: '2', text: 'I understand the concept of AI agents but haven\'t worked with any', points: 2 },
        { id: '3', text: 'I\'ve experimented with some autonomous AI tools in limited scenarios', points: 3 },
        { id: '4', text: 'I regularly oversee AI-powered workflows and know when to intervene', points: 4 },
        { id: '5', text: 'I design human-AI collaboration systems and manage multi-step autonomous workflows', points: 5 },
      ],
    },
    {
      id: `${m.code}-L5-002`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `As AI agents take over more routine ${dept} tasks, which skills become MORE valuable for the humans on the team?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'Deep AI technical skills — programming, prompt engineering, model fine-tuning, and system integration become the essential core competency for every professional', points: 2 },
        { id: 'b', text: 'Strategic thinking, empathy, creative problem-solving, and cross-functional leadership', points: 5 },
        { id: 'c', text: 'Speed and efficiency with AI tools — the professionals who can operate AI fastest and produce the highest volume of outputs will outperform their peers significantly', points: 1 },
        { id: 'd', text: 'Quality control and oversight — humans become primarily responsible for reviewing, validating, and approving the growing volume of AI-generated deliverables', points: 2 },
      ], `${m.code}-L5-002`),
    },
    {
      id: `${m.code}-L5-003`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `Imagine AI agents handle most routine ${dept} work in 2-3 years. What becomes the primary role of the human ${dept} professional?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: 'Quality assurance — systematically reviewing, validating, and approving every AI-generated output before it reaches stakeholders, clients, or customers', points: 2 },
        { id: 'b', text: 'Strategy, relationships, creative problem-solving, and handling novel situations', points: 5 },
        { id: 'c', text: 'Managing the AI systems themselves — configuring tools, monitoring performance metrics, maintaining workflow automations, and troubleshooting when things break', points: 1 },
        { id: 'd', text: 'The same fundamental role as today, but executed significantly faster and at higher volume — humans still own every workflow, with AI serving as an acceleration layer', points: 1 },
      ], `${m.code}-L5-003`),
    },
    {
      id: `${m.code}-L5-004`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `You're designing onboarding for a new ${dept} hire who will work extensively with AI. How do you structure it?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: 'Require them to complete AI certification courses before touching real work', points: 2 },
        { id: 'b', text: `Create a structured AI track with tool training, prompt libraries, and shadowing alongside AI-fluent team members`, points: 4 },
        { id: 'c', text: 'Give them tool access on day one and let them explore — self-directed learning builds deeper skills', points: 1 },
        { id: 'd', text: `Design immersive onboarding where every task naturally uses AI, building fluency through practice with mentorship and progressive challenges`, points: 5 },
      ], `${m.code}-L5-004`),
    },
    {
      id: `${m.code}-L5-005`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `Your CEO declares the company will be "AI-first" in 12 months. What's your response as a ${dept} professional?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: 'Focus on getting AI-certified first so I can contribute from a position of strength', points: 2 },
        { id: 'b', text: 'Wait for the transformation team to provide guidance — independent action without coordination could cause problems', points: 0 },
        { id: 'c', text: `Immediately identify the top 3-5 AI opportunities in ${dept}, build proof-of-concepts, and volunteer to lead pilots`, points: 4 },
        { id: 'd', text: `Map all ${dept} activities to H/A/R, build a transformation roadmap, champion adoption, measure results, and help redesign team operations`, points: 5 },
      ], `${m.code}-L5-005`),
    },
    {
      id: `${m.code}-L5-006`, department: deptId, level: 5, weight: 1.0, difficulty: 'advanced',
      questionText: `How critical is it for ${dept} professionals to deeply understand AI capabilities and limitations — even if they'll never build AI?`,
      type: 'likert',
      options: [
        { id: '1', text: 'Nice to know, but the AI tools should be intuitive enough that deep understanding isn\'t necessary', points: 1 },
        { id: '2', text: 'Somewhat important — it helps with day-to-day tool usage', points: 2 },
        { id: '3', text: 'Moderately important — understanding limitations prevents mistakes', points: 3 },
        { id: '4', text: 'Very important — it\'s quickly becoming a core professional competency', points: 4 },
        { id: '5', text: 'Essential — AI fluency is now as fundamental as digital literacy', points: 5 },
      ],
    },
  ];
}

// ──────────────────────────────────────────────────────
// Level 6: Technical Fluency (6 questions) — HIGHEST WEIGHTED SECTION
// Tests real AI knowledge: prompting techniques, model architecture,
// tool selection, system design, parameters — dept-specific scenarios
// All questions are harder with more nuanced distractors
// ──────────────────────────────────────────────────────
function generateL6Questions(deptId) {
  const m = deptMeta[deptId];
  const dept = m.label;
  const t1 = m.tools[0], t2 = m.tools[1];
  const w1 = m.workflows[0], w2 = m.workflows[1], w3 = m.workflows[2];

  return [
    {
      id: `${m.code}-L6-001`, department: deptId, level: 6, weight: 1.2, difficulty: 'advanced',
      questionText: `You need AI to classify ${dept} items into categories with consistent formatting every time. Which technique is most reliable?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'Write very detailed instructions describing the exact output format, using precise language and explicit constraints — the more specific your description, the more consistent the results', points: 2 },
        { id: 'b', text: 'Include 3-5 examples of correctly classified and formatted items directly in your prompt so the AI infers the pattern', points: 5 },
        { id: 'c', text: 'Ask the AI to think step-by-step through its classification reasoning before outputting the final answer in your desired format', points: 3 },
        { id: 'd', text: 'Fine-tune a custom model on your classification taxonomy — this permanently embeds the format and categories so no prompt engineering is needed', points: 1 },
      ], `${m.code}-L6-001`),
    },
    {
      id: `${m.code}-L6-002`, department: deptId, level: 6, weight: 1.2, difficulty: 'advanced',
      questionText: `You need to brief your ${dept} team on a competitor's product launch from 3 days ago. What's the most reliable approach?`,
      type: 'scenario',
      options: shuffleOptions([
        { id: 'a', text: `Ask ${t1} directly — frontier LLMs have training data that's updated frequently and can often discuss recent events`, points: 0 },
        { id: 'b', text: 'Use a web-connected AI (like Perplexity) to gather current sourced information, then synthesize with a strong LLM', points: 5 },
        { id: 'c', text: 'Use Claude\'s 200K context window — paste in the announcement page, press coverage, and analyst reactions, then ask for a structured briefing synthesis', points: 3 },
        { id: 'd', text: 'Use Google Gemini since it has direct access to Google Search data and can surface the most recent, relevant web results natively in its responses', points: 2 },
      ], `${m.code}-L6-002`),
    },
    {
      id: `${m.code}-L6-003`, department: deptId, level: 6, weight: 1.2, difficulty: 'advanced',
      questionText: `Your ${dept} team wants an AI system that can answer questions about your company's 500+ internal documents. Which approach do you recommend and why?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'Fine-tune a model on all your documents — this permanently teaches the model your company\'s information, so it always has the right answers without needing document lookup', points: 1 },
        { id: 'b', text: 'RAG — index documents in a vector database and retrieve relevant sections at query time to include in context', points: 5 },
        { id: 'c', text: 'Use a model with the largest available context window and upload all 500+ documents at once — modern models can handle millions of tokens effectively', points: 1 },
        { id: 'd', text: 'Build a structured FAQ covering the most common questions and feed it as a knowledge base to a Custom GPT or Claude Project, updating the FAQ monthly', points: 2 },
      ], `${m.code}-L6-003`),
    },
    {
      id: `${m.code}-L6-004`, department: deptId, level: 6, weight: 1.2, difficulty: 'advanced',
      questionText: `You're using AI for two ${dept} tasks: (1) extracting structured data from reports, and (2) brainstorming creative approaches to ${w1}. A colleague asks if they should use the same settings for both. What do you say?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'Use the default settings for both — temperature differences are overstated in practice and don\'t meaningfully affect output quality for most professional tasks', points: 0 },
        { id: 'b', text: 'Use low temperature for extraction (deterministic, precise) and higher temperature for brainstorming (varied, creative)', points: 5 },
        { id: 'c', text: 'Use a more powerful model for brainstorming since creative tasks require more advanced reasoning capabilities, and a smaller efficient model for straightforward data extraction', points: 2 },
        { id: 'd', text: 'The most important difference is the system prompt, not temperature — write a strict, detailed system prompt for extraction and a more open-ended one for brainstorming', points: 3 },
      ], `${m.code}-L6-004`),
    },
    {
      id: `${m.code}-L6-005`, department: deptId, level: 6, weight: 1.2, difficulty: 'advanced',
      questionText: `Your ${dept} team needs a persistent AI assistant that always understands your team's processes, terminology, and quality standards. What's the most practical approach?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'Fine-tune a custom model on your team\'s documents, Slack messages, and past deliverables — this permanently embeds your team\'s knowledge into the model\'s weights', points: 1 },
        { id: 'b', text: 'Use a Claude Project or Custom GPT: system prompt with role/rules + uploaded knowledge docs', points: 5 },
        { id: 'c', text: 'Rely on the AI\'s built-in memory and conversation history features — after enough interactions, it learns your team\'s preferences and context automatically over time', points: 1 },
        { id: 'd', text: 'Create a master context document and paste it at the start of every new conversation — this ensures the AI always has full context without any special configuration', points: 2 },
      ], `${m.code}-L6-005`),
    },
    {
      id: `${m.code}-L6-006`, department: deptId, level: 6, weight: 1.2, difficulty: 'advanced',
      questionText: `Your team is debating: should you use an off-the-shelf AI tool, build a custom integration using AI APIs, or fine-tune a model for a core ${dept} workflow? What determines the right choice?`,
      type: 'multiple_choice',
      options: shuffleOptions([
        { id: 'a', text: 'Always start with off-the-shelf tools — they\'re cheaper, faster to deploy, supported by vendor teams, and good enough for 90% of business use cases across any department', points: 2 },
        { id: 'b', text: 'It depends on how differentiated the workflow is: off-the-shelf for standard needs, API integration for custom workflows, fine-tuning only for highly specialized domain tasks', points: 5 },
        { id: 'c', text: 'Custom API integrations are always the best investment — they give you full control over data flow, model selection, and prompt logic without vendor lock-in or feature limitations', points: 1 },
        { id: 'd', text: 'Fine-tuning should be the default for any important business workflow — it permanently teaches the model your domain, reducing ongoing prompt engineering effort and improving consistency', points: 0 },
      ], `${m.code}-L6-006`),
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
