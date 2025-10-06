import { useState } from 'react'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Download, 
  Upload, 
  Monitor, 
  Smartphone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Key, 
  Trash2, 
  RefreshCw, 
  Save, 
  AlertTriangle,
  CheckCircle,
  Globe,
  Clock,
  Languages
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { cn } from './ui/utils'

// Mock user data
const userData = {
  profile: {
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@shell.com',
    role: 'Senior Safety Engineer',
    department: 'Operations Safety',
    location: 'Houston, TX',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60f5f9c?w=100&h=100&fit=crop&crop=face',
    employeeId: 'EMP-2024-5847',
    joinDate: '2019-03-15',
    lastLogin: '2024-12-16T09:15:00Z'
  },
  preferences: {
    theme: 'light',
    language: 'en',
    timezone: 'America/Chicago',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  },
  notifications: {
    email: true,
    push: true,
    desktop: false,
    criticalAlerts: true,
    weeklyReports: true,
    systemUpdates: false
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: '2024-11-15T10:30:00Z',
    activeSessions: 3,
    loginAttempts: 0
  }
}

const systemStats = {
  storageUsed: 2.4, // GB
  storageTotal: 10, // GB
  reportsGenerated: 127,
  analysesCompleted: 89,
  lastBackup: '2024-12-16T02:00:00Z',
  systemHealth: 98
}

export function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  
  // Form states
  const [profileData, setProfileData] = useState(userData.profile)
  const [preferences, setPreferences] = useState(userData.preferences)
  const [notifications, setNotifications] = useState(userData.notifications)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSaveChanges = () => {
    // In real app, this would save to backend
    setHasUnsavedChanges(false)
    setIsEditing(false)
  }

  const handleFieldChange = (field: string, value: any, section: 'profile' | 'preferences' | 'notifications') => {
    setHasUnsavedChanges(true)
    
    switch (section) {
      case 'profile':
        setProfileData(prev => ({ ...prev, [field]: value }))
        break
      case 'preferences':
        setPreferences(prev => ({ ...prev, [field]: value }))
        break
      case 'notifications':
        setNotifications(prev => ({ ...prev, [field]: value }))
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and system configuration
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {hasUnsavedChanges && (
            <Alert className="w-auto p-3">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="ml-2">You have unsaved changes</AlertDescription>
            </Alert>
          )}
          <Button 
            variant="outline"
            onClick={() => {
              setHasUnsavedChanges(false)
              setIsEditing(false)
              // Reset form data
              setProfileData(userData.profile)
              setPreferences(userData.preferences)
              setNotifications(userData.notifications)
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90"
            disabled={!hasUnsavedChanges}
            onClick={handleSaveChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 glass-card glass-card-hover border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="text-xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      disabled={!isEditing}
                      onChange={(e) => handleFieldChange('name', e.target.value, 'profile')}
                      className={cn(!isEditing && "bg-muted")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled={!isEditing}
                      onChange={(e) => handleFieldChange('email', e.target.value, 'profile')}
                      className={cn(!isEditing && "bg-muted")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={profileData.role}
                      disabled={!isEditing}
                      onChange={(e) => handleFieldChange('role', e.target.value, 'profile')}
                      className={cn(!isEditing && "bg-muted")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profileData.department}
                      disabled={!isEditing}
                      onChange={(e) => handleFieldChange('department', e.target.value, 'profile')}
                      className={cn(!isEditing && "bg-muted")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      disabled={!isEditing}
                      onChange={(e) => handleFieldChange('location', e.target.value, 'profile')}
                      className={cn(!isEditing && "bg-muted")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={profileData.employeeId}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glass-card-hover border-0">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Join Date</Label>
                  <p className="text-foreground">{formatDate(profileData.joinDate)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Last Login</Label>
                  <p className="text-foreground">{formatDateTime(profileData.lastLogin)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Account Status</Label>
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Theme</Label>
                  <Select 
                    value={preferences.theme} 
                    onValueChange={(value) => handleFieldChange('theme', value, 'preferences')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Display Density</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Localization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Language</Label>
                  <Select 
                    value={preferences.language}
                    onValueChange={(value) => handleFieldChange('language', value, 'preferences')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Timezone</Label>
                  <Select 
                    value={preferences.timezone}
                    onValueChange={(value) => handleFieldChange('timezone', value, 'preferences')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                      <SelectItem value="Europe/Amsterdam">CET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Date Format</Label>
                  <Select 
                    value={preferences.dateFormat}
                    onValueChange={(value) => handleFieldChange('dateFormat', value, 'preferences')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Time Format</Label>
                  <Select 
                    value={preferences.timeFormat}
                    onValueChange={(value) => handleFieldChange('timeFormat', value, 'preferences')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 Hour</SelectItem>
                      <SelectItem value="24h">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleFieldChange('email', checked, 'notifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleFieldChange('push', checked, 'notifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Desktop Notifications</Label>
                    <p className="text-sm text-muted-foreground">System desktop notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.desktop}
                    onCheckedChange={(checked) => handleFieldChange('desktop', checked, 'notifications')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Critical Alerts</Label>
                    <p className="text-sm text-muted-foreground">High-priority safety and security alerts</p>
                  </div>
                  <Switch 
                    checked={notifications.criticalAlerts}
                    onCheckedChange={(checked) => handleFieldChange('criticalAlerts', checked, 'notifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Summary of incidents and analyses</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => handleFieldChange('weeklyReports', checked, 'notifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">System Updates</Label>
                    <p className="text-sm text-muted-foreground">Platform updates and maintenance notices</p>
                  </div>
                  <Switch 
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => handleFieldChange('systemUpdates', checked, 'notifications')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Password & Authentication</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>

                <Button className="w-full">
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                  <Switch 
                    checked={userData.security.twoFactorEnabled}
                    onCheckedChange={() => {}}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Last Password Change</Label>
                  <p className="text-foreground">{formatDate(userData.security.lastPasswordChange)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Sessions</span>
                    <Badge variant="outline">{userData.security.activeSessions}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Failed Login Attempts</span>
                    <Badge variant="outline">{userData.security.loginAttempts}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Monitor className="w-4 h-4 mr-2" />
                    View Active Sessions
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Login History
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Revoke All Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card glass-card-hover border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Storage & Usage</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Storage Used</span>
                    <span className="font-medium">
                      {systemStats.storageUsed}GB / {systemStats.storageTotal}GB
                    </span>
                  </div>
                  <Progress value={(systemStats.storageUsed / systemStats.storageTotal) * 100} className="h-2" />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-primary">{systemStats.reportsGenerated}</p>
                    <p className="text-sm text-muted-foreground">Reports Generated</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-accent-foreground">{systemStats.analysesCompleted}</p>
                    <p className="text-sm text-muted-foreground">Analyses Completed</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Last Backup</Label>
                  <p className="text-foreground">{formatDateTime(systemStats.lastBackup)}</p>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glass-card-hover glass-card-success border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="w-5 h-5" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-success">{systemStats.systemHealth}%</div>
                  <p className="text-sm text-muted-foreground">System Health Score</p>
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    All Systems Operational
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response Time</span>
                    <Badge variant="outline" className="bg-success/10 text-success">
                      45ms
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Performance</span>
                    <Badge variant="outline" className="bg-success/10 text-success">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uptime</span>
                    <Badge variant="outline">
                      99.9%
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    System Diagnostics
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}