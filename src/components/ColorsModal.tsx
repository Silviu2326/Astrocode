
import React, { useState, useEffect, useRef } from 'react';
import { X, Palette, Eye, Paintbrush, Plus, Copy, Star, Heart, Settings, Save } from 'lucide-react';
import { gsap } from 'gsap';
import { ColorTheme, predefinedThemes } from '../types/colorThemes';
import { projectService } from '../services/api';

interface ColorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (newConfig: string) => void;
  projectId?: string; // Nuevo prop para el ID del proyecto
}

interface ColorTheme {
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

export default function ColorsModal({ isOpen, onClose, onSave, projectId }: ColorsModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme | null>(null);
  const [customColors, setCustomColors] = useState<Record<string, string>>({});
  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('#FFFFFF');
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && predefinedThemes.length > 0) {
      handleThemeChange(predefinedThemes[0]);
    }
  }, [isOpen]);

  const handleThemeChange = (theme: ColorTheme) => {
    setSelectedTheme(theme);
    setCustomColors({
      primary: theme.primary,
      primaryHover: theme.primaryHover,
      primaryLight: theme.primaryLight,
      primaryDark: theme.primaryDark,
      secondary: theme.secondary,
      secondaryHover: theme.secondaryHover,
      secondaryLight: theme.secondaryLight,
      accent: theme.accent,
      accentHover: theme.accentHover,
      accentLight: theme.accentLight,
      background: theme.background,
      backgroundSecondary: theme.backgroundSecondary,
      surface: theme.surface,
      card: theme.card,
      overlay: theme.overlay,
      text: theme.text,
      textSecondary: theme.textSecondary,
      textMuted: theme.textMuted,
      textInverse: theme.textInverse,
      success: theme.success,
      successLight: theme.successLight,
      successDark: theme.successDark,
      warning: theme.warning,
      warningLight: theme.warningLight,
      warningDark: theme.warningDark,
      error: theme.error,
      errorLight: theme.errorLight,
      errorDark: theme.errorDark,
      info: theme.info,
      infoLight: theme.infoLight,
      infoDark: theme.infoDark,
      muted: theme.muted,
      border: theme.border,
      borderLight: theme.borderLight,
      focus: theme.focus,
      disabled: theme.disabled,
      shadow: theme.shadow,
      gradientStart: theme.gradientStart,
      gradientEnd: theme.gradientEnd
    });
    gsap.fromTo(previewRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  };

  

  const generateTailwindConfig = () => {
    const colors = { ...customColors };
    
    return `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '480px',      // Móviles pequeños
        'sm': '640px',      // Móviles grandes
        'md': '768px',      // Tablets
        'lg': '1024px',     // Laptops
        'xl': '1280px',     // Desktops
        '2xl': '1536px',    // Pantallas grandes
        '3xl': '1600px',    // Extra grandes
        '4xl': '1920px',    // Full HD
        '5xl': '2560px',    // 2K
        '6xl': '3840px',    // 4K
        // Breakpoints de altura
        'h-sm': { 'raw': '(min-height: 640px)' },
        'h-md': { 'raw': '(min-height: 768px)' },
        'h-lg': { 'raw': '(min-height: 1024px)' },
        'h-xl': { 'raw': '(min-height: 1280px)' },
        // Breakpoints para orientación
        'portrait': { 'raw': '(orientation: portrait)' },
        'landscape': { 'raw': '(orientation: landscape)' },
        // Breakpoints para densidad de píxeles
        'retina': { 'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)' },
      },
      colors: ${JSON.stringify(colors, null, 8)},
      backgroundImage: {
        'gradient-primary': \`linear-gradient(135deg, \${colors.gradientStart} 0%, \${colors.gradientEnd} 100%)\`,
        'gradient-secondary': \`linear-gradient(45deg, \${colors.secondary} 0%, \${colors.accent} 100%)\`,
        'gradient-surface': \`linear-gradient(180deg, \${colors.surface} 0%, \${colors.card} 100%)\`
      }
    },
  },
  plugins: [],
};
`;
  };

  // Nueva función para guardar la paleta de colores en el backend
const handleSaveColorPalette = async () => {
  if (!projectId) {
    setSaveMessage('Error: No se ha especificado un proyecto');
    return;
  }

  setIsLoading(true);
  setSaveMessage('');

  try {
    // Estructurar los datos según el esquema del backend (campos planos)
    const colorPaletteData = {
      name: selectedTheme?.name || 'Custom Palette',
      description: `Paleta de colores personalizada basada en ${selectedTheme?.name || 'tema personalizado'}`,
      // Colores primarios
      primary: customColors.primary,
      primaryHover: customColors.primaryHover,
      primaryLight: customColors.primaryLight,
      primaryDark: customColors.primaryDark,
      // Colores secundarios
      secondary: customColors.secondary,
      secondaryHover: customColors.secondaryHover,
      secondaryLight: customColors.secondaryLight,
      // Colores de acento
      accent: customColors.accent,
      accentHover: customColors.accentHover,
      accentLight: customColors.accentLight,
      // Colores de fondo
      background: customColors.background,
      backgroundSecondary: customColors.backgroundSecondary,
      surface: customColors.surface,
      card: customColors.card,
      overlay: customColors.overlay,
      // Colores de texto
      text: customColors.text,
      textSecondary: customColors.textSecondary,
      textMuted: customColors.textMuted,
      textInverse: customColors.textInverse,
      // Colores de estado
      success: customColors.success,
      successLight: customColors.successLight,
      successDark: customColors.successDark,
      warning: customColors.warning,
      warningLight: customColors.warningLight,
      warningDark: customColors.warningDark,
      error: customColors.error,
      errorLight: customColors.errorLight,
      errorDark: customColors.errorDark,
      info: customColors.info,
      infoLight: customColors.infoLight,
      infoDark: customColors.infoDark,
      // Colores utilitarios
      muted: customColors.muted,
      border: customColors.border,
      borderLight: customColors.borderLight,
      focus: customColors.focus,
      disabled: customColors.disabled,
      shadow: customColors.shadow,
      // Gradientes
      gradientStart: customColors.gradientStart,
      gradientEnd: customColors.gradientEnd,
      // Colores personalizados como Map
      customColors: new Map(
        Object.entries(customColors)
          .filter(([name]) => ![
            'primary', 'primaryLight', 'primaryDark', 'primaryHover',
            'secondary', 'secondaryLight', 'secondaryHover',
            'accent', 'accentLight', 'accentHover',
            'background', 'backgroundSecondary', 'surface', 'card', 'overlay',
            'text', 'textSecondary', 'textMuted', 'textInverse',
            'success', 'successLight', 'successDark',
            'warning', 'warningLight', 'warningDark',
            'error', 'errorLight', 'errorDark',
            'info', 'infoLight', 'infoDark',
            'muted', 'border', 'borderLight', 'focus', 'disabled', 'shadow',
            'gradientStart', 'gradientEnd'
          ].includes(name))
      )
    };

    // Intentar actualizar primero, si falla, crear nueva
    try {
      await projectService.updateColorPalette(projectId, colorPaletteData);
      setSaveMessage('✅ Paleta de colores actualizada exitosamente');
    } catch (updateError) {
      // Si la actualización falla, intentar crear nueva
      await projectService.addColorPalette(projectId, colorPaletteData);
      setSaveMessage('✅ Paleta de colores guardada exitosamente');
    }

    // Llamar al callback original si existe
    if (onSave) {
      onSave(generateTailwindConfig());
    }

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => setSaveMessage(''), 3000);

  } catch (error) {
    console.error('Error guardando paleta de colores:', error);
    setSaveMessage('❌ Error al guardar la paleta de colores');
    setTimeout(() => setSaveMessage(''), 5000);
  } finally {
    setIsLoading(false);
  }
};
  // Nueva función para cargar paleta existente del proyecto
  const loadProjectColorPalette = async () => {
    if (!projectId) return;

    try {
      const project = await projectService.getProject(projectId);
      if (project.data?.colorPalette) {
        const palette = project.data.colorPalette;
        
        // Mapear los datos del backend al formato del componente
        const mappedColors = {
          primary: palette.primary?.main || '#3B82F6',
          primaryLight: palette.primary?.light || '#60A5FA',
          primaryDark: palette.primary?.dark || '#1D4ED8',
          primaryHover: palette.primary?.main || '#3B82F6',
          secondary: palette.secondary?.main || '#6B7280',
          secondaryLight: palette.secondary?.light || '#9CA3AF',
          secondaryHover: palette.secondary?.main || '#6B7280',
          accent: palette.accent?.main || '#F59E0B',
          accentLight: palette.accent?.light || '#FCD34D',
          accentHover: palette.accent?.main || '#F59E0B',
          background: palette.background?.primary || '#FFFFFF',
          backgroundSecondary: palette.background?.secondary || '#F9FAFB',
          surface: palette.background?.paper || '#FFFFFF',
          card: palette.background?.default || '#FFFFFF',
          overlay: palette.utility?.overlay || 'rgba(0,0,0,0.5)',
          text: palette.text?.primary || '#111827',
          textSecondary: palette.text?.secondary || '#6B7280',
          textMuted: palette.text?.hint || '#9CA3AF',
          textInverse: palette.primary?.contrastText || '#FFFFFF',
          success: palette.status?.success || '#10B981',
          successLight: '#6EE7B7',
          successDark: '#047857',
          warning: palette.status?.warning || '#F59E0B',
          warningLight: '#FCD34D',
          warningDark: '#D97706',
          error: palette.status?.error || '#EF4444',
          errorLight: '#FCA5A5',
          errorDark: '#DC2626',
          info: palette.status?.info || '#3B82F6',
          infoLight: '#93C5FD',
          infoDark: '#1D4ED8',
          muted: '#6B7280',
          border: palette.utility?.border || '#E5E7EB',
          borderLight: palette.utility?.divider || '#F3F4F6',
          focus: '#3B82F6',
          disabled: '#D1D5DB',
          shadow: palette.utility?.shadow || 'rgba(0,0,0,0.1)',
          gradientStart: palette.primary?.main || '#3B82F6',
          gradientEnd: palette.accent?.main || '#F59E0B'
        };

        // Añadir colores personalizados
        if (palette.customColors && Array.isArray(palette.customColors)) {
          palette.customColors.forEach((customColor: any) => {
            if (customColor.name && customColor.value) {
              mappedColors[customColor.name] = customColor.value;
            }
          });
        }

        setCustomColors(mappedColors);
        
        // Crear un tema temporal para la visualización
        const tempTheme = {
          name: palette.name || 'Proyecto Actual',
          ...mappedColors
        };
        setSelectedTheme(tempTheme);
      }
    } catch (error) {
      console.error('Error cargando paleta del proyecto:', error);
    }
  };

  // Cargar paleta del proyecto al abrir el modal
  useEffect(() => {
    if (isOpen && projectId) {
      loadProjectColorPalette();
    } else if (isOpen && predefinedThemes.length > 0) {
      handleThemeChange(predefinedThemes[0]);
    }
  }, [isOpen, projectId]);

  const handleAddColor = () => {
    if (newColorName) {
      setCustomColors(prev => ({ ...prev, [newColorName.toLowerCase()]: newColorValue }));
      setNewColorName('');
      setNewColorValue('#FFFFFF');
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-2 xs:p-4">
      <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl 3xl:max-w-[90vw] bg-gray-900/70 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl flex flex-col overflow-hidden max-h-[95vh] xs:max-h-[90vh]">
        <div className="flex items-center justify-between px-3 xs:px-4 md:px-6 py-3 xs:py-4 border-b border-white/20">
          <h3 className="text-lg xs:text-xl font-bold text-white flex items-center gap-2 xs:gap-3">
            <Palette className="h-5 w-5 xs:h-6 xs:w-6" />
            <span className="hidden xs:inline">Color Palette Manager</span>
            <span className="xs:hidden">Colors</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5 xs:h-6 xs:w-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 p-3 xs:p-4 md:p-6 gap-3 xs:gap-4 md:gap-6 overflow-hidden">
          {/* Left Panel - Theme Selection */}
          <div className="w-full lg:w-1/3 xl:w-1/4 2xl:w-1/3 space-y-3 xs:space-y-4 md:space-y-6 overflow-y-auto max-h-[40vh] lg:max-h-none">
            <div>
              <h4 className="text-base xs:text-lg font-semibold text-white mb-2 xs:mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4 xs:h-5 xs:w-5" />
                <span className="hidden sm:inline">1. Choose a Base Palette</span>
                <span className="sm:hidden">1. Base Palette</span>
              </h4>
              <div className="space-y-2 xs:space-y-3">
                {predefinedThemes.map(theme => (
                  <div
                    key={theme.name}
                    onClick={() => handleThemeChange(theme)}
                    className={`p-2 xs:p-3 md:p-4 rounded-lg cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                      selectedTheme?.name === theme.name 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <h5 className="font-bold text-white mb-2 xs:mb-3 text-sm xs:text-base">{theme.name}</h5>
                    {/* Colores principales */}
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-1 mb-2">
                      <div className="h-6 xs:h-8 rounded" style={{ backgroundColor: theme.primary }} title="Primary"></div>
                      <div className="h-6 xs:h-8 rounded" style={{ backgroundColor: theme.secondary }} title="Secondary"></div>
                      <div className="h-6 xs:h-8 rounded" style={{ backgroundColor: theme.accent }} title="Accent"></div>
                      <div className="h-6 xs:h-8 rounded" style={{ backgroundColor: theme.success }} title="Success"></div>
                      <div className="h-6 xs:h-8 rounded" style={{ backgroundColor: theme.warning }} title="Warning"></div>
                    </div>
                    {/* Backgrounds */}
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-1 mb-2">
                      <div className="h-4 xs:h-6 rounded" style={{ backgroundColor: theme.background }} title="Background"></div>
                      <div className="h-4 xs:h-6 rounded" style={{ backgroundColor: theme.surface }} title="Surface"></div>
                      <div className="h-4 xs:h-6 rounded" style={{ backgroundColor: theme.card }} title="Card"></div>
                      <div className="h-4 xs:h-6 rounded" style={{ backgroundColor: theme.error }} title="Error"></div>
                      <div className="h-4 xs:h-6 rounded" style={{ backgroundColor: theme.info }} title="Info"></div>
                    </div>
                    {/* Gradiente preview */}
                    <div 
                      className="h-3 xs:h-4 rounded mt-2" 
                      style={{ 
                        background: `linear-gradient(90deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%)` 
                      }} 
                      title="Gradient"
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-base xs:text-lg font-semibold text-white mb-2 xs:mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4 xs:h-5 xs:w-5" />
                <span className="hidden sm:inline">2. Add Custom Colors</span>
                <span className="sm:hidden">2. Custom Colors</span>
              </h4>
              <div className="space-y-2 xs:space-y-3">
                <div className="flex flex-col xs:flex-row gap-2">
                  <input 
                    type="text" 
                    value={newColorName} 
                    onChange={e => setNewColorName(e.target.value)} 
                    placeholder="Color name" 
                    className="flex-grow p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors text-sm xs:text-base" 
                  />
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={newColorValue} 
                      onChange={e => setNewColorValue(e.target.value)} 
                      className="w-10 h-8 xs:w-12 xs:h-10 p-1 rounded bg-gray-800 border border-gray-700 cursor-pointer" 
                    />
                    <button 
                      onClick={handleAddColor} 
                      className="p-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4 xs:h-6 xs:w-6" />
                    </button>
                  </div>
                </div>
                
                {/* Current Colors Display */}
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4 max-h-40 xs:max-h-60 overflow-y-auto">
                  {Object.entries(customColors).map(([name, color]) => (
                    <div key={name} className="text-center">
                      <div 
                        className="h-6 xs:h-8 w-full rounded mb-1" 
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-xs text-gray-400 capitalize truncate">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-full lg:w-2/3 xl:w-3/4 2xl:w-2/3 space-y-3 xs:space-y-4 md:space-y-6 overflow-y-auto">
            <div 
              ref={previewRef} 
              className="p-3 xs:p-4 md:p-6 rounded-lg border-2 min-h-[300px] xs:min-h-[400px] md:min-h-[500px]" 
              style={{ 
                backgroundColor: customColors.background, 
                color: customColors.text,
                borderColor: customColors.border
              }}
            >
              <h4 className="text-xl xs:text-2xl md:text-3xl font-bold mb-3 xs:mb-4 md:mb-6 flex items-center gap-2 xs:gap-3" style={{ color: customColors.primary }}>
                <Paintbrush className="h-6 w-6 xs:h-7 xs:w-7 md:h-8 md:w-8" />
                <span className="hidden sm:inline">3. Live Preview</span>
                <span className="sm:hidden">3. Preview</span>
              </h4>
              
              {/* Navigation Bar Preview */}
              <div className="mb-4 xs:mb-6 p-3 xs:p-4 rounded-lg" style={{ backgroundColor: customColors.surface }}>
                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-0">
                  <h5 className="font-bold text-sm xs:text-base" style={{ color: customColors.primary }}>Navigation</h5>
                  <div className="flex gap-2">
                    <button 
                      className="px-2 xs:px-3 py-1 rounded text-xs xs:text-sm font-medium transition-colors" 
                      style={{ 
                        backgroundColor: customColors.primary, 
                        color: customColors.textInverse 
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = customColors.primaryHover;
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = customColors.primary;
                      }}
                    >
                      Home
                    </button>
                    <button 
                      className="px-2 xs:px-3 py-1 rounded text-xs xs:text-sm transition-colors" 
                      style={{ color: customColors.textMuted }}
                    >
                      About
                    </button>
                  </div>
                </div>
              </div>

              {/* Gradient Background Card */}
              <div 
                className="mb-4 xs:mb-6 p-4 xs:p-6 rounded-lg text-center"
                style={{
                  background: `linear-gradient(135deg, ${customColors.gradientStart} 0%, ${customColors.gradientEnd} 100%)`,
                  color: customColors.textInverse
                }}
              >
                <h5 className="text-lg xs:text-xl font-bold mb-2">Gradient Background</h5>
                <p className="opacity-90 text-sm xs:text-base">Beautiful gradient using your theme colors</p>
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-4 mb-4 xs:mb-6">
                <button 
                  className="py-2 xs:py-3 px-3 xs:px-4 rounded-lg font-semibold transition-all hover:scale-105 text-sm xs:text-base" 
                  style={{ 
                    backgroundColor: customColors.primary,
                    color: customColors.textInverse
                  }}
                >
                  Primary
                </button>
                <button 
                  className="py-2 xs:py-3 px-3 xs:px-4 rounded-lg font-semibold transition-all hover:scale-105 text-sm xs:text-base" 
                  style={{ 
                    backgroundColor: customColors.secondary,
                    color: customColors.textInverse
                  }}
                >
                  Secondary
                </button>
                <button 
                  className="py-2 xs:py-3 px-3 xs:px-4 rounded-lg font-semibold transition-all hover:scale-105 text-sm xs:text-base xs:col-span-2 lg:col-span-1" 
                  style={{ 
                    backgroundColor: customColors.accent,
                    color: customColors.textInverse
                  }}
                >
                  Accent
                </button>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-4 mb-4 xs:mb-6">
                <div className="p-3 xs:p-4 rounded-lg flex items-center gap-2 xs:gap-3" style={{ backgroundColor: customColors.card, border: `2px solid ${customColors.success}` }}>
                  <div className="w-2 h-2 xs:w-3 xs:h-3 rounded-full" style={{ backgroundColor: customColors.success }}></div>
                  <div>
                    <p className="font-semibold text-sm xs:text-base" style={{ color: customColors.success }}>Success</p>
                    <p className="text-xs xs:text-sm" style={{ color: customColors.textMuted }}>Operation completed</p>
                  </div>
                </div>
                
                <div className="p-3 xs:p-4 rounded-lg flex items-center gap-2 xs:gap-3" style={{ backgroundColor: customColors.card, border: `2px solid ${customColors.warning}` }}>
                  <div className="w-2 h-2 xs:w-3 xs:h-3 rounded-full" style={{ backgroundColor: customColors.warning }}></div>
                  <div>
                    <p className="font-semibold text-sm xs:text-base" style={{ color: customColors.warning }}>Warning</p>
                    <p className="text-xs xs:text-sm" style={{ color: customColors.textMuted }}>Check required</p>
                  </div>
                </div>
                
                <div className="p-3 xs:p-4 rounded-lg flex items-center gap-2 xs:gap-3" style={{ backgroundColor: customColors.card, border: `2px solid ${customColors.error}` }}>
                  <div className="w-2 h-2 xs:w-3 xs:h-3 rounded-full" style={{ backgroundColor: customColors.error }}></div>
                  <div>
                    <p className="font-semibold text-sm xs:text-base" style={{ color: customColors.error }}>Error</p>
                    <p className="text-xs xs:text-sm" style={{ color: customColors.textMuted }}>Action failed</p>
                  </div>
                </div>
                
                <div className="p-3 xs:p-4 rounded-lg flex items-center gap-2 xs:gap-3" style={{ backgroundColor: customColors.card, border: `2px solid ${customColors.info}` }}>
                  <div className="w-2 h-2 xs:w-3 xs:h-3 rounded-full" style={{ backgroundColor: customColors.info }}></div>
                  <div>
                    <p className="font-semibold text-sm xs:text-base" style={{ color: customColors.info }}>Info</p>
                    <p className="text-xs xs:text-sm" style={{ color: customColors.textMuted }}>Additional details</p>
                  </div>
                </div>
              </div>

              {/* Surface Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 xs:gap-4 mb-4 xs:mb-6">
                <div className="p-3 xs:p-4 rounded-lg" style={{ backgroundColor: customColors.surface }}>
                  <h6 className="font-bold mb-2 text-sm xs:text-base" style={{ color: customColors.text }}>Surface Background</h6>
                  <p className="text-xs xs:text-sm" style={{ color: customColors.textSecondary }}>Content on surface background</p>
                </div>
                <div className="p-3 xs:p-4 rounded-lg" style={{ backgroundColor: customColors.backgroundSecondary }}>
                  <h6 className="font-bold mb-2 text-sm xs:text-base" style={{ color: customColors.text }}>Secondary Background</h6>
                  <p className="text-xs xs:text-sm" style={{ color: customColors.textSecondary }}>Content on secondary background</p>
                </div>
              </div>

              {/* Card Example */}
              <div className="p-4 xs:p-6 rounded-lg border" style={{ backgroundColor: customColors.card, borderColor: customColors.borderLight }}>
                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-3 xs:mb-4 gap-2 xs:gap-0">
                  <h6 className="text-lg xs:text-xl font-bold" style={{ color: customColors.primary }}>Enhanced Card</h6>
                  <div className="flex gap-2">
                    <Star className="h-4 w-4 xs:h-5 xs:w-5" style={{ color: customColors.accent }} />
                    <Heart className="h-4 w-4 xs:h-5 xs:w-5" style={{ color: customColors.error }} />
                    <Settings className="h-4 w-4 xs:h-5 xs:w-5" style={{ color: customColors.textMuted }} />
                  </div>
                </div>
                <p style={{ color: customColors.textSecondary }} className="mb-3 xs:mb-4 text-sm xs:text-base">
                  This card showcases the expanded color palette with multiple background options and enhanced visual hierarchy.
                </p>
                <div className="flex gap-1 xs:gap-2 flex-wrap">
                  <span className="px-2 xs:px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: customColors.primaryLight, color: customColors.primaryDark }}>Primary Light</span>
                  <span className="px-2 xs:px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: customColors.secondaryLight, color: customColors.background }}>Secondary Light</span>
                  <span className="px-2 xs:px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: customColors.accentLight, color: customColors.background }}>Accent Light</span>
                </div>
              </div>
            </div>
            
            {/* Tailwind Config */}
            <div>
              <h4 className="text-base xs:text-lg font-semibold text-white mb-2 xs:mb-3 flex items-center gap-2">
                <Copy className="h-4 w-4 xs:h-5 xs:w-5" />
                <span className="hidden sm:inline">4. Enhanced Tailwind Config</span>
                <span className="sm:hidden">4. Tailwind Config</span>
              </h4>
              <div className="bg-gray-800 rounded-lg p-3 xs:p-4 relative">
                <pre className="text-xs text-white overflow-auto max-h-40 xs:max-h-60">
                  <code>{generateTailwindConfig()}</code>
                </pre>
                <button 
                  onClick={() => navigator.clipboard.writeText(generateTailwindConfig())} 
                  className="absolute top-2 right-2 p-1 xs:p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={14} className="xs:w-4 xs:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col xs:flex-row justify-end px-3 xs:px-4 md:px-6 py-3 xs:py-4 border-t border-white/20 gap-2 xs:gap-3">
          <button 
            onClick={onClose} 
            className="px-4 xs:px-6 py-2 text-gray-300 hover:text-white rounded-lg border border-gray-600 hover:border-gray-500 transition-colors text-sm xs:text-base order-2 xs:order-1"
          >
            Cancel
          </button>
          
          {/* Mostrar mensaje de guardado */}
          {saveMessage && (
            <div className="flex items-center px-3 xs:px-4 py-2 rounded-lg text-xs xs:text-sm font-medium order-1 xs:order-2"
                 style={{ 
                   backgroundColor: saveMessage.includes('✅') ? customColors.successLight : customColors.errorLight,
                   color: saveMessage.includes('✅') ? customColors.successDark : customColors.errorDark
                 }}>
              {saveMessage}
            </div>
          )}
          
          <button 
            onClick={handleSaveColorPalette}
            disabled={isLoading || !projectId}
            className="px-4 xs:px-6 py-2 font-semibold text-white rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm xs:text-base order-3" 
            style={{ backgroundColor: customColors.primary }}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 xs:h-4 xs:w-4 border-2 border-white border-t-transparent"></div>
                <span className="hidden xs:inline">Guardando...</span>
                <span className="xs:hidden">...</span>
              </>
            ) : (
              <>
                <Save className="h-3 w-3 xs:h-4 xs:w-4" />
                <span className="hidden sm:inline">{projectId ? 'Guardar en Proyecto' : 'Guardar Paleta'}</span>
                <span className="sm:hidden">Guardar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
