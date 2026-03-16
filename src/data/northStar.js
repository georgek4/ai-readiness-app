export const maturityLevels = [
  { level: 1, name: 'Analog', description: 'No AI usage. All work done manually or with basic tools.' },
  { level: 2, name: 'Experimenting', description: 'Individuals experimenting with AI tools informally (ChatGPT, Copilot). No org strategy.' },
  { level: 3, name: 'Adopting', description: 'Department has identified AI use cases, is using AI tools for specific workflows, and has basic governance.' },
  { level: 4, name: 'Scaling', description: 'AI agents are deployed across most automatable/agentifiable workflows. Humans focus on humanized activities. Clear metrics track AI impact.' },
  { level: 5, name: 'Transforming', description: 'AI is deeply integrated into all operations. Organization has reimagined roles, workflows, and value creation around human-AI collaboration.' },
];

export const northStarTargets = {
  marketing: { level: 4.5, transformation: 'AI agents handle all content drafting, campaign optimization, lead scoring. Humans focus on strategy, brand, creativity, and relationships.' },
  sales: { level: 4.0, transformation: 'AI handles all research, outreach personalization, CRM hygiene, forecasting. Humans focus on discovery, negotiation, relationships.' },
  presales: { level: 3.5, transformation: 'AI handles RFP/RFI responses, demo data prep, competitive matrices. Humans own technical discovery, live demos, architecture.' },
  professional_services: { level: 3.5, transformation: 'AI handles project reporting, data migration mapping, status tracking. Humans own customer relationships, complex integrations, training.' },
  value_engineering: { level: 3.5, transformation: 'AI builds first-draft business cases and tracks realization. Humans own executive conversations and strategic value framing.' },
  product_management: { level: 3.5, transformation: 'AI handles analytics, spec drafting, market monitoring. Humans own vision, strategy, customer relationships, prioritization.' },
  engineering: { level: 4.5, transformation: 'AI writes significant code, handles testing, monitoring, and dependency management. Humans own architecture, complex problem-solving, mentoring.' },
  product_design: { level: 3.0, transformation: 'AI assists with wireframing, accessibility auditing, documentation. Humans own research, creative vision, design critique.' },
  customer_education: { level: 4.0, transformation: 'AI generates and localizes content, manages LMS, answers routine questions. Humans own curriculum strategy, live training, certification.' },
  demo_engineering: { level: 4.0, transformation: 'AI handles environment provisioning, data generation, analytics. Humans own narrative design and custom enterprise demos.' },
  industry_strategy: { level: 3.0, transformation: 'AI monitors trends and aggregates data. Humans own thought leadership, relationships, strategic advice.' },
  revenue_operations: { level: 4.5, transformation: 'AI handles data hygiene, reporting, forecasting, routing. Humans own process design, territory strategy, tech stack decisions.' },
  enablement: { level: 3.5, transformation: 'AI delivers micro-learning, coaching insights, content recommendations. Humans own program design, live training, coaching culture.' },
  customer_success: { level: 4.0, transformation: 'AI handles health scoring, digital engagement, renewal tracking, and QBR prep. Humans own strategic relationships, executive alignment, and complex save plays.' },
  support: { level: 4.5, transformation: 'AI handles ticket triage, Tier 1 resolution, knowledge base generation, and SLA monitoring. Humans own complex troubleshooting, incident management, and customer empathy.' },
  c_suite: { level: 3.5, transformation: 'AI handles market intelligence, financial modeling, board material drafting, and KPI monitoring. Executives own vision, strategy, culture, relationships, and high-stakes decision-making.' },
};

export const tierDefinitions = [
  { name: 'Analog', min: 0, max: 20, color: '#6B7280', description: 'No meaningful AI adoption' },
  { name: 'Experimenter', min: 20.01, max: 40, color: '#F59E0B', description: 'Beginning to explore AI tools' },
  { name: 'Adopter', min: 40.01, max: 60, color: '#3B82F6', description: 'Actively using AI in workflows' },
  { name: 'Scaler', min: 60.01, max: 80, color: '#8B5CF6', description: 'AI integrated across most workflows' },
  { name: 'Transformer', min: 80.01, max: 100, color: '#10B981', description: 'AI-first mindset and operations' },
];

export const getTierForScore = (score) => {
  // Use threshold-based matching to avoid gaps between tier ranges
  if (score > 80) return tierDefinitions[4];  // Transformer
  if (score > 60) return tierDefinitions[3];  // Scaler
  if (score > 40) return tierDefinitions[2];  // Adopter
  if (score > 20) return tierDefinitions[1];  // Experimenter
  return tierDefinitions[0];                  // Analog
};
