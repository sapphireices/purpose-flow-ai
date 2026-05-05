import { useState } from 'react';
import {
  PhoneCall,
  User,
  Target,
  DollarSign,
  FileText,
  Copy,
  Check,
  Lightbulb,
  MessageSquare,
  TrendingUp,
  Calendar,
  Send,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_LEADS } from '@/lib/mock-data';
import { LeadStatus } from '@/types';

const orgTypes = [
  { value: 'Corporate', label: 'Corporate' },
  { value: 'University', label: 'University' },
  { value: 'School', label: 'School' },
  { value: 'Nonprofit', label: 'Nonprofit' },
  { value: 'Church', label: 'Church' },
  { value: 'Coaching', label: 'Coaching' },
  { value: 'Speaking', label: 'Speaking' },
  { value: "David's Mighty 3", label: "David's Mighty 3" },
  { value: 'ScriptorStudio.net', label: 'ScriptorStudio.net' },
  { value: 'Other', label: 'Other' }
];

const serviceInterests = [
  'Strategic Advisory',
  'Corporate Consulting',
  'Executive Coaching',
  'Leadership Workshop',
  'Keynote Speaking',
  'Team Alignment Training',
  "David's Mighty 3 Mentorship",
  'ScriptorStudio.net Authority Asset'
];

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  'Over $100,000'
];

interface CallPrepOutput {
  callObjective: string;
  prospectBackground: string;
  suggestedOpening: string;
  discoveryQuestions: string[];
  painPointQuestions: string[];
  strategicPositioning: string;
  recommendedOffer: string;
  objectionHandling: string[];
  closingQuestion: string;
  followUpEmail: string;
  corporateQuestions?: {
    stakeholder: string[];
    teamChallenge: string[];
    organizationalOutcome: string[];
    budgetTimeline: string[];
    decisionMaker: string[];
  };
}

export default function DiscoveryCallPrep() {
  const [leadId, setLeadId] = useState('');
  const [leadName, setLeadName] = useState('');
  const [organization, setOrganization] = useState('');
  const [orgType, setOrgType] = useState('Corporate');
  const [role, setRole] = useState('');
  const [knownPainPoint, setKnownPainPoint] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [possibleBudget, setPossibleBudget] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Strategic Advisory');
  const [notes, setNotes] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [prep, setPrep] = useState<CallPrepOutput | null>(null);

  const isCorporate = ['Corporate', 'University', 'School', 'Nonprofit'].includes(orgType);

  const loadLead = (id: string) => {
    const lead = MOCK_LEADS.find(l => l.id === id);
    if (lead) {
      setLeadId(lead.id);
      setLeadName(lead.name);
      setOrganization(lead.organization);
      setOrgType(lead.type);
      setRole(lead.role);
      setNotes(lead.notes);
    }
  };

  const generatePrep = () => {
    const offerMap: Record<string, string> = {
      'Strategic Advisory': 'Strategic Leadership Advisory',
      'Corporate Consulting': 'Corporate Leadership Consulting',
      'Executive Coaching': 'Executive Coaching Office Hours',
      'Leadership Workshop': 'Leadership Development Workshop',
      'Keynote Speaking': 'Keynote + Workshop Package',
      'Team Alignment Training': 'Team Alignment Intensive',
      "David's Mighty 3 Mentorship": "David's Mighty 3 Mentorship Pathway",
      'ScriptorStudio.net Authority Asset': 'ScriptorStudio.net Authority Package'
    };

    const output: CallPrepOutput = {
      callObjective: `Understand ${leadName}'s leadership challenges at ${organization} and explore whether a ${serviceInterest} engagement would help achieve ${desiredOutcome || 'their organizational goals'}.`,
      
      prospectBackground: `${leadName} serves as ${role || 'a leader'} at ${organization}, a ${orgType.toLowerCase()} organization. ${notes || 'No additional context provided.'} They are interested in ${serviceInterest}.`,
      
      suggestedOpening: `Thank you for making time to connect with me today, ${leadName.split(' ')[0]}. I've been looking forward to learning more about ${organization} and understanding the leadership journey you're on. What's the one leadership challenge that, if solved, would create the greatest impact for your organization right now?`,
      
      discoveryQuestions: [
        `Can you describe the current state of leadership at ${organization}? What's working well?`,
        `What does success look like for you personally and for ${organization} in the next 12-24 months?`,
        `Who else is involved in leadership decisions, and how do you typically align on major initiatives?`,
        `What timeline are you working with for addressing this leadership challenge?`,
        `Have you worked with a leadership coach or consultant before, and what was your experience?`,
        `What would it take for you to feel confident that this investment would create measurable value?`
      ],
      
      painPointQuestions: [
        `When this leadership challenge is at its worst, what does it cost you - in time, energy, or peace of mind?`,
        `What would be the consequence of not addressing this challenge over the next 6-12 months?`,
        `How does this challenge impact other areas of ${organization} or your personal effectiveness?`,
        `What patterns have you noticed that suggest this is a systemic issue rather than a one-off problem?`
      ],
      
      strategicPositioning: `Based on what you've shared, ${organization} is at a pivotal moment. ${serviceInterest} isn't just about training - it's about creating lasting systems and frameworks that transform how your leaders think, communicate, and execute. I've seen organizations similar to yours achieve remarkable results when they invest in purpose-driven leadership development.`,
      
      recommendedOffer: offerMap[serviceInterest] || serviceInterest,
      
      objectionHandling: [
        `Objection: "I don't have time for this right now." Response: "I completely understand - you're leading a busy organization. The beauty of this approach is that we design the engagement to fit your schedule, not to add burden. Many clients find the time invested saves multiples in restored efficiency."`,
        `Objection: "We've tried leadership training before with limited results." Response: "That's common. It usually happens because training focuses on content rather than systems. Our approach builds lasting frameworks your team will use long after the formal engagement ends."`,
        `Objection: "I'm not sure about the budget." Response: "I'd love to understand your budget parameters better. We have flexible engagement models, and I'm confident we can find a structure that creates tremendous value for your investment."`
      ],
      
      closingQuestion: `Based on everything we've discussed today, ${leadName.split(' ')[0]}, would you say that a ${serviceInterest} engagement is worth exploring further? If so, what's the next step you'd like to take?`,
      
      followUpEmail: `Subject: Next Steps - ${organization} Leadership Partnership

${leadName},

It was a privilege to connect with you today. Thank you for sharing so openly about ${organization}'s leadership journey.

In our conversation, we explored how ${offerMap[serviceInterest] || serviceInterest} might support your goals. Here's what stood out:

- Primary challenge: ${knownPainPoint || 'Discussed during call'}
- Desired outcome: ${desiredOutcome || 'Improved leadership effectiveness'}
- Timeline: ${possibleBudget || 'To be determined'}

I'll prepare a tailored proposal for you and follow up within the week.

Looking forward to the possibility of partnering with you.

Warm regards,
Dr. Celso Nolberto
Purpose To Function LLC`
    };

    if (isCorporate) {
      output.corporateQuestions = {
        stakeholder: [
          `Who else on your leadership team will be involved in evaluating this investment?`,
          `What does your board or governing body expect from leadership development initiatives?`,
          `Are there specific stakeholders whose buy-in is critical for this to move forward?`
        ],
        teamChallenge: [
          `What specific team dynamics have you observed that suggest a need for alignment work?`,
          `How does your team currently handle strategic decisions?`,
          `What would your team say is their biggest frustration with current leadership processes?`
        ],
        organizationalOutcome: [
          `What does success look like for ${organization} in the next 12-24 months?`,
          `How will you measure whether this investment created value?`,
          `What organizational goals depend on getting this right?`
        ],
        budgetTimeline: [
          `What budget parameters are you working with for this initiative?`,
          `What timeline does ${organization} operate on for major initiatives?`,
          `Are there seasonal or fiscal considerations we should plan around?`
        ],
        decisionMaker: [
          `Ultimately, who will be the decision-maker on this engagement?`,
          `What information would you need to present this to your decision-making body?`,
          `Is there anyone else who needs to be in the room when we discuss the proposal?`
        ]
      };
    }

    setPrep(output);
    setGenerated(true);
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  const hotLeads = MOCK_LEADS.filter(l => l.isHot && ([LeadStatus.New, LeadStatus.Contacted, LeadStatus.Replied, LeadStatus.CallBooked] as string[]).includes(l.status));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Discovery Call Prep Agent</h2>
        <p className="text-muted-foreground">
          Prepare for sales calls with actionable, specific call prep for each lead.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5" />
              Lead Information
            </CardTitle>
            <CardDescription>Enter prospect details to generate call prep</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Select Hot Lead */}
            <div className="space-y-2">
              <Label>Quick Select Hot Lead</Label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={leadId}
                onChange={(e) => loadLead(e.target.value)}
              >
                <option value="">Select a hot lead...</option>
                {hotLeads.map(lead => (
                  <option key={lead.id} value={lead.id}>
                    {lead.name} - {lead.organization}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-2">
              <Label htmlFor="leadName">Lead Name *</Label>
              <Input
                id="leadName"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Dr. Sarah Mitchell"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization *</Label>
              <Input
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="TechForward Corporation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgType">Organization Type</Label>
              <select
                id="orgType"
                className="w-full p-2 border rounded-md bg-background"
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
              >
                {orgTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role / Title</Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Chief People Officer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="knownPainPoint">Known Pain Point</Label>
              <Input
                id="knownPainPoint"
                value={knownPainPoint}
                onChange={(e) => setKnownPainPoint(e.target.value)}
                placeholder="Executive team alignment and succession planning"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredOutcome">Desired Outcome</Label>
              <Input
                id="desiredOutcome"
                value={desiredOutcome}
                onChange={(e) => setDesiredOutcome(e.target.value)}
                placeholder="Build a leadership succession plan and team alignment"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="possibleBudget">Possible Budget Range</Label>
              <select
                id="possibleBudget"
                className="w-full p-2 border rounded-md bg-background"
                value={possibleBudget}
                onChange={(e) => setPossibleBudget(e.target.value)}
              >
                <option value="">Select budget range...</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceInterest">Service Interest</Label>
              <select
                id="serviceInterest"
                className="w-full p-2 border rounded-md bg-background"
                value={serviceInterest}
                onChange={(e) => setServiceInterest(e.target.value)}
              >
                {serviceInterests.map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <textarea
                id="notes"
                className="w-full p-2 border rounded-md bg-background min-h-[80px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional context about the lead or opportunity..."
              />
            </div>

            <Button 
              className="w-full gap-2" 
              onClick={generatePrep}
              disabled={!leadName || !organization}
            >
              <Lightbulb className="h-4 w-4" />
              Generate Call Prep
            </Button>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Call Preparation
            </CardTitle>
            <CardDescription>
              AI-generated call prep - review, copy, and use during your call
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!generated ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <PhoneCall className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Enter lead information and click "Generate Call Prep" to create your discovery call preparation.
                </p>
              </div>
            ) : prep && (
              <Tabs defaultValue="objective" className="space-y-4">
                <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2">
                  <TabsTrigger value="objective">Objective</TabsTrigger>
                  <TabsTrigger value="background">Background</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="positioning">Positioning</TabsTrigger>
                  <TabsTrigger value="objections">Objections</TabsTrigger>
                  <TabsTrigger value="closing">Closing</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  {isCorporate && <TabsTrigger value="corporate">Corporate</TabsTrigger>}
                </TabsList>

                <TabsContent value="objective">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Target className="h-4 w-4" /> Call Objective
                        </h4>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(prep.callObjective, 'objective')}
                        >
                          {copied === 'objective' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'objective' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{prep.callObjective}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="background">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <User className="h-4 w-4" /> Prospect Background
                        </h4>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(prep.prospectBackground, 'background')}
                        >
                          {copied === 'background' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'background' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{prep.prospectBackground}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="questions">
                  <Card>
                    <CardContent className="pt-4 space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" /> Discovery Questions
                          </h4>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="gap-1"
                            onClick={() => copyToClipboard(prep.discoveryQuestions.join('\n\n'), 'discovery')}
                          >
                            {copied === 'discovery' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            Copy All
                          </Button>
                        </div>
                        <ul className="space-y-2">
                          {prep.discoveryQuestions.map((q, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                              <span className="font-medium text-foreground">{i + 1}.</span>
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="h-px bg-border" />

                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" /> Pain Point Questions
                          </h4>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="gap-1"
                            onClick={() => copyToClipboard(prep.painPointQuestions.join('\n\n'), 'pain')}
                          >
                            {copied === 'pain' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            Copy All
                          </Button>
                        </div>
                        <ul className="space-y-2">
                          {prep.painPointQuestions.map((q, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                              <span className="font-medium text-foreground">{i + 1}.</span>
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="positioning">
                  <Card>
                    <CardContent className="pt-4 space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Strategic Positioning</h4>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="gap-1"
                            onClick={() => copyToClipboard(prep.strategicPositioning, 'positioning')}
                          >
                            {copied === 'positioning' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied === 'positioning' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{prep.strategicPositioning}</p>
                      </div>

                      <div className="h-px bg-border" />

                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <DollarSign className="h-4 w-4" /> Recommended Offer
                          </h4>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="gap-1"
                            onClick={() => copyToClipboard(prep.recommendedOffer, 'offer')}
                          >
                            {copied === 'offer' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied === 'offer' ? 'Copied' : 'Copy'}
                          </Button>
                        </div>
                        <Badge variant="outline" className="text-base px-3 py-1">
                          {prep.recommendedOffer}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="objections">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">Objection Handling Notes</h4>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(prep.objectionHandling.join('\n\n---\n\n'), 'objections')}
                        >
                          {copied === 'objections' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          Copy All
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {prep.objectionHandling.map((obj, i) => (
                          <div key={i} className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                            {obj}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="closing">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> Closing Question
                        </h4>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(prep.closingQuestion, 'closing')}
                        >
                          {copied === 'closing' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'closing' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground italic">{prep.closingQuestion}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="email">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Send className="h-4 w-4" /> Post-Call Follow-Up Email
                        </h4>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(prep.followUpEmail, 'email')}
                        >
                          {copied === 'email' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'email' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                        {prep.followUpEmail}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>

                {isCorporate && prep.corporateQuestions && (
                  <TabsContent value="corporate">
                    <Card>
                      <CardContent className="pt-4 space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Users className="h-4 w-4" /> Stakeholder Questions
                          </h4>
                          <ul className="space-y-1">
                            {prep.corporateQuestions.stakeholder.map((q, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {q}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Team Challenge Questions</h4>
                          <ul className="space-y-1">
                            {prep.corporateQuestions.teamChallenge.map((q, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {q}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Organizational Outcome Questions</h4>
                          <ul className="space-y-1">
                            {prep.corporateQuestions.organizationalOutcome.map((q, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {q}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Budget & Timeline Questions</h4>
                          <ul className="space-y-1">
                            {prep.corporateQuestions.budgetTimeline.map((q, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {q}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Decision-Maker Questions</h4>
                          <ul className="space-y-1">
                            {prep.corporateQuestions.decisionMaker.map((q, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {q}</li>
                            ))}
                          </ul>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-1"
                          onClick={() => copyToClipboard(
                            Object.values(prep.corporateQuestions!).flat().join('\n'),
                            'corporate'
                          )}
                        >
                          <Copy className="h-3 w-3" /> Copy All Corporate Questions
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
