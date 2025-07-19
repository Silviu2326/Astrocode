import React from 'react';
import { Radio, Tv, Gamepad2, Music, Camera } from 'lucide-react';

export default function RetroVintageTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-600 p-8 relative overflow-hidden">
      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,20,147,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,20,147,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Neon glow effects */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Retro Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-lg p-8 mb-8 border-4 border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.5)]">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4 font-mono">
            RETRO WAVE
          </h1>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
            <p className="text-cyan-300 font-mono text-lg tracking-wider">VINTAGE • NOSTALGIA • SYNTHWAVE</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Music Player */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-pink-500 shadow-[0_0_20px_rgba(255,20,147,0.3)]">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(255,20,147,0.5)]">
                <Radio className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-400 font-mono">FM RADIO</h3>
                <p className="text-pink-300 text-sm font-mono">107.5 MHz</p>
              </div>
            </div>
            <div className="bg-black rounded-lg p-4 border border-cyan-400">
              <div className="flex justify-between items-center mb-2">
                <span className="text-cyan-300 font-mono text-sm">NOW PLAYING</span>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className={`w-1 bg-pink-400 animate-pulse`} style={{ height: `${Math.random() * 20 + 10}px`, animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
              </div>
              <p className="text-white font-mono text-xs">Synthwave Classics Vol. 1</p>
            </div>
          </div>

          {/* Card 2 - Gaming Console */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-400 font-mono">ARCADE</h3>
                <p className="text-cyan-300 text-sm font-mono">HIGH SCORE</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-black rounded-lg p-3 border border-pink-400">
                <div className="flex justify-between">
                  <span className="text-cyan-300 font-mono text-sm">LEVEL</span>
                  <span className="text-pink-400 font-mono font-bold">42</span>
                </div>
              </div>
              <div className="bg-black rounded-lg p-3 border border-cyan-400">
                <div className="flex justify-between">
                  <span className="text-pink-300 font-mono text-sm">SCORE</span>
                  <span className="text-cyan-400 font-mono font-bold">999,999</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - TV Monitor */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                <Tv className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-400 font-mono">CRT MONITOR</h3>
                <p className="text-pink-300 text-sm font-mono">CHANNEL 80</p>
              </div>
            </div>
            <div className="bg-black rounded-lg p-4 border border-purple-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-10 animate-pulse" style={{ height: '2px', top: '50%' }}></div>
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 32 }, (_, i) => (
                  <div key={i} className={`h-2 rounded ${i % 4 === 0 ? 'bg-pink-400' : i % 4 === 1 ? 'bg-cyan-400' : i % 4 === 2 ? 'bg-purple-400' : 'bg-gray-600'} opacity-70`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Cassette Deck */}
        <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 border-4 border-gradient-to-r border-pink-500 shadow-[0_0_30px_rgba(255,20,147,0.3)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-6 font-mono flex items-center">
                <Music className="h-8 w-8 mr-3 text-pink-400" />
                TAPE DECK
              </h3>
              <div className="bg-black rounded-lg p-6 border-2 border-cyan-400">
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border-2 border-pink-400 flex items-center justify-center relative">
                    <div className="w-6 h-6 bg-pink-400 rounded-full animate-spin"></div>
                    <div className="w-6 h-6 bg-cyan-400 rounded-full animate-spin ml-8" style={{ animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button className="bg-pink-500 hover:bg-pink-400 text-white font-mono px-4 py-2 rounded border border-pink-300 shadow-[0_0_10px_rgba(255,20,147,0.5)] transition-all">
                    PLAY
                  </button>
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-mono px-4 py-2 rounded border border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all">
                    STOP
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 font-mono flex items-center">
                <Camera className="h-8 w-8 mr-3 text-cyan-400" />
                POLAROID
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-white p-2 rounded-lg border-2 border-gray-300 shadow-lg transform rotate-1 hover:rotate-0 transition-transform">
                    <div className={`h-20 rounded ${i % 2 === 0 ? 'bg-gradient-to-br from-pink-300 to-purple-400' : 'bg-gradient-to-br from-cyan-300 to-blue-400'}`}></div>
                    <div className="h-6 bg-white flex items-center justify-center">
                      <span className="text-gray-600 text-xs font-mono">RETRO {i + 1}</span>
                    </div>
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