import { Search, Command, Bell, Upload, HelpCircle, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import shellLogo from '../assets/shell_logo.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { mockIncidentImages } from '../assets/mockImages.ts'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-18 glass border-b border-border">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo & Branding */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {/* Shell Logo */}
            <div className="w-8 h-8 flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <img 
                src={shellLogo} 
                alt="Shell" 
                className="max-w-full max-h-full object-contain drop-shadow-lg" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  console.error('Shell logo failed to load')
                }}
              />
            </div>
            <span className="font-semibold text-xl text-foreground tracking-tight">RepEx</span>
            <div className="w-px h-6 bg-border opacity-50"></div>
          </div>
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Dashboard</span>
            <span className="text-accent/60">/</span>
            <span className="text-primary font-medium">Overview</span>
          </nav>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-3">
          {/* Command Palette */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 min-w-[200px] justify-start text-muted-foreground"
          >
            <Search className="w-4 h-4" />
            <span>Search incidents...</span>
            <Badge variant="secondary" className="ml-auto bg-accent/10 text-accent-foreground border-accent/30">
              ⌘K
            </Badge>
          </Button>

          {/* Upload Button */}
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Upload className="w-4 h-4 mr-2" />
            Upload Report
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
          </Button>

          {/* Help */}
          <Button variant="ghost" size="icon">
            <HelpCircle className="w-5 h-5" />
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockIncidentImages.crane} alt="Executive" />
                  <AvatarFallback>EX</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">Executive User</span>
                  <span className="text-sm text-muted-foreground">executive@shell.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>API Keys</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}