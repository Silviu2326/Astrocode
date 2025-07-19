import React from 'react';

export { default as GlassmorphismTheme } from './GlassmorphismTheme';
export { default as DarkLightTheme } from './DarkLightTheme';
export { default as MaterialDesignTheme } from './MaterialDesignTheme';
export { default as MinimalTheme } from './MinimalTheme';
export { default as DeveloperTerminalTheme } from './DeveloperTerminalTheme';
export { default as FrostedUITheme } from './FrostedUITheme';
export { default as MobileFirstTheme } from './MobileFirstTheme';
export { default as DataDrivenTheme } from './DataDrivenTheme';
export { default as CardBasedTheme } from './CardBasedTheme';
export { default as AIPoweredTheme } from './AIPoweredTheme';
export { default as FormFirstTheme } from './FormFirstTheme';
export { default as GeometricTheme } from './GeometricTheme';

// Componente por defecto para temas no encontrados
export const DefaultTheme = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Preview no disponible</h1>
      <p className="text-gray-600">Este tema aún no tiene un preview configurado.</p>
    </div>
  </div>
);