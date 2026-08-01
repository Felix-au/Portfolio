import React, { useEffect, useRef } from 'react';
import { useSpring, motion } from 'framer-motion';
import {
  AmbientLight,
  DirectionalLight,
  LinearSRGBColorSpace,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  UniformsUtils,
  WebGLRenderer,
} from 'three';
import type { IUniform } from 'three';
import { useTheme } from '../../context/ThemeContext';
import vertexShader from './displacement-sphere-vertex.glsl?raw';
import fragmentShader from './displacement-sphere-fragment.glsl?raw';

const springConfig = {
  stiffness: 30,
  damping: 20,
  mass: 2,
};

interface DisplacementSphereProps {
  isVisible?: boolean;
}

export const DisplacementSphere: React.FC<DisplacementSphereProps> = ({ isVisible = true }) => {
  const { theme } = useTheme();
  const startRef = useRef(Date.now());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const dirLightRef = useRef<DirectionalLight | null>(null);
  const ambientLightRef = useRef<AmbientLight | null>(null);
  const uniformsRef = useRef<{ [uniform: string]: IUniform } | undefined>(undefined);
  const materialRef = useRef<MeshPhongMaterial | null>(null);
  const geometryRef = useRef<SphereGeometry | null>(null);
  const sphereRef = useRef<Mesh | null>(null);

  const rotationX = useSpring(0, springConfig);
  const rotationY = useSpring(0, springConfig);

  // Update light intensity dynamically on theme change
  useEffect(() => {
    if (dirLightRef.current) {
      dirLightRef.current.intensity = theme === 'light' ? 1.8 : 2.0;
    }
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = theme === 'light' ? 2.7 : 0.4;
    }
  }, [theme]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const { innerWidth, innerHeight } = window;

    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = LinearSRGBColorSpace;
    rendererRef.current = renderer;

    const camera = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 52;
    cameraRef.current = camera;

    const scene = new Scene();
    sceneRef.current = scene;

    const material = new MeshPhongMaterial();
    material.onBeforeCompile = (shader) => {
      uniformsRef.current = UniformsUtils.merge([
        shader.uniforms,
        { time: { value: 0 } },
      ]);
      shader.uniforms = uniformsRef.current;
      shader.vertexShader = vertexShader;
      shader.fragmentShader = fragmentShader;
    };
    materialRef.current = material;

    const geometry = new SphereGeometry(32, 128, 128);
    geometryRef.current = geometry;

    const sphere = new Mesh(geometry, material);
    sphere.position.z = 0;
    const initialY = innerWidth <= 768 ? 10 : 16;
    sphere.position.x = innerWidth <= 768 ? 14 : 22;
    sphere.position.y = initialY;
    sphereRef.current = sphere;
    scene.add(sphere);

    const dirLight = new DirectionalLight(0xffffff, theme === 'light' ? 1.8 : 2.0);
    dirLight.position.set(100, 100, 200);
    dirLightRef.current = dirLight;

    const ambientLight = new AmbientLight(0xffffff, theme === 'light' ? 2.7 : 0.4);
    ambientLightRef.current = ambientLight;

    scene.add(dirLight);
    scene.add(ambientLight);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (uniformsRef.current) {
        uniformsRef.current.time.value = 0.00005 * (Date.now() - startRef.current);
      }

      if (sphereRef.current) {
        sphereRef.current.rotation.z += 0.001;
        sphereRef.current.rotation.x = rotationX.get();
        sphereRef.current.rotation.y = rotationY.get();
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (rendererRef.current && cameraRef.current && sphereRef.current) {
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();

        if (width <= 768) {
          sphereRef.current.position.x = 14;
          sphereRef.current.position.y = 10;
        } else {
          sphereRef.current.position.x = 22;
          sphereRef.current.position.y = 16;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pos = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      rotationX.set(pos.y / 2);
      rotationY.set(pos.x / 2);
    };

    const handleScroll = () => {
      if (sphereRef.current) {
        const baseY = window.innerWidth <= 768 ? 10 : 16;
        sphereRef.current.position.y = baseY + window.scrollY * 0.008;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);

      if (geometryRef.current) geometryRef.current.dispose();
      if (materialRef.current) materialRef.current.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [rotationX, rotationY, theme]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 0.85 : 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
