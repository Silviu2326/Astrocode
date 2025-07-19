import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  GlassmorphismTheme,
  DarkLightTheme,
  MaterialDesignTheme,
  MinimalTheme,
  DeveloperTerminalTheme,
  FrostedUITheme,
  MobileFirstTheme,
  DataDrivenTheme,
  CardBasedTheme,
  AIPoweredTheme,
  FormFirstTheme,
  GeometricTheme,
  DefaultTheme
} from './themes';
import NeumorphismTheme from './themes/NeumorphismTheme';
import BrutalismTheme from './themes/BrutalismTheme';
import RetroVintageTheme from './themes/RetroVintageTheme';
import ClaymorphismTheme from './themes/ClaymorphismTheme';
import CyberpunkNeonTheme from './themes/CyberpunkNeonTheme';
import OrganicBiomorphicTheme from './themes/OrganicBiomorphicTheme';
import MemphisDesignTheme from './themes/MemphisDesignTheme';
import MonochromeGrayscaleTheme from './themes/MonochromeGrayscaleTheme';
import AuroraGradientMeshTheme from './themes/AuroraGradientMeshTheme';
import PaperSkeuomorphicTheme from './themes/PaperSkeuomorphicTheme';
import HolographicIridescentTheme from './themes/HolographicIridescentTheme';
import MinimalistZenTheme from './themes/MinimalistZenTheme';

interface TemasPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  temaId: string;
  temaNombre: string;
}

const getPreviewComponent = (temaId: string) => {
  switch (temaId) {
    case '1': // Glassmorphism
      return <GlassmorphismTheme />;

    case '2': // Dark/Light Mode
      return <DarkLightTheme />;

    case '3': // Material Design
      return <MaterialDesignTheme />;

    case '4': // Minimalismo
      return <MinimalTheme />;

    case '5': // Developer/Terminal UI
      return <DeveloperTerminalTheme />;

    case '6': // Frosted UI
      return <FrostedUITheme />;

    case '7': // Mobile-First Modular
      return <MobileFirstTheme />;

    case '8': // Data-Driven Design
      return <DataDrivenTheme />;

    case '9': // Card-Based
      return <CardBasedTheme />;

    case '10': // AI-Powered UI
      return <AIPoweredTheme />;

    case '11': // Form-First Design
      return <FormFirstTheme />;

    case '12': // Geometric UI
      return <GeometricTheme />;

    case '13': // Neumorphism
      return <NeumorphismTheme />;

    case '14': // Brutalism UI
      return <BrutalismTheme />;

    case '15': // Retro/Vintage
      return <RetroVintageTheme />;

    case '16': // Claymorphism
      return <ClaymorphismTheme />;

    case '17': // Cyberpunk/Neon
      return <CyberpunkNeonTheme />;

    case '18': // Organic/Biomorphic
      return <OrganicBiomorphicTheme />;

    case '19': // Memphis Design
      return <MemphisDesignTheme />;

    case '20': // Monochrome/Grayscale
      return <MonochromeGrayscaleTheme />;

    case '21': // Aurora/Gradient Mesh
      return <AuroraGradientMeshTheme />;

    case '22': // Paper/Skeuomorphic
      return <PaperSkeuomorphicTheme />;

    case '23': // Holographic/Iridescent
      return <HolographicIridescentTheme />;

    case '24': // Minimalist Zen
      return <MinimalistZenTheme />;

    default:
      return <DefaultTheme />;
  }
};

export default function TemasPreview({ isOpen, onClose, temaId, temaNombre }: TemasPreviewProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-800 p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Preview: {temaNombre}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
          
          {/* Preview Content */}
          <div className="h-[calc(90vh-80px)] overflow-auto">
            {getPreviewComponent(temaId)}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}