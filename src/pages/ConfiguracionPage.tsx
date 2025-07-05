import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Settings, User, Bell, Shield, Palette, Database, Globe, Save, ArrowLeft,
  Monitor, Smartphone, Mail, Lock, Eye, EyeOff, Download, Upload,
  Trash2, RefreshCw, Languages, Clock, Sun, Moon, Zap, Activity,
  Key, FileText, HelpCircle, ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ConfigSection {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

interface UserSettings {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  company: string;
  website: string;
  
  // Preferences
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  
  // Notifications
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    projectUpdates: boolean;
    teamInvites: boolean;
    weeklyDigest: boolean;
  };
  
  // Security
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
  
  // App Settings
  autoSave: boolean;
  defaultView: string;
  itemsPerPage: number;
  showTutorials: boolean;
}

const ConfiguracionPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<string>('perfil');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs para animaciones
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLButtonElement[]>([]);
  
  const [settings, setSettings] = useState<UserSettings>({
    // Personal Info
    name: user?.name || 'Usuario',
    email: user?.email || 'usuario@ejemplo.com',
    phone: '+34 123 456 789',
    bio: 'Desarrollador apasionado por crear soluciones innovadoras.',
    location: 'Madrid, España',
    company: 'Tech Solutions Inc.',
    website: 'https://miportfolio.com',
    
    // Preferences
    theme: 'dark',
    language: 'es',
    timezone: 'Europe/Madrid',
    
    // Notifications
    notifications: {
      email: true,
      push: true,
      sms: false,
      projectUpdates: true,
      teamInvites: true,
      weeklyDigest: false
    },
    
    // Security
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginNotifications: true,
    
    // App Settings
    autoSave: true,
    defaultView: 'kanban',
    itemsPerPage: 20,
    showTutorials: true
  });

  const sections: ConfigSection[] = [
    {
      id: 'perfil',
      name: 'Perfil de Usuario',
      icon: User,
      description: 'Gestiona tu información personal y datos de contacto',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'notificaciones',
      name: 'Notificaciones',
      icon: Bell,
      description: 'Configura cómo y cuándo recibir notificaciones',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'seguridad',
      name: 'Seguridad y Privacidad',
      icon: Shield,
      description: 'Configuración de seguridad, contraseñas y autenticación',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'apariencia',
      name: 'Apariencia',
      icon: Palette,
      description: 'Personaliza la apariencia y tema de la aplicación',
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'preferencias',
      name: 'Preferencias',
      icon: Settings,
      description: 'Configuración general de la aplicación',
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'datos',
      name: 'Datos y Almacenamiento',
      icon: Database,
      description: 'Gestiona tus datos, exportación e importación',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'integraciones',
      name: 'Integraciones',
      icon: Globe,
      description: 'Conecta con servicios externos y APIs',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  useEffect(() => {
    // Animación de entrada principal
    const tl = gsap.timeline();
    
    // Animación del header
    tl.fromTo(headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    // Animación del sidebar
    .fromTo(sidebarRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    // Animación de las secciones del sidebar
    .fromTo(sectionsRef.current,
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.4, 
        stagger: 0.1,
        ease: "power2.out" 
      },
      "-=0.3"
    )
    // Animación del contenido principal
    .fromTo(contentRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );

    // Hover effects para las secciones
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        section.addEventListener('mouseenter', () => {
          gsap.to(section, { scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        section.addEventListener('mouseleave', () => {
          gsap.to(section, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      }
    });

    return () => {
      // Cleanup
      sectionsRef.current.forEach(section => {
        if (section) {
          section.removeEventListener('mouseenter', () => {});
          section.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  const handleSectionChange = (sectionId: string) => {
    // Animación de salida del contenido actual
    gsap.to(contentRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveSection(sectionId);
        // Animación de entrada del nuevo contenido
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    });
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    // Animación del botón de guardado
    gsap.to('.save-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: async () => {
        try {
          // Simular guardado
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          console.log('Guardando configuración:', settings);
          
          // Mostrar notificación animada
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-2';
          notification.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Configuración guardada exitosamente</span>
          `;
          document.body.appendChild(notification);
          
          gsap.fromTo(notification,
            { opacity: 0, x: 100, scale: 0.8 },
            { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
          
          setTimeout(() => {
            gsap.to(notification, {
              opacity: 0,
              x: 100,
              scale: 0.8,
              duration: 0.3,
              onComplete: () => document.body.removeChild(notification)
            });
          }, 3000);
          
        } catch (error) {
          console.error('Error al guardar:', error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const addToSectionsRefs = (el: HTMLButtonElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'perfil':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <User className="h-6 w-6 mr-3 text-blue-400" />
                Información Personal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Ubicación</label>
                  <input
                    type="text"
                    value={settings.location}
                    onChange={(e) => setSettings(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Empresa</label>
                  <input
                    type="text"
                    value={settings.company}
                    onChange={(e) => setSettings(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Sitio web</label>
                  <input
                    type="url"
                    value={settings.website}
                    onChange={(e) => setSettings(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Biografía</label>
                <textarea
                  value={settings.bio}
                  onChange={(e) => setSettings(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all duration-300"
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>
            </div>
          </div>
        );
      
      case 'notificaciones':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Bell className="h-6 w-6 mr-3 text-green-400" />
                Preferencias de Notificación
              </h3>
              <div className="space-y-6">
                {Object.entries({
                  email: { label: 'Notificaciones por Email', desc: 'Recibe actualizaciones por correo electrónico', icon: Mail },
                  push: { label: 'Notificaciones Push', desc: 'Recibe notificaciones en tiempo real en el navegador', icon: Smartphone },
                  sms: { label: 'Notificaciones SMS', desc: 'Recibe alertas importantes por mensaje de texto', icon: Smartphone },
                  projectUpdates: { label: 'Actualizaciones de Proyecto', desc: 'Notificaciones sobre cambios en tus proyectos', icon: Activity },
                  teamInvites: { label: 'Invitaciones de Equipo', desc: 'Cuando te inviten a colaborar en un proyecto', icon: User },
                  weeklyDigest: { label: 'Resumen Semanal', desc: 'Recibe un resumen de tu actividad semanal', icon: FileText }
                }).map(([key, config]) => {
                  const IconComponent = config.icon;
                  return (
                    <div key={key} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-5 w-5 text-slate-400 mt-1" />
                        <div>
                          <p className="text-white font-medium">{config.label}</p>
                          <p className="text-sm text-slate-400 mt-1">{config.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications[key as keyof typeof settings.notifications]}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, [key]: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      
      case 'seguridad':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-3 text-red-400" />
                Seguridad y Privacidad
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Key className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-white font-medium">Autenticación de Dos Factores</p>
                        <p className="text-sm text-slate-400">Añade una capa extra de seguridad a tu cuenta</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorEnabled}
                        onChange={(e) => setSettings(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  {settings.twoFactorEnabled && (
                    <button className="w-full bg-red-600/20 border border-red-500/30 text-red-300 py-2 px-4 rounded-lg hover:bg-red-600/30 transition-colors">
                      Configurar 2FA
                    </button>
                  )}
                </div>
                
                <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-white font-medium">Cambiar Contraseña</p>
                      <p className="text-sm text-slate-400">Actualiza tu contraseña regularmente</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña actual"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    />
                    <input
                      type="password"
                      placeholder="Confirmar nueva contraseña"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    />
                    <button className="w-full bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                      Actualizar Contraseña
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-white font-medium">Tiempo de Sesión</p>
                        <p className="text-sm text-slate-400">Cerrar sesión automáticamente después de inactividad</p>
                      </div>
                    </div>
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value={15}>15 minutos</option>
                      <option value={30}>30 minutos</option>
                      <option value={60}>1 hora</option>
                      <option value={120}>2 horas</option>
                      <option value={0}>Nunca</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'apariencia':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Palette className="h-6 w-6 mr-3 text-purple-400" />
                Personalización de Apariencia
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <label className="block text-sm font-medium text-slate-300 mb-3">Tema de la Aplicación</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', label: 'Claro', icon: Sun },
                      { value: 'dark', label: 'Oscuro', icon: Moon },
                      { value: 'auto', label: 'Automático', icon: Monitor }
                    ].map(theme => {
                      const IconComponent = theme.icon;
                      return (
                        <button
                          key={theme.value}
                          onClick={() => setSettings(prev => ({ ...prev, theme: theme.value as any }))}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            settings.theme === theme.value
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                          }`}
                        >
                          <IconComponent className="h-6 w-6 mx-auto mb-2 text-slate-300" />
                          <p className="text-sm text-slate-300">{theme.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Idioma</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Zona Horaria</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    >
                      <option value="Europe/Madrid">Madrid (UTC+1)</option>
                      <option value="America/New_York">New York (UTC-5)</option>
                      <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                      <option value="Europe/London">London (UTC+0)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'preferencias':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-3 text-orange-400" />
                Configuración General
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Vista por Defecto</label>
                    <select
                      value={settings.defaultView}
                      onChange={(e) => setSettings(prev => ({ ...prev, defaultView: e.target.value }))}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    >
                      <option value="kanban">Kanban</option>
                      <option value="pages">Páginas</option>
                      <option value="timeline">Timeline</option>
                      <option value="structure">Estructura</option>
                      <option value="dependencies">Dependencias</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Elementos por Página</label>
                    <select
                      value={settings.itemsPerPage}
                      onChange={(e) => setSettings(prev => ({ ...prev, itemsPerPage: parseInt(e.target.value) }))}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-white font-medium">Guardado Automático</p>
                        <p className="text-sm text-slate-400">Guarda automáticamente los cambios mientras trabajas</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoSave}
                        onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-white font-medium">Mostrar Tutoriales</p>
                        <p className="text-sm text-slate-400">Muestra consejos y tutoriales para nuevas funciones</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showTutorials}
                        onChange={(e) => setSettings(prev => ({ ...prev, showTutorials: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'datos':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Database className="h-6 w-6 mr-3 text-teal-400" />
                Gestión de Datos
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-center space-x-3 mb-4">
                      <Download className="h-5 w-5 text-teal-400" />
                      <div>
                        <p className="text-white font-medium">Exportar Datos</p>
                        <p className="text-sm text-slate-400">Descarga una copia de todos tus datos</p>
                      </div>
                    </div>
                    <button className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                      Exportar Datos
                    </button>
                  </div>
                  
                  <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-center space-x-3 mb-4">
                      <Upload className="h-5 w-5 text-teal-400" />
                      <div>
                        <p className="text-white font-medium">Importar Datos</p>
                        <p className="text-sm text-slate-400">Sube datos desde un archivo de respaldo</p>
                      </div>
                    </div>
                    <button className="w-full bg-slate-600 hover:bg-slate-500 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                      Seleccionar Archivo
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Trash2 className="h-5 w-5 text-red-400" />
                    <div>
                      <p className="text-white font-medium">Eliminar Cuenta</p>
                      <p className="text-sm text-red-300">Esta acción no se puede deshacer. Se eliminarán todos tus datos permanentemente.</p>
                    </div>
                  </div>
                  <button className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Eliminar Cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'integraciones':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Globe className="h-6 w-6 mr-3 text-indigo-400" />
                Integraciones y APIs
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'GitHub', desc: 'Sincroniza con repositorios de GitHub', connected: true },
                  { name: 'Slack', desc: 'Recibe notificaciones en Slack', connected: false },
                  { name: 'Trello', desc: 'Importa tableros desde Trello', connected: false },
                  { name: 'Google Drive', desc: 'Guarda archivos en Google Drive', connected: true }
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        integration.connected ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <p className="text-white font-medium">{integration.name}</p>
                        <p className="text-sm text-slate-400">{integration.desc}</p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      integration.connected
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}>
                      {integration.connected ? 'Desconectar' : 'Conectar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white mb-4">{sections.find(s => s.id === activeSection)?.name}</h3>
            <p className="text-slate-400">Configuración en desarrollo para esta sección.</p>
          </div>
        );
    }
  };

  return (
 <div ref={containerRef} className="min-h-screen relative overflow-hidden" style={{
      background: '#020024',
      background: 'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)'
    }}>      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <div ref={headerRef} className="bg-slate-800/30 border-b border-slate-700/50 px-6 py-6 backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 bg-slate-700/50 px-4 py-2 rounded-xl border border-slate-600 hover:border-slate-500 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Volver</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <Settings className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Configuración
              </h1>
              <p className="text-slate-400 text-lg">Gestiona tus preferencias y configuración de la aplicación</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div ref={sidebarRef} className="w-80 bg-slate-800/20 border-r border-slate-700/50 min-h-screen p-6 backdrop-blur-xl">
          <div className="space-y-2">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  ref={addToSectionsRefs}
                  onClick={() => handleSectionChange(section.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                    activeSection === section.id
                      ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50 border border-transparent hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent className={`h-5 w-5 mt-0.5 transition-transform duration-300 ${
                      activeSection === section.id ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    <div>
                      <p className="font-medium">{section.name}</p>
                      <p className="text-xs opacity-75 mt-1">{section.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div ref={contentRef} className="max-w-4xl">
            {renderSectionContent()}
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end max-w-4xl">
            <button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="save-button flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              {isLoading ? 'Guardando...' : 'Guardar Configuración'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPage;