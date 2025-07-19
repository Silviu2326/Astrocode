import React, { useState, useEffect } from 'react';
import { Circle, Square, Triangle, Minus, Plus, Dot } from 'lucide-react';

export default function MinimalistZenTheme() {
  const [breathe, setBreathe] = useState(0);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; time: number }>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBreathe(prev => prev + 1);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      time: 0
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 2000);
  };

  useEffect(() => {
    const rippleTimer = setInterval(() => {
      setRipples(prev => prev.map(ripple => ({ ...ripple, time: ripple.time + 1 })));
    }, 50);

    return () => clearInterval(rippleTimer);
  }, []);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8 relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Zen ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            className="border border-gray-300 rounded-full"
            style={{
              width: `${ripple.time * 4}px`,
              height: `${ripple.time * 4}px`,
              opacity: Math.max(0, 1 - ripple.time * 0.025),
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      ))}
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0,0,0,0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 150px 150px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Zen Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            {/* Breathing circle */}
            <div 
              className="w-32 h-32 border border-gray-300 rounded-full mx-auto mb-8 relative"
              style={{
                transform: `scale(${1 + Math.sin(breathe * 0.05) * 0.1})`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div 
                className="absolute inset-4 border border-gray-200 rounded-full"
                style={{
                  transform: `scale(${1 + Math.sin(breathe * 0.05 + Math.PI) * 0.15})`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <div 
                  className="absolute inset-4 bg-gray-100 rounded-full"
                  style={{
                    transform: `scale(${1 + Math.sin(breathe * 0.05) * 0.2})`,
                    transition: 'transform 0.1s ease-out'
                  }}
                />
              </div>
            </div>
            
            <h1 className="text-6xl font-light text-gray-800 mb-4 tracking-wider">
              ZEN
            </h1>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-4"></div>
            <p className="text-gray-600 font-light text-lg tracking-wide">
              Simplicity • Balance • Harmony
            </p>
          </div>
        </div>

        {/* Main Content - Minimalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Card 1 - Balance */}
          <div className="group">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative overflow-hidden">
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border border-gray-300 rounded-full"></div>
                  <div className="absolute inset-2 border border-gray-200 rounded-full"></div>
                  <div className="absolute inset-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Circle className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
                
                <h3 className="text-xl font-light text-gray-800 text-center mb-4 tracking-wide">
                  Balance
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-px bg-gray-300"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-8 h-px bg-gray-300"></div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-block w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-px bg-gray-300"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-6 h-px bg-gray-300"></div>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm text-center mt-6 font-light">
                  Find equilibrium in simplicity
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 - Focus */}
          <div className="group">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border border-gray-300 rounded-sm transform rotate-45"></div>
                  <div className="absolute inset-2 border border-gray-200 rounded-sm transform rotate-45"></div>
                  <div className="absolute inset-4 bg-gray-100 rounded-sm transform rotate-45 flex items-center justify-center">
                    <Square className="h-4 w-4 text-gray-600 transform -rotate-45" />
                  </div>
                </div>
                
                <h3 className="text-xl font-light text-gray-800 text-center mb-4 tracking-wide">
                  Focus
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }, (_, i) => (
                      <div 
                        key={i}
                        className={`aspect-square border border-gray-200 rounded-sm ${
                          i === 4 ? 'bg-gray-200' : 'bg-gray-50'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-block w-8 h-px bg-gray-400"></div>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm text-center mt-6 font-light">
                  Concentrate on what matters
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 - Flow */}
          <div className="group">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border border-gray-300" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                  <div className="absolute inset-2 border border-gray-200" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                  <div className="absolute inset-4 bg-gray-100 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
                    <Triangle className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
                
                <h3 className="text-xl font-light text-gray-800 text-center mb-4 tracking-wide">
                  Flow
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div 
                        key={i}
                        className="flex-1 h-px bg-gray-300"
                        style={{
                          opacity: 0.3 + (Math.sin(breathe * 0.1 + i * 0.5) + 1) * 0.35,
                          transition: 'opacity 0.3s ease-out'
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div 
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        style={{
                          opacity: 0.3 + (Math.sin(breathe * 0.08 + i * 0.8) + 1) * 0.35,
                          transform: `scale(${0.8 + (Math.sin(breathe * 0.08 + i * 0.8) + 1) * 0.2})`,
                          transition: 'all 0.3s ease-out'
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div 
                        key={i}
                        className="flex-1 h-px bg-gray-300"
                        style={{
                          opacity: 0.3 + (Math.sin(breathe * 0.12 + i * 0.3) + 1) * 0.35,
                          transition: 'opacity 0.3s ease-out'
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm text-center mt-6 font-light">
                  Move with natural rhythm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Meditation Space */}
        <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-light text-gray-800 mb-4 tracking-wider">
                Meditation Space
              </h3>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center">
                <h4 className="text-xl font-light text-gray-700 mb-8 tracking-wide">
                  Breathing Exercise
                </h4>
                
                <div className="relative w-48 h-48 mx-auto mb-8">
                  {/* Breathing visualization */}
                  <div 
                    className="absolute inset-0 border border-gray-300 rounded-full"
                    style={{
                      transform: `scale(${0.8 + Math.sin(breathe * 0.03) * 0.2})`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  />
                  <div 
                    className="absolute inset-8 border border-gray-200 rounded-full"
                    style={{
                      transform: `scale(${0.9 + Math.sin(breathe * 0.03 + Math.PI/2) * 0.1})`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  />
                  <div 
                    className="absolute inset-16 bg-gray-100 rounded-full flex items-center justify-center"
                    style={{
                      transform: `scale(${1 + Math.sin(breathe * 0.03) * 0.15})`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    <span className="text-gray-600 font-light text-sm">
                      {Math.sin(breathe * 0.03) > 0 ? 'Inhale' : 'Exhale'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-4">
                    <Minus className="h-4 w-4 text-gray-400" />
                    <div className="w-24 h-px bg-gray-300"></div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm font-light">
                    Follow the rhythm of your breath
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-light text-gray-700 mb-8 tracking-wide">
                  Mindful Moments
                </h4>
                
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {Array.from({ length: 16 }, (_, i) => (
                    <div 
                      key={i}
                      className="aspect-square border border-gray-200 rounded-sm flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                      style={{
                        opacity: 0.3 + (Math.sin(breathe * 0.02 + i * 0.2) + 1) * 0.35
                      }}
                    >
                      <Dot className="h-3 w-3 text-gray-400" />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div 
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        style={{
                          opacity: 0.4 + (Math.sin(breathe * 0.05 + i * 1.2) + 1) * 0.3
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm font-light">
                    Present moment awareness
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="inline-block">
                <div className="w-32 h-px bg-gray-300 mb-4"></div>
                <p className="text-gray-600 font-light italic">
                  "In the midst of movement and chaos, keep stillness inside of you."
                </p>
                <div className="w-32 h-px bg-gray-300 mt-4 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}