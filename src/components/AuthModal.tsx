import React, { useState, useEffect } from 'react';
import { X, Shield, Key, User, Lock, Route, Users, Eye, EyeOff } from 'lucide-react';
import { AppPage } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectPages?: AppPage[]; // ✅ Nueva prop para recibir las páginas
}

interface RouteConfig {
  path: string;
  name: string;
  isPrivate: boolean;
  allowedRoles: string[];
}

interface RoleConfig {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export default function AuthModal({ isOpen, onClose, projectPages = [] }: AuthModalProps) {
  const [authType, setAuthType] = useState<'jwt' | 'oauth' | 'session'>('jwt');
  const [provider, setProvider] = useState<'google' | 'github' | 'facebook'>('google');
  const [settings, setSettings] = useState({
    enableTwoFactor: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true
  });

  // ✅ Configuración de rutas basada en las páginas del proyecto
  const [routes, setRoutes] = useState<RouteConfig[]>([]);

  // ✅ Efecto para actualizar las rutas cuando cambien las páginas del proyecto
  useEffect(() => {
    // 🔍 Console logs para debugging
    console.log('🔍 AuthModal - projectPages recibidas:', projectPages);
    console.log('🔍 AuthModal - Cantidad de páginas:', projectPages?.length || 0);
    
    if (projectPages && projectPages.length > 0) {
      console.log('🔍 AuthModal - Páginas con nombre:', projectPages.filter(page => page.name));
      
      const projectRoutes = projectPages
        .filter(page => page.name) // ✅ Filtrar páginas que tengan nombre
        .map(page => {
          console.log('🔍 AuthModal - Procesando página:', page.name, page);
          return {
            path: `/${page.name.toLowerCase().replace(/\s+/g, '-')}`,
            name: page.name,
            isPrivate: true,
            allowedRoles: ['admin', 'user']
          };
        });
      
      console.log('🔍 AuthModal - Rutas generadas del proyecto:', projectRoutes);
      
      // ✅ Solo usar las rutas del proyecto, sin rutas del sistema
      setRoutes(projectRoutes);
    } else {
      console.log('🔍 AuthModal - No hay páginas del proyecto, usando array vacío');
      // ✅ Array vacío si no hay páginas del proyecto
      setRoutes([]);
    }
  }, [projectPages]);

  // Configuración de roles
  const [roles, setRoles] = useState<RoleConfig[]>([
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Acceso completo al sistema',
      permissions: ['read', 'write', 'delete', 'manage_users', 'manage_settings']
    },
    {
      id: 'user',
      name: 'Usuario',
      description: 'Acceso básico para gestionar proyectos',
      permissions: ['read', 'write']
    },
    {
      id: 'viewer',
      name: 'Visualizador',
      description: 'Solo lectura',
      permissions: ['read']
    }
  ]);

  const [activeTab, setActiveTab] = useState<'auth' | 'routes' | 'roles'>('auth');

  const toggleRoutePrivacy = (index: number) => {
    setRoutes(prev => prev.map((route, i) => 
      i === index ? { ...route, isPrivate: !route.isPrivate } : route
    ));
  };

  const toggleRoleForRoute = (routeIndex: number, roleId: string) => {
    setRoutes(prev => prev.map((route, i) => {
      if (i === routeIndex) {
        const allowedRoles = route.allowedRoles.includes(roleId)
          ? route.allowedRoles.filter(r => r !== roleId)
          : [...route.allowedRoles, roleId];
        return { ...route, allowedRoles };
      }
      return route;
    }));
  };

  const addNewRole = () => {
    const newRole: RoleConfig = {
      id: `role_${Date.now()}`,
      name: 'Nuevo Rol',
      description: 'Descripción del rol',
      permissions: ['read']
    };
    setRoles(prev => [...prev, newRole]);
  };

  const updateRole = (roleId: string, updates: Partial<RoleConfig>) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId ? { ...role, ...updates } : role
    ));
  };

  const deleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
    // Remover el rol de todas las rutas
    setRoutes(prev => prev.map(route => ({
      ...route,
      allowedRoles: route.allowedRoles.filter(r => r !== roleId)
    })));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Configuración de Autenticación y Rutas</h3>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white/5 p-1 rounded-lg">
          {[
            { id: 'auth', label: 'Autenticación', icon: Shield },
            { id: 'routes', label: 'Rutas', icon: Route },
            { id: 'roles', label: 'Roles', icon: Users }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === id
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {/* Tab de Autenticación */}
          {activeTab === 'auth' && (
            <>
              {/* Tipo de Autenticación */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">Tipo de Autenticación</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'jwt', label: 'JWT Token', icon: Key },
                    { id: 'oauth', label: 'OAuth 2.0', icon: User },
                    { id: 'session', label: 'Session Based', icon: Lock }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setAuthType(id as any)}
                      className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                        authType === id
                          ? 'bg-blue-500/20 border-blue-400/50 text-blue-300'
                          : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Proveedores OAuth */}
              {authType === 'oauth' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-3">Proveedor OAuth</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['google', 'github', 'facebook'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setProvider(p as any)}
                        className={`p-3 rounded-lg border transition-all capitalize ${
                          provider === p
                            ? 'bg-green-500/20 border-green-400/50 text-green-300'
                            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Configuraciones de Seguridad */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">Configuraciones de Seguridad</label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Autenticación de dos factores</span>
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, enableTwoFactor: !prev.enableTwoFactor }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.enableTwoFactor ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.enableTwoFactor ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Tiempo de sesión (minutos)</label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Longitud mínima de contraseña</label>
                    <input
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => setSettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Requerir caracteres especiales</span>
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, requireSpecialChars: !prev.requireSpecialChars }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.requireSpecialChars ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.requireSpecialChars ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Tab de Rutas */}
          {activeTab === 'routes' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">Configuración de Rutas</h4>
                <p className="text-sm text-gray-400">Define qué rutas son privadas y qué roles pueden acceder</p>
              </div>
              
              <div className="space-y-4">
                {routes.map((route, index) => (
                  <div key={route.path} className="bg-white/5 border border-white/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="text-white font-medium">{route.name}</h5>
                        <p className="text-sm text-gray-400">{route.path}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-300">Privada</span>
                        <button
                          onClick={() => toggleRoutePrivacy(index)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            route.isPrivate ? 'bg-red-500' : 'bg-green-500'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              route.isPrivate ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    {route.isPrivate && (
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Roles permitidos:</label>
                        <div className="flex flex-wrap gap-2">
                          {roles.map(role => (
                            <button
                              key={role.id}
                              onClick={() => toggleRoleForRoute(index, role.id)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                route.allowedRoles.includes(role.id)
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                                  : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
                              }`}
                            >
                              {role.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab de Roles */}
          {activeTab === 'roles' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">Gestión de Roles</h4>
                <button
                  onClick={addNewRole}
                  className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-400/30 rounded-md hover:bg-green-500/30 transition-colors text-sm"
                >
                  Agregar Rol
                </button>
              </div>
              
              <div className="space-y-4">
                {roles.map(role => (
                  <div key={role.id} className="bg-white/5 border border-white/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={role.name}
                          onChange={(e) => updateRole(role.id, { name: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Nombre del rol"
                        />
                        <textarea
                          value={role.description}
                          onChange={(e) => updateRole(role.id, { description: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                          placeholder="Descripción del rol"
                          rows={2}
                        />
                      </div>
                      <button
                        onClick={() => deleteRole(role.id)}
                        className="ml-3 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Permisos:</label>
                      <div className="flex flex-wrap gap-2">
                        {['read', 'write', 'delete', 'manage_users', 'manage_settings'].map(permission => (
                          <button
                            key={permission}
                            onClick={() => {
                              const permissions = role.permissions.includes(permission)
                                ? role.permissions.filter(p => p !== permission)
                                : [...role.permissions, permission];
                              updateRole(role.id, { permissions });
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all capitalize ${
                              role.permissions.includes(permission)
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                                : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
                            }`}
                          >
                            {permission.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-white/20">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md hover:bg-white/20 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              console.log('Configuración guardada:', { 
                authType, 
                provider, 
                settings, 
                routes, 
                roles 
              });
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-md hover:bg-blue-500/30 transition-colors"
          >
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}