import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localeCookie: {
    name: 'LOCALE',
    maxAge: 60 * 60 * 24 * 365
  },
  pathnames: {

  }
});
