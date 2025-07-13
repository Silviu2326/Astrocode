import {
  Target,
  Users,
  Workflow,
  MessageSquare,
  Stethoscope,
  Table
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

export const problemFocusedModes: GenerationMode[] = [
  {
    id: 'dolores-proyectos',
    name: 'Dolores → Proyectos',
    description: 'Parte de los "pains" más fuertes que sufre un nicho',
    icon: Target,
    color: 'from-red-500 to-orange-600',
    fields: [
      { name: 'sector', label: 'Sector', type: 'text', placeholder: 'Ej: salud, educación, fintech...' },
      { name: 'tipoCliente', label: 'Tipo de Cliente', type: 'text', placeholder: 'Ej: pymes, freelancers, estudiantes...' },
      { name: 'nivelDolor', label: 'Nivel de Dolor', type: 'select', options: ['Alto', 'Medio', 'Bajo'] }
    ]
  },
  {
    id: 'persona-canvas',
    name: 'Persona Canvas',
    description: 'Enfoque en tareas y frustraciones de un perfil concreto',
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    fields: [
      { name: 'rol', label: 'Rol del Usuario', type: 'text', placeholder: 'Ej: CTO de pymes, diseñador freelance...' },
      { name: 'objetivoPrincipal', label: 'Objetivo Principal', type: 'text', placeholder: 'Ej: reducir costos operativos...' },
      { name: 'barreras', label: 'Principales Barreras', type: 'textarea', placeholder: 'Describe las frustraciones y obstáculos...' }
    ]
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Elimina pasos manuales de un proceso existente',
    icon: Workflow,
    color: 'from-purple-500 to-indigo-600',
    fields: [
      { name: 'procesoActual', label: 'Proceso Actual', type: 'textarea', placeholder: 'Describe el proceso manual actual...' },
      { name: 'pasosRepetitivos', label: 'Pasos Repetitivos', type: 'text', placeholder: 'Ej: envío de emails, generación de reportes...' },
      { name: 'frecuencia', label: 'Frecuencia', type: 'select', options: ['Diaria', 'Semanal', 'Mensual', 'Trimestral'] }
    ]
  },
  {
    id: 'community-pulse',
    name: 'Community Pulse',
    description: 'Captura dolores recurrentes en foros/Discord/Reddit',
    icon: MessageSquare,
    color: 'from-green-500 to-teal-600',
    fields: [
      { name: 'comunidad', label: 'Comunidad Objetivo', type: 'text', placeholder: 'Ej: r/webdev, Discord de startups...' },
      { name: 'problemasRecurrentes', label: 'Problemas Recurrentes', type: 'textarea', placeholder: 'Problemas que se mencionan frecuentemente...' },
      { name: 'tamanoComunidad', label: 'Tamaño de Comunidad', type: 'text', placeholder: 'Ej: 50k miembros, 10k activos...' }
    ]
  },
  {
    id: 'in-house-ops-doctor',
    name: 'In-House Ops Doctor',
    description: 'Detecta cuellos de botella internos de la empresa',
    icon: Stethoscope,
    color: 'from-red-500 to-pink-600',
    fields: [
      { name: 'departamento', label: 'Departamento', type: 'select', options: ['IT', 'RRHH', 'Ventas', 'Marketing', 'Operaciones', 'Finanzas'] },
      { name: 'cuelloBotella', label: 'Cuello de Botella', type: 'textarea', placeholder: 'Describe el problema operativo...' },
      { name: 'impactoTiempo', label: 'Impacto en Tiempo', type: 'text', placeholder: 'Ej: 2 horas diarias, 1 día semanal...' }
    ]
  },
  {
    id: 'spreadsheet-to-saas',
    name: 'Spreadsheet → SaaS',
    description: 'Sustituye hojas de cálculo que ya duelen al equipo',
    icon: Table,
    color: 'from-yellow-500 to-orange-600',
    fields: [
      { name: 'tipoHoja', label: 'Tipo de Hoja de Cálculo', type: 'select', options: ['Control de inventario', 'Gestión de proyectos', 'CRM básico', 'Contabilidad', 'Planificación', 'Reportes'] },
      { name: 'limitaciones', label: 'Limitaciones Actuales', type: 'textarea', placeholder: 'Qué problemas causa la hoja actual...' },
      { name: 'usuarios', label: 'Número de Usuarios', type: 'text', placeholder: 'Ej: 5-10 personas, todo el equipo...' }
    ]
  }
];