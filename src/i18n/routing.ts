import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', 'ar', 'es', 'et', 'hi', 'id', 'lt', 'lv', 'ru', 'th'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});