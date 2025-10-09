
import { useState, useRef, useEffect } from 'react'
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
  Calendar,
  ChevronDown,
  ChevronUp,
  Volume2,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  Pause,
  Wrench,
  HardHat,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { Slider } from './ui/slider'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ExecutiveSummary } from './ExecutiveSummary'
import { cn } from './ui/utils'
import { publicUrl } from '../lib/asset' // or '../lib/asset' if not using '@'
import couplingImg from '../assets/images/coupling_assembly.png'
import degradationImg from '../assets/images/degradation_indicators.png'
import emergencyImg from '../assets/images/emergency_timeline.png'
import environmentImg from '../assets/images/environment_containment.png'
import predictiveImg from '../assets/images/predictive.png'
import trainingImg from '../assets/images/training.png'
import incidentVideo from '../assets/videos/incident_animation.mp4'
import mitigationVideo from '../assets/videos/mitigation_animation.mp4'

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from './ui/collapsible'
import { IframeInfographicCard } from './IframeInfographicCard'


function AutoplayVideoCard({ videoSrc, title }: { videoSrc: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          videoElement.play().catch(() => {
            // Autoplay blocked - silent fail
          });
        } else {
          videoElement.pause();
        }
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    observer.observe(videoElement);

    return () => observer.disconnect();
  }, []);

  return (
    <Card className="glass-card glass-card-hover shell-accent-strong border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="w-5 h-5 interactive-icon" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <video
          ref={videoRef}
          className="w-full rounded-lg"
          playsInline
          preload="metadata"
          muted
          loop
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </CardContent>
    </Card>
  );
}
const ASSETS = {
  images: {
    coupling: couplingImg,
    degradation: degradationImg,
    emergency: emergencyImg,
    environment: environmentImg,
    training:trainingImg,
    predictive:predictiveImg
  },
 videos: {
  incidentVideo: incidentVideo,
  mitigationVideo: mitigationVideo
 }
  
}







interface AnalysisResultsProps {
  files: Array<{ name: string; id: string }>
  onClose: () => void
}

/** 
 * Data extracted/derived from the uploaded PDF:
 * - Report ID: INC-2023-0614-PBK-J3
 * - Report Date (creation): 21 June 2023
 * - Incident Date: 14 June 2023 14:35 SGT
 * - Location: Jetty 3, Pulau Bukom Refinery Terminal, Singapore
 * - Severity: HIGH
 * - Spill: ~320 L Brent Crude, contained in ~12 minutes
 * - Status: Closed – Corrective Actions In Progress
 * - Root cause: Viking Johnson Series 27 flexible coupling exceeded service life
 * - Pattern: 3 similar incidents (2022–2023), similarity score ~92%
 * - Costs: Direct SGD 185k, Indirect SGD 73k, Total SGD 258k
 * - Probability of recurrence (if no action): 78% (confidence 89%)
 */
const analysisData = {
  meta: {
    reportName: 'Oil Spill During Vessel Discharge',
    reportId: 'INC-2023-0614-PBK-J3',
    reportDate: '21 June 2023',
    incidentDate: '14 June 2023, 14:35 SGT',
    location: 'Jetty 3, Pulau Bukom Refinery Terminal, Singapore',
    status: 'CLOSED – Corrective Actions In Progress',
  },
  summary: {
    severity: 'High',
    riskScore: 78,               // Probability score (HIGH RISK) if no action
    confidence: 89,              // Confidence level reported
    estimatedCost: 'SGD 258,000',// Direct 185k + Indirect 73k
    timeToResolve: '≈3 hours (bulk recovery completed 17:30)',
    affectedPersonnel: 12        // Ops + ERT + supervisors involved on scene
  },
  keyFindings: [
    {
      title: 'Primary Root Cause – Coupling beyond service life',
      description:
        'Flexible coupling (Viking Johnson Series 27, Asset HF-3A-027) exceeded its 60-month certification by 4 months; cyclic fatigue and corrosion pitting observed; elastomer seal hardening confirmed.',
      severity: 'critical',
      confidence: 96
    },
    {
      title: 'Emergency response & notifications',
      description:
        'ESD activated within 2 minutes; containment booms deployed by T+10; MPA notified at T+18 and NEA at T+25; no injuries, fire, or marine pollution reported.',
      severity: 'high',
      confidence: 92
    },
    {
      title: 'Environmental impact & containment',
      description:
        'Approx. 320 L Brent Crude released on jetty apron; fully contained within 12 minutes; bulk recovery (~280 L) completed; site cleanup concluded the same day.',
      severity: 'medium',
      confidence: 93
    }
  ],
  recommendations: [
    'Emergency inspection and replacement of overdue/critical couplings.',
    'Update pre-transfer checklist to verify certification dates (SOP-DIS-003).',
    'Implement CMMS alerts (30-day pre-expiry) and clear escalation rules.',
    'Install IoT pressure monitoring; adopt predictive maintenance program.'
  ],
  patternMatches: [
    {
      title: 'Aging Hose Coupling Cascade',
      description:
        '3 similar incidents (Mar 2022, Sep 2022, Jun 2023) across Singapore terminals; similarity score ≈92%; common theme: couplings exceeding manufacturer service life.',
      riskIncreaseNote: 'High recurrence risk without fleet-wide replacement'
    }
  ],
  media: {
    // Provide your actual URLs if you have processed videos; image placeholders keep UI intact.
    problemVideoUrl: 'ASSETS.videos.problem',   // e.g., '/media/incident_reconstruction.mp4'
    solutionVideoUrl: 'ASSETS.videos.solution',
    reconstructionVideo2: 'ASSETS.videos.3d_reconstructionv2'  // e.g., '/media/mitigation_plan.mp4'
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
  conclusion:
    'The incident was precipitated by service-life overrun of a critical coupling and checklist gaps. Rapid ESD and containment prevented marine pollution and injuries. Immediate fleet-wide coupling governance, certification checks in SOPs, and CMMS alerting are essential to reduce recurrence risk (78%) and cost exposure (SGD 258k total).',
  executiveSummary: 'The analysis identified key root causes, response effectiveness, and actionable recommendations to mitigate future risks. Immediate actions include emergency coupling replacements, SOP updates, and CMMS alerting. Long-term strategies involve IoT monitoring and predictive maintenance to enhance asset reliability and safety culture.'
}

export function AnalysisResults({ files, onClose }: AnalysisResultsProps) {
  const [activeView, setActiveView] = useState<'overview' | 'animation' | 'recommendations'>('overview')
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(false)
  const [personnelTimelineOpen, setPersonnelTimelineOpen] = useState(false)
  const [eventSequenceOpen, setEventSequenceOpen] = useState(false)
   const [equipmentViewOpen, setEquipmentViewOpen] = useState(false)


  
  // State hooks you likely already have
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);

  // NEW: Create a ref to access the video DOM element directly
  const videoRef = useRef<HTMLVideoElement>(null);

  // NEW: Effect to handle playing and pausing the video
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // NEW: Effect to update the video's volume when the state changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100; // HTML volume is 0 to 1
    }
  }, [volume]);
  
  // NEW: Functions to handle video events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Your existing toggle function
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // NEW: Function to handle seeking with the slider
  const handleSeek = (newTime: number[]) => {
    if (videoRef.current) {
      const time = newTime[0] ?? 0;
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  // Your existing time formatting function
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Key Findings</h2>
          <p className="text-muted-foreground">
            Analysis completed for {files.length} file{files.length > 1 ? 's' : ''} • {new Date().toLocaleString()}
          </p>
          {/* New: Report meta row (from PDF) */}
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-foreground/80" />
              <span className="font-bold">{analysisData.meta.reportName || files[0]?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-md">
                ID: {analysisData.meta.reportId}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-foreground/80" />
              <span>Report Date: {analysisData.meta.reportDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-foreground/80" />
              <span className="truncate">{analysisData.meta.location}</span>
            </div>
          </div>
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

      {/* View Toggle — strengthened active styling */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
        {[
          { key: 'overview', label: 'Overview', icon: BarChart3 },
          { key: 'animation', label: '3D Animation', icon: Play },
          { key: 'recommendations', label: 'Recommendations', icon: Lightbulb }
        ].map(view => {
          const Icon = view.icon
          const isActive = activeView === (view.key as typeof activeView)
          return (
            <Button
              key={view.key}
              variant={isActive ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView(view.key as any)}
              className={cn(
                'flex-1 transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground font-semibold ring-2 ring-primary/60 shadow-sm'
                  : 'hover:bg-background'
              )}
            >
              <Icon className={cn('w-4 h-4 mr-2', isActive ? 'scale-110' : '')} />
              {view.label}
            </Button>
          )
        })}
      </div>
      {/* Overview View */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary + Findings column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Details (new, above Summary) */}
            <Card className="glass-card glass-card-hover shell-accent-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 interactive-icon" />
                  <span>Report Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-3 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Incident Date:</span>
                    <span className="font-medium">{analysisData.meta.incidentDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{analysisData.meta.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{analysisData.meta.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Report ID:</span>
                    <span className="font-medium">{analysisData.meta.reportId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
 <Card className="glass-card glass-card-hover border-0">
  <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysisData.executiveSummary}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysisData.executiveSummary}
                </p>
              </CardContent></div>
            </Card>
            <div className="space-y-4">
       <AutoplayVideoCard 
  videoSrc={ASSETS.videos.incidentVideo} 
  title="Incident Animation" 
/>

  </div>

            {/* Key Findings */}
            <Card className="glass-card glass-card-hover shell-accent-strong border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 interactive-icon" />
                  <span>Must See</span>
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
                    
                    {/* Visual Evidence from report context */}
                    {index === 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-foreground mb-2">Visual Evidence:</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <ImageWithFallback src={ASSETS.images.coupling} alt="Flexible coupling assembly" className="w-full h-24 object-cover rounded-lg" />
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium">Coupling Assembly</span>
                            </div>
                          </div>
                          <div className="relative">
                            <ImageWithFallback src={ASSETS.images.degradation} alt="Degradation indicators" className="w-full h-24 object-cover rounded-lg" />

                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium">Degradation Indicators</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {index === 1 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-foreground mb-2">Incident Timeline:</p>
                        <div className="relative">
                         <ImageWithFallback src={ASSETS.images.emergency} alt="Emergency response timeline" className="w-full h-32 object-cover rounded-lg" />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end">
                            <div className="p-3 text-white">
                              <p className="text-sm font-medium">ESD @ T+2 • Boom @ T+10 • MPA @ T+18 • NEA @ T+25</p>
                              <p className="text-xs opacity-90">Contained within 12 minutes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {index === 2 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-foreground mb-2">Containment & Cleanup:</p>
                        <div className="relative">
           <ImageWithFallback src={ASSETS.images.environment} alt="Environmental impact & containment" className="w-full h-32 object-cover rounded-lg" />


                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end">
                            <div className="p-3 text-white">
                              <p className="text-sm font-medium">Containment boom deployment • Vacuum truck recovery</p>
                              <p className="text-xs opacity-90">~280 L recovered • No marine pollution</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* New: Two vertical videos under Key Findings (Problem → Mitigation) */}
{/* Animated & illustrative infographic cards */}







<AutoplayVideoCard 
  videoSrc={ASSETS.videos.mitigationVideo} 
  title="Response Animation" 
/>




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
                    <p className="text-sm text-muted-foreground">Recurrence Risk</p>
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
              {/* Interactive Control Panels */}
              <div className="mt-6 space-y-4">
                {/* Equipment View */}
                <Collapsible open={equipmentViewOpen} onOpenChange={setEquipmentViewOpen}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between glass-card glass-card-hover border-0 p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">Equipment View</h3>
                          <p className="text-sm text-muted-foreground">Critical equipment status and locations</p>
                        </div>
                      </div>
                      {equipmentViewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1588620598988-9f73e66e8df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZXF1aXBtZW50JTIwcHVtcCUyMGZhY2lsaXR5fGVufDF8fHx8MTc1OTg4OTEyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Pump Equipment"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Pump Unit B-23</h4>
                                <Badge variant="destructive">Critical</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Primary failure point - Bearing degradation detected</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Temperature: 89°C</span>
                                <span className="text-muted-foreground">Pressure: 2.3 bar</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1722580089913-9a8dd0959470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBwaXBlbGluZSUyMHZhbHZlJTIwc3lzdGVtfGVufDF8fHx8MTc1OTg4OTEyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Valve System"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Safety Valve SV-45</h4>
                                <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">Normal</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Operated correctly during incident sequence</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Position: 85% Open</span>
                                <span className="text-muted-foreground">Response: 2.3s</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1738918937796-743064feefa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY29udHJvbCUyMHJvb20lMjBtb25pdG9yaW5nfGVufDF8fHx8MTc1OTgzNjM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Control Panel"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Control Panel CP-12</h4>
                                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Warning</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Delayed alarm acknowledgment</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Response Time: 12s</span>
                                <span className="text-muted-foreground">Operator: J. Smith</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="space-y-3">
                            <h4 className="font-medium flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-accent" />
                              <span>Equipment Timeline</span>
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>00:00 - Normal operation</span>
                                <div className="w-3 h-3 bg-success rounded-full"></div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>00:32 - Vibration detected</span>
                                <div className="w-3 h-3 bg-warning rounded-full"></div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>01:15 - Pump failure</span>
                                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>01:45 - Safety shutdown</span>
                                <div className="w-3 h-3 bg-accent rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Personnel Timeline */}
                <Collapsible open={personnelTimelineOpen} onOpenChange={setPersonnelTimelineOpen}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between glass-card glass-card-hover border-0 p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-info/10 border border-info/30 flex items-center justify-center">
                          <HardHat className="w-5 h-5 text-info" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">Personnel Timeline</h3>
                          <p className="text-sm text-muted-foreground">Staff actions and response times</p>
                        </div>
                      </div>
                      {personnelTimelineOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1759489172749-3ceb9e1eb985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoZWxtZXQlMjB3b3JrZXIlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc1OTg4OTEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Operator"
                              className="w-16 h-16 object-cover rounded-full"
                            />
                            <div className="flex-1 space-y-2">
                              <div>
                                <h4 className="font-medium">John Smith</h4>
                                <p className="text-sm text-muted-foreground">Control Room Operator</p>
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span>First alarm acknowledged:</span>
                                  <span className="font-medium">00:44</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Emergency shutdown initiated:</span>
                                  <span className="font-medium">01:52</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Response rating:</span>
                                  <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">Good</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1759489172749-3ceb9e1eb985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoZWxtZXQlMjB3b3JrZXIlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc1OTg4OTEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Maintenance Tech"
                              className="w-16 h-16 object-cover rounded-full"
                            />
                            <div className="flex-1 space-y-2">
                              <div>
                                <h4 className="font-medium">Maria Rodriguez</h4>
                                <p className="text-sm text-muted-foreground">Maintenance Technician</p>
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span>Arrived on scene:</span>
                                  <span className="font-medium">02:15</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Initial assessment:</span>
                                  <span className="font-medium">02:45</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Response rating:</span>
                                  <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">Excellent</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0 md:col-span-2">
                        <CardContent className="p-4 relative z-10">
                          <h4 className="font-medium mb-3 flex items-center space-x-2">
                            <Users className="w-4 h-4 text-info" />
                            <span>Response Team Timeline</span>
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">00:32</span>
                              <div className="w-3 h-3 bg-warning rounded-full"></div>
                              <span className="text-sm">Alarm triggered - J. Smith notified</span>
                            </div>
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">00:44</span>
                              <div className="w-3 h-3 bg-info rounded-full"></div>
                              <span className="text-sm">J. Smith acknowledges alarm, begins assessment</span>
                            </div>
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">01:15</span>
                              <div className="w-3 h-3 bg-destructive rounded-full"></div>
                              <span className="text-sm">Emergency response team called - M. Rodriguez dispatched</span>
                            </div>
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">01:52</span>
                              <div className="w-3 h-3 bg-accent rounded-full"></div>
                              <span className="text-sm">Emergency shutdown initiated by J. Smith</span>
                            </div>
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">02:15</span>
                              <div className="w-3 h-3 bg-success rounded-full"></div>
                              <span className="text-sm">M. Rodriguez arrives on scene, begins inspection</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Event Sequence */}
                <Collapsible open={eventSequenceOpen} onOpenChange={setEventSequenceOpen}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between glass-card glass-card-hover border-0 p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">Event Sequence</h3>
                          <p className="text-sm text-muted-foreground">Chronological incident progression</p>
                        </div>
                      </div>
                      {eventSequenceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <Card className="glass-card border-0">
                      <CardContent className="p-4 relative z-10">
                        <h4 className="font-medium mb-4 flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>Detailed Event Timeline</span>
                        </h4>
                        <div className="space-y-4">
                          <div className="relative pl-6 pb-4 border-l-2 border-success">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-success rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:00:00</span>
                                <Badge variant="outline" className="bg-success/10 text-success border-success/30">Normal</Badge>
                              </div>
                              <p className="text-sm">Normal operation - All systems functioning within parameters</p>
                              <div className="text-xs text-muted-foreground">
                                Pump B-23: 1800 RPM, Temperature: 65°C, Pressure: 2.1 bar
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6 pb-4 border-l-2 border-warning">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-warning rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:00:32</span>
                                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Warning</Badge>
                              </div>
                              <p className="text-sm">Vibration anomaly detected on Pump B-23 bearing</p>
                              <div className="text-xs text-muted-foreground">
                                Vibration level: 8.2 mm/s (Normal: &lt;5.0 mm/s)
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6 pb-4 border-l-2 border-warning">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-warning rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:00:44</span>
                                <Badge variant="outline" className="bg-info/10 text-info border-info/30">Response</Badge>
                              </div>
                              <p className="text-sm">Operator J. Smith acknowledges alarm, begins system review</p>
                              <div className="text-xs text-muted-foreground">
                                Control room protocol followed, temperature rising to 72°C
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6 pb-4 border-l-2 border-destructive">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-destructive rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:01:15</span>
                                <Badge variant="destructive">Critical</Badge>
                              </div>
                              <p className="text-sm">Pump B-23 bearing failure - Complete mechanical breakdown</p>
                              <div className="text-xs text-muted-foreground">
                                Temperature spike to 89°C, pressure drop to 1.2 bar, emergency response activated
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6 pb-4 border-l-2 border-accent">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-accent rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:01:52</span>
                                <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">Action</Badge>
                              </div>
                              <p className="text-sm">Emergency shutdown initiated - Safety valve SV-45 activated</p>
                              <div className="text-xs text-muted-foreground">
                                System isolated, maintenance team dispatched, area secured
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-success rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:04:15</span>
                                <Badge variant="outline" className="bg-success/10 text-success border-success/30">Secured</Badge>
                              </div>
                              <p className="text-sm">Area secured, incident contained - No injuries reported</p>
                              <div className="text-xs text-muted-foreground">
                                Investigation initiated, preliminary report filed
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </div>
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
                      src={ASSETS.images.predictive}
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
                      src={ASSETS.images.training}
                      alt="Training Personnel"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
            {/* New: Short conclusion under the videos */}
            <Card className="glass-card glass-card-hover border-0"><div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <CardHeader>
                <CardTitle>Conclusion</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysisData.conclusion}
                </p>
              </CardContent></div>
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
                  More Findings
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
  <CardContent className="relative z-10 space-y-4">
    {analysisData.patternMatches.map((pattern, index) => (
      <div key={index}>
        <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
          <h4 className="font-medium text-foreground">{pattern.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
          <Badge variant="outline" className="mt-2 text-xs bg-destructive/10 text-destructive border-destructive/20">
            {pattern.riskIncreaseNote}
          </Badge>
        </div>
      </div>
    ))}
    
    <Separator className="my-4" />
    
    {/* Why Analysis */}
    <div className="space-y-3">
      <h4 className="font-semibold text-sm flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-destructive" />
        <span>Why Analysis (5 Whys)</span>
      </h4>
      <div className="space-y-2">
        {[
          "Why did the coupling fail? - Degraded flexible seal exceeded its 60-month service life by 4 months",
          "Why was the service life exceeded? - Asset tracking system did not trigger replacement alert",
          "Why was it not replaced? - CMMS work order (WO: 23-1847) was postponed due to parts availability",
          "Why was it not rescheduled? - Lack of escalation protocol for postponed critical maintenance tasks",
          "Why no escalation protocol? - CMMS lacks system to flag postponed high-priority maintenance",
          "Why no risk assessment? - Limited integration between maintenance scheduling and safety systems"
        ].map((why, index) => (
          <div key={index} className="p-2 bg-muted rounded text-xs">
            <p className="text-foreground leading-relaxed">{why}</p>
          </div>
        ))}
      </div>
    </div>

    {/* How Implementation */}
    <div className="space-y-3">
      <h4 className="font-semibold text-sm flex items-center space-x-2">
        <Wrench className="w-4 h-4 text-accent-foreground" />
        <span>How Implementation</span>
      </h4>
      <div className="space-y-2">
        {[
          "How to prevent recurrence? - Implement fleet-wide coupling inspection program with IoT sensors",
          "How to enforce compliance? - Automate SOP-DIS-003 checklist verification (Step 4.7) via digital approval workflow",
          "How to improve inspection? - Add regulatory authority pre-verification (Step 4.7) to loading checklist with sign-off gates",
          "How to manage maintenance? - Deploy escalation rules in CMMS to Technical Superintendents for overdue critical tasks",
          "How to monitor fleet health? - Establish asset health dashboard with Phase B! integration tracking wear indicators"
        ].map((how, index) => (
          <div key={index} className="p-2 bg-accent/10 border border-accent/30 rounded text-xs">
            <p className="text-foreground leading-relaxed">{how}</p>
          </div>
        ))}
      </div>
    </div>

    {/* What Outcomes */}
    <div className="space-y-3">
      <h4 className="font-semibold text-sm flex items-center space-x-2">
        <Target className="w-4 h-4 text-success" />
        <span>What Outcomes</span>
      </h4>
      <div className="space-y-2">
        {[
          "What was the direct cost? - SGD 185,000: Cleanup (SGD 47k), replacement parts (SGD 89k), and downtime costs (SGD 49k)",
          "What was the total impact? - SGD 258,000: Including regulatory response, reputation, and insurance premium adjustments",
          "What were the environmental effects? - 320L Brent Crude released, fully contained with no marine pollution reported",
          "What was prevented? - Marine pollution, refined penalties, and operational suspension due to rapid ESD and containment",
          "What must change? - 27 underdue couplings remain across the PB-J infrastructure - Critical immediate action needed"
        ].map((what, index) => (
          <div key={index} className="p-2 bg-success/10 border border-success/30 rounded text-xs">
            <p className="text-foreground leading-relaxed">{what}</p>
          </div>
        ))}
      </div>
    </div>
  </CardContent>
</Card>  </div>
        </div>
      )}
  
      {/* 3D Animation View */}
          {/* 3D Animation View */}
      {activeView === 'animation' && (
        <div className="space-y-6">
          <Card className="glass-card glass-card-hover border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>3D Incident Reconstruction</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg relative overflow-hidden group">
                    {/* NEW: Attach the ref and event handlers to the video element */}
            <video
              ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full"
            >
              <source src={ASSETS.videos.incidentVideo} type="video/mp4" />
            </video>
                
                {/* Video Placeholder Area (conditionally rendered or styled to hide when playing) */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 cursor-pointer hover:bg-primary/30 transition-all" onClick={togglePlayback}>
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <div className="text-white space-y-1">
                    <p className="text-slate-200 text-sm">Click the controls below to interact with the reconstruction</p>
                  </div>
                </div>
              </div>
            )}

                 {/* Equipment markers overlay */}
            <div className="absolute top-4 left-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Pump Unit B-23</span>
                </div>
              </div>
            </div>

                 {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Progress Bar */}
              <div className="mb-3">
                <Slider
                  value={[currentTime]}
                  onValueChange={handleSeek} // NEW: Use the seek handler
                  max={duration}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/80 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

                  {/* Control Buttons */}
                   <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2" onClick={togglePlayback}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                      
                      <div className="flex items-center space-x-2 ml-4">
                    <Volume2 className="w-4 h-4 text-white" />
                    <Slider
                      value={[volume]}
                      onValueChange={(vals: number[]) => setVolume(vals[0] ?? 0)}
                      max={100}
                      step={1}
                      className="w-20"
                    />
                  </div>
                </div>

                    <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
                  </div>
                </div>
              </div>
              
              {/* Interactive Control Panels */}
              <div className="mt-6 space-y-4">
                {/* Equipment View */}
                <Collapsible open={equipmentViewOpen} onOpenChange={setEquipmentViewOpen}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between glass-card glass-card-hover border-0 p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">Equipment View</h3>
                          <p className="text-sm text-muted-foreground">Critical equipment status and locations</p>
                        </div>
                      </div>
                      {equipmentViewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1588620598988-9f73e66e8df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZXF1aXBtZW50JTIwcHVtcCUyMGZhY2lsaXR5fGVufDF8fHx8MTc1OTg4OTEyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Pump Equipment"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Pump Unit B-23</h4>
                                <Badge variant="destructive">Critical</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Primary failure point - Bearing degradation detected</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Temperature: 89°C</span>
                                <span className="text-muted-foreground">Pressure: 2.3 bar</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1722580089913-9a8dd0959470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBwaXBlbGluZSUyMHZhbHZlJTIwc3lzdGVtfGVufDF8fHx8MTc1OTg4OTEyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Valve System"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Safety Valve SV-45</h4>
                                <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">Normal</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Operated correctly during incident sequence</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Position: 85% Open</span>
                                <span className="text-muted-foreground">Response: 2.3s</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1738918937796-743064feefa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY29udHJvbCUyMHJvb20lMjBtb25pdG9yaW5nfGVufDF8fHx8MTc1OTgzNjM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Control Panel"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Control Panel CP-12</h4>
                                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Warning</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Delayed alarm acknowledgment</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Response Time: 12s</span>
                                <span className="text-muted-foreground">Operator: J. Smith</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="space-y-3">
                            <h4 className="font-medium flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-accent" />
                              <span>Equipment Timeline</span>
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>00:00 - Normal operation</span>
                                <div className="w-3 h-3 bg-success rounded-full"></div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>00:32 - Vibration detected</span>
                                <div className="w-3 h-3 bg-warning rounded-full"></div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>01:15 - Pump failure</span>
                                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>01:45 - Safety shutdown</span>
                                <div className="w-3 h-3 bg-accent rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Personnel Timeline */}
                <Collapsible open={personnelTimelineOpen} onOpenChange={setPersonnelTimelineOpen}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between glass-card glass-card-hover border-0 p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-info/10 border border-info/30 flex items-center justify-center">
                          <HardHat className="w-5 h-5 text-info" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">Personnel Timeline</h3>
                          <p className="text-sm text-muted-foreground">Staff actions and response times</p>
                        </div>
                      </div>
                      {personnelTimelineOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1759489172749-3ceb9e1eb985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoZWxtZXQlMjB3b3JrZXIlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc1OTg4OTEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Operator"
                              className="w-16 h-16 object-cover rounded-full"
                            />
                            <div className="flex-1 space-y-2">
                              <div>
                                <h4 className="font-medium">John Smith</h4>
                                <p className="text-sm text-muted-foreground">Control Room Operator</p>
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span>First alarm acknowledged:</span>
                                  <span className="font-medium">00:44</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Emergency shutdown initiated:</span>
                                  <span className="font-medium">01:52</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Response rating:</span>
                                  <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">Good</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0">
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start space-x-3">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1759489172749-3ceb9e1eb985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoZWxtZXQlMjB3b3JrZXIlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc1OTg4OTEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                              alt="Maintenance Tech"
                              className="w-16 h-16 object-cover rounded-full"
                            />
                            <div className="flex-1 space-y-2">
                              <div>
                                <h4 className="font-medium">Maria Rodriguez</h4>
                                <p className="text-sm text-muted-foreground">Maintenance Technician</p>
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span>Arrived on scene:</span>
                                  <span className="font-medium">02:15</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Initial assessment:</span>
                                  <span className="font-medium">02:45</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Response rating:</span>
                                  <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">Excellent</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0 md:col-span-2">
                        <CardContent className="p-4 relative z-10">
                          <h4 className="font-medium mb-3 flex items-center space-x-2">
                            <Users className="w-4 h-4 text-info" />
                            <span>Response Team Timeline</span>
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">00:32</span>
                              <div className="w-3 h-3 bg-warning rounded-full"></div>
                              <span className="text-sm">Alarm triggered - J. Smith notified</span>
                            </div>
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">00:44</span>
                              <div className="w-3 h-3 bg-info rounded-full"></div>
                              <span className="text-sm">J. Smith acknowledges alarm, begins assessment</span>
                            </div>
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">01:15</span>
                              <div className="w-3 h-3 bg-destructive rounded-full"></div>
                              <span className="text-sm">Emergency response team called - M. Rodriguez dispatched</span>
                            </div>
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">01:52</span>
                              <div className="w-3 h-3 bg-accent rounded-full"></div>
                              <span className="text-sm">Emergency shutdown initiated by J. Smith</span>
                            </div>
                            <div className="flex items-center space-x-4 p-2 rounded border border-border">
                              <span className="text-sm font-medium w-16">02:15</span>
                              <div className="w-3 h-3 bg-success rounded-full"></div>
                              <span className="text-sm">M. Rodriguez arrives on scene, begins inspection</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Event Sequence */}
                <Collapsible open={eventSequenceOpen} onOpenChange={setEventSequenceOpen}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between glass-card glass-card-hover border-0 p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">Event Sequence</h3>
                          <p className="text-sm text-muted-foreground">Chronological incident progression</p>
                        </div>
                      </div>
                      {eventSequenceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <Card className="glass-card border-0">
                      <CardContent className="p-4 relative z-10">
                        <h4 className="font-medium mb-4 flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>Detailed Event Timeline</span>
                        </h4>
                        <div className="space-y-4">
                          <div className="relative pl-6 pb-4 border-l-2 border-success">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-success rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:00:00</span>
                                <Badge variant="outline" className="bg-success/10 text-success border-success/30">Normal</Badge>
                              </div>
                              <p className="text-sm">Normal operation - All systems functioning within parameters</p>
                              <div className="text-xs text-muted-foreground">
                                Pump B-23: 1800 RPM, Temperature: 65°C, Pressure: 2.1 bar
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6 pb-4 border-l-2 border-warning">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-warning rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:00:32</span>
                                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Warning</Badge>
                              </div>
                              <p className="text-sm">Vibration anomaly detected on Pump B-23 bearing</p>
                              <div className="text-xs text-muted-foreground">
                                Vibration level: 8.2 mm/s (Normal: &lt;5.0 mm/s)
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6 pb-4 border-l-2 border-warning">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-warning rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:00:44</span>
                                <Badge variant="outline" className="bg-info/10 text-info border-info/30">Response</Badge>
                              </div>
                              <p className="text-sm">Operator J. Smith acknowledges alarm, begins system review</p>
                              <div className="text-xs text-muted-foreground">
                                Control room protocol followed, temperature rising to 72°C
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6 pb-4 border-l-2 border-destructive">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-destructive rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:01:15</span>
                                <Badge variant="destructive">Critical</Badge>
                              </div>
                              <p className="text-sm">Pump B-23 bearing failure - Complete mechanical breakdown</p>
                              <div className="text-xs text-muted-foreground">
                                Temperature spike to 89°C, pressure drop to 1.2 bar, emergency response activated
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6 pb-4 border-l-2 border-accent">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-accent rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:01:52</span>
                                <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">Action</Badge>
                              </div>
                              <p className="text-sm">Emergency shutdown initiated - Safety valve SV-45 activated</p>
                              <div className="text-xs text-muted-foreground">
                                System isolated, maintenance team dispatched, area secured
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-6">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-success rounded-full"></div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">00:04:15</span>
                                <Badge variant="outline" className="bg-success/10 text-success border-success/30">Secured</Badge>
                              </div>
                              <p className="text-sm">Area secured, incident contained - No injuries reported</p>
                              <div className="text-xs text-muted-foreground">
                                Investigation initiated, preliminary report filed
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-center space-x-4">
                <Button className="bg-primary hover:bg-primary/90">
                  <Eye className="w-4 h-4 mr-2" />
                  View in AR/VR
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Animation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
                      src={ASSETS.images.predictive}
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
                      src={ASSETS.images.training}
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
            fileName: analysisData.meta.reportName || files[0]?.name || 'Analysis Report',
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
