import { Injectable } from '@angular/core';
import { LocalizeDatePickerViewService } from './localize.service';
import { MonthDaysService } from './month-days.service';
import { YearMonthService } from './year-month.service';

@Injectable()
export class LocalizedSimpleDatePickerEngineService {
  //'ar-EG'//'ko-KR' // 'de-DE'
  private _locale = 'en-US'//'ar-EG'; //'en-US';
  private _date = new Date();

  private minDate: Date | null = null;
  private maxDate: Date | undefined;

  private daysDatesArray: number[];
  private yearsArray: number[];

  private yearView = false;

  private localizer: LocalizeDatePickerViewService;
  private monthDayService: MonthDaysService;
  private yearMonthService: YearMonthService;

  constructor() {
    this.localizer = new LocalizeDatePickerViewService(this._locale);
    this.monthDayService = new MonthDaysService();
    this.yearMonthService = new YearMonthService();
    this.daysDatesArray = this.monthDayService.getDaysArray(this._date);
    this.yearsArray = this.yearMonthService.getYearsInDecade(this._date);
  }

  set locale(locale: string) {
    this._locale = locale;
    this.localizer.setLocale(locale);
  }

  get locale() {
    return this._locale;
  }

  get localizedMonth() {
    return this.localizedMonthsOfYearArray[this._date.getMonth()];
  }

  get localizedYear() {
    return this.localizer.localizeNumber(this._date.getFullYear());
  }

  get localizedDayDate() {
    return this.localizer.localizeNumber(this._date.getDate());
  }

  get localizedDaysOfWeekArray(): string[] {
    return this.localizer.daysOfWeekList();
  }

  get localizedMonthsOfYearArray(): string[] {
    return this.localizer.monthsOfYearList();
  }

  get localizedDaysDatesArray(): string[] {
    return this.localizer.localizeNumArray(this.daysDatesArray);
  }

  get localizedYearsArray(): string[] {
    return this.localizer.localizeNumArray(this.yearsArray);
  }

  set dayDate(dayDateIndex: number) {
    this._date.setDate(this.daysDatesArray[dayDateIndex]);
  }

  set month(monthIndex: number) {
    this._date.setMonth(monthIndex);
  }

  set year(yearIndex: number) {
    this._date.setFullYear(this.yearsArray[yearIndex]);
  }

  get isYearView() {
    return this.yearView;
  }

  goToMonthView() {
    this.yearView = false;
  }

  switchViews(): void {
    this.yearView = !this.yearView;
  }

  increment(): void {}

  incrementMonth(): void {
    if (this.monthDayService.canIncrementMonth(this._date, this.maxDate)) {
        this.daysDatesArray = this.monthDayService.incrementMonth(this._date);
        // update when decade passes in forward direction
        if(this._date.getFullYear() % 10 == 0 && this._date.getMonth() == 0){
            this.yearsArray = this.yearMonthService.getYearsInDecade(this._date);
        }
        
    }
  }

  decrement(): void {}

  decrementMonth(): void{
      //@ts-ignore
      if(this.monthDayService.canDecrementMonth(this._date, this.minDate)){
        this.daysDatesArray = this.monthDayService.decrementMonth(this._date);
        // update when decade passes in reverse direction
        if(this._date.getFullYear() % 10 == 9 && this._date.getMonth() == 11){
            this.yearsArray = this.yearMonthService.getYearsInDecade(this._date);
        }
      }
  }

  get writingDirection(): string {
    return this.localizer.writingDirection(this.locale);
  }

  configure(config: {
    defaultDate?: Date;
    maxDate?: Date;
    minDate?: Date;
    locale?: string;
  }): void {
    this._date = config.defaultDate || this._date;
    this.minDate = config.minDate? config.minDate: new Date(1970);
    this.maxDate = config.maxDate? config.maxDate: this.maxDate;
    this._locale = config.locale ? config.locale : this._locale;
    this.localizer.setLocale(this._locale);
    this.daysDatesArray = this.monthDayService.getDaysArray(this._date);
    this.yearsArray = this.yearMonthService.getYearsInDecade(this._date);
  }

  toString() {
    return `${this.localizedDayDate} ${this.localizedMonth} ${this.localizedYear}
        
        ${this.localizedDaysOfWeekArray}
        ${this.localizedDaysDatesArray}

        ${this.localizedMonthsOfYearArray}
        ${this.localizedYearsArray}
        `;
  }
}
