import { ethiopianToGregorian, gregorianToEthiopian } from '../src/core/algorithms.js';
import { ethiopian } from '../src/date/EthiopianDate.js';
import { formatEthiopianDate } from '../src/formatting/formatter.js';

console.log('⚡ Running ethiopian-date-utils Benchmark Suite...\n');

const ITERATIONS = 500_000;

// Test 1: Conversion Speed
console.time('Ethiopian -> Gregorian Conversions (500k ops)');
for (let i = 0; i < ITERATIONS; i++) {
  ethiopianToGregorian(2018, 1, 15);
}
console.timeEnd('Ethiopian -> Gregorian Conversions (500k ops)');

console.time('Gregorian -> Ethiopian Conversions (500k ops)');
for (let i = 0; i < ITERATIONS; i++) {
  gregorianToEthiopian(2025, 9, 25);
}
console.timeEnd('Gregorian -> Ethiopian Conversions (500k ops)');

// Test 2: Object Creation & Formatting
console.time('EthiopianDate Instantiation (500k ops)');
for (let i = 0; i < ITERATIONS; i++) {
  ethiopian(2018, 1, 15);
}
console.timeEnd('EthiopianDate Instantiation (500k ops)');

const d = ethiopian(2018, 1, 15);
console.time('Date Formatting DD MMMM YYYY (100k ops)');
for (let i = 0; i < 100_000; i++) {
  formatEthiopianDate(d, 'DD MMMM YYYY', { locale: 'am' });
}
console.timeEnd('Date Formatting DD MMMM YYYY (100k ops)');