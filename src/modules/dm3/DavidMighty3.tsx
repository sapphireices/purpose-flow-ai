import { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  Sword, 
  Anchor,
  Copy,
  Check,
  Send,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_LEADS } from '@/lib/mock-data';
import { LeadType } from '@/types';

const DavidMighty3 = () => {
  const dm3Leads = MOCK_LEADS.filter(l => l.type === LeadType.DM3);
  const [selectedLeadId, setSelectedLeadId] = useState(dm3Leads[0]?.id || '');
  const [copied, setCopied] = useState(false);

  const selectedLead = dm3Leads.find(l => l.id === selectedLeadId);

  const templates = [
    {
      id: 'welcome',
      label: 'Welcome Message',
      icon: Heart,
      content: (lead: any) => `Welcome to David's Mighty 3, ${lead.contactPerson.split(' ')[0]}! We are honored to have you join this community of faith-driven leaders. Your journey toward greater purpose and impact starts here. Let's sharpen one another.`
    },
    {
      id: 'skool-post',
      label: 'Weekly Skool Post',
      icon: MessageSquare,
      content: (_lead: any) => `SHARPENING MOMENT: This week, let's focus on 'The Heart of a Leader.' Just as David was a man after God's own heart, we are called to lead with integrity and devotion. What is one area where you are seeking more alignment this week?`
    },
    {
      id: 'prayer-room',
      label: 'Prayer Room Prompt',
      icon: Anchor,
      content: (_lead: any) => `PRAYER ROOM: Today we are lifting up the visionaries in this community. May you receive clarity, strength, and divine favor as you lead your families and organizations. 'Commit your work to the Lord, and your plans will be established.' (Proverbs 16:3)`
    },
    {
      id: 'mentorship-invite',
      label: 'Mentorship Invite',
      icon: ShieldCheck,
      content: (lead: any) => `Hi ${lead.contactPerson.split(' ')[0]}, I've seen your heart for growth in David's Mighty 3. I'd love to invite you to our Deep Mentorship pathway where we dive even deeper into spiritual and strategic alignment. Would you like to hear more?`
    },
    {
      id: 'testimony-request',
      label: 'Testimony Request',
      icon: Sword,
      content: (lead: any) => `Hi ${lead.contactPerson.split(' ')[0]}, your journey has been such an encouragement to the community. Would you be willing to share a brief testimony of how you've seen God move in your leadership recently? It would sharpen us all.`
    }
  ];

  const [activeTab, setActiveTab] = useState('welcome');
  const activeTemplate = templates.find(t => t.id === activeTab) || templates[0];
  const draftMessage = selectedLead ? activeTemplate.content(selectedLead) : "Select a DM3 lead to generate a message.";

  const handleCopy = () => {
    navigator.clipboard.writeText(draftMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">David's Mighty 3 Growth Agent</h2>
          <p className="text-muted-foreground">Faith-driven mentorship and community engagement.</p>
        </div>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Members List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-500" />
              Community Members
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-1">
              {dm3Leads.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors flex flex-col gap-1 ${
                    selectedLeadId === lead.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : 'hover:bg-muted'
                  }`}
                >
                  <span className="font-medium text-sm">{lead.contactPerson}</span>
                  <span className="text-xs text-muted-foreground">{lead.source} • Joined {lead.createdAt}</span>
                </button>
              ))}
              {dm3Leads.length === 0 && (
                <p className="text-sm text-muted-foreground p-4 text-center">No DM3 members found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Growth Tools */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-indigo-100">
            <CardHeader className="bg-indigo-50/50 border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-base">Growth & Engagement Agent</CardTitle>
                  <CardDescription>Generate faith-driven content and outreach.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="welcome" onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
                  {templates.map(t => (
                    <TabsTrigger 
                      key={t.id} 
                      value={t.id}
                      className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white border text-xs py-2 px-3"
                    >
                      <t.icon className="h-3.5 w-3.5 mr-2" />
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-indigo-900">Message Draft</span>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      Faith-Driven Tone
                    </Badge>
                  </div>
                  <div className="relative">
                    <textarea
                      className="w-full min-h-[150px] p-4 rounded-md border border-indigo-100 bg-indigo-50/10 text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none italic leading-relaxed"
                      value={draftMessage}
                      readOnly
                    />
                  </div>
                </div>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-indigo-50/10 pt-6">
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                Empowering leaders for kingdom impact.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCopy} className="gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy Draft'}
                </Button>
                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                  Share to Skool
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* DM3 Strategy */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Weekly Activation Focus</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                <p className="mb-2">• <strong>Monday:</strong> Prayer & Vision</p>
                <p className="mb-2">• <strong>Wednesday:</strong> Sharpening Room</p>
                <p>• <strong>Friday:</strong> Victory Reports</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Funnel Status</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                <p className="mb-2">• <strong>Community:</strong> 42 members</p>
                <p className="mb-2">• <strong>Active Mentorship:</strong> 8 members</p>
                <p>• <strong>Referrals:</strong> 12 this month</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DavidMighty3;
