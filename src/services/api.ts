const API_BASE_URL = 'https://web-production-d430.up.railway.app/api';

// Función para hacer peticiones autenticadas
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const requestId = Math.random().toString(36).substr(2, 9);
  
  console.log(`🌐 [API-${requestId}] Iniciando petición a ${endpoint}`);
  console.log(`🔑 [API-${requestId}] Token disponible:`, !!token);
  console.log(`📤 [API-${requestId}] Método:`, options.method || 'GET');
  
  if (options.body) {
    console.log(`📋 [API-${requestId}] Body (raw):`, options.body);
    try {
      const parsedBody = JSON.parse(options.body as string);
      console.log(`📋 [API-${requestId}] Body (parsed):`, JSON.stringify(parsedBody, null, 2));
    } catch {
      console.log(`📋 [API-${requestId}] Body no es JSON válido`);
    }
  } else {
    console.log(`📋 [API-${requestId}] Sin body`);
  }
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  console.log(`🔧 [API-${requestId}] Configuración final:`, {
    url: `${API_BASE_URL}${endpoint}`,
    method: config.method || 'GET',
    headers: config.headers,
    hasBody: !!config.body,
    bodyLength: config.body ? (config.body as string).length : 0
  });

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    console.log(`📥 [API-${requestId}] Respuesta HTTP:`, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error(`❌ [API-${requestId}] Error del servidor:`, errorData);
      } catch {
        errorData = { message: `Error HTTP ${response.status}: ${response.statusText}` };
        console.error(`❌ [API-${requestId}] Error sin JSON:`, errorData);
      }
      throw new Error(errorData.message || `Error HTTP ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`✅ [API-${requestId}] Respuesta exitosa:`, JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error(`❌ [API-${requestId}] Error en la petición:`, error);
    console.error(`❌ [API-${requestId}] Stack trace:`, (error as Error).stack);
    throw error;
  }
};

// Servicios de autenticación
export const authService = {
  login: async (email: string, password: string) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string, name: string) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  getMe: async () => {
    return apiRequest('/auth/me');
  },

  verifyToken: async (token: string) => {
    return apiRequest('/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
};

// Servicios de proyectos
export const projectService = {
  getProjects: async () => {
    return apiRequest('/projects');
  },

  getProject: async (id: string) => {
    return apiRequest(`/projects/${id}`);
  },

  createProject: async (projectData: {
    name: string;
    description: string;
    color: string;
    colorTheme?: string[];
    techStack?: string[];
  }) => {
    return apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  updateProject: async (id: string, projectData: {
    name?: string;
    description?: string;
    status?: string;
    color?: string;
    colorTheme?: string[];
    techStack?: string[];
    githubUrl?: string;
  }) => {
    return apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  deleteProject: async (id: string) => {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  addPage: async (projectId: string, pageData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }) => {
    return apiRequest(`/projects/${projectId}/pages`, {
      method: 'POST',
      body: JSON.stringify({
        name: pageData.title,
        description: pageData.description,
        route: `/${pageData.title.toLowerCase().replace(/\s+/g, '-')}`
      }),
    });
  },

  updatePage: async (projectId: string, pageId: string, pageData: {
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    status?: 'todo' | 'in-progress' | 'done';
  }) => {
    const backendData: Record<string, unknown> = {};
    if (pageData.title !== undefined) backendData.name = pageData.title;
    if (pageData.description !== undefined) backendData.description = pageData.description;
    if (pageData.title !== undefined) backendData.route = `/${pageData.title.toLowerCase().replace(/\s+/g, '-')}`;
    
    return apiRequest(`/projects/${projectId}/pages/${pageId}`, {
      method: 'PUT',
      body: JSON.stringify(backendData),
    });
  },

  addUserStory: async (projectId: string, pageId: string, storyData: {
    title: string;
    description: string;
    acceptanceCriteria: string[];
    priority: 'low' | 'medium' | 'high';
    estimatedHours?: number;
  }) => {
    return apiRequest(`/projects/${projectId}/pages/${pageId}/stories`, {
      method: 'POST',
      body: JSON.stringify(storyData),
    });
  },

  updateUserStoryStatus: async (projectId: string, pageId: string, userStoryId: string, status: 'todo' | 'in-progress' | 'done') => {
    return apiRequest(`/projects/${projectId}/pages/${pageId}/stories/${userStoryId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Auth configuration services
  getAuthConfig: async (projectId: string) => {
    return apiRequest(`/projects/${projectId}/auth-config`);
  },

  updateAuthConfig: async (projectId: string, authConfig: {
    hasLogin?: boolean;
    authMethod?: 'none' | 'basic' | 'jwt' | 'oauth' | 'session' | 'custom';
    oauthProviders?: ('google' | 'github' | 'facebook' | 'twitter' | 'linkedin' | 'microsoft')[];
    requiresEmailVerification?: boolean;
    passwordPolicy?: {
      minLength?: number;
      requireUppercase?: boolean;
      requireLowercase?: boolean;
      requireNumbers?: boolean;
      requireSpecialChars?: boolean;
    };
    sessionTimeout?: number;
    multiFactorAuth?: {
      enabled?: boolean;
      methods?: ('sms' | 'email' | 'totp' | 'backup_codes')[];
    };
  }) => {
    console.log('🔄 [SERVICE] updateAuthConfig llamado con:', {
      projectId,
      authConfig: JSON.stringify(authConfig, null, 2)
    });
    
    if (!projectId) {
      throw new Error('Project ID es requerido');
    }
    
    if (!authConfig) {
      throw new Error('Auth config es requerido');
    }
    
    return apiRequest(`/projects/${projectId}/auth-config`, {
      method: 'PUT',
      body: JSON.stringify(authConfig),
    });
  },

  addUserType: async (projectId: string, userType: {
    name: string;
    description?: string;
    permissions?: string[];
    isDefault?: boolean;
  }) => {
    return apiRequest(`/projects/${projectId}/auth-config/user-types`, {
      method: 'POST',
      body: JSON.stringify(userType),
    });
  },

  updateUserType: async (projectId: string, userTypeId: string, userType: {
    name?: string;
    description?: string;
    permissions?: string[];
    isDefault?: boolean;
  }) => {
    return apiRequest(`/projects/${projectId}/auth-config/user-types/${userTypeId}`, {
      method: 'PUT',
      body: JSON.stringify(userType),
    });
  },

  deleteUserType: async (projectId: string, userTypeId: string) => {
    return apiRequest(`/projects/${projectId}/auth-config/user-types/${userTypeId}`, {
      method: 'DELETE',
    });
  },

  generatePages: async (projectId: string) => {
    return apiRequest(`/projects/${projectId}/generate-pages`, {
      method: 'POST'
    });
  },
  
  generateAdditionalPages: async (projectId: string, existingPages: unknown[]) => {
    return apiRequest(`/projects/${projectId}/generate-additional-pages`, {
      method: 'POST',
      body: JSON.stringify({ existingPages })
    });
  },

  addMultiplePages: async (projectId: string, pages: unknown[]) => {
    return apiRequest(`/projects/${projectId}/multiple-pages`, {
      method: 'POST',
      body: JSON.stringify({ pages })
    });
  },

  // Nueva función para generar prompt inicial
  generarPromptInicial: async (projectId: string) => {
    return apiRequest(`/projects/${projectId}/generar-prompt-inicial`, {
      method: 'GET'
    });
  },

  // Nueva función para generar historias de usuario con IA
  generateUserStories: async (projectId: string, pageId: string) => {
    return apiRequest(`/projects/${projectId}/pages/${pageId}/generate-user-stories`, {
      method: 'POST'
    });
  },

  // Nueva función para guardar múltiples user stories
  saveMultipleUserStories: async (projectId: string, pageId: string, userStories: unknown[]) => {
    return apiRequest(`/projects/${projectId}/pages/${pageId}/user-stories/save-multiple`, {
      method: 'POST',
      body: JSON.stringify({ userStories })
    });
  },

  // Nueva función para generar historias de usuario para todo el proyecto
  generateUserStoriesForProject: async (projectId: string) => {
    return apiRequest(`/projects/${projectId}/generate-user-stories-completo`, {
      method: 'POST'
    });
  },

  // Nueva función para generar historias de usuario personalizadas
  generateUserStoriesPersonal: async (projectId: string, pageId: string, data: {
    storyCount: number;
    strategicImpact: 'core' | 'high-impact' | 'nice-to-have' | 'competitive-risk';
    comments?: string;
  }) => {
    return apiRequest(`/projects/${projectId}/pages/${pageId}/generate-user-stories-personal`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
};

// Servicios de usuarios
export const userService = {
  getProfile: async () => {
    return apiRequest('/users/profile');
  },

  updateProfile: async (profileData: {
    name?: string;
    email?: string;
  }) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return apiRequest('/users/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  },

  getStats: async () => {
    return apiRequest('/users/stats');
  },
};

export default apiRequest;