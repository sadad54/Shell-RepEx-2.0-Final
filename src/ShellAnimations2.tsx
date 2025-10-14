import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cylinder, Sphere, Cone } from '@react-three/drei';
import { motion as m } from 'framer-motion';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Shield, 
  Users, 
  Clock, 
  Droplets,
  PhoneCall,
  Truck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Import the response timeline from animation data
import { mitigationAnimationScript } from './animation-data';

// Type definitions
type LabelProps = { children: React.ReactNode; position: [number, number, number]; fontSize?: number };
type VesselProps = { position: [number, number, number] };
type PersonnelProps = { position: [number, number, number]; color: string; label: string; active: boolean };
type EquipmentProps = { position: [number, number, number]; type: string; active: boolean };
type ContainmentBoomProps = { deployed: boolean; progress: number };
type SpillProps = { visible: boolean; contained: boolean; recoveryProgress: number };
type VacuumTruckProps = { position: [number, number, number]; active: boolean };

// 3D Components
const Ocean = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeGeometry args={[50, 50]} />
    <meshStandardMaterial color="#0a4f6e" opacity={0.8} transparent />
  </mesh>
);

const Label = ({ children, position, fontSize = 0.35 }: LabelProps) => (
  <Text
    position={position}
    fontSize={fontSize}
    color="white"
    anchorX="center"
    anchorY="middle"
    outlineWidth={0.02}
    outlineColor="#000000"
  >
    {children}
  </Text>
);

const Vessel = ({ position }: VesselProps) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Box args={[5, 2, 2.5]} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial color="#2d3436" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[5, 0.3, 2.5]} position={[0, 2.15, 0]} castShadow>
        <meshStandardMaterial color="#636e72" />
      </Box>
      <Box args={[1.5, 1.2, 2]} position={[-1.5, 3.1, 0]} castShadow>
        <meshStandardMaterial color="#34495e" />
      </Box>
      <Cylinder args={[0.3, 0.3, 1.5, 16]} position={[-1.5, 4.8, 0.7]} castShadow>
        <meshStandardMaterial color="#e74c3c" />
      </Cylinder>
      <Label position={[0, 4, 0]} fontSize={0.5}>MT AURORA</Label>
    </group>
  );
};

const Jetty = () => (
  <group position={[8, 0, 0]}>
    <Box args={[7, 0.5, 7]} position={[0, 0.25, 0]} castShadow>
      <meshStandardMaterial color="#4a4a4a" metalness={0.3} roughness={0.8} />
    </Box>
    {[-2.5, 0, 2.5].map((z, i) => (
      <React.Fragment key={i}>
        <Cylinder args={[0.35, 0.35, 3, 16]} position={[-2.5, -1.5, z]}>
          <meshStandardMaterial color="#2c3e50" />
        </Cylinder>
        <Cylinder args={[0.35, 0.35, 3, 16]} position={[2.5, -1.5, z]}>
          <meshStandardMaterial color="#2c3e50" />
        </Cylinder>
      </React.Fragment>
    ))}
    <Box args={[3.5, 2.5, 3.5]} position={[0, 1.75, 0]} castShadow>
      <meshStandardMaterial color="#34495e" />
    </Box>
    <Label position={[0, 3.8, 0]} fontSize={0.5}>JETTY 3</Label>
  </group>
);

const FailedCoupling = () => (
  <group position={[2, 1.5, 0]}>
    <Cylinder args={[0.35, 0.35, 1.2, 32]} rotation={[Math.PI / 2, 0, 0.3]}>
      <meshStandardMaterial 
        color="#e74c3c" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#c0392b"
        emissiveIntensity={0.3}
      />
    </Cylinder>
    <Box args={[0.05, 0.05, 1.3]} position={[0.15, 0, 0]} rotation={[Math.PI / 2, 0, 0.3]}>
      <meshStandardMaterial color="#000000" />
    </Box>
  </group>
);

const ResponsePersonnel = ({ position, color, label, active }: PersonnelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current && active) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  if (!active) return null;

  return (
    <group ref={meshRef} position={position}>
      <Cylinder args={[0.25, 0.15, 1.2, 8]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </Cylinder>
      <Sphere args={[0.22, 16, 16]} position={[0, 1.35, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </Sphere>
      <Label position={[0, 2, 0]} fontSize={0.28}>{label}</Label>
    </group>
  );
};

const ESDButton = ({ position, activated }: { position: [number, number, number]; activated: boolean }) => (
  <group position={position}>
    <Cylinder args={[0.3, 0.3, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color={activated ? "#e74c3c" : "#c0392b"} 
        emissive="#e74c3c"
        emissiveIntensity={activated ? 1.5 : 0.3}
        metalness={0.8}
      />
    </Cylinder>
    {activated && (
      <pointLight position={[0, 0, 0.5]} color="#e74c3c" intensity={3} distance={8} />
    )}
    <Label position={[0, 0.8, 0]} fontSize={0.25}>ESD</Label>
  </group>
);

const ContainmentBoom = ({ deployed, progress }: ContainmentBoomProps) => {
  if (!deployed) return null;

  const segments = Math.floor(24 * progress);
  const boomSegments = [];
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const radius = 5.5;
    boomSegments.push(
      <Cylinder
        key={i}
        args={[0.18, 0.18, 0.6, 8]}
        position={[2 + Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#f39c12" roughness={0.4} emissive="#f39c12" emissiveIntensity={0.3} />
      </Cylinder>
    );
  }

  return <group>{boomSegments}</group>;
};

const OilSpill = ({ visible, contained, recoveryProgress }: SpillProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < 250; i++) {
      const angle = (i / 250) * Math.PI * 2;
      const radius = Math.random() * 4;
      temp.push({
        position: [Math.cos(angle) * radius, Math.random() * 0.2, Math.sin(angle) * radius],
        scale: Math.random() * 0.18 + 0.12,
        speed: Math.random() * 0.3 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (meshRef.current && visible) {
      const activeParticles = Math.floor(particles.length * (1 - recoveryProgress));
      particles.forEach((particle, i) => {
        if (i < activeParticles) {
          const spreadRadius = contained ? 3 : 4.5;
          const angle = (i / particles.length) * Math.PI * 2 + state.clock.elapsedTime * particle.speed * 0.08;
          const radius = (Math.sin(state.clock.elapsedTime * particle.speed * 0.5) * 0.5 + 0.5) * spreadRadius;
          
          dummy.position.set(
            2 + Math.cos(angle) * radius,
            particle.position[1],
            Math.sin(angle) * radius
          );
          dummy.scale.setScalar(particle.scale);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        } else {
          dummy.position.set(0, -10, 0);
          dummy.scale.setScalar(0);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        }
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (!visible) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshStandardMaterial color="#0f0f0f" roughness={0.95} metalness={0.05} />
    </instancedMesh>
  );
};

const VacuumTruck = ({ position, active }: VacuumTruckProps) => {
  if (!active) return null;

  return (
    <group position={position}>
      {/* Truck body */}
      <Box args={[2, 1, 1.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#f39c12" metalness={0.6} />
      </Box>
      {/* Tank */}
      <Cylinder args={[0.5, 0.5, 2, 16]} rotation={[0, 0, Math.PI / 2]} position={[-0.5, 0.5, 0]}>
        <meshStandardMaterial color="#95a5a6" metalness={0.8} />
      </Cylinder>
      {/* Wheels */}
      <Cylinder args={[0.25, 0.25, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} position={[-0.8, 0, 0.6]}>
        <meshStandardMaterial color="#2c3e50" />
      </Cylinder>
      <Cylinder args={[0.25, 0.25, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} position={[-0.8, 0, -0.6]}>
        <meshStandardMaterial color="#2c3e50" />
      </Cylinder>
      <Label position={[0, 1.5, 0]} fontSize={0.25}>VACUUM</Label>
    </group>
  );
};

const WarningLight = ({ active, position }: { active: boolean; position: [number, number, number] }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (lightRef.current && active) {
      lightRef.current.intensity = Math.sin(state.clock.elapsedTime * 4) * 2 + 3;
    }
  });

  if (!active) return null;

  return (
    <group position={position}>
      <pointLight ref={lightRef} color="#e74c3c" intensity={3} distance={15} />
      <Sphere args={[0.25, 16, 16]}>
        <meshStandardMaterial 
          color="#e74c3c" 
          emissive="#e74c3c" 
          emissiveIntensity={2}
        />
      </Sphere>
    </group>
  );
};

// Main Solution Animation Component
export const SolutionAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [esdActivated, setEsdActivated] = useState(false);
  const [operatorActive, setOperatorActive] = useState(false);
  const [vesselCrewActive, setVesselCrewActive] = useState(false);
  const [ertActive, setErtActive] = useState(false);
  const [supervisorActive, setSupervisorActive] = useState(false);
  const [spillVisible, setSpillVisible] = useState(true);
  const [spillContained, setSpillContained] = useState(false);
  const [boomDeployed, setBoomDeployed] = useState(false);
  const [boomProgress, setBoomProgress] = useState(0);
  const [vacuumTruckActive, setVacuumTruckActive] = useState(false);
  const [recoveryProgress, setRecoveryProgress] = useState(0);
  const [warningActive, setWarningActive] = useState(false);
  const [showPersonnelPanel, setShowPersonnelPanel] = useState(false);

  const { emergencyResponse } = mitigationAnimationScript;
  const timeline = emergencyResponse.timeline;
  const currentStep = timeline[currentStepIndex];

  const runSolutionAnimation = async () => {
    setIsPlaying(true);
    resetAnimation();

    // Step 0: Incident detected
    setCurrentStepIndex(0);
    setSpillVisible(true);
    setOperatorActive(true);
    setWarningActive(true);
    await new Promise(res => setTimeout(res, 2500));

    // Step 1: ESD Activated (T+2 minutes)
    setCurrentStepIndex(1);
    setEsdActivated(true);
    await new Promise(res => setTimeout(res, 2500));

    // Step 2: Vessel Isolation (T+3 minutes)
    setCurrentStepIndex(2);
    setVesselCrewActive(true);
    await new Promise(res => setTimeout(res, 2000));

    // Step 3: ERT Mobilized (T+5 minutes)
    setCurrentStepIndex(3);
    setErtActive(true);
    await new Promise(res => setTimeout(res, 2500));

    // Step 4: Boom Deployment Starts (T+7 minutes)
    setCurrentStepIndex(4);
    setBoomDeployed(true);
    for (let i = 0; i <= 20; i++) {
      await new Promise(res => setTimeout(res, 100));
      setBoomProgress(i / 20);
    }
    await new Promise(res => setTimeout(res, 1000));

    // Step 5: Spill Contained (T+12 minutes)
    setCurrentStepIndex(5);
    setSpillContained(true);
    setWarningActive(false);
    await new Promise(res => setTimeout(res, 2500));

    // Step 6: MPA Notification (T+18 minutes)
    setCurrentStepIndex(6);
    setSupervisorActive(true);
    await new Promise(res => setTimeout(res, 2000));

    // Step 7: NEA Notification (T+25 minutes)
    setCurrentStepIndex(7);
    await new Promise(res => setTimeout(res, 2000));

    // Step 8: Vacuum Truck Cleanup (T+45 minutes)
    setCurrentStepIndex(8);
    setVacuumTruckActive(true);
    for (let i = 0; i <= 20; i++) {
      await new Promise(res => setTimeout(res, 150));
      setRecoveryProgress(i / 20);
    }
    await new Promise(res => setTimeout(res, 2000));

    // Step 9: Recovery Complete (T+3.5 hours)
    setCurrentStepIndex(9);
    await new Promise(res => setTimeout(res, 2500));

    setIsPlaying(false);
  };

  const resetAnimation = () => {
    setCurrentStepIndex(0);
    setEsdActivated(false);
    setOperatorActive(false);
    setVesselCrewActive(false);
    setErtActive(false);
    setSupervisorActive(false);
    setSpillVisible(true);
    setSpillContained(false);
    setBoomDeployed(false);
    setBoomProgress(0);
    setVacuumTruckActive(false);
    setRecoveryProgress(0);
    setWarningActive(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    resetAnimation();
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'detected': 'bg-yellow-500',
      'response': 'bg-blue-500',
      'isolation': 'bg-purple-500',
      'mobilization': 'bg-orange-500',
      'containment': 'bg-indigo-500',
      'contained': 'bg-green-500',
      'reporting': 'bg-cyan-500',
      'recovery': 'bg-teal-500',
      'complete': 'bg-emerald-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 p-6 border-b border-gray-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Emergency Response - 3D Reconstruction</h2>
              <p className="text-gray-300 text-sm">How the incident was successfully contained and resolved</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={runSolutionAnimation}
              disabled={isPlaying}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-all font-semibold disabled:cursor-not-allowed"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Playing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Play Solution</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800/50 p-4 border-b border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-semibold">{currentStep?.action}</span>
                <span className="text-gray-400 text-sm">{currentStep?.timestamp}</span>
              </div>
              <p className="text-gray-300 text-sm">{currentStep?.description}</p>
            </div>
          </div>
          <div className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(currentStep?.status || 'detected')}`}>
            {currentStep?.status?.toUpperCase()}
          </div>
        </div>
        
        <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
            style={{ width: `${((currentStepIndex + 1) / timeline.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Step {currentStepIndex + 1} of {timeline.length}</span>
          <span>{emergencyResponse.successMetrics.containmentTime} total containment</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="h-[600px] w-full relative bg-gradient-to-b from-gray-900 to-black">
        <Canvas 
          camera={{ position: [18, 12, 18], fov: 55 }}
          shadows
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[15, 25, 15]} intensity={1.2} castShadow />
          <pointLight position={[-15, 15, -15]} intensity={0.6} color="#4a90e2" />
          <fog attach="fog" args={['#000000', 35, 70]} />
          
          <Ocean />
          <Vessel position={[-2, 0, 0]} />
          <Jetty />
          <FailedCoupling />
          <OilSpill visible={spillVisible} contained={spillContained} recoveryProgress={recoveryProgress} />
          <ContainmentBoom deployed={boomDeployed} progress={boomProgress} />
          
          {/* Personnel */}
          <ResponsePersonnel position={[8, 0.6, -3]} color="#e67e22" label="OPERATOR" active={operatorActive} />
          <ResponsePersonnel position={[-2, 0, 3]} color="#3498db" label="CREW" active={vesselCrewActive} />
          <ResponsePersonnel position={[4, 0, 4]} color="#e74c3c" label="ERT-1" active={ertActive} />
          <ResponsePersonnel position={[1, 0, -4]} color="#e74c3c" label="ERT-2" active={ertActive} />
          <ResponsePersonnel position={[6, 0, -4.5]} color="#9b59b6" label="SUPERVISOR" active={supervisorActive} />
          
          {/* Equipment */}
          <ESDButton position={[8, 1.5, 2]} activated={esdActivated} />
          <VacuumTruck position={[3, 0, -6]} active={vacuumTruckActive} />
          <WarningLight active={warningActive} position={[8, 3.5, 2.5]} />
          <WarningLight active={warningActive} position={[8, 3.5, -2.5]} />
          
          <gridHelper args={[50, 50, '#333333', '#1a1a1a']} position={[0, -0.5, 0]} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={10}
            maxDistance={40}
          />
        </Canvas>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 text-xs">
          <h3 className="text-white font-semibold mb-2">Response Legend</h3>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded" />
              <span className="text-gray-300">Terminal Operator</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span className="text-gray-300">Vessel Crew</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span className="text-gray-300">Emergency Team</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded" />
              <span className="text-gray-300">Supervisor</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded" />
              <span className="text-gray-300">Containment Boom</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded" />
              <span className="text-gray-300">Vacuum Truck</span>
            </div>
          </div>
        </div>

        {/* Response Metrics */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 max-w-xs">
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">ESD Response:</span>
              <span className="text-green-400 font-semibold">2 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Containment:</span>
              <span className="text-green-400 font-semibold">12 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Recovery Rate:</span>
              <span className="text-green-400 font-semibold">87% (280L/320L)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Marine Impact:</span>
              <span className="text-green-400 font-semibold">Zero</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Injuries:</span>
              <span className="text-green-400 font-semibold">Zero</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personnel Actions Panel */}
      <div className="p-6 space-y-4 bg-gray-800/30">
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowPersonnelPanel(!showPersonnelPanel)}
            className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <h3 className="text-white font-semibold">Response Team Actions</h3>
                <p className="text-gray-400 text-sm">Detailed breakdown of personnel actions during response</p>
              </div>
            </div>
            {showPersonnelPanel ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {showPersonnelPanel && (
            <div className="p-4 bg-gray-900/50">
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div 
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-lg transition-all ${
                      index === currentSt