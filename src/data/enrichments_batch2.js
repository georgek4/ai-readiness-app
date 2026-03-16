// Enrichment data for Product Management, Engineering, and Product Design departments
// Each key maps to an activity ID and adds detailed fields

export const batch2 = {
  // ============ PRODUCT MANAGEMENT ============
  pm_vision: {
    detailedDescription: 'Product vision and strategy defines the long-term direction for a product, including the target market, key differentiators, and desired outcomes. It requires synthesizing market trends, customer needs, business objectives, and technological possibilities into a cohesive narrative that aligns the entire organization.',
    aiOpportunity: 'AI can aggregate and summarize market reports, competitor moves, and customer feedback to inform strategic thinking. However, crafting a compelling product vision requires human judgment about company values, cultural context, and bold bets that transcend data-driven analysis.',
    exampleTools: [
      { name: 'Productboard', url: 'https://www.productboard.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
      { name: 'Miro', url: 'https://miro.com/' },
    ],
    implementationTips: [
      'Use AI to synthesize customer feedback themes and market research into a concise landscape summary before vision workshops',
      'Leverage AI to stress-test your vision statement by generating counterarguments and identifying blind spots',
      'Have AI draft multiple vision narrative variants so leadership can react to concrete options rather than a blank page',
    ],
    maturityIndicators: {
      beginner: 'Product vision is set through executive intuition with no AI-assisted market synthesis',
      intermediate: 'AI tools aggregate market signals and customer themes to inform vision discussions',
      advanced: 'Continuous AI-powered market and customer intelligence feeds into quarterly vision reviews and pivots',
    },
  },
  pm_research: {
    detailedDescription: 'Customer research and interviews involve direct engagement with users and prospects to uncover needs, pain points, and behaviors. This includes planning studies, recruiting participants, conducting interviews, synthesizing findings, and translating insights into product opportunities.',
    aiOpportunity: 'AI can transcribe and analyze interview recordings, identify recurring themes across dozens of conversations, and suggest follow-up questions. The human touch remains essential for building rapport with interviewees, reading non-verbal cues, and applying empathetic judgment to interpret findings.',
    exampleTools: [
      { name: 'Dovetail', url: 'https://dovetail.com/' },
      { name: 'Grain', url: 'https://grain.com/' },
      { name: 'Otter.ai', url: 'https://otter.ai/' },
    ],
    implementationTips: [
      'Record all interviews and use AI transcription to create searchable archives of customer insights',
      'After each batch of interviews, use AI to cluster feedback into themes and surface surprising outliers',
      'Create AI-powered interview guides that adapt suggested follow-up questions based on conversation context',
    ],
    maturityIndicators: {
      beginner: 'Interviews are conducted and notes are taken manually with no AI-assisted analysis',
      intermediate: 'AI transcribes interviews and helps identify recurring themes across sessions',
      advanced: 'AI-powered research repositories automatically surface relevant past insights when new research questions arise',
    },
  },
  pm_market: {
    detailedDescription: 'Market analysis and competitive research involves systematically tracking competitor products, pricing, positioning, and feature releases while analyzing broader market trends and sizing opportunities. It requires ongoing monitoring and periodic deep-dive assessments to inform strategic decisions.',
    aiOpportunity: 'AI agents can continuously monitor competitor websites, press releases, G2 reviews, job postings, and patent filings to build real-time competitive intelligence dashboards. They can draft comparison matrices and highlight strategic shifts, dramatically reducing the manual effort of staying current.',
    exampleTools: [
      { name: 'Klue', url: 'https://klue.com/' },
      { name: 'Crayon', url: 'https://www.crayon.co/' },
      { name: 'Semrush', url: 'https://www.semrush.com/' },
    ],
    implementationTips: [
      'Set up AI-powered alerts for competitor product launches, pricing changes, and key hire announcements',
      'Use AI to generate weekly competitive digest summaries from multiple data sources for the product team',
      'Have AI maintain and update a living competitive feature matrix that the sales team can reference in real time',
    ],
    maturityIndicators: {
      beginner: 'Competitive research is done ad hoc by manually visiting competitor websites and reading reviews',
      intermediate: 'AI tools monitor competitors and auto-generate weekly competitive intelligence summaries',
      advanced: 'AI agents continuously update competitive battlecards and proactively flag strategic market shifts',
    },
  },
  pm_roadmap: {
    detailedDescription: 'Roadmap planning and prioritization involves deciding which features and initiatives to build, in what order, based on strategic alignment, customer impact, effort estimates, and dependencies. It requires balancing competing stakeholder demands while maintaining a coherent product direction.',
    aiOpportunity: 'AI can help score and rank feature requests using frameworks like RICE or weighted scoring, simulate the impact of different prioritization choices, and identify dependency conflicts. Human judgment remains critical for making trade-off decisions that reflect company strategy, politics, and vision.',
    exampleTools: [
      { name: 'Productboard', url: 'https://www.productboard.com/' },
      { name: 'Aha!', url: 'https://www.aha.io/' },
      { name: 'Airfocus', url: 'https://airfocus.com/' },
    ],
    implementationTips: [
      'Feed customer feedback and support ticket data into AI to generate data-driven priority scores for roadmap candidates',
      'Use AI to model different roadmap scenarios and project their impact on key business metrics',
      'Have AI flag scheduling conflicts and resource bottlenecks before finalizing quarterly plans',
    ],
    maturityIndicators: {
      beginner: 'Roadmap priorities are decided in meetings based on the loudest stakeholder voice',
      intermediate: 'AI-assisted scoring models inform prioritization discussions with quantified impact estimates',
      advanced: 'AI continuously re-ranks the backlog as new data arrives and simulates roadmap trade-off scenarios on demand',
    },
  },
  pm_stories: {
    detailedDescription: 'User story and requirements writing translates product ideas into actionable specifications that engineering teams can implement. This includes defining acceptance criteria, edge cases, and user flows while ensuring requirements are clear, testable, and aligned with the product vision.',
    aiOpportunity: 'AI agents can draft user stories from brief product descriptions, generate comprehensive acceptance criteria, identify edge cases, and ensure consistency across related stories. This dramatically accelerates the writing process while humans review for correctness and strategic alignment.',
    exampleTools: [
      { name: 'Jira', url: 'https://www.atlassian.com/software/jira' },
      { name: 'Linear', url: 'https://linear.app/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Create AI prompt templates that generate stories in your team\'s preferred format with acceptance criteria included',
      'Use AI to review draft stories for ambiguity, missing edge cases, and inconsistencies with existing stories',
      'Have AI generate test scenarios from acceptance criteria to verify that stories are sufficiently detailed for QA',
    ],
    maturityIndicators: {
      beginner: 'PMs write all user stories manually from scratch in a text editor or ticket system',
      intermediate: 'AI drafts user stories and acceptance criteria from brief descriptions; PMs review and refine',
      advanced: 'AI agents auto-generate stories from PRDs, flag gaps, and maintain cross-story consistency checks',
    },
  },
  pm_sprint: {
    detailedDescription: 'Sprint planning and backlog grooming involves selecting work items for upcoming sprints, estimating effort, breaking down large stories, and ensuring the backlog is well-organized and ready for development. It requires balancing velocity data, team capacity, and strategic priorities.',
    aiOpportunity: 'AI agents can analyze historical velocity, suggest sprint commitments based on team capacity, auto-split oversized stories, and flag blockers or dependency risks. This frees PMs and engineering leads to focus on strategic discussions during planning sessions.',
    exampleTools: [
      { name: 'Jira', url: 'https://www.atlassian.com/software/jira' },
      { name: 'Linear', url: 'https://linear.app/' },
      { name: 'Shortcut', url: 'https://shortcut.com/' },
    ],
    implementationTips: [
      'Use AI to analyze past sprint data and recommend realistic sprint commitments based on team velocity trends',
      'Have AI pre-groom the backlog by suggesting story breakdowns and flagging items that need clarification',
      'Let AI generate sprint planning summaries that highlight risks, dependencies, and capacity considerations',
    ],
    maturityIndicators: {
      beginner: 'Sprint planning relies on gut-feel estimation and manual backlog sorting',
      intermediate: 'AI suggests sprint scope based on velocity data and flags dependency conflicts automatically',
      advanced: 'AI agents proactively groom the backlog, auto-split stories, and predict sprint risks before planning meetings',
    },
  },
  pm_prd: {
    detailedDescription: 'Feature specification through PRDs (Product Requirements Documents) involves creating comprehensive documents that describe what to build, why, for whom, and how success will be measured. PRDs bridge the gap between product strategy and engineering execution.',
    aiOpportunity: 'AI agents can generate structured PRD drafts from brief feature descriptions, populate sections with relevant user research data, suggest metrics, and ensure consistency with existing product documentation. PMs can focus on strategic framing and stakeholder alignment rather than document assembly.',
    exampleTools: [
      { name: 'Notion', url: 'https://www.notion.so/' },
      { name: 'Coda', url: 'https://coda.io/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Build a PRD template with AI prompts embedded in each section to generate first-draft content from a feature brief',
      'Use AI to cross-reference new PRDs against existing product documentation for conflicts or redundancies',
      'Have AI auto-generate the technical considerations section by analyzing similar past features and their implementation challenges',
    ],
    maturityIndicators: {
      beginner: 'PRDs are written from scratch in documents with no AI assistance',
      intermediate: 'AI generates structured PRD drafts that PMs edit and enrich with strategic context',
      advanced: 'AI agents produce near-complete PRDs from feature briefs, including auto-populated research, metrics, and edge cases',
    },
  },
  pm_gtm: {
    detailedDescription: 'Go-to-market coordination involves orchestrating cross-functional teams across marketing, sales, customer success, and support to successfully launch new features or products. It requires managing timelines, messaging, training materials, and launch checklists across multiple departments.',
    aiOpportunity: 'AI can help draft launch plans, generate messaging variants, and create training materials. However, the human element is essential for navigating organizational dynamics, making judgment calls on launch timing, and ensuring the emotional resonance of positioning with real customers.',
    exampleTools: [
      { name: 'Asana', url: 'https://asana.com/' },
      { name: 'Notion', url: 'https://www.notion.so/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Use AI to generate GTM checklists and timelines from past successful launches as starting templates',
      'Have AI draft customer-facing release notes, FAQ documents, and sales enablement one-pagers from PRDs',
      'Leverage AI to create role-specific launch briefs so each team gets exactly the information they need',
    ],
    maturityIndicators: {
      beginner: 'GTM coordination happens through ad hoc meetings and manually created launch checklists',
      intermediate: 'AI generates launch materials and checklists from PRDs; humans coordinate execution',
      advanced: 'AI orchestrates GTM workflows by auto-generating all collateral and tracking readiness across teams',
    },
  },
  pm_data: {
    detailedDescription: 'Data analysis and experimentation encompasses designing A/B tests, analyzing product usage data, interpreting experiment results, and making data-informed product decisions. It requires statistical rigor, business context, and the ability to translate numbers into actionable insights.',
    aiOpportunity: 'AI agents can write SQL queries, generate statistical analyses, create dashboards, interpret experiment results, and surface anomalies in product metrics. They can dramatically accelerate the analysis cycle, enabling PMs to ask more questions and test more hypotheses.',
    exampleTools: [
      { name: 'Amplitude', url: 'https://amplitude.com/' },
      { name: 'Mixpanel', url: 'https://mixpanel.com/' },
      { name: 'Statsig', url: 'https://statsig.com/' },
    ],
    implementationTips: [
      'Use AI to translate plain-English questions into SQL queries against your analytics data warehouse',
      'Have AI generate experiment design documents including sample size calculations and success criteria',
      'Let AI create automated weekly product health reports that highlight anomalies and suggest investigation areas',
    ],
    maturityIndicators: {
      beginner: 'Data analysis is done manually by requesting reports from an analytics team',
      intermediate: 'AI helps PMs write queries and interpret experiment results with statistical summaries',
      advanced: 'AI agents continuously monitor product metrics, auto-detect anomalies, and proactively suggest experiments',
    },
  },
  pm_stakeholders: {
    detailedDescription: 'Stakeholder communication involves keeping executives, cross-functional partners, and team members informed about product direction, progress, trade-offs, and risks. It requires tailoring messages to different audiences and building trust through transparency and consistent updates.',
    aiOpportunity: 'AI can draft status updates, generate executive summaries, and create presentation slides from raw data. However, the nuanced art of managing expectations, navigating organizational politics, and building genuine relationships with stakeholders remains fundamentally human.',
    exampleTools: [
      { name: 'Loom', url: 'https://www.loom.com/' },
      { name: 'Notion', url: 'https://www.notion.so/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Use AI to generate audience-specific status updates from a single source of truth (e.g., engineering standup notes)',
      'Have AI create executive summary slides from detailed project data, highlighting key decisions and risks',
      'Leverage AI to draft difficult communication like scope change notifications with appropriate framing and tone',
    ],
    maturityIndicators: {
      beginner: 'Stakeholder updates are written from scratch for each audience with no AI assistance',
      intermediate: 'AI drafts tailored status updates for different audiences from shared project data',
      advanced: 'AI auto-generates personalized stakeholder digests on a scheduled cadence with minimal PM intervention',
    },
  },
  pm_beta: {
    detailedDescription: 'Beta program management involves recruiting beta users, managing access and rollout, collecting structured feedback, triaging issues, and determining launch readiness. It bridges the gap between internal QA and general availability by validating the product with real users in controlled conditions.',
    aiOpportunity: 'AI agents can automate beta user communications, categorize and prioritize incoming feedback, detect sentiment trends across beta cohorts, and generate readiness reports. This allows PMs to focus on the strategic decisions of what feedback to act on and when to ship.',
    exampleTools: [
      { name: 'LaunchDarkly', url: 'https://launchdarkly.com/' },
      { name: 'Productboard', url: 'https://www.productboard.com/' },
      { name: 'Intercom', url: 'https://www.intercom.com/' },
    ],
    implementationTips: [
      'Use AI to automatically categorize beta feedback into themes, severity levels, and affected features',
      'Have AI generate weekly beta health reports summarizing sentiment trends, top issues, and adoption metrics',
      'Let AI draft personalized follow-up messages to beta participants based on their specific feedback and usage patterns',
    ],
    maturityIndicators: {
      beginner: 'Beta feedback is collected via email or spreadsheets and manually reviewed by the PM',
      intermediate: 'AI categorizes and summarizes beta feedback, flagging critical issues and sentiment trends',
      advanced: 'AI agents manage the full beta lifecycle: cohort communications, feedback triage, and automated readiness scoring',
    },
  },
  pm_pricing: {
    detailedDescription: 'Pricing and packaging analysis involves evaluating how to structure product tiers, set price points, and bundle features to maximize revenue while serving different customer segments. It requires understanding willingness to pay, competitive pricing, and the psychological dynamics of purchase decisions.',
    aiOpportunity: 'AI can analyze competitor pricing, model revenue scenarios under different packaging structures, and surface patterns in customer upgrade behavior. The final pricing decisions, however, require human judgment about brand positioning, customer relationships, and long-term strategic goals.',
    exampleTools: [
      { name: 'Price Intelligently (Paddle)', url: 'https://www.paddle.com/price-intelligently' },
      { name: 'Stripe', url: 'https://stripe.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Use AI to scrape and maintain an up-to-date competitive pricing database across your market segment',
      'Have AI model revenue outcomes under different packaging scenarios using historical conversion and upgrade data',
      'Leverage AI to analyze support tickets and churn reasons to identify pricing-related friction points',
    ],
    maturityIndicators: {
      beginner: 'Pricing decisions are based on competitor benchmarking and internal cost analysis done manually',
      intermediate: 'AI models revenue scenarios and analyzes competitor pricing to inform packaging discussions',
      advanced: 'AI continuously monitors pricing elasticity signals and recommends dynamic pricing adjustments based on market conditions',
    },
  },
  pm_analytics: {
    detailedDescription: 'Product analytics and telemetry review involves monitoring user behavior data, feature adoption rates, funnel conversion, and product health metrics to understand how customers actually use the product. It informs decisions about what to improve, deprecate, or invest in further.',
    aiOpportunity: 'AI agents can continuously scan analytics dashboards for anomalies, generate natural-language summaries of metric movements, and correlate changes across different data sources. They can turn raw telemetry into actionable narratives at a pace no human analyst can match.',
    exampleTools: [
      { name: 'Amplitude', url: 'https://amplitude.com/' },
      { name: 'Heap', url: 'https://www.heap.io/' },
      { name: 'FullStory', url: 'https://www.fullstory.com/' },
    ],
    implementationTips: [
      'Set up AI-powered anomaly detection on your core product metrics to get alerted before issues escalate',
      'Use AI to generate weekly product health narratives that explain metric movements in plain language',
      'Have AI correlate feature release dates with metric changes to automatically assess feature impact',
    ],
    maturityIndicators: {
      beginner: 'Product metrics are reviewed manually in dashboards on an ad hoc basis',
      intermediate: 'AI monitors key metrics and surfaces anomalies with automated plain-language explanations',
      advanced: 'AI agents proactively correlate telemetry with releases and external events, generating actionable recommendations',
    },
  },
  pm_techdebt: {
    detailedDescription: 'Technical debt prioritization involves working with engineering to identify, quantify, and sequence the resolution of accumulated shortcuts and architectural compromises. It requires balancing the urgency of debt reduction against feature delivery while making the business case for investing in platform health.',
    aiOpportunity: 'AI can help quantify technical debt by analyzing code quality metrics, incident frequency, and developer velocity trends. However, the human judgment of a PM is essential for negotiating engineering time, framing debt reduction in business terms, and making trade-off decisions that align with product strategy.',
    exampleTools: [
      { name: 'SonarQube', url: 'https://www.sonarsource.com/products/sonarqube/' },
      { name: 'LinearB', url: 'https://linearb.io/' },
      { name: 'Jira', url: 'https://www.atlassian.com/software/jira' },
    ],
    implementationTips: [
      'Use AI to correlate code quality metrics with incident frequency and customer-reported bugs to build a business case for debt reduction',
      'Have AI generate executive-friendly summaries of technical debt impact using engineering metrics translated into business outcomes',
      'Leverage AI to track debt reduction progress over time and project the impact of continued investment vs. deferral',
    ],
    maturityIndicators: {
      beginner: 'Technical debt is discussed anecdotally in sprint planning with no systematic tracking',
      intermediate: 'AI quantifies technical debt impact and helps prioritize items based on business and engineering metrics',
      advanced: 'AI continuously tracks debt health, projects future impact, and recommends optimal investment allocation between features and debt',
    },
  },

  // ============ ENGINEERING ============
  eng_architecture: {
    detailedDescription: 'System architecture and design involves making high-level technical decisions about how components interact, which technologies to use, and how to structure systems for scalability, reliability, and maintainability. It requires deep technical expertise combined with an understanding of business requirements and future growth.',
    aiOpportunity: 'AI can generate architecture diagrams from descriptions, suggest design patterns for common problems, and review proposals against best practices. However, the critical decisions about trade-offs, long-term technology bets, and system philosophy require human experience and contextual judgment.',
    exampleTools: [
      { name: 'Claude', url: 'https://claude.ai/' },
      { name: 'Mermaid', url: 'https://mermaid.js.org/' },
      { name: 'Eraser', url: 'https://www.eraser.io/' },
    ],
    implementationTips: [
      'Use AI to generate initial architecture diagrams and documentation from verbal or written descriptions of system requirements',
      'Have AI review architecture proposals by checking for common anti-patterns and suggesting alternatives from established patterns',
      'Leverage AI to create ADRs (Architecture Decision Records) by articulating trade-offs for each considered approach',
    ],
    maturityIndicators: {
      beginner: 'Architecture decisions are made in whiteboard sessions and documented manually if at all',
      intermediate: 'AI assists in generating architecture diagrams, reviewing proposals, and drafting ADRs',
      advanced: 'AI evaluates architecture proposals against the full codebase and operational data to surface risks and recommend patterns',
    },
  },
  eng_coding: {
    detailedDescription: 'Code writing and development is the core activity of translating requirements into working software. It encompasses writing new features, refactoring existing code, implementing algorithms, and integrating with APIs and services across the technology stack.',
    aiOpportunity: 'AI coding agents can generate boilerplate code, implement functions from descriptions, suggest completions in context, and even build entire features from specifications. Developers shift toward reviewing, guiding, and architecting rather than typing every line.',
    exampleTools: [
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
      { name: 'Cursor', url: 'https://cursor.sh/' },
      { name: 'Claude Code', url: 'https://docs.anthropic.com/en/docs/claude-code' },
    ],
    implementationTips: [
      'Start with AI-assisted autocomplete and gradually move to having AI implement entire functions from descriptions',
      'Create project-specific AI context files that describe your codebase conventions, patterns, and architecture for better suggestions',
      'Establish team guidelines for when to accept AI-generated code vs. when to write manually, especially for security-critical paths',
    ],
    maturityIndicators: {
      beginner: 'All code is written manually with no AI assistance beyond basic IDE features',
      intermediate: 'Developers use AI code completion and generation for boilerplate and standard patterns, reviewing all output',
      advanced: 'AI agents implement features from specs with developers focusing on architecture, review, and complex problem-solving',
    },
  },
  eng_review: {
    detailedDescription: 'Code review involves examining pull requests for correctness, security, performance, readability, and adherence to team standards. It serves as both a quality gate and a knowledge-sharing mechanism, ensuring that multiple team members understand changes to the codebase.',
    aiOpportunity: 'AI agents can perform first-pass code reviews that catch common issues like security vulnerabilities, performance problems, style violations, and missing tests before human reviewers spend their time. This lets human reviewers focus on design, architecture, and business logic concerns.',
    exampleTools: [
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
      { name: 'CodeRabbit', url: 'https://coderabbit.ai/' },
      { name: 'SonarQube', url: 'https://www.sonarsource.com/products/sonarqube/' },
    ],
    implementationTips: [
      'Configure AI code review to run automatically on every pull request and post comments before human review begins',
      'Customize AI review rules to match your team\'s specific coding standards, naming conventions, and architectural patterns',
      'Use AI to generate review summaries for large PRs that help human reviewers quickly understand the scope and risk of changes',
    ],
    maturityIndicators: {
      beginner: 'Code reviews are done entirely by human reviewers with no automated assistance',
      intermediate: 'AI performs first-pass reviews catching bugs and style issues; humans focus on design and logic',
      advanced: 'AI agents provide comprehensive review feedback including security, performance, and architectural analysis on every PR',
    },
  },
  eng_testing: {
    detailedDescription: 'Unit test writing involves creating automated tests that verify individual functions and components work correctly in isolation. Good test coverage catches regressions early, documents expected behavior, and enables confident refactoring.',
    aiOpportunity: 'AI agents can generate unit tests from source code, identify untested edge cases, and create test fixtures and mock data. They can rapidly increase test coverage for both new and legacy code, turning a tedious task into a semi-automated process.',
    exampleTools: [
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
      { name: 'Codium AI', url: 'https://www.codium.ai/' },
      { name: 'Claude Code', url: 'https://docs.anthropic.com/en/docs/claude-code' },
    ],
    implementationTips: [
      'Use AI to generate test scaffolding and happy-path tests first, then prompt it specifically for edge cases and error conditions',
      'Have AI analyze existing code for untested paths and generate targeted tests to increase coverage in critical areas',
      'Create a workflow where AI proposes tests, developers review for correctness and completeness, then the test suite runs to validate',
    ],
    maturityIndicators: {
      beginner: 'Unit tests are written manually by developers, often skipped due to time pressure',
      intermediate: 'AI generates unit tests for new code; developers review and supplement with domain-specific cases',
      advanced: 'AI agents automatically generate and maintain tests for all code changes, targeting edge cases and achieving high coverage',
    },
  },
  eng_cicd: {
    detailedDescription: 'CI/CD pipeline management involves configuring, maintaining, and optimizing the automated workflows that build, test, and deploy code changes. Reliable pipelines are critical for development velocity, code quality, and deployment confidence.',
    aiOpportunity: 'AI agents can diagnose build failures, suggest pipeline optimizations, generate pipeline configurations from requirements, and predict which tests to run based on code changes. They reduce the toil of maintaining complex build systems and speed up developer feedback loops.',
    exampleTools: [
      { name: 'GitHub Actions', url: 'https://github.com/features/actions' },
      { name: 'CircleCI', url: 'https://circleci.com/' },
      { name: 'Harness', url: 'https://www.harness.io/' },
    ],
    implementationTips: [
      'Use AI to analyze build failure logs and automatically suggest fixes or link to relevant documentation',
      'Have AI optimize pipeline configurations by identifying redundant steps, parallelization opportunities, and caching improvements',
      'Let AI generate pipeline-as-code configurations from high-level descriptions of your build and deploy requirements',
    ],
    maturityIndicators: {
      beginner: 'CI/CD pipelines are manually configured and failures are debugged by reading logs line by line',
      intermediate: 'AI helps diagnose build failures and suggests pipeline optimizations based on execution patterns',
      advanced: 'AI agents self-heal pipeline failures, dynamically optimize test selection, and auto-generate deployment configs',
    },
  },
  eng_bugs: {
    detailedDescription: 'Bug triage and fixing involves reproducing reported issues, diagnosing root causes, implementing fixes, and verifying resolutions. It requires reading code, analyzing logs, understanding system interactions, and ensuring fixes do not introduce new regressions.',
    aiOpportunity: 'AI agents can analyze error logs and stack traces to suggest root causes, search the codebase for related issues, generate fix proposals, and draft regression tests. They accelerate the diagnosis-to-fix cycle, especially for unfamiliar codebases.',
    exampleTools: [
      { name: 'Sentry', url: 'https://sentry.io/' },
      { name: 'Linear', url: 'https://linear.app/' },
      { name: 'Claude Code', url: 'https://docs.anthropic.com/en/docs/claude-code' },
    ],
    implementationTips: [
      'Feed error logs and stack traces to AI to get an initial diagnosis and suggested code locations to investigate',
      'Use AI to search for similar past bugs in your issue tracker and link relevant fixes to accelerate resolution',
      'Have AI generate regression tests for every bug fix to prevent the same issue from recurring',
    ],
    maturityIndicators: {
      beginner: 'Bug triage and root cause analysis are done entirely manually by reading code and logs',
      intermediate: 'AI assists with root cause analysis from logs and suggests potential fixes with relevant code locations',
      advanced: 'AI agents auto-diagnose incoming bugs, propose fixes with regression tests, and route issues to the right team',
    },
  },
  eng_infra: {
    detailedDescription: 'Infrastructure management covers provisioning, configuring, scaling, and maintaining the servers, networks, databases, and cloud services that run your applications. It includes infrastructure-as-code, cost optimization, capacity planning, and ensuring high availability.',
    aiOpportunity: 'AI agents can generate Terraform and CloudFormation templates, detect infrastructure drift, recommend cost optimizations, and predict capacity needs. They can translate high-level requirements into production-ready infrastructure configurations.',
    exampleTools: [
      { name: 'Terraform', url: 'https://www.terraform.io/' },
      { name: 'Pulumi', url: 'https://www.pulumi.com/' },
      { name: 'Firefly', url: 'https://www.firefly.ai/' },
    ],
    implementationTips: [
      'Use AI to generate infrastructure-as-code templates from architecture diagrams or natural language descriptions',
      'Have AI analyze cloud bills and recommend right-sizing, reserved instance purchases, and unused resource cleanup',
      'Let AI review infrastructure changes for security misconfigurations and compliance violations before they are applied',
    ],
    maturityIndicators: {
      beginner: 'Infrastructure is managed through cloud consoles with manual configuration and ad hoc scripting',
      intermediate: 'AI generates IaC templates and reviews infrastructure changes for security and cost issues',
      advanced: 'AI agents manage infrastructure lifecycle: auto-scaling, cost optimization, drift detection, and self-healing',
    },
  },
  eng_incident: {
    detailedDescription: 'Incident response and on-call involves detecting production issues, mobilizing the right responders, diagnosing problems under time pressure, implementing mitigations, and conducting post-incident reviews. It requires calm judgment, deep system knowledge, and effective communication during high-stress situations.',
    aiOpportunity: 'AI can accelerate incident response by correlating alerts, suggesting likely root causes from historical incident data, and drafting status page updates. However, the human element is critical for making high-stakes decisions, coordinating team members, and exercising judgment about customer impact.',
    exampleTools: [
      { name: 'PagerDuty', url: 'https://www.pagerduty.com/' },
      { name: 'Datadog', url: 'https://www.datadoghq.com/' },
      { name: 'Rootly', url: 'https://rootly.com/' },
    ],
    implementationTips: [
      'Use AI to auto-correlate related alerts during incidents and present a unified timeline to responders',
      'Have AI search past incident reports for similar symptoms and surface previous runbooks and mitigations',
      'Let AI draft incident communications and status page updates while responders focus on diagnosis and mitigation',
    ],
    maturityIndicators: {
      beginner: 'Incident response relies entirely on human judgment with manual alert monitoring and communication',
      intermediate: 'AI correlates alerts, suggests root causes from historical data, and drafts stakeholder communications',
      advanced: 'AI provides real-time diagnosis assistance, auto-executes safe runbook steps, and generates comprehensive post-mortems',
    },
  },
  eng_security: {
    detailedDescription: 'Security vulnerability management involves scanning code and dependencies for known vulnerabilities, assessing their severity and exploitability, prioritizing remediation, and verifying fixes. It requires staying current with CVE databases, understanding attack vectors, and balancing security with development velocity.',
    aiOpportunity: 'AI agents can continuously scan code for vulnerabilities, assess exploitability in your specific context, generate patches for known CVEs, and prioritize remediation based on actual risk rather than raw severity scores. They make it feasible to maintain a strong security posture at scale.',
    exampleTools: [
      { name: 'Snyk', url: 'https://snyk.io/' },
      { name: 'GitHub Advanced Security', url: 'https://github.com/features/security' },
      { name: 'SonarQube', url: 'https://www.sonarsource.com/products/sonarqube/' },
    ],
    implementationTips: [
      'Integrate AI security scanning into your CI/CD pipeline to catch vulnerabilities before they reach production',
      'Use AI to assess CVE exploitability in your specific deployment context rather than relying solely on CVSS scores',
      'Have AI generate fix suggestions and pull requests for dependency vulnerabilities to reduce remediation time',
    ],
    maturityIndicators: {
      beginner: 'Security scanning is done periodically with manual review of results and ad hoc patching',
      intermediate: 'AI scans continuously in CI/CD, prioritizes by exploitability, and suggests remediation steps',
      advanced: 'AI agents auto-patch low-risk vulnerabilities, generate exploit assessments, and maintain a real-time security posture dashboard',
    },
  },
  eng_docs: {
    detailedDescription: 'Technical documentation covers API references, architecture overviews, onboarding guides, runbooks, and inline code comments. Good documentation accelerates onboarding, reduces knowledge silos, and ensures systems can be maintained by anyone on the team.',
    aiOpportunity: 'AI agents can generate documentation from code, keep docs in sync with code changes, create API references from source, and transform dense technical content into accessible guides. They make it practical to maintain documentation that historically falls out of date.',
    exampleTools: [
      { name: 'Mintlify', url: 'https://mintlify.com/' },
      { name: 'Swimm', url: 'https://swimm.io/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Use AI to auto-generate API documentation from code annotations and type definitions on every build',
      'Have AI detect when code changes make existing documentation stale and flag the specific sections that need updating',
      'Let AI generate onboarding guides by analyzing the codebase structure and creating a guided walkthrough of key systems',
    ],
    maturityIndicators: {
      beginner: 'Documentation is written manually and frequently falls out of date as code evolves',
      intermediate: 'AI generates documentation drafts from code and flags stale docs when related code changes',
      advanced: 'AI agents continuously maintain documentation in sync with the codebase, auto-updating on every merge',
    },
  },
  eng_perf: {
    detailedDescription: 'Performance optimization involves profiling applications to identify bottlenecks, optimizing critical code paths, tuning database queries, reducing latency, and ensuring the system meets performance SLAs under load. It requires deep understanding of system behavior at runtime.',
    aiOpportunity: 'AI agents can analyze profiling data and flame graphs, suggest optimizations for slow queries and functions, identify memory leaks, and recommend caching strategies. They can process vast amounts of performance data to find patterns that humans might miss.',
    exampleTools: [
      { name: 'Datadog', url: 'https://www.datadoghq.com/' },
      { name: 'New Relic', url: 'https://newrelic.com/' },
      { name: 'Speedscope', url: 'https://www.speedscope.app/' },
    ],
    implementationTips: [
      'Feed profiling data and flame graphs to AI to get prioritized lists of optimization opportunities',
      'Use AI to analyze slow database queries and suggest index additions, query rewrites, or caching strategies',
      'Have AI review code changes for performance regressions by comparing before/after benchmark results',
    ],
    maturityIndicators: {
      beginner: 'Performance issues are investigated reactively when users complain, using manual profiling',
      intermediate: 'AI analyzes profiling data and suggests specific optimizations for identified bottlenecks',
      advanced: 'AI agents continuously monitor performance, predict degradation trends, and auto-suggest optimizations before SLAs are breached',
    },
  },
  eng_db: {
    detailedDescription: 'Database administration and optimization encompasses schema design, query optimization, index management, backup strategies, replication configuration, and capacity planning. It ensures data integrity, availability, and performance as data volumes grow.',
    aiOpportunity: 'AI agents can analyze query execution plans, recommend index strategies, detect schema inefficiencies, generate migration scripts, and predict storage growth. They turn database optimization from a specialist skill into something accessible to the broader engineering team.',
    exampleTools: [
      { name: 'PgAnalyze', url: 'https://pganalyze.com/' },
      { name: 'Aiven', url: 'https://aiven.io/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Use AI to analyze slow query logs and generate optimized query rewrites with appropriate indexes',
      'Have AI review schema migration scripts for potential data loss, locking issues, and backward compatibility',
      'Let AI monitor database metrics and proactively recommend capacity changes before performance degrades',
    ],
    maturityIndicators: {
      beginner: 'Database optimization is done reactively when queries slow down, using manual EXPLAIN analysis',
      intermediate: 'AI continuously analyzes query performance and recommends index and query optimizations',
      advanced: 'AI agents auto-tune database configurations, predict capacity needs, and generate safe migration scripts',
    },
  },
  eng_release: {
    detailedDescription: 'Release management involves coordinating the process of shipping software to production, including versioning, changelog generation, rollout strategies, feature flags, rollback plans, and post-release monitoring. It ensures that deployments are safe, predictable, and well-communicated.',
    aiOpportunity: 'AI agents can auto-generate changelogs from commit history, assess release risk based on code changes, suggest rollout strategies, and monitor post-release metrics for anomalies. They streamline the release process and reduce the coordination overhead.',
    exampleTools: [
      { name: 'LaunchDarkly', url: 'https://launchdarkly.com/' },
      { name: 'GitHub Releases', url: 'https://docs.github.com/en/repositories/releasing-projects-on-github' },
      { name: 'Semantic Release', url: 'https://semantic-release.gitbook.io/' },
    ],
    implementationTips: [
      'Use AI to auto-generate user-facing changelogs and release notes from commit messages and PR descriptions',
      'Have AI assess release risk by analyzing the scope of changes, affected systems, and historical incident rates for similar releases',
      'Let AI monitor post-release metrics and automatically trigger rollback alerts if anomalies exceed defined thresholds',
    ],
    maturityIndicators: {
      beginner: 'Releases are manually coordinated with hand-written changelogs and ad hoc rollout decisions',
      intermediate: 'AI generates changelogs, assesses release risk, and suggests rollout strategies for each deployment',
      advanced: 'AI agents orchestrate the full release lifecycle: changelog, risk assessment, progressive rollout, and automated rollback',
    },
  },
  eng_techdebt: {
    detailedDescription: 'Technical debt reduction involves identifying, prioritizing, and systematically addressing accumulated shortcuts, outdated patterns, and architectural compromises in the codebase. It requires balancing improvement work against feature delivery and making pragmatic decisions about what to fix and when.',
    aiOpportunity: 'AI can identify code smells, suggest refactoring opportunities, and estimate the effort involved in debt reduction tasks. However, deciding which debt to tackle requires human judgment about team morale, strategic direction, and the business impact of investing time in improvements versus features.',
    exampleTools: [
      { name: 'SonarQube', url: 'https://www.sonarsource.com/products/sonarqube/' },
      { name: 'CodeScene', url: 'https://codescene.com/' },
      { name: 'Claude Code', url: 'https://docs.anthropic.com/en/docs/claude-code' },
    ],
    implementationTips: [
      'Use AI to generate a prioritized technical debt inventory based on code complexity, change frequency, and bug correlation',
      'Have AI propose incremental refactoring plans that can be executed alongside feature work in regular sprints',
      'Leverage AI to track debt reduction progress and visualize the impact on developer velocity and incident rates',
    ],
    maturityIndicators: {
      beginner: 'Technical debt is acknowledged informally but not tracked or systematically addressed',
      intermediate: 'AI identifies debt hotspots and proposes refactoring plans; humans decide what and when to address',
      advanced: 'AI continuously monitors code health, quantifies debt impact on velocity, and recommends optimal refactoring strategies',
    },
  },
  eng_deps: {
    detailedDescription: 'Dependency and library updates involve keeping third-party packages, frameworks, and tools current to receive security patches, bug fixes, and new features. It requires assessing compatibility, running regression tests, and resolving breaking changes across potentially hundreds of dependencies.',
    aiOpportunity: 'This is a prime candidate for full automation. AI agents can monitor for new releases, assess breaking changes from changelogs, generate update pull requests, and run test suites to verify compatibility. Human intervention is only needed for major version upgrades with significant breaking changes.',
    exampleTools: [
      { name: 'Dependabot', url: 'https://github.com/dependabot' },
      { name: 'Renovate', url: 'https://www.mend.io/renovate/' },
      { name: 'Snyk', url: 'https://snyk.io/' },
    ],
    implementationTips: [
      'Configure automated dependency update tools to create PRs for minor and patch versions with auto-merge when tests pass',
      'Use AI to analyze changelogs and migration guides for major version updates and generate a migration checklist',
      'Set up a weekly automated dependency health report that flags outdated packages, known vulnerabilities, and end-of-life libraries',
    ],
    maturityIndicators: {
      beginner: 'Dependencies are updated manually when someone notices an issue or a vulnerability is reported',
      intermediate: 'Automated tools create update PRs; developers review and merge after CI passes',
      advanced: 'Fully automated dependency pipeline: auto-updates, auto-tests, auto-merges for safe changes, with human review only for majors',
    },
  },
  eng_monitoring: {
    detailedDescription: 'Log monitoring and alerting involves collecting, aggregating, and analyzing application and infrastructure logs to detect issues, trigger alerts, and maintain system observability. It requires configuring meaningful alerts that catch real problems without generating excessive noise.',
    aiOpportunity: 'This is highly automatable. AI agents can process massive log volumes, detect anomalous patterns, auto-tune alert thresholds to reduce noise, and correlate events across services. They transform monitoring from a reactive activity into a proactive, intelligent observability layer.',
    exampleTools: [
      { name: 'Datadog', url: 'https://www.datadoghq.com/' },
      { name: 'Grafana', url: 'https://grafana.com/' },
      { name: 'Elastic', url: 'https://www.elastic.co/' },
    ],
    implementationTips: [
      'Use AI-powered anomaly detection instead of static thresholds for alert rules to reduce false positives',
      'Have AI auto-correlate alerts across services to present a unified incident view rather than a flood of individual alerts',
      'Let AI learn normal system behavior patterns and automatically adjust alert thresholds as traffic patterns change',
    ],
    maturityIndicators: {
      beginner: 'Monitoring relies on static threshold alerts that frequently produce false positives or miss real issues',
      intermediate: 'AI-powered anomaly detection reduces alert noise and highlights genuine issues with context',
      advanced: 'Fully AI-driven observability: dynamic thresholds, auto-correlation, predictive alerting, and self-tuning dashboards',
    },
  },
  eng_envs: {
    detailedDescription: 'Environment provisioning involves creating and maintaining development, staging, QA, and production environments with consistent configurations. It includes setting up databases, services, secrets, networking, and ensuring environments accurately mirror production.',
    aiOpportunity: 'This is highly automatable. AI agents can generate environment configurations from templates, spin up on-demand preview environments for every PR, manage secrets rotation, and detect configuration drift between environments. Minimal human intervention is needed once the system is set up.',
    exampleTools: [
      { name: 'Terraform', url: 'https://www.terraform.io/' },
      { name: 'Docker', url: 'https://www.docker.com/' },
      { name: 'Vercel', url: 'https://vercel.com/' },
    ],
    implementationTips: [
      'Use AI to generate environment-as-code configurations that ensure parity between staging and production',
      'Set up automated preview environments for every pull request so reviewers can test changes in isolation',
      'Have AI monitor for configuration drift between environments and automatically remediate discrepancies',
    ],
    maturityIndicators: {
      beginner: 'Environments are manually provisioned with documentation that is often outdated',
      intermediate: 'Infrastructure-as-code with AI-generated configs; preview environments created semi-automatically',
      advanced: 'Fully automated environment lifecycle: on-demand creation, drift detection, auto-remediation, and teardown',
    },
  },
  eng_mentoring: {
    detailedDescription: 'Mentoring and team development involves helping junior engineers grow their technical and professional skills through code reviews, pair programming, career guidance, and creating learning opportunities. It builds organizational resilience and is essential for team scaling.',
    aiOpportunity: 'AI can supplement mentoring by providing on-demand code explanations, suggesting learning resources, and offering practice problems. However, the human connection of mentorship, including career advice, navigating organizational dynamics, building confidence, and sharing hard-won wisdom, remains irreplaceable.',
    exampleTools: [
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
      { name: 'Pluralsight', url: 'https://www.pluralsight.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Encourage mentees to use AI as a first resource for code explanations, freeing mentor time for higher-level guidance',
      'Have AI generate personalized learning paths based on each developer\'s skill gaps and career goals',
      'Use AI-assisted code review as a teaching tool by having mentees compare their approach to AI suggestions',
    ],
    maturityIndicators: {
      beginner: 'Mentoring is informal and depends on senior engineers having available time',
      intermediate: 'AI supplements mentoring with on-demand code explanations and personalized learning recommendations',
      advanced: 'Structured mentoring program augmented by AI-driven skill assessments, personalized learning paths, and progress tracking',
    },
  },

  // ============ PRODUCT DESIGN ============
  des_strategy: {
    detailedDescription: 'Design strategy and vision involves defining the overarching design direction for a product, including design principles, experience goals, and the long-term UX vision. It aligns the design team around a shared understanding of what great looks like and how design contributes to business outcomes.',
    aiOpportunity: 'AI can analyze design trends, benchmark competitor experiences, and synthesize user research into strategic themes. However, crafting a design vision that inspires a team and reflects genuine human values requires creative leadership, aesthetic judgment, and deep empathy that remain uniquely human.',
    exampleTools: [
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'Miro', url: 'https://miro.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Use AI to audit competitor and industry-leading products for UX patterns and design trends that inform your strategy',
      'Have AI synthesize user research findings into design principle candidates that the team can refine collaboratively',
      'Leverage AI to translate high-level design vision into concrete, measurable UX goals for each product area',
    ],
    maturityIndicators: {
      beginner: 'Design strategy emerges organically from individual designer decisions with no unified vision',
      intermediate: 'AI helps benchmark competitors and synthesize research to inform design strategy workshops',
      advanced: 'AI continuously tracks UX industry trends and competitor moves, feeding insights into an evolving design strategy',
    },
  },
  des_research: {
    detailedDescription: 'User research and interviews involve planning and conducting studies to understand user needs, behaviors, and pain points. This includes recruiting participants, facilitating sessions, analyzing qualitative and quantitative data, and translating findings into actionable design insights.',
    aiOpportunity: 'AI can transcribe sessions, analyze interview transcripts for themes, generate affinity diagrams, and synthesize findings across studies. The human researcher remains essential for building rapport, reading body language, asking the right follow-up questions, and interpreting findings with cultural context.',
    exampleTools: [
      { name: 'Dovetail', url: 'https://dovetail.com/' },
      { name: 'UserTesting', url: 'https://www.usertesting.com/' },
      { name: 'Otter.ai', url: 'https://otter.ai/' },
    ],
    implementationTips: [
      'Use AI to auto-transcribe and tag research sessions so insights are immediately searchable and shareable',
      'Have AI generate theme clusters from multiple research sessions to identify patterns across participants',
      'Let AI suggest research questions and study designs based on your stated learning objectives and past study gaps',
    ],
    maturityIndicators: {
      beginner: 'Research notes are taken manually and findings are shared through ad hoc presentations',
      intermediate: 'AI transcribes and analyzes sessions, surfacing themes and generating shareable insight summaries',
      advanced: 'AI-powered research repository connects past and present insights, proactively surfacing relevant findings for new projects',
    },
  },
  des_ia: {
    detailedDescription: 'Information architecture involves organizing and structuring content, features, and navigation so that users can find what they need intuitively. It includes card sorting, tree testing, sitemap design, and defining taxonomies and labeling systems.',
    aiOpportunity: 'AI can analyze user behavior data to suggest navigation improvements, simulate card sort results, and benchmark IA patterns against industry standards. However, the strategic decisions about how to organize a complex information space require human judgment about user mental models and business priorities.',
    exampleTools: [
      { name: 'Optimal Workshop', url: 'https://www.optimalworkshop.com/' },
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Use AI to analyze search query logs and support tickets to identify where users struggle to find things in your current IA',
      'Have AI generate multiple IA structure proposals based on card sort data and user task analysis',
      'Leverage AI to audit your navigation labels for clarity by testing them against plain-language task descriptions',
    ],
    maturityIndicators: {
      beginner: 'Information architecture is defined by designers based on intuition and internal team mental models',
      intermediate: 'AI analyzes user behavior and search data to suggest IA improvements and navigation restructuring',
      advanced: 'AI continuously evaluates IA effectiveness from user flow data and recommends structural optimizations',
    },
  },
  des_wireframe: {
    detailedDescription: 'Wireframing and prototyping involves creating low and high-fidelity representations of user interfaces to explore ideas, test interactions, and communicate design intent before development begins. It enables rapid iteration and stakeholder alignment.',
    aiOpportunity: 'AI agents can generate wireframe layouts from text descriptions, create interactive prototypes from sketches, and produce multiple design variations instantly. They dramatically accelerate the exploration phase, allowing designers to evaluate more options in less time.',
    exampleTools: [
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'v0 by Vercel', url: 'https://v0.dev/' },
      { name: 'Galileo AI', url: 'https://www.usegalileo.ai/' },
    ],
    implementationTips: [
      'Use AI to generate initial wireframe layouts from user story descriptions as a starting point for design exploration',
      'Have AI create multiple layout variations for key screens so designers can quickly compare and combine approaches',
      'Let AI convert approved wireframes into interactive prototypes to speed up user testing preparation',
    ],
    maturityIndicators: {
      beginner: 'All wireframes and prototypes are created manually from scratch by designers',
      intermediate: 'AI generates initial layouts and variations; designers refine and add interaction design',
      advanced: 'AI rapidly produces interactive prototypes from descriptions, enabling designers to focus on testing and refinement',
    },
  },
  des_visual: {
    detailedDescription: 'Visual design and UI polish involves applying color, typography, spacing, imagery, and micro-interactions to create interfaces that are aesthetically pleasing, brand-consistent, and emotionally resonant. It transforms functional layouts into delightful user experiences.',
    aiOpportunity: 'AI agents can generate color palettes, suggest typography pairings, create visual design variations, and apply design system tokens consistently across screens. They handle the systematic aspects of visual design while humans focus on the creative direction and emotional impact.',
    exampleTools: [
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'Midjourney', url: 'https://www.midjourney.com/' },
      { name: 'Adobe Firefly', url: 'https://www.adobe.com/products/firefly.html' },
    ],
    implementationTips: [
      'Use AI to generate visual design explorations based on mood boards and brand guidelines to jumpstart the creative process',
      'Have AI apply design system tokens consistently across all screens and flag inconsistencies in spacing, color, and typography',
      'Let AI generate responsive variants of approved designs to accelerate multi-platform visual adaptation',
    ],
    maturityIndicators: {
      beginner: 'All visual design work is done manually by designers pixel by pixel',
      intermediate: 'AI generates design variations and applies design system tokens; designers curate and refine',
      advanced: 'AI handles systematic visual design tasks while designers focus on creative direction and novel visual solutions',
    },
  },
  des_system: {
    detailedDescription: 'Design system maintenance involves building and evolving a shared library of reusable components, patterns, tokens, and guidelines that ensure consistency across products. It requires balancing standardization with flexibility and keeping documentation current as the system grows.',
    aiOpportunity: 'AI agents can detect design system violations across product screens, generate new component variants, update documentation when components change, and suggest consolidation opportunities for similar patterns. They make it feasible to maintain a living design system at scale.',
    exampleTools: [
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'Storybook', url: 'https://storybook.js.org/' },
      { name: 'Zeroheight', url: 'https://zeroheight.com/' },
    ],
    implementationTips: [
      'Use AI to scan product screens and flag components that deviate from the design system, prioritizing by frequency of violation',
      'Have AI auto-generate component documentation and usage guidelines when new components are added to the system',
      'Let AI suggest component consolidation opportunities by identifying visually similar but separately maintained patterns',
    ],
    maturityIndicators: {
      beginner: 'Design system exists as a static file with manual updates and frequent inconsistencies across products',
      intermediate: 'AI detects design system violations and auto-generates documentation for component updates',
      advanced: 'AI agents maintain the design system: detecting violations, suggesting consolidations, and keeping docs current automatically',
    },
  },
  des_usability: {
    detailedDescription: 'Usability testing involves observing real users as they attempt tasks with your product to identify friction points, confusion, and opportunities for improvement. It includes planning test scripts, recruiting participants, facilitating sessions, and analyzing results.',
    aiOpportunity: 'AI can analyze session recordings to identify patterns, generate heatmaps from user behavior data, and summarize findings across multiple sessions. The human facilitator remains essential for reading participants, adapting the script in real time, and interpreting results with contextual nuance.',
    exampleTools: [
      { name: 'Maze', url: 'https://maze.co/' },
      { name: 'UserTesting', url: 'https://www.usertesting.com/' },
      { name: 'Hotjar', url: 'https://www.hotjar.com/' },
    ],
    implementationTips: [
      'Use AI to analyze session recordings at scale and generate highlight reels of key friction moments',
      'Have AI compare usability test results across iterations to quantify design improvement impact',
      'Let AI generate test scripts from user stories and personas to ensure comprehensive task coverage',
    ],
    maturityIndicators: {
      beginner: 'Usability testing is done occasionally with manual note-taking and subjective analysis',
      intermediate: 'AI analyzes session recordings, generates highlight reels, and quantifies usability patterns',
      advanced: 'AI continuously monitors unmoderated usability signals from production usage and flags emerging friction points',
    },
  },
  des_a11y: {
    detailedDescription: 'Accessibility auditing involves evaluating designs and implementations against WCAG guidelines and assistive technology compatibility to ensure all users, including those with disabilities, can use the product. It covers color contrast, keyboard navigation, screen reader support, and cognitive accessibility.',
    aiOpportunity: 'AI agents can automatically scan designs and code for accessibility violations, suggest fixes with correct ARIA attributes, check color contrast ratios, and generate accessibility compliance reports. They make it feasible to catch issues early and maintain compliance at scale.',
    exampleTools: [
      { name: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/' },
      { name: 'Stark', url: 'https://www.getstark.co/' },
      { name: 'WAVE', url: 'https://wave.webaim.org/' },
    ],
    implementationTips: [
      'Integrate AI accessibility scanning into the design review process to catch violations before any code is written',
      'Use AI to automatically suggest ARIA labels, alt text, and semantic markup for flagged accessibility issues',
      'Have AI generate accessibility compliance reports for each release to track improvement over time',
    ],
    maturityIndicators: {
      beginner: 'Accessibility is checked manually or not at all, with issues found reactively through user complaints',
      intermediate: 'AI scans designs and code for accessibility violations and suggests specific fixes',
      advanced: 'AI continuously audits for accessibility across all products, auto-fixes common issues, and maintains compliance dashboards',
    },
  },
  des_critique: {
    detailedDescription: 'Design critique and review involves structured evaluation of design work by peers and stakeholders to improve quality, ensure consistency, and share knowledge. It includes formal design reviews, informal feedback sessions, and structured critique frameworks.',
    aiOpportunity: 'AI can provide a preliminary design review checking for consistency, accessibility, and adherence to design system guidelines. However, the creative and strategic feedback that comes from experienced human designers, the ability to push creative boundaries and challenge assumptions, remains fundamentally human.',
    exampleTools: [
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'Loom', url: 'https://www.loom.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Use AI to perform a pre-review checklist (design system compliance, accessibility, consistency) before peer critique sessions',
      'Have AI summarize design critique feedback from comment threads into actionable revision checklists',
      'Let AI compare designs against established UX heuristics and flag potential usability issues for discussion',
    ],
    maturityIndicators: {
      beginner: 'Design critiques are informal and unstructured, with feedback quality varying by reviewer availability',
      intermediate: 'AI pre-reviews designs for objective issues so human critiques focus on creative and strategic feedback',
      advanced: 'AI-assisted critiques combine automated heuristic analysis with structured human review for comprehensive, consistent feedback',
    },
  },
  des_collab: {
    detailedDescription: 'Cross-functional collaboration involves working closely with product managers, engineers, and other stakeholders to ensure design decisions are feasible, aligned with strategy, and well-understood across teams. It requires communication skills, empathy for different perspectives, and the ability to advocate for user needs.',
    aiOpportunity: 'AI can facilitate collaboration by generating shared documentation, translating design decisions into technical specifications, and creating presentation materials. However, the interpersonal skills needed to navigate differing opinions, build trust, and influence decisions across teams remain fundamentally human.',
    exampleTools: [
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'Notion', url: 'https://www.notion.so/' },
      { name: 'Loom', url: 'https://www.loom.com/' },
    ],
    implementationTips: [
      'Use AI to translate design specs into developer-friendly documentation with implementation notes and component references',
      'Have AI generate meeting summaries from cross-functional design reviews with clear action items for each team',
      'Let AI create stakeholder-appropriate presentations of design work, adjusting detail level for executive vs. engineering audiences',
    ],
    maturityIndicators: {
      beginner: 'Cross-functional collaboration happens through ad hoc meetings with no shared documentation',
      intermediate: 'AI generates shared specs, meeting summaries, and tailored presentations for different audiences',
      advanced: 'AI maintains a living design-to-development bridge with auto-updating specs, implementation guides, and decision logs',
    },
  },
  des_specs: {
    detailedDescription: 'Design documentation and specs involves creating detailed handoff documents that communicate design intent to developers, including redlines, interaction specifications, responsive behavior, state management, animation details, and component mappings.',
    aiOpportunity: 'AI agents can auto-generate design specs from Figma files, create redline annotations, document responsive breakpoints, and map designs to design system components. They eliminate the tedious manual work of spec creation so designers can spend more time designing.',
    exampleTools: [
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'Zeplin', url: 'https://zeplin.io/' },
      { name: 'Storybook', url: 'https://storybook.js.org/' },
    ],
    implementationTips: [
      'Use AI to auto-generate interaction specs from prototypes, documenting all states, transitions, and edge cases',
      'Have AI map design elements to existing design system components and flag any custom elements that need new components',
      'Let AI generate responsive behavior documentation by analyzing designs across breakpoints and documenting the adaptation rules',
    ],
    maturityIndicators: {
      beginner: 'Design specs are created manually in separate documents that often lag behind the actual designs',
      intermediate: 'AI auto-generates specs from design files with component mappings and interaction documentation',
      advanced: 'AI produces complete developer-ready specs from designs, including responsive behavior, state documentation, and code snippets',
    },
  },
  des_motion: {
    detailedDescription: 'Motion and interaction design involves defining how interface elements animate, transition, and respond to user actions. It includes micro-interactions, page transitions, loading states, and gesture responses that make the product feel responsive and polished.',
    aiOpportunity: 'AI agents can generate animation code from design descriptions, suggest easing curves and timing based on interaction patterns, and create motion prototypes from static designs. They make it easier to explore motion possibilities without deep animation expertise.',
    exampleTools: [
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'Rive', url: 'https://rive.app/' },
      { name: 'LottieFiles', url: 'https://lottiefiles.com/' },
    ],
    implementationTips: [
      'Use AI to generate CSS or Lottie animations from natural-language descriptions of desired motion behavior',
      'Have AI suggest appropriate animation timing and easing curves based on the type of interaction and platform conventions',
      'Let AI create motion design tokens that document standardized animation patterns for consistent implementation across the product',
    ],
    maturityIndicators: {
      beginner: 'Motion design is minimal or inconsistent, implemented ad hoc by individual developers',
      intermediate: 'AI generates animation code and suggests motion patterns; designers curate and refine the feel',
      advanced: 'AI produces production-ready motion implementations from design descriptions with standardized motion tokens across the product',
    },
  },
  des_icons: {
    detailedDescription: 'Icon and illustration creation involves designing custom iconography and visual assets that communicate concepts clearly, maintain brand consistency, and enhance the visual language of the product. It includes system icons, spot illustrations, and decorative graphics.',
    aiOpportunity: 'AI agents can generate icon sets from descriptions, create illustration variations in a consistent style, and produce SVG assets ready for implementation. They dramatically accelerate asset creation, enabling rapid iteration on visual concepts.',
    exampleTools: [
      { name: 'Figma', url: 'https://www.figma.com/' },
      { name: 'Midjourney', url: 'https://www.midjourney.com/' },
      { name: 'Adobe Illustrator', url: 'https://www.adobe.com/products/illustrator.html' },
    ],
    implementationTips: [
      'Use AI to generate icon concept variations from descriptions, then refine the best options to match your design system style',
      'Have AI create illustrations in a consistent visual style by training on your existing brand illustration library',
      'Let AI export icons in all required formats (SVG, PNG at multiple densities) with proper naming conventions automatically',
    ],
    maturityIndicators: {
      beginner: 'All icons and illustrations are created manually by designers or sourced from generic stock libraries',
      intermediate: 'AI generates icon and illustration concepts that designers refine to match brand standards',
      advanced: 'AI produces brand-consistent, production-ready visual assets from descriptions with minimal designer intervention',
    },
  },
};
