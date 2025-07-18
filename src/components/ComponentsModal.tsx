import React, { useState, useEffect } from 'react';
import { X, Package, Code, Copy, Plus, Trash2, Edit3, Layers, Save, Search, Download, Upload, Sidebar, Square, Table } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('sidebar');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  const [newComponent, setNewComponent] = useState<Partial<Component>>({
    name: '',
    category: 'sidebar',
    description: '',
    variants: [],
    props: []
  });

  const categories = [
    { id: 'sidebar', name: 'Sidebar', icon: Sidebar },
    { id: 'button', name: 'Button', icon: Square },
    { id: 'table', name: 'Table', icon: Table }
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
        // Verificar que los datos sean válidos
        if (Array.isArray(parsedComponents) && parsedComponents.length > 0) {
          setComponents(parsedComponents);
        } else {
          // Si los datos no son válidos, usar componentes iniciales
          const initialComponents = getInitialComponents();
          setComponents(initialComponents);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialComponents));
        }
      } else {
        // Inicializar con componentes mock si no hay datos guardados
        const initialComponents = getInitialComponents();
        setComponents(initialComponents);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialComponents));
      }
    } catch (error) {
      console.error('Error loading components:', error);
      showNotification('error', 'Error al cargar componentes');
      // Limpiar localStorage corrupto y usar componentes iniciales
      localStorage.removeItem(STORAGE_KEY);
      const initialComponents = getInitialComponents();
      setComponents(initialComponents);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialComponents));
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
      name: 'Sidebar',
      category: 'sidebar',
      description: 'Barra lateral de navegación reutilizable',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      variants: [
        {
          id: '1',
          name: 'Default',
          description: 'Sidebar básico',
          code: `<div className="w-64 h-screen bg-slate-900 border-r border-slate-700 flex flex-col">\n  <div className="p-4 border-b border-slate-700">\n    <h2 className="text-white font-semibold">{title}</h2>\n  </div>\n  <nav className="flex-1 p-4">\n    {children}\n  </nav>\n</div>`
        },
        {
          id: '2',
          name: 'Collapsible',
          description: 'Sidebar colapsable',
          code: `<div className={\`h-screen bg-slate-900 border-r border-slate-700 flex flex-col transition-all duration-300 \${collapsed ? 'w-16' : 'w-64'}\`}>\n  <div className="p-4 border-b border-slate-700">\n    <button onClick={onToggle} className="text-white">\n      {collapsed ? '→' : '←'}\n    </button>\n    {!collapsed && <h2 className="text-white font-semibold mt-2">{title}</h2>}\n  </div>\n  <nav className="flex-1 p-4">\n    {children}\n  </nav>\n</div>`
        },
        {
          id: '3',
          name: 'Mini',
          description: 'Sidebar compacto',
          code: `<div className="w-16 h-screen bg-slate-900 border-r border-slate-700 flex flex-col">\n  <div className="p-2 border-b border-slate-700 text-center">\n    <div className="w-8 h-8 bg-blue-500 rounded-md mx-auto"></div>\n  </div>\n  <nav className="flex-1 p-2 space-y-2">\n    {children}\n  </nav>\n</div>`
        }
      ],
      props: [
        { name: 'title', type: 'string', required: true, description: 'Título del sidebar' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Contenido de navegación' },
        { name: 'collapsed', type: 'boolean', required: false, defaultValue: 'false', description: 'Estado colapsado' },
        { name: 'onToggle', type: 'function', required: false, description: 'Función para alternar colapso' }
      ]
    },
    {
      id: '2',
      name: 'Button',
      category: 'button',
      description: 'Botón reutilizable con múltiples variantes responsive',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      variants: [
        {
          id: '1',
          name: 'Primary',
          description: 'Botón principal responsive',
          code: `<button className="bg-primary hover:bg-primaryHover text-textInverse xs:px-2 xs:py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>\n  {children}\n</button>`
        },
        {
          id: '2',
          name: 'Secondary',
          description: 'Botón secundario responsive',
          code: `<button className="bg-secondary hover:bg-secondaryHover text-textInverse xs:px-2 xs:py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>\n  {children}\n</button>`
        },
        {
          id: '3',
          name: 'Outline',
          description: 'Botón con borde responsive',
          code: `<button className="border border-primary text-primary hover:bg-primary hover:text-textInverse xs:px-2 xs:py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>\n  {children}\n</button>`
        },
        {
          id: '4',
          name: 'Ghost',
          description: 'Botón transparente responsive',
          code: `<button className="text-primary hover:bg-primaryLight xs:px-2 xs:py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>\n  {children}\n</button>`
        },
        {
          id: '5',
          name: 'Danger',
          description: 'Botón de peligro responsive',
          code: `<button className="bg-error hover:bg-errorDark text-textInverse xs:px-2 xs:py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>\n  {children}\n</button>`
        }
      ],
      props: [
        { name: 'children', type: 'ReactNode', required: true, description: 'Contenido del botón' },
        { name: 'variant', type: 'primary | secondary | outline | ghost | danger', required: false, defaultValue: 'primary', description: 'Variante del botón' },
        { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Estado deshabilitado' },
        { name: 'onClick', type: 'function', required: false, description: 'Función de click' },
        { name: 'size', type: 'sm | md | lg', required: false, defaultValue: 'md', description: 'Tamaño del botón' }
      ]
    },
    {
      id: '3',
      name: 'Table',
      category: 'table',
      description: 'Tabla reutilizable responsive con funcionalidades básicas',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      variants: [
        {
          id: '1',
          name: 'Basic',
          description: 'Tabla básica responsive',
          code: `<div className="overflow-x-auto">\n  <table className="min-w-full bg-surface border border-border">\n    <thead className="bg-backgroundSecondary">\n      <tr>\n        {headers.map((header, index) => (\n          <th key={index} className="xs:px-2 xs:py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 text-left xs:text-xs sm:text-sm md:text-base font-medium text-textSecondary uppercase tracking-wider">\n            {header}\n          </th>\n        ))}\n      </tr>\n    </thead>\n    <tbody className="bg-surface divide-y divide-border">\n      {data.map((row, rowIndex) => (\n        <tr key={rowIndex}>\n          {row.map((cell, cellIndex) => (\n            <td key={cellIndex} className="xs:px-2 xs:py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 whitespace-nowrap xs:text-xs sm:text-sm md:text-base text-text">\n              {cell}\n            </td>\n          ))}\n        </tr>\n      ))}\n    </tbody>\n  </table>\n</div>`
        },
        {
          id: '2',
          name: 'Striped',
          description: 'Tabla con filas alternadas responsive',
          code: `<div className="overflow-x-auto">\n  <table className="min-w-full bg-surface border border-border">\n    <thead className="bg-backgroundSecondary">\n      <tr>\n        {headers.map((header, index) => (\n          <th key={index} className="xs:px-2 xs:py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 text-left xs:text-xs sm:text-sm md:text-base font-medium text-textSecondary uppercase tracking-wider">\n            {header}\n          </th>\n        ))}\n      </tr>\n    </thead>\n    <tbody className="bg-surface divide-y divide-border">\n      {data.map((row, rowIndex) => (\n        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-surface' : 'bg-backgroundSecondary'}>\n          {row.map((cell, cellIndex) => (\n            <td key={cellIndex} className="xs:px-2 xs:py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 whitespace-nowrap xs:text-xs sm:text-sm md:text-base text-text">\n              {cell}\n            </td>\n          ))}\n        </tr>\n      ))}\n    </tbody>\n  </table>\n</div>`
        },
        {
          id: '3',
          name: 'Dark',
          description: 'Tabla con tema oscuro responsive',
          code: `<div className="overflow-x-auto">\n  <table className="min-w-full bg-backgroundSecondary border border-borderLight">\n    <thead className="bg-background">\n      <tr>\n        {headers.map((header, index) => (\n          <th key={index} className="xs:px-2 xs:py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 text-left xs:text-xs sm:text-sm md:text-base font-medium text-textMuted uppercase tracking-wider">\n            {header}\n          </th>\n        ))}\n      </tr>\n    </thead>\n    <tbody className="bg-backgroundSecondary divide-y divide-borderLight">\n      {data.map((row, rowIndex) => (\n        <tr key={rowIndex}>\n          {row.map((cell, cellIndex) => (\n            <td key={cellIndex} className="xs:px-2 xs:py-1 sm:px-4 sm:py-2 md:px-6 md:py-4 whitespace-nowrap xs:text-xs sm:text-sm md:text-base text-textSecondary">\n              {cell}\n            </td>\n          ))}\n        </tr>\n      ))}\n    </tbody>\n  </table>\n</div>`
        },
        {
          id: '4',
          name: 'Compact',
          description: 'Tabla compacta responsive',
          code: `<div className="overflow-x-auto">\n  <table className="min-w-full bg-surface border border-border">\n    <thead className="bg-backgroundSecondary">\n      <tr>\n        {headers.map((header, index) => (\n          <th key={index} className="xs:px-1 xs:py-1 sm:px-2 sm:py-1 md:px-3 md:py-2 text-left xs:text-xs sm:text-sm font-medium text-textSecondary uppercase tracking-wider">\n            {header}\n          </th>\n        ))}\n      </tr>\n    </thead>\n    <tbody className="bg-surface divide-y divide-border">\n      {data.map((row, rowIndex) => (\n        <tr key={rowIndex}>\n          {row.map((cell, cellIndex) => (\n            <td key={cellIndex} className="xs:px-1 xs:py-1 sm:px-2 sm:py-1 md:px-3 md:py-2 whitespace-nowrap xs:text-xs sm:text-sm text-text">\n              {cell}\n            </td>\n          ))}\n        </tr>\n      ))}\n    </tbody>\n  </table>\n</div>`
        }
      ],
      props: [
        { name: 'headers', type: 'string[]', required: true, description: 'Array de encabezados de columnas' },
        { name: 'data', type: 'any[][]', required: true, description: 'Array bidimensional con los datos de la tabla' },
        { name: 'striped', type: 'boolean', required: false, defaultValue: 'false', description: 'Filas alternadas' },
        { name: 'dark', type: 'boolean', required: false, defaultValue: 'false', description: 'Tema oscuro' },
        { name: 'compact', type: 'boolean', required: false, defaultValue: 'false', description: 'Estilo compacto' }
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
      category: newComponent.category || 'sidebar',
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

                <div className="flex flex-1 space-x-6 overflow-hidden">
                  {/* Lista de componentes */}
                  <div className="w-80 space-y-3 overflow-y-auto">
                    {filteredComponents.map(component => (
                      <div
                        key={component.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedComponent?.id === component.id
                            ? 'bg-green-500/20 border-green-400/50'
                            : 'bg-white/5 border-white/20 hover:bg-white/10'
                        }`}
                        onClick={() => setSelectedComponent(component)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-white">{component.name}</h5>
                          <div className="flex space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                editComponent(component);
                              }}
                              className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded"
                            >
                              <Edit3 className="h-3 w-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteComponent(component.id);
                              }}
                              className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{component.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{component.variants.length} variantes</span>
                          <span>{component.props.length} props</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detalles del componente */}
                  <div className="flex-1 overflow-y-auto">
                    {selectedComponent ? (
                      <div className="space-y-6">
                        {/* Header del componente */}
                        <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                          <h3 className="text-xl font-semibold text-white mb-2">{selectedComponent.name}</h3>
                          <p className="text-gray-400 mb-4">{selectedComponent.description}</p>
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <span>Creado: {new Date(selectedComponent.createdAt).toLocaleDateString()}</span>
                            <span>Actualizado: {new Date(selectedComponent.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Props */}
                        {selectedComponent.props.length > 0 && (
                          <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                            <h4 className="text-lg font-medium text-white mb-3">Props</h4>
                            <div className="space-y-3">
                              {selectedComponent.props.map((prop, index) => (
                                <div key={index} className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-mono text-blue-300">{prop.name}</span>
                                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                        {prop.type}
                                      </span>
                                      {prop.required && (
                                        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                                          requerido
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">{prop.description}</p>
                                    {prop.defaultValue && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        Por defecto: <span className="font-mono">{prop.defaultValue}</span>
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Variantes */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-white">Variantes ({selectedComponent.variants.length})</h4>
                          {selectedComponent.variants.map(variant => (
                            <div key={variant.id} className="bg-white/5 border border-white/20 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h5 className="font-medium text-white">{variant.name}</h5>
                                  <p className="text-sm text-gray-400">{variant.description}</p>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(variant.code)}
                                  className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded hover:bg-blue-500/30 transition-colors"
                                >
                                  <Copy className="h-3 w-3" />
                                  <span className="text-xs">Copiar</span>
                                </button>
                              </div>
                              <pre className="bg-black/30 p-3 rounded text-sm text-gray-300 overflow-x-auto">
                                <code>{variant.code}</code>
                              </pre>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Selecciona un componente para ver sus detalles</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Formulario de creación/edición */
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium text-white">
                    {isEditing ? 'Editar Componente' : 'Nuevo Componente'}
                  </h4>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setIsEditing(false);
                      resetNewComponent();
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Información básica */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Nombre</label>
                      <input
                        type="text"
                        value={newComponent.name || ''}
                        onChange={(e) => setNewComponent(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Nombre del componente"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Categoría</label>
                      <select
                        value={newComponent.category || 'sidebar'}
                        onChange={(e) => setNewComponent(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id} className="bg-slate-800">{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Descripción</label>
                      <textarea
                        value={newComponent.description || ''}
                        onChange={(e) => setNewComponent(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                        placeholder="Descripción del componente"
                        rows={3}
                      />
                    </div>

                    {/* Props */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-medium text-white">Props</label>
                        <button
                          onClick={addNewProp}
                          className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 text-green-300 border border-green-400/30 rounded text-xs hover:bg-green-500/30 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Agregar</span>
                        </button>
                      </div>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {(newComponent.props || []).map((prop, index) => (
                          <div key={index} className="bg-white/5 border border-white/20 rounded p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1 grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={prop.name}
                                  onChange={(e) => updateProp(index, 'name', e.target.value)}
                                  className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs"
                                  placeholder="Nombre"
                                />
                                <input
                                  type="text"
                                  value={prop.type}
                                  onChange={(e) => updateProp(index, 'type', e.target.value)}
                                  className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs"
                                  placeholder="Tipo"
                                />
                              </div>
                              <button
                                onClick={() => removeProp(index)}
                                className="ml-2 p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <input
                                type="text"
                                value={prop.defaultValue || ''}
                                onChange={(e) => updateProp(index, 'defaultValue', e.target.value)}
                                className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs"
                                placeholder="Valor por defecto"
                              />
                              <label className="flex items-center space-x-2 text-xs text-gray-300">
                                <input
                                  type="checkbox"
                                  checked={prop.required}
                                  onChange={(e) => updateProp(index, 'required', e.target.checked)}
                                  className="rounded"
                                />
                                <span>Requerido</span>
                              </label>
                            </div>
                            <textarea
                              value={prop.description}
                              onChange={(e) => updateProp(index, 'description', e.target.value)}
                              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs resize-none"
                              placeholder="Descripción"
                              rows={2}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Variantes */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium text-white">Variantes</label>
                      <button
                        onClick={addNewVariant}
                        className="flex items-center space-x-1 px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded text-xs hover:bg-blue-500/30 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Agregar</span>
                      </button>
                    </div>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {(newComponent.variants || []).map(variant => (
                        <div key={variant.id} className="bg-white/5 border border-white/20 rounded p-3">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                value={variant.name}
                                onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                                placeholder="Nombre de la variante"
                              />
                              <input
                                type="text"
                                value={variant.description}
                                onChange={(e) => updateVariant(variant.id, 'description', e.target.value)}
                                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                                placeholder="Descripción"
                              />
                            </div>
                            <button
                              onClick={() => removeVariant(variant.id)}
                              className="ml-2 p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                          <textarea
                            value={variant.code}
                            onChange={(e) => updateVariant(variant.id, 'code', e.target.value)}
                            className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded text-white font-mono text-sm resize-none"
                            placeholder="Código JSX del componente"
                            rows={6}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-white/20">
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setIsEditing(false);
                      resetNewComponent();
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 border border-white/30 rounded-md hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveComponent}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-500/20 border border-green-400/30 rounded-md hover:bg-green-500/30 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isEditing ? 'Actualizar' : 'Crear'} Componente</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}