import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  User, 
  Tag, 
  Clock,
  Eye,
  Download,
  Star,
  SlidersHorizontal,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { cn } from './ui/utils'

// Mock search data expanding on the reports data
const searchableData = [
  {
    id: 'RPT-2024-001',
    type: 'report',
    title: 'Critical Pump Failure - Sector A Unit B-23',
    description: 'Comprehensive analysis of bearing degradation in Pump Unit B-23 due to inadequate lubrication schedule',
    content: 'Equipment failure analysis bearing degradation lubrication maintenance shutdown emergency response containment environmental impact',
    author: 'Sarah Chen',
    date: '2024-12-15T14:23:00Z',
    category: 'Equipment Failure',
    severity: 'Critical',
    location: 'Sector A',
    tags: ['High Priority', 'Equipment Failure', 'Environmental Impact', 'Maintenance'],
    accessCount: 24,
    thumbnail: 'https://images.unsplash.com/photo-1606124257613-9eb03c4eb0d6?w=200&h=150&fit=crop'
  },
  {
    id: 'INV-2024-003',
    type: 'investigation',
    title: 'Pipeline Integrity Assessment Investigation',
    description: 'Detailed investigation into pipeline integrity issues identified during Q4 assessment',
    content: 'pipeline integrity corrosion assessment ultrasonic testing pressure testing structural analysis',
    author: 'Michael Torres',
    date: '2024-12-10T10:30:00Z',
    category: 'Preventive Assessment',
    severity: 'Medium',
    location: 'Sector B',
    tags: ['Pipeline', 'Preventive', 'Integrity', 'Structural Analysis'],
    accessCount: 18,
    thumbnail: 'https://images.unsplash.com/photo-1573153178631-49e3aa9e018b?w=200&h=150&fit=crop'
  },
  {
    id: 'INC-2024-007',
    type: 'incident',
    title: 'Environmental Spill Response Incident',
    description: 'Emergency response and containment procedures for environmental spill event',
    content: 'environmental spill containment emergency response cleanup remediation environmental impact assessment',
    author: 'Dr. Jennifer Liu',
    date: '2024-12-08T16:45:00Z',
    category: 'Environmental Incident',
    severity: 'High',
    location: 'Sector C',
    tags: ['Environmental', 'Emergency Response', 'Containment', 'Remediation'],
    accessCount: 31,
    thumbnail: 'https://images.unsplash.com/photo-1582036683005-b95da0de191b?w=200&h=150&fit=crop'
  },
  {
    id: 'TRN-2024-002',
    type: 'training',
    title: 'Safety Training Effectiveness Study',
    description: 'Analysis of safety training program effectiveness and recommendations for improvement',
    content: 'safety training effectiveness study personnel development emergency procedures knowledge assessment',
    author: 'Carlos Mendez',
    date: '2024-12-05T09:15:00Z',
    category: 'Training Assessment',
    severity: 'Low',
    location: 'All Sectors',
    tags: ['Training', 'Safety', 'Personnel Development', 'Assessment'],
    accessCount: 12,
    thumbnail: null
  },
  {
    id: 'DOC-2024-012',
    type: 'document',
    title: 'Emergency Response Procedures Manual',
    description: 'Updated emergency response procedures and protocols for all facility operations',
    content: 'emergency response procedures manual protocols safety guidelines evacuation containment communication',
    author: 'Safety Committee',
    date: '2024-11-28T11:00:00Z',
    category: 'Safety Documentation',
    severity: 'Medium',
    location: 'All Sectors',
    tags: ['Procedures', 'Emergency Response', 'Safety Guidelines', 'Protocols'],
    accessCount: 45,
    thumbnail: null
  },
  {
    id: 'ANA-2024-008',
    type: 'analysis',
    title: 'Predictive Maintenance Algorithm Performance',
    description: 'Analysis of AI-driven predictive maintenance algorithm performance and accuracy metrics',
    content: 'predictive maintenance artificial intelligence machine learning algorithm performance analytics IoT sensors',
    author: 'Data Science Team',
    date: '2024-11-25T14:20:00Z',
    category: 'Technology Assessment',
    severity: 'Low',
    location: 'All Sectors',
    tags: ['AI', 'Predictive Maintenance', 'Analytics', 'IoT', 'Machine Learning'],
    accessCount: 29,
    thumbnail: null
  }
]

export function SearchView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    category: 'all',
    severity: 'all',
    location: 'all',
    dateRange: 'all'
  })
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('relevance')

  // Extract unique values for filter options
  const allTags = Array.from(new Set(searchableData.flatMap(item => item.tags)))
  const allCategories = Array.from(new Set(searchableData.map(item => item.category)))
  const allLocations = Array.from(new Set(searchableData.map(item => item.location)))

  // Search and filter logic
  const filteredResults = searchableData.filter(item => {
    // Text search
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0)
    const searchableText = `${item.title} ${item.description} ${item.content} ${item.author}`.toLowerCase()
    const matchesSearch = searchQuery === '' || searchTerms.every(term => searchableText.includes(term))

    // Filters
    const matchesType = selectedFilters.type === 'all' || item.type === selectedFilters.type
    const matchesCategory = selectedFilters.category === 'all' || item.category === selectedFilters.category
    const matchesSeverity = selectedFilters.severity === 'all' || item.severity === selectedFilters.severity
    const matchesLocation = selectedFilters.location === 'all' || item.location === selectedFilters.location
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag))

    // Date filter
    let matchesDate = true
    if (selectedFilters.dateRange !== 'all') {
      const itemDate = new Date(item.date)
      const now = new Date()
      switch (selectedFilters.dateRange) {
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesDate = itemDate > weekAgo
          break
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          matchesDate = itemDate > monthAgo
          break
        case 'quarter':
          const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          matchesDate = itemDate > quarterAgo
          break
      }
    }

    return matchesSearch && matchesType && matchesCategory && matchesSeverity && matchesLocation && matchesTags && matchesDate
  })

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'popularity':
        return b.accessCount - a.accessCount
      case 'severity':
        const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
        return (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
               (severityOrder[a.severity as keyof typeof severityOrder] || 0)
      default: // relevance
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-destructive text-destructive-foreground'
      case 'High':
        return 'bg-orange-500 text-white'
      case 'Medium':
        return 'bg-accent text-accent-foreground'
      case 'Low':
        return 'bg-success text-success-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'report':
        return <FileText className="w-4 h-4" />
      case 'investigation':
        return <Eye className="w-4 h-4" />
      case 'incident':
        return <AlertTriangle className="w-4 h-4" />
      case 'training':
        return <User className="w-4 h-4" />
      case 'document':
        return <FileText className="w-4 h-4" />
      case 'analysis':
        return <TrendingUp className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const clearFilters = () => {
    setSelectedFilters({
      type: 'all',
      category: 'all',
      severity: 'all',
      location: 'all',
      dateRange: 'all'
    })
    setSelectedTags([])
    setSearchQuery('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Advanced Search</h1>
          <p className="text-muted-foreground">
            Search across all reports, incidents, analyses, and documentation
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={clearFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
          <Button variant="outline" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="glass-card glass-card-hover border-0">
        <CardContent className="p-6 relative z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search reports, incidents, documentation, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Select value={selectedFilters.type} onValueChange={(value) => setSelectedFilters({...selectedFilters, type: value})}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Content Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="report">Reports</SelectItem>
            <SelectItem value="investigation">Investigations</SelectItem>
            <SelectItem value="incident">Incidents</SelectItem>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="analysis">Analysis</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedFilters.severity} onValueChange={(value) => setSelectedFilters({...selectedFilters, severity: value})}>
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

        <Select value={selectedFilters.dateRange} onValueChange={(value) => setSelectedFilters({...selectedFilters, dateRange: value})}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="quarter">Past Quarter</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="severity">Severity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Advanced Filters */}
      <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
        <CollapsibleContent>
          <Card className="glass-card glass-card-hover glass-card-warning border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Advanced Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Category</Label>
                  <Select value={selectedFilters.category} onValueChange={(value) => setSelectedFilters({...selectedFilters, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {allCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Location</Label>
                  <Select value={selectedFilters.location} onValueChange={(value) => setSelectedFilters({...selectedFilters, location: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {allLocations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTags([...selectedTags, tag])
                          } else {
                            setSelectedTags(selectedTags.filter(t => t !== tag))
                          }
                        }}
                      />
                      <Label htmlFor={tag} className="text-sm">{tag}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Search Results */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Found {sortedResults.length} result{sortedResults.length !== 1 ? 's' : ''}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      <div className="space-y-4">
        {sortedResults.map((result) => (
          <Card key={result.id} className="glass-card glass-card-hover border-0">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start space-x-4">
                {result.thumbnail && (
                  <ImageWithFallback
                    src={result.thumbnail}
                    alt={result.title}
                    className="w-24 h-18 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(result.type)}
                        <Badge variant="outline" className="text-xs">
                          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                        </Badge>
                        <Badge className={cn("text-xs", getSeverityColor(result.severity))}>
                          {result.severity}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                        {result.title}
                      </h3>
                      
                      <p className="text-muted-foreground">{result.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{result.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(result.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{result.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{result.accessCount} views</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {result.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {result.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{result.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedResults.length === 0 && searchQuery && (
        <Card className="glass-card glass-card-hover border-0">
          <CardContent className="p-12 text-center relative z-10">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}