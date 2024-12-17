export type Locale = (typeof locales)[number];

export const locales = ['ru', 'by'] as const;
export const defaultLocale: Locale = 'ru';