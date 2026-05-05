import { useState } from 'react';
import { 
  Copy, 
  Check, 
  MessageSquare, 
  Send, 
  RefreshCw,
  Search,
  AlertCircle,
  Linkedin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_LEADS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

const LinkedInOutreach = () => {
  const [selectedLeadId, setSelectedLeadId] = useState(MOCK_LEADS[0].id);
  const [copied, setCopied] = useState(false);
  
  const selectedLead = MOCK_LEADS.find(l => l.id === selectedLeadId) || MOCK_LEADS[0];

  const templates = [
    {
      id: 'connection',
      label: 'Connection Request',
      content: (lead: any) => `Hi ${lead.contactPerson.split(' ')[0]}, I came across ${lead.organization}'s work in the ${lead.type.toLowerCase()} sector and was impressed by your recent initiatives. I'd love to connect and follow your journey. Best, Dr. Celso.`
    },
    {
      id: 'first-message',
      label: 'First Message',
      content: (lead: any) => `Thanks for connecting, ${lead.contactPerson.split(' ')[0]}! I've been helping ${lead.type.toLowerCase()} leaders align their teams and accelerate growth. I'd love to hear more about your current focus at ${lead.organization}.`
    },
    {
      id: 'value-followup',
      label: 'Value Follow-up',
      content: (lead: any) => `Hi ${lead.contactPerson.split(' ')[0]}, I recently shared some thoughts on leadership alignment in ${lead.type.toLowerCase()} organizations that I thought might resonate with what you're doing at ${lead.organization}. Happy to share the resource if you're interested!`
    },
    {
      id: 'call-invite',
      label: 'Soft Call Invite',
      content: (lead: any) => `Hi ${lead.contactPerson.split(' ')[0]}, based on our conversation, I think there's a great opportunity for ${lead.organization} to scale its impact. Would you be open to a brief 15-minute discovery call next week to explore some strategic angles?`
    },
    {
      id: 're-engagement',
      label: 'Re-engagement',
      content: (lead: any) => `Hi ${lead.contactPerson.split(' ')[0]}, it's been a while since we last spoke about ${lead.organization}. I've recently developed a new framework for purpose-driven culture that has been very effective for similar organizations. Worth a quick chat?`
    },
    {
      id: 'thank-you',
      label: 'Thank You',
      content: (lead: any) => `Great speaking with you, ${lead.contactPerson.split(' ')[0]}! I really appreciate the insights you shared about ${lead.organization}. I'm looking forward to our next steps.`
    },
    {
      id: 'post-comment',
      label: 'Post Comment',
      content: (lead: any) => `Hi ${lead.contactPerson.split(' ')[0]}, I really enjoyed your recent post about leadership. It's a topic I'm very passionate about as well, especially in the context of ${lead.type.toLowerCase()} organizations. Keep up the great work!`
    },
    {
      id: 'no-response',
      label: 'No Response Follow-up',
      content: (lead: any) => `Hi ${lead.contactPerson.split(' ')[0]}, just a quick note to bump this to the top of your inbox. I'd still love to explore how we can support ${lead.organization}'s growth goals for this year. Hope you're having a productive week!`
    }
  ];

  const [activeTemplateId, setActiveTemplateId] = useState(templates[0].id);
  const activeTemplate = templates.find(t => t.id === activeTemplateId) || templates[0];
  const draftMessage = activeTemplate.content(selectedLead);

  const handleCopy = () => {
    navigator.clipboard.writeText(draftMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Lead Selector Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Select Lead</CardTitle>
            <div className="relative pt-2">
              <Search className="absolute left-2.5 top-4.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search leads..." className="pl-9 h-9" />
            </div>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-1">
              {MOCK_LEADS.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors flex flex-col gap-1 ${
                    selectedLeadId === lead.id ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate">{lead.organization}</span>
                    {lead.isHot && <Badge className="bg-orange-100 text-orange-700 h-4 text-[10px] px-1">HOT</Badge>}
                  </div>
                  <span className="text-xs text-muted-foreground truncate">{lead.contactPerson}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drafting Area */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="border-b bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{selectedLead.contactPerson}</CardTitle>
                  <CardDescription>{selectedLead.role} @ {selectedLead.organization}</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="h-6">
                Status: {selectedLead.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="connection" onValueChange={setActiveTemplateId} className="space-y-6">
              <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 justify-start">
                {templates.map(t => (
                  <TabsTrigger 
                    key={t.id} 
                    value={t.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border text-xs py-2 px-3 h-9"
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Draft Message</Label>
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-2" onClick={() => {}}>
                    <RefreshCw className="h-3 w-3" />
                    Regenerate
                  </Button>
                </div>
                <div className="relative">
                  <textarea
                    className="w-full min-h-[150px] p-4 rounded-md border bg-muted/10 text-sm focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    value={draftMessage}
                    readOnly
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="opacity-70 text-[10px]">AI-Generated</Badge>
                  </div>
                </div>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-muted/5 pt-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Copy and send manually on LinkedIn.</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopy} className="gap-2">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy to Clipboard'}
              </Button>
              <Button className="gap-2" onClick={() => window.open(selectedLead.linkedinUrl, '_blank')}>
                Open LinkedIn Profile
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Strategic Context */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Strategic Outreach Context
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2 text-muted-foreground">
            <p>• <strong>Pain Point:</strong> Potential leadership culture issues in {selectedLead.organization}.</p>
            <p>• <strong>Angle:</strong> Position as a strategic advisor who understands {selectedLead.type.toLowerCase()} dynamics.</p>
            <p>• <strong>Goal:</strong> Move from connection to discovery call within 3 interactions.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LinkedInOutreach;
