import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

export default function ProHero() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // === Setup Scene ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // === Particles ===
    const geometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: "#00f0ff", size: 0.05 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // === Animation Loop ===
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      points.rotation.y += 0.0009;
      points.rotation.x += 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    // === Resize Handler (debounced) ===
    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    let resizeTimeout;
    window.addEventListener("resize", debouncedResize);

    // === Cleanup ===
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", debouncedResize);
      geometry.dispose();
      material.dispose();
      scene.remove(points);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(#00f0ff33_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-white leading-tight font-[Orbitron]"
        >
          ACCESS THE WHALE NETWORK
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mt-4 text-sm md:text-lg text-[#00f0ff]/80 font-[Sora]"
        >
          Join 428 institutions tracking $1.2B daily flow
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#auth"
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-6 py-3 bg-[#00f0ff] text-black rounded-full font-semibold shadow-lg hover:shadow-[#00f0ff]/60 transition-all duration-300"
        >
          Upgrade to Pro
        </motion.a>
      </div>
    </div>
  );
}
