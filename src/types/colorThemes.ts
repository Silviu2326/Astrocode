export interface ColorTheme {
  name: string;
  // Colores principales
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryHover: string;
  secondaryLight: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  
  // Backgrounds
  background: string;
  backgroundSecondary: string;
  surface: string;
  card: string;
  overlay: string;
  
  // Textos
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  
  // Estados
  success: string;
  successLight: string;
  successDark: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  error: string;
  errorLight: string;
  errorDark: string;
  info: string;
  infoLight: string;
  infoDark: string;
  
  // Utilidades
  muted: string;
  border: string;
  borderLight: string;
  focus: string;
  disabled: string;
  shadow: string;
  
  // Gradientes
  gradientStart: string;
  gradientEnd: string;
}

export const predefinedThemes: ColorTheme[] = [
  {
    name: 'Default',
    // Principales
    primary: '#3B82F6',
    primaryHover: '#2563EB',
    primaryLight: '#93C5FD',
    primaryDark: '#1D4ED8',
    secondary: '#10B981',
    secondaryHover: '#059669',
    secondaryLight: '#6EE7B7',
    accent: '#F59E0B',
    accentHover: '#D97706',
    accentLight: '#FCD34D',
    
    // Backgrounds
    background: '#0F172A',
    backgroundSecondary: '#1E293B',
    surface: '#334155',
    card: '#475569',
    overlay: '#64748B80',
    
    // Textos
    text: '#F8FAFC',
    textSecondary: '#E2E8F0',
    textMuted: '#94A3B8',
    textInverse: '#0F172A',
    
    // Estados
    success: '#10B981',
    successLight: '#6EE7B7',
    successDark: '#047857',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#1D4ED8',
    
    // Utilidades
    muted: '#6B7280',
    border: '#374151',
    borderLight: '#4B5563',
    focus: '#8B5CF6',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#3B82F6',
    gradientEnd: '#8B5CF6'
  },
  {
    name: 'Emerald',
    // Principales
    primary: '#10B981',
    primaryHover: '#059669',
    primaryLight: '#6EE7B7',
    primaryDark: '#047857',
    secondary: '#06B6D4',
    secondaryHover: '#0891B2',
    secondaryLight: '#67E8F9',
    accent: '#34D399',
    accentHover: '#10B981',
    accentLight: '#A7F3D0',
    
    // Backgrounds
    background: '#064E3B',
    backgroundSecondary: '#065F46',
    surface: '#047857',
    card: '#059669',
    overlay: '#10B98180',
    
    // Textos
    text: '#ECFDF5',
    textSecondary: '#D1FAE5',
    textMuted: '#A7F3D0',
    textInverse: '#064E3B',
    
    // Estados
    success: '#22C55E',
    successLight: '#86EFAC',
    successDark: '#15803D',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#06B6D4',
    infoLight: '#67E8F9',
    infoDark: '#0891B2',
    
    // Utilidades
    muted: '#6B7280',
    border: '#065F46',
    borderLight: '#047857',
    focus: '#34D399',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#10B981',
    gradientEnd: '#06B6D4'
  },
  {
    name: 'Rose',
    // Principales
    primary: '#E11D48',
    primaryHover: '#BE123C',
    primaryLight: '#FB7185',
    primaryDark: '#9F1239',
    secondary: '#EC4899',
    secondaryHover: '#DB2777',
    secondaryLight: '#F9A8D4',
    accent: '#F43F5E',
    accentHover: '#E11D48',
    accentLight: '#FDA4AF',
    
    // Backgrounds
    background: '#4C0519',
    backgroundSecondary: '#881337',
    surface: '#9F1239',
    card: '#BE123C',
    overlay: '#E11D4880',
    
    // Textos
    text: '#FFF1F2',
    textSecondary: '#FECDD3',
    textMuted: '#FDA4AF',
    textInverse: '#4C0519',
    
    // Estados
    success: '#10B981',
    successLight: '#6EE7B7',
    successDark: '#047857',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#DC2626',
    errorLight: '#FCA5A5',
    errorDark: '#991B1B',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#1D4ED8',
    
    // Utilidades
    muted: '#6B7280',
    border: '#881337',
    borderLight: '#9F1239',
    focus: '#F43F5E',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#E11D48',
    gradientEnd: '#EC4899'
  },
  {
    name: 'Purple',
    // Principales
    primary: '#8B5CF6',
    primaryHover: '#7C3AED',
    primaryLight: '#C4B5FD',
    primaryDark: '#6D28D9',
    secondary: '#A855F7',
    secondaryHover: '#9333EA',
    secondaryLight: '#D8B4FE',
    accent: '#A78BFA',
    accentHover: '#8B5CF6',
    accentLight: '#DDD6FE',
    
    // Backgrounds
    background: '#2E1065',
    backgroundSecondary: '#4C1D95',
    surface: '#5B21B6',
    card: '#6D28D9',
    overlay: '#8B5CF680',
    
    // Textos
    text: '#FAF5FF',
    textSecondary: '#E9D5FF',
    textMuted: '#C4B5FD',
    textInverse: '#2E1065',
    
    // Estados
    success: '#10B981',
    successLight: '#6EE7B7',
    successDark: '#047857',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#06B6D4',
    infoLight: '#67E8F9',
    infoDark: '#0891B2',
    
    // Utilidades
    muted: '#6B7280',
    border: '#5B21B6',
    borderLight: '#6D28D9',
    focus: '#A78BFA',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#8B5CF6',
    gradientEnd: '#A855F7'
  },
  {
    name: 'Ocean',
    // Principales
    primary: '#0EA5E9',
    primaryHover: '#0284C7',
    primaryLight: '#7DD3FC',
    primaryDark: '#0369A1',
    secondary: '#06B6D4',
    secondaryHover: '#0891B2',
    secondaryLight: '#67E8F9',
    accent: '#38BDF8',
    accentHover: '#0EA5E9',
    accentLight: '#BAE6FD',
    
    // Backgrounds
    background: '#0C4A6E',
    backgroundSecondary: '#075985',
    surface: '#0369A1',
    card: '#0284C7',
    overlay: '#0EA5E980',
    
    // Textos
    text: '#F0F9FF',
    textSecondary: '#E0F2FE',
    textMuted: '#BAE6FD',
    textInverse: '#0C4A6E',
    
    // Estados
    success: '#10B981',
    successLight: '#6EE7B7',
    successDark: '#047857',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#06B6D4',
    infoLight: '#67E8F9',
    infoDark: '#0891B2',
    
    // Utilidades
    muted: '#64748B',
    border: '#1E293B',
    borderLight: '#334155',
    focus: '#38BDF8',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#0EA5E9',
    gradientEnd: '#06B6D4'
  },
  {
    name: 'Sunset',
    // Principales
    primary: '#F97316',
    primaryHover: '#EA580C',
    primaryLight: '#FDBA74',
    primaryDark: '#C2410C',
    secondary: '#EF4444',
    secondaryHover: '#DC2626',
    secondaryLight: '#FCA5A5',
    accent: '#FB923C',
    accentHover: '#F97316',
    accentLight: '#FED7AA',
    
    // Backgrounds
    background: '#7C2D12',
    backgroundSecondary: '#9A3412',
    surface: '#C2410C',
    card: '#EA580C',
    overlay: '#F9731680',
    
    // Textos
    text: '#FFF7ED',
    textSecondary: '#FFEDD5',
    textMuted: '#FED7AA',
    textInverse: '#7C2D12',
    
    // Estados
    success: '#10B981',
    successLight: '#6EE7B7',
    successDark: '#047857',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#1D4ED8',
    
    // Utilidades
    muted: '#78716C',
    border: '#44403C',
    borderLight: '#57534E',
    focus: '#FB923C',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#F97316',
    gradientEnd: '#EF4444'
  },
  {
    name: 'Forest',
    // Principales
    primary: '#16A34A',
    primaryHover: '#15803D',
    primaryLight: '#86EFAC',
    primaryDark: '#14532D',
    secondary: '#059669',
    secondaryHover: '#047857',
    secondaryLight: '#6EE7B7',
    accent: '#84CC16',
    accentHover: '#65A30D',
    accentLight: '#BEF264',
    
    // Backgrounds
    background: '#052E16',
    backgroundSecondary: '#14532D',
    surface: '#166534',
    card: '#15803D',
    overlay: '#16A34A80',
    
    // Textos
    text: '#F0FDF4',
    textSecondary: '#DCFCE7',
    textMuted: '#BBF7D0',
    textInverse: '#052E16',
    
    // Estados
    success: '#22C55E',
    successLight: '#86EFAC',
    successDark: '#15803D',
    warning: '#EAB308',
    warningLight: '#FDE047',
    warningDark: '#A16207',
    error: '#DC2626',
    errorLight: '#FCA5A5',
    errorDark: '#991B1B',
    info: '#0891B2',
    infoLight: '#67E8F9',
    infoDark: '#164E63',
    
    // Utilidades
    muted: '#6B7280',
    border: '#166534',
    borderLight: '#15803D',
    focus: '#84CC16',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#16A34A',
    gradientEnd: '#84CC16'
  },
  {
    name: 'Midnight',
    // Principales
    primary: '#6366F1',
    primaryHover: '#4F46E5',
    primaryLight: '#A5B4FC',
    primaryDark: '#3730A3',
    secondary: '#8B5CF6',
    secondaryHover: '#7C3AED',
    secondaryLight: '#C4B5FD',
    accent: '#06B6D4',
    accentHover: '#0891B2',
    accentLight: '#67E8F9',
    
    // Backgrounds
    background: '#0F0F23',
    backgroundSecondary: '#1E1B4B',
    surface: '#312E81',
    card: '#3730A3',
    overlay: '#6366F180',
    
    // Textos
    text: '#F8FAFC',
    textSecondary: '#E2E8F0',
    textMuted: '#94A3B8',
    textInverse: '#0F0F23',
    
    // Estados
    success: '#10B981',
    successLight: '#6EE7B7',
    successDark: '#047857',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#06B6D4',
    infoLight: '#67E8F9',
    infoDark: '#0891B2',
    
    // Utilidades
    muted: '#64748B',
    border: '#312E81',
    borderLight: '#3730A3',
    focus: '#A5B4FC',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#6366F1',
    gradientEnd: '#8B5CF6'
  },
  {
    name: 'Coral',
    // Principales
    primary: '#FF6B6B',
    primaryHover: '#FF5252',
    primaryLight: '#FFCDD2',
    primaryDark: '#D32F2F',
    secondary: '#FF9800',
    secondaryHover: '#F57C00',
    secondaryLight: '#FFE0B2',
    accent: '#FF4081',
    accentHover: '#E91E63',
    accentLight: '#F8BBD9',
    
    // Backgrounds
    background: '#3E2723',
    backgroundSecondary: '#5D4037',
    surface: '#795548',
    card: '#8D6E63',
    overlay: '#FF6B6B80',
    
    // Textos
    text: '#FAFAFA',
    textSecondary: '#F5F5F5',
    textMuted: '#E0E0E0',
    textInverse: '#3E2723',
    
    // Estados
    success: '#4CAF50',
    successLight: '#C8E6C9',
    successDark: '#2E7D32',
    warning: '#FF9800',
    warningLight: '#FFE0B2',
    warningDark: '#F57C00',
    error: '#F44336',
    errorLight: '#FFCDD2',
    errorDark: '#D32F2F',
    info: '#2196F3',
    infoLight: '#BBDEFB',
    infoDark: '#1976D2',
    
    // Utilidades
    muted: '#9E9E9E',
    border: '#795548',
    borderLight: '#8D6E63',
    focus: '#FF4081',
    disabled: '#BDBDBD',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#FF6B6B',
    gradientEnd: '#FF9800'
  },
  {
    name: 'Arctic',
    // Principales
    primary: '#0EA5E9',
    primaryHover: '#0284C7',
    primaryLight: '#7DD3FC',
    primaryDark: '#0369A1',
    secondary: '#06B6D4',
    secondaryHover: '#0891B2',
    secondaryLight: '#67E8F9',
    accent: '#38BDF8',
    accentHover: '#0EA5E9',
    accentLight: '#BAE6FD',
    
    // Backgrounds
    background: '#0F172A',
    backgroundSecondary: '#1E293B',
    surface: '#334155',
    card: '#475569',
    overlay: '#0EA5E980',
    
    // Textos
    text: '#F0F9FF',
    textSecondary: '#E0F2FE',
    textMuted: '#BAE6FD',
    textInverse: '#0F172A',
    
    // Estados
    success: '#10B981',
    successLight: '#6EE7B7',
    successDark: '#047857',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#06B6D4',
    infoLight: '#67E8F9',
    infoDark: '#0891B2',
    
    // Utilidades
    muted: '#64748B',
    border: '#334155',
    borderLight: '#475569',
    focus: '#38BDF8',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#0EA5E9',
    gradientEnd: '#06B6D4'
  },
  {
    name: 'Lavender',
    // Principales
    primary: '#A855F7',
    primaryHover: '#9333EA',
    primaryLight: '#D8B4FE',
    primaryDark: '#7C2D12',
    secondary: '#EC4899',
    secondaryHover: '#DB2777',
    secondaryLight: '#F9A8D4',
    accent: '#F472B6',
    accentHover: '#EC4899',
    accentLight: '#FBCFE8',
    
    // Backgrounds
    background: '#2E1065',
    backgroundSecondary: '#4C1D95',
    surface: '#5B21B6',
    card: '#6D28D9',
    overlay: '#A855F780',
    
    // Textos
    text: '#FAF5FF',
    textSecondary: '#E9D5FF',
    textMuted: '#C4B5FD',
    textInverse: '#2E1065',
    
    // Estados
    success: '#10B981',
    successLight: '#6EE7B7',
    successDark: '#047857',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#06B6D4',
    infoLight: '#67E8F9',
    infoDark: '#0891B2',
    
    // Utilidades
    muted: '#6B7280',
    border: '#5B21B6',
    borderLight: '#6D28D9',
    focus: '#F472B6',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#A855F7',
    gradientEnd: '#EC4899'
  },
  {
    name: 'Autumn',
    // Principales
    primary: 'Crimson',
    // Principales
    primary: '#DC143C',
    primaryHover: '#B91C1C',
    primaryLight: '#FCA5A5',
    primaryDark: '#7F1D1D',
    secondary: '#EF4444',
    secondaryHover: '#DC2626',
    secondaryLight: '#FEE2E2',
    accent: '#F87171',
    accentHover: '#EF4444',
    accentLight: '#FECACA',
    
    // Backgrounds
    background: '#450A0A',
    backgroundSecondary: '#7F1D1D',
    surface: '#991B1B',
    card: '#B91C1C',
    overlay: '#DC143C80',
    
    // Textos
    text: '#FEF2F2',
    textSecondary: '#FEE2E2',
    textMuted: '#FECACA',
    textInverse: '#450A0A',
    
    // Estados
    success: '#16A34A',
    successLight: '#86EFAC',
    successDark: '#15803D',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#DC143C',
    errorLight: '#FCA5A5',
    errorDark: '#7F1D1D',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#1D4ED8',
    
    // Utilidades
    muted: '#78716C',
    border: '#991B1B',
    borderLight: '#B91C1C',
    focus: '#F87171',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#DC143C',
    gradientEnd: '#EF4444'
  },
  {
    name: 'Golden',
    // Principales
    primary: '#F59E0B',
    primaryHover: '#D97706',
    primaryLight: '#FCD34D',
    primaryDark: '#92400E',
    secondary: '#FBBF24',
    secondaryHover: '#F59E0B',
    secondaryLight: '#FEF3C7',
    accent: '#FDE047',
    accentHover: '#FACC15',
    accentLight: '#FEFCE8',
    
    // Backgrounds
    background: '#451A03',
    backgroundSecondary: '#78350F',
    surface: '#92400E',
    card: '#B45309',
    overlay: '#F59E0B80',
    
    // Textos
    text: '#FFFBEB',
    textSecondary: '#FEF3C7',
    textMuted: '#FDE68A',
    textInverse: '#451A03',
    
    // Estados
    success: '#16A34A',
    successLight: '#86EFAC',
    successDark: '#15803D',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#1D4ED8',
    
    // Utilidades
    muted: '#78716C',
    border: '#92400E',
    borderLight: '#B45309',
    focus: '#FDE047',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#F59E0B',
    gradientEnd: '#FBBF24'
  },
  {
    name: 'Sapphire',
    // Principales
    primary: '#1E40AF',
    primaryHover: '#1E3A8A',
    primaryLight: '#93C5FD',
    primaryDark: '#1E3A8A',
    secondary: '#3B82F6',
    secondaryHover: '#2563EB',
    secondaryLight: '#DBEAFE',
    accent: '#60A5FA',
    accentHover: '#3B82F6',
    accentLight: '#BFDBFE',
    
    // Backgrounds
    background: '#0C1E3E',
    backgroundSecondary: '#1E3A8A',
    surface: '#1E40AF',
    card: '#2563EB',
    overlay: '#1E40AF80',
    
    // Textos
    text: '#EFF6FF',
    textSecondary: '#DBEAFE',
    textMuted: '#BFDBFE',
    textInverse: '#0C1E3E',
    
    // Estados
    success: '#16A34A',
    successLight: '#86EFAC',
    successDark: '#15803D',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#1E40AF',
    infoLight: '#93C5FD',
    infoDark: '#1E3A8A',
    
    // Utilidades
    muted: '#64748B',
    border: '#1E40AF',
    borderLight: '#2563EB',
    focus: '#60A5FA',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#1E40AF',
    gradientEnd: '#3B82F6'
  },
  {
    name: 'Emerald',
    // Principales
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: '#6EE7B7',
    primaryDark: '#064E3B',
    secondary: '#10B981',
    secondaryHover: '#059669',
    secondaryLight: '#D1FAE5',
    accent: '#34D399',
    accentHover: '#10B981',
    accentLight: '#A7F3D0',
    
    // Backgrounds
    background: '#022C22',
    backgroundSecondary: '#064E3B',
    surface: '#065F46',
    card: '#047857',
    overlay: '#05966980',
    
    // Textos
    text: '#ECFDF5',
    textSecondary: '#D1FAE5',
    textMuted: '#A7F3D0',
    textInverse: '#022C22',
    
    // Estados
    success: '#059669',
    successLight: '#6EE7B7',
    successDark: '#047857',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#1D4ED8',
    
    // Utilidades
    muted: '#6B7280',
    border: '#065F46',
    borderLight: '#047857',
    focus: '#34D399',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#059669',
    gradientEnd: '#10B981'
  },
  {
    name: 'Magenta',
    // Principales
    primary: '#C026D3',
    primaryHover: '#A21CAF',
    primaryLight: '#F0ABFC',
    primaryDark: '#86198F',
    secondary: '#E879F9',
    secondaryHover: '#D946EF',
    secondaryLight: '#F5D0FE',
    accent: '#F472B6',
    accentHover: '#EC4899',
    accentLight: '#FBCFE8',
    
    // Backgrounds
    background: '#4A044E',
    backgroundSecondary: '#701A75',
    surface: '#86198F',
    card: '#A21CAF',
    overlay: '#C026D380',
    
    // Textos
    text: '#FDF4FF',
    textSecondary: '#F5D0FE',
    textMuted: '#F0ABFC',
    textInverse: '#4A044E',
    
    // Estados
    success: '#16A34A',
    successLight: '#86EFAC',
    successDark: '#15803D',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#1D4ED8',
    
    // Utilidades
    muted: '#78716C',
    border: '#86198F',
    borderLight: '#A21CAF',
    focus: '#F472B6',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#C026D3',
    gradientEnd: '#E879F9'
  },
  {
    name: 'Copper',
    // Principales
    primary: '#B45309',
    primaryHover: '#92400E',
    primaryLight: '#FDBA74',
    primaryDark: '#78350F',
    secondary: '#EA580C',
    secondaryHover: '#C2410C',
    secondaryLight: '#FED7AA',
    accent: '#FB923C',
    accentHover: '#EA580C',
    accentLight: '#FFEDD5',
    
    // Backgrounds
    background: '#431407',
    backgroundSecondary: '#78350F',
    surface: '#92400E',
    card: '#B45309',
    overlay: '#B4530980',
    
    // Textos
    text: '#FFF7ED',
    textSecondary: '#FFEDD5',
    textMuted: '#FED7AA',
    textInverse: '#431407',
    
    // Estados
    success: '#16A34A',
    successLight: '#86EFAC',
    successDark: '#15803D',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#1D4ED8',
    
    // Utilidades
    muted: '#78716C',
    border: '#92400E',
    borderLight: '#B45309',
    focus: '#FB923C',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#B45309',
    gradientEnd: '#EA580C'
  },
  {
    name: 'Slate',
    // Principales
    primary: '#475569',
    primaryHover: '#334155',
    primaryLight: '#94A3B8',
    primaryDark: '#1E293B',
    secondary: '#64748B',
    secondaryHover: '#475569',
    secondaryLight: '#CBD5E1',
    accent: '#94A3B8',
    accentHover: '#64748B',
    accentLight: '#E2E8F0',
    
    // Backgrounds
    background: '#020617',
    backgroundSecondary: '#0F172A',
    surface: '#1E293B',
    card: '#334155',
    overlay: '#47556980',
    
    // Textos
    text: '#F8FAFC',
    textSecondary: '#F1F5F9',
    textMuted: '#CBD5E1',
    textInverse: '#020617',
    
    // Estados
    success: '#16A34A',
    successLight: '#86EFAC',
    successDark: '#15803D',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#1D4ED8',
    
    // Utilidades
    muted: '#64748B',
    border: '#334155',
    borderLight: '#475569',
    focus: '#94A3B8',
    disabled: '#9CA3AF',
    shadow: '#00000040',
    
    // Gradientes
    gradientStart: '#475569',
    gradientEnd: '#64748B'
  },
  {
    name: 'Neon',
    // Principales
    primary: '#00FF88',
    primaryHover: '#00E676',
    primaryLight: '#B9F6CA',
    primaryDark: '#00C853',
    secondary: '#FF1744',
    secondaryHover: '#D50000',
    secondaryLight: '#FFCDD2',
    accent: '#00E5FF',
    accentHover: '#00B8D4',
    accentLight: '#B3E5FC',
    
    // Backgrounds
    background: '#000000',
    backgroundSecondary: '#121212',
    surface: '#1E1E1E',
    card: '#2C2C2C',
    overlay: '#00FF8880',
    
    // Textos
    text: '#FFFFFF',
    textSecondary: '#E0E0E0',
    textMuted: '#BDBDBD',
    textInverse: '#000000',
    
    // Estados
    success: '#00FF88',
    successLight: '#B9F6CA',
    successDark: '#00C853',
    warning: '#FFD600',
    warningLight: '#FFF9C4',
    warningDark: '#FF8F00',
    error: '#FF1744',
    errorLight: '#FFCDD2',
    errorDark: '#D50000',
    info: '#00E5FF',
    infoLight: '#B3E5FC',
    infoDark: '#00B8D4',
    
    // Utilidades
    muted: '#757575',
    border: '#424242',
    borderLight: '#616161',
    focus: '#00E5FF',
    disabled: '#9E9E9E',
    shadow: '#00000080',
    
    // Gradientes
    gradientStart: '#00FF88',
    gradientEnd: '#00E5FF'
  }
];