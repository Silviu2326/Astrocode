import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Shield, Key, Users, Settings } from 'lucide-react';
import { AuthConfig, UserType } from '../types';
import { projectService } from '../services/api';

interface AuthConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
}

const AuthConfigModal: React.FC<AuthConfigModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectName
}) => {
  const [authConfig, setAuthConfig] = useState<AuthConfig>({
    hasLogin: false,
    authMethod: 'none',
    oauthProviders: [],
    requiresEmailVerification: false,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: false,
      requireLowercase: false,
      requireNumbers: false,
      requireSpecialChars: false
    },
    sessionTimeout: 3600,
    multiFactorAuth: {
      enabled: false,
      methods: []
    },
    userTypes: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'users'>('general');
  const [showUserTypeForm, setShowUserTypeForm] = useState(false);
  const [editingUserType, setEditingUserType] = useState<UserType | null>(null);
  const [userTypeForm, setUserTypeForm] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
    isDefault: false
  });

  useEffect(() => {
    if (isOpen) {
      loadAuthConfig();
    }
  }, [isOpen, projectId]);

  const loadAuthConfig = async () => {
    setIsLoading(true);
    try {
      const response = await projectService.getAuthConfig(projectId);
      console.log('Load auth config response:', response);
      if (response.success && response.authConfig) {
        // Merge loaded data with defaults, preserving existing values
        const loadedConfig = {
          hasLogin: response.authConfig.hasLogin ?? false,
          authMethod: response.authConfig.authMethod ?? 'none' as const,
          oauthProviders: response.authConfig.oauthProviders ?? [],
          requiresEmailVerification: response.authConfig.requiresEmailVerification ?? false,
          passwordPolicy: {
            minLength: response.authConfig.passwordPolicy?.minLength ?? 8,
            requireUppercase: response.authConfig.passwordPolicy?.requireUppercase ?? false,
            requireLowercase: response.authConfig.passwordPolicy?.requireLowercase ?? false,
            requireNumbers: response.authConfig.passwordPolicy?.requireNumbers ?? false,
            requireSpecialChars: response.authConfig.passwordPolicy?.requireSpecialChars ?? false
          },
          sessionTimeout: response.authConfig.sessionTimeout ?? 3600,
          multiFactorAuth: {
            enabled: response.authConfig.multiFactorAuth?.enabled ?? false,
            methods: response.authConfig.multiFactorAuth?.methods ?? []
          },
          userTypes: response.authConfig.userTypes ?? []
        };
        setAuthConfig(loadedConfig);
        console.log('Loaded auth config:', loadedConfig);
      } else {
        // If no data exists, use defaults
        console.log('No auth config found, using defaults');
      }
    } catch (error) {
      console.error('Error loading auth config:', error);
      // Keep default values on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log('🔄 [FRONTEND] Iniciando guardado de configuración de autenticación');
      console.log('📋 [FRONTEND] Datos del formulario a guardar:', JSON.stringify(authConfig, null, 2));
      console.log('🆔 [FRONTEND] Project ID:', projectId);
      console.log('🔑 [FRONTEND] Token disponible:', !!localStorage.getItem('token'));
      
      // Validación básica antes de enviar
      if (!projectId) {
        console.error('❌ [FRONTEND] Project ID no válido');
        alert('Error: ID de proyecto no válido');
        return;
      }
      
      if (authConfig.hasLogin && !authConfig.authMethod) {
        console.error('❌ [FRONTEND] Método de autenticación requerido cuando hasLogin es true');
        alert('Error: Debe seleccionar un método de autenticación');
        return;
      }
      
      // Preparar datos para envío
      const dataToSend = {
        ...authConfig,
        // Asegurar que los valores booleanos sean correctos
        hasLogin: Boolean(authConfig.hasLogin),
        requiresEmailVerification: Boolean(authConfig.requiresEmailVerification),
        passwordPolicy: {
          ...authConfig.passwordPolicy,
          minLength: Number(authConfig.passwordPolicy.minLength) || 8,
          requireUppercase: Boolean(authConfig.passwordPolicy.requireUppercase),
          requireLowercase: Boolean(authConfig.passwordPolicy.requireLowercase),
          requireNumbers: Boolean(authConfig.passwordPolicy.requireNumbers),
          requireSpecialChars: Boolean(authConfig.passwordPolicy.requireSpecialChars)
        },
        sessionTimeout: Number(authConfig.sessionTimeout) || 3600,
        multiFactorAuth: {
          enabled: Boolean(authConfig.multiFactorAuth.enabled),
          methods: authConfig.multiFactorAuth.methods || []
        }
      };
      
      console.log('📤 [FRONTEND] Datos procesados para envío:', JSON.stringify(dataToSend, null, 2));
      
      const response = await projectService.updateAuthConfig(projectId, dataToSend);
      console.log('📥 [FRONTEND] Respuesta del servidor:', JSON.stringify(response, null, 2));
      
      if (response.success) {
        console.log('✅ [FRONTEND] Configuración guardada exitosamente');
        console.log('📊 [FRONTEND] Datos guardados en el servidor:', JSON.stringify(response.data, null, 2));
        
        // Actualizar el estado local con los datos del servidor
        if (response.data) {
          setAuthConfig(response.data);
        }
        
        // Recargar la configuración para asegurar sincronización
        await loadAuthConfig();
        
        alert('Configuración de autenticación guardada correctamente');
        onClose();
      } else {
        console.error('❌ [FRONTEND] Error en la respuesta del servidor:', response);
        alert('Error al guardar la configuración: ' + (response.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error('❌ [FRONTEND] Error de red o excepción:', error);
      console.error('❌ [FRONTEND] Stack trace:', (error as Error).stack);
      console.error('❌ [FRONTEND] Error message:', (error as Error).message);
      alert('Error al guardar la configuración: ' + (error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddUserType = async () => {
    try {
      const response = await projectService.addUserType(projectId, userTypeForm);
      if (response.success) {
        setAuthConfig(prev => ({
          ...prev,
          userTypes: [...prev.userTypes, response.data]
        }));
        setShowUserTypeForm(false);
        setUserTypeForm({ name: '', description: '', permissions: [], isDefault: false });
      }
    } catch (error) {
      console.error('Error adding user type:', error);
    }
  };

  const handleUpdateUserType = async () => {
    if (!editingUserType?._id) return;
    
    try {
      const response = await projectService.updateUserType(projectId, editingUserType._id, userTypeForm);
      if (response.success) {
        setAuthConfig(prev => ({
          ...prev,
          userTypes: prev.userTypes.map(ut => 
            ut._id === editingUserType._id ? response.data : ut
          )
        }));
        setEditingUserType(null);
        setUserTypeForm({ name: '', description: '', permissions: [], isDefault: false });
      }
    } catch (error) {
      console.error('Error updating user type:', error);
    }
  };

  const handleDeleteUserType = async (userTypeId: string) => {
    try {
      const response = await projectService.deleteUserType(projectId, userTypeId);
      if (response.success) {
        setAuthConfig(prev => ({
          ...prev,
          userTypes: prev.userTypes.filter(ut => ut._id !== userTypeId)
        }));
      }
    } catch (error) {
      console.error('Error deleting user type:', error);
    }
  };

  const startEditUserType = (userType: UserType) => {
    setEditingUserType(userType);
    setUserTypeForm({
      name: userType.name,
      description: userType.description || '',
      permissions: userType.permissions,
      isDefault: userType.isDefault
    });
    setShowUserTypeForm(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Configuración de Autenticación</h2>
            <p className="text-sm text-gray-600">{projectName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'general', label: 'General', icon: Settings },
                  { id: 'security', label: 'Seguridad', icon: Shield },
                  { id: 'users', label: 'Tipos de Usuario', icon: Users }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="hasLogin"
                      checked={authConfig.hasLogin}
                      onChange={(e) => {
                        const hasLogin = e.target.checked;
                        console.log('🔄 [FORM] Cambiando hasLogin:', hasLogin);
                        setAuthConfig(prev => ({ 
                          ...prev, 
                          hasLogin,
                          // Si se desactiva el login, resetear el método de autenticación
                          authMethod: hasLogin ? prev.authMethod : 'none'
                        }));
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="hasLogin" className="text-sm font-medium text-gray-700">
                      El proyecto requiere autenticación de usuarios
                    </label>
                  </div>

                  {authConfig.hasLogin && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Método de Autenticación
                        </label>
                        <select
                          value={authConfig.authMethod}
                          onChange={(e) => {
                            const newAuthMethod = e.target.value as AuthConfig['authMethod'];
                            console.log('🔄 [FORM] Cambiando método de autenticación:', newAuthMethod);
                            setAuthConfig(prev => ({ 
                              ...prev, 
                              authMethod: newAuthMethod
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="basic">Básico (Usuario/Contraseña)</option>
                          <option value="jwt">JWT Tokens</option>
                          <option value="oauth">OAuth</option>
                          <option value="session">Sesiones</option>
                          <option value="custom">Personalizado</option>
                        </select>
                      </div>

                      {authConfig.authMethod === 'oauth' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Proveedores OAuth
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['google', 'github', 'facebook', 'twitter', 'linkedin', 'microsoft'].map(provider => (
                              <label key={provider} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={authConfig.oauthProviders.includes(provider as any)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setAuthConfig(prev => ({
                                        ...prev,
                                        oauthProviders: [...prev.oauthProviders, provider as any]
                                      }));
                                    } else {
                                      setAuthConfig(prev => ({
                                        ...prev,
                                        oauthProviders: prev.oauthProviders.filter(p => p !== provider)
                                      }));
                                    }
                                  }}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700 capitalize">{provider}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="emailVerification"
                          checked={authConfig.requiresEmailVerification}
                          onChange={(e) => setAuthConfig(prev => ({ 
                            ...prev, 
                            requiresEmailVerification: e.target.checked 
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="emailVerification" className="text-sm font-medium text-gray-700">
                          Requiere verificación de email
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timeout de Sesión (segundos)
                        </label>
                        <input
                          type="number"
                          min="300"
                          value={authConfig.sessionTimeout}
                          onChange={(e) => setAuthConfig(prev => ({ 
                            ...prev, 
                            sessionTimeout: parseInt(e.target.value) || 3600
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'security' && authConfig.hasLogin && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Política de Contraseñas</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Longitud Mínima
                        </label>
                        <input
                          type="number"
                          min="6"
                          value={authConfig.passwordPolicy.minLength}
                          onChange={(e) => setAuthConfig(prev => ({
                            ...prev,
                            passwordPolicy: {
                              ...prev.passwordPolicy,
                              minLength: parseInt(e.target.value) || 8
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { key: 'requireUppercase', label: 'Mayúsculas requeridas' },
                          { key: 'requireLowercase', label: 'Minúsculas requeridas' },
                          { key: 'requireNumbers', label: 'Números requeridos' },
                          { key: 'requireSpecialChars', label: 'Caracteres especiales requeridos' }
                        ].map(({ key, label }) => (
                          <label key={key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={authConfig.passwordPolicy[key as keyof typeof authConfig.passwordPolicy] as boolean}
                              onChange={(e) => setAuthConfig(prev => ({
                                ...prev,
                                passwordPolicy: {
                                  ...prev.passwordPolicy,
                                  [key]: e.target.checked
                                }
                              }))}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Autenticación Multifactor</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="mfaEnabled"
                          checked={authConfig.multiFactorAuth.enabled}
                          onChange={(e) => setAuthConfig(prev => ({
                            ...prev,
                            multiFactorAuth: {
                              ...prev.multiFactorAuth,
                              enabled: e.target.checked
                            }
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="mfaEnabled" className="text-sm font-medium text-gray-700">
                          Habilitar autenticación multifactor
                        </label>
                      </div>

                      {authConfig.multiFactorAuth.enabled && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Métodos MFA
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { value: 'sms', label: 'SMS' },
                              { value: 'email', label: 'Email' },
                              { value: 'totp', label: 'TOTP (Google Authenticator)' },
                              { value: 'backup_codes', label: 'Códigos de respaldo' }
                            ].map(({ value, label }) => (
                              <label key={value} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={authConfig.multiFactorAuth.methods.includes(value as any)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setAuthConfig(prev => ({
                                        ...prev,
                                        multiFactorAuth: {
                                          ...prev.multiFactorAuth,
                                          methods: [...prev.multiFactorAuth.methods, value as any]
                                        }
                                      }));
                                    } else {
                                      setAuthConfig(prev => ({
                                        ...prev,
                                        multiFactorAuth: {
                                          ...prev.multiFactorAuth,
                                          methods: prev.multiFactorAuth.methods.filter(m => m !== value)
                                        }
                                      }));
                                    }
                                  }}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Tipos de Usuario</h3>
                    <button
                      onClick={() => {
                        setShowUserTypeForm(true);
                        setEditingUserType(null);
                        setUserTypeForm({ name: '', description: '', permissions: [], isDefault: false });
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Añadir Tipo</span>
                    </button>
                  </div>

                  {showUserTypeForm && (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <h4 className="font-medium text-gray-900">
                        {editingUserType ? 'Editar Tipo de Usuario' : 'Nuevo Tipo de Usuario'}
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre *
                          </label>
                          <input
                            type="text"
                            value={userTypeForm.name}
                            onChange={(e) => setUserTypeForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="ej. Admin, Usuario, Moderador"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-6">
                          <input
                            type="checkbox"
                            id="isDefault"
                            checked={userTypeForm.isDefault}
                            onChange={(e) => setUserTypeForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="isDefault" className="text-sm font-medium text-gray-700">
                            Tipo por defecto
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                        </label>
                        <textarea
                          value={userTypeForm.description}
                          onChange={(e) => setUserTypeForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                          placeholder="Descripción del tipo de usuario"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Permisos (separados por comas)
                        </label>
                        <input
                          type="text"
                          value={userTypeForm.permissions.join(', ')}
                          onChange={(e) => setUserTypeForm(prev => ({ 
                            ...prev, 
                            permissions: e.target.value.split(',').map(p => p.trim()).filter(p => p)
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="ej. read, write, delete, admin"
                        />
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={editingUserType ? handleUpdateUserType : handleAddUserType}
                          disabled={!userTypeForm.name.trim()}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {editingUserType ? 'Actualizar' : 'Añadir'}
                        </button>
                        <button
                          onClick={() => {
                            setShowUserTypeForm(false);
                            setEditingUserType(null);
                            setUserTypeForm({ name: '', description: '', permissions: [], isDefault: false });
                          }}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {authConfig.userTypes.map((userType) => (
                      <div key={userType._id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-900">{userType.name}</h4>
                              {userType.isDefault && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  Por defecto
                                </span>
                              )}
                            </div>
                            {userType.description && (
                              <p className="text-sm text-gray-600 mt-1">{userType.description}</p>
                            )}
                            {userType.permissions.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {userType.permissions.map((permission, index) => (
                                  <span
                                    key={index}
                                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                  >
                                    {permission}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditUserType(userType)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => userType._id && handleDeleteUserType(userType._id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {authConfig.userTypes.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No hay tipos de usuario configurados</p>
                        <p className="text-sm">Añade tipos de usuario para definir roles y permisos</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSaving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                <span>{isSaving ? 'Guardando...' : 'Guardar Configuración'}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthConfigModal;