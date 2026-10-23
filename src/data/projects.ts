export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  stack: string[];
  status: string;
  ctaText: string;
  whatsappMessage: string;
  highlights: string[];
  colorTheme: {
    accent: string;
    bgPreview: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: 'mova',
    name: 'MOVA',
    category: 'EdTech / Plataforma Web',
    headline: 'Conectar personas. Abrir posibilidades.',
    description:
      'Plataforma educativa para conectar familias con docentes especializados y organizar clases particulares individuales. Integra agendamiento, perfiles docentes verificados y panel de seguimiento escolar.',
    stack: ['Laravel', 'Vue.js', 'Inertia.js', 'MySQL', 'Tailwind CSS'],
    status: 'Código local verificado · Demostración conceptual rotulada',
    ctaText: 'Quiero una plataforma como MOVA',
    whatsappMessage:
      'Hola, PazBel Studios. Vi el proyecto MOVA en su portafolio y me interesa cotizar una plataforma web o EdTech con características similares.',
    highlights: [
      'Agendamiento de sesiones 1 a 1',
      'Panel para familias y panel docente',
      'Flujo de pago y reservas estructurado',
    ],
    colorTheme: {
      accent: '#647c58',
      bgPreview: '#121915',
    },
  },
  {
    id: 'chambi',
    name: 'CHAMBI MOTORS',
    category: 'Automotriz / Experiencia Digital',
    headline: 'La confianza también se diseña.',
    description:
      'Presencia digital de alto impacto para taller y venta automotriz. Combina narrativa visual con presentación minuciosa de servicios, cotización rápida de mantenimiento preventivo y catálogo de vehículos.',
    stack: ['Next.js', 'React', 'Three.js / Canvas', 'Tailwind CSS', 'Vercel'],
    status: 'Código local verificado · Demostración conceptual rotulada',
    ctaText: 'Quiero una web para mi negocio automotriz',
    whatsappMessage:
      'Hola, PazBel Studios. Vi el proyecto Chambi Motors en su web y quiero cotizar una presencia digital impactante para mi negocio.',
    highlights: [
      'Filtros dinámicos de servicios',
      'Cotización de diagnósticos en 2 clics',
      'Carga ultrarrápida adaptada a móviles',
    ],
    colorTheme: {
      accent: '#f37251',
      bgPreview: '#20120f',
    },
  },
  {
    id: 'carwash',
    name: 'CARWASHALITA S.A.C.',
    category: 'Software / Gestión Operativa',
    headline: 'Menos tareas sueltas. Más control.',
    description:
      'Sistema digital orientado a ordenar el flujo diario de lavado y detailing automotriz: recepción de vehículos, asignación de bahías de atención, control de estados en tiempo real y registro de caja.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'PWA'],
    status: 'Estado y alcance operativo en confirmación · Demostración conceptual',
    ctaText: 'Necesito un sistema para mi empresa',
    whatsappMessage:
      'Hola, PazBel Studios. Me interesa una solución de gestión y control operativo similar a CARWASHALITA para optimizar los procesos de mi empresa.',
    highlights: [
      'Tablero de órdenes en tiempo real',
      'Control de estados: Recibir → Atender → Completar',
      'Reducción de extravíos y tiempos muertos',
    ],
    colorTheme: {
      accent: '#397cff',
      bgPreview: '#0d1524',
    },
  },
];
