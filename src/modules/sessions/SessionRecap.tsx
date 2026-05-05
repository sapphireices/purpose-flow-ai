import { useState } from 'react';
import { 
  Lightbulb, 
  ListChecks, 
  Sparkles,
  ClipboardList,
  Target,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const SessionRecap = () => {
  const [sessionType, setSessionType] = useState<'individual' | 'corporate'>('individual');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Session Recap Agent</h2>
          <p className="text-muted-foreground">Turn raw notes into professional action plans.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          <Button 
            variant={sessionType === 'individual' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setSessionType('individual')}
            className="text-xs"
          >
            Individual
          </Button>
          <Button 
            variant={sessionType === 'corporate' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setSessionType('corporate')}
            className="text-xs"
          >
            Corporate
          </Button>
        </div>
      </div>

      {!generated ? (
        <Card className="border-indigo-100 shadow-md">
          <CardHeader className="bg-indigo-50/30 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-indigo-600" />
              New Session Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client / Organization</Label>
              <Input id="client" placeholder="e.g. Sarah Jenkins / TechCorp" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Raw Meeting Notes</Label>
              <textarea
                id="notes"
                className="w-full min-h-[250px] p-4 rounded-md border text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="Paste your rough notes, transcript highlights, or thoughts here..."
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={handleGenerate} disabled={loading} className="gap-2 px-8 bg-indigo-600 hover:bg-indigo-700">
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Action Plan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Analysis Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-medium">Session Insight</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="space-y-1">
                  <Label className="text-[10px] text-muted-foreground uppercase">Key Breakthrough</Label>
                  <p className="text-sm font-medium text-indigo-700">Identified "Legacy Fear" as the primary barrier to team innovation.</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] text-muted-foreground uppercase">Tone Check</Label>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">High Energy</Badge>
                </div>
                <Button variant="outline" className="w-full text-xs" onClick={() => setGenerated(false)}>
                  New Recap
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-amber-50/50 border-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-amber-700">
                  <Target className="h-4 w-4" />
                  Next-Session Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-amber-800 italic">
                Developing the "Safe Failure" framework and presenting it to the executive team for buy-in.
              </CardContent>
            </Card>
          </div>

          {/* Detailed Recap */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="recap">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                <TabsTrigger value="recap" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-0 pb-2 font-semibold">Executive Summary</TabsTrigger>
                <TabsTrigger value="actions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-0 pb-2 font-semibold">Action Items</TabsTrigger>
                <TabsTrigger value="email" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-0 pb-2 font-semibold">Follow-up Email</TabsTrigger>
              </TabsList>

              <TabsContent value="recap" className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-indigo-600" />
                      Key Insights
                    </h4>
                    <ul className="mt-2 text-sm space-y-2 text-muted-foreground list-disc pl-5">
                      <li>The team is aligned on "What" but lacks clarity on "Why".</li>
                      <li>Communication bottlenecks are occurring at the mid-manager level.</li>
                      <li>Sarah is ready for a larger scope of responsibility.</li>
                    </ul>
                  </div>
                  {sessionType === 'corporate' && (
                    <div>
                      <h4 className="text-sm font-bold flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        Strategic Risks
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground">The upcoming Q4 goal is likely unattainable given the current resourcing gaps identified during the meeting.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="actions" className="pt-6 space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-green-600" />
                    Immediate Next Steps
                  </h4>
                  <div className="grid gap-3">
                    <ActionItem 
                      text="Draft the new communication protocol for the engineering team." 
                      owner="Sarah" 
                      due="Friday"
                    />
                    <ActionItem 
                      text="Complete the 'Energy Audit' worksheet before our next call." 
                      owner="Client" 
                      due="Tuesday"
                    />
                    <ActionItem 
                      text="Send the team alignment survey to the operations group." 
                      owner="Dr. Celso" 
                      due="Monday"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="email" className="pt-6">
                <Card>
                  <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium">Accountability Email Draft</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleCopy("Momentum & Action Plan: Our Session Today...", "email1")}
                      className="h-8 text-xs gap-2"
                    >
                      {copied === 'email1' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      Copy
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg border border-dashed whitespace-pre-wrap font-sans">
                      {`Subject: Momentum & Action Plan: Our Session Today\n\nHi [Name],\n\nGreat session today. I was particularly struck by our conversation regarding [Key Insight].\n\nAs we discussed, here are your focused action steps for this week:\n• [Action 1]\n• [Action 2]\n\nI have also attached the [Asset Name] we mentioned. Our next session is scheduled for [Date] at [Time].\n\nKeep moving forward with purpose!\n\nDr. Celso`}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

const ActionItem = ({ text, owner, due }: { text: string, owner: string, due: string }) => (
  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
    <div className="flex-1">
      <p className="text-sm font-medium">{text}</p>
    </div>
    <div className="flex gap-2 ml-4">
      <Badge variant="secondary" className="text-[10px]">{owner}</Badge>
      <Badge variant="outline" className="text-[10px]">Due: {due}</Badge>
    </div>
  </div>
);

export default SessionRecap;
