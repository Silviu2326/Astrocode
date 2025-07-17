import React, { useEffect, useRef } from 'react';

interface NeuroLinkProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  active?: boolean;
  processing?: boolean;
  color?: 'cyan' | 'magenta' | 'lime';
}

export const NeuroLink: React.FC<NeuroLinkProps> = ({
  from,
  to,
  active = false,
  processing = false,
  color = 'cyan'
}) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (processing && pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      
      const animation = path.animate([
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
      ], {
        duration: 2000,
        iterations: Infinity,
        easing: 'ease-in-out'
      });
      
      return () => animation.cancel();
    }
  }, [processing]);

  // Calcular curva bezier
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const controlX = midX;
  const controlY = midY - Math.abs(to.x - from.x) * 0.3;

  const pathData = `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;

  const colorMap = {
    cyan: 'var(--nn-accent-cyan)',
    magenta: 'var(--nn-accent-magenta)',
    lime: 'var(--nn-accent-lime)'
  };

  return (
    <svg 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <filter id={`glow-${color}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/> 
          </feMerge>
        </filter>
      </defs>
      
      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke={`hsl(${colorMap[color]})`}
        strokeWidth={active ? "3" : "2"}
        opacity={active ? 0.9 : 0.6}
        filter={`url(#glow-${color})`}
        className={processing ? 'animate-neural-flow' : ''}
      />
    </svg>
  );
};