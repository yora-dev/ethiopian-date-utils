import { LocaleDefinition } from '../../core/types.js';

export const enLocale: LocaleDefinition = {
  code: 'en',
  months: [
    'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yakatit',
    'Magabit', 'Miyazya', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'
  ],
  monthsShort: [
    'Mes', 'Tik', 'Hid', 'Tah', 'Tir', 'Yak',
    'Mag', 'Miy', 'Gin', 'Sen', 'Ham', 'Neh', 'Pag'
  ],
  weekdays: [
    'Ehud', 'Segno', 'Maksegno', 'Erob', 'Hamus', 'Arb', 'Kidame'
  ],
  weekdaysShort: [
    'Ehu', 'Seg', 'Mak', 'Ero', 'Ham', 'Arb', 'Kid'
  ],
  dayCycles: {
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    night: 'Night'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
};