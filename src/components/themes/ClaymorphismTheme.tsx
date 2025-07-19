import React from 'react';
import { Palette, Brush, Droplets, Sun, Leaf, Heart } from 'lucide-react';

export default function ClaymorphismTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200 p-8 relative overflow-hidden">
      {/* Clay texture background */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full">
          {Array.from({ length: 15 }, (_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-orange-300 to-pink-300 blur-xl"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Clay Header */}
        <div className="bg-gradient-to-r from-orange-300 to-pink-300 rounded-[3rem] p-8 mb-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white/50 backdrop-blur-sm">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Claymorphism
          </h1>
          <div className="bg-white/30 rounded-[2rem] p-4 backdrop-blur-sm">
            <p className="text-orange-800 font-semibold text-lg">Soft • Organic • Tactile Design</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Art Studio */}
          <div className="bg-gradient-to-br from-pink-300 to-purple-300 rounded-[2.5rem] p-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-4 border-white/50 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-[1.5rem] shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center mr-4">
                <Palette className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white drop-shadow-sm">Art Studio</h3>
                <p className="text-pink-100 font-medium">Creative Space</p>
              </div>
            </div>
            <div className="bg-white/30 rounded-[2rem] p-4 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-[1rem] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
                <div className="h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-[1rem] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
                <div className="h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-[1rem] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
              </div>
              <p className="text-purple-800 font-medium text-sm">12 colors available</p>
            </div>
          </div>

          {/* Card 2 - Nature Elements */}
          <div className="bg-gradient-to-br from-green-300 to-teal-300 rounded-[2.5rem] p-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-4 border-white/50 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-[1.5rem] shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center mr-4">
                <Leaf className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white drop-shadow-sm">Nature</h3>
                <p className="text-green-100 font-medium">Organic Forms</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/30 rounded-[2rem] p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sun className="h-6 w-6 text-yellow-600 mr-2" />
                    <span className="text-green-800 font-medium">Sunlight</span>
                  </div>
                  <div className="w-16 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"></div>
                </div>
              </div>
              <div className="bg-white/30 rounded-[2rem] p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Droplets className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="text-green-800 font-medium">Water</span>
                  </div>
                  <div className="w-16 h-3 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Wellness */}
          <div className="bg-gradient-to-br from-purple-300 to-pink-300 rounded-[2.5rem] p-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border-4 border-white/50 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-[1.5rem] shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center mr-4">
                <Heart className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white drop-shadow-sm">Wellness</h3>
                <p className="text-purple-100 font-medium">Mind & Body</p>
              </div>
            </div>
            <div className="bg-white/30 rounded-[2rem] p-4 backdrop-blur-sm">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mx-auto shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center">
                  <span className="text-2xl font-bold text-white drop-shadow-sm">85%</span>
                </div>
              </div>
              <p className="text-purple-800 font-medium text-sm text-center">Daily wellness score</p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Clay Workshop */}
        <div className="mt-8 bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 rounded-[3rem] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center">
                <Brush className="h-8 w-8 mr-3" />
                Clay Workshop
              </h3>
              <div className="bg-white/30 rounded-[2rem] p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button className="bg-gradient-to-br from-orange-400 to-pink-400 text-white font-bold py-4 px-6 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300">
                    Sculpt
                  </button>
                  <button className="bg-gradient-to-br from-pink-400 to-purple-400 text-white font-bold py-4 px-6 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300">
                    Mold
                  </button>
                  <button className="bg-gradient-to-br from-purple-400 to-blue-400 text-white font-bold py-4 px-6 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300">
                    Paint
                  </button>
                  <button className="bg-gradient-to-br from-blue-400 to-teal-400 text-white font-bold py-4 px-6 rounded-[1.5rem] shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300">
                    Glaze
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-orange-800 font-medium">Create beautiful clay masterpieces</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-white/30 rounded-[2rem] p-4 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                    <div className={`h-24 rounded-[1.5rem] shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] ${
                      i === 0 ? 'bg-gradient-to-br from-orange-400 to-pink-400' :
                      i === 1 ? 'bg-gradient-to-br from-pink-400 to-purple-400' :
                      i === 2 ? 'bg-gradient-to-br from-purple-400 to-blue-400' :
                      'bg-gradient-to-br from-blue-400 to-teal-400'
                    } mb-3 flex items-center justify-center`}>
                      <div className="w-8 h-8 bg-white/50 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
                    </div>
                    <p className="text-white font-medium text-sm text-center drop-shadow-sm">Piece {i + 1}</p>
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