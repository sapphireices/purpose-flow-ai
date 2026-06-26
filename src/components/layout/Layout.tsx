import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  TrendingUp, 
  Menu,
  ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { getTabOrder, ALL_NAV_ITEMS } from "@/lib/navigation"
import type { NavItemData } from "@/lib/navigation"

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
  const [navItems, setNavItems] = useState<NavItemData[]>(() => {
    const order = getTabOrder()
    const sortedItems = order
      .map(id => ALL_NAV_ITEMS.find(item => item.id === id))
      .filter(Boolean) as NavItemData[]
    
    const missingItems = ALL_NAV_ITEMS.filter(item => !order.includes(item.id))
    return [...sortedItems, ...missingItems]
  })
  const location = useLocation()

  useEffect(() => {
    const updateNav = () => {
      const order = getTabOrder()
      const sortedItems = order
        .map(id => ALL_NAV_ITEMS.find(item => item.id === id))
        .filter(Boolean) as NavItemData[]
      
      // Ensure any missing items are added at the end
      const missingItems = ALL_NAV_ITEMS.filter(item => !order.includes(item.id))
      
      setNavItems([...sortedItems, ...missingItems])
    }

    updateNav()

    // Listen for storage changes to update navigation order
    window.addEventListener('storage', updateNav)
    // Custom event for same-window updates
    window.addEventListener('purpose-flow-nav-updated', updateNav)

    return () => {
      window.removeEventListener('storage', updateNav)
      window.removeEventListener('purpose-flow-nav-updated', updateNav)
    }
  }, [])

  // Split navItems into main and bottom (Settings)
  // We'll keep Settings at the bottom if it's there, but follow the user's order if they put it elsewhere?
  // The default order puts Settings at the end.

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
              <React.Fragment key={item.id}>
                {item.id === 'settings' && navItems.indexOf(item) > 0 && (
                  <Separator className="my-4" />
                )}
                <NavItem
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.to}
                  collapsed={collapsed}
                />
              </React.Fragment>
            ))}
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
