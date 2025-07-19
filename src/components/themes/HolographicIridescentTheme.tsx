import React, { useState, useEffect } from 'react';
import { Zap, Sparkles, Eye, Triangle, Rainbow, Gem } from 'lucide-react';

export default function HolographicIridescentTheme() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black p-8 relative overflow-hidden">
      {/* Holographic background layers */}
      <div className="absolute inset-0">
        {/* Base holographic gradient */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(255,0,255,0.3) 0%, 
                rgba(0,255,255,0.3) 25%, 
                rgba(255,255,0,0.3) 50%, 
                rgba(255,0,0,0.3) 75%, 
                transparent 100%
              ),
              linear-gradient(45deg, 
                rgba(138,43,226,0.2) 0%, 
                rgba(0,191,255,0.2) 25%, 
                rgba(50,205,50,0.2) 50%, 
                rgba(255,20,147,0.2) 75%, 
                rgba(255,165,0,0.2) 100%
              )
            `
          }}
        />
        
        {/* Animated iridescent waves */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-full h-full opacity-30"
              style={{
                background: `linear-gradient(${45 + i * 45 + time * 2}deg, 
                  transparent 0%, 
                  rgba(255,0,255,0.3) 20%, 
                  rgba(0,255,255,0.3) 40%, 
                  rgba(255,255,0,0.3) 60%, 
                  rgba(255,0,0,0.3) 80%, 
                  transparent 100%
                )`,
                transform: `translateY(${Math.sin(time * 0.1 + i) * 20}px) rotate(${time * 0.5 + i * 10}deg)`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
        
        {/* Prismatic light rays */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-full opacity-40"
              style={{
                left: `${(i * 8.33) + Math.sin(time * 0.1 + i) * 5}%`,
                background: `linear-gradient(to bottom, 
                  transparent 0%, 
                  hsl(${i * 30 + time * 5}, 100%, 50%) 30%, 
                  hsl(${i * 30 + time * 5 + 60}, 100%, 50%) 70%, 
                  transparent 100%
                )`,
                transform: `rotate(${Math.sin(time * 0.05 + i) * 10}deg)`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating holographic particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${(time * 10 + i * 12) % 360}, 100%, 70%)`,
              boxShadow: `0 0 10px hsl(${(time * 10 + i * 12) % 360}, 100%, 70%)`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Holographic Header */}
        <div className="relative mb-8 p-8 rounded-2xl overflow-hidden">
          {/* Header background with iridescent effect */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255,0,255,0.3) 0%, 
                  rgba(0,255,255,0.3) 25%, 
                  rgba(255,255,0,0.3) 50%, 
                  rgba(255,0,0,0.3) 75%, 
                  rgba(138,43,226,0.3) 100%
                )
              `,
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          />
          
          {/* Holographic border effect */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(${time * 3}deg, 
                transparent 0%, 
                rgba(255,0,255,0.8) 25%, 
                rgba(0,255,255,0.8) 50%, 
                rgba(255,255,0,0.8) 75%, 
                transparent 100%
              )`,
              padding: '2px',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor'
            }}
          />
          
          <div className="relative z-10">
            <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(${time * 2}deg, 
                    #ff00ff 0%, 
                    #00ffff 25%, 
                    #ffff00 50%, 
                    #ff0000 75%, 
                    #8a2be2 100%
                  )`,
                  filter: 'drop-shadow(0 0 20px rgba(255,0,255,0.5))'
                }}>
              Holographic
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: `hsl(${(time * 5 + i * 72) % 360}, 100%, 60%)`,
                      boxShadow: `0 0 15px hsl(${(time * 5 + i * 72) % 360}, 100%, 60%)`,
                      animation: `pulse ${1 + i * 0.2}s ease-in-out infinite alternate`
                    }}
                  />
                ))}
              </div>
              <p className="text-white text-xl font-light">Iridescent • Prismatic • Dimensional</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Spectrum Analyzer */}
          <div className="relative group">
            <div 
              className="absolute inset-0 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(${time * 2}deg, 
                  rgba(255,0,255,0.4) 0%, 
                  rgba(0,255,255,0.4) 50%, 
                  rgba(255,255,0,0.4) 100%
                )`,
                filter: 'blur(10px)'
              }}
            />
            <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(45deg, 
                        rgba(255,0,255,0.6) 0%, 
                        rgba(0,255,255,0.6) 50%, 
                        rgba(255,255,0,0.6) 100%
                      )`
                    }}
                  />
                  <Triangle className="h-8 w-8 text-white relative z-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Spectrum</h3>
                  <p className="text-gray-300">Light Analysis</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: `hsl(${i * 60}, 100%, 60%)`,
                        boxShadow: `0 0 10px hsl(${i * 60}, 100%, 60%)`
                      }}
                    />
                    <div className="flex-1 bg-black/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.sin(time * 0.1 + i) * 30 + 50}%`,
                          background: `linear-gradient(to right, 
                            hsl(${i * 60}, 100%, 40%), 
                            hsl(${i * 60}, 100%, 70%)
                          )`,
                          boxShadow: `0 0 10px hsl(${i * 60}, 100%, 60%)`
                        }}
                      />
                    </div>
                    <span className="text-white text-sm font-mono">
                      {Math.round(Math.sin(time * 0.1 + i) * 30 + 50)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 - Holographic Display */}
          <div className="relative group">
            <div 
              className="absolute inset-0 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(${time * -1.5}deg, 
                  rgba(0,255,255,0.4) 0%, 
                  rgba(255,0,255,0.4) 50%, 
                  rgba(255,255,0,0.4) 100%
                )`,
                filter: 'blur(10px)'
              }}
            />
            <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(0,255,255,0.6) 0%, 
                        rgba(255,0,255,0.6) 50%, 
                        rgba(255,255,0,0.6) 100%
                      )`
                    }}
                  />
                  <Eye className="h-8 w-8 text-white relative z-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Hologram</h3>
                  <p className="text-gray-300">3D Projection</p>
                </div>
              </div>
              
              <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(circle at 50% 50%, 
                        rgba(255,0,255,0.3) 0%, 
                        rgba(0,255,255,0.3) 30%, 
                        rgba(255,255,0,0.3) 60%, 
                        transparent 100%
                      )
                    `,
                    transform: `rotate(${time * 2}deg) scale(${1 + Math.sin(time * 0.1) * 0.1})`
                  }}
                />
                
                {/* Holographic grid */}
                <div className="absolute inset-0 opacity-50">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                      transform: `perspective(100px) rotateX(${Math.sin(time * 0.05) * 10}deg)`
                    }}
                  />
                </div>
                
                {/* Floating holographic elements */}
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-8 h-8 rounded-full"
                    style={{
                      left: `${30 + i * 20}%`,
                      top: `${30 + Math.sin(time * 0.1 + i) * 20}%`,
                      background: `hsl(${(time * 5 + i * 120) % 360}, 100%, 60%)`,
                      boxShadow: `0 0 20px hsl(${(time * 5 + i * 120) % 360}, 100%, 60%)`,
                      transform: `translateZ(${Math.sin(time * 0.1 + i) * 10}px)`
                    }}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-gray-300 text-sm">Dimensional depth: {Math.round(Math.sin(time * 0.1) * 50 + 50)}%</p>
              </div>
            </div>
          </div>

          {/* Card 3 - Prismatic Control */}
          <div className="relative group">
            <div 
              className="absolute inset-0 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(${time * 1.8}deg, 
                  rgba(255,255,0,0.4) 0%, 
                  rgba(255,0,255,0.4) 50%, 
                  rgba(0,255,255,0.4) 100%
                )`,
                filter: 'blur(10px)'
              }}
            />
            <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(225deg, 
                        rgba(255,255,0,0.6) 0%, 
                        rgba(255,0,255,0.6) 50%, 
                        rgba(0,255,255,0.6) 100%
                      )`
                    }}
                  />
                  <Gem className="h-8 w-8 text-white relative z-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Prismatic</h3>
                  <p className="text-gray-300">Light Control</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <button
                    key={i}
                    className="relative p-4 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 group"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(${i === 0 ? '255,0,255' : i === 1 ? '0,255,255' : i === 2 ? '255,255,0' : '255,0,0'},0.2) 0%, 
                        rgba(${i === 0 ? '255,0,255' : i === 1 ? '0,255,255' : i === 2 ? '255,255,0' : '255,0,0'},0.4) 100%
                      )`
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full mx-auto mb-2"
                      style={{
                        background: `hsl(${i * 90 + time * 2}, 100%, 60%)`,
                        boxShadow: `0 0 15px hsl(${i * 90 + time * 2}, 100%, 60%)`
                      }}
                    />
                    <p className="text-white text-xs font-medium">
                      {i === 0 ? 'Refract' : i === 1 ? 'Reflect' : i === 2 ? 'Diffract' : 'Absorb'}
                    </p>
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-black/30 rounded-full px-4 py-2">
                  <Rainbow className="h-4 w-4 text-white" />
                  <span className="text-white text-sm">Full Spectrum Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Iridescent Control Panel */}
        <div className="mt-8 relative">
          <div 
            className="absolute inset-0 rounded-2xl opacity-60"
            style={{
              background: `linear-gradient(${time}deg, 
                rgba(255,0,255,0.3) 0%, 
                rgba(0,255,255,0.3) 20%, 
                rgba(255,255,0,0.3) 40%, 
                rgba(255,0,0,0.3) 60%, 
                rgba(0,255,0,0.3) 80%, 
                rgba(138,43,226,0.3) 100%
              )`,
              filter: 'blur(15px)'
            }}
          />
          <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Sparkles className="h-8 w-8 mr-3" style={{ color: `hsl(${time * 3}, 100%, 70%)` }} />
                  Iridescent Matrix
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 16 }, (_, i) => (
                    <button
                      key={i}
                      className="aspect-square rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                      style={{
                        background: `linear-gradient(${i * 22.5 + time * 2}deg, 
                          hsl(${(i * 23 + time * 3) % 360}, 100%, 50%) 0%, 
                          hsl(${(i * 23 + time * 3 + 60) % 360}, 100%, 50%) 100%
                        )`
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Zap className="h-8 w-8 mr-3" style={{ color: `hsl(${time * -2}, 100%, 70%)` }} />
                  Energy Flow
                </h3>
                <div className="space-y-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div 
                        className="w-6 h-6 rounded-full flex-shrink-0"
                        style={{
                          background: `hsl(${(i * 72 + time * 4) % 360}, 100%, 60%)`,
                          boxShadow: `0 0 20px hsl(${(i * 72 + time * 4) % 360}, 100%, 60%)`
                        }}
                      />
                      <div className="flex-1 bg-black/30 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.sin(time * 0.08 + i * 0.5) * 40 + 60}%`,
                            background: `linear-gradient(to right, 
                              hsl(${(i * 72 + time * 4) % 360}, 100%, 40%), 
                              hsl(${(i * 72 + time * 4) % 360}, 100%, 80%)
                            )`,
                            boxShadow: `0 0 15px hsl(${(i * 72 + time * 4) % 360}, 100%, 60%)`
                          }}
                        />
                      </div>
                      <span className="text-white text-sm font-mono w-12">
                        {Math.round(Math.sin(time * 0.08 + i * 0.5) * 40 + 60)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}