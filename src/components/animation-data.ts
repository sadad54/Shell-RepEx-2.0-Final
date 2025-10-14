/**
 * Enhanced animation data structure for the MT Aurora incident
 * Source: Sample_Incident_Report (1).pdf
 */

export const incidentAnimationScript = {
  // Key entities involved in the incident
  entities: {
    vessel: { 
      name: "MT Aurora", 
      position: [-15, 0, 0],
      crew: 8
    },
    terminal: { 
      name: "Jetty 3, Pulau Bukom", 
      position: [8, 0, 0] 
    },
    coupling: { 
      name: "Viking Johnson Series 27 (Asset HF-3A-027)", 
      position: [0, 1, 0],
      serviceLife: "64 months (exceeded by 4 months)"
    }
  },

  // Personnel involved in the incident
  personnel: [
    {
      id: 1,
      name: "Vessel Crew",
      role: "MT Aurora Operations",
      count: 8,
      actions: ["Initiated discharge", "Observed pressure anomaly", "Emergency stop"]
    },
    {
      id: 2,
      name: "Terminal Operator",
      role: "Jetty 3 Control",
      count: 1,
      actions: ["Monitoring discharge", "Activated ESD", "Coordinated response"]
    },
    {
      id: 3,
      name: "Emergency Response Team",
      role: "Containment & Recovery",
      count: 6,
      actions: ["Deployed containment booms", "Vacuum recovery", "Site cleanup"]
    },
    {
      id: 4,
      name: "Supervisors",
      role: "Incident Command",
      count: 3,
      actions: ["MPA notification", "NEA notification", "Investigation oversight"]
    }
  ],

  // Detailed timeline with timestamps from the incident (14:00 = discharge start)
  timeline: [
    { 
      time: 0, 
      timestamp: "14:00:00",
      label: "Discharge Commenced", 
      event: "start_discharge",
      description: "Oil transfer from MT Aurora to Jetty 3 begins at standard rate",
      equipment: ["Coupling HF-3A-027", "Transfer pumps", "Flow meters"],
      personnel: ["Vessel Crew", "Terminal Operator"],
      status: "normal"
    },
    { 
      time: 1980, 
      timestamp: "14:33:00",
      label: "Abnormal Pressure Reading: 8.2 bar", 
      event: "pressure_spike",
      description: "Pressure exceeds normal operating range (6.5-7.2 bar). Cyclic fatigue evident",
      equipment: ["Coupling HF-3A-027", "Pressure sensors"],
      personnel: ["Terminal Operator"],
      status: "warning"
    },
    { 
      time: 2100, 
      timestamp: "14:35:00",
      label: "Coupling Failure & Spill", 
      event: "spill_start",
      description: "Viking Johnson Series 27 coupling ruptures. Approx. 320L Brent Crude released on jetty apron",
      equipment: ["Coupling HF-3A-027 (FAILED)", "Elastomer seal"],
      personnel: ["Vessel Crew", "Terminal Operator"],
      status: "critical",
      spillVolume: "320L",
      spillLocation: "Jetty apron"
    },
    { 
      time: 2220, 
      timestamp: "14:37:00",
      label: "Emergency Shutdown (ESD) Activated", 
      event: "esd_activated",
      description: "Emergency shutdown system triggered within 2 minutes. Transfer halted immediately",
      equipment: ["ESD valves", "Emergency isolation system"],
      personnel: ["Terminal Operator"],
      status: "response"
    },
    { 
      time: 2520, 
      timestamp: "14:42:00",
      label: "Containment Boom Deployment", 
      event: "boom_deployment",
      description: "Containment booms deployed around spill zone (T+10 minutes)",
      equipment: ["Containment booms", "Barrier systems"],
      personnel: ["Emergency Response Team"],
      status: "mitigation"
    },
    { 
      time: 2820, 
      timestamp: "14:47:00",
      label: "Spill Fully Contained", 
      event: "spill_contained",
      description: "Spill contained within 12 minutes. No marine pollution. Bulk recovery (~280L) initiated",
      equipment: ["Vacuum trucks", "Recovery equipment"],
      personnel: ["Emergency Response Team", "Supervisors"],
      status: "contained",
      recoveredVolume: "~280L"
    },
    {
      time: 4380,
      timestamp: "15:13:00",
      label: "MPA Notified",
      event: "authority_notification",
      description: "Maritime and Port Authority of Singapore notified (T+18 minutes from spill)",
      personnel: ["Supervisors"],
      status: "reporting"
    },
    {
      time: 4800,
      timestamp: "15:20:00",
      label: "NEA Notified",
      event: "authority_notification_2",
      description: "National Environment Agency notified (T+25 minutes from spill)",
      personnel: ["Supervisors"],
      status: "reporting"
    },
    {
      time: 12600,
      timestamp: "17:30:00",
      label: "Bulk Recovery Completed",
      event: "recovery_complete",
      description: "Major recovery operations concluded. Site cleanup continues",
      equipment: ["Vacuum trucks", "Absorbent materials"],
      personnel: ["Emergency Response Team"],
      status: "recovery"
    }
  ],

  // Equipment status tracking
  equipment: [
    {
      id: "HF-3A-027",
      name: "Viking Johnson Series 27 Coupling",
      location: "Transfer line connection point",
      status: "failed",
      serviceLife: "60 months (certified)",
      actualAge: "64 months",
      degradation: {
        cyclicFatigue: 67,
        corrosionPitting: 2.3,
        sealHardening: 85
      }
    },
    {
      id: "ESD-J3",
      name: "Emergency Shutdown System",
      location: "Jetty 3 control room",
      status: "activated",
      responseTime: "2 minutes"
    },
    {
      id: "BOOM-01",
      name: "Containment Boom System",
      location: "Jetty 3 marine area",
      status: "deployed",
      deploymentTime: "10 minutes"
    }
  ],

  // Incident metadata
  metadata: {
    reportId: "INC-2023-0614-PBK-J3",
    incidentDate: "14 June 2023",
    location: "Jetty 3, Pulau Bukom Refinery Terminal, Singapore",
    severity: "HIGH",
    totalSpillVolume: "320L",
    recoveredVolume: "280L",
    containmentTime: "12 minutes",
    totalDuration: "≈3 hours",
    injuries: 0,
    environmentalImpact: "None (fully contained)",
    estimatedCost: "SGD 258,000"
  }
};