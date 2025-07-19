import React from 'react';
import { Triangle, Square, Circle, Hexagon, Star, Zap, TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

export default function GeometricTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 relative overflow-hidden">
      {/* Geometric background patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="geometric" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <polygon points="100,20 180,180 20,180" fill="#8b5cf6" opacity="0.3">
                <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="20s" repeatCount="indefinite" />
              </polygon>
              <rect x="50" y="50" width="100" height="100" fill="#ec4899" opacity="0.2" transform="rotate(45 100 100)">
                <animateTransform attributeName="transform" type="rotate" values="45 100 100;405 100 100" dur="15s" repeatCount="indefinite" />
              </rect>
              <circle cx="100" cy="100" r="30" fill="#06b6d4" opacity="0.4">
                <animate attributeName="r" values="30;50;30" dur="10s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/30 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-6 mb-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative p-3">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl transform rotate-45"></div>
              <div className="relative z-10 p-2">
                <Hexagon className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Geometric Dashboard</h1>
              <p className="text-purple-300">Panel de Control con Diseño Geométrico</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                <span className="text-purple-300 text-sm font-medium">Sistema Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Geometric Metrics Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Circle className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">87.3%</p>
                <p className="text-blue-300 text-sm">Eficiencia Circular</p>
              </div>
            </div>
            <div className="w-full bg-blue-900/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '87%'}}></div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl transform rotate-45">
                <Square className="h-6 w-6 text-purple-400" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-purple-300 text-sm">Elementos Cuadrados</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm">+23% este mes</span>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-pink-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-500/20 rounded-xl">
                <Triangle className="h-6 w-6 text-pink-400" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">456</p>
                <p className="text-pink-300 text-sm">Triángulos Activos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-pink-300 text-sm">Última actualización</span>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <Star className="h-6 w-6 text-orange-400" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">98.2%</p>
                <p className="text-orange-300 text-sm">Precisión Estelar</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm">Rendimiento óptimo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geometric Visualization */}
        <div className="lg:col-span-2 bg-black/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Visualización Geométrica</h2>
            <BarChart3 className="h-6 w-6 text-purple-400" />
          </div>
          
          <div className="grid grid-cols-2 gap-6 h-80">
            {/* Interactive Geometric Shapes */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 p-6 flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse shadow-2xl">
                  <div className="absolute inset-4 bg-black/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">87%</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-400 rounded-full animate-bounce"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-6 flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 transform rotate-45 animate-spin-slow shadow-2xl">
                  <div className="absolute inset-4 bg-black/20 transform -rotate-45 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">1.2K</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 p-6 flex items-center justify-center">
              <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <polygon 
                    points="50,10 90,90 10,90" 
                    fill="url(#triangleGradient)" 
                    className="animate-pulse"
                  />
                  <defs>
                    <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <text x="50" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">456</text>
                </svg>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl border border-orange-500/20 p-6 flex items-center justify-center">
              <div className="relative">
                <svg className="w-32 h-32 animate-spin-slow" viewBox="0 0 100 100">
                  <polygon 
                    points="50,5 61,35 95,35 69,57 79,91 50,70 21,91 31,57 5,35 39,35" 
                    fill="url(#starGradient)" 
                  />
                  <defs>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <text x="50" y="55" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">98%</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Geometric Analytics Panel */}
        <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Análisis Geométrico</h2>
            <PieChart className="h-6 w-6 text-purple-400" />
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-blue-400 font-medium flex items-center">
                  <Circle className="h-4 w-4 mr-2" />
                  Elementos Circulares
                </span>
                <span className="text-white font-bold">342</span>
              </div>
              <div className="w-full bg-blue-900/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '68%'}}></div>
              </div>
              <div className="text-blue-300 text-xs mt-1">68% del total</div>
            </div>

            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-purple-400 font-medium flex items-center">
                  <Square className="h-4 w-4 mr-2" />
                  Elementos Cuadrados
                </span>
                <span className="text-white font-bold">189</span>
              </div>
              <div className="w-full bg-purple-900/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
              <div className="text-purple-300 text-xs mt-1">45% del total</div>
            </div>

            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-400 font-medium flex items-center">
                  <Triangle className="h-4 w-4 mr-2" />
                  Elementos Triangulares
                </span>
                <span className="text-white font-bold">127</span>
              </div>
              <div className="w-full bg-green-900/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '32%'}}></div>
              </div>
              <div className="text-green-300 text-xs mt-1">32% del total</div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-orange-400 font-medium flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Elementos Estelares
                </span>
                <span className="text-white font-bold">89</span>
              </div>
              <div className="w-full bg-orange-900/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full" style={{width: '28%'}}></div>
              </div>
              <div className="text-orange-300 text-xs mt-1">28% del total</div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Actividad en Tiempo Real
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Formas creadas</span>
                  <span className="text-green-400">+23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Transformaciones</span>
                  <span className="text-blue-400">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Animaciones activas</span>
                  <span className="text-purple-400">12</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Hexagon className="h-4 w-4 text-cyan-400" />
                <span className="text-cyan-400 font-medium">Patrón Hexagonal</span>
              </div>
              <div className="text-gray-300 text-sm">Optimización geométrica activa</div>
              <div className="text-cyan-300 text-xs mt-1">Eficiencia: 94.7%</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}