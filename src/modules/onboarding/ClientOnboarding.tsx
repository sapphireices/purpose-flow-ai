import { useState } from 'react';
import { 
  UserCheck, 
  Building2, 
  Mail, 
  ListTodo, 
  Calendar, 
  FileText, 
  Rocket,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ClientOnboarding = () => {
  const [clientType, setClientType] = useState<'individual' | 'corporate'>('individual');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const assets = clientType === 'individual' ? [
    { id: 'welcome', label: 'Welcome Email', icon: Mail, content: "Hi [Name],\n\nWelcome to your transformation journey! I am honored to partner with you. Our first step is to complete the intake questionnaire so we can hit the ground running in our kickoff session.\n\nNext steps:\n1. Complete the intake form [Link]\n2. Book your first 4 sessions [Link]\n3. Review the goal-setting worksheet attached.\n\nTo your growth,\nDr. Celso" },
    { id: 'intake', label: 'Intake Questions', icon: ListTodo, content: "1. What are the top 3 challenges you are currently facing in your leadership?\n2. If we achieved everything you wanted in the next 6 months, what would that look like?\n3. What is your current spiritual alignment/practice?\n4. What are your primary 'energy drainers' right now?" },
    { id: 'kickoff', label: 'Kickoff Agenda', icon: Calendar, content: "1. Vision Casting: Defining your 'North Star'.\n2. Goal Alignment: Mapping the next 90 days.\n3. Logistics: Cadence, communication, and accountability.\n4. Immediate Action: One thing to change this week." },
    { id: 'plan', label: '30-Day Action Plan', icon: Rocket, content: "Week 1: Audit of current leadership habits.\nWeek 2: Defining core values and purpose statement.\nWeek 3: Identifying team alignment gaps.\nWeek 4: Implementation of new decision-making framework." }
  ] : [
    { id: 'corp-welcome', label: 'Corporate Welcome', icon: Building2, content: "Dear [Executive Name],\n\nWe are excited to begin the Strategic Team Alignment project with [Organization Name]. This process is designed to unify your leadership team around a shared purpose and accelerate your growth trajectory.\n\nPlease find the project timeline and stakeholder intake survey attached.\n\nBest regards,\nDr. Celso Nolberto" },
    { id: 'stakeholder', label: 'Stakeholder Intake', icon: UserCheck, content: "1. What are the primary strategic goals for the organization this fiscal year?\n2. Where do you see the most significant 'alignment drift' in your senior team?\n3. How would you describe the current culture in 3 words?\n4. What is the #1 outcome you expect from this consulting engagement?" },
    { id: 'survey', label: 'Pre-Training Survey', icon: FileText, content: "1. Rate your current team's clarity on organizational purpose (1-10).\n2. Do you feel your daily tasks align with the long-term strategy?\n3. What is one thing you would change about how the leadership team communicates?" },
    { id: 'kickoff-exec', label: 'Executive Kickoff', icon: Calendar, content: "1. Alignment on Project Outcomes.\n2. Timeline & Milestones Review.\n3. Stakeholder Roles & Responsibilities.\n4. Logistics for Team Workshops." }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Client Onboarding Agent</h2>
          <p className="text-muted-foreground">Seamless transition from proposal to partnership.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          <Button 
            variant={clientType === 'individual' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setClientType('individual')}
            className="text-xs"
          >
            Individual
          </Button>
          <Button 
            variant={clientType === 'corporate' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setClientType('corporate')}
            className="text-xs"
          >
            Corporate
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Assets Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-medium">Onboarding Assets</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                {assets.map(asset => (
                  <button
                    key={asset.id}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors flex items-center gap-3"
                  >
                    <asset.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{asset.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-primary">Onboarding Status</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pending Kickoff</span>
                <Badge variant="outline" className="h-5 text-[10px]">3 Clients</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Intake Received</span>
                <Badge variant="outline" className="h-5 text-[10px]">2 Clients</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Viewer */}
        <div className="lg:col-span-3 space-y-6">
          {assets.map(asset => (
            <Card key={asset.id} className="group">
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0 bg-muted/20 border-b">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <asset.icon className="h-4 w-4 text-primary" />
                    {asset.label}
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs gap-2"
                    onClick={() => handleCopy(asset.content, asset.id)}
                  >
                    {copied === asset.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied === asset.id ? 'Copied' : 'Copy'}
                  </Button>
                  <Button size="sm" className="h-8 text-xs gap-2">
                    <Send className="h-3.5 w-3.5" />
                    Send Now
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <pre className="text-sm font-sans whitespace-pre-wrap leading-relaxed text-muted-foreground p-4 bg-muted/30 rounded-lg border border-dashed">
                  {asset.content}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientOnboarding;
