import React from 'react';
import { Sparkles, Star, Moon, Wind, Snowflake, Zap } from 'lucide-react';

export default function AuroraGradientMeshTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 relative overflow-hidden">
      {/* Aurora background layers */}
      <div className="absolute inset-0">
        {/* Base aurora layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-green-400/20 to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-transparent to-pink-400/30 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-400/20 via-cyan-400/20 to-transparent animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
        
        {/* Flowing aurora waves */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute w-full h-32 bg-gradient-to-r from-transparent via-green-400/40 to-transparent transform -skew-y-12 animate-pulse" style={{ top: '20%', animationDuration: '5s' }}></div>
          <div className="absolute w-full h-24 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent transform skew-y-6 animate-pulse" style={{ top: '40%', animationDuration: '7s', animationDelay: '1.5s' }}></div>
          <div className="absolute w-full h-40 bg-gradient-to-r from-transparent via-pink-400/25 to-transparent transform -skew-y-3 animate-pulse" style={{ top: '60%', animationDuration: '6s', animationDelay: '3s' }}></div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            <div className={`w-1 h-1 rounded-full blur-sm ${
              i % 4 === 0 ? 'bg-green-400' :
              i % 4 === 1 ? 'bg-blue-400' :
              i % 4 === 2 ? 'bg-pink-400' :
              'bg-purple-400'
            } opacity-70`}></div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.7; }
          25% { transform: translateY(-30px) translateX(10px) scale(1.2); opacity: 1; }
          50% { transform: translateY(-10px) translateX(-15px) scale(0.8); opacity: 0.5; }
          75% { transform: translateY(-40px) translateX(20px) scale(1.1); opacity: 0.9; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Aurora Header */}
        <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-pink-400/10 rounded-3xl animate-pulse"></div>
          <div className="relative z-10">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-pink-400 mb-4 animate-pulse">
              Aurora Borealis
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
              <p className="text-cyan-300 font-light text-lg tracking-wide">Celestial • Ethereal • Mesmerizing</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Northern Lights */}
          <div className="bg-gradient-to-br from-green-900/60 via-emerald-800/60 to-teal-900/60 backdrop-blur-lg rounded-2xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-green-400/30 hover:border-green-400/50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/5 rounded-2xl animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-[0_8px_16px_rgba(34,197,94,0.3)] flex items-center justify-center mr-4 border border-green-300/50">
                  <Sparkles className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-300 drop-shadow-lg">Northern Lights</h3>
                  <p className="text-green-200 font-light">Magnetic Dance</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-green-400/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-300 font-light">Intensity</span>
                    <span className="text-green-200 font-medium">KP-7</span>
                  </div>
                  <div className="w-full bg-green-900/50 rounded-full h-3 border border-green-400/30">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-300 h-3 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-green-400/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-300 font-light">Visibility</span>
                    <span className="text-emerald-200 font-medium">Excellent</span>
                  </div>
                  <div className="w-full bg-emerald-900/50 rounded-full h-3 border border-emerald-400/30">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-3 rounded-full animate-pulse" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Cosmic Weather */}
          <div className="bg-gradient-to-br from-blue-900/60 via-indigo-800/60 to-purple-900/60 backdrop-blur-lg rounded-2xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-blue-400/30 hover:border-blue-400/50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-[0_8px_16px_rgba(59,130,246,0.3)] flex items-center justify-center mr-4 border border-blue-300/50">
                  <Wind className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-300 drop-shadow-lg">Solar Wind</h3>
                  <p className="text-blue-200 font-light">Cosmic Forces</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-blue-400/20 flex justify-between items-center">
                  <span className="text-blue-300 font-light">Speed</span>
                  <span className="text-blue-200 font-medium">450 km/s</span>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-purple-400/20 flex justify-between items-center">
                  <span className="text-purple-300 font-light">Density</span>
                  <span className="text-purple-200 font-medium">8.2 p/cm³</span>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-indigo-400/20 flex justify-between items-center">
                  <span className="text-indigo-300 font-light">Temperature</span>
                  <span className="text-indigo-200 font-medium">100,000 K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Stellar Observatory */}
          <div className="bg-gradient-to-br from-pink-900/60 via-purple-800/60 to-indigo-900/60 backdrop-blur-lg rounded-2xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-pink-400/30 hover:border-pink-400/50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 to-purple-400/5 rounded-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl shadow-[0_8px_16px_rgba(236,72,153,0.3)] flex items-center justify-center mr-4 border border-pink-300/50">
                  <Star className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-300 drop-shadow-lg">Observatory</h3>
                  <p className="text-pink-200 font-light">Star Gazing</p>
                </div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-pink-400/20">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className={`h-8 rounded-lg border flex items-center justify-center animate-pulse ${
                      i % 3 === 0 ? 'bg-pink-400/20 border-pink-400/40' :
                      i % 3 === 1 ? 'bg-purple-400/20 border-purple-400/40' :
                      'bg-indigo-400/20 border-indigo-400/40'
                    }`} style={{ animationDelay: `${i * 0.2}s` }}>
                      <div className={`w-2 h-2 rounded-full ${
                        i % 3 === 0 ? 'bg-pink-400' :
                        i % 3 === 1 ? 'bg-purple-400' :
                        'bg-indigo-400'
                      }`}></div>
                    </div>
                  ))}
                </div>
                <p className="text-pink-300 font-light text-sm text-center">Constellation mapping active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Aurora Control Center */}
        <div className="mt-8 bg-gradient-to-r from-indigo-900/70 via-purple-900/70 to-pink-900/70 backdrop-blur-lg rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-blue-400/5 to-pink-400/5 rounded-3xl animate-pulse"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-6 drop-shadow-lg flex items-center">
                <Moon className="h-8 w-8 mr-3 text-blue-400" />
                Aurora Control
              </h3>
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/20">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-medium py-4 px-6 rounded-xl shadow-[0_8px_16px_rgba(34,197,94,0.3)] hover:shadow-[0_12px_24px_rgba(34,197,94,0.4)] transform hover:scale-105 transition-all duration-300 border border-green-300/30">
                    Enhance
                  </button>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-medium py-4 px-6 rounded-xl shadow-[0_8px_16px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_24px_rgba(59,130,246,0.4)] transform hover:scale-105 transition-all duration-300 border border-blue-300/30">
                    Analyze
                  </button>
                  <button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-medium py-4 px-6 rounded-xl shadow-[0_8px_16px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_24px_rgba(236,72,153,0.4)] transform hover:scale-105 transition-all duration-300 border border-pink-300/30">
                    Capture
                  </button>
                  <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-medium py-4 px-6 rounded-xl shadow-[0_8px_16px_rgba(147,51,234,0.3)] hover:shadow-[0_12px_24px_rgba(147,51,234,0.4)] transform hover:scale-105 transition-all duration-300 border border-purple-300/30">
                    Predict
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-cyan-300 font-light">Real-time aurora monitoring system</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6 drop-shadow-lg flex items-center">
                <Snowflake className="h-8 w-8 mr-3 text-pink-400" />
                Atmospheric Data
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10 transform hover:scale-105 transition-all duration-300">
                    <div className={`h-24 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.2)] mb-3 flex items-center justify-center border ${
                      i === 0 ? 'bg-gradient-to-br from-green-400/20 to-emerald-400/20 border-green-400/30' :
                      i === 1 ? 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20 border-blue-400/30' :
                      i === 2 ? 'bg-gradient-to-br from-pink-400/20 to-rose-400/20 border-pink-400/30' :
                      'bg-gradient-to-br from-purple-400/20 to-indigo-400/20 border-purple-400/30'
                    }`}>
                      <div className={`w-8 h-8 rounded-full animate-pulse ${
                        i === 0 ? 'bg-green-400' :
                        i === 1 ? 'bg-blue-400' :
                        i === 2 ? 'bg-pink-400' :
                        'bg-purple-400'
                      } shadow-lg`}></div>
                    </div>
                    <p className={`font-medium text-sm text-center drop-shadow-sm ${
                      i === 0 ? 'text-green-300' :
                      i === 1 ? 'text-blue-300' :
                      i === 2 ? 'text-pink-300' :
                      'text-purple-300'
                    }`}>
                      {i === 0 ? 'Magnetosphere' : i === 1 ? 'Ionosphere' : i === 2 ? 'Thermosphere' : 'Exosphere'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}