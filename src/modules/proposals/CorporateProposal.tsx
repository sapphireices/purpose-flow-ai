import { useState } from 'react';
import {
  FileText,
  Target,
  Clock,
  DollarSign,
  Copy,
  Check,
  Lightbulb,
  Send,
  Briefcase,
  Award,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const serviceTypes = [
  'Strategic Leadership Advisory',
  'Team Alignment Workshop',
  'Executive Coaching Office Hours',
  'Leadership Development Series',
  'Innovation and Growth Strategy Session',
  'Purpose-Driven Culture Training',
  'Keynote + Workshop Package',
  'ScriptorStudio.net Authority Asset Package'
];

const durations = [
  '1 Day',
  '2 Days',
  '1 Week',
  '2 Weeks',
  '1 Month',
  '3 Months',
  '6 Months',
  '12 Months'
];

interface ProposalOutput {
  executiveSummary: string;
  problemStatement: string;
  strategicOpportunity: string;
  recommendedSolution: string;
  scopeOfWork: string[];
  deliverables: string[];
  timeline: { phase: string; duration: string; activities: string[] }[];
  investmentTiers: { name: string; price: string; features: string[] }[];
  nextSteps: string[];
  followUpEmail: string;
}

export default function CorporateProposal() {
  const [orgName, setOrgName] = useState('');
  const [clientChallenge, setClientChallenge] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [serviceType, setServiceType] = useState('Strategic Leadership Advisory');
  const [duration, setDuration] = useState('3 Months');
  const [budgetRange, setBudgetRange] = useState('');
  const [discoveryNotes, setDiscoveryNotes] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [proposal, setProposal] = useState<ProposalOutput | null>(null);

  const generateProposal = () => {
    const serviceMap: Record<string, { deliverable: string; scope: string[] }> = {
      'Strategic Leadership Advisory': {
        deliverable: 'Strategic advisory engagement with executive coaching sessions',
        scope: [
          'Executive 1:1 strategy sessions (bi-weekly)',
          'Leadership team alignment workshops',
          'Strategic planning and execution support',
          'Decision-making framework development',
          'Monthly progress assessments'
        ]
      },
      'Team Alignment Workshop': {
        deliverable: 'Interactive team alignment workshop experience',
        scope: [
          'Team assessment and diagnosis',
          'Full-day interactive workshop delivery',
          'Team charter development',
          'Follow-up implementation session',
          'Post-workshop coaching call'
        ]
      },
      'Executive Coaching Office Hours': {
        deliverable: 'Executive coaching package',
        scope: [
          'Bi-weekly 60-minute coaching sessions',
          'Leadership assessment and development plan',
          'Accountability framework setup',
          'Email support between sessions',
          'Quarterly progress review'
        ]
      },
      'Leadership Development Series': {
        deliverable: 'Comprehensive leadership development program',
        scope: [
          '6-session leadership curriculum delivery',
          'Personalized leadership assessments',
          'Individual coaching for each participant',
          'Group mastermind sessions',
          'Final presentation and certification'
        ]
      },
      'Innovation and Growth Strategy Session': {
        deliverable: 'Innovation strategy intensive',
        scope: [
          'Innovation audit and opportunity mapping',
          'Full-day strategy session facilitation',
          'Growth strategy framework development',
          'Implementation roadmap creation',
          '30-day follow-up check-in'
        ]
      },
      'Purpose-Driven Culture Training': {
        deliverable: 'Culture transformation program',
        scope: [
          'Culture assessment and benchmarking',
          'Leadership alignment workshop',
          'Values integration framework',
          'Team culture sessions',
          'Culture coaching and support'
        ]
      },
      'Keynote + Workshop Package': {
        deliverable: 'Keynote presentation with hands-on workshop',
        scope: [
          'Custom keynote presentation (60-90 min)',
          'Interactive workshop session (2-3 hours)',
          'Participant materials and workbooks',
          'Q&A session facilitation',
          'Post-event summary report'
        ]
      },
      'ScriptorStudio.net Authority Asset Package': {
        deliverable: 'Authority book creation and publishing package',
        scope: [
          'Content strategy and book roadmap',
          'Ghostwriting and content creation',
          'Editorial review and refinement',
          'Design and publishing services',
          'Marketing asset creation'
        ]
      }
    };

    const pricing: Record<string, { base: string; tier2: string; tier3: string }> = {
      'Strategic Leadership Advisory': { base: '$15,000', tier2: '$25,000', tier3: '$45,000' },
      'Team Alignment Workshop': { base: '$8,500', tier2: '$12,500', tier3: '$18,000' },
      'Executive Coaching Office Hours': { base: '$6,000', tier2: '$12,000', tier3: '$24,000' },
      'Leadership Development Series': { base: '$18,000', tier2: '$35,000', tier3: '$60,000' },
      'Innovation and Growth Strategy Session': { base: '$7,500', tier2: '$14,000', tier3: '$25,000' },
      'Purpose-Driven Culture Training': { base: '$12,000', tier2: '$22,000', tier3: '$40,000' },
      'Keynote + Workshop Package': { base: '$10,000', tier2: '$18,000', tier3: '$30,000' },
      'ScriptorStudio.net Authority Asset Package': { base: '$9,500', tier2: '$17,500', tier3: '$35,000' }
    };

    const service = serviceMap[serviceType] || serviceMap['Strategic Leadership Advisory'];
    const prices = pricing[serviceType] || pricing['Strategic Leadership Advisory'];

    const output: ProposalOutput = {
      executiveSummary: `This proposal outlines a strategic partnership between Purpose To Function LLC and ${orgName} to address ${clientChallenge || 'critical leadership and organizational challenges'} through a tailored ${serviceType} engagement. The recommended solution is designed to equip ${targetAudience || 'your leadership team'} with the frameworks, strategies, and alignment necessary to achieve ${desiredOutcome || 'sustained organizational success'}.`,
      
      problemStatement: `${orgName} faces significant leadership and organizational challenges that, if left unaddressed, will continue to impact team effectiveness, strategic execution, and bottom-line results. The core issues include:

• Lack of clear strategic alignment across leadership tiers
• Inconsistent communication and execution frameworks
• Leadership team disconnected from organizational vision
• Limited accountability structures for strategic initiatives
• Need for purpose-driven culture development

These challenges create ripple effects throughout the organization, impacting employee engagement, customer satisfaction, and ultimately, revenue growth.`,
      
      strategicOpportunity: `By investing in leadership development and strategic alignment now, ${orgName} has the opportunity to:

• Create a unified leadership team with shared vision and strategy
• Establish proven frameworks for execution and accountability
• Develop a culture of purpose-driven performance
• Position the organization for sustainable growth
• Build internal leadership capacity that multiplies over time

This engagement represents not just an expense, but a strategic investment in organizational capability that will yield returns across all dimensions of performance.`,
      
      recommendedSolution: `${serviceType}

${service.deliverable}

This engagement is specifically designed to address ${clientChallenge || 'the identified leadership challenges'} while building lasting capability within ${orgName}. The solution combines expert facilitation, proven frameworks, and personalized implementation support to ensure sustainable results.`,
      
      scopeOfWork: service.scope,
      
      deliverables: [
        `Comprehensive ${serviceType.toLowerCase()} delivery`,
        'Pre-engagement assessment and customization',
        'All program materials and resources',
        'Implementation tools and frameworks',
        'Post-engagement summary and recommendations',
        '30-day follow-up support',
        'Documentation of all strategic outputs'
      ],
      
      timeline: [
        {
          phase: 'Phase 1: Discovery & Preparation',
          duration: '1-2 weeks',
          activities: [
            'Stakeholder interviews and assessment',
            'Current state analysis',
            'Customization of program content',
            'Logistics and scheduling confirmation'
          ]
        },
        {
          phase: 'Phase 2: Core Delivery',
          duration: duration,
          activities: [
            `Primary ${serviceType.toLowerCase()} delivery`,
            'Interactive workshops and sessions',
            'Coaching and support activities',
            'Ongoing assessment and adjustment'
          ]
        },
        {
          phase: 'Phase 3: Integration & Closure',
          duration: '2-4 weeks',
          activities: [
            'Final sessions and presentations',
            'Implementation planning',
            'Program completion documentation',
            'Transition to sustainment'
          ]
        }
      ],
      
      investmentTiers: [
        {
          name: 'Essential Package',
          price: prices.base,
          features: [
            'Core program delivery',
            'Standard materials',
            'Email support',
            '30-day follow-up'
          ]
        },
        {
          name: 'Professional Package',
          price: prices.tier2,
          features: [
            'Everything in Essential',
            'Enhanced customization',
            'Priority scheduling',
            '60-day follow-up',
            'Additional coaching hours'
          ]
        },
        {
          name: 'Enterprise Package',
          price: prices.tier3,
          features: [
            'Everything in Professional',
            'Full executive alignment',
            '90-day follow-up support',
            'Quarterly strategy review',
            'Unlimited email support'
          ]
        }
      ],
      
      nextSteps: [
        'Review this proposal with your leadership team',
        'Select the investment tier that best fits your needs',
        'Schedule a call to discuss customization options',
        'Provide approval to proceed with engagement',
        'Complete onboarding questionnaire to begin'
      ],
      
      followUpEmail: `Subject: Proposal for ${orgName} - ${serviceType}

Dear ${orgName} Leadership Team,

Thank you for the opportunity to present this proposal for your consideration. I am excited about the potential to partner with ${orgName} to achieve ${desiredOutcome || 'your leadership and organizational goals'}.

This proposal outlines a comprehensive approach to addressing ${clientChallenge || 'your leadership development needs'} through our ${serviceType} program.

Key Highlights:
• Tailored solution addressing your specific challenges
• Proven frameworks with demonstrated results
• Flexible investment options to match your needs
• Expert facilitation from Dr. Celso Nolberto

I am available to discuss this proposal at your convenience. Please let me know if you would like to schedule a call or if you have any questions.

Looking forward to the possibility of partnering with you.

Warm regards,
Dr. Celso Nolberto
Purpose To Function LLC`
    };

    setProposal(output);
    setGenerated(true);
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  const getFullProposalText = () => {
    if (!proposal) return '';
    return `
================================================================================
                              STRATEGIC PROPOSAL
                                    FOR
                              ${orgName.toUpperCase()}
================================================================================

PREPARED BY: Dr. Celso Nolberto
            Purpose To Function LLC

DATE: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

--------------------------------------------------------------------------------
                              EXECUTIVE SUMMARY
--------------------------------------------------------------------------------

${proposal.executiveSummary}

--------------------------------------------------------------------------------
                              PROBLEM STATEMENT
--------------------------------------------------------------------------------

${proposal.problemStatement}

--------------------------------------------------------------------------------
                            STRATEGIC OPPORTUNITY
--------------------------------------------------------------------------------

${proposal.strategicOpportunity}

--------------------------------------------------------------------------------
                          RECOMMENDED SOLUTION
--------------------------------------------------------------------------------

${proposal.recommendedSolution}

--------------------------------------------------------------------------------
                              SCOPE OF WORK
--------------------------------------------------------------------------------

${proposal.scopeOfWork.map((item, i) => `${i + 1}. ${item}`).join('\n')}

--------------------------------------------------------------------------------
                              DELIVERABLES
--------------------------------------------------------------------------------

${proposal.deliverables.map((item, i) => `${i + 1}. ${item}`).join('\n')}

--------------------------------------------------------------------------------
                                TIMELINE
--------------------------------------------------------------------------------

${proposal.timeline.map(t => `
${t.phase} (${t.duration})
${t.activities.map(a => `  • ${a}`).join('\n')}`).join('\n')}

--------------------------------------------------------------------------------
                            INVESTMENT OPTIONS
--------------------------------------------------------------------------------

${proposal.investmentTiers.map(t => `
${t.name}: ${t.price}
${t.features.map(f => `  ✓ ${f}`).join('\n')}`).join('\n')}

--------------------------------------------------------------------------------
                               NEXT STEPS
--------------------------------------------------------------------------------

${proposal.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

--------------------------------------------------------------------------------
                    FOR MORE INFORMATION
--------------------------------------------------------------------------------

Dr. Celso Nolberto
Purpose To Function LLC

This proposal is valid for 30 days from the date above.

================================================================================
`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Corporate Proposal Agent</h2>
        <p className="text-muted-foreground">
          Generate professional proposals for corporate clients with all service types.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Client Information
            </CardTitle>
            <CardDescription>Enter client details to generate proposal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name *</Label>
              <Input
                id="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="TechForward Corporation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientChallenge">Client Challenge *</Label>
              <textarea
                id="clientChallenge"
                className="w-full p-2 border rounded-md bg-background min-h-[80px]"
                value={clientChallenge}
                onChange={(e) => setClientChallenge(e.target.value)}
                placeholder="Executive team alignment and need for strategic planning framework..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="C-suite executives and senior leadership team"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredOutcome">Desired Outcome</Label>
              <Input
                id="desiredOutcome"
                value={desiredOutcome}
                onChange={(e) => setDesiredOutcome(e.target.value)}
                placeholder="Build aligned, high-performing executive team"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <select
                id="serviceType"
                className="w-full p-2 border rounded-md bg-background"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Engagement Duration</Label>
              <select
                id="duration"
                className="w-full p-2 border rounded-md bg-background"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                {durations.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetRange">Budget Range (Optional)</Label>
              <Input
                id="budgetRange"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                placeholder="$25,000 - $50,000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discoveryNotes">Discovery Call Notes</Label>
              <textarea
                id="discoveryNotes"
                className="w-full p-2 border rounded-md bg-background min-h-[80px]"
                value={discoveryNotes}
                onChange={(e) => setDiscoveryNotes(e.target.value)}
                placeholder="Key insights from discovery call..."
              />
            </div>

            <Button 
              className="w-full gap-2" 
              onClick={generateProposal}
              disabled={!orgName || !clientChallenge}
            >
              <Lightbulb className="h-4 w-4" />
              Generate Proposal
            </Button>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Proposal Document
                </CardTitle>
                <CardDescription>
                  AI-generated proposal ready for review and delivery
                </CardDescription>
              </div>
              {generated && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => copyToClipboard(getFullProposalText(), 'full')}
                  >
                    {copied === 'full' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === 'full' ? 'Copied' : 'Copy Full'}
                  </Button>
                  <Button size="sm" className="gap-1">
                    <Send className="h-3 w-3" />
                    Export PDF
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!generated ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Enter client information and click "Generate Proposal" to create a professional proposal document.
                </p>
              </div>
            ) : proposal && (
              <Tabs defaultValue="summary" className="space-y-4">
                <TabsList className="grid grid-cols-4 lg:grid-cols-6 gap-2">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="problem">Problem</TabsTrigger>
                  <TabsTrigger value="solution">Solution</TabsTrigger>
                  <TabsTrigger value="scope">Scope</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="nextsteps">Next Steps</TabsTrigger>
                </TabsList>

                <TabsContent value="summary">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Executive Summary</CardTitle>
                          <CardDescription>High-level overview of the engagement</CardDescription>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(proposal.executiveSummary, 'summary')}
                        >
                          {copied === 'summary' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'summary' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {proposal.executiveSummary}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Strategic Opportunity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {proposal.strategicOpportunity}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="problem">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Target className="h-4 w-4" /> Problem Statement
                          </CardTitle>
                          <CardDescription>The challenges being addressed</CardDescription>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(proposal.problemStatement, 'problem')}
                        >
                          {copied === 'problem' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'problem' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {proposal.problemStatement}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="solution">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Award className="h-4 w-4" /> Recommended Solution
                          </CardTitle>
                          <CardDescription>{orgName} - {serviceType}</CardDescription>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(proposal.recommendedSolution, 'solution')}
                        >
                          {copied === 'solution' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'solution' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {proposal.recommendedSolution}
                      </p>

                      <Separator className="my-4" />

                      <h4 className="font-semibold mb-2">Deliverables</h4>
                      <ul className="space-y-1">
                        {proposal.deliverables.map((d, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="scope">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> Scope of Work & Timeline
                          </CardTitle>
                          <CardDescription>Detailed engagement phases</CardDescription>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(
                            proposal.scopeOfWork.join('\n') + '\n\n' + 
                            JSON.stringify(proposal.timeline, null, 2), 
                            'scope'
                          )}
                        >
                          {copied === 'scope' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'scope' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Scope of Work</h4>
                        <ul className="space-y-1">
                          {proposal.scopeOfWork.map((s, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="font-medium text-foreground">{i + 1}.</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-3">Timeline</h4>
                        <div className="space-y-4">
                          {proposal.timeline.map((t, i) => (
                            <div key={i} className="p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{t.duration}</Badge>
                                <span className="font-semibold">{t.phase}</span>
                              </div>
                              <ul className="space-y-1">
                                {t.activities.map((a, j) => (
                                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-muted-foreground">•</span>
                                    {a}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pricing">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <DollarSign className="h-4 w-4" /> Investment Options
                          </CardTitle>
                          <CardDescription>Flexible packages to fit your needs</CardDescription>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(
                            proposal.investmentTiers.map(t => 
                              `${t.name}: ${t.price}\n${t.features.join('\n')}`
                            ).join('\n\n'),
                            'pricing'
                          )}
                        >
                          {copied === 'pricing' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'pricing' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        {proposal.investmentTiers.map((tier, i) => (
                          <Card key={i} className={i === 1 ? 'border-primary' : ''}>
                            <CardHeader className="pb-2">
                              {i === 1 && <Badge className="w-fit mb-2">Recommended</Badge>}
                              <CardTitle className="text-lg">{tier.name}</CardTitle>
                              <div className="text-2xl font-bold text-primary">{tier.price}</div>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {tier.features.map((f, j) => (
                                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="nextsteps">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Next Steps
                          </CardTitle>
                          <CardDescription>How to move forward</CardDescription>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="gap-1"
                          onClick={() => copyToClipboard(
                            proposal.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n'),
                            'nextsteps'
                          )}
                        >
                          {copied === 'nextsteps' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === 'nextsteps' ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {proposal.nextSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                              {i + 1}
                            </div>
                            <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>

                      <Separator className="my-6" />

                      <Card className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Send className="h-4 w-4" /> Follow-Up Email
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans">
                            {proposal.followUpEmail}
                          </pre>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mt-3 gap-1"
                            onClick={() => copyToClipboard(proposal.followUpEmail, 'email')}
                          >
                            {copied === 'email' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied === 'email' ? 'Copied' : 'Copy Email'}
                          </Button>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
