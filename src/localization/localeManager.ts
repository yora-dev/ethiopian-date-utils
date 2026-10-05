import { LocaleDefinition, SupportedLocale } from '../core/types.js';
import { InvalidLocaleError } from '../errors/index.js';
import { enLocale } from './locales/en.js';
import { amLocale } from './locales/am.js';
import { omLocale } from './locales/om.js';
import { tiLocale } from './locales/ti.js';

const localesRegistry = new Map<string, LocaleDefinition>();

// Register default locales
localesRegistry.set('en', enLocale);
localesRegistry.set('am', amLocale);
localesRegistry.set('om', omLocale);
localesRegistry.set('ti', tiLocale);

let currentDefaultLocale = 'en';

export function registerLocale(code: string, localeDef: LocaleDefinition): void {
  localesRegistry.set(code, localeDef);
}

export function getLocale(code?: SupportedLocale): LocaleDefinition {
  const targetCode = code || currentDefaultLocale;
  const locale = localesRegistry.get(targetCode);
  if (!locale) {
    throw new InvalidLocaleError(targetCode);
  }
  return locale;
}

export function setDefaultLocale(code: string): void {
  if (!localesRegistry.has(code)) {
    throw new InvalidLocaleError(code);
  }
  currentDefaultLocale = code;
}