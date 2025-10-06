import { useState } from 'react'
import { 
  FileText, 
  Download, 
  Share, 
  Copy, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Users,
  DollarSign,
  Lightbulb,
  BarChart3,
  X
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { cn } from './ui/utils'

interface ExecutiveSummaryProps {
  isOpen: boolean
  onClose: () => void
  reportData: {
    fileName: string
    analysisDate: string
    severity: string
    riskScore: number
    confidence: number
  }
}

const executiveSummaryData = {
  overview: {
    incidentType: "Equipment Failure - Critical Pump System",
    location: "Sector A, Unit B-23",
    dateTime: "2024-12-15 14:23:00 UTC",
    duration: "4 hours 15 minutes",
    status: "Resolved"
  },
  problemStatement: {
    primary: "Catastrophic bearing failure in Pump Unit B-23 resulted in unplanned shutdown and minor containment breach",
    secondary: [
      "Inadequate lubrication maintenance schedule contributed to accelerated bearing wear",
      "Emergency response protocol experienced 4.2-minute delay in execution",
      "Containment system activated successfully preventing major environmental impact"
    ]
  },
  rootCause: {
    immediate: "Bearing degradation due to insufficient lubrication",
    underlying: [
      "Maintenance schedule not aligned with manufacturer recommendations",
      "Lack of predictive monitoring systems for critical equipment",
      "Inadequate training on emergency shutdown procedures"
    ]
  },
  solutions: {
    immediate: [
      "Replace damaged bearing assembly and associated components",
      "Implement enhanced lubrication schedule for all critical pumps",
      "Conduct emergency response training for all Sector A personnel"
    ],
    longTerm: [
      "Deploy IoT-based predictive maintenance monitoring",
      "Upgrade emergency shutdown systems with automated triggers",
      "Establish redundant containment protocols for critical units"
    ]
  },
  whyAnalysis: [
    "Why did the bearing fail? - Insufficient lubrication caused excessive wear",
    "Why was lubrication insufficient? - Maintenance schedule was inadequate",
    "Why was the schedule inadequate? - Not updated to match operational intensity",
    "Why wasn't it updated? - Lack of continuous maintenance review process",
    "Why no review process? - Limited integration between operations and maintenance teams"
  ],
  howImplementation: [
    "How to prevent recurrence? - Implement predictive maintenance with IoT sensors",
    "How to reduce response time? - Automate emergency shutdown procedures",
    "How to improve containment? - Install secondary containment barriers",
    "How to ensure compliance? - Regular audit and review cycles"
  ],
  whatOutcomes: [
    "What was the impact? - $1.2M in direct costs, 4-hour production loss",
    "What was prevented? - Major environmental contamination avoided",
    "What needs monitoring? - All similar pump units require enhanced surveillance",
    "What are the lessons? - Proactive maintenance prevents catastrophic failures"
  ],
  trends: {
    historical: [
      "Similar incidents occurred 3 times in Q2 2024 across different sectors",
      "Average incident severity has increased 23% compared to previous year",
      "Equipment-related incidents account for 67% of all safety events"
    ],
    patterns: [
      "Peak incident frequency during high-production periods",
      "Bearing failures show strong correlation with ambient temperature >85°F",
      "Emergency response delays average 3.8 minutes across all incidents"
    ],
    predictions: [
      "Risk of similar incidents increases by 34% without intervention",
      "Predictive maintenance could reduce equipment failures by 78%",
      "Enhanced training programs could improve response times by 45%"
    ]
  },
  recommendations: {
    priority: "Critical",
    timeline: "Immediate implementation required",
    cost: "$2.8M initial investment",
    roi: "$8.4M annual savings potential",
    actions: [
      "Implement comprehensive predictive maintenance program",
      "Upgrade emergency response systems and training",
      "Deploy real-time monitoring across all critical equipment",
      "Establish cross-sector incident prevention task force"
    ]
  }
}

export function ExecutiveSummary({ isOpen, onClose, reportData }: ExecutiveSummaryProps) {
  const [selectedSection, setSelectedSection] = useState<string>('overview')

  const sections = [
    { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
    { id: 'problem', label: 'Problem Statement', icon: AlertTriangle },
    { id: 'analysis', label: 'Root Cause Analysis', icon: Target },
    { id: 'solutions', label: 'Solutions & Actions', icon: Lightbulb },
    { id: 'methodology', label: 'Why-How-What Analysis', icon: TrendingUp },
    { id: 'trends', label: 'Trends & Patterns', icon: BarChart3 },
    { id: 'recommendations', label: 'Strategic Recommendations', icon: CheckCircle }
  ]

  const handleCopyToClipboard = () => {
    const summaryText = generateFullSummaryText()
    navigator.clipboard.writeText(summaryText)
  }

  const generateFullSummaryText = () => {
    return `
SHELL REPEX v2.0 - EXECUTIVE SUMMARY
${reportData.fileName}
Analysis Date: ${reportData.analysisDate}

EXECUTIVE OVERVIEW
==================
Incident Type: ${executiveSummaryData.overview.incidentType}
Location: ${executiveSummaryData.overview.location}
Date/Time: ${executiveSummaryData.overview.dateTime}
Duration: ${executiveSummaryData.overview.duration}
Status: ${executiveSummaryData.overview.status}

PROBLEM STATEMENT
================
Primary Issue: ${executiveSummaryData.problemStatement.primary}

Secondary Issues:
${executiveSummaryData.problemStatement.secondary.map(item => `• ${item}`).join('\n')}

ROOT CAUSE ANALYSIS
==================
Immediate Cause: ${executiveSummaryData.rootCause.immediate}

Underlying Causes:
${executiveSummaryData.rootCause.underlying.map(item => `• ${item}`).join('\n')}

WHY ANALYSIS (5 Whys)
====================
${executiveSummaryData.whyAnalysis.map((why, index) => `${index + 1}. ${why}`).join('\n')}

HOW IMPLEMENTATION
=================
${executiveSummaryData.howImplementation.map(how => `• ${how}`).join('\n')}

WHAT OUTCOMES
=============
${executiveSummaryData.whatOutcomes.map(what => `• ${what}`).join('\n')}

TRENDS & PATTERNS
================
Historical Trends:
${executiveSummaryData.trends.historical.map(trend => `• ${trend}`).join('\n')}

Current Patterns:
${executiveSummaryData.trends.patterns.map(pattern => `• ${pattern}`).join('\n')}

Predictive Insights:
${executiveSummaryData.trends.predictions.map(prediction => `• ${prediction}`).join('\n')}

STRATEGIC RECOMMENDATIONS
========================
Priority: ${executiveSummaryData.recommendations.priority}
Timeline: ${executiveSummaryData.recommendations.timeline}
Investment: ${executiveSummaryData.recommendations.cost}
ROI Potential: ${executiveSummaryData.recommendations.roi}

Key Actions:
${executiveSummaryData.recommendations.actions.map(action => `• ${action}`).join('\n')}

Generated by Shell RepEx v2.0 AI Analysis Platform
© Shell Global Solutions International B.V.
    `
  }

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card className="glass-card glass-card-hover border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Incident Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Incident Type</p>
                    <p className="font-medium">{executiveSummaryData.overview.incidentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{executiveSummaryData.overview.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{executiveSummaryData.overview.dateTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{executiveSummaryData.overview.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {executiveSummaryData.overview.status}
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Risk Score: {reportData.riskScore}
                  </Badge>
                  <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
                    {reportData.confidence}% Confidence
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'problem':
        return (
          <div className="space-y-6">
            <Card className="glass-card glass-card-hover glass-card-danger border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Problem Statement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">Primary Issue</h4>
                  <p className="text-foreground">{executiveSummaryData.problemStatement.primary}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Secondary Issues</h4>
                  <div className="space-y-2">
                    {executiveSummaryData.problemStatement.secondary.map((issue, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-orange-700">{index + 1}</span>
                        </div>
                        <p className="text-foreground">{issue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'analysis':
        return (
          <div className="space-y-6">
            <Card className="glass-card glass-card-hover border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Root Cause Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Immediate Cause</h4>
                  <p className="text-foreground">{executiveSummaryData.rootCause.immediate}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Underlying Causes</h4>
                  <div className="space-y-2">
                    {executiveSummaryData.rootCause.underlying.map((cause, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-accent-foreground">{index + 1}</span>
                        </div>
                        <p className="text-foreground">{cause}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'solutions':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card glass-card-hover glass-card-warning border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Immediate Solutions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {executiveSummaryData.solutions.immediate.map((solution, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-accent-foreground">{index + 1}</span>
                      </div>
                      <p className="text-foreground">{solution}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card glass-card-hover glass-card-success border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Long-term Solutions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  {executiveSummaryData.solutions.longTerm.map((solution, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary-foreground">{index + 1}</span>
                      </div>
                      <p className="text-foreground">{solution}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'methodology':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glass-card glass-card-hover border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Why Analysis (5 Whys)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  {executiveSummaryData.whyAnalysis.map((why, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-foreground">{why}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card glass-card-hover glass-card-warning border-0">
                <CardHeader>
                  <CardTitle className="text-lg">How Implementation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  {executiveSummaryData.howImplementation.map((how, index) => (
                    <div key={index} className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                      <p className="text-sm text-foreground">{how}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card glass-card-hover glass-card-success border-0">
                <CardHeader>
                  <CardTitle className="text-lg">What Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  {executiveSummaryData.whatOutcomes.map((what, index) => (
                    <div key={index} className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-sm text-foreground">{what}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'trends':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card className="glass-card glass-card-hover border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Historical Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  {executiveSummaryData.trends.historical.map((trend, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="text-foreground">{trend}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card glass-card-hover status-card-warning shell-accent-medium border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 interactive-icon animate-glow" />
                    <span>Current Patterns</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  {executiveSummaryData.trends.patterns.map((pattern, index) => (
                    <div key={index} className="p-3 data-card shell-accent-subtle rounded-lg transform hover:scale-102 transition-all duration-300">
                      <p className="text-foreground">{pattern}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card glass-card-hover status-card-danger shell-accent-medium border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 interactive-icon animate-glow" />
                    <span>Predictive Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  {executiveSummaryData.trends.predictions.map((prediction, index) => (
                    <div key={index} className="p-3 data-card shell-accent-medium rounded-lg transform hover:scale-102 transition-all duration-300">
                      <p className="text-foreground">{prediction}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'recommendations':
        return (
          <div className="space-y-6">
            <Card className="glass-card glass-card-hover status-card-success shell-accent-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 interactive-icon animate-glow" />
                  <span>Strategic Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 data-card shell-accent-strong rounded-lg transform hover:scale-102 transition-all duration-300">
                    <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2 interactive-icon animate-glow" />
                    <p className="font-medium text-destructive">{executiveSummaryData.recommendations.priority}</p>
                    <p className="text-xs text-muted-foreground">Priority Level</p>
                  </div>
                  <div className="text-center p-4 data-card shell-accent-medium rounded-lg transform hover:scale-102 transition-all duration-300">
                    <Clock className="w-8 h-8 text-accent-foreground mx-auto mb-2 interactive-icon" />
                    <p className="font-medium text-accent-foreground">Immediate</p>
                    <p className="text-xs text-muted-foreground">Timeline</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-primary">{executiveSummaryData.recommendations.cost}</p>
                    <p className="text-xs text-muted-foreground">Investment</p>
                  </div>
                  <div className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="font-medium text-success">{executiveSummaryData.recommendations.roi}</p>
                    <p className="text-xs text-muted-foreground">ROI Potential</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-3">Key Actions Required</h4>
                  <div className="space-y-3">
                    {executiveSummaryData.recommendations.actions.map((action, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground">{action}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">High Impact</Badge>
                            <Badge variant="outline" className="text-xs">Strategic Priority</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold text-foreground">Executive Summary</DialogTitle>
              <p className="text-muted-foreground">
                Comprehensive analysis report for {reportData.fileName}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share Report
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Section Navigation */}
          <div className="w-80 border-r border-border bg-muted/30 p-4">
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={cn(
                      'w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors',
                      selectedSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-background text-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full p-6">
              {renderSectionContent()}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}