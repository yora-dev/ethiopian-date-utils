import { LocaleDefinition } from '../../core/types.js';

export const amLocale: LocaleDefinition = {
  code: 'am',
  months: [
    'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥሩ', 'የካቲት',
    'መጋቢት', 'ሜያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'
  ],
  monthsShort: [
    'መስ', 'ጥቅ', 'ኅዳ', 'ታኅ', 'ጥሩ', 'የካ',
    'መጋ', 'ሜያ', 'ግን', 'ሰኔ', 'ሐም', 'ነሐ', 'ጳጉ'
  ],
  weekdays: [
    'እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'
  ],
  weekdaysShort: [
    'እሁ', 'ሰኞ', 'ማክ', 'ረቡ', 'ሐሙ', 'ዓር', 'ቅዳ'
  ],
  dayCycles: {
    morning: 'ጠዋት',
    afternoon: 'ከቀኑ',
    evening: 'ምሽት',
    night: 'ሌሊት'
  },
  relativeTime: {
    future: 'በ %s ውስጥ',
    past: 'ከ %s በፊት',
    s: 'ጥቂት ሰከንዶች',
    m: 'አንድ ደቂቃ',
    mm: '%d ደቂቃዎች',
    h: 'አንድ ሰዓት',
    hh: '%d ሰዓታት',
    d: 'አንድ ቀን',
    dd: '%d ቀናት',
    M: 'አንድ ወር',
    MM: '%d ወራት',
    y: 'አንድ ዓመት',
    yy: '%d ዓመታት'
  }
};