import React from 'react';
import { Brain, Cpu, Zap, TrendingUp, Activity, Bot, Database, Network, Eye, Sparkles } from 'lucide-react';

export default function AIPoweredTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-purple-900 p-6 relative overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#8b5cf6" opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <line x1="50" y1="50" x2="100" y2="0" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/30 backdrop-blur-xl rounded-3xl border border-violet-500/30 p-6 mb-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">AI Dashboard</h1>
              <p className="text-violet-300">Centro de Control de Inteligencia Artificial</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">AI Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Metrics Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="group bg-black/30 backdrop-blur-xl rounded-2xl border border-violet-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-violet-500/20 rounded-xl">
              <Cpu className="h-6 w-6 text-violet-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">94%</p>
              <p className="text-violet-300 text-sm">Precisión del Modelo</p>
            </div>
          </div>
          <div className="w-full bg-violet-900/50 rounded-full h-2">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full" style={{width: '94%'}}></div>
          </div>
        </div>

        <div className="group bg-black/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Zap className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">2.3ms</p>
              <p className="text-purple-300 text-sm">Tiempo de Respuesta</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span className="text-green-400 text-sm">-15% más rápido</span>
          </div>
        </div>

        <div className="group bg-black/30 backdrop-blur-xl rounded-2xl border border-pink-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <Activity className="h-6 w-6 text-pink-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-pink-300 text-sm">Consultas Procesadas</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-pink-300 text-sm">Última hora</span>
          </div>
        </div>

        <div className="group bg-black/30 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-xl">
              <Database className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">847GB</p>
              <p className="text-cyan-300 text-sm">Datos Procesados</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-cyan-300 text-sm">Hoy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat Interface */}
        <div className="lg:col-span-2 bg-black/30 backdrop-blur-xl rounded-2xl border border-violet-500/30 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Interfaz de IA</h2>
            <Bot className="h-6 w-6 text-violet-400" />
          </div>
          <div className="space-y-4 h-80 overflow-y-auto">
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white mb-2">¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-violet-600/50 text-violet-200 px-3 py-1 rounded-full text-xs border border-violet-500/30">Generar Código</span>
                    <span className="bg-purple-600/50 text-purple-200 px-3 py-1 rounded-full text-xs border border-purple-500/30">Analizar Datos</span>
                    <span className="bg-pink-600/50 text-pink-200 px-3 py-1 rounded-full text-xs border border-pink-500/30">Optimizar</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">U</span>
                </div>
                <div className="flex-1">
                  <p className="text-white">Necesito ayuda para optimizar mi modelo de machine learning</p>
                </div>
              </div>
            </div>

            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white mb-3">Perfecto! Te puedo ayudar con varias técnicas de optimización:</p>
                  <div className="bg-black/20 rounded-lg p-3 font-mono text-sm text-green-300">
                    <div># Técnicas recomendadas:</div>
                    <div>1. Regularización L1/L2</div>
                    <div>2. Dropout layers</div>
                    <div>3. Learning rate scheduling</div>
                    <div>4. Batch normalization</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-violet-300">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span className="text-sm ml-2">IA procesando...</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Status Panel */}
        <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-violet-500/30 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Estado del Sistema</h2>
            <Network className="h-6 w-6 text-violet-400" />
          </div>
          <div className="space-y-4">
            <div className="bg-violet-500/10 rounded-xl p-4 border border-violet-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Modelo Principal</span>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-violet-300 text-sm">GPT-4 Turbo</div>
              <div className="w-full bg-violet-900/50 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '98%'}}></div>
              </div>
            </div>

            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Modelo de Visión</span>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-purple-300 text-sm">DALL-E 3</div>
              <div className="w-full bg-purple-900/50 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>

            <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Análisis de Datos</span>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-pink-300 text-sm">Actualizando...</div>
              <div className="w-full bg-pink-900/50 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{width: '76%'}}></div>
              </div>
            </div>

            <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">Recursos del Sistema</span>
                <Eye className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-300">CPU</span>
                  <span className="text-white">67%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-300">GPU</span>
                  <span className="text-white">89%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-300">RAM</span>
                  <span className="text-white">54%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl p-4 border border-violet-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-white font-medium">Última Actualización</span>
              </div>
              <div className="text-violet-300 text-sm">Hace 2 minutos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}