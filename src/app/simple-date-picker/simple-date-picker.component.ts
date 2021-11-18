import { Component, OnInit } from '@angular/core';
import { LocalizedSimpleDatePickerEngineService } from './services/localized-date-picker.service';


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

  constructor(public dp: LocalizedSimpleDatePickerEngineService) {
    this.daysHeader = dp.localizedDaysOfWeekArray;
    this.monthsArray = dp.localizedMonthsOfYearArray;
    this.daysArray = dp.localizedDaysDatesArray;
    this.yearsArray = dp.localizedYearsArray;
  }

  ngOnInit(): void {
    console.log(this.dp);
    this.dp.configure({defaultDate: new Date()});
    this.updateViewFull();
  }

  updateViewFull() {
    this.daysHeader = this.dp.localizedDaysOfWeekArray;
    this.monthsArray = this.dp.localizedMonthsOfYearArray;
    this.daysArray = this.dp.localizedDaysDatesArray;
    this.yearsArray = this.dp.localizedYearsArray;
  }

  updateView(){
    this.daysArray = this.dp.localizedDaysDatesArray;
    this.yearsArray = this.dp.localizedYearsArray;
  }

  get yearView(){
    return this.dp.isYearView;
  }

  applyMonthView() {
    this.dp.goToMonthView();
  }

  toggleYearView() {
    this.dp.switchViews();
  }

  selectYearByIndex(index: number){
    this.dp.year = index
  }

  selectMonthByIndex(index: number){
    this.dp.month  = index;
  }

  selectDayByIndex(index: number){
    this.dp.dayDate = index;
  }

  navigateNext() {
    this.dp.incrementMonth();
    this.updateView();
  }

  navigatePrevious() {
    this.dp.decrementMonth();
    this.updateView();
  }

  reset() {
    this.dp.configure({defaultDate: new Date(), minDate :new Date()});
    this.updateViewFull();
  }
}
