export class EthiopianDateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EthiopianDateError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidEthiopianDateError extends EthiopianDateError {
  constructor(year: number, month: number, day: number) {
    super(`Invalid Ethiopian date: Year ${year}, Month ${month}, Day ${day}.`);
    this.name = 'InvalidEthiopianDateError';
  }
}

export class InvalidMonthError extends EthiopianDateError {
  constructor(month: number) {
    super(`Invalid Ethiopian month: ${month}. Month must be between 1 and 13.`);
    this.name = 'InvalidMonthError';
  }
}

export class InvalidDayError extends EthiopianDateError {
  constructor(day: number, month: number, maxDays: number) {
    super(`Invalid day ${day} for month ${month}. Month ${month} has ${maxDays} days.`);
    this.name = 'InvalidDayError';
  }
}

export class InvalidLocaleError extends EthiopianDateError {
  constructor(locale: string) {
    super(`Locale '${locale}' is not registered. Registered locales must be added via registerLocale().`);
    this.name = 'InvalidLocaleError';
  }
}

export class InvalidDateInputError extends EthiopianDateError {
  constructor(input: unknown) {
    super(`Cannot parse invalid date input: ${String(input)}.`);
    this.name = 'InvalidDateInputError';
  }
}