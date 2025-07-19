import React from 'react';
import { Snowflake, Wind, Cloud, Sun, Moon, Thermometer, Droplets, Eye, Layers, Sparkles } from 'lucide-react';

export default function FrostedUITheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 relative overflow-hidden">
      {/* Animated frost particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Frosted glass overlay patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-blue-300/10"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-200/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Header */}
      <div className="relative z-10 backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-6 mb-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <Snowflake className="h-8 w-8 text-cyan-200 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Frosted Interface</h1>
              <p className="text-cyan-200/80">Diseño con efectos de escarcha y cristal</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-3 hover:bg-white/15 transition-all cursor-pointer">
              <Sun className="h-5 w-5 text-yellow-200" />
            </div>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-3 hover:bg-white/15 transition-all cursor-pointer">
              <Moon className="h-5 w-5 text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Weather Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/15 p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-blue-400/20 rounded-2xl backdrop-blur-sm border border-white/20">
              <Cloud className="h-8 w-8 text-blue-200" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">-2°C</p>
              <p className="text-cyan-200/80 text-sm">Nublado</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Humedad</span>
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-cyan-300" />
                <span className="text-white text-sm">78%</span>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>

        <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/15 p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-purple-400/20 rounded-2xl backdrop-blur-sm border border-white/20">
              <Wind className="h-8 w-8 text-purple-200" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">15 km/h</p>
              <p className="text-purple-200/80 text-sm">Viento</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Dirección</span>
              <span className="text-white text-sm">NO</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/15 p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-cyan-400/20 rounded-2xl backdrop-blur-sm border border-white/20">
              <Eye className="h-8 w-8 text-cyan-200" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">8 km</p>
              <p className="text-cyan-200/80 text-sm">Visibilidad</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Calidad</span>
              <span className="text-green-300 text-sm">Buena</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Temperature Chart */}
        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/15 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Temperatura Semanal</h2>
            <Thermometer className="h-6 w-6 text-red-300" />
          </div>
          <div className="h-48 bg-white/5 rounded-2xl border border-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-end justify-between h-full space-x-2">
              {[65, 45, 78, 52, 89, 67, 43].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-lg transition-all duration-1000 hover:from-cyan-400 hover:to-blue-300"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-white/60 text-xs mt-2">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Frost Effects Panel */}
        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/15 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Efectos de Escarcha</h2>
            <Layers className="h-6 w-6 text-cyan-300" />
          </div>
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                  <span className="text-white font-medium">Intensidad de Blur</span>
                </div>
                <span className="text-cyan-200">85%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Layers className="h-5 w-5 text-purple-300" />
                  <span className="text-white font-medium">Transparencia</span>
                </div>
                <span className="text-purple-200">72%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Snowflake className="h-5 w-5 text-cyan-300" />
                  <span className="text-white font-medium">Partículas</span>
                </div>
                <span className="text-cyan-200">Activas</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}