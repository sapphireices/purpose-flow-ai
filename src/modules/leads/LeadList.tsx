import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Flame, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MOCK_LEADS } from '@/lib/mock-data';
import { LeadStatus, LeadType } from '@/types';
import type { LeadStatusValue, LeadTypeValue } from '@/types';

const LeadList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatusValue | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<LeadTypeValue | 'All'>('All');

  const filteredLeads = MOCK_LEADS.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesType = typeFilter === 'All' || lead.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lead Command Center</h2>
          <p className="text-muted-foreground">Manage and track your revenue opportunities.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Lead
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads, orgs, or contacts..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Status: {statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('All')}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('New')}>New</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Contacted')}>Contacted</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Call Booked')}>Call Booked</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Proposal Needed')}>Proposal Needed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Proposal Sent')}>Proposal Sent</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Closed Won')}>Closed Won</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Type: {typeFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTypeFilter('All')}>All Types</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter(LeadType.Corporate)}>Corporate</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter(LeadType.Coaching)}>Coaching</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter(LeadType.Church)}>Church</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter(LeadType.Nonprofit)}>Nonprofit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter(LeadType.DM3)}>David's Mighty 3</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter(LeadType.ScriptorStudio)}>ScriptorStudio.net</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Lead / Organization</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Next Action</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No leads found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="group">
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{lead.organization}</span>
                        {lead.isHot && <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{lead.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{lead.contactPerson}</span>
                      <span className="text-xs text-muted-foreground">{lead.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(lead.status)} className="text-[10px] px-1.5 py-0 leading-tight">
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-sm">${lead.opportunityValue.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col max-w-[200px]">
                      <span className="text-xs truncate" title={lead.recommendedNextAction}>
                        {lead.recommendedNextAction}
                      </span>
                      {lead.nextFollowUpDate && (
                        <span className="text-[10px] text-muted-foreground">
                          Follow up: {lead.nextFollowUpDate}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                          <ExternalLink className="h-3.5 w-3.5" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-primary">
                          🚀 Move to Next Agent
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const getStatusVariant = (status: LeadStatusValue): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case LeadStatus.ClosedWon: return 'default';
    case LeadStatus.ClosedLost: return 'destructive';
    case LeadStatus.New: return 'secondary';
    case LeadStatus.Negotiation:
    case LeadStatus.ProposalSent:
    case LeadStatus.CallBooked: return 'outline';
    default: return 'outline';
  }
};

export default LeadList;
