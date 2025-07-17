import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface HoloPanelProps {
  children: React.ReactNode;
  className?: string;
  busy?: boolean;
  progress?: number;
  glowColor?: 'cyan' | 'magenta' | 'lime';
}

export const HoloPanel: React.FC<HoloPanelProps> = ({
  children,
  className,
  busy = false,
  progress = 0,
  glowColor = 'cyan'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const glowClasses = {
    cyan: 'ring-neon-cyan',
    magenta: 'ring-neon-mag',
    lime: 'ring-neon-lime'
  };

  return (
    <div
      className={cn(
        'relative glass rounded-nn p-6 transition-all duration-300',
        isHovered && 'animate-pulse-neon',
        isHovered && glowClasses[glowColor],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Marca neón en esquina */}
      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-nn-${glowColor} shadow-neon-${glowColor}`} />
      
      {/* Barra de progreso líquida */}
      {busy && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-nn-glass/20 rounded-t-nn overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-nn-${glowColor}/60 to-nn-${glowColor} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flow-lines" />
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};