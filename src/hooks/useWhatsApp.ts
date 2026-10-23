import { useCallback } from 'react';
import { siteConfig } from '../data/siteConfig';

export function useWhatsApp() {
  const sanitizeNumber = (phone: string) => phone.replace(/[\s+()-]/g, '');

  const buildUrl = useCallback((message: string): string => {
    const rawNumber = sanitizeNumber(siteConfig.whatsapp);
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${rawNumber}?text=${encoded}`;
  }, []);

  const openWhatsApp = useCallback(
    (message: string) => {
      const url = buildUrl(message);
      if (typeof window !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    [buildUrl]
  );

  return {
    openWhatsApp,
    buildUrl,
    phoneNumberFormatted: siteConfig.officialPhoneFormatted,
  };
}
