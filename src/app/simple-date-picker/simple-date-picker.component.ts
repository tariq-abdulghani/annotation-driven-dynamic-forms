import { Component, OnInit } from '@angular/core';
import { MonthDaysService } from './services/month-days.service';


@Component({
  selector: 'simple-date-picker',
  templateUrl: './simple-date-picker.component.html',
  styleUrls: ['./simple-date-picker.component.css'],
  providers: [MonthDaysService]
})
export class SimpleDatePickerComponent implements OnInit {
  locale:string = 'ar-EG'
  date: Date;
  readonly daysHeader: string[] = [
    "S", "M", "T", "W", "T", "F", "S"
  ];
  readonly monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  daysArray: number[] = Array(42).fill(0);
  yearView = false;

  constructor(private monthDayService: MonthDaysService) {
    this.date = new Date();
  }

  ngOnInit(): void {
    this.daysArray = this.monthDayService.getDaysArray(this.date);
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

  get selectedMonth(): string {
    return this.monthsArray[this.date.getMonth()];
  }

  get selectedDate() {
    return this.date.getDate();
  }

  set selectedDate(date: number){
    this.date.setDate(date);
  }
}
