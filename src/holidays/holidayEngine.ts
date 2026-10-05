import { EthiopianDate } from '../date/EthiopianDate.js';
import { getDaysInEthiopianMonth } from '../core/algorithms.js';

export interface CustomHolidayInput {
  name: string | Record<string, string>;
  month: number;
  day: number;
}

export interface EthiopianHoliday {
  name: string | Record<string, string>;
  month: number;
  day: number;
  type: 'national' | 'religious' | 'custom';
  isMovable: boolean;
}

const customHolidaysRegistry: CustomHolidayInput[] = [];

/**
 * Calculates Bahire Hasab (Amete Alef / Abekte / Metke / Fasting start dates).
 * Computes Orthodox Easter (Tinsaye) for a given Ethiopian Year.
 */
function calculateTinsaye(ethiopianYear: number): { month: number; day: number } {
  // Amete Alem calculation
  const ameteAlem = ethiopianYear + 5500;
  const wene = ameteAlem % 19;
  const abekte = (wene * 11) % 30;
  let metke = 30 - abekte;
  if (wene === 0) metke = 30;

  // Find Metke month: if metke > 14, it falls in Meskerem (month 1), else Tikimt (month 2)
  let metkeMonth = metke > 14 ? 1 : 2;
  let metkeDay = metke;

  // Day of week of Metke
  const metkeDate = new EthiopianDate(ethiopianYear, metkeMonth, metkeDay);
  const metkeWeekday = metkeDate.weekday; // 0 = Sunday, 1 = Monday, etc.

  // Tewsak for Tinsaye calculation
  // Abiy Tsome (Great Fast) starts 14 days after Metke's mob/day adjustment
  // Tinsaye (Easter) is 55 days after Abiy Tsome start
  // Known formula offset for Tinsaye relative to Metke:
  const tewsak = (35 - metkeWeekday) % 7;
  const tinsayeOffsetFromMetke = 120 + tewsak; // Total days from Metke to Tinsaye

  let current = metkeDate.addDays(tinsayeOffsetFromMetke);
  return { month: current.month, day: current.day };
}

export function registerHoliday(holiday: CustomHolidayInput): void {
  customHolidaysRegistry.push(holiday);
}

export function getHolidays(year: number): EthiopianHoliday[] {
  const list: EthiopianHoliday[] = [
    { name: { en: 'Enkutatash (Ethiopian New Year)', am: 'እንቁጣጣሽ' }, month: 1, day: 1, type: 'national', isMovable: false },
    { name: { en: 'Finding of the True Cross (Meskel)', am: 'መስቀል' }, month: 1, day: 17, type: 'religious', isMovable: false },
    { name: { en: 'Ethiopian Christmas (Gena)', am: 'ገና' }, month: 4, day: 29, type: 'religious', isMovable: false },
    { name: { en: 'Ethiopian Epiphany (Timkat)', am: 'ጥምቀት' }, month: 5, day: 11, type: 'religious', isMovable: false },
    { name: { en: 'Adwa Victory Day', am: 'ዓድዋ ድል በዓል' }, month: 6, day: 23, type: 'national', isMovable: false },
    { name: { en: 'Ethiopian Patriots Patriots Victory Day', am: 'የአርበኞች ቀን' }, month: 8, day: 27, type: 'national', isMovable: false },
    { name: { en: 'Downfall of the Derg', am: 'ደርግ የወደቀበት ቀን' }, month: 9, day: 20, type: 'national', isMovable: false },
  ];

  // Handle leap year adjustment for Gena if preceding year was leap
  if (getDaysInEthiopianMonth(year - 1, 13) === 6) {
    const gena = list.find((h) => h.month === 4 && h.day === 29);
    if (gena) gena.day = 28;
  }

  // Calculate Tinsaye & Good Friday (Siklet)
  const tinsaye = calculateTinsaye(year);
  const tinsayeDate = new EthiopianDate(year, tinsaye.month, tinsaye.day);
  const sikletDate = tinsayeDate.subtractDays(2); // Good Friday is 2 days before Easter

  list.push({
    name: { en: 'Good Friday (Siklet)', am: 'ስቅለት' },
    month: sikletDate.month,
    day: sikletDate.day,
    type: 'religious',
    isMovable: true
  });

  list.push({
    name: { en: 'Ethiopian Easter (Tinsaye)', am: 'ትንሣኤ' },
    month: tinsayeDate.month,
    day: tinsayeDate.day,
    type: 'religious',
    isMovable: true
  });

  // Include custom registered holidays
  for (const custom of customHolidaysRegistry) {
    list.push({
      name: custom.name,
      month: custom.month,
      day: custom.day,
      type: 'custom',
      isMovable: false
    });
  }

  return list;
}