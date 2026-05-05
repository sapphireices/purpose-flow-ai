import { useState } from 'react';
import { 
  Linkedin, 
  Building2, 
  Mail, 
  Video, 
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Zap,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const ContentRepurposer = () => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleRepurpose = () => {
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

  const channels = [
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-600', content: "Leadership isn't about having the right answers; it's about asking the right questions.\n\nIn my session with an executive team this morning, we discovered that 80% of their friction wasn't technical—it was cultural. The 'North Star' was clear, but the 'Why' was buried under legacy fear.\n\nAre you leading from purpose or from precedent? #Leadership #Culture #PurposeFlow" },
    { id: 'corporate', label: 'Thought-Leadership', icon: Building2, color: 'text-indigo-600', content: "THE CULTURE CLIFF: Why Acquisitions Often Fail at the Mid-Manager Level.\n\nMost M&A strategy focuses on the balance sheet. The real failure point is the 'Alignment Drift' that occurs when legacy cultures clash. Here is my 3-part framework for navigating post-merger integration..." },
    { id: 'skool', label: 'DM3 Activation', icon: ShieldCheck, color: 'text-indigo-500', content: "MIGHTY 3 ACTIVATION: David's strength didn't come from his army, but from his alignment. Are you sharpening your fellow leaders today? Drop one victory from your week below!" },
    { id: 'newsletter', label: 'Newsletter', icon: Mail, color: 'text-red-500', content: "Subject: The Power of Purpose-Driven Culture\n\nDear [Name],\n\nThis week, I've been reflecting on the concept of 'Safe Failure.' In many organizations, the fear of making a mistake is the primary barrier to innovation..." },
    { id: 'video', label: 'Short Video Script', icon: Video, color: 'text-pink-500', content: "[Hook]: Most leaders are running at 100mph in the wrong direction.\n[Body]: I see it every day. You're busy. Your team is busy. But are you moving the needle? Here's how to check if your activity is actually impact..." }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Repurposing Agent</h2>
          <p className="text-muted-foreground">One idea, infinite assets. Amplify your authority.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          Content Strategy
        </Button>
      </div>

      {!generated ? (
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              New Content Source
            </CardTitle>
            <CardDescription>Paste your raw idea, transcript, or session notes to repurpose.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="source">Content Source (Transcript / Notes / Link)</Label>
              <textarea
                id="source"
                className="w-full min-h-[300px] p-4 rounded-md border text-sm focus:ring-1 focus:ring-primary outline-none"
                placeholder="Paste your sermon notes, coaching concept, or video transcript here..."
              />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t justify-end py-4">
            <Button onClick={handleRepurpose} disabled={loading} className="gap-2 px-8">
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                  Repurposing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Multi-Channel Assets
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1 px-3">
              Source: Executive Session Notes
            </Badge>
            <Button variant="ghost" size="sm" className="text-xs h-8 gap-2" onClick={() => setGenerated(false)}>
              <RefreshCw className="h-3 w-3" />
              Start New Concept
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {channels.map(channel => (
              <Card key={channel.id} className="flex flex-col h-full hover:shadow-md transition-all">
                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0 border-b bg-muted/10">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-background border", channel.color)}>
                      <channel.icon className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-sm font-bold uppercase tracking-tight">{channel.label}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleCopy(channel.content, channel.id)}
                  >
                    {copied === channel.id ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="pt-4 flex-1">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap italic">
                    {channel.content}
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/5 border-t pt-3 pb-3 justify-between">
                  <span className="text-[10px] text-muted-foreground font-medium uppercase">Tone: Strategic/Warm</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-[10px]">Customize →</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentRepurposer;
