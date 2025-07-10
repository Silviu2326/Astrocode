
import React, { useState, useEffect, useRef } from 'react';
import { X, Palette, Eye, Paintbrush, Plus, Copy, Star, Heart, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { ColorTheme, predefinedThemes } from '../types/colorThemes';
import { projectService } from '../services/api';

interface ColorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (newConfig: string) => void;
  projectId?: string;
}



export default function ColorsModal({ isOpen, onClose, onSave, projectId }: ColorsModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme | null>(null);
  const [customColors, setCustomColors] = useState<Record<string, string>>({});
  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('#FFFFFF');
  const [loading, setLoading] = useState(false);
  const [projectColorPalette, setProjectColorPalette] = useState<any>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadProjectColorPalette();
    }
  }, [isOpen, projectId]);

  const loadProjectColorPalette = async () => {
    if (!projectId) {
      // Si no hay projectId, usar el primer tema predefinido
      if (predefinedThemes.length > 0) {
        handleThemeChange(predefinedThemes[0]);
      }
      return;
    }

    try {
      setLoading(true);
      const response = await projectService.getColorPalette(projectId);
      
      if (response.data?.colorPalette) {
        const palette = response.data.colorPalette;
        setProjectColorPalette(palette);
        
        // Mapear la paleta del proyecto al formato del componente
        const mappedColors = {
          primary: palette.primary || '#3B82F6',
          primaryHover: palette.variants?.primary?.[600] || '#2563EB',
          primaryLight: palette.variants?.primary?.[100] || '#DBEAFE',
          primaryDark: palette.variants?.primary?.[800] || '#1E40AF',
          secondary: palette.secondary || '#6B7280',
          secondaryHover: palette.variants?.secondary?.[600] || '#4B5563',
          secondaryLight: palette.variants?.secondary?.[100] || '#F3F4F6',
          accent: palette.accent || '#F59E0B',
          accentHover: palette.accent || '#F59E0B',
          accentLight: palette.variants?.primary?.[200] || '#FEF3C7',
          background: palette.background || '#FFFFFF',
          backgroundSecondary: palette.surface || '#F9FAFB',
          surface: palette.surface || '#F9FAFB',
          card: palette.surface || '#F9FAFB',
          overlay: 'rgba(0, 0, 0, 0.5)',
          text: palette.text?.primary || '#111827',
          textSecondary: palette.text?.secondary || '#6B7280',
          textMuted: palette.variants?.secondary?.[400] || '#9CA3AF',
          textInverse: '#FFFFFF',
          success: palette.status?.success || '#10B981',
          successLight: '#D1FAE5',
          successDark: '#047857',
          warning: palette.status?.warning || '#F59E0B',
          warningLight: '#FEF3C7',
          warningDark: '#D97706',
          error: palette.status?.error || '#EF4444',
          errorLight: '#FEE2E2',
          errorDark: '#DC2626',
          info: palette.status?.info || '#3B82F6',
          infoLight: '#DBEAFE',
          infoDark: '#1D4ED8',
          muted: palette.variants?.secondary?.[300] || '#D1D5DB',
          border: palette.variants?.secondary?.[200] || '#E5E7EB',
          borderLight: palette.variants?.secondary?.[100] || '#F3F4F6',
          focus: palette.primary || '#3B82F6',
          disabled: palette.variants?.secondary?.[400] || '#9CA3AF',
          shadow: 'rgba(0, 0, 0, 0.1)',
          gradientStart: palette.primary || '#3B82F6',
          gradientEnd: palette.accent || '#F59E0B'
        };
        
        console.log('🎨 [ColorsModal] Paleta cargada desde backend:', palette);
        console.log('🎨 [ColorsModal] Colores mapeados:', mappedColors);
        
        setCustomColors(mappedColors);
        
        // Buscar si hay un tema predefinido que coincida
        const matchingTheme = predefinedThemes.find(theme => 
          theme.primary === palette.primary && 
          theme.secondary === palette.secondary &&
          theme.accent === palette.accent
        );
        
        if (matchingTheme) {
          setSelectedTheme(matchingTheme);
        } else {
          // Crear un tema personalizado
          setSelectedTheme({
            name: palette.name || 'Custom',
            ...mappedColors
          });
        }
      } else {
        // Si no hay paleta guardada, usar el primer tema predefinido
        if (predefinedThemes.length > 0) {
          handleThemeChange(predefinedThemes[0]);
        }
      }
    } catch (error) {
      console.error('Error loading project color palette:', error);
      // En caso de error, usar el primer tema predefinido
      if (predefinedThemes.length > 0) {
        handleThemeChange(predefinedThemes[0]);
      }
    } finally {
      setLoading(false);
    }
  };

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

  const handleAddColor = () => {
    if (newColorName) {
      setCustomColors(prev => ({ ...prev, [newColorName.toLowerCase()]: newColorValue }));
      setNewColorName('');
      setNewColorValue('#FFFFFF');
    }
  };

  const handleSaveColorPalette = async () => {
    if (!projectId) {
      // Si no hay projectId, solo ejecutar la función onSave original
      onSave && onSave(generateTailwindConfig());
      return;
    }

    try {
      setLoading(true);
      
      // Mapear los colores del componente al formato del backend
      const colorPalette = {
        name: selectedTheme?.name || 'Custom',
        primary: customColors.primary,
        secondary: customColors.secondary,
        accent: customColors.accent,
        background: customColors.background,
        surface: customColors.surface,
        text: {
          primary: customColors.text,
          secondary: customColors.textSecondary
        },
        status: {
          success: customColors.success,
          warning: customColors.warning,
          error: customColors.error,
          info: customColors.info
        },
        variants: {
          primary: {
            50: '#EFF6FF',
            100: customColors.primaryLight,
            200: '#BFDBFE',
            300: '#93C5FD',
            400: '#60A5FA',
            500: customColors.primary,
            600: customColors.primaryHover,
            700: '#1D4ED8',
            800: customColors.primaryDark,
            900: '#1E3A8A'
          },
          secondary: {
            50: '#F9FAFB',
            100: customColors.secondaryLight,
            200: customColors.border,
            300: customColors.muted,
            400: customColors.textMuted,
            500: customColors.secondary,
            600: customColors.secondaryHover,
            700: '#374151',
            800: '#1F2937',
            900: '#111827'
          }
        }
      };

      await projectService.updateColorPalette(projectId, colorPalette);
      
      // También ejecutar la función onSave original si existe
      onSave && onSave(generateTailwindConfig());
      
      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Error saving color palette:', error);
      // En caso de error, aún ejecutar onSave si existe
      onSave && onSave(generateTailwindConfig());
    } finally {
      setLoading(false);
    }
  };

  const generateTailwindConfig = () => {
    const colors = { ...customColors };
    
    return `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8)},
      backgroundImage: {
        'gradient-primary': \`linear-gradient(135deg, \${colors.gradientStart} 0%, \${colors.gradientEnd} 100%)\`,
        'gradient-secondary': \`linear-gradient(45deg, \${colors.secondary} 0%, \${colors.accent} 100%)\`,
        'gradient-surface': \`linear-gradient(180deg, \${colors.surface} 0%, \${colors.card} 100%)\`
      }
    },
  },
  plugins: [],
};`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="relative w-full max-w-7xl bg-gray-900/70 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Palette className="h-6 w-6" />
            Color Palette Manager
            {projectId && (
              <span className="text-sm text-gray-400 font-normal">
                (Project: {projectId})
              </span>
            )}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {loading && projectId ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg font-semibold">Cargando paleta del proyecto...</p>
              <p className="text-gray-400 text-sm mt-2">Obteniendo colores guardados desde el backend</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 p-6 gap-6 overflow-hidden">
          {/* Left Panel - Theme Selection */}
          <div className="w-1/3 space-y-6 overflow-y-auto">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                1. Choose a Base Palette
              </h4>
              <div className="space-y-3">
                {predefinedThemes.map(theme => (
                  <div
                    key={theme.name}
                    onClick={() => handleThemeChange(theme)}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                      selectedTheme?.name === theme.name 
                        ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-bold text-white">{theme.name}</h5>
                      {selectedTheme?.name === theme.name && (
                        <div className="flex items-center gap-1 text-purple-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-xs font-medium">Seleccionado</span>
                        </div>
                      )}
                    </div>
                    {/* Colores principales */}
                    <div className="grid grid-cols-5 gap-1 mb-2">
                      <div className="h-8 rounded" style={{ backgroundColor: theme.primary }} title="Primary"></div>
                      <div className="h-8 rounded" style={{ backgroundColor: theme.secondary }} title="Secondary"></div>
                      <div className="h-8 rounded" style={{ backgroundColor: theme.accent }} title="Accent"></div>
                      <div className="h-8 rounded" style={{ backgroundColor: theme.success }} title="Success"></div>
                      <div className="h-8 rounded" style={{ backgroundColor: theme.warning }} title="Warning"></div>
                    </div>
                    {/* Backgrounds */}
                    <div className="grid grid-cols-5 gap-1 mb-2">
                      <div className="h-6 rounded" style={{ backgroundColor: theme.background }} title="Background"></div>
                      <div className="h-6 rounded" style={{ backgroundColor: theme.surface }} title="Surface"></div>
                      <div className="h-6 rounded" style={{ backgroundColor: theme.card }} title="Card"></div>
                      <div className="h-6 rounded" style={{ backgroundColor: theme.error }} title="Error"></div>
                      <div className="h-6 rounded" style={{ backgroundColor: theme.info }} title="Info"></div>
                    </div>
                    {/* Gradiente preview */}
                    <div 
                      className="h-4 rounded mt-2" 
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
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                2. Add Custom Colors
              </h4>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newColorName} 
                    onChange={e => setNewColorName(e.target.value)} 
                    placeholder="Color name" 
                    className="flex-grow p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    type="color" 
                    value={newColorValue} 
                    onChange={e => setNewColorValue(e.target.value)} 
                    className="w-12 h-10 p-1 rounded bg-gray-800 border border-gray-700 cursor-pointer" 
                  />
                  <button 
                    onClick={handleAddColor} 
                    className="p-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                  >
                    <Plus className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Current Colors Display */}
                <div className="grid grid-cols-4 gap-2 mt-4 max-h-60 overflow-y-auto">
                  {Object.entries(customColors).map(([name, color]) => (
                    <div key={name} className="text-center group">
                      <div 
                        className="h-8 w-full rounded mb-1 border border-gray-600 group-hover:border-gray-400 transition-colors" 
                        style={{ backgroundColor: color }}
                        title={`${name}: ${color}`}
                      ></div>
                      <span className="text-xs text-gray-400 capitalize truncate block">{name}</span>
                    </div>
                  ))}
                </div>
                
                {projectColorPalette && (
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-1">
                      <Heart className="h-4 w-4" />
                      Paleta del Proyecto Cargada
                    </div>
                    <p className="text-xs text-gray-400">
                      Se ha cargado la paleta guardada: "{projectColorPalette.name || 'Sin nombre'}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-2/3 space-y-6 overflow-y-auto">
            <div 
              ref={previewRef} 
              className="p-6 rounded-lg border-2 min-h-[500px]" 
              style={{ 
                backgroundColor: customColors.background, 
                color: customColors.text,
                borderColor: customColors.border
              }}
            >
              <h4 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: customColors.primary }}>
                <Paintbrush className="h-8 w-8" />
                3. Live Preview
              </h4>
              
              {/* Navigation Bar Preview */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: customColors.surface }}>
                <div className="flex items-center justify-between">
                  <h5 className="font-bold" style={{ color: customColors.primary }}>Navigation</h5>
                  <div className="flex gap-2">
                    <button 
                      className="px-3 py-1 rounded text-sm font-medium transition-colors" 
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
                      className="px-3 py-1 rounded text-sm transition-colors" 
                      style={{ color: customColors.textMuted }}
                    >
                      About
                    </button>
                  </div>
                </div>
              </div>

              {/* Gradient Background Card */}
              <div 
                className="mb-6 p-6 rounded-lg text-center"
                style={{
                  background: `linear-gradient(135deg, ${customColors.gradientStart} 0%, ${customColors.gradientEnd} 100%)`,
                  color: customColors.textInverse
                }}
              >
                <h5 className="text-xl font-bold mb-2">Gradient Background</h5>
                <p className="opacity-90">Beautiful gradient using your theme colors</p>
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button 
                  className="py-3 px-4 rounded-lg font-semibold transition-all hover:scale-105" 
                  style={{ 
                    backgroundColor: customColors.primary,
                    color: customColors.textInverse
                  }}
                >
                  Primary
                </button>
                <button 
                  className="py-3 px-4 rounded-lg font-semibold transition-all hover:scale-105" 
                  style={{ 
                    backgroundColor: customColors.secondary,
                    color: customColors.textInverse
                  }}
                >
                  Secondary
                </button>
                <button 
                  className="py-3 px-4 rounded-lg font-semibold transition-all hover:scale-105" 
                  style={{ 
                    backgroundColor: customColors.accent,
                    color: customColors.textInverse
                  }}
                >
                  Accent
                </button>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: customColors.card, border: `2px solid ${customColors.success}` }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customColors.success }}></div>
                  <div>
                    <p className="font-semibold" style={{ color: customColors.success }}>Success</p>
                    <p className="text-sm" style={{ color: customColors.textMuted }}>Operation completed</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: customColors.card, border: `2px solid ${customColors.warning}` }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customColors.warning }}></div>
                  <div>
                    <p className="font-semibold" style={{ color: customColors.warning }}>Warning</p>
                    <p className="text-sm" style={{ color: customColors.textMuted }}>Check required</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: customColors.card, border: `2px solid ${customColors.error}` }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customColors.error }}></div>
                  <div>
                    <p className="font-semibold" style={{ color: customColors.error }}>Error</p>
                    <p className="text-sm" style={{ color: customColors.textMuted }}>Action failed</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: customColors.card, border: `2px solid ${customColors.info}` }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customColors.info }}></div>
                  <div>
                    <p className="font-semibold" style={{ color: customColors.info }}>Info</p>
                    <p className="text-sm" style={{ color: customColors.textMuted }}>Additional details</p>
                  </div>
                </div>
              </div>

              {/* Surface Examples */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: customColors.surface }}>
                  <h6 className="font-bold mb-2" style={{ color: customColors.text }}>Surface Background</h6>
                  <p style={{ color: customColors.textSecondary }}>Content on surface background</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: customColors.backgroundSecondary }}>
                  <h6 className="font-bold mb-2" style={{ color: customColors.text }}>Secondary Background</h6>
                  <p style={{ color: customColors.textSecondary }}>Content on secondary background</p>
                </div>
              </div>

              {/* Card Example */}
              <div className="p-6 rounded-lg border" style={{ backgroundColor: customColors.card, borderColor: customColors.borderLight }}>
                <div className="flex items-center justify-between mb-4">
                  <h6 className="text-xl font-bold" style={{ color: customColors.primary }}>Enhanced Card</h6>
                  <div className="flex gap-2">
                    <Star className="h-5 w-5" style={{ color: customColors.accent }} />
                    <Heart className="h-5 w-5" style={{ color: customColors.error }} />
                    <Settings className="h-5 w-5" style={{ color: customColors.textMuted }} />
                  </div>
                </div>
                <p style={{ color: customColors.textSecondary }} className="mb-4">
                  This card showcases the expanded color palette with multiple background options and enhanced visual hierarchy.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: customColors.primaryLight, color: customColors.primaryDark }}>Primary Light</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: customColors.secondaryLight, color: customColors.background }}>Secondary Light</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: customColors.accentLight, color: customColors.background }}>Accent Light</span>
                </div>
              </div>
            </div>
            
            {/* Tailwind Config */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Copy className="h-5 w-5" />
                4. Enhanced Tailwind Config
              </h4>
              <div className="bg-gray-800 rounded-lg p-4 relative">
                <pre className="text-xs text-white overflow-auto max-h-60">
                  <code>{generateTailwindConfig()}</code>
                </pre>
                <button 
                  onClick={() => navigator.clipboard.writeText(generateTailwindConfig())} 
                  className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
          </div>
        )}

        <div className="flex justify-end px-6 py-4 border-t border-white/20 gap-3">
          <button 
            onClick={onClose} 
            disabled={loading}
            className="px-6 py-2 text-gray-300 hover:text-white rounded-lg border border-gray-600 hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveColorPalette}
            disabled={loading}
            className="px-6 py-2 font-semibold text-white rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2" 
            style={{ backgroundColor: customColors.primary }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              'Save & Apply'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
