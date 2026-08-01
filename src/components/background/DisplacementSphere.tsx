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

// Breakpoints matching original portfolio style tokens
const media = {
  tablet: 1040,
  mobile: 696,
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
  const lightsRef = useRef<(DirectionalLight | AmbientLight)[]>([]);
  const uniformsRef = useRef<{ [uniform: string]: IUniform } | undefined>(undefined);
  const materialRef = useRef<MeshPhongMaterial | null>(null);
  const geometryRef = useRef<SphereGeometry | null>(null);
  const sphereRef = useRef<Mesh | null>(null);

  const rotationX = useSpring(0, springConfig);
  const rotationY = useSpring(0, springConfig);

  // Initialize WebGL Scene, Camera, Geometry, and Renderer
  useEffect(() => {
    if (!canvasRef.current) return;
    const { innerWidth, innerHeight } = window;

    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(1);
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

    if (innerWidth <= media.mobile) {
      sphere.position.x = 14;
      sphere.position.y = 10;
    } else if (innerWidth <= media.tablet) {
      sphere.position.x = 18;
      sphere.position.y = 14;
    } else {
      sphere.position.x = 22;
      sphere.position.y = 16;
    }

    sphereRef.current = sphere;
    scene.add(sphere);

    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Update lights 1-to-1 on theme change
  useEffect(() => {
    if (!sceneRef.current) return;

    // Remove existing lights
    lightsRef.current.forEach((light) => {
      sceneRef.current?.remove(light);
      light.dispose();
    });

    const dirLight = new DirectionalLight(0xffffff, theme === 'light' ? 1.8 : 2.0);
    const ambientLight = new AmbientLight(0xffffff, theme === 'light' ? 2.7 : 0.4);

    dirLight.position.set(100, 100, 200);

    lightsRef.current = [dirLight, ambientLight];
    lightsRef.current.forEach((light) => sceneRef.current?.add(light));

    return () => {
      lightsRef.current.forEach((light) => {
        sceneRef.current?.remove(light);
        light.dispose();
      });
    };
  }, [theme]);

  // Window resize handler matching original sizing logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (rendererRef.current && cameraRef.current && sphereRef.current) {
        const adjustedHeight = height + height * 0.3;
        rendererRef.current.setSize(width, adjustedHeight);
        cameraRef.current.aspect = width / adjustedHeight;
        cameraRef.current.updateProjectionMatrix();

        if (width <= media.mobile) {
          sphereRef.current.position.x = 14;
          sphereRef.current.position.y = 10;
        } else if (width <= media.tablet) {
          sphereRef.current.position.x = 18;
          sphereRef.current.position.y = 14;
        } else {
          sphereRef.current.position.x = 22;
          sphereRef.current.position.y = 16;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };

      rotationX.set((position.y / 2) * 1.5);
      rotationY.set((position.x / 2) * 1.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rotationX, rotationY]);

  // Render loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

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

    return () => cancelAnimationFrame(animationId);
  }, [rotationX, rotationY]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
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
