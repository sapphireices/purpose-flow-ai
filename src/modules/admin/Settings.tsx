import { useState, useEffect } from 'react';
import { 
  Building, 
  Shield, 
  Save,
  Check,
  GripVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getTabOrder, 
  saveTabOrder, 
  ALL_NAV_ITEMS
} from '@/lib/navigation';
import type { NavItemData } from '@/lib/navigation';

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  item: NavItemData;
}

const SortableNavItem = ({ id, item }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  const Icon = item.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 border rounded-lg bg-background hover:bg-muted/30 transition-colors mb-2 group"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-muted-foreground hover:text-foreground">
        <GripVertical className="h-4 w-4" />
      </div>
      <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm font-medium">{item.label}</span>
      <span className="ml-auto text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded uppercase">{item.id}</span>
    </div>
  );
};

const Settings = () => {
  const [saved, setSaved] = useState(false);
  const [tabOrder, setTabOrder] = useState<string[]>([]);
  
  useEffect(() => {
    setTabOrder(getTabOrder());
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTabOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = () => {
    saveTabOrder(tabOrder);
    setSaved(true);
    // Trigger custom event for Layout component to update
    window.dispatchEvent(new Event('purpose-flow-nav-updated'));
    setTimeout(() => setSaved(false), 2000);
  };

  const orderedItems = tabOrder
    .map(id => ALL_NAV_ITEMS.find(item => item.id === id))
    .filter(Boolean) as NavItemData[];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Customize PurposeFlow AI for your business.</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? 'Settings Saved' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Business Profile</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="offers">Offers & Pricing</TabsTrigger>
          <TabsTrigger value="links">Links & Integrations</TabsTrigger>
          <TabsTrigger value="voice">Brand Voice</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Primary identity for proposals and outreach.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" defaultValue="Purpose To Function LLC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personal-name">Personal Name</Label>
                  <Input id="personal-name" defaultValue="Dr. Celso Nolberto" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Primary Email</Label>
                <Input id="email" type="email" defaultValue="celso@purposetofunction.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signature">Email Signature</Label>
                <textarea
                  id="signature"
                  className="w-full min-h-[100px] p-3 rounded-md border text-sm focus:ring-1 focus:ring-primary outline-none"
                  defaultValue={`To your growth,\nDr. Celso Nolberto\nCEO, Purpose To Function LLC`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Order</CardTitle>
              <CardDescription>Drag and drop to rearrange the sidebar menu items. Save to apply changes.</CardDescription>
            </CardHeader>
            <CardContent>
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={tabOrder}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="max-w-md">
                    {orderedItems.map((item) => (
                      <SortableNavItem key={item.id} id={item.id} item={item} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Core Service Offerings</CardTitle>
              <CardDescription>Standard pricing and names for your services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <OfferItem name="Strategic Leadership Advisory" min="$15,000" />
                <OfferItem name="Team Alignment Workshop" min="$5,000" />
                <OfferItem name="Executive Coaching Office Hours" min="$2,500" />
                <OfferItem name="David’s Mighty 3 Mentorship" min="$2,000" />
                <OfferItem name="ScriptorStudio.net Authority Asset" min="$8,000" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>External Links</CardTitle>
              <CardDescription>Links used in outreach and proposal drafts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="calendar">Calendly / Booking Link</Label>
                  <Input id="calendar" placeholder="https://calendly.com/dr-celso" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Main Website</Label>
                  <Input id="website" placeholder="https://purposetofunction.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skool">Skool Community (DM3)</Label>
                  <Input id="skool" placeholder="https://skool.com/davids-mighty-3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scriptor">ScriptorStudio</Label>
                  <Input id="scriptor" placeholder="https://scriptorstudio.net" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-amber-100 bg-amber-50/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-700">
                <Shield className="h-4 w-4" />
                Future Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground text-amber-600">
              Preparation for: Gmail, Google Calendar, HubSpot, Mailchimp, Stripe.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Brand Voice</CardTitle>
              <CardDescription>Describe how the AI should sound when drafting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tone-description">Primary Tone</Label>
                <textarea
                  id="tone-description"
                  className="w-full min-h-[150px] p-3 rounded-md border text-sm focus:ring-1 focus:ring-primary outline-none"
                  defaultValue={`Professional, strategic, warm, confident, executive, concise, and not pushy. Faith-driven for DM3 specific outreach.`}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border rounded-full px-3 py-1 bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-medium">Executive</span>
                </div>
                <div className="flex items-center gap-2 border rounded-full px-3 py-1 bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-medium">Spiritually Grounded</span>
                </div>
                <div className="flex items-center gap-2 border rounded-full px-3 py-1 bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-medium">Direct</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const OfferItem = ({ name, min }: { name: string, min: string }) => (
  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
    <div className="space-y-0.5">
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-xs text-muted-foreground">Default starting rate</p>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold">{min}</span>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
        <Building className="h-3 w-3" />
      </Button>
    </div>
  </div>
);

export default Settings;
