'use client';

import React, { useEffect, useRef } from 'react';

const WorldGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let globeRadius = Math.min(width, height) * 0.4;
    
    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      globeRadius = Math.min(width, height) * 0.4;
    };
    window.addEventListener('resize', handleResize);

    // Globe properties
    const dots: {x: number, y: number, z: number, size: number}[] = [];
    const DOT_COUNT = 400;
    let rotation = 0;

    // Initialize dots on a sphere
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
      
      const x = globeRadius * Math.cos(theta) * Math.sin(phi);
      const y = globeRadius * Math.sin(theta) * Math.sin(phi);
      const z = globeRadius * Math.cos(phi);
      
      dots.push({ x, y, z, size: Math.random() * 1.5 + 0.5 });
    }

    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      
      rotation += 0.002;
      
      // Sort dots by Z depth for correct occlusion
      const projectedDots = dots.map(dot => {
        // Rotate around Y axis
        const xRot = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
        const zRot = dot.z * Math.cos(rotation) + dot.x * Math.sin(rotation);
        
        // Simple 3D projection
        const scale = 300 / (300 + zRot); 
        const x2d = xRot * scale + width / 2;
        const y2d = dot.y * scale + height / 2;
        
        return { x: x2d, y: y2d, z: zRot, size: dot.size * scale, alpha: scale };
      }).sort((a, b) => a.z - b.z);

      // Draw dots
      projectedDots.forEach(dot => {
        const alpha = (dot.alpha - 0.5) * 2; // Fade out back dots
        if (alpha < 0) return;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        
        // Dynamic Color based on depth
        if (dot.z > 50) {
           ctx.fillStyle = `rgba(0, 243, 255, ${alpha})`; // Cyan for front
        } else {
           ctx.fillStyle = `rgba(94, 53, 177, ${alpha})`; // Purple for sides
        }
        
        ctx.fill();
        
        // Add connecting lines for "Network" effect (close dots only)
        // Optimization: only draw lines for a subset to save FPS
        if (Math.random() > 0.98) {
           ctx.beginPath();
           ctx.moveTo(width/2, height/2); // Connect to core? No, let's just draw random connections
           ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.1})`;
           ctx.lineWidth = 0.5;
           ctx.stroke();
        }
      });

      // Draw Outer Glow Ring
      const gradient = ctx.createRadialGradient(width/2, height/2, globeRadius * 0.8, width/2, height/2, globeRadius * 1.2);
      gradient.addColorStop(0, 'rgba(94, 53, 177, 0)');
      gradient.addColorStop(1, 'rgba(0, 243, 255, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full bg-transparent cursor-grab active:cursor-grabbing"
    />
  );
};

export default WorldGlobe;

