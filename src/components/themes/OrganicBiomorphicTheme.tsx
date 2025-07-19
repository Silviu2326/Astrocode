import React from 'react';
import { Leaf, Flower, TreePine, Waves, Sun, Bird } from 'lucide-react';

export default function OrganicBiomorphicTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 p-8 relative overflow-hidden">
      {/* Organic flowing background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="organic1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </radialGradient>
            <radialGradient id="organic2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <path d="M100,200 Q300,100 500,200 T900,200 Q800,400 600,500 T200,600 Q100,400 100,200 Z" fill="url(#organic1)" />
          <path d="M200,300 Q400,200 600,300 T1000,300 Q900,500 700,600 T300,700 Q200,500 200,300 Z" fill="url(#organic2)" />
          <path d="M0,400 Q200,300 400,400 T800,400 Q700,600 500,700 T100,800 Q0,600 0,400 Z" fill="url(#organic1)" />
        </svg>
      </div>
      
      {/* Floating organic elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className={`w-${Math.floor(Math.random() * 8) + 4} h-${Math.floor(Math.random() * 8) + 4} bg-gradient-to-br from-green-300 to-emerald-400 rounded-full opacity-30 blur-sm`}></div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Organic Header */}
        <div className="bg-gradient-to-r from-green-200/80 to-emerald-200/80 backdrop-blur-sm rounded-[3rem] p-8 mb-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-[3rem]"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600 mb-4">
              Biomorphic Nature
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <p className="text-green-700 font-medium text-lg">Organic • Flowing • Natural Forms</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Forest Ecosystem */}
          <div className="bg-gradient-to-br from-green-200/80 to-emerald-300/80 backdrop-blur-sm rounded-[2.5rem] p-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-4 border-white/60 transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-[2.5rem]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] flex items-center justify-center mr-4 border-2 border-white/50">
                  <TreePine className="h-8 w-8 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 drop-shadow-sm">Forest</h3>
                  <p className="text-green-600 font-medium">Living Ecosystem</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] p-4 border-2 border-white/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-800 font-medium">Trees</span>
                    <span className="text-green-700 font-bold">2,847</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-3 border border-green-300">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] p-4 border-2 border-white/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-800 font-medium">Biodiversity</span>
                    <span className="text-emerald-700 font-bold">94%</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-3 border border-emerald-300">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Ocean Waves */}
          <div className="bg-gradient-to-br from-teal-200/80 to-cyan-300/80 backdrop-blur-sm rounded-[2.5rem] p-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-4 border-white/60 transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-[2.5rem]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] flex items-center justify-center mr-4 border-2 border-white/50">
                  <Waves className="h-8 w-8 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-teal-800 drop-shadow-sm">Ocean</h3>
                  <p className="text-teal-600 font-medium">Flowing Waters</p>
                </div>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] p-4 border-2 border-white/60">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className={`h-8 rounded-full animate-pulse ${
                      i % 3 === 0 ? 'bg-gradient-to-r from-teal-300 to-teal-400' :
                      i % 3 === 1 ? 'bg-gradient-to-r from-cyan-300 to-cyan-400' :
                      'bg-gradient-to-r from-blue-300 to-blue-400'
                    }`} style={{ animationDelay: `${i * 0.2}s` }}></div>
                  ))}
                </div>
                <p className="text-teal-800 font-medium text-sm text-center">Wave patterns in motion</p>
              </div>
            </div>
          </div>

          {/* Card 3 - Garden Bloom */}
          <div className="bg-gradient-to-br from-pink-200/80 to-rose-300/80 backdrop-blur-sm rounded-[2.5rem] p-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-4 border-white/60 transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-[2.5rem]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] flex items-center justify-center mr-4 border-2 border-white/50">
                  <Flower className="h-8 w-8 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-800 drop-shadow-sm">Garden</h3>
                  <p className="text-pink-600 font-medium">Blooming Life</p>
                </div>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] p-4 border-2 border-white/60">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mx-auto shadow-[0_8px_16px_rgba(0,0,0,0.1)] flex items-center justify-center border-4 border-white/60">
                    <Bird className="h-10 w-10 text-white drop-shadow-sm animate-pulse" />
                  </div>
                </div>
                <p className="text-pink-800 font-medium text-sm text-center">127 species in bloom</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Natural Harmony */}
        <div className="mt-8 bg-gradient-to-r from-green-200/80 via-emerald-200/80 to-teal-200/80 backdrop-blur-sm rounded-[3rem] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-300/10 via-emerald-300/10 to-teal-300/10 rounded-[3rem]"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600 mb-6 drop-shadow-sm flex items-center">
                <Sun className="h-8 w-8 mr-3 text-yellow-500" />
                Natural Harmony
              </h3>
              <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] p-6 border-2 border-white/60">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button className="bg-gradient-to-br from-green-400 to-emerald-500 text-white font-bold py-4 px-6 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300 border-2 border-white/30">
                    Grow
                  </button>
                  <button className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white font-bold py-4 px-6 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300 border-2 border-white/30">
                    Flow
                  </button>
                  <button className="bg-gradient-to-br from-pink-400 to-rose-500 text-white font-bold py-4 px-6 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300 border-2 border-white/30">
                    Bloom
                  </button>
                  <button className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold py-4 px-6 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300 border-2 border-white/30">
                    Shine
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-green-800 font-medium">Connect with nature's rhythm</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600 mb-6 drop-shadow-sm flex items-center">
                <Leaf className="h-8 w-8 mr-3 text-green-500" />
                Living Elements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-white/40 backdrop-blur-sm rounded-[2rem] p-4 border-2 border-white/60 transform hover:scale-105 transition-all duration-300">
                    <div className={`h-24 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] mb-3 flex items-center justify-center border-2 border-white/50 ${
                      i === 0 ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                      i === 1 ? 'bg-gradient-to-br from-teal-400 to-cyan-500' :
                      i === 2 ? 'bg-gradient-to-br from-pink-400 to-rose-500' :
                      'bg-gradient-to-br from-yellow-400 to-orange-500'
                    }`}>
                      <div className="w-8 h-8 bg-white/50 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1)] animate-pulse"></div>
                    </div>
                    <p className="text-green-800 font-medium text-sm text-center drop-shadow-sm">
                      {i === 0 ? 'Earth' : i === 1 ? 'Water' : i === 2 ? 'Fire' : 'Air'}
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