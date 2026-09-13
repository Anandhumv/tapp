"use client";
import React, { useEffect, useRef } from 'react';

// Utility functions for random values
const rand = (min, max) => Math.random() * (max - min) + min;

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const setSize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    // ----- Configuration -----
    const config = {
      // Base color dark onyx
      baseColor: '#0a0c10',
      // Grid
      grid: {
        points: 120,
        radius: 2,
        color: '#00ffff', // cyan
        lineColor: 'rgba(0,255,255,0.12)',
        pulseSpeed: 0.02,
      },
      // Particles
      particles: {
        count: 40,
        color: '#c9a978', // gold/amber
        radius: 1.5,
        speed: 0.4,
      },
      // Ribbons (glassmorphic)
      ribbons: {
        count: 6,
        width: 120,
        height: 30,
        color: 'rgba(255,255,255,0.07)',
        speed: 0.3,
      },
    };

    // Generate grid points
    const points = [];
    for (let i = 0; i < config.grid.points; i++) {
      points.push({
        x: rand(0, canvas.width / dpr),
        y: rand(0, canvas.height / dpr),
        phase: rand(0, Math.PI * 2),
      });
    }

    // Particles
    const particles = [];
    for (let i = 0; i < config.particles.count; i++) {
      particles.push({
        x: rand(0, canvas.width / dpr),
        y: rand(0, canvas.height / dpr),
        vx: rand(-1, 1) * config.particles.speed,
        vy: rand(-1, 1) * config.particles.speed,
        phase: rand(0, Math.PI * 2),
      });
    }

    // Ribbons (simple moving rectangles with blur)
    const ribbons = [];
    for (let i = 0; i < config.ribbons.count; i++) {
      ribbons.push({
        x: rand(0, canvas.width / dpr),
        y: rand(0, canvas.height / dpr),
        vx: rand(-1, 1) * config.ribbons.speed,
        vy: rand(-1, 1) * config.ribbons.speed,
      });
    }

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Fill base background
      ctx.fillStyle = config.baseColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid connections (simple nearest neighbor lines)
      ctx.strokeStyle = config.grid.lineColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        // animate pulse by moving radius
        const pulse = Math.sin(p1.phase + performance.now() * 0.001 * config.grid.pulseSpeed) * 3;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, config.grid.radius + pulse, 0, Math.PI * 2);
        ctx.fillStyle = config.grid.color;
        ctx.fill();
        // connect to a few nearest points
        for (let j = i + 1; j < points.length && j < i + 4; j++) {
          const p2 = points[j];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        // wrap
        if (p.x < 0) p.x = canvas.width / dpr;
        if (p.x > canvas.width / dpr) p.x = 0;
        if (p.y < 0) p.y = canvas.height / dpr;
        if (p.y > canvas.height / dpr) p.y = 0;
        const glow = Math.sin(p.phase + performance.now() * 0.004) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, config.particles.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,120,${glow})`;
        ctx.fill();
      });

      // Draw ribbons with blur effect
      ctx.globalAlpha = 0.6;
      ribbons.forEach(r => {
        r.x += r.vx;
        r.y += r.vy;
        if (r.x < -config.ribbons.width) r.x = canvas.width / dpr;
        if (r.x > canvas.width / dpr + config.ribbons.width) r.x = -config.ribbons.width;
        if (r.y < -config.ribbons.height) r.y = canvas.height / dpr;
        if (r.y > canvas.height / dpr + config.ribbons.height) r.y = -config.ribbons.height;
        ctx.fillStyle = config.ribbons.color;
        ctx.fillRect(r.x, r.y, config.ribbons.width, config.ribbons.height);
      });
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

export default BackgroundCanvas;
