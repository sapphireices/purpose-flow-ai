import React from 'react';
import { 
  Users, 
  Flame, 
  Clock, 
  AlertCircle, 
  PhoneCall, 
  FileText, 
  DollarSign, 
  UserPlus,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MOCK_LEADS, MOCK_PRIORITIES } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LeadStatus } from '@/types';

const Dashboard = () => {
  // Simple calculations for stats from mock data
  const stats = {
    newLeads: MOCK_LEADS.length,
    hotLeads: MOCK_LEADS.filter(l => l.isHot).length,
    followUpsToday: MOCK_LEADS.filter(l => l.nextFollowUpDate === '2026-05-03').length,
    overdue: MOCK_LEADS.filter(l => l.nextFollowUpDate && l.nextFollowUpDate < '2026-05-03').length,
    callsBooked: MOCK_LEADS.filter(l => l.status === LeadStatus.CallBooked).length,
    proposalsSent: MOCK_LEADS.filter(l => l.status === LeadStatus.ProposalSent).length,
    revenueTotal: MOCK_LEADS.reduce((acc, l) => acc + l.opportunityValue, 0),
    dm3Members: 42, // Static mock for now
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">CEO Command Center</h2>
        <p className="text-muted-foreground">
          Welcome back, Dr. Celso. Here is your revenue momentum for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="New Leads (Week)" 
          value={stats.newLeads} 
          icon={Users} 
          description="+3 from yesterday" 
        />
        <StatCard 
          title="Hot Leads" 
          value={stats.hotLeads} 
          icon={Flame} 
          description="High intent prospects" 
          iconClassName="text-orange-500"
        />
        <StatCard 
          title="Follow-Ups Due Today" 
          value={stats.followUpsToday} 
          icon={Clock} 
          description="Move the conversation" 
          iconClassName="text-blue-500"
        />
        <StatCard 
          title="Overdue" 
          value={stats.overdue} 
          icon={AlertCircle} 
          description="Action required" 
          iconClassName="text-red-500"
        />
        <StatCard 
          title="Calls Booked" 
          value={stats.callsBooked} 
          icon={PhoneCall} 
          description="Discovery scheduled" 
        />
        <StatCard 
          title="Proposals Sent" 
          value={stats.proposalsSent} 
          icon={FileText} 
          description="Awaiting signature" 
        />
        <StatCard 
          title="Revenue Pipeline" 
          value={`$${(stats.revenueTotal / 1000).toFixed(1)}k`} 
          icon={DollarSign} 
          description="Total potential" 
          iconClassName="text-green-600"
        />
        <StatCard 
          title="DM3 New Members" 
          value={stats.dm3Members} 
          icon={UserPlus} 
          description="Last 30 days" 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Top 5 Priorities */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Today's Priority Actions</CardTitle>
            <CardDescription>What you should do today to move revenue forward.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_PRIORITIES.map((priority) => (
                <div key={priority.id} className="flex items-start gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors group">
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                    priority.priority === 'High' ? 'bg-red-500' : 
                    priority.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{priority.action}</p>
                    <p className="text-xs text-muted-foreground">{priority.reason}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-xs">Done</span>
                    </Button>
                    <Button size="sm" className="h-8 text-xs">Action</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Closest to Closing */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Closest to Closing</CardTitle>
            <CardDescription>Highest probability conversions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_LEADS.filter(l => ([LeadStatus.Negotiation, LeadStatus.ProposalSent, LeadStatus.ProposalNeeded] as string[]).includes(l.status)).slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{lead.organization}</p>
                      <span className="text-sm font-bold text-green-600">${lead.opportunityValue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{lead.contactPerson}</p>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 leading-none">{lead.status}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" size="sm">
                View Full Pipeline
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description: string;
  iconClassName?: string;
}

const StatCard = ({ title, value, icon: Icon, description, iconClassName }: StatCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium tracking-tight text-muted-foreground">{title}</h3>
        <Icon className={cn("h-4 w-4", iconClassName)} />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;
