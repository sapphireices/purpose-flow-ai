import { useState } from 'react';
import { 
  Sparkles, 
  User, 
  Building2, 
  Globe, 
  FileText,
  Lightbulb,
  AlertTriangle,
  Copy,
  Check,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LeadResearchAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [researched, setResearched] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleResearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResearched(true);
    }, 1500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Lead Research Assistant</h2>
        <p className="text-muted-foreground">Deep research and strategic positioning for any prospect.</p>
      </div>

      {!researched ? (
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Start New Research
            </CardTitle>
            <CardDescription>Enter as much detail as you have. AI will fill the gaps and provide strategic angles.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="org">Organization Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="org" placeholder="e.g. Acme Corp" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Name</Label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="contact" placeholder="e.g. John Doe" className="pl-9" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <div className="relative">
                <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="website" placeholder="https://example.com" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes or LinkedIn Profile Text (optional)</Label>
              <textarea
                id="notes"
                className="w-full min-h-[120px] p-3 rounded-md border text-sm focus:ring-1 focus:ring-primary outline-none"
                placeholder="Paste LinkedIn bio, recent posts, or your own notes here..."
              />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t justify-end py-4">
            <Button onClick={handleResearch} disabled={loading} className="gap-2 px-8">
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent animate-spin rounded-full" />
                  Researching...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Strategic Profile
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Summary Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    JD
                  </div>
                  <div>
                    <CardTitle className="text-base">John Doe</CardTitle>
                    <CardDescription>VP of Operations @ Acme</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="space-y-1">
                  <Label className="text-[10px] text-muted-foreground uppercase">Industry</Label>
                  <p className="text-sm font-medium">Enterprise Software</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] text-muted-foreground uppercase">Company Size</Label>
                  <p className="text-sm font-medium">500-1000 employees</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] text-muted-foreground uppercase">Recent News</Label>
                  <p className="text-xs">Acquired TechStart Inc. 3 months ago; Currently scaling their leadership team.</p>
                </div>
                <Button variant="outline" className="w-full text-xs" onClick={() => setResearched(false)}>
                  New Research
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-orange-50/50 border-orange-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="h-4 w-4" />
                  Key Pain Points
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-orange-800">
                <p>• Post-merger cultural misalignment between teams.</p>
                <p>• Rapid growth outpacing leadership development.</p>
                <p>• Potential Stakeholder friction in new product direction.</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="positioning">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                <TabsTrigger value="positioning" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 font-semibold">Strategic Positioning</TabsTrigger>
                <TabsTrigger value="outreach" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 font-semibold">Outreach Drafts</TabsTrigger>
                <TabsTrigger value="discovery" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 font-semibold">Discovery Prep</TabsTrigger>
              </TabsList>

              <TabsContent value="positioning" className="pt-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <PositioningCard 
                    title="Best Service Angle" 
                    icon={Target} 
                    content="Focus on Team Alignment Consulting. Given their recent acquisition, bridging the gap between legacy and new leadership is their #1 priority."
                  />
                  <PositioningCard 
                    title="Recommended Offer" 
                    icon={FileText} 
                    content="2-Day Strategic Alignment Workshop followed by a 90-day Executive Coaching retainer for the integration team."
                  />
                </div>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Why they are a good fit</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    John has publicly spoken about the challenges of scaling culture. Dr. Celso's 'Purpose-Driven Culture' framework directly addresses the operational friction Acme is experiencing post-acquisition. They have the budget (Enterprise) and an urgent timeline (post-merger).
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="outreach" className="pt-6 space-y-4">
                <OutreachBox 
                  label="Initial Connection Request"
                  content={`Hi John, I've been following Acme's integration of TechStart. Great to see the progress. I've helped several enterprise leaders navigate the "culture cliff" that often follows a merger. Would love to connect and follow your journey. Best, Dr. Celso.`}
                  onCopy={(text) => handleCopy(text, 'outreach1')}
                  isCopied={copied === 'outreach1'}
                />
                <OutreachBox 
                  label="Value-Based Follow-up"
                  content={`John, following our connection, I thought you might find this framework on "Team Alignment During M&A" useful. I recently implemented this with a 800-person org facing similar scaling friction. Happy to chat if it resonates.`}
                  onCopy={(text) => handleCopy(text, 'outreach2')}
                  isCopied={copied === 'outreach2'}
                />
              </TabsContent>

              <TabsContent value="discovery" className="pt-6 space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    High-Impact Discovery Questions
                  </h4>
                  <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
                    <li>"How has the recent acquisition affected the day-to-day decision-making speed?"</li>
                    <li>"What is the biggest cultural friction point between the original Acme team and the TechStart team?"</li>
                    <li>"If we don't align these teams in the next 6 months, what's the biggest operational risk?"</li>
                  </ul>
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="text-sm font-bold flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    Likely Objections
                  </h4>
                  <p className="text-xs text-muted-foreground italic">"We're too busy with the integration right now to do a workshop."</p>
                  <p className="text-sm text-muted-foreground"><strong>Rebuttal:</strong> Position the workshop as a "time-generator" — by fixing the alignment now, they save hundreds of hours of friction-induced meetings later.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

const PositioningCard = ({ title, icon: Icon, content }: { title: string, icon: any, content: string }) => (
  <Card className="bg-muted/10">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
    </CardContent>
  </Card>
);

const OutreachBox = ({ label, content, onCopy, isCopied }: { label: string, content: string, onCopy: (t: string) => void, isCopied: boolean }) => (
  <div className="space-y-2">
    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
    <div className="relative group">
      <div className="p-4 bg-muted/30 rounded-lg text-sm border border-dashed italic pr-12">
        "{content}"
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 h-8 w-8"
        onClick={() => onCopy(content)}
      >
        {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  </div>
);

export default LeadResearchAssistant;
