import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { LocalizedSimpleDatePickerEngineService } from './services/localized-date-picker.service';


@Component({
  selector: 'simple-date-picker',
  templateUrl: './simple-date-picker.component.html',
  styleUrls: ['./simple-date-picker.component.css'],
  providers: [LocalizedSimpleDatePickerEngineService],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class SimpleDatePickerComponent implements OnInit {
  config :any;
  daysHeader: string[];
  monthsArray: string[];
  daysArray: string[];
  yearsArray: string[];

  @Output() clickOutEvent: EventEmitter<any> = new EventEmitter();
  @Output() dateSelectedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private _eref: ElementRef, public dp: LocalizedSimpleDatePickerEngineService) {
    this.daysHeader = dp.localizedDaysOfWeekArray;
    this.monthsArray = dp.localizedMonthsOfYearArray;
    this.daysArray = dp.localizedDaysDatesArray;
    this.yearsArray = dp.localizedYearsArray;
  }

  ngOnInit(): void {
    // console.log(this.dp);
    this.dp.configure({defaultDate: new Date(), minDate :new Date(), maxDate: new Date(2021, 11 ,5)});
    // console.log("config", this.config);
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
    this.dateSelectedEvent.emit(index);
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
    this.dp.configure({defaultDate: new Date(), minDate :new Date(), maxDate: new Date(2021, 12 ,5)}); // , locale: 'ar-EG'
    this.updateViewFull();
  }

  // @HostListener('onfocusout') onBlur() {
  //   console.log("plurrrrrrrrrrrrrrrrrr");
  //   this.clickOutEvent.emit(0);
  // }

  
  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)){
      // doSomething();
      this.clickOutEvent.emit(event);
   }
  }
}
