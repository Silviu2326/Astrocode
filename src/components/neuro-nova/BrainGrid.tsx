import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface BrainGridProps {
  width?: number;
  height?: number;
  particleCount?: number;
  activeNode?: { x: number; y: number };
}

export const BrainGrid: React.FC<BrainGridProps> = ({
  width = 800,
  height = 600,
  particleCount = 50,
  activeNode
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Particle[]>([]);

  // Inicializar partículas
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100,
        maxLife: 100
      });
    }
    setParticles(newParticles);
  }, [width, height, particleCount]);

  // Animación del canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.fillStyle = 'rgba(16, 20, 32, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Actualizar y dibujar partículas
      particles.forEach((particle, index) => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 1;

        // Rebote en bordes
        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;

        // Reiniciar partícula si muere
        if (particle.life >= particle.maxLife) {
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.life = 0;
        }

        // Dibujar partícula
        const alpha = 1 - (particle.life / particle.maxLife);
        ctx.fillStyle = `hsla(185, 100%, 63%, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Conectar partículas cercanas
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const alpha = (100 - distance) / 100 * 0.3;
            ctx.strokeStyle = `hsla(185, 100%, 63%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Efecto de onda desde nodo activo
      if (activeNode) {
        const time = Date.now() * 0.005;
        const radius = (Math.sin(time) + 1) * 50 + 20;
        
        ctx.strokeStyle = `hsla(185, 100%, 63%, ${0.6 - radius/100})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(activeNode.x, activeNode.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, activeNode, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};