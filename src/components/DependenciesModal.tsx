import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Search, Plus, Trash2, Download, ExternalLink } from 'lucide-react';

interface Dependency {
  id: string;
  name: string;
  version: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'testing' | 'devtools' | 'ui' | 'graphics' | 'icons';
  isSelected: boolean;
  image?: string; // Nueva propiedad para la imagen
}

interface DependenciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularDependencies: Dependency[] = [
  // Frontend
  { id: '1', name: 'react', version: '^18.2.0', description: 'Biblioteca para construir interfaces de usuario', category: 'frontend', isSelected: false },
  { id: '2', name: 'vue', version: '^3.3.0', description: 'Framework progresivo para construir UIs', category: 'frontend', isSelected: false },
  { id: '3', name: 'angular', version: '^16.0.0', description: 'Plataforma para aplicaciones web', category: 'frontend', isSelected: false },
  { id: '4', name: 'svelte', version: '^4.0.0', description: 'Framework compilado para UIs', category: 'frontend', isSelected: false },
  
  // UI Libraries
  { id: '5', name: 'tailwindcss', version: '^3.3.0', description: 'Framework CSS utility-first', category: 'ui', isSelected: false },
  { id: '6', name: 'material-ui', version: '^5.14.0', description: 'Componentes React Material Design', category: 'ui', isSelected: false },
  { id: '7', name: 'chakra-ui', version: '^2.8.0', description: 'Biblioteca de componentes modular', category: 'ui', isSelected: false },
  { id: '8', name: 'ant-design', version: '^5.8.0', description: 'Lenguaje de diseño empresarial', category: 'ui', isSelected: false },
  
  // Graphics & Charts
  { id: '25', name: 'chart.js', version: '^4.4.0', description: 'Biblioteca de gráficos simple y flexible', category: 'graphics', isSelected: false, image: 'https://www.chartjs.org/img/chartjs-logo.svg' },
  { id: '26', name: 'recharts', version: '^2.8.0', description: 'Biblioteca de gráficos para React', category: 'graphics', isSelected: false, image: 'https://recharts.org/static/logo.svg' },
  { id: '27', name: 'd3', version: '^7.8.5', description: 'Biblioteca para visualización de datos', category: 'graphics', isSelected: false, image: 'https://d3js.org/logo.svg' },
  { id: '28', name: 'victory', version: '^36.6.11', description: 'Componentes de gráficos modulares para React', category: 'graphics', isSelected: false, image: 'https://victory.formidable.com/static/logo-victory.svg' },
  { id: '29', name: 'plotly.js', version: '^2.26.0', description: 'Biblioteca de gráficos interactivos', category: 'graphics', isSelected: false, image: 'https://plotly.com/all_static/images/plotly-logo.png' },
  { id: '30', name: 'apexcharts', version: '^3.44.0', description: 'Gráficos interactivos modernos', category: 'graphics', isSelected: false, image: 'https://apexcharts.com/media/apexcharts-logo.png' },
  { id: '31', name: 'nivo', version: '^0.84.0', description: 'Componentes de visualización de datos para React', category: 'graphics', isSelected: false, image: 'https://nivo.rocks/icons/nivo-icon.png' },
  { id: '32', name: 'visx', version: '^3.3.0', description: 'Primitivos de visualización para React', category: 'graphics', isSelected: false, image: 'https://airbnb.io/visx/static/logo.png' },
  { id: '33', name: 'three', version: '^0.157.0', description: 'Biblioteca JavaScript 3D', category: 'graphics', isSelected: false, image: 'https://threejs.org/files/share.png' },
  { id: '34', name: 'konva', version: '^9.2.0', description: 'Canvas 2D para aplicaciones de escritorio y móviles', category: 'graphics', isSelected: false, image: 'https://konvajs.org/assets/logo.png' },
  
  // Icons
  { id: '35', name: 'lucide-react', version: '^0.288.0', description: 'Iconos hermosos y consistentes para React', category: 'icons', isSelected: false, image: 'https://lucide.dev/logo.dark.svg' },
  { id: '36', name: 'react-icons', version: '^4.11.0', description: 'Colección de iconos populares para React', category: 'icons', isSelected: false, image: 'https://react-icons.github.io/react-icons/icons/ri.svg' },
  { id: '37', name: 'heroicons', version: '^2.0.18', description: 'Iconos SVG hermosos hechos a mano', category: 'icons', isSelected: false, image: 'https://heroicons.com/_next/static/media/social-card.9f2e8d2e.jpg' },
  { id: '38', name: 'feather-icons', version: '^4.29.0', description: 'Iconos simples, hermosos y de código abierto', category: 'icons', isSelected: false, image: 'https://feathericons.com/icons/feather.svg' },
  { id: '39', name: 'phosphor-icons', version: '^1.4.2', description: 'Familia de iconos flexible para interfaces', category: 'icons', isSelected: false, image: 'https://phosphoricons.com/favicon.svg' },
  { id: '40', name: 'tabler-icons', version: '^2.40.0', description: 'Más de 4000 iconos SVG gratuitos', category: 'icons', isSelected: false, image: 'https://tabler-icons.io/favicon.svg' },
  { id: '41', name: 'iconify', version: '^3.1.1', description: 'Marco de iconos unificado', category: 'icons', isSelected: false, image: 'https://iconify.design/assets/images/iconify-logo.svg' },
  { id: '42', name: 'react-feather', version: '^2.0.10', description: 'Componentes de iconos Feather para React', category: 'icons', isSelected: false, image: 'https://feathericons.com/icons/feather.svg' },
  { id: '43', name: 'boxicons', version: '^2.1.4', description: 'Iconos web simples de alta calidad', category: 'icons', isSelected: false, image: 'https://boxicons.com/static/img/logo.svg' },
  { id: '44', name: 'eva-icons', version: '^1.1.3', description: 'Paquete de más de 480 iconos hermosos', category: 'icons', isSelected: false, image: 'https://akveo.github.io/eva-icons/favicon.png' },
  
  // Backend
  { id: '9', name: 'express', version: '^4.18.0', description: 'Framework web minimalista para Node.js', category: 'backend', isSelected: false },
  { id: '10', name: 'fastapi', version: '^0.103.0', description: 'Framework web moderno para Python', category: 'backend', isSelected: false },
  { id: '11', name: 'nestjs', version: '^10.0.0', description: 'Framework Node.js escalable', category: 'backend', isSelected: false },
  { id: '12', name: 'django', version: '^4.2.0', description: 'Framework web de alto nivel para Python', category: 'backend', isSelected: false },
  
  // Database
  { id: '13', name: 'prisma', version: '^5.2.0', description: 'ORM de próxima generación', category: 'database', isSelected: false },
  { id: '14', name: 'mongoose', version: '^7.5.0', description: 'ODM para MongoDB y Node.js', category: 'database', isSelected: false },
  { id: '15', name: 'sequelize', version: '^6.32.0', description: 'ORM para Node.js', category: 'database', isSelected: false },
  { id: '16', name: 'typeorm', version: '^0.3.17', description: 'ORM para TypeScript y JavaScript', category: 'database', isSelected: false },
  
  // Testing
  { id: '17', name: 'jest', version: '^29.6.0', description: 'Framework de testing delicioso', category: 'testing', isSelected: false },
  { id: '18', name: 'cypress', version: '^13.0.0', description: 'Testing end-to-end', category: 'testing', isSelected: false },
  { id: '19', name: 'vitest', version: '^0.34.0', description: 'Framework de testing rápido', category: 'testing', isSelected: false },
  { id: '20', name: 'playwright', version: '^1.37.0', description: 'Testing de navegadores', category: 'testing', isSelected: false },
  
  // DevTools
  { id: '21', name: 'vite', version: '^4.4.0', description: 'Herramienta de build rápida', category: 'devtools', isSelected: false },
  { id: '22', name: 'webpack', version: '^5.88.0', description: 'Bundler de módulos', category: 'devtools', isSelected: false },
  { id: '23', name: 'eslint', version: '^8.47.0', description: 'Linter para JavaScript', category: 'devtools', isSelected: false },
  { id: '24', name: 'prettier', version: '^3.0.0', description: 'Formateador de código', category: 'devtools', isSelected: false },
];

const categoryColors = {
  frontend: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  backend: 'bg-green-500/20 text-green-400 border-green-500/30',
  database: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  testing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  devtools: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  ui: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  graphics: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  icons: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

const categoryNames = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Base de Datos',
  testing: 'Testing',
  devtools: 'Herramientas',
  ui: 'UI/UX',
  graphics: 'Gráficos',
  icons: 'Iconos',
};

export default function DependenciesModal({ isOpen, onClose }: DependenciesModalProps) {
  const [dependencies, setDependencies] = useState<Dependency[]>(popularDependencies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customDependency, setCustomDependency] = useState({ name: '', version: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredDependencies = dependencies.filter(dep => {
    const matchesSearch = dep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dep.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dep.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedDependencies = dependencies.filter(dep => dep.isSelected);

  const toggleDependency = (id: string) => {
    setDependencies(deps => 
      deps.map(dep => 
        dep.id === id ? { ...dep, isSelected: !dep.isSelected } : dep
      )
    );
  };

  const addCustomDependency = () => {
    if (customDependency.name && customDependency.version) {
      const newDep: Dependency = {
        id: Date.now().toString(),
        name: customDependency.name,
        version: customDependency.version,
        description: customDependency.description || 'Dependencia personalizada',
        category: 'devtools',
        isSelected: true
      };
      setDependencies(deps => [...deps, newDep]);
      setCustomDependency({ name: '', version: '', description: '' });
      setShowAddForm(false);
    }
  };

  const removeCustomDependency = (id: string) => {
    setDependencies(deps => deps.filter(dep => dep.id !== id));
  };

  const generatePackageJson = () => {
    const selected = dependencies.filter(dep => dep.isSelected);
    const packageJson = {
      dependencies: selected.reduce((acc, dep) => {
        acc[dep.name] = dep.version;
        return acc;
      }, {} as Record<string, string>)
    };
    
    const blob = new Blob([JSON.stringify(packageJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dependencies.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-6xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Elección de Dependencias</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            
            {/* Search and Filters */}
            <div className="mt-4 flex gap-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar dependencias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas las categorías</option>
                {Object.entries(categoryNames).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
              
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Agregar personalizada
              </button>
            </div>
          </div>

          <div className="flex h-[calc(90vh-200px)]">
            {/* Dependencies List */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Add Custom Form */}
              {showAddForm && (
                <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <h3 className="text-lg font-medium text-white mb-3">Agregar Dependencia Personalizada</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Nombre (ej: lodash)"
                      value={customDependency.name}
                      onChange={(e) => setCustomDependency(prev => ({ ...prev, name: e.target.value }))}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="Versión (ej: ^4.17.21)"
                      value={customDependency.version}
                      onChange={(e) => setCustomDependency(prev => ({ ...prev, version: e.target.value }))}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="Descripción (opcional)"
                      value={customDependency.description}
                      onChange={(e) => setCustomDependency(prev => ({ ...prev, description: e.target.value }))}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={addCustomDependency}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Dependencies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDependencies.map((dep) => (
                  <motion.div
                    key={dep.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      dep.isSelected
                        ? 'bg-blue-500/20 border-blue-500'
                        : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                    }`}
                    onClick={() => toggleDependency(dep.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {dep.image && (
                          <img 
                            src={dep.image} 
                            alt={`${dep.name} logo`}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                        <h3 className="font-medium text-white">{dep.name}</h3>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded border ${categoryColors[dep.category]}`}>
                        {categoryNames[dep.category]}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{dep.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{dep.version}</span>
                      {parseInt(dep.id) > 24 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCustomDependency(dep.id);
                          }}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Dependencies Sidebar */}
            <div className="w-80 border-l border-slate-700 p-6 bg-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Seleccionadas ({selectedDependencies.length})</h3>
                {selectedDependencies.length > 0 && (
                  <button
                    onClick={generatePackageJson}
                    className="p-2 text-green-400 hover:text-green-300 transition-colors"
                    title="Descargar dependencies.json"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedDependencies.map((dep) => (
                  <div key={dep.id} className="p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{dep.name}</span>
                      <button
                        onClick={() => toggleDependency(dep.id)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-xs text-slate-400">{dep.version}</span>
                  </div>
                ))}
              </div>
              
              {selectedDependencies.length === 0 && (
                <p className="text-slate-400 text-center py-8">No hay dependencias seleccionadas</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-700 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                console.log('Dependencias seleccionadas:', selectedDependencies);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Aplicar Selección ({selectedDependencies.length})
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}