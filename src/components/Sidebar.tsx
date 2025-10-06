import { useState } from 'react'
import { 
  LayoutDashboard, 
  AlertTriangle, 
  UploadCloud, 
  Search, 
  Brain, 
  FileText, 
  Box, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from './ui/utils'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { useNavigation } from './NavigationContext'

interface SidebarProps {
  className?: string
}

const navigationItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: 'dashboard',
    count: null,
    processing: false
  },
  {
    name: 'Incidents',
    icon: AlertTriangle,
    href: 'incidents',
    count: 12,
    processing: false
  },
  {
    name: 'Upload',
    icon: UploadCloud,
    href: 'upload',
    count: null,
    processing: true
  },
  {
    name: 'Search',
    icon: Search,
    href: 'search',
    count: null,
    processing: false
  },
  {
    name: 'Intelligence',
    icon: Brain,
    href: 'intelligence',
    count: 3,
    processing: false
  },
  {
    name: 'Reports',
    icon: FileText,
    href: 'reports',
    count: null,
    processing: false
  },
  {
    name: 'AR/VR Studio',
    icon: Box,
    href: 'arvr',
    count: null,
    processing: false
  },
  {
    name: 'Settings',
    icon: Settings,
    href: 'settings',
    count: null,
    processing: false
  }
]

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const { activeSection, setActiveSection } = useNavigation()

  return (
    <aside className={cn(
      "fixed left-0 top-18 bottom-0 z-40 bg-background border-r border-border transition-all duration-300",
      collapsed ? "w-18" : "w-70",
      className
    )}>
      <div className="flex flex-col h-full">
        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.href
            return (
              <div key={item.name} className="relative">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start relative transition-all duration-200 hover:bg-primary/5",
                    isActive && "bg-primary/10 text-primary border-l-3 border-primary",
                    collapsed && "px-3"
                  )}
                  onClick={() => setActiveSection(item.href)}
                >
                  <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.count && (
                        <Badge variant="secondary" className="ml-auto text-xs bg-accent/20 text-accent-foreground border-accent/30">
                          {item.count}
                        </Badge>
                      )}
                      {item.processing && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                      )}
                    </>
                  )}
                </Button>
                
                {/* Processing indicator for collapsed state */}
                {collapsed && item.processing && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-4 border-t border-border">
          {!collapsed && (
            <>
              {/* Storage Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="font-medium">2.4 GB / 10 GB</span>
                </div>
                <Progress value={24} className="h-2" />
              </div>

              {/* Help Link */}
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <span className="text-sm">Need Help?</span>
              </Button>
            </>
          )}

          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          {/* Shell Logo Watermark (when collapsed) */}
          {collapsed && (
            <div className="flex justify-center opacity-30">
              <div className="w-6 h-6 rounded-full shell-gradient flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}