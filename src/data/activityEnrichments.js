// Enhanced activity data for all departments
// Each key maps to an activity ID and adds detailed fields

import { batch1 } from './enrichments_batch1';
import { batch2 } from './enrichments_batch2';
import { batch3 } from './enrichments_batch3';

export const enrichments = {
  // ============ MARKETING ============
  mkt_brand_strategy: {
    detailedDescription: 'Brand strategy encompasses defining the company\'s unique value proposition, target audience perception, competitive differentiation, and emotional resonance. It involves extensive market research, customer interviews, competitive landscape analysis, and creative workshops to establish positioning that guides all marketing communications and customer touchpoints.',
    aiOpportunity: 'AI can analyze competitor positioning across thousands of data points, synthesize customer sentiment from reviews and social media, and generate positioning statement variations. However, the final brand vision requires human creativity, cultural intuition, and executive alignment that AI cannot replicate.',
    exampleTools: [
      { name: 'Brandwatch', url: 'https://www.brandwatch.com/' },
      { name: 'Semrush', url: 'https://www.semrush.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Use AI to analyze competitor messaging across websites, social media, and review sites to identify positioning gaps',
      'Leverage sentiment analysis tools to understand current brand perception vs. desired state',
      'Have AI generate multiple positioning statement variations as starting points for creative refinement',
    ],
    maturityIndicators: {
      beginner: 'Brand strategy is done through internal brainstorming with no AI-assisted market analysis',
      intermediate: 'AI tools monitor competitor positioning and brand sentiment to inform strategy',
      advanced: 'Continuous AI-powered brand monitoring feeds real-time insights into positioning decisions',
    },
  },
  mkt_content_strategy: {
    detailedDescription: 'Content strategy involves planning what content to create, for whom, in what format, and through which channels. It requires understanding buyer journeys, mapping content to funnel stages, managing editorial calendars, and aligning with product launches and business objectives.',
    aiOpportunity: 'AI agents can analyze top-performing content, identify trending topics in your industry, suggest content gaps based on SEO data, and draft editorial calendars. Humans set the creative vision, approve themes, and ensure alignment with brand voice.',
    exampleTools: [
      { name: 'MarketMuse', url: 'https://www.marketmuse.com/' },
      { name: 'Clearscope', url: 'https://www.clearscope.io/' },
      { name: 'BuzzSumo', url: 'https://buzzsumo.com/' },
    ],
    implementationTips: [
      'Use AI content gap analysis to identify topics your competitors rank for that you don\'t cover',
      'Let AI suggest content calendar themes based on seasonal trends and industry events',
      'Build prompt templates that incorporate your brand voice guidelines for consistent AI-assisted planning',
    ],
    maturityIndicators: {
      beginner: 'Content planning is manual, based on team brainstorming and gut feeling',
      intermediate: 'AI tools inform content decisions through keyword and gap analysis',
      advanced: 'AI-driven content intelligence platform continuously optimizes the content strategy',
    },
  },
  mkt_blog_writing: {
    detailedDescription: 'Blog and article writing involves creating long-form educational, thought-leadership, or promotional content that drives organic traffic, establishes authority, and nurtures prospects. Quality content requires subject matter expertise, compelling narratives, and SEO optimization.',
    aiOpportunity: 'AI can generate first drafts, create outlines, suggest headlines, optimize for SEO, and repurpose content across formats. Human writers add original insights, expert perspectives, brand voice, fact-checking, and the nuanced storytelling that builds genuine thought leadership.',
    exampleTools: [
      { name: 'Jasper', url: 'https://www.jasper.ai/' },
      { name: 'Writer', url: 'https://writer.com/' },
      { name: 'Surfer SEO', url: 'https://surferseo.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
    ],
    implementationTips: [
      'Create detailed briefs with target keywords, audience persona, and key points before sending to AI',
      'Use AI for first drafts and outlines, then have subject matter experts add original insights and data',
      'Set up a review checklist: fact-check claims, verify brand voice, add internal links, optimize meta descriptions',
    ],
    maturityIndicators: {
      beginner: 'All blog content is written from scratch by humans with no AI assistance',
      intermediate: 'AI generates first drafts and outlines; humans edit and add expertise',
      advanced: 'Integrated AI workflow handles drafting, SEO optimization, and multi-format repurposing with human oversight on quality',
    },
  },
  mkt_social_creation: {
    detailedDescription: 'Social media content creation involves crafting platform-specific posts for LinkedIn, X/Twitter, Instagram, and other channels. Each platform has unique formats, character limits, audience expectations, and best practices for engagement.',
    aiOpportunity: 'AI excels at generating multiple variations of social posts, adapting content across platforms, suggesting hashtags, and creating image captions. Humans curate the best options, ensure brand consistency, and add the authentic voice that drives real engagement.',
    exampleTools: [
      { name: 'Sprout Social', url: 'https://sproutsocial.com/' },
      { name: 'Copy.ai', url: 'https://www.copy.ai/' },
      { name: 'Canva AI', url: 'https://www.canva.com/' },
    ],
    implementationTips: [
      'Generate 5-10 post variations per topic and let your team select the best ones',
      'Create platform-specific prompt templates that account for character limits and audience tone',
      'Use AI to repurpose long-form content into social snippets automatically',
    ],
    maturityIndicators: {
      beginner: 'Social content is manually written post-by-post',
      intermediate: 'AI generates draft posts and variations; team selects and refines',
      advanced: 'AI pipeline auto-generates social content from all marketing assets with human curation',
    },
  },
  mkt_social_scheduling: {
    detailedDescription: 'Social media scheduling involves publishing content at optimal times across multiple platforms, managing content queues, and ensuring consistent posting cadence. This includes time zone optimization and platform-specific scheduling rules.',
    aiOpportunity: 'This is fully automatable. Modern social media management platforms analyze engagement data to determine optimal posting times, automatically queue content, cross-post across platforms, and maintain consistent cadence without human intervention.',
    exampleTools: [
      { name: 'Buffer', url: 'https://buffer.com/' },
      { name: 'Hootsuite', url: 'https://www.hootsuite.com/' },
      { name: 'Later', url: 'https://later.com/' },
    ],
    implementationTips: [
      'Set up auto-scheduling based on AI-determined optimal posting times for each platform',
      'Create content queues organized by theme so posts are always ready',
      'Use approval workflows for sensitive topics while keeping routine posts fully automated',
    ],
    maturityIndicators: {
      beginner: 'Posts are manually published in real-time',
      intermediate: 'Content is scheduled in advance using a social media tool',
      advanced: 'AI auto-schedules all content at optimal times with smart queue management',
    },
  },
  mkt_email_creation: {
    detailedDescription: 'Email campaign creation involves writing subject lines, body copy, CTAs, and designing nurture sequences that guide prospects through the buyer journey. Effective email marketing requires understanding segmentation, personalization, and deliverability best practices.',
    aiOpportunity: 'AI agents can draft email copy, generate subject line variations, suggest segmentation strategies, personalize content at scale, and recommend send-time optimization. Humans approve messaging, set strategic direction, and handle sensitive communications.',
    exampleTools: [
      { name: 'HubSpot AI', url: 'https://www.hubspot.com/' },
      { name: 'Mailchimp AI', url: 'https://mailchimp.com/' },
      { name: 'Lavender', url: 'https://www.lavender.ai/' },
    ],
    implementationTips: [
      'Use AI to generate 5+ subject line variations for every email and A/B test them',
      'Create AI-powered dynamic content blocks that personalize based on recipient attributes',
      'Build prompt templates that include your email style guide, tone, and common CTAs',
    ],
    maturityIndicators: {
      beginner: 'Emails are written manually with no AI assistance',
      intermediate: 'AI helps draft copy and suggests subject lines; human edits',
      advanced: 'AI generates personalized email sequences with dynamic content at scale',
    },
  },
  mkt_email_sends: {
    detailedDescription: 'Email send execution includes audience segmentation, A/B test setup, scheduling, delivery, and results collection. It also involves managing suppression lists, compliance (CAN-SPAM, GDPR), and deliverability monitoring.',
    aiOpportunity: 'Fully automatable through marketing automation platforms. AI handles send-time optimization, audience splitting, automated A/B testing with statistical significance detection, and compliance checks without human intervention.',
    exampleTools: [
      { name: 'Marketo', url: 'https://www.marketo.com/' },
      { name: 'HubSpot', url: 'https://www.hubspot.com/' },
      { name: 'Iterable', url: 'https://iterable.com/' },
    ],
    implementationTips: [
      'Configure smart send-time optimization that delivers emails when each recipient is most likely to engage',
      'Set up automated A/B testing that promotes winning variants automatically',
      'Implement automated compliance checks and suppression list management',
    ],
    maturityIndicators: {
      beginner: 'Emails are manually sent to static lists',
      intermediate: 'Basic automation with scheduled sends and simple A/B tests',
      advanced: 'Fully automated with AI-optimized send times, dynamic segmentation, and auto-promoted winners',
    },
  },
  mkt_seo_research: {
    detailedDescription: 'SEO keyword research involves identifying high-value search terms, analyzing search intent, mapping keywords to content opportunities, and prioritizing based on difficulty, volume, and business relevance. It forms the foundation of organic growth strategy.',
    aiOpportunity: 'AI tools can analyze millions of keywords, identify clusters, predict ranking difficulty, discover content gaps, and suggest semantic variations. Humans validate strategic fit, prioritize based on business goals, and ensure alignment with the content roadmap.',
    exampleTools: [
      { name: 'Ahrefs', url: 'https://ahrefs.com/' },
      { name: 'Semrush', url: 'https://www.semrush.com/' },
      { name: 'Surfer SEO', url: 'https://surferseo.com/' },
    ],
    implementationTips: [
      'Use AI to cluster keywords by search intent (informational, navigational, transactional)',
      'Let AI identify "content gaps" where competitors rank but you have no coverage',
      'Combine AI keyword data with human judgment about brand positioning and business priorities',
    ],
    maturityIndicators: {
      beginner: 'Keyword research is ad hoc, based on guesses',
      intermediate: 'AI tools surface opportunities; human validates and prioritizes',
      advanced: 'AI continuously monitors keyword landscape and auto-updates content strategy',
    },
  },
  mkt_seo_audits: {
    detailedDescription: 'SEO technical audits involve systematically crawling a website to identify issues that affect search engine visibility: broken links, slow page speed, missing meta tags, indexing problems, mobile usability issues, and schema markup errors.',
    aiOpportunity: 'Fully automatable. Automated crawlers scan websites on schedule, identify issues, prioritize by impact, and generate detailed reports. Some tools can even auto-fix certain issues like broken redirects.',
    exampleTools: [
      { name: 'Screaming Frog', url: 'https://www.screamingfrog.co.uk/' },
      { name: 'Sitebulb', url: 'https://sitebulb.com/' },
      { name: 'Google Search Console', url: 'https://search.google.com/search-console' },
    ],
    implementationTips: [
      'Schedule weekly automated crawls and set up alerts for critical issues',
      'Configure automated reports that highlight new issues vs. existing ones',
      'Integrate crawl data with your project management tool to auto-create fix tickets',
    ],
    maturityIndicators: {
      beginner: 'SEO audits are done manually and infrequently',
      intermediate: 'Automated crawls run regularly with manual review',
      advanced: 'Continuous monitoring with automated issue detection and prioritized fix recommendations',
    },
  },
  mkt_paid_media: {
    detailedDescription: 'Paid media management encompasses running advertising campaigns across Google Ads, LinkedIn Ads, Meta Ads, and programmatic platforms. It involves audience targeting, bid management, creative testing, budget allocation, and performance optimization.',
    aiOpportunity: 'AI agents optimize bids in real-time, discover new audience segments, generate ad copy variations, predict campaign performance, and reallocate budget to top performers. Humans set strategy, approve creative direction, manage budgets, and interpret results.',
    exampleTools: [
      { name: 'Google Ads Smart Bidding', url: 'https://ads.google.com/' },
      { name: 'Metadata.io', url: 'https://metadata.io/' },
      { name: 'AdCreative.ai', url: 'https://www.adcreative.ai/' },
    ],
    implementationTips: [
      'Enable AI-powered smart bidding strategies across all campaigns',
      'Use AI to generate multiple ad copy and creative variations for testing',
      'Let AI tools identify top-performing audience segments and reallocate budget automatically',
    ],
    maturityIndicators: {
      beginner: 'Manual bid management and basic targeting',
      intermediate: 'AI-powered bidding with human-managed targeting and creative',
      advanced: 'Full AI optimization across bidding, targeting, creative, and budget allocation',
    },
  },
  mkt_lead_scoring: {
    detailedDescription: 'Lead scoring assigns numerical values to leads based on their likelihood to convert, using demographic data, behavioral signals (website visits, content downloads, email engagement), and firmographic data. Proper scoring ensures sales teams focus on the highest-quality opportunities.',
    aiOpportunity: 'Fully automatable with ML-based scoring models that continuously learn from historical conversion data. AI models identify patterns humans can\'t see, score leads in real-time, and automatically route qualified leads to the right sales team member.',
    exampleTools: [
      { name: 'Salesforce Einstein', url: 'https://www.salesforce.com/artificial-intelligence/' },
      { name: 'MadKudu', url: 'https://www.madkudu.com/' },
      { name: 'HubSpot Predictive Lead Scoring', url: 'https://www.hubspot.com/' },
    ],
    implementationTips: [
      'Train predictive scoring models on historical closed-won and closed-lost data',
      'Combine behavioral scoring (engagement) with firmographic scoring (company fit)',
      'Set up automated routing rules that send high-score leads directly to sales with full context',
    ],
    maturityIndicators: {
      beginner: 'Manual lead qualification based on gut feeling',
      intermediate: 'Rule-based scoring with basic automation',
      advanced: 'ML-powered predictive scoring with continuous model refinement and auto-routing',
    },
  },
  mkt_attribution: {
    detailedDescription: 'Marketing attribution tracks which campaigns, channels, and touchpoints influenced pipeline and revenue. It involves multi-touch attribution modeling, data integration across platforms, and translating complex data into actionable insights for budget decisions.',
    aiOpportunity: 'AI can aggregate data from dozens of sources, build sophisticated multi-touch attribution models (beyond first/last touch), identify hidden influence patterns, and generate automated reports. Humans interpret strategic implications and make investment decisions.',
    exampleTools: [
      { name: 'HockeyStack', url: 'https://www.hockeystack.com/' },
      { name: 'Dreamdata', url: 'https://dreamdata.io/' },
      { name: 'Bizible (Marketo Measure)', url: 'https://www.marketo.com/' },
    ],
    implementationTips: [
      'Implement multi-touch attribution models that go beyond first-touch/last-touch',
      'Use AI to identify non-obvious conversion paths and hidden influence touchpoints',
      'Set up automated weekly attribution reports for marketing leadership',
    ],
    maturityIndicators: {
      beginner: 'Basic first-touch or last-touch attribution only',
      intermediate: 'Multi-touch attribution with AI-powered modeling',
      advanced: 'AI continuously optimizes attribution models and directly informs budget allocation',
    },
  },
  mkt_event_planning: {
    detailedDescription: 'Event planning involves organizing conferences, trade shows, webinars, dinners, and field events. It requires venue selection, vendor negotiation, speaker coordination, attendee experience design, and cross-functional alignment with sales teams.',
    aiOpportunity: 'AI can assist with venue research, attendee list building, promotional copy, logistics checklists, and post-event follow-up sequences. However, the core work — relationship building, creative experience design, vendor negotiation, and on-site problem solving — is deeply human.',
    exampleTools: [
      { name: 'Splash', url: 'https://splashthat.com/' },
      { name: 'Bizzabo', url: 'https://www.bizzabo.com/' },
      { name: 'ChatGPT', url: 'https://chat.openai.com/' },
    ],
    implementationTips: [
      'Use AI to research venues, generate event briefs, and create promotional copy',
      'Automate attendee communication workflows (confirmations, reminders, follow-ups)',
      'Let AI analyze post-event survey data and suggest improvements for next time',
    ],
    maturityIndicators: {
      beginner: 'All event planning is manual with no AI-assisted automation',
      intermediate: 'AI assists with copy, logistics checklists, and follow-up automation',
      advanced: 'AI handles research, communications, and analysis while humans focus on relationships and experience design',
    },
  },
  mkt_webinar: {
    detailedDescription: 'Webinar execution involves planning, promoting, hosting live sessions, managing Q&A, and orchestrating post-event nurture sequences. Success depends on compelling content, smooth technical delivery, audience engagement, and rapid follow-up with attendees.',
    aiOpportunity: 'AI agents handle post-webinar follow-up sequences, generate recap emails, create highlight clips, score attendee engagement, and personalize nurture paths based on participation level. Humans present live, facilitate Q&A, and build genuine audience connections.',
    exampleTools: [
      { name: 'Zoom Events', url: 'https://events.zoom.us/' },
      { name: 'ON24', url: 'https://www.on24.com/' },
      { name: 'Goldcast', url: 'https://www.goldcast.io/' },
    ],
    implementationTips: [
      'Set up automated post-webinar nurture sequences triggered by attendance behavior',
      'Use AI to generate recap content: blog posts, social clips, email summaries',
      'Score attendees by engagement level (questions asked, duration watched) to prioritize sales follow-up',
    ],
    maturityIndicators: {
      beginner: 'Manual follow-up with all attendees treated the same',
      intermediate: 'Automated follow-up sequences with basic segmentation',
      advanced: 'AI scores engagement, personalizes follow-up paths, and auto-generates multi-format recap content',
    },
  },
  mkt_competitive_intel: {
    detailedDescription: 'Competitive intelligence involves systematically monitoring competitors\' product releases, messaging changes, pricing updates, hiring patterns, customer reviews, and market positioning. The insights inform product strategy, sales enablement, and marketing differentiation.',
    aiOpportunity: 'AI agents continuously monitor competitor websites, press releases, job postings, patent filings, review sites, and social media. They auto-generate competitive summary reports and alert teams to significant changes. Humans interpret the strategic implications and decide how to respond.',
    exampleTools: [
      { name: 'Klue', url: 'https://klue.com/' },
      { name: 'Crayon', url: 'https://www.crayon.co/' },
      { name: 'Kompyte', url: 'https://www.kompyte.com/' },
    ],
    implementationTips: [
      'Set up automated monitoring for competitor websites, pricing pages, and job postings',
      'Use AI to generate weekly competitive digest summaries for the GTM team',
      'Create AI-maintained battlecards that auto-update when competitor changes are detected',
    ],
    maturityIndicators: {
      beginner: 'Ad hoc competitive research done manually when needed',
      intermediate: 'AI monitors competitors and generates regular reports',
      advanced: 'Real-time competitive intelligence platform with auto-updated battlecards and proactive alerts',
    },
  },
  mkt_analyst_relations: {
    detailedDescription: 'Analyst relations involves managing strategic relationships with industry analysts at firms like Gartner, Forrester, and IDC. This includes briefings, inquiry support, Magic Quadrant/Wave participation, and leveraging analyst content for marketing purposes.',
    aiOpportunity: 'AI can help prepare briefing materials by analyzing analyst reports, tracking analyst opinions over time, and drafting initial responses to inquiries. However, the relationship itself — building trust, navigating political dynamics, and strategic positioning — requires human nuance.',
    exampleTools: [
      { name: 'ARInsights', url: 'https://arinsights.com/' },
      { name: 'Claude/ChatGPT', url: 'https://claude.ai/' },
      { name: 'Boardroom Insiders', url: 'https://www.boardroominsiders.com/' },
    ],
    implementationTips: [
      'Use AI to summarize analyst reports and track how analyst opinions evolve over time',
      'Have AI draft initial responses to analyst questionnaires and RFIs as a starting point',
      'Build AI-maintained profiles of key analysts with their preferences, focus areas, and past interactions',
    ],
    maturityIndicators: {
      beginner: 'Analyst relations is purely relationship-driven with no AI support',
      intermediate: 'AI assists with briefing prep and analyst report summarization',
      advanced: 'AI-powered analyst CRM tracks relationships, automates prep, and identifies strategic opportunities',
    },
  },
  mkt_budget: {
    detailedDescription: 'Marketing budget planning involves allocating financial resources across channels, programs, and campaigns to maximize ROI. It requires understanding historical performance, forecasting outcomes, balancing brand vs. demand investments, and aligning with company growth targets.',
    aiOpportunity: 'AI can analyze historical spend-to-outcome data, model different allocation scenarios, predict ROI by channel, and flag underperforming investments. However, the strategic decisions — balancing short-term demand gen vs. long-term brand building — require human business judgment.',
    exampleTools: [
      { name: 'Allocadia', url: 'https://allocadia.com/' },
      { name: 'Planful', url: 'https://planful.com/' },
      { name: 'Tableau', url: 'https://www.tableau.com/' },
    ],
    implementationTips: [
      'Build AI models that predict expected ROI for different budget allocation scenarios',
      'Use AI to continuously monitor spend efficiency and flag underperforming programs',
      'Create automated dashboards that show budget utilization vs. outcomes in real-time',
    ],
    maturityIndicators: {
      beginner: 'Budget allocation based on prior year spending with manual tracking',
      intermediate: 'AI-informed allocation with performance data and scenario modeling',
      advanced: 'Dynamic AI-optimized budget allocation that shifts spend in response to real-time performance',
    },
  },
  mkt_campaign_optimization: {
    detailedDescription: 'Campaign performance optimization involves continuously monitoring live campaigns across all channels and making adjustments to improve results. This includes modifying targeting, adjusting bids, swapping creative, reallocating budget, and testing new approaches.',
    aiOpportunity: 'AI agents can monitor campaign metrics in real-time, identify underperforming elements, recommend optimization actions, and execute minor adjustments autonomously. Humans approve significant strategic shifts, evaluate cross-campaign implications, and set guardrails.',
    exampleTools: [
      { name: 'Metadata.io', url: 'https://metadata.io/' },
      { name: 'Optmyzr', url: 'https://www.optmyzr.com/' },
      { name: 'Albert.ai', url: 'https://albert.ai/' },
    ],
    implementationTips: [
      'Set up automated performance alerts with AI-recommended optimization actions',
      'Define guardrails: which optimizations AI can execute autonomously vs. which need human approval',
      'Use AI to run continuous multivariate testing across creative, targeting, and messaging',
    ],
    maturityIndicators: {
      beginner: 'Campaign optimization is reactive, based on weekly manual reviews',
      intermediate: 'AI recommends optimizations; humans review and approve',
      advanced: 'AI autonomously optimizes campaigns within defined guardrails with human oversight on strategy',
    },
  },
  mkt_abm: {
    detailedDescription: 'Account-Based Marketing (ABM) orchestration involves identifying target accounts, creating personalized multi-channel campaigns for specific companies, coordinating with sales on account plans, and measuring account-level engagement and pipeline influence.',
    aiOpportunity: 'AI agents identify high-fit accounts using predictive scoring, personalize content and ads at the account level, track cross-channel engagement, and recommend next-best actions. Humans define the strategic account list, craft key messages, and manage the sales-marketing relationship.',
    exampleTools: [
      { name: '6sense', url: 'https://6sense.com/' },
      { name: 'Demandbase', url: 'https://www.demandbase.com/' },
      { name: 'Terminus', url: 'https://terminus.com/' },
    ],
    implementationTips: [
      'Use AI-powered intent data to identify accounts actively researching solutions in your category',
      'Let AI personalize ad creative and landing pages at the account level automatically',
      'Set up automated account engagement scoring that alerts sales when accounts are "hot"',
    ],
    maturityIndicators: {
      beginner: 'ABM is manual with static account lists and generic campaigns',
      intermediate: 'AI identifies target accounts and personalizes some content',
      advanced: 'Full AI-orchestrated ABM with predictive account selection, dynamic personalization, and automated sales alerts',
    },
  },
  mkt_product_launch: {
    detailedDescription: 'Product launch planning requires coordinating across product, marketing, sales, CS, and enablement teams to successfully bring new features or products to market. It involves messaging, positioning, timing, asset creation, sales enablement, and customer communication.',
    aiOpportunity: 'AI can draft launch messaging, create asset checklists, generate sales enablement materials, and personalize customer communications. However, the strategic decisions — timing, positioning, competitive response, and cross-functional alignment — require human leadership and judgment.',
    exampleTools: [
      { name: 'Asana', url: 'https://asana.com/' },
      { name: 'LaunchDarkly', url: 'https://launchdarkly.com/' },
      { name: 'Notion AI', url: 'https://www.notion.so/' },
    ],
    implementationTips: [
      'Use AI to generate first drafts of launch messaging, blog posts, and sales one-pagers',
      'Create AI-powered launch checklists that auto-populate based on launch tier and complexity',
      'Let AI draft personalized customer communications based on account segment and feature relevance',
    ],
    maturityIndicators: {
      beginner: 'Launch planning is manual with templates and spreadsheets',
      intermediate: 'AI assists with content creation and checklist generation',
      advanced: 'AI-powered launch orchestration with auto-generated content, personalized communications, and predictive impact modeling',
    },
  },

  // ============ SALES ============
  sales_territory: {
    detailedDescription: 'Territory and account planning involves defining which geographic regions, industries, or account segments each sales rep covers, identifying target accounts within territories, and creating strategic plans for penetrating key accounts. It directly impacts revenue distribution and team productivity.',
    aiOpportunity: 'AI can analyze historical win data, firmographic signals, and market potential to suggest optimal territory boundaries and target account lists. However, strategic decisions about resource allocation, team dynamics, and competitive positioning require human judgment.',
    exampleTools: [
      { name: 'Anaplan', url: 'https://www.anaplan.com/' },
      { name: 'Clari', url: 'https://www.clari.com/' },
      { name: 'Salesforce Maps', url: 'https://www.salesforce.com/products/maps/' },
    ],
    implementationTips: [
      'Use AI to analyze historical win rates by geography and segment to identify underserved high-potential areas',
      'Let AI score and rank potential accounts within each territory by propensity to buy',
      'Build AI models that balance territory potential with rep capacity and experience level',
    ],
    maturityIndicators: {
      beginner: 'Territories assigned based on geography or alphabetical splits',
      intermediate: 'AI data informs territory design; human leaders make final decisions',
      advanced: 'AI-optimized territories with dynamic rebalancing based on real-time performance',
    },
  },
  sales_prospecting: {
    detailedDescription: 'Prospecting research involves identifying potential customers, gathering intelligence about their business challenges, technology stack, organizational structure, and recent news to personalize outreach. Quality research is the foundation of effective pipeline generation.',
    aiOpportunity: 'AI agents can scrape company websites, LinkedIn profiles, news articles, and financial reports to build comprehensive prospect dossiers. They identify trigger events, map org charts, and suggest personalized talking points. Humans review for accuracy and strategic relevance.',
    exampleTools: [
      { name: 'ZoomInfo', url: 'https://www.zoominfo.com/' },
      { name: 'Apollo.io', url: 'https://www.apollo.io/' },
      { name: 'LinkedIn Sales Navigator', url: 'https://business.linkedin.com/sales-solutions' },
      { name: 'Clay', url: 'https://www.clay.com/' },
    ],
    implementationTips: [
      'Use AI to auto-generate prospect research briefs before every outreach sequence',
      'Set up trigger-based alerts for prospect companies (funding rounds, leadership changes, tech stack changes)',
      'Let AI identify warm connection paths through LinkedIn and mutual contacts',
    ],
    maturityIndicators: {
      beginner: 'Manual Google/LinkedIn research before each call',
      intermediate: 'AI tools provide enriched profiles and trigger event alerts',
      advanced: 'AI auto-generates comprehensive prospect dossiers with personalized talking points',
    },
  },
  sales_cold_outreach: {
    detailedDescription: 'Cold outreach involves reaching out to potential customers who haven\'t expressed interest, through personalized emails, calls, LinkedIn messages, and multi-touch sequences. Effectiveness depends on personalization quality, timing, and persistence.',
    aiOpportunity: 'AI agents personalize outreach at scale by incorporating prospect-specific data (company news, tech stack, competitors, role-specific pain points), generate multiple message variations, optimize send times, and manage multi-channel sequences. Humans craft the strategic narrative and handle replies.',
    exampleTools: [
      { name: 'Outreach', url: 'https://www.outreach.io/' },
      { name: 'Salesloft', url: 'https://www.salesloft.com/' },
      { name: 'Lavender', url: 'https://www.lavender.ai/' },
      { name: 'Regie.ai', url: 'https://www.regie.ai/' },
    ],
    implementationTips: [
      'Use AI to hyper-personalize the first line of every email based on prospect research',
      'A/B test AI-generated subject lines and messaging frameworks continuously',
      'Let AI manage multi-touch sequence timing while humans handle all replies and conversations',
    ],
    maturityIndicators: {
      beginner: 'Generic template-based outreach with manual sends',
      intermediate: 'AI-personalized sequences with human-crafted core messaging',
      advanced: 'AI-orchestrated multi-channel sequences with dynamic personalization and optimal timing',
    },
  },
  sales_discovery: {
    detailedDescription: 'Discovery calls are crucial conversations where sales reps understand prospect pain points, business objectives, decision-making processes, budget, timeline, and competitive landscape. Effective discovery builds trust and sets the foundation for the entire sales process.',
    aiOpportunity: 'AI assists with pre-call prep (briefing notes, suggested questions), real-time conversation intelligence (key moment detection, talk ratio monitoring), and post-call summaries. The human skills of empathy, active listening, building rapport, and asking insightful follow-up questions are irreplaceable.',
    exampleTools: [
      { name: 'Gong', url: 'https://www.gong.io/' },
      { name: 'Chorus (ZoomInfo)', url: 'https://www.chorus.ai/' },
      { name: 'Fireflies.ai', url: 'https://fireflies.ai/' },
    ],
    implementationTips: [
      'Use AI to generate pre-call research briefs with suggested discovery questions tailored to the prospect',
      'Record calls and let AI identify key moments, action items, and competitive mentions',
      'Analyze AI-generated call summaries to improve questioning techniques across the team',
    ],
    maturityIndicators: {
      beginner: 'Discovery relies entirely on rep skill with no AI support',
      intermediate: 'AI provides pre-call prep and post-call summaries',
      advanced: 'AI-powered real-time coaching, automated note-taking, and team-wide insights from call analysis',
    },
  },
  sales_demo: {
    detailedDescription: 'Demo delivery involves presenting the product\'s value to prospects in a compelling, customized way that addresses their specific needs and pain points. Great demos tell a story, connect features to business outcomes, and handle objections naturally.',
    aiOpportunity: 'AI assists with demo environment setup, slide personalization, competitive talking points, and post-demo follow-up materials. The live presentation — reading the room, adapting in real-time, telling compelling stories, and building excitement — is a distinctly human skill.',
    exampleTools: [
      { name: 'Demostack', url: 'https://www.demostack.com/' },
      { name: 'Consensus', url: 'https://goconsensus.com/' },
      { name: 'Gong', url: 'https://www.gong.io/' },
    ],
    implementationTips: [
      'Use AI to personalize demo environments with prospect-relevant data before each meeting',
      'Let AI generate post-demo summary emails with key highlights and next steps',
      'Analyze successful demos with AI to identify winning patterns and replicate across the team',
    ],
    maturityIndicators: {
      beginner: 'Same generic demo for every prospect',
      intermediate: 'AI-personalized demo environments; human delivers live',
      advanced: 'AI-curated demo flows based on prospect profile with real-time coaching and automated follow-up',
    },
  },
  sales_proposal: {
    detailedDescription: 'Proposal and quote creation involves assembling custom proposals that summarize the prospect\'s needs, proposed solution, pricing, implementation timeline, and terms. Quality proposals accelerate deal velocity and reduce pricing friction.',
    aiOpportunity: 'AI agents draft proposals from templates, pull relevant case studies and data from CRM, generate custom pricing based on rules, and suggest upsell opportunities. Humans customize the strategic narrative, approve pricing, and add deal-specific context.',
    exampleTools: [
      { name: 'PandaDoc', url: 'https://www.pandadoc.com/' },
      { name: 'Proposify', url: 'https://www.proposify.com/' },
      { name: 'DealHub', url: 'https://dealhub.io/' },
    ],
    implementationTips: [
      'Build AI-powered proposal templates that auto-populate with CRM data and prospect details',
      'Use AI to suggest relevant case studies based on the prospect\'s industry and use case',
      'Let AI flag non-standard pricing or terms that require deal desk approval',
    ],
    maturityIndicators: {
      beginner: 'Proposals built manually from scratch or copy-pasted templates',
      intermediate: 'AI generates first-draft proposals from CRM data; human customizes',
      advanced: 'Auto-generated personalized proposals with AI-suggested case studies, dynamic pricing, and electronic signatures',
    },
  },
  sales_negotiation: {
    detailedDescription: 'Negotiation involves handling pricing objections, discussing contract terms, managing multi-stakeholder dynamics, and finding creative solutions that satisfy both parties. Skilled negotiation protects deal margins while building long-term customer relationships.',
    aiOpportunity: 'AI provides data-backed negotiation support: comparable deal pricing, discount impact analysis, and competitive intelligence. It can also analyze negotiation patterns across the org to identify best practices. The actual negotiation — reading emotions, building trust, making concessions strategically — is deeply human.',
    exampleTools: [
      { name: 'Gong', url: 'https://www.gong.io/' },
      { name: 'Clari', url: 'https://www.clari.com/' },
      { name: 'DealCoachPro', url: 'https://dealcoachpro.com/' },
    ],
    implementationTips: [
      'Use AI to provide reps with comparable deal data (what discounts were given in similar deals)',
      'Let AI analyze past negotiations to identify which concession strategies lead to best outcomes',
      'Build AI-powered guardrails that calculate margin impact of proposed discounts in real-time',
    ],
    maturityIndicators: {
      beginner: 'Negotiation relies solely on individual rep skill and experience',
      intermediate: 'AI provides benchmark data and discount impact analysis',
      advanced: 'AI-powered negotiation intelligence with real-time coaching and margin optimization',
    },
  },
  sales_contract: {
    detailedDescription: 'Contract management involves creating, reviewing, redlining, and finalizing legal agreements. It includes tracking contract status, managing version control, ensuring compliance with legal standards, and coordinating between sales, legal, and procurement teams.',
    aiOpportunity: 'AI agents identify non-standard terms in redlined contracts, compare proposed changes against approved language, flag risk areas, and auto-generate standard agreements. Human legal review is needed for material changes, complex terms, and strategic concessions.',
    exampleTools: [
      { name: 'Ironclad', url: 'https://ironcladapp.com/' },
      { name: 'DocuSign CLM', url: 'https://www.docusign.com/' },
      { name: 'Juro', url: 'https://juro.com/' },
    ],
    implementationTips: [
      'Use AI to auto-identify non-standard terms and flag them for legal review',
      'Let AI compare redlines against your approved fallback language library',
      'Set up automated contract routing based on deal size and complexity',
    ],
    maturityIndicators: {
      beginner: 'Manual contract creation and review with email-based approvals',
      intermediate: 'AI flags non-standard terms; legal reviews with AI-suggested alternatives',
      advanced: 'AI-powered CLM with automated generation, redline analysis, and intelligent routing',
    },
  },
  sales_crm: {
    detailedDescription: 'CRM data entry involves logging call notes, updating deal stages, recording next steps, maintaining contact information, and ensuring pipeline data accuracy. Accurate CRM data is critical for forecasting, reporting, and organizational alignment.',
    aiOpportunity: 'Fully automatable. AI captures data from emails, calendar events, and call recordings to auto-update CRM fields, log activities, create contacts, and advance deal stages — eliminating the #1 time-waster for sales reps.',
    exampleTools: [
      { name: 'People.ai', url: 'https://people.ai/' },
      { name: 'Dooly', url: 'https://www.dooly.ai/' },
      { name: 'Scratchpad', url: 'https://scratchpad.com/' },
    ],
    implementationTips: [
      'Deploy AI that auto-captures contacts and activities from email and calendar',
      'Use call recording AI to auto-generate meeting notes and update CRM fields',
      'Set up automated data quality checks that flag missing or stale CRM records',
    ],
    maturityIndicators: {
      beginner: 'Reps manually log all activities and updates in CRM',
      intermediate: 'Some auto-logging from email/calendar; reps fill in gaps',
      advanced: 'AI auto-captures all CRM data from calls, emails, and meetings — reps just review',
    },
  },
  sales_pipeline: {
    detailedDescription: 'Pipeline management and forecasting involves tracking deal progression through sales stages, assessing win probability, identifying at-risk deals, and predicting quarterly revenue outcomes. Accurate forecasting is critical for business planning and resource allocation.',
    aiOpportunity: 'AI agents analyze deal signals (email engagement, meeting cadence, stakeholder involvement) to predict outcomes more accurately than human judgment alone. They identify at-risk deals, recommend actions, and generate bottoms-up forecasts. Humans apply strategic judgment on large deals and account for factors AI can\'t see.',
    exampleTools: [
      { name: 'Clari', url: 'https://www.clari.com/' },
      { name: 'BoostUp', url: 'https://www.boostup.ai/' },
      { name: 'Aviso', url: 'https://www.aviso.com/' },
    ],
    implementationTips: [
      'Use AI-powered deal scoring to objectively assess win probability for every deal',
      'Set up automated alerts for deals showing risk signals (slowing engagement, missing stakeholders)',
      'Compare AI forecast predictions against rep-submitted forecasts to calibrate over time',
    ],
    maturityIndicators: {
      beginner: 'Pipeline managed via spreadsheets and gut-feel forecasting',
      intermediate: 'AI-assisted forecasting with deal-level risk indicators',
      advanced: 'AI-driven pipeline intelligence with predictive analytics, automated alerts, and dynamic forecast models',
    },
  },
  sales_coaching: {
    detailedDescription: 'Sales coaching involves managers helping reps improve their selling skills through deal reviews, call coaching, role-playing, and personalized development plans. Effective coaching is the highest-leverage activity a sales manager can do.',
    aiOpportunity: 'AI can analyze call recordings to identify coaching opportunities, benchmark reps against top performers, suggest specific skill gaps, and track coaching impact over time. The actual coaching — building trust, providing empathetic feedback, motivating through tough stretches — requires human leadership.',
    exampleTools: [
      { name: 'Gong', url: 'https://www.gong.io/' },
      { name: 'ExecVision', url: 'https://www.execvision.io/' },
      { name: 'Mindtickle', url: 'https://www.mindtickle.com/' },
    ],
    implementationTips: [
      'Use AI call analytics to identify specific coaching moments (objection handling, discovery depth)',
      'Let AI benchmark each rep against top performers on key metrics (talk ratio, question count, next steps)',
      'Track coaching session frequency and correlate with rep performance improvements',
    ],
    maturityIndicators: {
      beginner: 'Ad hoc coaching based on manager observation and deal reviews',
      intermediate: 'AI surfaces coaching opportunities from call data; managers deliver feedback',
      advanced: 'Data-driven coaching culture with AI-powered insights, structured programs, and measurable impact',
    },
  },
  sales_renewal: {
    detailedDescription: 'Renewal and upsell conversations involve expanding existing customer relationships by increasing contract value, adding new products/modules, or extending terms. Success requires deep understanding of customer usage, satisfaction, and evolving business needs.',
    aiOpportunity: 'AI can analyze product usage data, health scores, and expansion signals to identify upsell timing and recommend specific products. However, the relationship-dependent conversation — understanding the customer\'s evolving needs, navigating procurement, and building multi-threaded relationships — is human-led.',
    exampleTools: [
      { name: 'Gainsight', url: 'https://www.gainsight.com/' },
      { name: 'ChurnZero', url: 'https://churnzero.net/' },
      { name: 'Vitally', url: 'https://www.vitally.io/' },
    ],
    implementationTips: [
      'Use AI to score accounts by expansion propensity based on usage patterns and health signals',
      'Set up automated alerts when accounts hit usage thresholds that suggest upsell readiness',
      'Let AI generate personalized renewal proposals based on actual usage data and ROI achieved',
    ],
    maturityIndicators: {
      beginner: 'Renewals handled reactively when contracts approach expiration',
      intermediate: 'AI flags expansion opportunities; reps pursue strategically',
      advanced: 'Predictive expansion engine with automated opportunity detection, personalized proposals, and ROI-based pricing',
    },
  },
  sales_winloss: {
    detailedDescription: 'Win/loss analysis involves systematically understanding why deals were won or lost by analyzing CRM data, interviewing buyers, reviewing competitive dynamics, and identifying patterns across the pipeline. Insights drive improvements in messaging, process, and product.',
    aiOpportunity: 'AI can analyze CRM data to identify win/loss patterns by segment, competitor, deal size, and sales process adherence. It summarizes themes from buyer interviews and correlates outcomes with specific sales behaviors. Humans add qualitative context and translate insights into strategic actions.',
    exampleTools: [
      { name: 'Clozd', url: 'https://www.clozd.com/' },
      { name: 'Gong', url: 'https://www.gong.io/' },
      { name: 'Tableau', url: 'https://www.tableau.com/' },
    ],
    implementationTips: [
      'Use AI to automatically categorize loss reasons from CRM notes and call transcripts',
      'Let AI identify statistically significant patterns (which competitors win in which segments)',
      'Create automated win/loss reports that highlight trends for product, marketing, and sales leadership',
    ],
    maturityIndicators: {
      beginner: 'No systematic win/loss analysis — anecdotal feedback only',
      intermediate: 'AI analyzes CRM data for patterns; periodic manual reviews',
      advanced: 'Continuous AI-powered win/loss intelligence with automated insights feeding product and GTM strategy',
    },
  },
  sales_battlecards: {
    detailedDescription: 'Competitive selling with battlecards involves equipping sales reps with real-time competitive positioning, objection handling, and differentiation talking points they can use in live deal situations when prospects bring up alternatives.',
    aiOpportunity: 'AI agents maintain real-time battlecards by monitoring competitor changes (pricing, features, messaging), auto-updating comparison matrices, and surfacing relevant competitive intelligence based on deal context. Humans adapt these insights in live conversations and handle nuanced competitive discussions.',
    exampleTools: [
      { name: 'Klue', url: 'https://klue.com/' },
      { name: 'Crayon', url: 'https://www.crayon.co/' },
      { name: 'Highspot', url: 'https://www.highspot.com/' },
    ],
    implementationTips: [
      'Set up AI-powered battlecards that auto-update when competitor changes are detected',
      'Use AI to surface deal-specific competitive intelligence based on the prospect\'s current vendor',
      'Train AI on successful competitive displacement stories to generate relevant talk tracks',
    ],
    maturityIndicators: {
      beginner: 'Static battlecards updated quarterly, often outdated',
      intermediate: 'AI-monitored competitors with semi-automated battlecard updates',
      advanced: 'Real-time AI-maintained battlecards with deal-specific competitive intelligence',
    },
  },
  sales_meeting_prep: {
    detailedDescription: 'Sales meeting preparation involves researching accounts, reviewing prior interactions, understanding attendee roles, preparing an agenda, and anticipating objections before every customer meeting. Thorough preparation directly correlates with meeting effectiveness.',
    aiOpportunity: 'AI agents auto-compile meeting briefings from CRM data, past call recordings, news, LinkedIn profiles, and competitive intelligence. They suggest talking points, flag unanswered questions from prior meetings, and prepare personalized agendas. Humans review and add strategic context.',
    exampleTools: [
      { name: 'Dooly', url: 'https://www.dooly.ai/' },
      { name: 'Clari Copilot', url: 'https://www.clari.com/' },
      { name: 'Gong', url: 'https://www.gong.io/' },
    ],
    implementationTips: [
      'Set up automated pre-meeting briefings that pull from CRM, past calls, and news',
      'Let AI flag open action items and unanswered questions from previous meetings',
      'Use AI to suggest personalized talking points based on the attendees\' roles and interests',
    ],
    maturityIndicators: {
      beginner: 'Reps manually prep by reviewing CRM notes',
      intermediate: 'AI generates meeting briefs; reps review and add context',
      advanced: 'Auto-generated comprehensive briefs with AI-suggested agenda, talking points, and risk flags',
    },
  },
  sales_followup: {
    detailedDescription: 'Post-meeting follow-up involves sending timely recap emails, tracking promised deliverables, scheduling next steps, and maintaining momentum between meetings. Consistent follow-up is one of the strongest predictors of deal success.',
    aiOpportunity: 'Fully automatable. AI generates meeting summaries from recordings, drafts follow-up emails with key takeaways and next steps, creates calendar invites, and reminds reps of overdue action items — all without manual effort.',
    exampleTools: [
      { name: 'Fireflies.ai', url: 'https://fireflies.ai/' },
      { name: 'Otter.ai', url: 'https://otter.ai/' },
      { name: 'Outreach', url: 'https://www.outreach.io/' },
    ],
    implementationTips: [
      'Use AI to auto-generate and send meeting recap emails within 1 hour of every call',
      'Set up automated next-step reminders that escalate if action items go overdue',
      'Let AI track all commitments made during meetings and surface them in the next briefing',
    ],
    maturityIndicators: {
      beginner: 'Manual follow-ups often delayed or forgotten',
      intermediate: 'AI-drafted follow-ups sent after human review',
      advanced: 'Auto-generated follow-ups with action item tracking and escalation',
    },
  },
  sales_commission: {
    detailedDescription: 'Commission and quota tracking involves monitoring individual and team attainment against targets, calculating variable compensation including accelerators and SPIFs, and providing real-time visibility into earnings.',
    aiOpportunity: 'Fully automatable. Compensation management platforms calculate commissions based on CRM data and comp plan rules, model earnings scenarios, handle plan changes mid-quarter, and generate statements automatically.',
    exampleTools: [
      { name: 'CaptivateIQ', url: 'https://www.captivateiq.com/' },
      { name: 'Spiff', url: 'https://spiff.com/' },
      { name: 'Xactly', url: 'https://www.xactly.com/' },
    ],
    implementationTips: [
      'Implement automated commission calculations that sync with CRM in real-time',
      'Give reps self-service dashboards showing current attainment and projected earnings',
      'Use AI to model earnings scenarios for reps: "if you close X, your commission will be Y"',
    ],
    maturityIndicators: {
      beginner: 'Manual commission calculations in spreadsheets',
      intermediate: 'Automated calculations with basic self-service dashboards',
      advanced: 'Real-time automated comp platform with predictive earnings modeling and what-if scenarios',
    },
  },
  sales_dealdesk: {
    detailedDescription: 'Deal desk coordination involves managing approvals for non-standard deals — custom pricing, extended payment terms, unusual contract structures, or bundled offerings that fall outside standard pricing guidelines.',
    aiOpportunity: 'AI agents pre-screen deals against approval policies, route to the correct approver based on deal characteristics, calculate margin impact, and identify precedents from similar past deals. Humans make the final approval decision on complex or strategic exceptions.',
    exampleTools: [
      { name: 'DealHub', url: 'https://dealhub.io/' },
      { name: 'Salesforce CPQ', url: 'https://www.salesforce.com/products/cpq/' },
      { name: 'Conga', url: 'https://conga.com/' },
    ],
    implementationTips: [
      'Set up AI-powered pre-screening that auto-approves deals within defined parameters',
      'Use AI to surface comparable approved deals when reps request exceptions',
      'Let AI calculate total deal economics (margin, LTV impact) in real-time during deal review',
    ],
    maturityIndicators: {
      beginner: 'Email-based approval chains with manual margin calculations',
      intermediate: 'AI pre-screens and routes deals; human approves exceptions',
      advanced: 'Smart deal desk with auto-approval within guardrails, real-time economics, and precedent matching',
    },
  },
};

// Merge all enrichments from batches
const allEnrichments = { ...enrichments, ...batch1, ...batch2, ...batch3 };

// Apply enrichments to department activities
export function enrichActivities(activities) {
  return activities.map(activity => {
    const extra = allEnrichments[activity.id];
    if (extra) {
      return { ...activity, ...extra };
    }
    return activity;
  });
}
