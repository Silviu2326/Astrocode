import React, { useState, useEffect } from 'react';
import { X, Package, Code, Copy, Plus, Trash2, Edit3, Layers, Save, Search, Download, Upload } from 'lucide-react';

interface ComponentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Component {
  id: string;
  name: string;
  category: string;
  description: string;
  variants: Variant[];
  props: ComponentProp[];
  createdAt: string;
  updatedAt: string;
}

interface Variant {
  id: string;
  name: string;
  description: string;
  code: string;
}

interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

const STORAGE_KEY = 'reusable-components';

export default function ComponentsModal({ isOpen, onClose }: ComponentsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('buttons');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  const [newComponent, setNewComponent] = useState<Partial<Component>>({
    name: '',
    category: 'buttons',
    description: '',
    variants: [],
    props: []
  });

  const categories = [
    { id: 'buttons', name: 'Botones', icon: Package },
    { id: 'forms', name: 'Formularios', icon: Edit3 },
    { id: 'layout', name: 'Layout', icon: Layers },
    { id: 'navigation', name: 'Navegación', icon: Code },
    { id: 'feedback', name: 'Feedback', icon: Copy }
  ];

  const [components, setComponents] = useState<Component[]>([]);

  // Cargar componentes del localStorage al montar
  useEffect(() => {
    loadComponents();
  }, []);

  // Guardar componentes en localStorage cuando cambien
  useEffect(() => {
    if (components.length > 0) {
      saveComponents();
    }
  }, [components]);

  const loadComponents = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedComponents = JSON.parse(saved);
        setComponents(parsedComponents);
      } else {
        // Inicializar con componentes mock si no hay datos guardados
        setComponents(getInitialComponents());
      }
    } catch (error) {
      console.error('Error loading components:', error);
      showNotification('error', 'Error al cargar componentes');
      setComponents(getInitialComponents());
    }
  };

  const saveComponents = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(components));
    } catch (error) {
      console.error('Error saving components:', error);
      showNotification('error', 'Error al guardar componentes');
    }
  };

  const getInitialComponents = (): Component[] => [
    {
      id: '1',
      name: 'Button',
      category: 'buttons',
      description: 'Botón reutilizable con múltiples variantes',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      variants: [
        {
          id: '1',
          name: 'Primary',
          description: 'Botón principal',
          code: `<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">\n  {children}\n</button>`
        },
        {
          id: '2',
          name: 'Secondary',
          description: 'Botón secundario',
          code: `<button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors">\n  {children}\n</button>`
        }
      ],
      props: [
        { name: 'children', type: 'ReactNode', required: true, description: 'Contenido del botón' },
        { name: 'variant', type: 'primary | secondary | outline', required: false, defaultValue: 'primary', description: 'Variante del botón' },
        { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Estado deshabilitado' }
      ]
    }
  ];

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredComponents = components.filter(comp => {
    const matchesCategory = comp.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('success', 'Copiado al portapapeles');
  };

  const resetNewComponent = () => {
    setNewComponent({
      name: '',
      category: selectedCategory,
      description: '',
      variants: [],
      props: []
    });
  };

  const addNewVariant = () => {
    if (!newComponent.variants) newComponent.variants = [];
    const newVariant: Variant = {
      id: Date.now().toString(),
      name: 'Nueva Variante',
      description: '',
      code: ''
    };
    setNewComponent(prev => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant]
    }));
  };

  const removeVariant = (variantId: string) => {
    setNewComponent(prev => ({
      ...prev,
      variants: (prev.variants || []).filter(v => v.id !== variantId)
    }));
  };

  const updateVariant = (variantId: string, field: keyof Variant, value: string) => {
    setNewComponent(prev => ({
      ...prev,
      variants: (prev.variants || []).map(v => 
        v.id === variantId ? { ...v, [field]: value } : v
      )
    }));
  };

  const addNewProp = () => {
    if (!newComponent.props) newComponent.props = [];
    const newProp: ComponentProp = {
      name: '',
      type: 'string',
      required: false,
      description: ''
    };
    setNewComponent(prev => ({
      ...prev,
      props: [...(prev.props || []), newProp]
    }));
  };

  const removeProp = (index: number) => {
    setNewComponent(prev => ({
      ...prev,
      props: (prev.props || []).filter((_, i) => i !== index)
    }));
  };

  const updateProp = (index: number, field: keyof ComponentProp, value: any) => {
    setNewComponent(prev => ({
      ...prev,
      props: (prev.props || []).map((prop, i) => 
        i === index ? { ...prop, [field]: value } : prop
      )
    }));
  };

  const saveComponent = () => {
    if (!newComponent.name?.trim()) {
      showNotification('error', 'El nombre del componente es requerido');
      return;
    }

    const now = new Date().toISOString();
    const componentToSave: Component = {
      id: isEditing ? selectedComponent!.id : Date.now().toString(),
      name: newComponent.name.trim(),
      category: newComponent.category || 'buttons',
      description: newComponent.description || '',
      variants: newComponent.variants || [],
      props: newComponent.props || [],
      createdAt: isEditing ? selectedComponent!.createdAt : now,
      updatedAt: now
    };

    if (isEditing) {
      setComponents(prev => prev.map(comp => 
        comp.id === componentToSave.id ? componentToSave : comp
      ));
      showNotification('success', 'Componente actualizado exitosamente');
      setSelectedComponent(componentToSave);
    } else {
      setComponents(prev => [...prev, componentToSave]);
      showNotification('success', 'Componente creado exitosamente');
    }

    setIsCreating(false);
    setIsEditing(false);
    resetNewComponent();
  };

  const editComponent = (component: Component) => {
    setNewComponent({
      name: component.name,
      category: component.category,
      description: component.description,
      variants: [...component.variants],
      props: [...component.props]
    });
    setIsEditing(true);
    setIsCreating(true);
  };

  const deleteComponent = (componentId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este componente?')) {
      setComponents(prev => prev.filter(comp => comp.id !== componentId));
      if (selectedComponent?.id === componentId) {
        setSelectedComponent(null);
      }
      showNotification('success', 'Componente eliminado exitosamente');
    }
  };

  const exportComponents = () => {
    const dataStr = JSON.stringify(components, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `components-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('success', 'Componentes exportados exitosamente');
  };

  const importComponents = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedComponents = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedComponents)) {
          setComponents(importedComponents);
          showNotification('success', 'Componentes importados exitosamente');
        } else {
          showNotification('error', 'Formato de archivo inválido');
        }
      } catch (error) {
        showNotification('error', 'Error al importar componentes');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Componentes Reutilizables</h3>
            <span className="text-sm text-gray-400">({components.length} componentes)</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".json"
              onChange={importComponents}
              className="hidden"
              id="import-components"
            />
            <label
              htmlFor="import-components"
              className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-md hover:bg-blue-500/30 transition-colors cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>Importar</span>
            </label>
            <button
              onClick={exportComponents}
              className="flex items-center space-x-2 px-3 py-2 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-md hover:bg-purple-500/30 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
            <button
              onClick={() => {
                resetNewComponent();
                setIsCreating(true);
                setIsEditing(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-300 border border-green-400/30 rounded-md hover:bg-green-500/30 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Nuevo Componente</span>
            </button>
            <button onClick={onClose} className="text-gray-300 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-4 p-3 rounded-md border ${
            notification.type === 'success' 
              ? 'bg-green-500/20 border-green-400/50 text-green-300'
              : 'bg-red-500/20 border-red-400/50 text-red-300'
          }`}>
            {notification.message}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar componentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="flex flex-1 space-x-6 overflow-hidden">
          {/* Sidebar de Categorías */}
          <div className="w-64 space-y-2">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Categorías</h4>
            {categories.map(({ id, name, icon: Icon }) => {
              const categoryCount = components.filter(c => c.category === id).length;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-left ${
                    selectedCategory === id
                      ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{name}</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{categoryCount}</span>
                </button>
              );
            })}
          </div>

          {/* Contenido Principal */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {!isCreating ? (
              <>
                {/* Lista de Componentes */}
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </h4>
                  <span className="text-sm text-gray-400">
                    {filteredComponents.length} componentes
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 overflow-y-auto">
                  {filteredComponents.map((component) => (
                    <div
                      key={component.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedComponent?.id === component.id
                          ? 'bg-blue-500/20 border-blue-400/50'
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 
                          className="font-medium text-white cursor-pointer"
                          onClick={() => setSelectedComponent(component)}
                        >
                          {component.name}
                        </h5>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                            {component.variants.length} variantes
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              editComponent(component);
                            }}
                            className="p-1 text-blue-300 hover:text-blue-200"
                            title="Editar componente"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteComponent(component.id);
                            }}
                            className="p-1 text-red-300 hover:text-red-200"
                            title="Eliminar componente"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{component.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {component.variants.slice(0, 3).map((variant) => (
                          <span
                            key={variant.id}
                            className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                          >
                            {variant.name}
                          </span>
                        ))}
                        {component.variants.length > 3 && (
                          <span className="text-xs text-gray-400">+{component.variants.length - 3} más</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Actualizado: {new Date(component.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detalles del Componente Seleccionado */}
                {selectedComponent && (
                  <div className="flex-1 p-4 bg-white/5 rounded-lg border border-white/20 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-lg font-medium text-white">{selectedComponent.name}</h5>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => editComponent(selectedComponent)}
                          className="flex items-center space-x-1 text-sm text-blue-300 hover:text-blue-200"
                        >
                          <Edit3 className="h-4 w-4" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(selectedComponent, null, 2))}
                          className="flex items-center space-x-1 text-sm text-green-300 hover:text-green-200"
                        >
                          <Copy className="h-4 w-4" />
                          <span>Copiar JSON</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Variantes */}
                      <div>
                        <h6 className="text-sm font-medium text-gray-300 mb-3">Variantes ({selectedComponent.variants.length})</h6>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {selectedComponent.variants.map((variant) => (
                            <div key={variant.id} className="p-3 bg-white/5 rounded border border-white/10">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-white">{variant.name}</span>
                                <button
                                  onClick={() => copyToClipboard(variant.code)}
                                  className="text-xs text-blue-300 hover:text-blue-200"
                                >
                                  <Copy className="h-3 w-3" />
                                </button>
                              </div>
                              <p className="text-xs text-gray-400 mb-2">{variant.description}</p>
                              <pre className="text-xs bg-black/20 p-2 rounded overflow-x-auto">
                                <code className="text-green-300">{variant.code}</code>
                              </pre>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Props */}
                      <div>
                        <h6 className="text-sm font-medium text-gray-300 mb-3">Props ({selectedComponent.props.length})</h6>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {selectedComponent.props.map((prop, index) => (
                            <div key={index} className="p-2 bg-white/5 rounded border border-white/10">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-white text-sm">{prop.name}</span>
                                <span className="text-xs bg-blue-500/20 text-blue-300 px-1 rounded">
                                  {prop.type}
                                </span>
                                {prop.required && (
                                  <span className="text-xs bg-red-500/20 text-red-300 px-1 rounded">
                                    requerido
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">{prop.description}</p>
                              {prop.defaultValue && (
                                <p className="text-xs text-gray-500">Default: {prop.defaultValue}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Modal de Creación/Edición */
              <div className="flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-medium text-white">
                    {isEditing ? 'Editar Componente' : 'Nuevo Componente'}
                  </h4>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setIsEditing(false);
                      resetNewComponent();
                    }}
                    className="text-gray-300 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Información Básica */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nombre *</label>
                      <input
                        type="text"
                        value={newComponent.name || ''}
                        onChange={(e) => setNewComponent(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Nombre del componente"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
                      <select
                        value={newComponent.category || 'buttons'}
                        onChange={(e) => setNewComponent(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400 [&>option]:bg-gray-800 [&>option]:text-white"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id} className="bg-gray-800 text-white">{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                    <textarea
                      value={newComponent.description || ''}
                      onChange={(e) => setNewComponent(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                      placeholder="Descripción del componente"
                    />
                  </div>

                  {/* Variantes */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h6 className="text-sm font-medium text-gray-300">Variantes</h6>
                      <button
                        onClick={addNewVariant}
                        className="flex items-center space-x-1 text-sm text-green-300 hover:text-green-200"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Añadir Variante</span>
                      </button>
                    </div>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {(newComponent.variants || []).map((variant) => (
                        <div key={variant.id} className="p-4 bg-white/5 rounded border border-white/10">
                          <div className="flex justify-between items-center mb-3">
                            <input
                              type="text"
                              value={variant.name}
                              onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                              className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm mr-2"
                              placeholder="Nombre de la variante"
                            />
                            <button
                              onClick={() => removeVariant(variant.id)}
                              className="text-red-300 hover:text-red-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={variant.description}
                            onChange={(e) => updateVariant(variant.id, 'description', e.target.value)}
                            className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm mb-2"
                            placeholder="Descripción de la variante"
                          />
                          <textarea
                            value={variant.code}
                            onChange={(e) => updateVariant(variant.id, 'code', e.target.value)}
                            rows={4}
                            className="w-full px-2 py-1 bg-black/20 border border-white/20 rounded text-green-300 text-sm font-mono resize-none"
                            placeholder="Código de la variante"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Props */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h6 className="text-sm font-medium text-gray-300">Props</h6>
                      <button
                        onClick={addNewProp}
                        className="flex items-center space-x-1 text-sm text-green-300 hover:text-green-200"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Añadir Prop</span>
                      </button>
                    </div>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {(newComponent.props || []).map((prop, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded border border-white/10">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                            <input
                              type="text"
                              value={prop.name}
                              onChange={(e) => updateProp(index, 'name', e.target.value)}
                              className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                              placeholder="Nombre"
                            />
                            <input
                              type="text"
                              value={prop.type}
                              onChange={(e) => updateProp(index, 'type', e.target.value)}
                              className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                              placeholder="Tipo"
                            />
                            <input
                              type="text"
                              value={prop.defaultValue || ''}
                              onChange={(e) => updateProp(index, 'defaultValue', e.target.value)}
                              className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                              placeholder="Valor por defecto"
                            />
                            <div className="flex items-center space-x-2">
                              <label className="flex items-center space-x-1 text-sm text-gray-300">
                                <input
                                  type="checkbox"
                                  checked={prop.required}
                                  onChange={(e) => updateProp(index, 'required', e.target.checked)}
                                  className="rounded"
                                />
                                <span>Requerido</span>
                              </label>
                              <button
                                onClick={() => removeProp(index)}
                                className="text-red-300 hover:text-red-200"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <input
                            type="text"
                            value={prop.description}
                            onChange={(e) => updateProp(index, 'description', e.target.value)}
                            className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                            placeholder="Descripción"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-white/20">
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setIsEditing(false);
                        resetNewComponent();
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md hover:bg-white/20 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveComponent}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-md hover:bg-green-500/30 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isEditing ? 'Actualizar' : 'Guardar'} Componente</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}