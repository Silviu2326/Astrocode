import React from 'react';
import { Triangle, Square, Circle, Star, Zap, Sparkles } from 'lucide-react';

export default function MemphisDesignTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-cyan-300 p-8 relative overflow-hidden">
      {/* Memphis geometric background */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full">
          {/* Scattered geometric shapes */}
          <div className="absolute top-10 left-20 w-16 h-16 bg-red-500 transform rotate-45"></div>
          <div className="absolute top-32 right-32 w-12 h-12 bg-blue-500 rounded-full"></div>
          <div className="absolute top-64 left-1/4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-green-500"></div>
          <div className="absolute bottom-32 right-20 w-20 h-8 bg-purple-500 transform -rotate-12"></div>
          <div className="absolute bottom-64 left-16 w-14 h-14 bg-orange-500 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-pink-500 transform rotate-180"></div>
          
          {/* Squiggly lines */}
          <svg className="absolute top-20 left-1/2 w-32 h-8" viewBox="0 0 100 20">
            <path d="M0,10 Q25,0 50,10 T100,10" stroke="#ef4444" strokeWidth="3" fill="none" />
          </svg>
          <svg className="absolute bottom-40 left-1/3 w-24 h-6" viewBox="0 0 100 20">
            <path d="M0,10 Q25,20 50,10 T100,10" stroke="#3b82f6" strokeWidth="3" fill="none" />
          </svg>
          
          {/* Dotted patterns */}
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={i}
              className="absolute w-3 h-3 bg-black rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Memphis Header */}
        <div className="bg-gradient-to-r from-pink-400 to-yellow-400 p-8 mb-8 transform -rotate-1 shadow-[8px_8px_0px_#000] border-4 border-black relative">
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-400 transform rotate-45 border-2 border-black"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-500 rounded-full border-2 border-black"></div>
          <h1 className="text-6xl font-black text-black mb-4 transform skew-x-3 uppercase tracking-wider">
            MEMPHIS
          </h1>
          <div className="bg-black p-4 transform rotate-1">
            <p className="text-white font-bold text-xl uppercase tracking-widest">RADICAL • BOLD • POSTMODERN</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Geometric Shapes */}
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-6 transform rotate-2 shadow-[6px_6px_0px_#000] border-4 border-black relative hover:rotate-0 transition-transform duration-300">
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 transform rotate-45 border-2 border-black"></div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-pink-500 border-4 border-black flex items-center justify-center mr-4 transform -rotate-12">
                <Triangle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-black uppercase">SHAPES</h3>
                <p className="text-black font-bold">GEOMETRIC CHAOS</p>
              </div>
            </div>
            <div className="bg-white border-4 border-black p-4 transform -rotate-1">
              <div className="grid grid-cols-3 gap-3">
                <div className="h-12 bg-red-500 border-2 border-black flex items-center justify-center">
                  <Square className="h-6 w-6 text-white" />
                </div>
                <div className="h-12 bg-green-500 border-2 border-black rounded-full flex items-center justify-center">
                  <Circle className="h-6 w-6 text-white" />
                </div>
                <div className="h-12 bg-purple-500 border-2 border-black flex items-center justify-center transform rotate-45">
                  <div className="w-6 h-6 bg-white transform -rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Color Explosion */}
          <div className="bg-gradient-to-br from-red-400 to-pink-500 p-6 transform -rotate-1 shadow-[6px_6px_0px_#000] border-4 border-black relative hover:rotate-0 transition-transform duration-300">
            <div className="absolute -top-2 -left-2 w-8 h-4 bg-cyan-400 border-2 border-black"></div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-yellow-500 border-4 border-black flex items-center justify-center mr-4 transform rotate-12">
                <Sparkles className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-black uppercase">COLORS</h3>
                <p className="text-black font-bold">NEON VIBES</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white border-4 border-black p-3 transform rotate-1">
                <div className="flex justify-between items-center">
                  <span className="text-black font-black uppercase">ENERGY</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-red-500 border border-black"></div>
                    <div className="w-4 h-4 bg-yellow-500 border border-black"></div>
                    <div className="w-4 h-4 bg-green-500 border border-black"></div>
                  </div>
                </div>
              </div>
              <div className="bg-black border-4 border-white p-3 transform -rotate-1">
                <div className="flex justify-between items-center">
                  <span className="text-white font-black uppercase">POWER</span>
                  <span className="text-yellow-400 font-black text-xl">MAX!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Pattern Madness */}
          <div className="bg-gradient-to-br from-green-400 to-teal-500 p-6 transform rotate-1 shadow-[6px_6px_0px_#000] border-4 border-black relative hover:rotate-0 transition-transform duration-300">
            <div className="absolute -bottom-3 -right-3 w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-orange-500 border-4 border-black"></div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-orange-500 border-4 border-black flex items-center justify-center mr-4 transform -rotate-45">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-black uppercase">PATTERNS</h3>
                <p className="text-black font-bold">WILD STYLE</p>
              </div>
            </div>
            <div className="bg-white border-4 border-black p-4 transform rotate-2">
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }, (_, i) => (
                  <div key={i} className={`h-6 border border-black ${
                    i % 4 === 0 ? 'bg-red-500' :
                    i % 4 === 1 ? 'bg-blue-500' :
                    i % 4 === 2 ? 'bg-yellow-500' :
                    'bg-purple-500'
                  } ${i % 2 === 0 ? 'transform rotate-45' : ''}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Memphis Playground */}
        <div className="mt-8 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-8 shadow-[12px_12px_0px_#000] border-4 border-black relative">
          <div className="absolute -top-4 left-1/4 w-8 h-8 bg-cyan-400 rounded-full border-4 border-black"></div>
          <div className="absolute -bottom-4 right-1/3 w-12 h-6 bg-yellow-400 border-4 border-black transform rotate-12"></div>
          <div className="absolute top-1/2 -left-4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-green-500 border-4 border-black"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-4xl font-black text-black uppercase mb-6 transform -skew-x-12 flex items-center">
                <Zap className="h-10 w-10 mr-3 transform rotate-12" />
                RADICAL ZONE
              </h3>
              <div className="bg-white border-4 border-black p-6 transform -rotate-1">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-black py-4 px-6 border-4 border-black shadow-[4px_4px_0px_#000] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all uppercase">
                    BOOM!
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-black py-4 px-6 border-4 border-black shadow-[4px_4px_0px_#000] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all uppercase">
                    ZAP!
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-black py-4 px-6 border-4 border-black shadow-[4px_4px_0px_#000] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all uppercase">
                    POW!
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-black py-4 px-6 border-4 border-black shadow-[4px_4px_0px_#000] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all uppercase">
                    BANG!
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-black font-black uppercase tracking-wider">MAXIMUM IMPACT DESIGN</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-4xl font-black text-black uppercase mb-6 transform skew-x-12">SHAPE LAB</h3>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-black border-4 border-white p-4 transform hover:scale-110 transition-transform duration-300 relative">
                    <div className={`h-24 border-4 border-white mb-3 flex items-center justify-center ${
                      i === 0 ? 'bg-red-500 transform rotate-45' :
                      i === 1 ? 'bg-blue-500 rounded-full' :
                      i === 2 ? 'bg-yellow-500' :
                      'bg-green-500 transform -rotate-12'
                    }`}>
                      <div className={`w-8 h-8 bg-white ${
                        i === 0 ? 'transform -rotate-45' :
                        i === 1 ? 'rounded-full' :
                        i === 2 ? 'transform rotate-45' :
                        'transform rotate-12'
                      }`}></div>
                    </div>
                    <p className="text-white font-black text-sm text-center uppercase">
                      {i === 0 ? 'DIAMOND' : i === 1 ? 'CIRCLE' : i === 2 ? 'SQUARE' : 'RECT'}
                    </p>
                    {i === 1 && <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-500 rounded-full border-2 border-white"></div>}
                    {i === 3 && <div className="absolute -bottom-2 -left-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-cyan-500 border-2 border-white"></div>}
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