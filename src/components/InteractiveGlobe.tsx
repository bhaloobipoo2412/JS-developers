import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const InteractiveGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 210;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Globe group for rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Core Sphere (Dark navy mesh)
    const sphereGeo = new THREE.SphereGeometry(70, 36, 36);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x071126,
      transparent: true,
      opacity: 0.85,
      wireframe: false,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(coreSphere);

    // 2. Wireframe / Latitude Longitude Shell
    const wireframeGeo = new THREE.SphereGeometry(71.5, 24, 24);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00F2FE,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeSphere = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeSphere);

    // 3. Floating Digital Particles
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 72 + Math.random() * 2.5;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Cyan to light blue colors
      particleColors[i * 3] = 0.0;
      particleColors[i * 3 + 1] = 0.95;
      particleColors[i * 3 + 2] = 1.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particlePoints);

    // 4. Coordinates to Vector3 helper
    const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Lahore Location: 31.5204 N, 74.3587 E
    const lahorePos = latLongToVector3(31.52, 74.35, 73);

    // Major Partner / Remote Tech Hubs
    const hubs = [
      { name: 'Dubai', lat: 25.2, lon: 55.27 },
      { name: 'London', lat: 51.5, lon: -0.12 },
      { name: 'San Francisco', lat: 37.77, lon: -122.41 },
      { name: 'Singapore', lat: 1.35, lon: 103.81 },
      { name: 'Tokyo', lat: 35.67, lon: 139.65 },
    ];

    // Lahore Beacon Mesh
    const beaconGeo = new THREE.SphereGeometry(2.8, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00F2FE });
    const lahoreBeacon = new THREE.Mesh(beaconGeo, beaconMat);
    lahoreBeacon.position.copy(lahorePos);
    globeGroup.add(lahoreBeacon);

    // Pulse Ring for Lahore
    const ringGeo = new THREE.RingGeometry(2.5, 4.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00F2FE,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const pulseRing = new THREE.Mesh(ringGeo, ringMat);
    pulseRing.position.copy(lahorePos);
    pulseRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(pulseRing);

    // Curved Flight/Connection Arcs from Lahore to Global Hubs
    hubs.forEach((hub) => {
      const hubPos = latLongToVector3(hub.lat, hub.lon, 73);

      // Hub Marker
      const hubMarker = new THREE.Mesh(
        new THREE.SphereGeometry(1.4, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x38BDF8 })
      );
      hubMarker.position.copy(hubPos);
      globeGroup.add(hubMarker);

      // Arc curve
      const midPoint = new THREE.Vector3().addVectors(lahorePos, hubPos).multiplyScalar(0.5);
      const distance = lahorePos.distanceTo(hubPos);
      midPoint.normalize().multiplyScalar(73 + distance * 0.22); // Arc elevation

      const curve = new THREE.QuadraticBezierCurve3(lahorePos, midPoint, hubPos);
      const points = curve.getPoints(36);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x00F2FE,
        transparent: true,
        opacity: 0.35,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);
    });

    // Outer Tech Orbital Rings
    const orbitRingGeo1 = new THREE.TorusGeometry(95, 0.4, 16, 100);
    const orbitRingMat1 = new THREE.MeshBasicMaterial({
      color: 0x00F2FE,
      transparent: true,
      opacity: 0.25,
    });
    const orbitRing1 = new THREE.Mesh(orbitRingGeo1, orbitRingMat1);
    orbitRing1.rotation.x = Math.PI / 3;
    globeGroup.add(orbitRing1);

    const orbitRingGeo2 = new THREE.TorusGeometry(108, 0.3, 16, 100);
    const orbitRingMat2 = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.15,
    });
    const orbitRing2 = new THREE.Mesh(orbitRingGeo2, orbitRingMat2);
    orbitRing2.rotation.y = Math.PI / 4;
    globeGroup.add(orbitRing2);

    // Orient initially toward Lahore
    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.3;

    // Mouse Drag Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow auto-rotation when not dragging
      if (!isDragging) {
        globeGroup.rotation.y += 0.0025;
      }

      // Pulse Lahore ring
      const scale = 1 + 0.35 * Math.sin(elapsedTime * 3);
      pulseRing.scale.set(scale, scale, 1);
      (pulseRing.material as THREE.MeshBasicMaterial).opacity = 0.7 - 0.3 * Math.sin(elapsedTime * 3);

      // Rotate orbit rings at subtle distinct speeds
      orbitRing1.rotation.z += 0.001;
      orbitRing2.rotation.z -= 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Lahore Tech Hub Floating Tooltip Pin */}
      <div className="absolute top-6 left-6 pointer-events-none z-10">
        <div className="glass-panel px-3.5 py-2 rounded-lg flex items-center gap-2.5 border border-[#00F2FE]/30 shadow-lg shadow-[#00F2FE]/10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FE] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F2FE]"></span>
          </span>
          <div>
            <div className="text-xs font-semibold text-white tracking-wide flex items-center gap-1.5">
              Lahore Hub Active
              <span className="text-[10px] text-[#00F2FE] font-mono">31.52° N</span>
            </div>
            <div className="text-[11px] text-slate-400">
              ASCI Certified Training Center
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Hint */}
      <div className={`absolute bottom-4 right-4 pointer-events-none transition-opacity duration-300 text-[11px] font-mono text-slate-400 glass-panel px-2.5 py-1 rounded border border-slate-700/50 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
        Drag to rotate 3D hub
      </div>
    </div>
  );
};
