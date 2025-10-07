import { Brain, AlertTriangle, Clock, Target, ShieldCheck, Activity, HardHat } from 'lucide-react'

export const mockUploadProgress = {
  status: 'processing',
  steps: [
    { id: 'upload', label: 'Uploading PDF', status: 'complete' },
    { id: 'extract', label: 'Extracting Content', status: 'complete' },
    { id: 'analyze', label: 'Analyzing Incident', status: 'processing' },
    { id: 'generate', label: 'Generating Visualization', status: 'pending' }
  ]
}

export const mockIncidentSummary = {
  metadata: {
    id: "INC-2023-1204",
    reportName: "Near Miss - Potential Dropped Object During Crane Operation",
    date: "2023-12-04",
    location: "Shell Bukom Manufacturing Site, Singapore",
    severity: "High",
    responseTime: "Immediate",
    status: "Under Investigation"
  },
  overview: {
    title: "Near Miss: Potential Dropped Object During Crane Operation",
    description: "During a routine crane operation at Shell Bukom Manufacturing Site, a sling failure occurred while lifting scaffolding materials, resulting in a near-miss incident.",
    rootCause: "Improper sling inspection and maintenance procedures",
    impact: "Potential for serious injury and equipment damage"
  },
  keyFindings: [
    "Pre-use inspection failed to detect wear signs on sling",
    "Load weight was within safe working load limits",
    "All personnel were in designated safe zones",
    "Emergency stop was activated immediately",
    "No injuries or equipment damage occurred",
    "Maintenance records showed overdue inspection"
  ],
  recommendations: [
    "Implement enhanced sling inspection protocol with digital verification",
    "Conduct refresher training for crane operators and riggers",
    "Review and update lifting equipment maintenance schedules",
    "Install additional safety barriers in crane operation zones",
    "Implement real-time load monitoring system",
    "Update emergency response procedures"
  ],
  timeline: [
    { time: "09:00", event: "Pre-use inspection conducted" },
    { time: "09:15", event: "Crane operation commenced" },
    { time: "09:25", event: "Sling failure observed" },
    { time: "09:26", event: "Emergency stop activated" },
    { time: "09:30", event: "Area secured and incident reported" }
  ],
  riskMetrics: {
    severity: 85,
    likelihood: 65,
    riskScore: 75,
    trend: "+5%"
  }
}

export const mockAnimationSpec = {
  incident: {
    title: "Incident Scenario",
    scenes: [
      {
        timeCode: "00:00",
        description: "Wide shot of crane operation area at Shell Bukom site",
        prompt: "Industrial crane at oil refinery terminal, daytime, clear visibility, Shell branding visible"
      },
      {
        timeCode: "00:05",
        description: "Close-up of crane lifting scaffolding materials",
        prompt: "Close-up view of industrial crane hook and sling attachment point with scaffolding materials"
      },
      {
        timeCode: "00:10",
        description: "Sling failure moment",
        prompt: "Slow-motion visualization of industrial sling showing signs of stress and beginning to fail"
      },
      {
        timeCode: "00:15",
        description: "Emergency response activation",
        prompt: "Quick cut to crane operator activating emergency stop and warning signals"
      }
    ],
    videoPlaceholder: "/assets/incident-simulation.mp4",
    duration: 30
  },
  prevention: {
    title: "Prevention Measures",
    scenes: [
      {
        timeCode: "00:00",
        description: "Enhanced inspection procedure demonstration",
        prompt: "Detailed visualization of proper sling inspection points and procedures"
      },
      {
        timeCode: "00:08",
        description: "Digital verification system",
        prompt: "Worker using tablet/device to record inspection results with checkpoints"
      },
      {
        timeCode: "00:15",
        description: "Real-time monitoring system",
        prompt: "Split screen showing crane operation and digital monitoring dashboard"
      },
      {
        timeCode: "00:22",
        description: "Emergency response improvements",
        prompt: "Visualization of new safety barriers and emergency stop system upgrades"
      }
    ],
    videoPlaceholder: "/assets/prevention-measures.mp4",
    duration: 30
  }
}

export const mockInsights = [
  {
    id: 1,
    title: "Safety Protocol Adherence",
    description: "Emergency procedures followed correctly",
    icon: ShieldCheck,
    trend: "improving"
  },
  {
    id: 2,
    title: "Equipment Inspection",
    description: "Maintenance schedule requires update",
    icon: AlertTriangle,
    trend: "needs attention"
  },
  {
    id: 3,
    title: "Response Time",
    description: "1-minute activation of emergency stop",
    icon: Clock,
    trend: "improving"
  },
  {
    id: 4,
    title: "Risk Assessment",
    description: "75% probability of prevention with new measures",
    icon: Brain,
    trend: "stable"
  }
]

export const mockConclusion = {
  summary: "The near-miss incident highlighted critical areas for improvement in equipment inspection and maintenance protocols. While emergency response procedures were executed effectively, preventing any injuries or damage, the incident reveals the need for enhanced preventive measures. The implementation of digital verification systems and real-time monitoring will significantly reduce the risk of similar incidents.",
  impactAssessment: "Implementation of recommended measures is expected to reduce similar incident risks by 75% and improve overall safety compliance by 40%.",
  nextSteps: [
    "Immediate implementation of enhanced inspection protocols",
    "Schedule comprehensive staff training sessions",
    "Install digital monitoring systems within 30 days",
    "Review and update all related safety procedures"
  ]
}
