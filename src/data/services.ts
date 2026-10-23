export interface ServiceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  targetHref: string;
  ctaText: string;
  features: string[];
  wide?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'web',
    number: '01',
    category: 'Presencia & Autoridad',
    title: 'Desarrollo web profesional',
    description:
      'Landings de lanzamiento y webs corporativas diseñadas a medida. Creamos páginas veloces, accesibles y estéticamente memorables que transmiten solvencia y multiplican tus consultas por WhatsApp.',
    targetHref: '#precios',
    ctaText: 'Ver planes de desarrollo',
    features: ['Diseño editorial a medida', '100% responsive y fluido', 'Optimización técnica de velocidad (Core Web Vitals)'],
    wide: true,
  },
  {
    id: 'tiendas',
    number: '02',
    category: 'Comercio Digital',
    title: 'Tiendas virtuales',
    description:
      'Catálogo interactivo, carrito de compras y experiencia de compra sin fricción pensada específicamente para el comprador peruano.',
    targetHref: '#cotizador',
    ctaText: 'Cotizar tienda',
    features: ['Catálogo organizado', 'Pasarelas o WhatsApp', 'Carga inmediata en móviles'],
  },
  {
    id: 'software',
    number: '03',
    category: 'Operación & Eficiencia',
    title: 'Software a medida',
    description:
      'Sistemas web para reservas, administración interna, control de órdenes y automatizaciones que eliminan el desorden de hojas de cálculo.',
    targetHref: '#cotizador',
    ctaText: 'Explorar solución',
    features: ['Bases de datos optimizadas', 'Roles y permisos', 'Flujos automatizados'],
  },
  {
    id: 'saas',
    number: '04',
    category: 'Producto Digital',
    title: 'Plataformas SaaS',
    description:
      'De la idea en papel a un producto funcional con interfaces pulidas, autenticación segura y arquitectura lista para escalar usuarios.',
    targetHref: '#proyectos',
    ctaText: 'Ver plataformas',
    features: ['Arquitectura modular', 'APIs RESTful y TypeScript', 'Métricas de retención'],
  },
  {
    id: 'marketing',
    number: '05',
    category: 'Continuidad & Crecimiento',
    title: 'Marketing y acompañamiento',
    description:
      'Campañas de atracción en Meta o Google, piezas de diseño y mejoras continuas sobre tu web para aprender qué convierte mejor cada mes.',
    targetHref: '#marketing',
    ctaText: 'Conocer acompañamiento',
    features: ['Gestión de anuncios (anuncios aparte)', 'Mejora continua de copy', 'Reporte mensual de rendimiento'],
    wide: true,
  },
];
