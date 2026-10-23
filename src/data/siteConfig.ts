export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const siteConfig = {
  brand: 'PazBel Studios',
  tagline: 'Diseño que impacta. Ingeniería que funciona.',
  subtagline: 'Desde Perú, para tu próxima idea.',
  whatsapp: '+51916666934',
  officialPhoneFormatted: '+51 916 666 934',
  commercial: {
    tax: 'Tratamiento de IGV sujeto a confirmación fiscal según el tipo de contratación.',
    exclusions:
      'Dominio, alojamiento, licencias e integraciones de terceros se cotizan por separado, salvo especificación en el contrato. La inversión publicitaria en Meta Ads o Google Ads no está incluida en los honorarios de gestión.',
  },
  navigation: [
    { id: 'inicio', label: 'Inicio', href: '#inicio' },
    { id: 'enfoque', label: 'Enfoque', href: '#enfoque' },
    { id: 'servicios', label: 'Servicios', href: '#servicios' },
    { id: 'proceso', label: 'Proceso', href: '#proceso' },
    { id: 'proyectos', label: 'Portafolio', href: '#proyectos' },
    { id: 'precios', label: 'Precios', href: '#precios' },
    { id: 'marketing', label: 'Continuidad', href: '#marketing' },
    { id: 'cotizador', label: 'Cotizador', href: '#cotizador' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
  ] as NavItem[],
  socials: [] as { name: string; url: string }[],
};
