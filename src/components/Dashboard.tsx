import { 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Calendar,
  MapPin,
  Users,
  MoreHorizontal,
  Eye,
  Download,
  Share
} from 'lucide-react'
import { StatsCard } from './StatsCard'
import { UploadZone } from './UploadZone'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Progress } from './ui/progress'

const recentIncidents = [
  {
    id: 'INC-2024-001',
    title: 'Pipeline Pressure Anomaly - North Sector',
    severity: 'Critical',
    date: '2 hours ago',
    status: 'Processing',
    location: 'North Sector Alpha',
    assignee: 'Sarah Chen'
  },
  {
    id: 'INC-2024-002', 
    title: 'Equipment Failure at Refinery Unit 3',
    severity: 'High',
    date: '5 hours ago',
    status: 'Analysis Complete',
    location: 'Refinery Unit 3',
    assignee: 'Mike Rodriguez'
  },
  {
    id: 'INC-2024-003',
    title: 'Minor Spill During Maintenance',
    severity: 'Medium',
    date: '1 day ago',
    status: 'Report Generated',
    location: 'Loading Bay 7',
    assignee: 'Jennifer Park'
  },
  {
    id: 'INC-2024-004',
    title: 'Safety Protocol Deviation',
    severity: 'Low',
    date: '2 days ago',
    status: 'Complete',
    location: 'Lab Building C',
    assignee: 'Alex Thompson'
  }
]

const patternDetectionData = [
  {
    name: 'Equipment Aging Patterns',
    frequency: 23,
    trend: '+12%',
    riskScore: 85,
    affectedIncidents: 8,
    severity: 'critical'
  },
  {
    name: 'Seasonal Maintenance Issues',
    frequency: 15,
    trend: '+5%',
    riskScore: 68,
    affectedIncidents: 5,
    severity: 'high'
  },
  {
    name: 'Human Factor Correlation',
    frequency: 31,
    trend: '-8%',
    riskScore: 45,
    affectedIncidents: 12,
    severity: 'medium'
  }
]

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'bg-destructive text-destructive-foreground'
    case 'high': return 'bg-orange-500 text-white'
    case 'medium': return 'bg-warning text-black'
    case 'low': return 'bg-blue-500 text-white'
    default: return 'bg-muted text-muted-foreground'
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'processing': return 'bg-warning/10 text-warning border-warning/20'
    case 'analysis complete': return 'bg-blue-500/10 text-blue-700 border-blue-500/20'
    case 'report generated': return 'bg-success/10 text-success border-success/20'
    case 'complete': return 'bg-success/10 text-success border-success/20'
    default: return 'bg-muted/10 text-muted-foreground border-muted/20'
  }
}

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Welcome back, Executive</h1>
        <p className="text-lg text-muted-foreground">
          Here's what's happening with your incident investigations today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Incidents"
          value={48}
          trend={{ value: 12, label: 'vs last quarter', direction: 'up' }}
          icon={AlertTriangle}
          className="animate-glow"
        />
        
        <StatsCard
          title="Processing Queue"
          value={3}
          trend={{ value: -25, label: 'vs last week', direction: 'down' }}
          icon={Clock}
          variant="warning"
          className="shell-accent-medium"
        >
          <Progress value={65} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-1">Est. 2 hours remaining</p>
        </StatsCard>

        <StatsCard
          title="Critical Patterns"
          value={7}
          icon={TrendingUp}
          variant="danger"
        >
          <Button size="sm" variant="outline" className="mt-2 w-full">
            Requires Attention
          </Button>
        </StatsCard>

        <StatsCard
          title="Cost Savings"
          value="$2.4M"
          trend={{ value: 18, label: 'vs traditional', direction: 'up' }}
          icon={DollarSign}
          variant="success"
        >
          <p className="text-xs text-muted-foreground mt-1">ROI: 340%</p>
        </StatsCard>
      </div>

      {/* Upload Zone */}
      <Card className="glass-card glass-card-hover border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Quick Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UploadZone />
        </CardContent>
      </Card>

      {/* Recent Incidents Table */}
      <Card className="glass-card glass-card-hover border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Recent Incidents</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentIncidents.map((incident) => (
                <TableRow key={incident.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{incident.title}</p>
                      <p className="text-sm text-muted-foreground">{incident.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{incident.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {incident.assignee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{incident.assignee}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{incident.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pattern Detection Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Pattern Detection</h2>
          <Button variant="outline">View Intelligence Hub</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {patternDetectionData.map((pattern, index) => (
            <Card key={index} className={`glass-card glass-card-hover border-0 ${
              pattern.severity === 'critical' ? 'glass-card-danger' :
              pattern.severity === 'high' ? 'glass-card-warning' :
              ''
            }`}>
              <CardContent className="p-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">{pattern.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {pattern.trend}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Frequency</span>
                      <span className="text-2xl font-bold text-primary">{pattern.frequency}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Risk Score</span>
                        <span className="font-medium">{pattern.riskScore}/100</span>
                      </div>
                      <Progress value={pattern.riskScore} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Affected Incidents</span>
                      <span className="font-medium">{pattern.affectedIncidents}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}