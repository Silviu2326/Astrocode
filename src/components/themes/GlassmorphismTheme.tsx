import React from 'react';
import { BarChart3, User, Settings, TrendingUp, Bell, Search, Calendar, MessageCircle, Star, Activity } from 'lucide-react';

export default function GlassmorphismTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 mb-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Glassmorphism Dashboard</h1>
            <p className="text-white/70">Bienvenido de vuelta, aquí tienes tu resumen</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div className="relative">
              <Bell className="h-6 w-6 text-white/80 hover:text-white transition-colors cursor-pointer" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="group backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-400/20 rounded-xl backdrop-blur-sm">
              <BarChart3 className="h-6 w-6 text-blue-200" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-300" />
          </div>
          <h3 className="text-white/90 text-sm font-medium mb-1">Ingresos Totales</h3>
          <p className="text-2xl font-bold text-white mb-1">$24,500</p>
          <p className="text-green-300 text-sm">+12% este mes</p>
        </div>

        <div className="group backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-400/20 rounded-xl backdrop-blur-sm">
              <User className="h-6 w-6 text-purple-200" />
            </div>
            <Activity className="h-5 w-5 text-blue-300" />
          </div>
          <h3 className="text-white/90 text-sm font-medium mb-1">Usuarios Activos</h3>
          <p className="text-2xl font-bold text-white mb-1">1,847</p>
          <p className="text-blue-300 text-sm">+8% esta semana</p>
        </div>

        <div className="group backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-400/20 rounded-xl backdrop-blur-sm">
              <MessageCircle className="h-6 w-6 text-pink-200" />
            </div>
            <Star className="h-5 w-5 text-yellow-300" />
          </div>
          <h3 className="text-white/90 text-sm font-medium mb-1">Mensajes</h3>
          <p className="text-2xl font-bold text-white mb-1">342</p>
          <p className="text-yellow-300 text-sm">5 sin leer</p>
        </div>

        <div className="group backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-400/20 rounded-xl backdrop-blur-sm">
              <Settings className="h-6 w-6 text-cyan-200" />
            </div>
            <Calendar className="h-5 w-5 text-orange-300" />
          </div>
          <h3 className="text-white/90 text-sm font-medium mb-1">Tareas Pendientes</h3>
          <p className="text-2xl font-bold text-white mb-1">12</p>
          <p className="text-orange-300 text-sm">3 para hoy</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Análisis de Rendimiento</h2>
          <div className="h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">Gráfico de rendimiento</p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Usuario {item} se registró</p>
                  <p className="text-white/60 text-xs">Hace {item * 2} minutos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}