import { LocaleDefinition } from '../../core/types.js';

export const tiLocale: LocaleDefinition = {
  code: 'ti',
  months: [
    'መስከረም', 'ጥቅምቲ', 'ሕዳር', 'ታሕሣሥ', 'ጥሪ', 'ለካቲት',
    'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰነ', 'ሐምለ', 'ነሐሰ', 'ጳጉሜ'
  ],
  monthsShort: [
    'መስ', 'ጥቅ', 'ሕዳ', 'ታሕ', 'ጥሪ', 'ለካ',
    'መጋ', 'ሚያ', 'ግን', 'ሰነ', 'ሐም', 'ነሐ', 'ጳጉ'
  ],
  weekdays: [
    'ሰንበት', 'ሰኑይ', 'ሠሉስ', 'ረቡዕ', 'ኃሙስ', 'ዓርቢ', 'ቀዳም'
  ],
  weekdaysShort: [
    'ሰን', 'ሰኑ', 'ሠሉ', 'ረቡ', 'ኃሙ', 'ዓር', 'ቀዳ'
  ],
  dayCycles: {
    morning: 'ንግሆ',
    afternoon: 'ድሕሪ ቀትሪ',
    evening: 'ምሽት',
    night: 'ለይቲ'
  },
  relativeTime: {
    future: 'ኣብ %s ውሽጢ',
    past: 'ቅድሚ %s',
    s: 'ሒደት ሰከንድ',
    m: 'ሓደ ደቂቃ',
    mm: '%d ደቂቃዎች',
    h: 'ሓደ ሰዓት',
    hh: '%d ሰዓታት',
    d: 'ሓደ መዓልቲ',
    dd: '%d መዓልታት',
    M: 'ሓደ ወርሒ',
    MM: '%d ወርሒ',
    y: 'ሓደ ዓመት',
    yy: '%d ዓመታት'
  }
};