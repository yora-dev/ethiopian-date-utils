import { LocaleDefinition } from '../../core/types.js';

export const omLocale: LocaleDefinition = {
  code: 'om',
  months: [
    'Fuulbaana', 'Onkololeessa', 'Sadaasa', 'Muddee', 'Amaajjii', 'Gurraandhala', 'Bitootessa', 'Eebla', 'Caamsaa', 'Waxabajjii', 'Adoolessa', 'Hagayya', 'Phaagumee'
  ],
  monthsShort: [
    'Fuu', 'Onk', 'Sad', 'Mud', 'Ama', 'Gur',
    'Bit', 'Eeb', 'Caa', 'Wax', 'Ado', 'Hag', 'Pha'
  ],
  weekdays: [
    'Dilbata', 'Wiixata', 'Qibxata', 'Roobii', 'Kamiisa', 'Jimaata', 'Sanbata'
  ],
  weekdaysShort: [
    'Dil', 'Wii', 'Qib', 'Roo', 'Kam', 'Jim', 'San'
  ],
  dayCycles: {
    morning: 'Bariisaa',
    afternoon: 'Guyyaa',
    evening: 'Galgala',
    night: 'Halkan'
  },
  relativeTime: {
    future: 'keessatti %s',
    past: '%s dura',
    s: 'sekondii xiqqoo',
    m: 'daqiiqaa tokko',
    mm: 'daqiiqaa %d',
    h: 'saa\'aatii tokko',
    hh: 'saa\'aatii %d',
    d: 'guyyaa tokko',
    dd: 'guyyaa %d',
    M: 'Ji\'a tokko',
    MM: 'Ji\'a %d',
    y: 'waggaa tokko',
    yy: 'waggaa %d'
  }
};