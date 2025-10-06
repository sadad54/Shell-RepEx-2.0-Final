import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'

const intelligenceData = [
  {
    id: 1,
    title: 'Equipment Aging Pattern Analysis',
    description: 'AI detected accelerated degradation in pumps manufactured between 2018-2020',
    severity: 'Critical',
    confidence: 94,
    affectedAssets: 23,
    predictedFailures: 8,
    timeframe: 'Next 90 days',
    riskScore: 85,
    category: 'Equipment Health',
    tags: ['Pumps', 'Aging', 'Maintenance Required']
  },
  {
    id: 2,
    title: 'Seasonal Maintenance Correlation',
    description: 'Higher incident rates during Q4 maintenance windows due to weather constraints',
    severity: 'High',
    confidence: 87,
    affectedAssets: 15,
    predictedFailures: 3,
    timeframe: 'Q4 2024',
    riskScore: 68,
    category: 'Maintenance',
    tags: ['Weather', 'Q4', 'Planning']
  },
  {
    id: 3,
    title: 'Human Factor Analysis',
    description: 'Training gaps identified in emergency response protocols for night shift personnel',
    severity: 'Medium',
    confidence: 79,
    affectedAssets: 31,
    predictedFailures: 5,
    timeframe: 'Ongoing',
    riskScore: 45,
    category: 'Human Factors',
    tags: ['Training', 'Night Shift', 'Emergency Response']
  }
]

const keyMetrics = [
  {
    label: 'Pattern Detection Accuracy',
    value: '94.2%',
    trend: '+2.1%',
    icon: Target
  },
  {
    label: 'Prevented Incidents',
    value: '127',
    trend: '+18',
    icon: AlertTriangle
  },
  {
    label: 'Cost Savings',
    value: '$4.8M',
    trend: '+$1.2M',
    icon: TrendingUp
  },
  {
    label: 'Active Predictions',
    value: '16',
    trend: '+3',
    icon: Brain
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

export function IntelligenceView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground">Intelligence Hub</h1>
        <p className="text-muted-foreground">
          AI-powered pattern detection and predictive insights from your incident data
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="glass-card glass-card-hover shell-accent-subtle border-0">
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold text-foreground animate-glow">{metric.value}</p>
                    <Badge variant="outline" className="text-xs shell-accent-medium border-accent/30">
                      {metric.trend}
                    </Badge>
                  </div>
                  <div className="p-3 data-card shell-accent-medium rounded-lg transform hover:scale-102 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary interactive-icon" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Intelligence Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Active Intelligence</h2>
          
          {intelligenceData.map((insight) => (
            <Card key={insight.id} className={`glass-card glass-card-hover border-0 ${
              insight.severity === 'Critical' ? 'status-card-danger shell-accent-strong' :
              insight.severity === 'High' ? 'status-card-warning shell-accent-medium' :
              'status-card-warning shell-accent-subtle'
            }`}>
              <CardContent className="p-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground transition-colors duration-300">{insight.title}</h3>
                      <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30 text-xs interactive-icon">
                        {insight.category}
                      </Badge>
                    </div>
                    <Badge className={`${getSeverityColor(insight.severity)} animate-glow`}>
                      {insight.severity}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm">{insight.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Confidence</p>
                      <div className="flex items-center space-x-2">
                        <Progress 
                          value={insight.confidence} 
                          className="h-2 flex-1 shell-accent-subtle hover:shell-accent-medium transition-all duration-300" 
                        />
                        <span className="font-medium animate-glow">{insight.confidence}%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Risk Score</p>
                      <div className="flex items-center space-x-2">
                        <Progress 
                          value={insight.riskScore} 
                          className="h-2 flex-1 shell-accent-subtle hover:shell-accent-medium transition-all duration-300" 
                        />
                        <span className="font-medium animate-glow">{insight.riskScore}/100</span>
                      </div>
                    </div>
                  </div>
                  
                                    <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Affected Assets: </span>
                      <span className="font-medium shell-accent-medium">{insight.affectedAssets}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="shell-accent-subtle hover:shell-accent-medium transition-all duration-300"
                    >
                      View Details
                    </Button>
                  </div>
                  
                                    <div className="flex flex-wrap gap-2 pt-2">
                    {insight.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className="bg-background/50 backdrop-blur-sm border-shell-accent/20 text-shell-accent hover:bg-shell-accent/10 transition-colors duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          {/* AI Recommendations */}
          <Card className="glass-card glass-card-hover border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>AI Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Immediate Action Required</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Schedule emergency inspection for Pump Unit B-23 based on degradation patterns.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">Priority: High</Badge>
                  <Button size="sm" variant="outline">Act Now</Button>
                </div>
              </div>
              
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Training Enhancement</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Implement VR-based emergency response training for night shift personnel.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">ROI: $2.1M</Badge>
                  <Button size="sm" variant="outline">Plan Training</Button>
                </div>
              </div>
              
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Predictive Maintenance</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Deploy IoT sensors on critical assets to improve prediction accuracy.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">Cost Reduction: 40%</Badge>
                  <Button size="sm" variant="outline">View Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Performance */}
          <Card className="glass-card glass-card-hover glass-card-success border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Model Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prediction Accuracy</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">False Positive Rate</span>
                  <span className="font-medium">2.1%</span>
                </div>
                <Progress value={2} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Model Confidence</span>
                  <span className="font-medium">89.7%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}