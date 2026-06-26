import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Linkedin, 
  PhoneCall, 
  FileText, 
  TrendingUp, 
  ShieldCheck,
  UserCheck,
  History,
  Sparkles,
  Zap,
  Settings as SettingsIcon
} from "lucide-react"

export interface NavItemData {
  to: string
  icon: any
  label: string
  id: string
}

export const ALL_NAV_ITEMS: NavItemData[] = [
  { id: "dashboard", to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { id: "leads", to: "/leads", icon: Users, label: "Lead Command Center" },
  { id: "research", to: "/research", icon: Sparkles, label: "AI Lead Research" },
  { id: "follow-ups", to: "/follow-ups", icon: Clock, label: "Follow-Up System" },
  { id: "outreach", to: "/outreach", icon: Linkedin, label: "LinkedIn Outreach" },
  { id: "discovery", to: "/discovery", icon: PhoneCall, label: "Discovery Call Prep" },
  { id: "proposals", to: "/proposals", icon: FileText, label: "Proposal Agent" },
  { id: "revenue", to: "/revenue", icon: TrendingUp, label: "Revenue Dashboard" },
  { id: "dm3", to: "/dm3", icon: ShieldCheck, label: "David's Mighty 3" },
  { id: "onboarding", to: "/onboarding", icon: UserCheck, label: "Client Onboarding" },
  { id: "sessions", to: "/sessions", icon: History, label: "Session Recaps" },
  { id: "content", to: "/content", icon: Zap, label: "Content Repurposer" },
  { id: "settings", to: "/settings", icon: SettingsIcon, label: "Settings" },
]

export const DEFAULT_TAB_ORDER = ALL_NAV_ITEMS.map(item => item.id)

export const getTabOrder = (): string[] => {
  const saved = localStorage.getItem("purpose-flow-tab-order")
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error("Failed to parse tab order", e)
    }
  }
  return DEFAULT_TAB_ORDER
}

export const saveTabOrder = (order: string[]) => {
  localStorage.setItem("purpose-flow-tab-order", JSON.stringify(order))
}
