import { useState } from 'react'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Maximize, 
  Grid3X3, 
  Camera,
  Download,
  Share,
  Clock,
  AlertTriangle,
  MapPin,
  Users,
  Thermometer,
  Shield
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Slider } from './ui/slider'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'

const timelineEvents = [
  {
    time: '14:32:15',
    title: 'Initial Pressure Reading',
    description: 'Pressure sensor detected anomaly in Pipeline Section A',
    critical: false,
    entities: ['Pressure Sensor PS-001', 'Pipeline A']
  },
  {
    time: '14:32:48',
    title: 'Safety System Alert',
    description: 'Automated safety system triggered emergency protocols',
    critical: true,
    entities: ['Safety System', 'Control Room']
  },
  {
    time: '14:33:12',
    title: 'Personnel Evacuation',
    description: 'Emergency evacuation of personnel from affected area',
    critical: true,
    entities: ['Safety Personnel', 'Area A-7']
  },
  {
    time: '14:35:20',
    title: 'Equipment Shutdown',
    description: 'Primary processing equipment safely shut down',
    critical: false,
    entities: ['Compressor Unit 3', 'Valve V-103']
  }
]

const similarIncidents = [
  {
    id: 'INC-2023-089',
    title: 'Pipeline Pressure Event - East Sector',
    similarity: 94,
    date: '2023-11-15',
    factors: ['Pressure Anomaly', 'Equipment Age', 'Weather Conditions']
  },
  {
    id: 'INC-2023-067',
    title: 'Safety System Activation - Unit 2',
    similarity: 87,
    date: '2023-09-22',
    factors: ['Safety Protocol', 'Pressure Deviation', 'Human Factor']
  },
  {
    id: 'INC-2023-034',
    title: 'Emergency Shutdown - South Pipeline',
    similarity: 82,
    date: '2023-06-08',
    factors: ['Equipment Failure', 'Pressure Loss', 'Maintenance Window']
  }
]

export function IncidentWorkspace() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState([45])
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="h-screen flex">
      {/* Left Panel - Timeline & Events */}
      <div className="w-80 bg-background border-r border-border overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-foreground">Pipeline Pressure Anomaly</h1>
            <p className="text-sm text-muted-foreground">INC-2024-001 • North Sector Alpha</p>
            <div className="flex items-center space-x-2">
              <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>
              <Badge variant="outline">14:32 - 14:45</Badge>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Timeline</h3>
            <Button variant="ghost" size="sm">
              <Clock className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`relative pl-6 pb-4 cursor-pointer hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors ${
                  event.critical ? 'border-l-2 border-l-destructive' : 'border-l-2 border-l-border'
                }`}
              >
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-background border-2 border-primary"></div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">{event.time}</span>
                    {event.critical && <AlertTriangle className="w-4 h-4 text-destructive" />}
                  </div>
                  
                  <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {event.entities.map((entity, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {entity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Panel - 3D Animation Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Header */}
        <div className="bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            {/* View Mode Tabs */}
            <Tabs defaultValue="3d" className="w-auto">
              <TabsList>
                <TabsTrigger value="3d">3D View</TabsTrigger>
                <TabsTrigger value="thermal">Thermal</TabsTrigger>
                <TabsTrigger value="safety">Safety Zones</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Camera Presets */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-1" />
                Overview
              </Button>
              <Button variant="outline" size="sm">
                First Person
              </Button>
              <Button variant="outline" size="sm">
                Equipment
              </Button>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 3D Scene */}
        <div className="flex-1 bg-slate-900 relative overflow-hidden">
          {/* Mock 3D Scene */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <div className="text-white text-4xl font-bold">3D</div>
              </div>
              <div className="text-white">
                <h3 className="text-xl font-semibold mb-2">Interactive 3D Animation</h3>
                <p className="text-slate-300 text-sm max-w-md">
                  This would show a real-time 3D recreation of the incident with interactive hotspots, 
                  entity tracking, and immersive camera controls.
                </p>
              </div>
            </div>
          </div>

          {/* Scene Overlays */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
              <div className="flex items-center space-x-2 text-sm">
                <Thermometer className="w-4 h-4" />
                <span>Temperature: 245°C</span>
              </div>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4" />
                <span>Safety Zone: Active</span>
              </div>
            </div>
          </div>

          {/* Hotspot Example */}
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-destructive rounded-full animate-pulse cursor-pointer">
              <div className="absolute -top-8 -left-16 bg-black/75 backdrop-blur-sm rounded-lg p-2 text-white text-xs whitespace-nowrap">
                Pressure Sensor PS-001
              </div>
            </div>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="bg-background border-t border-border p-4">
          <div className="space-y-4">
            {/* Timeline Scrubber */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">14:32:15</span>
                <span className="text-muted-foreground">14:45:30</span>
              </div>
              <Slider
                value={currentTime}
                onValueChange={setCurrentTime}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex items-center justify-center space-x-1">
                {timelineEvents.map((_, index) => (
                  <div key={index} className="w-1 h-3 bg-primary/30 rounded-sm"></div>
                ))}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="icon">
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <Button onClick={togglePlayback} size="icon" className="w-12 h-12">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              
              <Button variant="outline" size="icon">
                <SkipForward className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center space-x-2 ml-8">
                <span className="text-sm text-muted-foreground">Speed:</span>
                <Button 
                  variant={playbackSpeed === 0.5 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setPlaybackSpeed(0.5)}
                >
                  0.5x
                </Button>
                <Button 
                  variant={playbackSpeed === 1 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setPlaybackSpeed(1)}
                >
                  1x
                </Button>
                <Button 
                  variant={playbackSpeed === 2 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setPlaybackSpeed(2)}
                >
                  2x
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Intelligence */}
      <div className="w-96 bg-background border-l border-border overflow-y-auto">
        <Tabs defaultValue="summary" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="similar">Similar</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="flex-1 p-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Executive Summary</h3>
              <div className="space-y-4">
                <Card className="glass-card glass-card-hover glass-card-danger border-0">
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Risk Score</span>
                      <span className="text-2xl font-bold text-destructive">87</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </CardContent>
                </Card>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Duration</span>
                    <span className="font-medium">13 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Affected Equipment</span>
                    <span className="font-medium">7 units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Personnel Evacuated</span>
                    <span className="font-medium">12 people</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Estimated Cost</span>
                    <span className="font-medium text-destructive">$240K</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Key Insights</h4>
              <div className="space-y-3">
                <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <p className="text-sm font-medium text-destructive">Critical Finding</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pressure sensor calibration was 18 months overdue
                  </p>
                </div>
                <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <p className="text-sm font-medium text-warning">Pattern Match</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Similar failures occurred in Q3 2023 across 3 facilities
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="similar" className="flex-1 p-6 space-y-4">
            <h3 className="font-semibold">Similar Incidents</h3>
            {similarIncidents.map((incident, index) => (
              <Card key={index} className="glass-card glass-card-hover border-0 cursor-pointer">
                <CardContent className="p-4 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{incident.title}</p>
                        <p className="text-xs text-muted-foreground">{incident.id}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {incident.similarity}% match
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {incident.factors.map((factor, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{incident.date}</span>
                      <Button variant="ghost" size="sm">Compare</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="patterns" className="flex-1 p-6 space-y-4">
            <h3 className="font-semibold">AI Pattern Analysis</h3>
            
            <Card className="glass-card glass-card-hover glass-card-warning border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Equipment Aging Pattern</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Frequency</span>
                    <span className="font-bold text-primary">23 incidents</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Equipment over 15 years shows 3.2x higher failure rate
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glass-card-hover glass-card-warning border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Maintenance Correlation</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk Factor</span>
                    <span className="font-bold text-warning">High</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    68% of incidents occur within 30 days of missed maintenance
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}