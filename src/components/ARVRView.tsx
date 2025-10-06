import { useState } from 'react'
import { 
  Play, 
  Eye, 
  Download, 
  Share, 
  Settings, 
  Upload, 
  Smartphone, 
  Glasses, 
  Monitor, 
  Gamepad2, 
  Cpu, 
  Palette, 
  Layers, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Move3D,
  Camera,
  Lightbulb,
  Volume2,
  Pause,
  SkipBack,
  SkipForward,
  Maximize,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { cn } from './ui/utils'

// Mock data for AR/VR projects
const arvrProjects = [
  {
    id: 'ARVR-001',
    title: 'Sector A Pump Failure Reconstruction',
    description: '3D incident reconstruction with interactive timeline and equipment analysis',
    type: 'incident-reconstruction',
    status: 'ready',
    duration: '4:15',
    createdDate: '2024-12-15T14:45:00Z',
    lastModified: '2024-12-16T09:30:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1606124257613-9eb03c4eb0d6?w=400&h=300&fit=crop',
    platforms: ['VR Headset', 'AR Mobile', 'Web 3D'],
    scenes: [
      { name: 'Initial State', duration: '0:45', status: 'complete' },
      { name: 'Equipment Failure', duration: '1:30', status: 'complete' },
      { name: 'Emergency Response', duration: '1:20', status: 'complete' },
      { name: 'Containment', duration: '0:40', status: 'complete' }
    ],
    viewCount: 24,
    shareCount: 8
  },
  {
    id: 'ARVR-002',
    title: 'Pipeline Integrity Virtual Walkthrough',
    description: 'Virtual reality inspection tour with interactive data overlays',
    type: 'virtual-inspection',
    status: 'in-progress',
    duration: '8:30',
    createdDate: '2024-12-10T11:15:00Z',
    lastModified: '2024-12-14T16:20:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1573153178631-49e3aa9e018b?w=400&h=300&fit=crop',
    platforms: ['VR Headset', 'Desktop'],
    scenes: [
      { name: 'Facility Overview', duration: '2:00', status: 'complete' },
      { name: 'Pipeline Sections', duration: '4:00', status: 'complete' },
      { name: 'Critical Points', duration: '2:30', status: 'in-progress' }
    ],
    viewCount: 18,
    shareCount: 5
  },
  {
    id: 'ARVR-003',
    title: 'Emergency Response Training Scenario',
    description: 'Interactive VR training module for emergency response procedures',
    type: 'training-module',
    status: 'ready',
    duration: '12:45',
    createdDate: '2024-12-08T17:30:00Z',
    lastModified: '2024-12-12T10:15:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1582036683005-b95da0de191b?w=400&h=300&fit=crop',
    platforms: ['VR Headset', 'AR Mobile'],
    scenes: [
      { name: 'Safety Briefing', duration: '3:00', status: 'complete' },
      { name: 'Incident Simulation', duration: '6:00', status: 'complete' },
      { name: 'Response Actions', duration: '3:45', status: 'complete' }
    ],
    viewCount: 67,
    shareCount: 23
  }
]

const deviceSupport = [
  { name: 'Meta Quest 2/3', icon: 'VR', status: 'supported', features: ['Full VR', '6DOF', 'Hand Tracking'] },
  { name: 'HTC Vive Pro', icon: 'VR', status: 'supported', features: ['Room Scale', '6DOF', 'Eye Tracking'] },
  { name: 'Microsoft HoloLens', icon: 'AR', status: 'supported', features: ['Mixed Reality', 'Spatial Mapping'] },
  { name: 'iPhone/iPad (ARKit)', icon: 'Mobile', status: 'supported', features: ['AR Camera', 'LiDAR'] },
  { name: 'Android (ARCore)', icon: 'Mobile', status: 'supported', features: ['AR Camera', 'Plane Detection'] },
  { name: 'Desktop Web', icon: 'Desktop', status: 'supported', features: ['WebXR', '3D Navigation'] }
]

export function ARVRView() {
  const [selectedProject, setSelectedProject] = useState<typeof arvrProjects[0] | null>(arvrProjects[0])
  const [activeTab, setActiveTab] = useState('studio')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [viewMode, setViewMode] = useState('3d-preview')
  const [renderQuality, setRenderQuality] = useState('high')
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [enableAudio, setEnableAudio] = useState(true)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <Play className="w-4 h-4 text-success" />
      case 'in-progress':
        return <Settings className="w-4 h-4 text-accent-foreground animate-spin" />
      case 'draft':
        return <Eye className="w-4 h-4 text-muted-foreground" />
      default:
        return <Settings className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-success text-success-foreground'
      case 'in-progress':
        return 'bg-accent text-accent-foreground'
      case 'draft':
        return 'bg-muted text-muted-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const formatDuration = (duration: string) => {
    return duration
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">AR/VR Studio</h1>
          <p className="text-muted-foreground">
            Create immersive 3D visualizations and interactive training modules
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Assets
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Play className="w-4 h-4 mr-2" />
            Create New Project
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="studio">Studio</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="devices">Device Support</TabsTrigger>
          <TabsTrigger value="export">Export & Share</TabsTrigger>
        </TabsList>

        <TabsContent value="studio" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Viewport */}
            <div className="lg:col-span-3 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Monitor className="w-5 h-5" />
                      <span>3D Viewport</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Select value={viewMode} onValueChange={setViewMode}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3d-preview">3D Preview</SelectItem>
                          <SelectItem value="vr-preview">VR Preview</SelectItem>
                          <SelectItem value="ar-preview">AR Preview</SelectItem>
                          <SelectItem value="wireframe">Wireframe</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg relative overflow-hidden">
                    {selectedProject?.thumbnail && (
                      <ImageWithFallback
                        src={selectedProject.thumbnail}
                        alt="3D Scene Preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                      />
                    )}
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
                          {isPlaying ? (
                            <Pause className="w-10 h-10 text-primary" />
                          ) : (
                            <Play className="w-10 h-10 text-primary" />
                          )}
                        </div>
                        <div className="text-white space-y-2">
                          <h3 className="text-xl font-medium">{selectedProject?.title}</h3>
                          <p className="text-slate-200">{selectedProject?.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Scene Controls Overlay */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                        <Move3D className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Timeline and Playback Controls */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 space-y-3">
                        <div className="flex items-center space-x-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <SkipBack className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <SkipForward className="w-4 h-4" />
                          </Button>
                          <div className="flex-1">
                            <Progress value={currentTime} className="h-2" />
                          </div>
                          <span className="text-white text-sm">
                            {Math.floor(currentTime * 4.25 / 100)}:{Math.floor((currentTime * 4.25 / 100 % 1) * 60).toString().padStart(2, '0')} / {selectedProject?.duration || '4:15'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scene Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="w-5 h-5" />
                    <span>Scene Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedProject?.scenes.map((scene, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{scene.name}</h4>
                          <p className="text-sm text-muted-foreground">Duration: {scene.duration}</p>
                        </div>
                        <Badge className={cn(getStatusColor(scene.status))}>
                          {scene.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Render Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Quality</Label>
                    <Select value={renderQuality} onValueChange={setRenderQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ultra">Ultra (4K)</SelectItem>
                        <SelectItem value="high">High (1080p)</SelectItem>
                        <SelectItem value="medium">Medium (720p)</SelectItem>
                        <SelectItem value="low">Low (480p)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Show Annotations</Label>
                    <Switch checked={showAnnotations} onCheckedChange={setShowAnnotations} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Enable Audio</Label>
                    <Switch checked={enableAudio} onCheckedChange={setEnableAudio} />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Lighting</Label>
                    <Slider defaultValue={[75]} max={100} step={1} />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Camera Speed</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Camera Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Reset View
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Auto Focus
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Audio Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {arvrProjects.map((project) => (
              <Card key={project.id} className={cn(
                "cursor-pointer glass-card glass-card-hover border-0",
                selectedProject?.id === project.id && "ring-2 ring-primary"
              )} onClick={() => setSelectedProject(project)}>
                <CardContent className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={cn(getStatusColor(project.status))}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                        {project.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      {getStatusIcon(project.status)}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Modified: {formatDate(project.lastModified)}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.viewCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share className="w-4 h-4" />
                          <span>{project.shareCount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.platforms.slice(0, 2).map(platform => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                      {project.platforms.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.platforms.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6 mt-6">
          <Card className="glass-card glass-card-hover border-0">
            <CardHeader>
              <CardTitle>Device Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deviceSupport.map((device, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          {device.icon === 'VR' && <Glasses className="w-5 h-5 text-primary" />}
                          {device.icon === 'AR' && <Smartphone className="w-5 h-5 text-primary" />}
                          {device.icon === 'Mobile' && <Smartphone className="w-5 h-5 text-primary" />}
                          {device.icon === 'Desktop' && <Monitor className="w-5 h-5 text-primary" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{device.name}</h4>
                          <Badge className="bg-success text-success-foreground">
                            {device.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {device.features.map(feature => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card glass-card-hover border-0">
            <CardHeader>
              <CardTitle>System Requirements</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Minimum Requirements</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• CPU: Intel i5-8400 / AMD Ryzen 5 2600</p>
                    <p>• GPU: GTX 1060 / RX 580</p>
                    <p>• RAM: 8GB DDR4</p>
                    <p>• Storage: 10GB available space</p>
                    <p>• OS: Windows 10 / macOS 10.15+</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Recommended</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• CPU: Intel i7-10700K / AMD Ryzen 7 3700X</p>
                    <p>• GPU: RTX 3070 / RX 6700 XT</p>
                    <p>• RAM: 16GB DDR4</p>
                    <p>• Storage: 25GB available space (SSD)</p>
                    <p>• OS: Windows 11 / macOS 12+</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">VR Optimal</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• CPU: Intel i9-11900K / AMD Ryzen 9 5900X</p>
                    <p>• GPU: RTX 4080 / RX 7800 XT</p>
                    <p>• RAM: 32GB DDR4</p>
                    <p>• Storage: 50GB available space (NVMe SSD)</p>
                    <p>• USB: USB 3.0+ for headset connectivity</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card glass-card-hover border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Export Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Video Export</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                      <Monitor className="w-6 h-6" />
                      <span className="text-sm">4K Video</span>
                      <span className="text-xs text-muted-foreground">MP4, H.264</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                      <Smartphone className="w-6 h-6" />
                      <span className="text-sm">Mobile Video</span>
                      <span className="text-xs text-muted-foreground">1080p, H.265</span>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Interactive Export</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                      <Glasses className="w-6 h-6" />
                      <span className="text-sm">VR Package</span>
                      <span className="text-xs text-muted-foreground">Quest, Vive, Index</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                      <Smartphone className="w-6 h-6" />
                      <span className="text-sm">AR App</span>
                      <span className="text-xs text-muted-foreground">iOS, Android</span>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Web Export</h4>
                  <Button variant="outline" className="w-full h-auto p-4 flex-col space-y-2">
                    <Monitor className="w-6 h-6" />
                    <span className="text-sm">WebXR Experience</span>
                    <span className="text-xs text-muted-foreground">Works in modern browsers</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glass-card-hover border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share className="w-5 h-5" />
                  <span>Share & Collaborate</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Quick Share</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="w-4 h-4 mr-2" />
                      Generate View Link
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Create Download Package
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Share className="w-4 h-4 mr-2" />
                      Embed Code
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Collaboration</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Invite Reviewers
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Access Permissions
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Analytics</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Views:</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. Session:</span>
                      <span className="font-medium">3m 24s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completion Rate:</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}