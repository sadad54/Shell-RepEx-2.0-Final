import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cylinder, Sphere } from '@react-three/drei';
import { motion as m } from 'framer-motion';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, AlertTriangle, Droplets, Users, Clock, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { incidentAnimationScript } from './components/animation-data';

// Mock animation data



type LabelProps = { children: React.ReactNode; position: [number, number, number]; fontSize?: number };
type VesselProps = { position: [number, number, number] };
type CouplingProps = { scale: number; rotation: [number, number, number]; broken: boolean };
type SpillProps = { visible: boolean; intensity: number; position: [number, number, number] };
type PersonnelMarkerProps = { position: [number, number, number]; color: string; label: string };
type WarningLightProps = { active: boolean; position: [number, number, number] };

const Ocean = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeGeometry args={[50, 50]} />
    <meshStandardMaterial color="#0a4f6e" opacity={0.8} transparent />
  </mesh>
);

const Label = ({ children, position, fontSize = 0.4 }: LabelProps) => (
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
      {/* Hull */}
      <Box args={[5, 2, 2.5]} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial color="#2d3436" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Deck */}
      <Box args={[5, 0.3, 2.5]} position={[0, 2.15, 0]} castShadow>
        <meshStandardMaterial color="#636e72" />
      </Box>
      {/* Bridge */}
      <Box args={[1.5, 1.2, 2]} position={[-1.5, 3.1, 0]} castShadow>
        <meshStandardMaterial color="#34495e" />
      </Box>
      {/* Smokestack */}
      <Cylinder args={[0.3, 0.3, 1.5, 16]} position={[-1.5, 4.8, 0.7]} castShadow>
        <meshStandardMaterial color="#e74c3c" />
      </Cylinder>
      {/* Vessel name label */}
      <Label position={[0, 4, 0]} fontSize={0.5}>MT AURORA</Label>
    </group>
  );
};

const Jetty = () => (
  <group position={[8, 0, 0]}>
    {/* Main platform */}
    <Box args={[7, 0.5, 7]} position={[0, 0.25, 0]} castShadow>
      <meshStandardMaterial color="#4a4a4a" metalness={0.3} roughness={0.8} />
    </Box>
    {/* Support pillars */}
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
    {/* Control shelter */}
    <Box args={[3.5, 2.5, 3.5]} position={[0, 1.75, 0]} castShadow>
      <meshStandardMaterial color="#34495e" />
    </Box>
    {/* Equipment boxes */}
    <Box args={[1, 0.8, 1]} position={[-2, 0.9, -2]} castShadow>
      <meshStandardMaterial color="#e67e22" />
    </Box>
    <Box args={[1, 0.8, 1]} position={[2, 0.9, -2]} castShadow>
      <meshStandardMaterial color="#e67e22" />
    </Box>
    {/* Jetty label */}
    <Label position={[0, 3.8, 0]} fontSize={0.5}>JETTY 3</Label>
  </group>
);

const TransferArm = ({ broken, position }: { broken: boolean; position: [number, number, number] }) => {
  const angle = broken ? -0.5 : -0.2;
  
  return (
    <group position={position} rotation={[0, 0, angle]}>
      {/* Main arm */}
      <Cylinder args={[0.18, 0.18, 4, 16]} rotation={[0, 0, Math.PI / 2]} position={[-2, 0, 0]}>
        <meshStandardMaterial 
          color={broken ? "#c0392b" : "#e67e22"} 
          metalness={0.7} 
          roughness={0.3}
        />
      </Cylinder>
      {/* Connection joint */}
      <Sphere args={[0.28, 16, 16]} position={[-4, 0, 0]}>
        <meshStandardMaterial 
          color={broken ? "#7f0000" : "#d35400"} 
          metalness={0.8}
        />
      </Sphere>
      {/* Flexible hose segments */}
      {Array.from({ length: 10 }).map((_, i) => {
        const offset = broken ? i * 0.15 : i * 0.05;
        return (
          <Cylinder
            key={i}
            args={[0.12, 0.12, 0.35, 8]}
            position={[-4 - i * 0.4, -i * offset, 0]}
            rotation={[0, 0, i * (broken ? 0.08 : 0.02)]}
          >
            <meshStandardMaterial color="#2c3e50" roughness={0.7} />
          </Cylinder>
        );
      })}
    </group>
  );
};

const Coupling = ({ scale, rotation, broken }: CouplingProps) => (
  <group position={[2, 1.5, 0]} scale={scale} rotation={rotation}>
    <Cylinder args={[0.35, 0.35, 1.2, 32]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color={broken ? "#e74c3c" : "#f39c12"} 
        metalness={0.8} 
        roughness={0.2}
        emissive={broken ? "#c0392b" : "#000000"}
        emissiveIntensity={broken ? 0.3 : 0}
      />
    </Cylinder>
    {broken && (
      <>
        {/* Crack lines */}
        <Box args={[0.05, 0.05, 1.3]} position={[0.15, 0, 0]} rotation={[Math.PI / 2, 0, 0.3]}>
          <meshStandardMaterial color="#000000" />
        </Box>
        <Box args={[0.05, 0.05, 1.3]} position={[-0.15, 0, 0]} rotation={[Math.PI / 2, 0, -0.3]}>
          <meshStandardMaterial color="#000000" />
        </Box>
      </>
    )}
  </group>
);

const OilSpill = ({ visible, intensity, position }: SpillProps) => {
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
      particles.forEach((particle, i) => {
        const spreadRadius = 1.5 + intensity * 3.5;
        const angle = (i / particles.length) * Math.PI * 2 + state.clock.elapsedTime * particle.speed * 0.08;
        const radius = (Math.sin(state.clock.elapsedTime * particle.speed * 0.5) * 0.5 + 0.5) * spreadRadius;
        
        dummy.position.set(
          position[0] + Math.cos(angle) * radius,
          position[1] + particle.position[1],
          position[2] + Math.sin(angle) * radius
        );
        dummy.scale.setScalar(particle.scale * Math.max(0.3, intensity));
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
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

const ContainmentBoom = ({ deployed }: { deployed: boolean }) => {
  if (!deployed) return null;

  const boomSegments = [];
  for (let i = 0; i <= 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const radius = 5.5;
    boomSegments.push(
      <Cylinder
        key={i}
        args={[0.18, 0.18, 0.6, 8]}
        position={[2 + Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#f39c12" roughness={0.4} />
      </Cylinder>
    );
  }

  return <group>{boomSegments}</group>;
};

const WarningLight = ({ active, position }: WarningLightProps) => {
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

const PersonnelMarker = ({ position, color, label }: PersonnelMarkerProps) => (
  <group position={position}>
    <Cylinder args={[0.3, 0.15, 1.2, 8]} position={[0, 0.6, 0]}>
      <meshStandardMaterial color={color} />
    </Cylinder>
    <Sphere args={[0.25, 16, 16]} position={[0, 1.4, 0]}>
      <meshStandardMaterial color={color} />
    </Sphere>
    <Label position={[0, 2.2, 0]} fontSize={0.3}>{label}</Label>
  </group>
);

// Main Component
export const IncidentAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [vesselPosition, setVesselPosition] = useState<[number, number, number]>([-15, 0, 0]);
  const [couplingScale, setCouplingScale] = useState(1);
  const [couplingRotation, setCouplingRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [couplingBroken, setCouplingBroken] = useState(false);
  const [spillVisible, setSpillVisible] = useState(false);
  const [spillIntensity, setSpillIntensity] = useState(0);
  const [boomDeployed, setBoomDeployed] = useState(false);
  const [warningActive, setWarningActive] = useState(false);
  const [personnelVisible, setPersonnelVisible] = useState<{[key: string]: boolean}>({});
  const [showEquipmentPanel, setShowEquipmentPanel] = useState(false);
  const [showPersonnelPanel, setShowPersonnelPanel] = useState(false);

  const { timeline, metadata, equipment, personnel } = incidentAnimationScript;
  const currentStep = timeline[currentStepIndex];

  const runAnimation = async () => {
    setIsPlaying(true);
    setCurrentStepIndex(0);
    resetAnimation();

    // Step 0: Vessel approaching
    setCurrentStepIndex(0);
    setPersonnelVisible({ vessel: true, terminal: true });
    for (let i = 0; i <= 50; i++) {
      await new Promise(res => setTimeout(res, 80));
      const progress = i / 50;
      setVesselPosition([-15 + progress * 13, 0, 0]);
    }
    await new Promise(res => setTimeout(res, 2000));

    // Step 1: Pressure spike
    setCurrentStepIndex(1);
    setWarningActive(true);
    for (let i = 0; i < 5; i++) {
      setCouplingScale(1.3);
      await new Promise(res => setTimeout(res, 200));
      setCouplingScale(1);
      await new Promise(res => setTimeout(res, 200));
    }
    await new Promise(res => setTimeout(res, 1500));

    // Step 2: Coupling failure & spill
    setCurrentStepIndex(2);
    setCouplingBroken(true);
    setCouplingRotation([0, 0, 0.3]);
    setSpillVisible(true);
    for (let i = 0; i <= 20; i++) {
      await new Promise(res => setTimeout(res, 150));
      setSpillIntensity(i / 20);
    }
    await new Promise(res => setTimeout(res, 2000));

    // Step 3: ESD activated
    setCurrentStepIndex(3);
    setSpillIntensity(0.6);
    await new Promise(res => setTimeout(res, 2500));

    // Step 4: Boom deployment
    setCurrentStepIndex(4);
    setPersonnelVisible(prev => ({ ...prev, emergency: true }));
    setBoomDeployed(true);
    await new Promise(res => setTimeout(res, 2500));

    // Step 5: Contained
    setCurrentStepIndex(5);
    setWarningActive(false);
    setSpillIntensity(0.3);
    await new Promise(res => setTimeout(res, 2000));

    // Step 6-8: Notifications and recovery
    for (let i = 6; i < timeline.length; i++) {
      setCurrentStepIndex(i);
      await new Promise(res => setTimeout(res, 2000));
    }

    setIsPlaying(false);
  };

  const resetAnimation = () => {
    setCurrentStepIndex(0);
    setVesselPosition([-15, 0, 0]);
    setCouplingScale(1);
    setCouplingRotation([0, 0, 0]);
    setCouplingBroken(false);
    setSpillVisible(false);
    setSpillIntensity(0);
    setBoomDeployed(false);
    setWarningActive(false);
    setPersonnelVisible({});
  };

  const handleReset = () => {
    setIsPlaying(false);
    resetAnimation();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      case 'response': return 'bg-blue-500';
      case 'mitigation': return 'bg-purple-500';
      case 'contained': return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 border-b border-gray-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">Incident Reconstruction</h2>
              <p className="text-gray-300 text-black">{metadata.reportId} - {metadata.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={runAnimation}
              disabled={isPlaying}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-black rounded-lg transition-all font-semibold disabled:cursor-not-allowed"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Playing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Play</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-black rounded-lg transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Status */}
      <div className="bg-gray-800/50 p-4 border-b border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-semibold">{currentStep?.label}</span>
                <span className="text-gray-400 text-sm">{currentStep?.timestamp}</span>
              </div>
              <p className="text-gray-300 text-sm">{currentStep?.description}</p>
            </div>
          </div>
          <div className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold text-black ${getStatusColor(currentStep?.status || 'normal')}`}>
            {currentStep?.status?.toUpperCase()}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((currentStepIndex + 1) / timeline.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Step {currentStepIndex + 1} of {timeline.length}</span>
          <span>{metadata.containmentTime} total containment</span>
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
          <Vessel position={vesselPosition} />
          <Jetty />
          <TransferArm broken={couplingBroken} position={[5, 1.5, 0]} />
          <Coupling scale={couplingScale} rotation={couplingRotation} broken={couplingBroken} />
          <OilSpill visible={spillVisible} intensity={spillIntensity} position={[2, 0, 0]} />
          <ContainmentBoom deployed={boomDeployed} />
          <WarningLight active={warningActive} position={[8, 3.5, 2.5]} />
          <WarningLight active={warningActive} position={[8, 3.5, -2.5]} />
          
          {/* Personnel markers */}
          {personnelVisible.vessel && <PersonnelMarker position={[-2, 0, 3]} color="#3498db" label="CREW" />}
          {personnelVisible.terminal && <PersonnelMarker position={[8, 0.6, -3]} color="#e67e22" label="OPERATOR" />}
          {personnelVisible.emergency && (
            <>
              <PersonnelMarker position={[4, 0, 4]} color="#e74c3c" label="ERT" />
              <PersonnelMarker position={[1, 0, -4]} color="#e74c3c" label="ERT" />
            </>
          )}
          
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
          <h3 className="text-white font-semibold mb-2">Legend</h3>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded" />
              <span className="text-gray-300">MT Aurora</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded" />
              <span className="text-gray-300">Transfer System</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded" />
              <span className="text-gray-300">Coupling (Failed)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-black rounded border border-gray-500" />
              <span className="text-gray-300">Oil Spill (320L)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded" />
              <span className="text-gray-300">Containment Boom</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span className="text-gray-300">Vessel Crew</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span className="text-gray-300">Emergency Team</span>
            </div>
          </div>
        </div>

        {/* Incident Info Overlay */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 max-w-xs">
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Date:</span>
              <span className="text-white font-medium">{metadata.incidentDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Severity:</span>
              <span className="text-red-400 font-semibold">{metadata.severity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Spill Volume:</span>
              <span className="text-white font-medium">{metadata.totalSpillVolume}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Recovered:</span>
              <span className="text-green-400 font-medium">{metadata.recoveredVolume}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Injuries:</span>
              <span className="text-green-400 font-medium">{metadata.injuries}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment & Personnel Panels */}
      <div className="p-6 space-y-4 bg-gray-800/30">
        {/* Equipment Panel */}
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowEquipmentPanel(!showEquipmentPanel)}
            className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Wrench className="w-5 h-5 text-orange-400" />
              <div className="text-left">
                <h3 className="text-black font-semibold">Equipment Status</h3>
                <p className="text-gray-400 text-sm">{equipment.length} critical components tracked</p>
              </div>
            </div>
            {showEquipmentPanel ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {showEquipmentPanel && (
            <div className="p-4 bg-gray-900/50 grid grid-cols-1 md:grid-cols-3 gap-4">
              {equipment.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-black font-semibold text-sm">{item.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.status === 'failed' ? 'bg-red-500 text-white' :
                      item.status === 'activated' ? 'bg-blue-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">ID:</span>
                      <span className="text-white font-mono">{item.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-black">{item.location}</span>
                    </div>
                    {item.serviceLife && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Service Life:</span>
                        <span className="text-black">{item.serviceLife}</span>
                      </div>
                    )}
                    {item.actualAge && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Actual Age:</span>
                        <span className="text-red-400 font-semibold">{item.actualAge}</span>
                      </div>
                    )}
                    {item.responseTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response:</span>
                        <span className="text-green-400">{item.responseTime}</span>
                      </div>
                    )}
                    {item.deploymentTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Deployment:</span>
                        <span className="text-blue-400">{item.deploymentTime}</span>
                      </div>
                    )}
                  </div>
                  {item.degradation && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-gray-400 text-xs mb-2">Degradation Analysis:</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Cyclic Fatigue:</span>
                          <span className="text-red-400 font-semibold">{item.degradation.cyclicFatigue}%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Corrosion:</span>
                          <span className="text-orange-400 font-semibold">{item.degradation.corrosionPitting} mm</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Seal Hardening:</span>
                          <span className="text-yellow-400 font-semibold">{item.degradation.sealHardening}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Personnel Panel */}
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowPersonnelPanel(!showPersonnelPanel)}
            className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <h3 className="text-black font-semibold">Personnel Involvement</h3>
                <p className="text-gray-400 text-sm">{personnel.reduce((sum, p) => sum + p.count, 0)} personnel across {personnel.length} teams</p>
              </div>
            </div>
            {showPersonnelPanel ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {showPersonnelPanel && (
            <div className="p-4 bg-gray-900/50 grid grid-cols-1 md:grid-cols-2 gap-4">
              {personnel.map((person) => (
                <div key={person.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{person.name}</h4>
                      <p className="text-gray-400 text-sm">{person.role}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {person.count} {person.count === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs font-semibold mb-2">Actions Taken:</p>
                    {person.actions.map((action, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        <span className="text-gray-300 text-xs">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timeline Summary */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="text-black font-semibold">Complete Timeline</h3>
          </div>
          <div className="space-y-3">
            {timeline.map((event, index) => (
              <div 
                key={index} 
                className={`flex items-start space-x-4 p-3 rounded-lg transition-all ${
                  index === currentStepIndex ? 'bg-blue-500/20 border border-blue-500/40' : 'bg-gray-900/50'
                }`}
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-gray-400 text-xs font-mono">{event.timestamp}</span>
                </div>
                <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${getStatusColor(event.status)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{event.label}</p>
                  <p className="text-gray-400 text-xs mt-1">{event.description}</p>
                  {event.equipment && event.equipment.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.equipment.map((eq, i) => (
                        <span key={i} className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs border border-orange-500/30">
                          {eq}
                        </span>
                      ))}
                    </div>
                  )}
                  {event.personnel && event.personnel.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {event.personnel.map((person, i) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30">
                          {person}
                        </span>
                      ))}
                    </div>
                  )}
                  {event.spillVolume && (
                    <div className="mt-2 flex items-center space-x-2">
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      <span className="text-red-400 text-xs font-semibold">Spill: {event.spillVolume}</span>
                    </div>
                  )}
                  {event.recoveredVolume && (
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-green-400 text-xs font-semibold">Recovered: {event.recoveredVolume}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-800/50 p-6 border-t border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-600/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{metadata.totalSpillVolume}</div>
              <div className="text-gray-400 text-sm">Spilled</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <Droplets className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{metadata.recoveredVolume}</div>
              <div className="text-gray-400 text-sm">Recovered</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{metadata.containmentTime}</div>
              <div className="text-gray-400 text-sm">Containment</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{personnel.reduce((sum, p) => sum + p.count, 0)}</div>
              <div className="text-gray-400 text-sm">Personnel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keep MitigationAnimation separate (placeholder for now)
export const MitigationAnimation = () => {
  return (
    <div className="w-full bg-gray-900 rounded-xl p-6 border border-gray-700 mt-8">
      <p className="text-gray-400 text-center">Mitigation animation will be developed separately</p>
    </div>
  );
};