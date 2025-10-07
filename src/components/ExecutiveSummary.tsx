// import { useState } from 'react'
// import { 
//   FileText, 
//   Download, 
//   Share, 
//   Copy, 
//   TrendingUp, 
//   AlertTriangle, 
//   CheckCircle, 
//   Clock,
//   Target,
//   Users,
//   DollarSign,
//   Lightbulb,
//   BarChart3,
//   X
// } from 'lucide-react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog'
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { Separator } from './ui/separator'
// import { ScrollArea } from './ui/scroll-area'
// import { cn } from './ui/utils'

// interface ExecutiveSummaryProps {
//   isOpen: boolean
//   onClose: () => void
//   reportData: {
//     fileName: string
//     analysisDate: string
//     severity: string
//     riskScore: number
//     confidence: number
//   }
// }

// const executiveSummaryData = {
//   overview: {
//     incidentType: "Equipment Failure - Critical Pump System",
//     location: "Sector A, Unit B-23",
//     dateTime: "2024-12-15 14:23:00 UTC",
//     duration: "4 hours 15 minutes",
//     status: "Resolved"
//   },
//   problemStatement: {
//     primary: "Catastrophic bearing failure in Pump Unit B-23 resulted in unplanned shutdown and minor containment breach",
//     secondary: [
//       "Inadequate lubrication maintenance schedule contributed to accelerated bearing wear",
//       "Emergency response protocol experienced 4.2-minute delay in execution",
//       "Containment system activated successfully preventing major environmental impact"
//     ]
//   },
//   rootCause: {
//     immediate: "Bearing degradation due to insufficient lubrication",
//     underlying: [
//       "Maintenance schedule not aligned with manufacturer recommendations",
//       "Lack of predictive monitoring systems for critical equipment",
//       "Inadequate training on emergency shutdown procedures"
//     ]
//   },
//   solutions: {
//     immediate: [
//       "Replace damaged bearing assembly and associated components",
//       "Implement enhanced lubrication schedule for all critical pumps",
//       "Conduct emergency response training for all Sector A personnel"
//     ],
//     longTerm: [
//       "Deploy IoT-based predictive maintenance monitoring",
//       "Upgrade emergency shutdown systems with automated triggers",
//       "Establish redundant containment protocols for critical units"
//     ]
//   },
//   whyAnalysis: [
//     "Why did the bearing fail? - Insufficient lubrication caused excessive wear",
//     "Why was lubrication insufficient? - Maintenance schedule was inadequate",
//     "Why was the schedule inadequate? - Not updated to match operational intensity",
//     "Why wasn't it updated? - Lack of continuous maintenance review process",
//     "Why no review process? - Limited integration between operations and maintenance teams"
//   ],
//   howImplementation: [
//     "How to prevent recurrence? - Implement predictive maintenance with IoT sensors",
//     "How to reduce response time? - Automate emergency shutdown procedures",
//     "How to improve containment? - Install secondary containment barriers",
//     "How to ensure compliance? - Regular audit and review cycles"
//   ],
//   whatOutcomes: [
//     "What was the impact? - $1.2M in direct costs, 4-hour production loss",
//     "What was prevented? - Major environmental contamination avoided",
//     "What needs monitoring? - All similar pump units require enhanced surveillance",
//     "What are the lessons? - Proactive maintenance prevents catastrophic failures"
//   ],
//   trends: {
//     historical: [
//       "Similar incidents occurred 3 times in Q2 2024 across different sectors",
//       "Average incident severity has increased 23% compared to previous year",
//       "Equipment-related incidents account for 67% of all safety events"
//     ],
//     patterns: [
//       "Peak incident frequency during high-production periods",
//       "Bearing failures show strong correlation with ambient temperature >85°F",
//       "Emergency response delays average 3.8 minutes across all incidents"
//     ],
//     predictions: [
//       "Risk of similar incidents increases by 34% without intervention",
//       "Predictive maintenance could reduce equipment failures by 78%",
//       "Enhanced training programs could improve response times by 45%"
//     ]
//   },
//   recommendations: {
//     priority: "Critical",
//     timeline: "Immediate implementation required",
//     cost: "$2.8M initial investment",
//     roi: "$8.4M annual savings potential",
//     actions: [
//       "Implement comprehensive predictive maintenance program",
//       "Upgrade emergency response systems and training",
//       "Deploy real-time monitoring across all critical equipment",
//       "Establish cross-sector incident prevention task force"
//     ]
//   }
// }

// export function ExecutiveSummary({ isOpen, onClose, reportData }: ExecutiveSummaryProps) {
//   const [selectedSection, setSelectedSection] = useState<string>('overview')

//   const sections = [
//     { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
//     { id: 'problem', label: 'Problem Statement', icon: AlertTriangle },
//     { id: 'analysis', label: 'Root Cause Analysis', icon: Target },
//     { id: 'solutions', label: 'Solutions & Actions', icon: Lightbulb },
//     { id: 'methodology', label: 'Why-How-What Analysis', icon: TrendingUp },
//     { id: 'trends', label: 'Trends & Patterns', icon: BarChart3 },
//     { id: 'recommendations', label: 'Strategic Recommendations', icon: CheckCircle }
//   ]

//   const handleCopyToClipboard = () => {
//     const summaryText = generateFullSummaryText()
//     navigator.clipboard.writeText(summaryText)
//   }

//   const generateFullSummaryText = () => {
//     return `
// SHELL REPEX v2.0 - EXECUTIVE SUMMARY
// ${reportData.fileName}
// Analysis Date: ${reportData.analysisDate}

// EXECUTIVE OVERVIEW
// ==================
// Incident Type: ${executiveSummaryData.overview.incidentType}
// Location: ${executiveSummaryData.overview.location}
// Date/Time: ${executiveSummaryData.overview.dateTime}
// Duration: ${executiveSummaryData.overview.duration}
// Status: ${executiveSummaryData.overview.status}

// PROBLEM STATEMENT
// ================
// Primary Issue: ${executiveSummaryData.problemStatement.primary}

// Secondary Issues:
// ${executiveSummaryData.problemStatement.secondary.map(item => `• ${item}`).join('\n')}

// ROOT CAUSE ANALYSIS
// ==================
// Immediate Cause: ${executiveSummaryData.rootCause.immediate}

// Underlying Causes:
// ${executiveSummaryData.rootCause.underlying.map(item => `• ${item}`).join('\n')}

// WHY ANALYSIS (5 Whys)
// ====================
// ${executiveSummaryData.whyAnalysis.map((why, index) => `${index + 1}. ${why}`).join('\n')}

// HOW IMPLEMENTATION
// =================
// ${executiveSummaryData.howImplementation.map(how => `• ${how}`).join('\n')}

// WHAT OUTCOMES
// =============
// ${executiveSummaryData.whatOutcomes.map(what => `• ${what}`).join('\n')}

// TRENDS & PATTERNS
// ================
// Historical Trends:
// ${executiveSummaryData.trends.historical.map(trend => `• ${trend}`).join('\n')}

// Current Patterns:
// ${executiveSummaryData.trends.patterns.map(pattern => `• ${pattern}`).join('\n')}

// Predictive Insights:
// ${executiveSummaryData.trends.predictions.map(prediction => `• ${prediction}`).join('\n')}

// STRATEGIC RECOMMENDATIONS
// ========================
// Priority: ${executiveSummaryData.recommendations.priority}
// Timeline: ${executiveSummaryData.recommendations.timeline}
// Investment: ${executiveSummaryData.recommendations.cost}
// ROI Potential: ${executiveSummaryData.recommendations.roi}

// Key Actions:
// ${executiveSummaryData.recommendations.actions.map(action => `• ${action}`).join('\n')}

// Generated by Shell RepEx v2.0 AI Analysis Platform
// © Shell Global Solutions International B.V.
//     `
//   }

//   const renderSectionContent = () => {
//     switch (selectedSection) {
//       case 'overview':
//         return (
//           <div className="space-y-6">
//             <Card className="glass-card glass-card-hover border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <BarChart3 className="w-5 h-5" />
//                   <span>Incident Overview</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 relative z-10">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Incident Type</p>
//                     <p className="font-medium">{executiveSummaryData.overview.incidentType}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground">Location</p>
//                     <p className="font-medium">{executiveSummaryData.overview.location}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground">Date & Time</p>
//                     <p className="font-medium">{executiveSummaryData.overview.dateTime}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground">Duration</p>
//                     <p className="font-medium">{executiveSummaryData.overview.duration}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Badge className="bg-success text-success-foreground">
//                     <CheckCircle className="w-3 h-3 mr-1" />
//                     {executiveSummaryData.overview.status}
//                   </Badge>
//                   <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
//                     Risk Score: {reportData.riskScore}
//                   </Badge>
//                   <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
//                     {reportData.confidence}% Confidence
//                   </Badge>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )

//       case 'problem':
//         return (
//           <div className="space-y-6">
//             <Card className="glass-card glass-card-hover glass-card-danger border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <AlertTriangle className="w-5 h-5" />
//                   <span>Problem Statement</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 relative z-10">
//                 <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
//                   <h4 className="font-medium text-destructive mb-2">Primary Issue</h4>
//                   <p className="text-foreground">{executiveSummaryData.problemStatement.primary}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-foreground mb-3">Secondary Issues</h4>
//                   <div className="space-y-2">
//                     {executiveSummaryData.problemStatement.secondary.map((issue, index) => (
//                       <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
//                         <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <span className="text-xs font-medium text-orange-700">{index + 1}</span>
//                         </div>
//                         <p className="text-foreground">{issue}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )

//       case 'analysis':
//         return (
//           <div className="space-y-6">
//             <Card className="glass-card glass-card-hover border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Target className="w-5 h-5" />
//                   <span>Root Cause Analysis</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 relative z-10">
//                 <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
//                   <h4 className="font-medium text-primary mb-2">Immediate Cause</h4>
//                   <p className="text-foreground">{executiveSummaryData.rootCause.immediate}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-foreground mb-3">Underlying Causes</h4>
//                   <div className="space-y-2">
//                     {executiveSummaryData.rootCause.underlying.map((cause, index) => (
//                       <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
//                         <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <span className="text-xs font-medium text-accent-foreground">{index + 1}</span>
//                         </div>
//                         <p className="text-foreground">{cause}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )

//       case 'solutions':
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card className="glass-card glass-card-hover glass-card-warning border-0">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Clock className="w-5 h-5" />
//                     <span>Immediate Solutions</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {executiveSummaryData.solutions.immediate.map((solution, index) => (
//                     <div key={index} className="flex items-start space-x-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
//                       <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs font-medium text-accent-foreground">{index + 1}</span>
//                       </div>
//                       <p className="text-foreground">{solution}</p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               <Card className="glass-card glass-card-hover glass-card-success border-0">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <TrendingUp className="w-5 h-5" />
//                     <span>Long-term Solutions</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3 relative z-10">
//                   {executiveSummaryData.solutions.longTerm.map((solution, index) => (
//                     <div key={index} className="flex items-start space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
//                       <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs font-medium text-primary-foreground">{index + 1}</span>
//                       </div>
//                       <p className="text-foreground">{solution}</p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         )

//       case 'methodology':
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <Card className="glass-card glass-card-hover border-0">
//                 <CardHeader>
//                   <CardTitle className="text-lg">Why Analysis (5 Whys)</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3 relative z-10">
//                   {executiveSummaryData.whyAnalysis.map((why, index) => (
//                     <div key={index} className="p-3 bg-muted rounded-lg">
//                       <p className="text-sm text-foreground">{why}</p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               <Card className="glass-card glass-card-hover glass-card-warning border-0">
//                 <CardHeader>
//                   <CardTitle className="text-lg">How Implementation</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3 relative z-10">
//                   {executiveSummaryData.howImplementation.map((how, index) => (
//                     <div key={index} className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
//                       <p className="text-sm text-foreground">{how}</p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               <Card className="glass-card glass-card-hover glass-card-success border-0">
//                 <CardHeader>
//                   <CardTitle className="text-lg">What Outcomes</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3 relative z-10">
//                   {executiveSummaryData.whatOutcomes.map((what, index) => (
//                     <div key={index} className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
//                       <p className="text-sm text-foreground">{what}</p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         )

//       case 'trends':
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 gap-6">
//               <Card className="glass-card glass-card-hover border-0">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <BarChart3 className="w-5 h-5" />
//                     <span>Historical Trends</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3 relative z-10">
//                   {executiveSummaryData.trends.historical.map((trend, index) => (
//                     <div key={index} className="p-3 bg-muted rounded-lg">
//                       <p className="text-foreground">{trend}</p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               <Card className="glass-card glass-card-hover status-card-warning shell-accent-medium border-0">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <TrendingUp className="w-5 h-5 interactive-icon animate-glow" />
//                     <span>Current Patterns</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3 relative z-10">
//                   {executiveSummaryData.trends.patterns.map((pattern, index) => (
//                     <div key={index} className="p-3 data-card shell-accent-subtle rounded-lg transform hover:scale-102 transition-all duration-300">
//                       <p className="text-foreground">{pattern}</p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               <Card className="glass-card glass-card-hover status-card-danger shell-accent-medium border-0">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Target className="w-5 h-5 interactive-icon animate-glow" />
//                     <span>Predictive Insights</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3 relative z-10">
//                   {executiveSummaryData.trends.predictions.map((prediction, index) => (
//                     <div key={index} className="p-3 data-card shell-accent-medium rounded-lg transform hover:scale-102 transition-all duration-300">
//                       <p className="text-foreground">{prediction}</p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         )

//       case 'recommendations':
//         return (
//           <div className="space-y-6">
//             <Card className="glass-card glass-card-hover status-card-success shell-accent-medium border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Lightbulb className="w-5 h-5 interactive-icon animate-glow" />
//                   <span>Strategic Recommendations</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6 relative z-10">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div className="text-center p-4 data-card shell-accent-strong rounded-lg transform hover:scale-102 transition-all duration-300">
//                     <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2 interactive-icon animate-glow" />
//                     <p className="font-medium text-destructive">{executiveSummaryData.recommendations.priority}</p>
//                     <p className="text-xs text-muted-foreground">Priority Level</p>
//                   </div>
//                   <div className="text-center p-4 data-card shell-accent-medium rounded-lg transform hover:scale-102 transition-all duration-300">
//                     <Clock className="w-8 h-8 text-accent-foreground mx-auto mb-2 interactive-icon" />
//                     <p className="font-medium text-accent-foreground">Immediate</p>
//                     <p className="text-xs text-muted-foreground">Timeline</p>
//                   </div>
//                   <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
//                     <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
//                     <p className="font-medium text-primary">{executiveSummaryData.recommendations.cost}</p>
//                     <p className="text-xs text-muted-foreground">Investment</p>
//                   </div>
//                   <div className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
//                     <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
//                     <p className="font-medium text-success">{executiveSummaryData.recommendations.roi}</p>
//                     <p className="text-xs text-muted-foreground">ROI Potential</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-medium text-foreground mb-3">Key Actions Required</h4>
//                   <div className="space-y-3">
//                     {executiveSummaryData.recommendations.actions.map((action, index) => (
//                       <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
//                         <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
//                           <span className="text-sm font-medium text-primary">{index + 1}</span>
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-foreground">{action}</p>
//                           <div className="flex items-center space-x-2 mt-2">
//                             <Badge variant="outline" className="text-xs">High Impact</Badge>
//                             <Badge variant="outline" className="text-xs">Strategic Priority</Badge>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-6xl h-[90vh] p-0">
//         <DialogHeader className="p-6 pb-0">
//           <div className="flex items-center justify-between">
//             <div className="space-y-1">
//               <DialogTitle className="text-2xl font-bold text-foreground">Executive Summary</DialogTitle>
//               <p className="text-muted-foreground">
//                 Comprehensive analysis report for {reportData.fileName}
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
//                 <Copy className="w-4 h-4 mr-2" />
//                 Copy Text
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Download className="w-4 h-4 mr-2" />
//                 Export PDF
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Share className="w-4 h-4 mr-2" />
//                 Share Report
//               </Button>
//               <DialogClose asChild>
//                 <Button variant="ghost" size="sm">
//                   <X className="w-4 h-4" />
//                 </Button>
//               </DialogClose>
//             </div>
//           </div>
//         </DialogHeader>

//         <div className="flex flex-1 overflow-hidden">
//           {/* Section Navigation */}
//           <div className="w-80 border-r border-border bg-muted/30 p-4">
//             <div className="space-y-2">
//               {sections.map((section) => {
//                 const Icon = section.icon
//                 return (
//                   <button
//                     key={section.id}
//                     onClick={() => setSelectedSection(section.id)}
//                     className={cn(
//                       'w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors',
//                       selectedSection === section.id
//                         ? 'bg-primary text-primary-foreground'
//                         : 'hover:bg-background text-foreground hover:text-foreground'
//                     )}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span className="font-medium">{section.label}</span>
//                   </button>
//                 )
//               })}
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="flex-1 overflow-hidden">
//             <ScrollArea className="h-full p-6">
//               {renderSectionContent()}
//             </ScrollArea>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
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
    incidentType: "Environmental – Oil Spill (Minor)",
    location: "Jetty 3, Pulau Bukom Refinery Terminal, Singapore",
    dateTime: "14 June 2023, 14:35 SGT",
    duration: "4 hours (14:35 - 17:30)",
    status: "Closed - Corrective Actions In Progress",
    reportId: "INC-2023-0614-PBK-J3",
    vessel: "MT Aurora",
    spillVolume: "320 litres of Brent Crude"
  },
  problemStatement: {
    primary: "Coupling failure at Transfer Point TP-3A resulted in the uncontrolled release of approximately 320 litres of Brent Crude onto the jetty apron during vessel discharge operations",
    secondary: [
      "Degraded flexible hose coupling (Viking Johnson Series 27) exceeded its certified service life by 4 months",
      "Pre-transfer inspection checklist did not mandate verification of coupling certification dates",
      "CMMS work order for replacement was postponed due to parts availability and never rescheduled",
      "Incident contained within 12 minutes with no injuries, no fire, and no marine pollution"
    ]
  },
  rootCause: {
    immediate: "Material failure - Viking Johnson Series 27 flexible coupling (Asset ID: HF-3A-027) exceeded 60-month certification period by 4 months",
    underlying: [
      "67% reduction in tensile strength due to cyclic fatigue",
      "Corrosion pitting depth: 2.3mm (failure threshold: 2.0mm)",
      "Elastomer seal hardening (Shore A durometer increased from 70 to 85)",
      "Inadequate pre-transfer inspection protocols",
      "Tropical marine environment accelerated degradation beyond manufacturer assumptions"
    ]
  },
  solutions: {
    immediate: [
      "Emergency inspection of all 27 overdue couplings (Target: 30 Jun 2023 - COMPLETED)",
      "Replace 9 CRITICAL risk couplings (Target: 15 Jul 2023 - IN PROGRESS)",
      "Update pre-transfer checklist to include certification date verification (COMPLETED)",
      "Emergency procurement authorization for critical components (APPROVED)"
    ],
    longTerm: [
      "Implement automated CMMS alerts with 30-day pre-expiry warnings (SGD 45,000)",
      "Replace all 27 overdue couplings across terminals (SGD 945,000)",
      "Install real-time pressure monitoring with IoT sensors (SGD 180,000)",
      "Fleet-wide coupling replacement program for 156 units over 18 months (SGD 5.4M)"
    ]
  },
  whyAnalysis: [
    "Why did the coupling fail? - Degraded flexible hose exceeded its 60-month certification period by 4 months",
    "Why was it not replaced? - CMMS work order (WO-23-1847) was postponed due to parts availability",
    "Why was it not rescheduled? - Lack of escalation protocol for postponed critical maintenance",
    "Why no escalation protocol? - CMMS work orders could be postponed indefinitely without risk assessment",
    "Why no risk assessment? - Limited integration between maintenance scheduling and asset lifecycle management"
  ],
  howImplementation: [
    "How to prevent recurrence? - Implement proactive coupling replacement program aligned with certification periods",
    "How to improve inspection? - Add mandatory certification date verification (Step 4.7) to pre-transfer checklist SOP-DIS-003",
    "How to manage maintenance? - Deploy automated CMMS escalation to Terminal Manager if work orders overdue >30 days",
    "How to monitor fleet health? - Establish asset health dashboard with Power BI integration for aging critical assets"
  ],
  whatOutcomes: [
    "What was the direct cost? - SGD 185,000 (emergency response, cleanup, lost product, equipment, downtime, regulatory)",
    "What was the total impact? - SGD 258,000 including indirect costs (reputation, insurance, regulatory scrutiny)",
    "What was prevented? - Marine pollution avoided through 12-minute containment; zero injuries achieved",
    "What must change? - 27 couplings currently exceed service life; 9 assets rated CRITICAL requiring immediate action"
  ],
  trends: {
    historical: [
      "This is the 3rd hose coupling failure across Shell Singapore terminals in the past 18 months",
      "Pattern identified: 'Aging Hose Coupling Cascade' with 92% similarity score across incidents",
      "Previous incidents: Mar 2022 (180L spill, 8 months overdue), Sep 2022 (420L spill, 6 months overdue)",
      "Implementation rate of recommendations from Mar 2022 incident: only 35% (delayed by budget cycles)"
    ],
    patterns: [
      "73% of coupling failures occur within 45 days of a deferred maintenance work order",
      "Fleet-wide risk: 58 of 156 couplings (37%) are overdue or approaching service life expiry",
      "Environmental accelerators: Tropical marine conditions (28-32°C, high humidity) exceed manufacturer assumptions",
      "Emergency response excellence: ERT deployment in 3 minutes exceeded 5-minute target"
    ],
    predictions: [
      "Recurrence probability: 78% HIGH RISK within 90 days if no corrective action taken (89% confidence)",
      "Highest risk asset: HF-7B-041 at Jetty 7B (96/100 risk score, 9 months overdue)",
      "Cascading failure scenario: 9 CRITICAL assets could fail simultaneously during weather events (2,800L potential impact)",
      "Model forecast: 94% probability of similar incident within 180 days without accelerated intervention"
    ]
  },
  recommendations: {
    priority: "Critical",
    timeline: "Immediate implementation required (0-30 days for critical actions)",
    cost: "SGD 9.0M total investment over 24 months",
    roi: "SGD 3.2M annual savings (incident prevention, reduced downtime) - 356% ROI over 5 years",
    payback: "2.8 years",
    actions: [
      "Replace 9 CRITICAL-risk couplings immediately (HF-7B-041, HF-2A-018, HF-3B-029 priority)",
      "Deploy automated CMMS alerts and auto-escalation for overdue work orders",
      "Implement predictive maintenance with AI/ML condition monitoring (inspired by offshore wind industry)",
      "Establish safety-critical replacement fund outside normal CAPEX (aerospace fleet management model)"
    ]
  },
  financialBreakdown: {
    directCosts: [
      { category: "Emergency Response", amount: 28000, description: "ERT mobilization, contractor fees (Spilltech Solutions)" },
      { category: "Cleanup Operations", amount: 40000, description: "Vacuum trucks, absorbent materials, disposal" },
      { category: "Lost Product", amount: 42000, description: "320L Brent Crude @ SGD 131/barrel" },
      { category: "Equipment Replacement", amount: 35000, description: "New Viking Johnson coupling + installation" },
      { category: "Operational Downtime", amount: 28000, description: "8 hours lost discharge capacity" },
      { category: "Regulatory & Admin", amount: 12000, description: "MPA filing fees, environmental assessment" }
    ],
    indirectCosts: [
      { category: "Reputation Risk", amount: 50000, description: "Customer confidence, media management" },
      { category: "Insurance Premium", amount: 15000, description: "Projected annual increase" },
      { category: "Regulatory Scrutiny", amount: 8000, description: "Additional inspections, audits" }
    ]
  },
  regulatoryCompliance: {
    notifications: [
      { agency: "Maritime and Port Authority (MPA)", deadline: "Within 30 min", actual: "T+18 min", status: "COMPLIANT" },
      { agency: "National Environment Agency (NEA)", deadline: "Within 1 hour", actual: "T+25 min", status: "COMPLIANT" },
      { agency: "Shell Singapore HQ HSE", deadline: "Within 15 min", actual: "T+5 min", status: "COMPLIANT" }
    ],
    inspections: [
      "MPA inspection (15 June 2023): No violations cited",
      "NEA site visit (16 June 2023): Warning issued for delayed coupling replacement (no fine)",
      "Internal HSE audit: 2 minor non-conformances (addressed)"
    ]
  },
  criticalAssets: [
    { id: "HF-7B-041", location: "Jetty 7B, Pulau Bukom", age: "6.2 yrs", overdue: "9 months", riskScore: 96, urgency: "CRITICAL" },
    { id: "HF-2A-018", location: "Jetty 2A, Jurong", age: "5.8 yrs", overdue: "7 months", riskScore: 91, urgency: "CRITICAL" },
    { id: "HF-3B-029", location: "Jetty 3B, Pulau Bukom", age: "5.5 yrs", overdue: "6 months", riskScore: 87, urgency: "CRITICAL" },
    { id: "HF-4A-033", location: "Jetty 4A, Jurong", age: "5.4 yrs", overdue: "5 months", riskScore: 82, urgency: "HIGH" }
  ]
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
    { id: 'recommendations', label: 'Strategic Recommendations', icon: CheckCircle },
    { id: 'financial', label: 'Financial Impact', icon: DollarSign },
    { id: 'compliance', label: 'Regulatory Compliance', icon: CheckCircle }
  ]

  const handleCopyToClipboard = () => {
    const summaryText = generateFullSummaryText()
    navigator.clipboard.writeText(summaryText)
  }

  const generateFullSummaryText = () => {
    return `
SHELL REPEX v2.0 - EXECUTIVE SUMMARY
${reportData.fileName}
Report ID: ${executiveSummaryData.overview.reportId}
Analysis Date: ${reportData.analysisDate}

EXECUTIVE OVERVIEW
==================
Incident Type: ${executiveSummaryData.overview.incidentType}
Location: ${executiveSummaryData.overview.location}
Date/Time: ${executiveSummaryData.overview.dateTime}
Duration: ${executiveSummaryData.overview.duration}
Status: ${executiveSummaryData.overview.status}
Vessel: ${executiveSummaryData.overview.vessel}
Spill Volume: ${executiveSummaryData.overview.spillVolume}

PROBLEM STATEMENT
================
Primary Issue: ${executiveSummaryData.problemStatement.primary}

Key Findings:
${executiveSummaryData.problemStatement.secondary.map(item => `• ${item}`).join('\n')}

ROOT CAUSE ANALYSIS
==================
Immediate Cause: ${executiveSummaryData.rootCause.immediate}

Underlying Factors:
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
Historical Context:
${executiveSummaryData.trends.historical.map(trend => `• ${trend}`).join('\n')}

Identified Patterns:
${executiveSummaryData.trends.patterns.map(pattern => `• ${pattern}`).join('\n')}

Predictive Analysis:
${executiveSummaryData.trends.predictions.map(prediction => `• ${prediction}`).join('\n')}

FINANCIAL IMPACT
===============
Direct Costs: SGD 185,000
Indirect Costs: SGD 73,000
Total Impact: SGD 258,000

STRATEGIC RECOMMENDATIONS
========================
Priority: ${executiveSummaryData.recommendations.priority}
Timeline: ${executiveSummaryData.recommendations.timeline}
Total Investment: ${executiveSummaryData.recommendations.cost}
Annual Savings: ${executiveSummaryData.recommendations.roi}
Payback Period: ${executiveSummaryData.recommendations.payback}

Critical Actions:
${executiveSummaryData.recommendations.actions.map(action => `• ${action}`).join('\n')}

REGULATORY COMPLIANCE
====================
${executiveSummaryData.regulatoryCompliance.notifications.map(n => 
  `${n.agency}: ${n.status} (${n.actual})`
).join('\n')}

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
                    <p className="text-sm text-muted-foreground">Report ID</p>
                    <p className="font-medium font-mono text-xs">{executiveSummaryData.overview.reportId}</p>
                  </div>
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
                    <p className="text-sm text-muted-foreground">Vessel</p>
                    <p className="font-medium">{executiveSummaryData.overview.vessel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Spill Volume</p>
                    <p className="font-medium text-destructive">{executiveSummaryData.overview.spillVolume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{executiveSummaryData.overview.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium text-success">{executiveSummaryData.overview.status}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center flex-wrap gap-2">
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Containment: 12 minutes
                  </Badge>
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Zero Injuries
                  </Badge>
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    No Marine Pollution
                  </Badge>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                    Risk Score: {reportData.riskScore}
                  </Badge>
                  <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
                    {reportData.confidence}% Confidence
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Visualization */}
            <Card className="glass-card glass-card-hover border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Incident Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <TimelineEvent time="14:33" event="Abnormal pressure reading (8.2 bar)" severity="warning" />
                  <TimelineEvent time="14:35" event="Coupling failure - spill begins" severity="critical" />
                  <TimelineEvent time="14:37" event="Emergency Shutdown activated" severity="action" />
                  <TimelineEvent time="14:47" event="Spill fully contained" severity="success" />
                  <TimelineEvent time="14:53" event="MPA notified" severity="info" />
                  <TimelineEvent time="17:30" event="Cleanup completed (87% recovery)" severity="success" />
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
                  <h4 className="font-medium text-foreground mb-3">Key Findings</h4>
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

            {/* Critical Finding Alert */}
            <Card className="glass-card glass-card-hover border-0 border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Critical Pattern Identified</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-foreground font-medium mb-3">
                  This is the 3rd hose coupling failure across Shell Singapore terminals in the past 18 months
                </p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="p-3 bg-destructive/5 rounded-lg">
                    <p className="text-muted-foreground">March 2022</p>
                    <p className="font-medium">180L spill</p>
                    <p className="text-xs text-muted-foreground">8 months overdue</p>
                  </div>
                  <div className="p-3 bg-destructive/5 rounded-lg">
                    <p className="text-muted-foreground">September 2022</p>
                    <p className="font-medium">420L spill</p>
                    <p className="text-xs text-muted-foreground">6 months overdue</p>
                  </div>
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-muted-foreground">June 2023</p>
                    <p className="font-medium text-destructive">320L spill</p>
                    <p className="text-xs text-muted-foreground">4 months overdue</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    <strong>Similarity Score: 92%</strong> - Pattern: "Aging Hose Coupling Cascade"
                  </p>
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
                  <h4 className="font-medium text-foreground mb-3">Underlying Factors</h4>
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

            {/* Technical Specifications */}
            <Card className="glass-card glass-card-hover border-0">
              <CardHeader>
                <CardTitle className="text-lg">Failed Component Specifications</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Asset ID</p>
                    <p className="font-medium font-mono">HF-3A-027</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Model</p>
                    <p className="font-medium">Viking Johnson Series 27</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Installation Date</p>
                    <p className="font-medium">18 April 2018</p>
                  </div>
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-muted-foreground">Certification Expired</p>
                    <p className="font-medium text-destructive">28 February 2023</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Pressure Rating</p>
                    <p className="font-medium">16 bar (232 psi)</p>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="text-muted-foreground">Actual Pressure</p>
                    <p className="font-medium text-amber-700">8.2 bar (spike)</p>
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
                    <span>Immediate Actions (0-30 Days)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {executiveSummaryData.solutions.immediate.map((solution, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <p className="text-foreground text-sm">{solution}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card glass-card-hover glass-card-success border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Long-term Solutions (30-180 Days)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  {executiveSummaryData.solutions.longTerm.map((solution, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary-foreground">{index + 1}</span>
                      </div>
                      <p className="text-foreground text-sm">{solution}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* High-Risk Assets Table */}
            <Card className="glass-card glass-card-hover border-0 border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  <span>High-Risk Assets Requiring Immediate Action</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-2">
                  {executiveSummaryData.criticalAssets.map((asset, index) => (
                    <div key={index} className={cn(
                      "p-3 rounded-lg border",
                      asset.urgency === "CRITICAL" 
                        ? "bg-destructive/10 border-destructive/20" 
                        : "bg-amber-500/10 border-amber-500/20"
                    )}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-mono text-sm font-medium">{asset.id}</p>
                          <p className="text-xs text-muted-foreground">{asset.location}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={asset.urgency === "CRITICAL" ? "destructive" : "outline"}>
                            {asset.urgency}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">Risk: {asset.riskScore}/100</p>
</div>
</div>
<div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
<span>Age: {asset.age}</span>
<span>•</span>
<span className="text-destructive font-medium">Overdue: {asset.overdue}</span>
</div>
</div>
))}
</div>
</CardContent>
</Card>
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
                <span>Historical Context</span>
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
                <span>Identified Patterns</span>
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
                <span>Predictive Analysis</span>
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 data-card shell-accent-strong rounded-lg transform hover:scale-102 transition-all duration-300">
                <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2 interactive-icon animate-glow" />
                <p className="font-medium text-destructive">{executiveSummaryData.recommendations.priority}</p>
                <p className="text-xs text-muted-foreground">Priority</p>
              </div>
              <div className="text-center p-4 data-card shell-accent-medium rounded-lg transform hover:scale-102 transition-all duration-300">
                <Clock className="w-8 h-8 text-accent-foreground mx-auto mb-2 interactive-icon" />
                <p className="font-medium text-accent-foreground text-sm">0-30 Days</p>
                <p className="text-xs text-muted-foreground">Timeline</p>
              </div>
              <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-primary text-sm">{executiveSummaryData.recommendations.cost}</p>
                <p className="text-xs text-muted-foreground">Investment</p>
              </div>
              <div className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
                <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="font-medium text-success text-sm">{executiveSummaryData.recommendations.roi}</p>
                <p className="text-xs text-muted-foreground">Annual Savings</p>
              </div>
              <div className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
                <Target className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="font-medium text-success">{executiveSummaryData.recommendations.payback}</p>
                <p className="text-xs text-muted-foreground">Payback</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Critical Actions Required</h4>
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
                        <Badge variant="destructive" className="text-xs">Immediate</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Calculation */}
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <h4 className="font-medium text-success mb-3">Return on Investment Analysis</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Investment</p>
                  <p className="text-xl font-bold text-foreground">SGD 9.0M</p>
                  <p className="text-xs text-muted-foreground">Over 24 months</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Annual Savings</p>
                  <p className="text-xl font-bold text-success">SGD 3.2M</p>
                  <p className="text-xs text-muted-foreground">Incident prevention</p>
                </div>
                <div>
                  <p className="text-muted-foreground">5-Year ROI</p>
                  <p className="text-xl font-bold text-success">356%</p>
                  <p className="text-xs text-muted-foreground">Payback: 2.8 years</p>
                </div>
              </div>
            </div>

            {/* Cross-Industry Insights */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Innovative Solutions from Cross-Industry Research</h4>
              <div className="space-y-2">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium text-sm mb-1">🛫 Aerospace Fleet Management Model</p>
                  <p className="text-xs text-muted-foreground">
                    Separate "safety-critical replacement funds" outside normal CAPEX to prevent budget-driven compromises
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium text-sm mb-1">💨 Offshore Wind Predictive Maintenance</p>
                  <p className="text-xs text-muted-foreground">
                    65% reduction in coupling failures using IoT sensors + ML prediction (ROI: 18 months)
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium text-sm mb-1">🏭 Chemical Industry Digital Twin</p>
                  <p className="text-xs text-muted-foreground">
                    40% reduction in emergency replacements by modeling equipment degradation
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )

  case 'financial':
    return (
      <div className="space-y-6">
        {/* Total Impact Summary */}
        <Card className="glass-card glass-card-hover border-0 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Total Financial Impact</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-3xl font-bold text-destructive">SGD 185K</p>
                <p className="text-sm text-muted-foreground mt-1">Direct Costs</p>
              </div>
              <div className="text-center p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-3xl font-bold text-amber-700">SGD 73K</p>
                <p className="text-sm text-muted-foreground mt-1">Indirect Costs</p>
              </div>
              <div className="text-center p-4 bg-destructive/15 border-2 border-destructive/30 rounded-lg">
                <p className="text-3xl font-bold text-destructive">SGD 258K</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">Total Impact</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direct Costs Breakdown */}
        <Card className="glass-card glass-card-hover border-0">
          <CardHeader>
            <CardTitle>Direct Costs Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-2">
              {executiveSummaryData.financialBreakdown.directCosts.map((cost, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{cost.category}</p>
                    <p className="text-xs text-muted-foreground">{cost.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-foreground">SGD {cost.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Indirect Costs Breakdown */}
        <Card className="glass-card glass-card-hover border-0">
          <CardHeader>
            <CardTitle>Indirect Costs (Estimated)</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-2">
              {executiveSummaryData.financialBreakdown.indirectCosts.map((cost, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{cost.category}</p>
                    <p className="text-xs text-muted-foreground">{cost.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-amber-700">SGD {cost.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Prevention Analysis */}
        <Card className="glass-card glass-card-hover border-0 bg-success/5 border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span>Costs Avoided Through Rapid Response</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Marine Pollution Avoided</p>
                <p className="text-lg font-bold text-success">Estimated SGD 2-5M</p>
                <p className="text-xs text-muted-foreground">Cleanup, fines, reputation</p>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Zero Injuries</p>
                <p className="text-lg font-bold text-success">Incalculable</p>
                <p className="text-xs text-muted-foreground">Personnel safety maintained</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )

  case 'compliance':
    return (
      <div className="space-y-6">
        {/* Compliance Status */}
        <Card className="glass-card glass-card-hover border-0 bg-success/5 border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span>Regulatory Compliance Status: FULLY COMPLIANT</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-muted-foreground mb-4">
              All regulatory notifications completed within required timeframes. No compliance violations.
            </p>
            <div className="space-y-3">
              {executiveSummaryData.regulatoryCompliance.notifications.map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.agency}</p>
                    <p className="text-xs text-muted-foreground">Required: {notification.deadline}</p>
                  </div>
                  <div className="text-right ml-4">
                    <Badge className="bg-success text-success-foreground mb-1">
                      {notification.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">Actual: {notification.actual}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspection Results */}
        <Card className="glass-card glass-card-hover border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Post-Incident Inspections</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-2">
              {executiveSummaryData.regulatoryCompliance.inspections.map((inspection, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm">{inspection}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Standards Compliance */}
        <Card className="glass-card glass-card-hover border-0">
          <CardHeader>
            <CardTitle>Report Preparation Standards</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium mb-1">Shell Group HSE Standard</p>
                <p className="text-xs text-muted-foreground font-mono">HSSE-001 Incident Investigation Standard</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium mb-1">Singapore Regulations</p>
                <p className="text-xs text-muted-foreground font-mono">Workplace Safety and Health Act (WSHA 2006)</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium mb-1">Document Classification</p>
                <p className="text-xs text-muted-foreground">CONFIDENTIAL – INTERNAL USE ONLY</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium mb-1">Retention Period</p>
                <p className="text-xs text-muted-foreground">10 years (Shell Global HSE Policy HSE-DOC-001)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investigation Team */}
        <Card className="glass-card glass-card-hover border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Investigation Team Sign-Off</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Dr. Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">Investigation Lead, HSE Director</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">21 Jun 2023</p>
                  <Badge variant="outline" className="text-xs mt-1">Approved</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Marcus Tan</p>
                  <p className="text-xs text-muted-foreground">Terminal Operations Manager</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">21 Jun 2023</p>
                  <Badge variant="outline" className="text-xs mt-1">Approved</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">David Lim</p>
                  <p className="text-xs text-muted-foreground">HSE Director, Singapore</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">21 Jun 2023</p>
                  <Badge variant="outline" className="text-xs mt-1">Approved</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Jennifer Wong</p>
                  <p className="text-xs text-muted-foreground">VP Operations, APAC</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">22 Jun 2023</p>
                  <Badge variant="outline" className="text-xs mt-1">Approved</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )

  default:
    return null
}}
return (
<Dialog open={isOpen} onOpenChange={onClose}>
<DialogContent className="max-w-6xl h-[90vh] p-0">
<DialogHeader className="p-6 pb-0">
<div className="flex items-center justify-between">
<div className="space-y-1">
<DialogTitle className="text-2xl font-bold text-foreground">Executive Summary</DialogTitle>
<p className="text-muted-foreground">
{executiveSummaryData.overview.reportId} • {reportData.fileName}
</p>
<div className="flex items-center gap-2 mt-2">
<Badge variant="destructive">{reportData.severity}</Badge>
<Badge variant="outline">Confidence: {reportData.confidence}%</Badge>
</div>
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
                <span className="font-medium text-sm">{section.label}</span>
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
// Helper component for timeline events
function TimelineEvent({ time, event, severity }: { time: string; event: string; severity: 'warning' | 'critical' | 'action' | 'success' | 'info' }) {
const colors = {
warning: 'bg-amber-500/20 border-amber-500/30 text-amber-700',
critical: 'bg-destructive/20 border-destructive/30 text-destructive',
action: 'bg-primary/20 border-primary/30 text-primary',
success: 'bg-success/20 border-success/30 text-success',
info: 'bg-blue-500/20 border-blue-500/30 text-blue-700'
}
return (
<div className="flex items-start space-x-3">
<div className={cn('px-3 py-1 rounded-md border font-mono text-xs font-medium', colors[severity])}>
{time}
</div>
<p className="text-sm text-foreground flex-1 pt-1">{event}</p>
</div>
)
}
