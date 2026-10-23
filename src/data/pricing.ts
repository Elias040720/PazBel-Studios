export interface Plan {
  id: string;
  name: string;
  price: number;
  from?: boolean;
  label: string;
  tag: string;
  featured?: boolean;
  features: string[];
  note: string;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export const developmentPlans: Plan[] = [
  {
    id: 'landing',
    name: 'Landing Page Pro',
    price: 89,
    label: 'Precio de lanzamiento',
    tag: 'Para empezar a destacar',
    features: [
      'Una página responsive de alto impacto para tu negocio',
      'Presentación clara de servicios y botón directo de WhatsApp',
      'Enlaces a redes y optimización técnica de velocidad básica',
      'Estructura orientada a conversión de visitas en consultas',
    ],
    note: 'Cantidad de secciones, contenido y revisiones por acordar antes de contratar.',
  },
  {
    id: 'corporativa',
    name: 'Web Corporativa',
    price: 499,
    label: 'Pago único por desarrollo',
    tag: 'Una presencia más completa',
    featured: true,
    features: [
      'Hasta cinco secciones principales con narrativa fluida',
      'Diseño personalizado, microinteracciones y adaptación móvil total',
      'Secciones de servicios, catálogo referencial, FAQ y WhatsApp',
      'SEO técnico inicial y alta en Google Search Console',
    ],
    note: 'Son secciones modulares dentro de la experiencia principal. Administración según alcance acordado.',
  },
  {
    id: 'tienda',
    name: 'E-commerce',
    price: 1200,
    label: 'Desarrollo base',
    tag: 'Tu catálogo, abierto al mundo',
    features: [
      'Catálogo interactivo con fichas de producto y carrito de compras',
      'Tienda responsive con diseño editorial y navegación rápida',
      'Opciones de integración con pasarelas de pago peruanas o pedidos directos por WhatsApp',
      'Panel básico para administración de stock y pedidos',
    ],
    note: 'Límites de productos, medios de pago y pasarelas se delimitan en la propuesta técnica.',
  },
  {
    id: 'software',
    name: 'Software a medida',
    price: 1890,
    from: true,
    label: 'Cotización personalizada',
    tag: 'Cuando tu idea necesita más',
    features: [
      'Sistemas de reservas, inventarios o administración operativa',
      'Plataformas SaaS, paneles multiusuario y CRM personalizados',
      'Automatización de procesos para ahorrar horas manuales cada semana',
      'Arquitectura escalable en base de datos e integraciones con APIs',
    ],
    note: 'Importe de entrada referencial. Requiere análisis de requerimientos y cotización personalizada.',
  },
];

export const subscriptionPlans: Subscription[] = [
  {
    id: 'none',
    name: 'Sin acompañamiento mensual',
    price: 0,
    features: ['Entrega completa del código fuente', 'Garantía inicial de estabilidad de 30 días'],
  },
  {
    id: 'mantenimiento',
    name: 'Mantenimiento & Velocidad',
    price: 89,
    features: [
      'Hosting cloud de alto rendimiento según condiciones, SSL y respaldos semanales',
      'Monitoreo continuo de uptime y seguridad preventiva',
      'Hasta dos actualizaciones puntuales de contenido o imágenes al mes',
      'Soporte técnico directo vía WhatsApp',
    ],
  },
  {
    id: 'traccion',
    name: 'Plan Tracción',
    price: 349,
    features: [
      'Todo lo incluido en Mantenimiento & Velocidad',
      'Gestión y optimización técnica de una campaña mensual (Meta Ads o Google Ads)',
      'Cuatro piezas digitales o ajustes de copy orientados a conversión',
      'Reporte mensual de rendimiento y consultas recibidas (anuncios se pagan por separado)',
    ],
  },
  {
    id: 'growth',
    name: 'Full Growth Partner',
    price: 690,
    features: [
      'Gestión semanal avanzada de campañas y soporte técnico prioritario',
      'Creación de landing pages experimentales dentro del alcance acordado',
      'Ajustes continuos de tasa de conversión (CRO) y analítica de eventos',
      'Reunión mensual estratégica de crecimiento (inversión publicitaria por separado)',
    ],
  },
];

export function formatMoney(amount: number): string {
  return `S/ ${new Intl.NumberFormat('es-PE').format(amount)}`;
}
