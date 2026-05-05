import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  ChevronRight,
  User
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_LEADS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Lead } from '@/types';

const FollowUpSystem = () => {
  const [, setActiveTab] = useState('today');
  const todayStr = '2026-05-03';

  const todayFollowUps = MOCK_LEADS.filter(l => l.nextFollowUpDate === todayStr);
  const overdueFollowUps = MOCK_LEADS.filter(l => l.nextFollowUpDate && l.nextFollowUpDate < todayStr);
  const upcomingFollowUps = MOCK_LEADS.filter(l => l.nextFollowUpDate && l.nextFollowUpDate > todayStr);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Follow-Up System</h2>
        <p className="text-muted-foreground">Never let a revenue opportunity go cold.</p>
      </div>

      <Tabs defaultValue="today" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="today" className="relative">
              Today
              {todayFollowUps.length > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                  {todayFollowUps.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue
              {overdueFollowUps.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                  {overdueFollowUps.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Calendar View
          </Button>
        </div>

        <TabsContent value="today" className="space-y-4">
          {todayFollowUps.length === 0 ? (
            <EmptyState message="No follow-ups due today. Great job!" />
          ) : (
            <div className="grid gap-4">
              {todayFollowUps.map(lead => (
                <FollowUpCard key={lead.id} lead={lead} type="today" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          {overdueFollowUps.length === 0 ? (
            <EmptyState message="No overdue follow-ups. You're on top of it!" icon={CheckCircle2} iconClassName="text-green-500" />
          ) : (
            <div className="grid gap-4">
              {overdueFollowUps.map(lead => (
                <FollowUpCard key={lead.id} lead={lead} type="overdue" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingFollowUps.length === 0 ? (
            <EmptyState message="No upcoming follow-ups scheduled." />
          ) : (
            <div className="grid gap-4">
              {upcomingFollowUps.map(lead => (
                <FollowUpCard key={lead.id} lead={lead} type="upcoming" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const FollowUpCard = ({ lead, type }: { lead: Lead, type: string }) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md",
      lead.isHot && "border-l-4 border-l-orange-500"
    )}>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{lead.organization}</h3>
                  {lead.isHot && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none text-[10px]">HOT</Badge>}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>{lead.contactPerson} • {lead.role}</span>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline">{lead.status}</Badge>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Value: ${lead.opportunityValue.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-3 border border-dashed mb-4">
              <div className="flex items-center gap-2 text-xs font-medium mb-1">
                <Clock className="h-3 w-3" />
                <span>RECOMMENDED NEXT ACTION:</span>
              </div>
              <p className="text-sm italic">"{lead.recommendedNextAction}"</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertCircle className={cn(
                "h-3.5 w-3.5",
                type === 'overdue' ? "text-red-500" : "text-blue-500"
              )} />
              <span>{type === 'overdue' ? `Overdue since ${lead.nextFollowUpDate}` : `Due: ${lead.nextFollowUpDate}`}</span>
            </div>
          </div>

          <div className="bg-muted/10 border-t sm:border-t-0 sm:border-l p-4 flex flex-row sm:flex-col justify-center gap-2 min-w-[180px]">
            <Button className="w-full gap-2 text-xs" size="sm">
              <MessageSquare className="h-3.5 w-3.5" />
              Draft Message
            </Button>
            <Button variant="outline" className="w-full gap-2 text-xs" size="sm">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Mark Complete
            </Button>
            <Button variant="ghost" className="w-full gap-2 text-xs" size="sm">
              Reschedule
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ message, icon: Icon = Clock, iconClassName }: { message: string, icon?: any, iconClassName?: string }) => (
  <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl opacity-60">
    <Icon className={cn("h-12 w-12 text-muted-foreground mb-4", iconClassName)} />
    <p className="text-lg font-medium">{message}</p>
    <p className="text-sm text-muted-foreground">Your pipeline is healthy and moving.</p>
  </div>
);

export default FollowUpSystem;
