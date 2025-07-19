import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Check, Sparkles, Eye } from 'lucide-react';
import TemasPreview from './TemasPreview';

interface Tema {
  id: string;
  name: string;
  description: string;
  color: string;
  isSelected: boolean;
}

interface TemasPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const temasDisponibles: Tema[] = [
  {
    id: '1',
    name: 'Glassmorphism',
    description: 'Efecto de vidrio translúcido con desenfoque de fondo',
    color: 'bg-gradient-to-br from-white/20 to-blue/10',
    isSelected: false
  },
  {
    id: '2',
    name: 'Dark Mode / Light Mode',
    description: 'Tema dual con alternancia entre modo oscuro y claro',
    color: 'bg-gradient-to-r from-slate-900 to-slate-100',
    isSelected: false
  },
  {
    id: '3',
    name: 'Material Design',
    description: 'Diseño basado en los principios de Material Design de Google',
    color: 'bg-gradient-to-br from-blue-500 to-green-400',
    isSelected: false
  },
  {
    id: '4',
    name: 'Minimalismo (Swiss / Flat 3.0)',
    description: 'Diseño limpio y minimalista con tipografía clara',
    color: 'bg-gradient-to-br from-gray-100 to-gray-300',
    isSelected: false
  },
  {
    id: '5',
    name: 'Developer Aesthetic / Terminal UI',
    description: 'Estética de terminal con colores de consola',
    color: 'bg-gradient-to-br from-green-400 to-black',
    isSelected: false
  },
  {
    id: '6',
    name: 'Frosted UI',
    description: 'Interfaz con efectos de escarcha y transparencias',
    color: 'bg-gradient-to-br from-cyan-200/30 to-blue-300/30',
    isSelected: false
  },
  {
    id: '7',
    name: 'Mobile‑First Modular',
    description: 'Diseño modular optimizado para dispositivos móviles',
    color: 'bg-gradient-to-br from-purple-400 to-pink-400',
    isSelected: false
  },
  {
    id: '8',
    name: 'Data‑Driven Design',
    description: 'Diseño enfocado en visualización de datos y métricas',
    color: 'bg-gradient-to-br from-indigo-500 to-cyan-500',
    isSelected: false
  },
  {
    id: '9',
    name: 'Card‑Based (Tarjetas modulares)',
    description: 'Interfaz basada en tarjetas modulares y organizadas',
    color: 'bg-gradient-to-br from-orange-300 to-red-400',
    isSelected: false
  },
  {
    id: '10',
    name: 'AI‑Powered UI',
    description: 'Interfaz con elementos de inteligencia artificial',
    color: 'bg-gradient-to-br from-violet-500 to-purple-600',
    isSelected: false
  },
  {
    id: '11',
    name: 'Form‑First Design',
    description: 'Diseño centrado en formularios y entrada de datos',
    color: 'bg-gradient-to-br from-teal-400 to-blue-500',
    isSelected: false
  },
  {
    id: '12',
    name: 'Geometric UI',
    description: 'Interfaz con formas geométricas y patrones matemáticos',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    isSelected: false
  },
  {
    id: '13',
    name: 'Neumorphism (Soft UI)',
    description: 'Diseño con elementos que parecen extruidos del fondo, creando efectos de relieve suave',
    color: 'bg-gradient-to-br from-gray-200 to-gray-400',
    isSelected: false
  },
  {
    id: '14',
    name: 'Brutalism UI',
    description: 'Diseño audaz con tipografías grandes, colores contrastantes y elementos geométricos crudos',
    color: 'bg-gradient-to-br from-red-600 to-black',
    isSelected: false
  },
  {
    id: '15',
    name: 'Retro/Vintage (80s/90s)',
    description: 'Estética nostálgica con gradientes vibrantes y elementos retro-futuristas',
    color: 'bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400',
    isSelected: false
  },
  {
    id: '16',
    name: 'Claymorphism',
    description: 'Elementos con apariencia de arcilla, bordes redondeados y colores pasteles',
    color: 'bg-gradient-to-br from-orange-200 to-pink-200',
    isSelected: false
  },
  {
    id: '17',
    name: 'Cyberpunk/Neon',
    description: 'Estética futurista con colores neón, efectos de brillo y tipografías tecnológicas',
    color: 'bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500',
    isSelected: false
  },
  {
    id: '18',
    name: 'Organic/Biomorphic',
    description: 'Formas inspiradas en la naturaleza con curvas suaves y colores orgánicos',
    color: 'bg-gradient-to-br from-green-300 to-emerald-500',
    isSelected: false
  },
  {
    id: '19',
    name: 'Memphis Design',
    description: 'Estilo postmoderno con formas geométricas coloridas y patrones audaces',
    color: 'bg-gradient-to-br from-yellow-400 via-red-500 to-blue-500',
    isSelected: false
  },
  {
    id: '20',
    name: 'Monochrome/Grayscale',
    description: 'Diseño elegante usando únicamente escalas de grises',
    color: 'bg-gradient-to-br from-gray-900 to-gray-300',
    isSelected: false
  },
  {
    id: '21',
    name: 'Aurora/Gradient Mesh',
    description: 'Gradientes complejos que simulan auroras boreales y efectos de luz',
    color: 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400',
    isSelected: false
  },
  {
    id: '22',
    name: 'Paper/Skeuomorphic',
    description: 'Elementos que imitan materiales reales como papel, cuero o madera',
    color: 'bg-gradient-to-br from-amber-100 to-orange-200',
    isSelected: false
  },
  {
    id: '23',
    name: 'Holographic/Iridescent',
    description: 'Efectos holográficos con colores cambiantes y reflejos metálicos',
    color: 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500',
    isSelected: false
  },
  {
    id: '24',
    name: 'Minimalist Zen',
    description: 'Diseño ultra-minimalista inspirado en la filosofía zen',
    color: 'bg-gradient-to-br from-stone-100 to-stone-200',
    isSelected: false
  }
];

export default function TemasPopup({ isOpen, onClose }: TemasPopupProps) {
  const [temas, setTemas] = useState<Tema[]>(temasDisponibles);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedPreviewTema, setSelectedPreviewTema] = useState<{ id: string; name: string } | null>(null);

  const filteredTemas = temas.filter(tema =>
    tema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tema.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedTemas = temas.filter(tema => tema.isSelected);

  const toggleTema = (id: string) => {
    setTemas(temas =>
      temas.map(tema =>
        tema.id === id ? { ...tema, isSelected: !tema.isSelected } : tema
      )
    );
  };

  const openPreview = (tema: Tema, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPreviewTema({ id: tema.id, name: tema.name });
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setSelectedPreviewTema(null);
  };

  const applySelectedTemas = () => {
    const selected = temas.filter(tema => tema.isSelected);
    console.log('Temas seleccionados:', selected);
    // Aquí puedes agregar la lógica para aplicar los temas seleccionados
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Temas de Diseño</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              
              {/* Search */}
              <div className="mt-4">
                <div className="relative">
                  <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar temas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex h-[60vh]">
              {/* Temas Grid */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemas.map((tema) => (
                    <motion.div
                      key={tema.id}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        tema.isSelected
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                      }`}
                      onClick={() => toggleTema(tema.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Preview del tema */}
                      <div className={`h-16 rounded-md mb-3 ${tema.color} border border-slate-600`}></div>
                      
                      {/* Nombre del tema */}
                      <h3 className="font-medium text-white mb-1">{tema.name}</h3>
                      
                      {/* Descripción */}
                      <p className="text-sm text-slate-400 leading-relaxed mb-3">{tema.description}</p>
                      
                      {/* Botón de Preview */}
                      <button
                        onClick={(e) => openPreview(tema, e)}
                        className="w-full bg-slate-600 hover:bg-slate-500 text-white text-sm py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Ver Preview
                      </button>
                      
                      {/* Check icon */}
                      {tema.isSelected && (
                        <motion.div
                          className="absolute top-2 right-2 bg-purple-500 rounded-full p-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Selected Temas Sidebar */}
              {selectedTemas.length > 0 && (
                <div className="w-80 border-l border-slate-700 p-6 bg-slate-800/50">
                  <h3 className="font-medium text-white mb-4">
                    Temas Seleccionados ({selectedTemas.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedTemas.map((tema) => (
                      <div
                        key={tema.id}
                        className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg"
                      >
                        <div className={`w-8 h-8 rounded ${tema.color} border border-slate-600`}></div>
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm">{tema.name}</div>
                        </div>
                        <button
                          onClick={() => toggleTema(tema.id)}
                          className="p-1 hover:bg-slate-600 rounded transition-colors"
                        >
                          <X className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-700 flex justify-between items-center">
              <div className="text-sm text-slate-400">
                {selectedTemas.length} tema(s) seleccionado(s)
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={applySelectedTemas}
                  disabled={selectedTemas.length === 0}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Palette className="h-4 w-4" />
                  Aplicar Temas
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Preview Modal */}
      {selectedPreviewTema && (
        <TemasPreview
          isOpen={previewOpen}
          onClose={closePreview}
          temaId={selectedPreviewTema.id}
          temaNombre={selectedPreviewTema.name}
        />
      )}
    </>
  );
}