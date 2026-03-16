export const classifications = {
  humanize: {
    id: 'humanize',
    name: 'Humanize',
    symbol: 'H',
    color: '#10B981',
    bgColor: '#10B98120',
    description: 'Requires human judgment, empathy, creativity, strategic thinking, or relationship-building. AI may assist but a human must lead.',
    examples: ['Executive negotiations', 'Creative strategy', 'Organizational design', 'Crisis leadership', 'Customer empathy'],
  },
  agentify: {
    id: 'agentify',
    name: 'Agentify',
    symbol: 'A',
    color: '#F59E0B',
    bgColor: '#F59E0B20',
    description: 'Can be delegated to an AI agent that operates semi-autonomously with human oversight. The agent handles execution; a human reviews, approves, or intervenes.',
    examples: ['Content drafting with editing', 'Lead scoring with review', 'Code review suggestions', 'Proposal first-drafts'],
  },
  automate: {
    id: 'automate',
    name: 'Automate',
    symbol: 'R',
    color: '#EF4444',
    bgColor: '#EF444420',
    description: 'Can be fully automated with no human in the loop for routine execution. Set up once, monitor periodically.',
    examples: ['Data entry', 'Report generation', 'Meeting scheduling', 'Log monitoring', 'CRM field updates'],
  },
};

export const getClassification = (id) => classifications[id];
