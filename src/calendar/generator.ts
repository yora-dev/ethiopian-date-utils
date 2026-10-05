import { EthiopianDate, now } from '../date/EthiopianDate.js';
import { getDaysInEthiopianMonth } from '../core/algorithms.js';
import { isBusinessDay } from '../business/businessCalendar.js';
import { getHolidays } from '../holidays/holidayEngine.js';

export interface CalendarDayCell {
  date: EthiopianDate;
  day: number;
  month: number;
  year: number;
  weekday: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isHoliday: boolean;
  isWeekend: boolean;
  isBusinessDay: boolean;
}

export interface MonthCalendarGrid {
  year: number;
  month: number;
  weeks: CalendarDayCell[][];
}

export function getMonthCalendar(year: number, month: number): MonthCalendarGrid {
  const totalDays = getDaysInEthiopianMonth(year, month);
  const firstDay = new EthiopianDate(year, month, 1);
  const today = now();
  const holidays = getHolidays(year);

  const startWeekday = firstDay.weekday; // 0 = Sunday, 1 = Monday...
  const weeks: CalendarDayCell[][] = [];
  let currentWeek: CalendarDayCell[] = [];

  // Padding days from previous month
  const prevDate = firstDay.subtractDays(startWeekday);
  for (let i = 0; i < startWeekday; i++) {
    const d = prevDate.addDays(i);
    currentWeek.push(createCell(d, false, today, holidays));
  }

  // Days of current month
  for (let day = 1; day <= totalDays; day++) {
    const d = new EthiopianDate(year, month, day);
    currentWeek.push(createCell(d, true, today, holidays));

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Padding days for remaining grid slots
  if (currentWeek.length > 0) {
    let nextDate = new EthiopianDate(year, month, totalDays).addDays(1);
    while (currentWeek.length < 7) {
      currentWeek.push(createCell(nextDate, false, today, holidays));
      nextDate = nextDate.addDays(1);
    }
    weeks.push(currentWeek);
  }

  return { year, month, weeks };
}

function createCell(
  date: EthiopianDate,
  isCurrentMonth: boolean,
  today: EthiopianDate,
  holidays: Array<{ month: number; day: number }>
): CalendarDayCell {
  const isWeekend = date.weekday === 0 || date.weekday === 6;
  const isHoliday = holidays.some((h) => h.month === date.month && h.day === date.day);

  return {
    date,
    day: date.day,
    month: date.month,
    year: date.year,
    weekday: date.weekday,
    isCurrentMonth,
    isToday: date.isSame(today),
    isHoliday,
    isWeekend,
    isBusinessDay: isBusinessDay(date)
  };
}