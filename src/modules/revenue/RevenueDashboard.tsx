import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  PhoneCall, 
  FileText, 
  ArrowUpRight,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_LEADS } from '@/lib/mock-data';

const RevenueDashboard = () => {
  const metrics = {
    newLeads: 12,
    contacted: 8,
    followUpsCompleted: 15,
    discoveryBooked: 4,
    proposalsSent: 3,
    clientsClosed: 2,
    revenueClosed: 24000,
    revenuePending: 58000,
    conversionRate: 16.5,
    dm3Members: 4,
    contentPublished: 6
  };

  const highestValueOpp = MOCK_LEADS.reduce((prev, current) => 
    (prev.opportunityValue > current.opportunityValue) ? prev : current
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">CEO Revenue Dashboard</h2>
          <p className="text-muted-foreground">Weekly performance and pipeline health.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            This Week
          </Button>
          <Button size="sm" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Revenue Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Revenue Closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.revenueClosed.toLocaleString()}</div>
            <div className="flex items-center text-xs mt-1 text-primary-foreground/70">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.revenuePending.toLocaleString()}</div>
            <div className="flex items-center text-xs mt-1 text-amber-600">
              <Target className="h-3 w-3 mr-1" />
              In active negotiation
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <div className="flex items-center text-xs mt-1 text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2.1% improvement
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Discovery Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.discoveryBooked}</div>
            <div className="flex items-center text-xs mt-1 text-muted-foreground">
              47% move to proposal
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Weekly Activities */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Momentum</CardTitle>
            <CardDescription>Activity breakdown for the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <ActivityMetric label="New Leads" value={metrics.newLeads} icon={Users} color="text-blue-500" />
              <ActivityMetric label="Contacted" value={metrics.contacted} icon={TrendingUp} color="text-indigo-500" />
              <ActivityMetric label="Follow-ups" value={metrics.followUpsCompleted} icon={CheckCircle2} color="text-green-500" />
              <ActivityMetric label="Calls Booked" value={metrics.discoveryBooked} icon={PhoneCall} color="text-amber-500" />
              <ActivityMetric label="Proposals" value={metrics.proposalsSent} icon={FileText} color="text-purple-500" />
              <ActivityMetric label="DM3 Growth" value={metrics.dm3Members} icon={Target} color="text-orange-500" />
            </div>
          </CardContent>
        </Card>

        {/* Strategic Insights */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Strategic Insights</CardTitle>
            <CardDescription>CEO-level observations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Highest Value Opportunity</Label>
              <div className="mt-2 flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                <div>
                  <div className="text-sm font-bold">{highestValueOpp.organization}</div>
                  <div className="text-xs text-muted-foreground">{highestValueOpp.contactPerson}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">${highestValueOpp.opportunityValue.toLocaleString()}</div>
                  <Badge variant="outline" className="text-[10px] h-4">{highestValueOpp.status}</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Weakest Pipeline Area</Label>
              <div className="mt-2 p-3 border border-red-100 rounded-lg bg-red-50/30">
                <div className="text-sm font-bold text-red-700">Proposal Follow-up</div>
                <p className="text-xs text-red-600 mt-1">Average response time for proposals has increased to 4.2 days. Immediate focus required.</p>
              </div>
            </div>

            <div className="pt-2">
              <Button className="w-full gap-2">
                <Target className="h-4 w-4" />
                Recommended Next Action
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ActivityMetric = ({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className={`h-4 w-4 ${color}`} />
      <span className="text-xs font-medium uppercase tracking-tight">{label}</span>
    </div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);

const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);

export default RevenueDashboard;
