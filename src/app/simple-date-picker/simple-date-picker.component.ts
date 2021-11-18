import { Component, OnInit } from '@angular/core';
import { LocalizeDatePickerViewService as LocalizeDatePickerViewService } from './services/localize.service';
import { LocalizedSimpleDatePickerEngineService } from './services/localized-date-picker.service';
import { MonthDaysService } from './services/month-days.service';
import { YearMonthService } from './services/year-month.service';

@Component({
  selector: 'simple-date-picker',
  templateUrl: './simple-date-picker.component.html',
  styleUrls: ['./simple-date-picker.component.css'],
  providers: [LocalizedSimpleDatePickerEngineService],
})
export class SimpleDatePickerComponent implements OnInit {
  daysHeader: string[];
  monthsArray: string[];
  daysArray: string[];
  yearsArray: string[];
  yearView = false;

  constructor(public dp: LocalizedSimpleDatePickerEngineService) {
    this.daysHeader = dp.localizedDaysOfWeekArray;
    this.monthsArray = dp.localizedMonthsOfYearArray;
    this.daysArray = dp.localizedDaysDatesArray;
    this.yearsArray = dp.localizedYearsArray;
  }

  ngOnInit(): void {
    console.log(this.dp);
  }

  updateView() {
    this.daysHeader = this.dp.localizedDaysOfWeekArray;
    this.monthsArray = this.dp.localizedMonthsOfYearArray;
    this.daysArray = this.dp.localizedDaysDatesArray;
    this.yearsArray = this.dp.localizedYearsArray;
  }
  applyMonthView() {}

  toggleYearView() {}

  navigateNext() {}

  navigatePrevious() {}

  reset() {}
}
