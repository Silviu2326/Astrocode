import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NeuroNodeProps {
  id: string;
  label: string;
  type: 'project' | 'task' | 'agent';
  active?: boolean;
  processing?: boolean;
  position?: { x: number; y: number };
  onConnect?: (nodeId: string) => void;
  className?: string;
}

export const NeuroNode: React.FC<NeuroNodeProps> = ({
  id,
  label,
  type,
  active = false,
  processing = false,
  position = { x: 0, y: 0 },
  onConnect,
  className
}) => {
  const [pulseIntensity, setPulseIntensity] = useState(0);

  useEffect(() => {
    if (processing) {
      const interval = setInterval(() => {
        setPulseIntensity(prev => (prev + 1) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [processing]);

  const typeColors = {
    project: 'nn-cyan',
    task: 'nn-mag', 
    agent: 'nn-lime'
  };

  const typeIcons = {
    project: '🧠',
    task: '⚡',
    agent: '🤖'
  };

  return (
    <div
      className={cn(
        'relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer',
        'glass border-2 transition-all duration-300',
        active && 'animate-brain-pulse',
        processing && 'animate-pulse-neon',
        `border-${typeColors[type]}/60 bg-${typeColors[type]}/10`,
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        boxShadow: processing 
          ? `0 0 ${8 + pulseIntensity/5}px hsl(var(--nn-accent-${typeColors[type].split('-')[1]}) / ${0.6 + pulseIntensity/200})`
          : undefined
      }}
      onClick={() => onConnect?.(id)}
    >
      {/* Halo animado */}
      <div 
        className={cn(
          'absolute inset-0 rounded-full border-2 opacity-50',
          `border-${typeColors[type]}`,
          processing && 'animate-ping'
        )}
      />
      
      {/* Icono del nodo */}
      <span className="text-2xl relative z-10">
        {typeIcons[type]}
      </span>
      
      {/* Label */}
      <div className={cn(
        'absolute -bottom-8 left-1/2 transform -translate-x-1/2',
        'text-xs text-nn-text-soft whitespace-nowrap'
      )}>
        {label}
      </div>
    </div>
  );
};