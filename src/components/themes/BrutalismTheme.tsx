import React from 'react';
import { AlertTriangle, Zap, Target, Megaphone, Shield, Flame } from 'lucide-react';

export default function BrutalismTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-black p-4 relative overflow-hidden">
      {/* Harsh geometric background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full">
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={i}
              className="absolute bg-white transform rotate-45"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Brutal Header */}
        <div className="bg-black border-8 border-white p-8 mb-8 transform -skew-x-2">
          <h1 className="text-6xl font-black text-white mb-4 uppercase tracking-wider transform skew-x-2">
            BRUTALISM
          </h1>
          <div className="bg-red-600 p-4 border-4 border-white transform skew-x-2">
            <p className="text-white font-bold text-xl uppercase">RAW • BOLD • UNCOMPROMISING</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Warning */}
          <div className="bg-yellow-400 border-8 border-black p-6 transform rotate-1 hover:rotate-0 transition-transform">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-12 w-12 text-black mr-4" />
              <h3 className="text-2xl font-black text-black uppercase">ALERT</h3>
            </div>
            <div className="bg-black p-4 border-4 border-white">
              <p className="text-white font-bold uppercase text-sm">SYSTEM STATUS: CRITICAL</p>
              <div className="bg-red-600 h-4 w-full mt-2 border-2 border-white"></div>
            </div>
          </div>

          {/* Card 2 - Power */}
          <div className="bg-white border-8 border-black p-6 transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="flex items-center mb-4">
              <Zap className="h-12 w-12 text-red-600 mr-4" />
              <h3 className="text-2xl font-black text-black uppercase">POWER</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-black p-3 border-4 border-red-600">
                <span className="text-white font-bold text-lg">9000+</span>
                <p className="text-red-400 font-bold uppercase text-xs">ENERGY UNITS</p>
              </div>
              <div className="bg-red-600 p-3 border-4 border-black">
                <span className="text-white font-bold text-lg">MAXIMUM</span>
                <p className="text-black font-bold uppercase text-xs">OVERDRIVE MODE</p>
              </div>
            </div>
          </div>

          {/* Card 3 - Target */}
          <div className="bg-red-600 border-8 border-white p-6 transform rotate-1 hover:rotate-0 transition-transform">
            <div className="flex items-center mb-4">
              <Target className="h-12 w-12 text-white mr-4" />
              <h3 className="text-2xl font-black text-white uppercase">TARGET</h3>
            </div>
            <div className="bg-black p-4 border-4 border-white">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 border-2 border-red-600">
                  <span className="text-black font-black text-sm">X: 100</span>
                </div>
                <div className="bg-white p-2 border-2 border-red-600">
                  <span className="text-black font-black text-sm">Y: 200</span>
                </div>
              </div>
              <button className="w-full bg-red-600 border-4 border-white text-white font-black uppercase py-2 mt-3 hover:bg-white hover:text-red-600 transition-colors">
                LOCK ON
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Command Center */}
        <div className="mt-8 bg-black border-8 border-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-black text-white uppercase mb-4 flex items-center">
                <Megaphone className="h-8 w-8 mr-3" />
                COMMAND CENTER
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-red-600 border-4 border-white text-white font-black uppercase py-4 text-xl hover:bg-white hover:text-red-600 transition-colors">
                  EXECUTE
                </button>
                <button className="w-full bg-yellow-400 border-4 border-black text-black font-black uppercase py-4 text-xl hover:bg-black hover:text-yellow-400 transition-colors">
                  WARNING
                </button>
                <button className="w-full bg-white border-4 border-red-600 text-red-600 font-black uppercase py-4 text-xl hover:bg-red-600 hover:text-white transition-colors">
                  ABORT
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-black text-white uppercase mb-4 flex items-center">
                <Shield className="h-8 w-8 mr-3" />
                DEFENSE GRID
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }, (_, i) => (
                  <div 
                    key={i}
                    className={`h-16 border-4 flex items-center justify-center ${
                      i % 3 === 0 ? 'bg-red-600 border-white' : 
                      i % 3 === 1 ? 'bg-white border-black' : 
                      'bg-yellow-400 border-red-600'
                    }`}
                  >
                    <Flame className={`h-6 w-6 ${
                      i % 3 === 0 ? 'text-white' : 
                      i % 3 === 1 ? 'text-black' : 
                      'text-red-600'
                    }`} />
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