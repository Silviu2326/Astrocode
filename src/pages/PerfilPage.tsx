import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit3, Save, ArrowLeft, Camera, 
  Shield, Settings, Globe, Building, Clock, Award, TrendingUp, 
  Users, CheckCircle, Star, Activity, Palette, Bell, Languages,
  Sun, Moon, Zap, BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
  joinDate: string;
  role: string;
  company: string;
  website: string;
  lastLogin: string;
  isActive: boolean;
  // Preferences
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  // Statistics
  totalProjects: number;
  completedProjects: number;
  totalUserStories: number;
  completedUserStories: number;
}

const PerfilPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLDivElement[]>([]);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || 'Usuario',
    email: user?.email || 'usuario@ejemplo.com',
    phone: '+34 123 456 789',
    location: 'Madrid, España',
    bio: 'Desarrollador apasionado por crear soluciones innovadoras y eficientes que impacten positivamente en la vida de las personas.',
    avatar: '',
    joinDate: '2024-01-15',
    role: 'Senior Developer',
    company: 'Tech Solutions Inc.',
    website: 'https://miportfolio.com',
    lastLogin: new Date().toISOString(),
    isActive: true,
    theme: 'dark',
    language: 'es',
    timezone: 'Europe/Madrid',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    totalProjects: 24,
    completedProjects: 18,
    totalUserStories: 156,
    completedUserStories: 142
  });

  useEffect(() => {
    // Animación de entrada principal
    const tl = gsap.timeline();
    
    // Animación del header
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    // Animación del avatar con efecto de rebote
    .fromTo(avatarRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" },
      "-=0.3"
    )
    // Animación de las tarjetas con stagger
    .fromTo(cardsRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out" 
      },
      "-=0.5"
    )
    // Animación de las estadísticas con contador
    .fromTo(statsRef.current,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
          // Animación de contadores
          animateCounters();
        }
      },
      "-=0.3"
    );

    // Hover effects para las tarjetas
    cardsRef.current.forEach(card => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      }
    });

    return () => {
      // Cleanup event listeners
      cardsRef.current.forEach(card => {
        if (card) {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  const animateCounters = () => {
    const stats = [
      { element: '.stat-projects', value: profile.totalProjects },
      { element: '.stat-completed', value: profile.completedProjects },
      { element: '.stat-stories', value: profile.totalUserStories },
      { element: '.stat-completed-stories', value: profile.completedUserStories }
    ];

    stats.forEach(stat => {
      gsap.fromTo(stat.element, 
        { textContent: 0 },
        {
          textContent: stat.value,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          stagger: 0.2
        }
      );
    });
  };

  const handleSave = () => {
    // Animación de guardado
    gsap.to('.save-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        console.log('Guardando perfil:', profile);
        setIsEditing(false);
        
        // Mostrar notificación animada
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = '✓ Perfil actualizado exitosamente';
        document.body.appendChild(notification);
        
        gsap.fromTo(notification,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        );
        
        setTimeout(() => {
          gsap.to(notification, {
            opacity: 0,
            x: 100,
            duration: 0.3,
            onComplete: () => document.body.removeChild(notification)
          });
        }, 3000);
      }
    });
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    
    // Animación de transición entre modos
    gsap.to('.editable-field', {
      scale: 0.98,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToStatsRefs = (el: HTMLDivElement) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  const completionRate = Math.round((profile.completedProjects / profile.totalProjects) * 100);
  const storiesCompletionRate = Math.round((profile.completedUserStories / profile.totalUserStories) * 100);

  return (
    <div ref={containerRef} className="min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden" style={{
      background: '#020024',
      background: 'radial-gradient(circle, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(8, 80, 94, 1) 100%)'
    }}>
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="group p-3 text-slate-400 hover:text-white transition-all duration-300 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-slate-600 backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Mi Perfil
              </h1>
              <p className="text-slate-400 mt-1 text-lg">Gestiona tu información personal y preferencias</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={toggleEdit}
                  className="px-6 py-3 text-slate-300 border border-slate-600 rounded-xl hover:bg-slate-700 transition-all duration-300 backdrop-blur-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="save-button px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                >
                  <Save className="h-4 w-4" />
                  <span>Guardar</span>
                </button>
              </>
            ) : (
              <button
                onClick={toggleEdit}
                className="px-6 py-3 bg-slate-700/50 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm border border-slate-600"
              >
                <Edit3 className="h-4 w-4" />
                <span>Editar</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Avatar y información básica */}
          <div ref={addToRefs} className="xl:col-span-1">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="text-center">
                <div ref={avatarRef} className="relative inline-block mb-6">
                  <div className="w-36 h-36 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      profile.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg hover:scale-110">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-slate-800 ${
                    profile.isActive ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">{profile.name}</h2>
                <p className="text-slate-400 mb-2 text-lg">{profile.role}</p>
                <p className="text-slate-500 mb-4">{profile.company}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2 text-slate-300">
                    <Calendar className="h-4 w-4" />
                    <span>Miembro desde {new Date(profile.joinDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-slate-300">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-slate-300">
                    <Clock className="h-4 w-4" />
                    <span>Último acceso: {new Date(profile.lastLogin).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div ref={addToRefs} className="mt-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/configuracion')}
                  className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-300 group"
                >
                  <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Configuración</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-300 group">
                  <Shield className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Seguridad</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-300 group">
                  <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Estadísticas</span>
                </button>
              </div>
            </div>
          </div>

          {/* Información detallada */}
          <div className="xl:col-span-3 space-y-6">
            {/* Información Personal */}
            <div ref={addToRefs} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <User className="h-6 w-6 mr-3 text-blue-400" />
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="editable-field">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Nombre completo
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <p className="text-white bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50">{profile.name}</p>
                  )}
                </div>

                <div className="editable-field">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Correo electrónico
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <p className="text-white bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50">{profile.email}</p>
                  )}
                </div>

                <div className="editable-field">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Teléfono
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <p className="text-white bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50">{profile.phone}</p>
                  )}
                </div>

                <div className="editable-field">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Ubicación
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <p className="text-white bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50">{profile.location}</p>
                  )}
                </div>

                <div className="editable-field">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Building className="h-4 w-4 inline mr-2" />
                    Empresa
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <p className="text-white bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50">{profile.company}</p>
                  )}
                </div>

                <div className="editable-field">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Globe className="h-4 w-4 inline mr-2" />
                    Sitio web
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50 block transition-colors duration-300">
                      {profile.website}
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-6 editable-field">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Biografía
                </label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all duration-300"
                    placeholder="Cuéntanos sobre ti..."
                  />
                ) : (
                  <p className="text-white bg-slate-700/30 px-4 py-3 rounded-xl min-h-[120px] border border-slate-600/50">{profile.bio}</p>
                )}
              </div>
            </div>

            {/* Preferencias */}
            <div ref={addToRefs} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-3 text-purple-400" />
                Preferencias
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Palette className="h-4 w-4 inline mr-2" />
                    Tema
                  </label>
                  <select
                    value={profile.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-all duration-300"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Languages className="h-4 w-4 inline mr-2" />
                    Idioma
                  </label>
                  <select
                    value={profile.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-all duration-300"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Globe className="h-4 w-4 inline mr-2" />
                    Zona horaria
                  </label>
                  <select
                    value={profile.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-all duration-300"
                  >
                    <option value="Europe/Madrid">Madrid (UTC+1)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                    <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-4">
                  <Bell className="h-4 w-4 inline mr-2" />
                  Notificaciones
                </label>
                <div className="space-y-3">
                  {Object.entries(profile.notifications).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleInputChange('notifications', {
                          ...profile.notifications,
                          [key]: e.target.checked
                        })}
                        disabled={!isEditing}
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 disabled:opacity-50"
                      />
                      <span className="text-slate-300 capitalize">
                        {key === 'email' ? 'Correo electrónico' : key === 'push' ? 'Notificaciones push' : 'SMS'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div ref={addToStatsRefs} className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6 text-center backdrop-blur-xl">
                <div className="text-3xl font-bold text-blue-400 mb-2 stat-projects">0</div>
                <div className="text-sm text-slate-400 mb-2">Proyectos Totales</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              
              <div ref={addToStatsRefs} className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl p-6 text-center backdrop-blur-xl">
                <div className="text-3xl font-bold text-green-400 mb-2 stat-completed">0</div>
                <div className="text-sm text-slate-400 mb-2">Completados</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: `${completionRate}%`}}></div>
                </div>
              </div>
              
              <div ref={addToStatsRefs} className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-6 text-center backdrop-blur-xl">
                <div className="text-3xl font-bold text-purple-400 mb-2 stat-stories">0</div>
                <div className="text-sm text-slate-400 mb-2">User Stories</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              
              <div ref={addToStatsRefs} className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-2xl p-6 text-center backdrop-blur-xl">
                <div className="text-3xl font-bold text-orange-400 mb-2 stat-completed-stories">0</div>
                <div className="text-sm text-slate-400 mb-2">Stories Completadas</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: `${storiesCompletionRate}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;