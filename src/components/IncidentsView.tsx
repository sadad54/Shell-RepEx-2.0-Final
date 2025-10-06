import { useState } from 'react'
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  MoreHorizontal,
  Eye,
  Download,
  Share,
  Plus
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'

const allIncidents = [
  {
    id: 'INC-2024-001',
    title: 'Pipeline Pressure Anomaly - North Sector',
    severity: 'Critical',
    date: '2 hours ago',
    status: 'Processing',
    location: 'North Sector Alpha',
    assignee: 'Sarah Chen',
    category: 'Equipment'
  },
  {
    id: 'INC-2024-002', 
    title: 'Equipment Failure at Refinery Unit 3',
    severity: 'High',
    date: '5 hours ago',
    status: 'Analysis Complete',
    location: 'Refinery Unit 3',
    assignee: 'Mike Rodriguez',
    category: 'Equipment'
  },
  {
    id: 'INC-2024-003',
    title: 'Minor Spill During Maintenance',
    severity: 'Medium',
    date: '1 day ago',
    status: 'Report Generated',
    location: 'Loading Bay 7',
    assignee: 'Jennifer Park',
    category: 'Environmental'
  },
  {
    id: 'INC-2024-004',
    title: 'Safety Protocol Deviation',
    severity: 'Low',
    date: '2 days ago',
    status: 'Complete',
    location: 'Lab Building C',
    assignee: 'Alex Thompson',
    category: 'Safety'
  },
  {
    id: 'INC-2024-005',
    title: 'Gas Leak Detection - Platform B',
    severity: 'Critical',
    date: '3 days ago',
    status: 'Complete',
    location: 'Offshore Platform B',
    assignee: 'Maria Santos',
    category: 'Safety'
  },
  {
    id: 'INC-2024-006',
    title: 'Pump Maintenance Overrun',
    severity: 'Medium',
    date: '1 week ago',
    status: 'Report Generated',
    location: 'Pump Station 12',
    assignee: 'David Kim',
    category: 'Maintenance'
  }
]

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'bg-destructive text-destructive-foreground'
    case 'high': return 'bg-orange-500 text-white'
    case 'medium': return 'bg-accent text-accent-foreground'
    case 'low': return 'bg-blue-500 text-white'
    default: return 'bg-muted text-muted-foreground'
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'processing': return 'bg-accent/20 text-accent-foreground border-accent/30'
    case 'analysis complete': return 'bg-blue-500/10 text-blue-700 border-blue-500/20'
    case 'report generated': return 'bg-success/10 text-success border-success/20'
    case 'complete': return 'bg-success/10 text-success border-success/20'
    default: return 'bg-muted/10 text-muted-foreground border-muted/20'
  }
}

export function IncidentsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeverity, setFilterSeverity] = useState<string | null>(null)
  
  const filteredIncidents = allIncidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = !filterSeverity || incident.severity.toLowerCase() === filterSeverity.toLowerCase()
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Incident Management</h1>
          <p className="text-muted-foreground">
            Manage and track all incident investigations across your operations
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Incident
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card glass-card-hover glass-card-danger border-0">
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card glass-card-hover glass-card-warning border-0">
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">High</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card glass-card-hover glass-card-warning border-0">
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Medium</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card glass-card-hover border-0">
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">Low</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="glass-card glass-card-hover border-0">
        <CardContent className="p-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {['Critical', 'High', 'Medium', 'Low'].map((severity) => (
                <Button
                  key={severity}
                  variant={filterSeverity === severity ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterSeverity(filterSeverity === severity ? null : severity)}
                  className={filterSeverity === severity ? getSeverityColor(severity) : ''}
                >
                  {severity}
                </Button>
              ))}
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card className="glass-card glass-card-hover border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>All Incidents ({filteredIncidents.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.map((incident) => (
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
                    <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
                      {incident.category}
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
    </div>
  )
}