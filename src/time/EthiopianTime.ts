import { EthiopianTimeComponents, SupportedLocale } from '../core/types.js';
import { getLocale } from '../localization/localeManager.js';
import { EthiopianDateError } from '../errors/index.js';

export interface FormatEthiopianTimeOptions {
  locale?: SupportedLocale;
  system?: 'ethiopian' | 'international';
}

/**
 * Converts standard 24-hour UTC/Local time to Ethiopian traditional clock system.
 * Ethiopian clock starts 0:00 (12:00 ሰዓት) at sunrise (~6:00 AM standard time).
 */
export function toEthiopianTime(standardHours: number, minutes: number = 0, seconds: number = 0): EthiopianTimeComponents {
  if (standardHours < 0 || standardHours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
    throw new EthiopianDateError(`Invalid time components: ${standardHours}:${minutes}:${seconds}`);
  }

  // Convert 24-hour standard time to 12-hour Ethiopian system
  let ethHours = (standardHours + 6) % 12;
  if (ethHours === 0) ethHours = 12;

  // Day vs Night cycle: 6 AM (6:00) to 6 PM (18:00) is Day
  const cycle: 'day' | 'night' = standardHours >= 6 && standardHours < 18 ? 'day' : 'night';

  return {
    hours: ethHours,
    minutes,
    seconds,
    cycle
  };
}

/**
 * Formats time into Ethiopian clock string (e.g. "2:30 ሰዓት" or "08:30 AM").
 */
export function formatEthiopianTime(
  standardHours: number,
  minutes: number = 0,
  options: FormatEthiopianTimeOptions = {}
): string {
  const system = options.system ?? 'ethiopian';
  const locale = getLocale(options.locale);

  const pad = (n: number) => String(n).padStart(2, '0');

  if (system === 'international') {
    const period = standardHours >= 12 ? 'PM' : 'AM';
    let h = standardHours % 12;
    if (h === 0) h = 12;
    return `${pad(h)}:${pad(minutes)} ${period}`;
  }

  const ethTime = toEthiopianTime(standardHours, minutes);
  const cycleLabel = ethTime.cycle === 'day' ? locale.dayCycles.afternoon : locale.dayCycles.night;

  if (locale.code === 'am' || locale.code === 'ti') {
    return `${ethTime.hours}:${pad(ethTime.minutes)} ሰዓት (${cycleLabel})`;
  }

  return `${ethTime.hours}:${pad(ethTime.minutes)} (${cycleLabel})`;
}