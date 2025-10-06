import { useState } from 'react'
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Users, 
  Download,
  Share,
  Play,
  Eye,
  BarChart3,
  FileText,
  Lightbulb,
  Target,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ExecutiveSummary } from './ExecutiveSummary'
import { cn } from './ui/utils'

interface AnalysisResultsProps {
  files: Array<{ name: string; id: string }>
  onClose: () => void
}

const analysisData = {
  summary: {
    severity: 'High',
    riskScore: 78,
    confidence: 94,
    estimatedCost: '$1.2M',
    timeToResolve: '72 hours',
    affectedPersonnel: 12
  },
  keyFindings: [
    {
      title: 'Equipment Failure Root Cause',
      description: 'Bearing degradation in Pump Unit B-23 due to inadequate lubrication schedule',
      severity: 'critical',
      confidence: 96
    },
    {
      title: 'Safety Protocol Deviation',
      description: 'Emergency shutdown procedure delayed by 4.2 minutes during incident response',
      severity: 'high',
      confidence: 89
    },
    {
      title: 'Environmental Impact Assessment',
      description: 'Minor containment breach with immediate remediation successful',
      severity: 'medium',
      confidence: 92
    }
  ],
  recommendations: [
    'Implement predictive maintenance schedule for critical pump units',
    'Conduct emergency response training for Sector A personnel',
    'Review and update containment protocols for Unit B-23',
    'Install additional monitoring sensors on bearing assemblies'
  ],
  patternMatches: [
    {
      title: 'Similar Incident Pattern Detected',
      description: 'This incident matches 3 previous cases from Q2 2024',
      riskIncrease: '+23%'
    }
  ]
}

export function AnalysisResults({ files, onClose }: AnalysisResultsProps) {
  const [activeView, setActiveView] = useState<'overview' | 'animation' | 'recommendations'>('overview')
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Analysis Complete</h2>
          <p className="text-muted-foreground">
            Analysis completed for {files.length} file{files.length > 1 ? 's' : ''} • {new Date().toLocaleString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Analysis Complete
          </Badge>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Analysis
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
        {[
          { key: 'overview', label: 'Overview', icon: BarChart3 },
          { key: 'animation', label: '3D Animation', icon: Play },
          { key: 'recommendations', label: 'Recommendations', icon: Lightbulb }
        ].map(view => {
          const Icon = view.icon
          return (
            <Button
              key={view.key}
              variant={activeView === view.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView(view.key as any)}
              className={cn(
                'flex-1',
                activeView === view.key && 'bg-background shadow-sm'
              )}
            >
              <Icon className="w-4 h-4 mr-2" />
              {view.label}
            </Button>
          )
        })}
      </div>

      {/* Overview View */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <Card className="glass-card glass-card-hover shell-accent-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 interactive-icon" />
                  <span>Analysis Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertTriangle className="w-8 h-8 text-destructive mx-auto" />
                    <p className="text-2xl font-bold text-destructive">{analysisData.summary.severity}</p>
                    <p className="text-sm text-muted-foreground">Severity Level</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-accent/10 rounded-lg border border-accent/30">
                    <Target className="w-8 h-8 text-accent-foreground mx-auto" />
                    <p className="text-2xl font-bold text-accent-foreground">{analysisData.summary.riskScore}</p>
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <CheckCircle className="w-8 h-8 text-primary mx-auto" />
                    <p className="text-2xl font-bold text-primary">{analysisData.summary.confidence}%</p>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated Cost:</span>
                    <span className="font-medium">{analysisData.summary.estimatedCost}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Time to Resolve:</span>
                    <span className="font-medium">{analysisData.summary.timeToResolve}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Affected Personnel:</span>
                    <span className="font-medium">{analysisData.summary.affectedPersonnel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Findings */}
            <Card className="glass-card glass-card-hover shell-accent-strong border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 interactive-icon" />
                  <span>Key Findings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                {analysisData.keyFindings.map((finding, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-foreground">{finding.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={cn(
                            finding.severity === 'critical' ? 'bg-destructive text-destructive-foreground' :
                            finding.severity === 'high' ? 'bg-orange-500 text-white' :
                            'bg-accent text-accent-foreground'
                          )}
                        >
                          {finding.severity}
                        </Badge>
                        <Badge variant="outline">{finding.confidence}% confidence</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{finding.description}</p>
                    
                    {/* Visual Evidence */}
                    {index === 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-foreground mb-2">Visual Evidence:</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1639600993675-2281b2c939f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcHVtcCUyMG1hY2hpbmVyeXxlbnwxfHx8fDE3NTk2ODQ2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Pump Unit B-23 Bearing Assembly"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium">Pump Unit B-23</span>
                            </div>
                          </div>
                          <div className="relative">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1606124257613-9eb03c4eb0d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZXF1aXBtZW50JTIwZmFpbHVyZXxlbnwxfHx8fDE3NTk2ODQ1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Equipment Failure Analysis"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium">Bearing Damage</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {index === 1 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-foreground mb-2">Incident Timeline:</p>
                        <div className="relative">
                          <ImageWithFallback 
                            src="https://images.unsplash.com/photo-1634047411858-d3f661b23969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc2FmZXR5JTIwaW5jaWRlbnR8ZW58MXx8fHwxNzU5Njg0NjAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Emergency Response Procedure"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end">
                            <div className="p-3 text-white">
                              <p className="text-sm font-medium">Emergency Response Timeline</p>
                              <p className="text-xs opacity-90">4.2 min delay in shutdown procedure</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {index === 2 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-foreground mb-2">Environmental Impact Assessment:</p>
                        <div className="relative">
                          <ImageWithFallback 
                            src="https://images.unsplash.com/photo-1573153178631-49e3aa9e018b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjByZWZpbmVyeSUyMHNhZmV0eXxlbnwxfHx8fDE3NTk2ODQ2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Containment System Analysis"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end">
                            <div className="p-3 text-white">
                              <p className="text-sm font-medium">Containment System Status</p>
                              <p className="text-xs opacity-90">Successful immediate remediation</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="glass-card glass-card-hover border-0">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                <Button className="w-full bg-primary hover:bg-primary/90 shell-accent-strong transition-all duration-300">
                  <Download className="w-4 h-4 mr-2 interactive-icon" />
                  Download Report
                </Button>
                <Button variant="outline" className="w-full shell-accent-subtle hover:shell-accent-medium transition-all duration-300">
                  <Share className="w-4 h-4 mr-2 interactive-icon" />
                  Share Analysis
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowExecutiveSummary(true)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Executive Summary
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Review
                </Button>
              </CardContent>
            </Card>

            {/* Pattern Matches */}
            <Card className="glass-card glass-card-hover status-card-warning shell-accent-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 interactive-icon animate-glow" />
                  <span>Pattern Detection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {analysisData.patternMatches.map((pattern, index) => (
                  <div key={index} className="space-y-3">
                    <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                      <h4 className="font-medium text-foreground">{pattern.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs bg-destructive/10 text-destructive border-destructive/20">
                        Risk Increase: {pattern.riskIncrease}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 3D Animation View */}
      {activeView === 'animation' && (
        <Card className="glass-card glass-card-hover border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>3D Incident Reconstruction</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg relative overflow-hidden">
              {/* Background facility image */}
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1573153178631-49e3aa9e018b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjByZWZpbmVyeSUyMHNhZmV0eXxlbnwxfHx8fDE3NTk2ODQ2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Facility Overview"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              
              {/* Simulated 3D animation placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                  <div className="text-white space-y-2">
                    <h3 className="text-xl font-medium">3D Animation Ready</h3>
                    <p className="text-slate-200">Interactive incident reconstruction with timeline</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Play className="w-4 h-4 mr-2" />
                      Play Animation
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Eye className="w-4 h-4 mr-2" />
                      View in AR/VR
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Equipment markers overlay */}
              <div className="absolute top-4 left-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>Pump Unit B-23</span>
                  </div>
                </div>
              </div>
              
              {/* Floating timeline indicators */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span>Timeline: Initial Event</span>
                    <span>00:32 / 04:15</span>
                  </div>
                  <Progress value={12} className="h-1 mt-2" />
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex-1">
                <MapPin className="w-4 h-4 mr-2" />
                Equipment View
              </Button>
              <Button variant="outline" className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                Personnel Timeline
              </Button>
              <Button variant="outline" className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Event Sequence
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations View */}
      {activeView === 'recommendations' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card glass-card-hover glass-card-warning border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>Immediate Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {analysisData.recommendations.map((recommendation, index) => (
                <div key={index} className="p-4 border border-border rounded-lg space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-accent-foreground">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{recommendation}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">High Priority</Badge>
                        <Badge variant="outline" className="text-xs">Est. 2-4 weeks</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card glass-card-hover status-card-success shell-accent-subtle border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 interactive-icon" />
                <span>Prevention Strategies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-2">Predictive Maintenance Program</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Implement IoT sensors and AI-driven monitoring to prevent similar equipment failures.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ROI Potential:</span>
                      <span className="font-medium text-success">$3.2M annually</span>
                    </div>
                  </div>
                  <div className="w-20 h-16 flex-shrink-0">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1639600993675-2281b2c939f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcHVtcCUyMG1hY2hpbmVyeXxlbnwxfHx8fDE3NTk2ODQ2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="IoT Monitoring Equipment"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-2">Enhanced Training Protocol</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      VR-based emergency response training to reduce reaction times by 40%.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Implementation:</span>
                      <span className="font-medium">Q1 2025</span>
                    </div>
                  </div>
                  <div className="w-20 h-16 flex-shrink-0">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1582036683005-b95da0de191b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwbWFpbnRlbmFuY2UlMjB3b3JrZXJ8ZW58MXx8fHwxNzU5Njg0NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Training Personnel"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Executive Summary Dialog */}
      {showExecutiveSummary && (
        <ExecutiveSummary
          isOpen={showExecutiveSummary}
          onClose={() => setShowExecutiveSummary(false)}
          reportData={{
            fileName: files[0]?.name || 'Analysis Report',
            analysisDate: new Date().toLocaleString(),
            severity: analysisData.summary.severity,
            riskScore: analysisData.summary.riskScore,
            confidence: analysisData.summary.confidence
          }}
        />
      )}
    </div>
  )
}