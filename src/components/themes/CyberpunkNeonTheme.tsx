import React from 'react';
import { Zap, Shield, Cpu, Wifi, Eye, Lock } from 'lucide-react';

export default function CyberpunkNeonTheme() {
  return (
    <div className="min-h-screen bg-black p-8 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Neon glow effects */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Scanning lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse" style={{ 
          position: 'absolute',
          top: '20%',
          animation: 'scan 3s linear infinite'
        }}></div>
      </div>
      
      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Cyberpunk Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 mb-8 border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.5)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10"></div>
          <div className="relative z-10">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 mb-4 font-mono tracking-wider">
              CYBERPUNK 2084
            </h1>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <p className="text-cyan-300 font-mono text-lg tracking-widest ml-4">NEURAL INTERFACE ACTIVE</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - System Status */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent group-hover:from-cyan-500/10 transition-all duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(0,255,255,0.5)] border border-cyan-300">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 font-mono">NEURAL CPU</h3>
                  <p className="text-cyan-300 text-sm font-mono">QUANTUM CORE</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-black rounded-lg p-4 border border-cyan-400/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-cyan-300 font-mono text-sm">PROCESSING</span>
                    <span className="text-cyan-400 font-mono font-bold">98.7%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 border border-cyan-400/30">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                  </div>
                </div>
                <div className="bg-black rounded-lg p-4 border border-pink-400/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-pink-300 font-mono text-sm">MEMORY</span>
                    <span className="text-pink-400 font-mono font-bold">76.2%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 border border-pink-400/30">
                    <div className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full" style={{ width: '76.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Security Matrix */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border-2 border-pink-400 shadow-[0_0_20px_rgba(255,20,147,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent group-hover:from-pink-500/10 transition-all duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(255,20,147,0.5)] border border-pink-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-400 font-mono">FIREWALL</h3>
                  <p className="text-pink-300 text-sm font-mono">ICE PROTOCOL</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className={`h-8 rounded border flex items-center justify-center ${
                    i < 6 ? 'bg-green-500/20 border-green-400 text-green-400' : 
                    i < 8 ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400' :
                    'bg-red-500/20 border-red-400 text-red-400'
                  }`}>
                    <Lock className="h-4 w-4" />
                  </div>
                ))}
              </div>
              <div className="bg-black rounded-lg p-3 border border-pink-400/50">
                <p className="text-pink-300 font-mono text-xs text-center">INTRUSION ATTEMPTS: 1,247</p>
                <p className="text-green-400 font-mono text-xs text-center mt-1">ALL BLOCKED</p>
              </div>
            </div>
          </div>

          {/* Card 3 - Network Interface */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 border-2 border-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent group-hover:from-purple-500/10 transition-all duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(147,51,234,0.5)] border border-purple-300">
                  <Wifi className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-400 font-mono">NET JACK</h3>
                  <p className="text-purple-300 text-sm font-mono">MATRIX LINK</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-black rounded-lg p-3 border border-purple-400/50 flex justify-between items-center">
                  <span className="text-purple-300 font-mono text-sm">BANDWIDTH</span>
                  <span className="text-purple-400 font-mono font-bold">10.2 TB/s</span>
                </div>
                <div className="bg-black rounded-lg p-3 border border-cyan-400/50 flex justify-between items-center">
                  <span className="text-cyan-300 font-mono text-sm">LATENCY</span>
                  <span className="text-cyan-400 font-mono font-bold">0.001ms</span>
                </div>
                <div className="bg-black rounded-lg p-3 border border-green-400/50 flex justify-between items-center">
                  <span className="text-green-300 font-mono text-sm">STATUS</span>
                  <span className="text-green-400 font-mono font-bold">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Command Terminal */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 border-4 border-gradient-to-r border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.3)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-pink-500/5 to-purple-500/5"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-6 font-mono flex items-center">
                <Zap className="h-8 w-8 mr-3 text-cyan-400" />
                COMMAND TERMINAL
              </h3>
              <div className="bg-black rounded-lg p-6 border-2 border-cyan-400/50 font-mono text-sm">
                <div className="text-green-400 mb-2">&gt; neural_link --establish</div>
                <div className="text-cyan-400 mb-2">Connection established...</div>
                <div className="text-pink-400 mb-2">&gt; run_diagnostics --full</div>
                <div className="text-purple-400 mb-2">All systems nominal</div>
                <div className="text-yellow-400 mb-2">&gt; access_mainframe</div>
                <div className="text-green-400 mb-4">Access granted. Welcome, User.</div>
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-2">&gt;</span>
                  <div className="w-2 h-4 bg-cyan-400 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6 font-mono flex items-center">
                <Eye className="h-8 w-8 mr-3 text-pink-400" />
                VISUAL CORTEX
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-black rounded-lg p-4 border-2 border-purple-400/50 relative overflow-hidden">
                    <div className={`h-20 rounded border-2 mb-3 flex items-center justify-center relative ${
                      i === 0 ? 'border-cyan-400 bg-cyan-500/10' :
                      i === 1 ? 'border-pink-400 bg-pink-500/10' :
                      i === 2 ? 'border-purple-400 bg-purple-500/10' :
                      'border-green-400 bg-green-500/10'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                      <div className={`w-8 h-8 rounded-full ${
                        i === 0 ? 'bg-cyan-400' :
                        i === 1 ? 'bg-pink-400' :
                        i === 2 ? 'bg-purple-400' :
                        'bg-green-400'
                      } animate-pulse`}></div>
                    </div>
                    <p className={`font-mono text-xs text-center ${
                      i === 0 ? 'text-cyan-400' :
                      i === 1 ? 'text-pink-400' :
                      i === 2 ? 'text-purple-400' :
                      'text-green-400'
                    }`}>NODE {i + 1}</p>
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