'use client';

import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Configuration
    const particleCount = Math.min(100, Math.floor(width / 15)); // Adaptative count
    const connectionDistance = 150;
    const mouseDistance = 200;

    let mouse = { x: -1000, y: -1000 };

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Handle Mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle Class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        // Brand colors randomized
        const colors = ['rgba(94, 53, 177, ', 'rgba(255, 171, 0, ', 'rgba(255, 255, 255, '];
        this.color = colors[Math.floor(Math.random() * colors.length)]!;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          
          // Gently push away
          const directionX = forceDirectionX * force * 2;
          const directionY = forceDirectionY * force * 2;

          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + '0.5)';
        ctx.fill();
      }
    }

    // Init Particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
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

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      
      // Draw Connections first
      for (let a = 0; a < particles.length; a++) {
        const pA = particles[a];
        if (!pA) continue;
        for (let b = a; b < particles.length; b++) {
          const pB = particles[b];
          if (!pB) continue;
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 116, 139, ${opacity * 0.2})`; // Slate-500 equivalent
            ctx.lineWidth = 1;
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Particles
      particles.forEach(p => {
        if (p) {
          p.update();
          p.draw();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default NeuralBackground;

