import { 
  Cpu, Database, FileText, Link, Smartphone, Brain, Cloud, Heart
} from 'lucide-react';

export interface GenerationModeField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'url';
  placeholder?: string;
  options?: string[];
}

export interface GenerationMode {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  fields: GenerationModeField[];
}

export const techFocusedModes: GenerationMode[] = [
  {
    id: 'tech-first',
    name: 'Tech-First',
    description: 'Parte de una tecnología/tendencia concreta',
    icon: Cpu,
    color: 'from-cyan-500 to-blue-600',
    fields: [
      { name: 'tecnologia', label: 'Tecnología', type: 'select', options: ['LLMs/IA', 'Computer Vision', 'Blockchain', 'IoT', 'AR/VR', 'Edge Computing', 'Quantum Computing', 'Web3'] },
      { name: 'nicho', label: 'Nicho de Aplicación', type: 'text', placeholder: 'Ej: educación, salud, retail...' },
      { name: 'casoUso', label: 'Caso de Uso', type: 'text', placeholder: 'Ej: automatización, análisis, personalización...' }
    ]
  },
  {
    id: 'datos-internos',
    name: 'Datos Internos',
    description: 'Explota feedback o bases de datos propias',
    icon: Database,
    color: 'from-yellow-500 to-orange-600',
    fields: [
      { name: 'tipoFeedback', label: 'Tipo de Datos', type: 'select', options: ['Tickets de soporte', 'Encuestas NPS', 'Reviews de usuarios', 'Analytics de uso', 'Logs de sistema', 'Datos de ventas'] },
      { name: 'volumenDatos', label: 'Volumen de Datos', type: 'text', placeholder: 'Ej: 1000 tickets, 500 encuestas...' },
      { name: 'periodo', label: 'Período', type: 'text', placeholder: 'Ej: últimos 6 meses, último año...' }
    ]
  },
  {
    id: 'content-leverage',
    name: 'Content Leverage',
    description: 'Reutiliza librerías de contenido existentes',
    icon: FileText,
    color: 'from-teal-500 to-green-600',
    fields: [
      { name: 'tipoContenido', label: 'Tipo de Contenido', type: 'select', options: ['Artículos/Blog', 'Videos', 'Podcasts', 'Cursos', 'Documentación', 'Webinars', 'Ebooks'] },
      { name: 'volumen', label: 'Volumen', type: 'text', placeholder: 'Ej: 500 artículos, 100 videos...' },
      { name: 'tematica', label: 'Temática Principal', type: 'text', placeholder: 'Ej: marketing digital, programación...' }
    ]
  },
  {
    id: 'api-mashup',
    name: 'API Mash-Up',
    description: 'Combina varias APIs para crear valor nuevo',
    icon: Link,
    color: 'from-violet-500 to-purple-600',
    fields: [
      { name: 'api1', label: 'Primera API', type: 'select', options: ['Slack', 'Shopify', 'Stripe', 'Google Workspace', 'Salesforce', 'HubSpot', 'Notion', 'Airtable', 'Trello'] },
      { name: 'api2', label: 'Segunda API', type: 'select', options: ['Slack', 'Shopify', 'Stripe', 'Google Workspace', 'Salesforce', 'HubSpot', 'Notion', 'Airtable', 'Trello'] },
      { name: 'casoUso', label: 'Caso de Uso', type: 'text', placeholder: 'Ej: sincronizar datos, automatizar workflows...' }
    ]
  },
  {
    id: 'data-treasure',
    name: 'Data Treasure',
    description: 'Monetiza datos infrautilizados',
    icon: Database,
    color: 'from-amber-500 to-yellow-600',
    fields: [
      { name: 'tipoDatos', label: 'Tipo de Datos', type: 'select', options: ['Datos de comportamiento', 'Datos geográficos', 'Datos de mercado', 'Datos de rendimiento', 'Datos demográficos'] },
      { name: 'fuenteDatos', label: 'Fuente de Datos', type: 'text', placeholder: 'Ej: app móvil, website, sensores IoT...' },
      { name: 'valorPotencial', label: 'Valor Potencial', type: 'textarea', placeholder: 'Cómo se puede monetizar esta información...' }
    ]
  },
  {
    id: 'device-first-iot-bridge',
    name: 'Device-First IoT Bridge',
    description: 'Arranca de un hardware/sensor disponible',
    icon: Smartphone,
    color: 'from-blue-500 to-purple-600',
    fields: [
      { name: 'tipoDispositivo', label: 'Tipo de Dispositivo', type: 'select', options: ['Sensores ambientales', 'Wearables', 'Cámaras inteligentes', 'Sensores industriales', 'Dispositivos médicos'] },
      { name: 'datosCapturados', label: 'Datos Capturados', type: 'text', placeholder: 'Ej: temperatura, movimiento, imágenes...' },
      { name: 'aplicacion', label: 'Aplicación Objetivo', type: 'text', placeholder: 'Ej: monitoreo de cultivos, seguridad...' }
    ]
  },
  {
    id: 'ai-performance-booster',
    name: 'AI Performance Booster',
    description: 'Mejora el rendimiento de modelos ML actuales',
    icon: Brain,
    color: 'from-pink-500 to-red-600',
    fields: [
      { name: 'tipoModelo', label: 'Tipo de Modelo', type: 'select', options: ['NLP/LLM', 'Computer Vision', 'Predicción', 'Clasificación', 'Recomendación', 'Detección de anomalías'] },
      { name: 'metricaObjetivo', label: 'Métrica a Mejorar', type: 'select', options: ['Precisión', 'Velocidad', 'Eficiencia energética', 'Costo computacional', 'Interpretabilidad'] },
      { name: 'dominioAplicacion', label: 'Dominio de Aplicación', type: 'text', placeholder: 'Ej: diagnóstico médico, trading...' }
    ]
  },
  {
    id: 'legacy-to-cloud',
    name: 'Legacy-to-Cloud',
    description: 'Moderniza software on-prem obsoleto',
    icon: Cloud,
    color: 'from-gray-500 to-blue-600',
    fields: [
      { name: 'sistemaLegacy', label: 'Sistema Legacy', type: 'text', placeholder: 'Ej: ERP de los 90, sistema contable...' },
      { name: 'problemasActuales', label: 'Problemas Actuales', type: 'textarea', placeholder: 'Limitaciones del sistema actual...' },
      { name: 'industria', label: 'Industria', type: 'text', placeholder: 'Ej: manufactura, retail, servicios...' }
    ]
  },
  {
    id: 'emotion-ai-enhancer',
    name: 'Emotion-AI Enhancer',
    description: 'Añade análisis emocional en tiempo real',
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    fields: [
      { name: 'aplicacionBase', label: 'Aplicación Base', type: 'select', options: ['Videoconferencias', 'E-learning', 'Customer service', 'Retail', 'Healthcare', 'Gaming'] },
      { name: 'emocionesObjetivo', label: 'Emociones a Detectar', type: 'text', placeholder: 'Ej: satisfacción, estrés, engagement...' },
      { name: 'accionesRespuesta', label: 'Acciones de Respuesta', type: 'textarea', placeholder: 'Qué hacer cuando se detecta cada emoción...' }
    ]
  }
];