export const LeadType = {
  Corporate: 'Corporate',
  Coaching: 'Coaching',
  Church: 'Church',
  School: 'School',
  Nonprofit: 'Nonprofit',
  University: 'University',
  Speaking: 'Speaking',
  DM3: "David's Mighty 3",
  ScriptorStudio: 'ScriptorStudio.net',
  Other: 'Other'
} as const;

export type LeadTypeValue = typeof LeadType[keyof typeof LeadType];

export const LeadStatus = {
  New: 'New',
  Researched: 'Researched',
  ContactDrafted: 'Contact Drafted',
  Contacted: 'Contacted',
  Replied: 'Replied',
  CallBooked: 'Call Booked',
  DiscoveryCompleted: 'Discovery Completed',
  ProposalNeeded: 'Proposal Needed',
  ProposalSent: 'Proposal Sent',
  FollowUpNeeded: 'Follow-Up Needed',
  Negotiation: 'Negotiation',
  ClosedWon: 'Closed Won',
  ClosedLost: 'Closed Lost',
  NurtureLater: 'Nurture Later'
} as const;

export type LeadStatusValue = typeof LeadStatus[keyof typeof LeadStatus];

export interface Lead {
  id: string;
  name: string;
  organization: string;
  contactPerson: string;
  role: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  website: string;
  type: LeadTypeValue;
  source: string;
  status: LeadStatusValue;
  opportunityValue: number;
  offerInterest: string[];
  notes: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  recommendedNextAction: string;
  isHot: boolean;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  leadId: string;
  dueDate: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  actionType: 'LinkedIn' | 'Email' | 'Call' | 'Meeting';
  notes?: string;
}

export interface Proposal {
  id: string;
  leadId: string;
  title: string;
  value: number;
  sentDate: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
  fileUrl?: string;
}

export interface RevenueMetrics {
  totalPipelineValue: number;
  weightedPipelineValue: number;
  closedWonTotal: number;
  conversionRate: number;
  newLeadsCount: number;
}

export interface DashboardStats {
  newLeadsThisWeek: number;
  hotLeadsCount: number;
  followUpsDueToday: number;
  overdueFollowUps: number;
  discoveryCallsBooked: number;
  proposalsSent: number;
  revenueOpportunitiesTotal: number;
  dm3NewMembers: number;
}

export interface DailyPriority {
  id: string;
  action: string;
  reason: string;
  leadId?: string;
  priority: 'High' | 'Medium' | 'Low';
}
