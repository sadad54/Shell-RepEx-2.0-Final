import { useState } from 'react'
import { 
  FileText, 
  Download, 
  Share, 
  Eye, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  BarChart3, 
  Play, 
  Archive, 
  Star,
  MoreVertical,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ExecutiveSummary } from './ExecutiveSummary'
import { cn } from './ui/utils'

// Mock data for reports repository
const reportsData = [
  {
    id: 'RPT-2024-001',
    fileName: 'Sector_A_Pump_Failure_Analysis.pdf',
    title: 'Critical Pump Failure - Sector A Unit B-23',
    uploadDate: '2024-12-15T14:23:00Z',
    analysisDate: '2024-12-15T14:45:00Z',
    uploadedBy: {
      name: 'Sarah Chen',
      role: 'Safety Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60f5f9c?w=100&h=100&fit=crop&crop=face'
    },
    severity: 'Critical',
    riskScore: 78,
    confidence: 94,
    status: 'Completed',
    category: 'Equipment Failure',
    location: 'Sector A',
    estimatedCost: '$1.2M',
    accessCount: 24,
    lastAccessed: '2024-12-16T09:15:00Z',
    accessedBy: [
      { name: 'John Mitchell', role: 'Operations Manager', time: '2024-12-16T09:15:00Z' },
      { name: 'Dr. Amanda Foster', role: 'Chief Safety Officer', time: '2024-12-16T08:30:00Z' },
      { name: 'Marcus Rodriguez', role: 'Maintenance Supervisor', time: '2024-12-16T07:45:00Z' },
      { name: 'Emily Watson', role: 'Environmental Engineer', time: '2024-12-15T16:20:00Z' },
      { name: 'David Park', role: 'Risk Analyst', time: '2024-12-15T15:10:00Z' }
    ],
    tags: ['High Priority', 'Equipment Failure', 'Environmental Impact'],
    visualAssets: [
      'https://images.unsplash.com/photo-1606124257613-9eb03c4eb0d6?w=200&h=150&fit=crop',
      'https://images.unsplash.com/photo-1639600993675-2281b2c939f0?w=200&h=150&fit=crop'
    ]
  },
  {
    id: 'RPT-2024-002', 
    fileName: 'Pipeline_Integrity_Assessment_Q4.pdf',
    title: 'Pipeline Integrity Assessment - Q4 2024',
    uploadDate: '2024-12-10T10:30:00Z',
    analysisDate: '2024-12-10T11:15:00Z',
    uploadedBy: {
      name: 'Michael Torres',
      role: 'Pipeline Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    severity: 'Medium',
    riskScore: 45,
    confidence: 87,
    status: 'Completed',
    category: 'Preventive Assessment',
    location: 'Sector B',
    estimatedCost: '$450K',
    accessCount: 18,
    lastAccessed: '2024-12-14T14:20:00Z',
    accessedBy: [
      { name: 'Lisa Thompson', role: 'Senior Engineer', time: '2024-12-14T14:20:00Z' },
      { name: 'Robert Kim', role: 'Integrity Specialist', time: '2024-12-13T11:30:00Z' },
      { name: 'Rachel Green', role: 'Compliance Officer', time: '2024-12-12T16:45:00Z' }
    ],
    tags: ['Routine Assessment', 'Pipeline', 'Preventive'],
    visualAssets: [
      'https://images.unsplash.com/photo-1573153178631-49e3aa9e018b?w=200&h=150&fit=crop'
    ]
  },
  {
    id: 'RPT-2024-003',
    fileName: 'Environmental_Spill_Response_Analysis.pdf', 
    title: 'Environmental Spill Response Analysis',
    uploadDate: '2024-12-08T16:45:00Z',
    analysisDate: '2024-12-08T17:30:00Z',
    uploadedBy: {
      name: 'Dr. Jennifer Liu',
      role: 'Environmental Scientist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
    },
    severity: 'High',
    riskScore: 67,
    confidence: 91,
    status: 'Completed',
    category: 'Environmental Incident',
    location: 'Sector C',
    estimatedCost: '$850K',
    accessCount: 31,
    lastAccessed: '2024-12-15T13:10:00Z',
    accessedBy: [
      { name: 'Environmental Response Team', role: 'Emergency Response', time: '2024-12-15T13:10:00Z' },
      { name: 'Regional Director', role: 'Executive', time: '2024-12-14T09:00:00Z' },
      { name: 'Legal Compliance Team', role: 'Legal', time: '2024-12-13T15:30:00Z' }
    ],
    tags: ['Environmental', 'Emergency Response', 'Compliance'],
    visualAssets: [
      'https://images.unsplash.com/photo-1582036683005-b95da0de191b?w=200&h=150&fit=crop'
    ]
  },
  {
    id: 'RPT-2024-004',
    fileName: 'Safety_Training_Effectiveness_Study.pdf',
    title: 'Safety Training Effectiveness Analysis',
    uploadDate: '2024-12-05T09:15:00Z',
    analysisDate: '2024-12-05T10:00:00Z',
    uploadedBy: {
      name: 'Carlos Mendez',
      role: 'Training Coordinator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    severity: 'Low',
    riskScore: 28,
    confidence: 85,
    status: 'In Review',
    category: 'Training Assessment',
    location: 'All Sectors',
    estimatedCost: '$120K',
    accessCount: 12,
    lastAccessed: '2024-12-12T11:45:00Z',
    accessedBy: [
      { name: 'HR Training Team', role: 'Human Resources', time: '2024-12-12T11:45:00Z' },
      { name: 'Safety Committee', role: 'Safety', time: '2024-12-10T14:20:00Z' }
    ],
    tags: ['Training', 'Safety', 'Performance Analysis'],
    visualAssets: []
  }
]

const summaryStats = {
  totalReports: reportsData.length,
  criticalReports: reportsData.filter(r => r.severity === 'Critical').length,
  completedAnalyses: reportsData.filter(r => r.status === 'Completed').length,
  totalAccessCount: reportsData.reduce((sum, r) => sum + r.accessCount, 0),
  avgRiskScore: Math.round(reportsData.reduce((sum, r) => sum + r.riskScore, 0) / reportsData.length),
  recentUploads: reportsData.filter(r => {
    const uploadDate = new Date(r.uploadDate)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return uploadDate > weekAgo
  }).length
}

export function ReportsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [selectedReport, setSelectedReport] = useState<typeof reportsData[0] | null>(null)
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(false)
  const [activeTab, setActiveTab] = useState('repository')

  const filteredReports = reportsData.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.uploadedBy.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory
    const matchesSeverity = selectedSeverity === 'all' || report.severity === selectedSeverity
    
    return matchesSearch && matchesCategory && matchesSeverity
  })

  const handleViewReport = (report: typeof reportsData[0]) => {
    setSelectedReport(report)
    // Update access tracking (in real app, this would update backend)
    report.accessCount += 1
    report.lastAccessed = new Date().toISOString()
    report.accessedBy.unshift({
      name: 'Current User',
      role: 'System Administrator',
      time: new Date().toISOString()
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      case 'High':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'Medium':
        return <Clock className="w-4 h-4 text-accent-foreground" />
      case 'Low':
        return <CheckCircle className="w-4 h-4 text-success" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Reports Repository</h1>
          <p className="text-muted-foreground">
            Comprehensive archive of incident analyses and safety assessments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Archive className="w-4 h-4 mr-2" />
            Archive Reports
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="glass-card glass-card-hover border-0">
          <CardContent className="p-4 relative z-10">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{summaryStats.totalReports}</div>
              <p className="text-sm text-muted-foreground">Total Reports</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card glass-card-hover glass-card-danger border-0">
          <CardContent className="p-4 relative z-10">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-destructive">{summaryStats.criticalReports}</div>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card glass-card-hover glass-card-success border-0">
          <CardContent className="p-4 relative z-10">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-success">{summaryStats.completedAnalyses}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card glass-card-hover glass-card-warning border-0">
          <CardContent className="p-4 relative z-10">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-accent-foreground">{summaryStats.totalAccessCount}</div>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card glass-card-hover border-0">
          <CardContent className="p-4 relative z-10">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-orange-500">{summaryStats.avgRiskScore}</div>
              <p className="text-sm text-muted-foreground">Avg Risk Score</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card glass-card-hover border-0">
          <CardContent className="p-4 relative z-10">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-info">{summaryStats.recentUploads}</div>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="repository">Repository</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="access-tracking">Access Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="repository" className="space-y-6 mt-6">
          {/* Search and Filters */}
          <Card className="glass-card glass-card-hover border-0">
            <CardContent className="p-4 relative z-10">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search reports, authors, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Equipment Failure">Equipment Failure</SelectItem>
                    <SelectItem value="Environmental Incident">Environmental Incident</SelectItem>
                    <SelectItem value="Preventive Assessment">Preventive Assessment</SelectItem>
                    <SelectItem value="Training Assessment">Training Assessment</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card className="glass-card glass-card-hover border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Reports Archive ({filteredReports.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Details</TableHead>
                    <TableHead>Analysis</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Access Info</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{report.title}</h4>
                              <p className="text-sm text-muted-foreground">{report.fileName}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">{report.category}</Badge>
                                <Badge variant="outline" className="text-xs">{report.location}</Badge>
                              </div>
                            </div>
                            {report.visualAssets.length > 0 && (
                              <div className="flex space-x-1">
                                {report.visualAssets.slice(0, 2).map((asset, index) => (
                                  <ImageWithFallback
                                    key={index}
                                    src={asset}
                                    alt="Visual evidence"
                                    className="w-8 h-8 object-cover rounded"
                                  />
                                ))}
                                {report.visualAssets.length > 2 && (
                                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                    <span className="text-xs">+{report.visualAssets.length - 2}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            {getSeverityIcon(report.severity)}
                            <Badge className={cn(
                              report.severity === 'Critical' ? 'bg-destructive text-destructive-foreground' :
                              report.severity === 'High' ? 'bg-orange-500 text-white' :
                              report.severity === 'Medium' ? 'bg-accent text-accent-foreground' :
                              'bg-success text-success-foreground'
                            )}>
                              {report.severity}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Risk Score: <span className="font-medium">{report.riskScore}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Confidence: <span className="font-medium">{report.confidence}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={report.uploadedBy.avatar} />
                            <AvatarFallback>{report.uploadedBy.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{report.uploadedBy.name}</p>
                            <p className="text-sm text-muted-foreground">{report.uploadedBy.role}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(report.uploadDate)}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{report.accessCount} views</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Last: {formatDate(report.lastAccessed)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            by {report.accessedBy[0]?.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={report.status === 'Completed' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewReport(report)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedReport(report)
                              setShowExecutiveSummary(true)
                            }}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Summary
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="w-4 h-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className="w-4 h-4 mr-2" />
                                Bookmark
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card glass-card-hover glass-card-warning border-0">
              <CardHeader>
                <CardTitle>Reports by Category</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {Object.entries(
                    reportsData.reduce((acc, report) => {
                      acc[report.category] = (acc[report.category] || 0) + 1
                      return acc
                    }, {} as Record<string, number>)
                  ).map(([category, count]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm text-muted-foreground">{count}</span>
                      </div>
                      <Progress value={(count / reportsData.length) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glass-card-hover glass-card-danger border-0">
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {Object.entries(
                    reportsData.reduce((acc, report) => {
                      acc[report.severity] = (acc[report.severity] || 0) + 1
                      return acc
                    }, {} as Record<string, number>)
                  ).map(([severity, count]) => (
                    <div key={severity} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          {getSeverityIcon(severity)}
                          <span className="text-sm font-medium">{severity}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{count}</span>
                      </div>
                      <Progress value={(count / reportsData.length) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Most Accessed Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportsData
                    .sort((a, b) => b.accessCount - a.accessCount)
                    .slice(0, 5)
                    .map((report, index) => (
                    <div key={report.id} className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.uploadedBy.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{report.accessCount} views</p>
                        <p className="text-sm text-muted-foreground">Last: {formatDate(report.lastAccessed)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access-tracking" className="space-y-6 mt-6">
          <Card className="glass-card glass-card-hover border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Report Access Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-6">
                {reportsData.map((report) => (
                  <div key={report.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-foreground">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.fileName}</p>
                      </div>
                      <Badge variant="outline">{report.accessCount} total views</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-foreground">Recent Access History</h5>
                      {report.accessedBy.slice(0, 5).map((access, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {access.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-foreground">{access.name}</p>
                              <p className="text-xs text-muted-foreground">{access.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{formatDate(access.time)}</p>
                          </div>
                        </div>
                      ))}
                      {report.accessedBy.length > 5 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{report.accessedBy.length - 5} more accesses
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Executive Summary Dialog */}
      {showExecutiveSummary && selectedReport && (
        <ExecutiveSummary
          isOpen={showExecutiveSummary}
          onClose={() => setShowExecutiveSummary(false)}
          reportData={{
            fileName: selectedReport.fileName,
            analysisDate: formatDate(selectedReport.analysisDate),
            severity: selectedReport.severity,
            riskScore: selectedReport.riskScore,
            confidence: selectedReport.confidence
          }}
        />
      )}
    </div>
  )
}