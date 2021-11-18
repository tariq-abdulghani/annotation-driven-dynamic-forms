import { Component, OnInit } from '@angular/core';
import { LocalizeDatePickerViewService as LocalizeDatePickerViewService } from './services/localize.service';
import { LocalizedSimpleDatePickerEngineService } from './services/localized-date-picker.service';
import { MonthDaysService } from './services/month-days.service';
import { YearMonthService } from './services/year-month.service';


@Component({
  selector: 'simple-date-picker',
  templateUrl: './simple-date-picker.component.html',
  styleUrls: ['./simple-date-picker.component.css'],
  providers: [MonthDaysService, YearMonthService, LocalizedSimpleDatePickerEngineService]
})
export class SimpleDatePickerComponent implements OnInit {

  // locale:string = 'ar-EG'
  private _date: Date;
  readonly daysHeader: string[] = [
    "S", "M", "T", "W", "T", "F", "S"
  ];
  readonly monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  daysArray: number[] = Array(42).fill(0);
  private yearsArray!:number[];
  yearView = false;

  constructor(
    private monthDayService: MonthDaysService, 
    private yearMonthService: YearMonthService,
    private datePickerEngine: LocalizedSimpleDatePickerEngineService) {
    this._date = new Date();
  }

  ngOnInit(): void {
    // this.daysArray = this.monthDayService.getDaysArray(this.date);
    // this.yearsArray = this.yearMonthService.getYearsInDecade(this.date);
    // // this.localizeService.setLocale('ar-EG');//'ar-EG'//'ko-KR' // 'de-DE'
    // console.log(this.localizeService.monthsOfYearList());
    // console.log(this.localizeService.daysOfWeekList());
    // console.log(this.localizeService.localizeNumArray(this.monthDayService.getDaysArray(this.date)));
    // console.log(this.localizeService.writingDirection());
    console.log(this.datePickerEngine);
  }

  incrementMonth() {
    this.daysArray = this.monthDayService.incrementMonth(this.date);
  }

  decrementMonth() {
    this.daysArray = this.monthDayService.decrementMonth(this.date);
  }

  applyMonthView() {
    this.yearView = false;
  }

  toggleYearView() {
    this.yearView = !this.yearView;
  }

  get selectedYear(): number {
    return this.date.getFullYear();
  }

  set selectedYear(year: number){
    this.date.setFullYear(year);
  }

  get selectedMonth(): string {
    return this.monthsArray[this.date.getMonth()];
  }

  set selectedMonth(month: string){
    this.date.setMonth(this.monthsArray.indexOf(month));
  }

  get selectedDate() {
    return this.date.getDate();
  }

  set selectedDate(date: number){
    this.date.setDate(date);
  }

  get yearsList(): number[]{
    return this.yearsArray;
  }

  set yearsList(years: number[]){
    this.yearsArray = years;
  }

  incrementYears(){
    this.yearsArray = this.yearMonthService.getYearsInNextDecade(this.date);
  }
  decrementYears(){
    this.yearsArray = this.yearMonthService.getYearsInPreviousDecade(this.date);
  }

  navigateNext(){
    if(!this.yearView){
      this.incrementMonth();
    }else{
      this.incrementYears();
    }
  }

  navigatePrevious(){
    if(!this.yearView){
      this.decrementMonth();
    }else{
      this.decrementYears();
    }
  }

  get date(){
    return this._date;
  }

  set date(date: Date){
    this._date = date;
  }
  reset(){
    this.date = new Date();
    this.yearsArray = this.yearMonthService.getYearsInDecade(this.date);
  }
}
