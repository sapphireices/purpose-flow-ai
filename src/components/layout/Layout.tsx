import React from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Linkedin, 
  PhoneCall, 
  FileText, 
  TrendingUp, 
  Settings as SettingsIcon,
  Menu,
  ChevronLeft,
  ShieldCheck,
  UserCheck,
  History,
  Sparkles,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface NavItemProps {
  to: string
  icon: React.ElementType
  label: string
  active?: boolean
  collapsed?: boolean
}

const NavItem = ({ to, icon: Icon, label, active, collapsed }: NavItemProps) => {
  return (
    <Link to={to}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent hover:text-accent-foreground",
          active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
          collapsed && "justify-center px-2"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="truncate">{label}</span>}
      </div>
    </Link>
  )
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const location = useLocation()

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/leads", icon: Users, label: "Lead Command Center" },
    { to: "/research", icon: Sparkles, label: "AI Lead Research" },
    { to: "/follow-ups", icon: Clock, label: "Follow-Up System" },
    { to: "/outreach", icon: Linkedin, label: "LinkedIn Outreach" },
    { to: "/discovery", icon: PhoneCall, label: "Discovery Call Prep" },
    { to: "/proposals", icon: FileText, label: "Proposal Agent" },
    { to: "/onboarding", icon: UserCheck, label: "Client Onboarding" },
    { to: "/sessions", icon: History, label: "Session Recaps" },
    { to: "/content", icon: Zap, label: "Content Repurposer" },
    { to: "/dm3", icon: ShieldCheck, label: "David's Mighty 3" },
    { to: "/revenue", icon: TrendingUp, label: "Revenue Dashboard" },
  ]

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r bg-muted/30 transition-all duration-300",
          collapsed ? "w-[70px]" : "w-[260px]"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && (
            <div className="font-bold text-xl tracking-tight flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-primary">PurposeFlow AI</span>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground mx-auto">
              <TrendingUp className="h-5 w-5" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex"
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                active={location.pathname === item.to}
                collapsed={collapsed}
              />
            ))}
          </nav>
          
          <Separator className="my-4" />
          
          <nav className="space-y-1">
            <NavItem
              to="/settings"
              icon={SettingsIcon}
              label="Settings"
              active={location.pathname === "/settings"}
              collapsed={collapsed}
            />
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
                CN
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">Dr. Celso Nolberto</span>
                <span className="text-xs text-muted-foreground truncate">CEO & Lead Coach</span>
              </div>
            </div>
          ) : (
            <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold mx-auto">
              CN
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b flex items-center px-6 bg-background/95 backdrop-blur shrink-0">
          <h1 className="text-lg font-semibold">
            {navItems.find(item => item.to === location.pathname)?.label || "PurposeFlow AI"}
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm">
              New Lead
            </Button>
          </div>
        </header>
        <ScrollArea className="flex-1">
          <div className="p-6">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
