import { Component, OnInit } from '@angular/core';


type weekDisplayed = [number,number,number,number,number,number, number];
type Calender =[weekDisplayed, weekDisplayed,weekDisplayed,
  weekDisplayed,weekDisplayed,weekDisplayed];

@Component({
  selector: 'simple-date-picker',
  templateUrl: './simple-date-picker.component.html',
  styleUrls: ['./simple-date-picker.component.css']
})
export class SimpleDatePickerComponent implements OnInit {
  currentDate = new Date();

  selectedYear = 2021;
  selectedMonth = "Feb";

  daysHeader: string[] = [
    "S","M", "T", "W", "T", "F", "S"
  ];
  calender: Calender = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
    ]
  
  readonly monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor() { }

  ngOnInit(): void {
    // console.log("month 10",this.getNumberOfDaysAndStartDay(2021, 9));
    // console.log(this.getDaysArray(2021, 9));

    // console.log("month 9",this.getNumberOfDaysAndStartDay(2021, 8));
    // console.log(this.getDaysArray(2021, 8));

    // console.log("month 6",this.getNumberOfDaysAndStartDay(2021, 5));
    // console.log(this.getDaysArray(2021, 5));

    console.log("month 2",this.getNumberOfDaysAndStartDay(2021, 1));
    console.log(this.getDaysArray(2021, 1));
    console.log(this.getWeeksFromDays((this.getDaysArray(2021, 1))));
    this.calender = this.getWeeksFromDays((this.getDaysArray(2021, 1)));
  }

    getNumberOfDaysAndStartDay(year: number, month: number): [number, number]{
      return  [new Date(year, month+1, 0).getDate(), new Date(year, month, 1).getDay()];
    }

    getDaysArray(year: number, month: number): number[]{
      const days = Array(42).fill(0);
      const [numOfDays, startDayIndex] = this.getNumberOfDaysAndStartDay(year, month);
      console.log(numOfDays, startDayIndex, year, month);
      let dayCount = 1;
      days.forEach((element, index)=>{
          if(index >= startDayIndex && dayCount <= numOfDays){
            days[index] = dayCount++;
          }
      });
      return days;
    }

    getWeeksFromDays(days: number[]): Calender {
      const calender = <Calender>Array(6).fill(Array(7).fill(0));
      console.log(calender);
      calender.forEach((week, index)=>{
        calender[index] = <weekDisplayed>days.slice(index * 7, (index+1)*7);
      })
      return calender;
    }

    getCalenderByMonth(month: number | string){
      console.log(month);
      this.selectedMonth = this.monthsArray[parseInt(month.toString())];
      this.calender = this.getWeeksFromDays((this.getDaysArray(2021,parseInt(month.toString()))));
    }

    incrementMonth(){
      this.getCalenderByMonth((this.monthsArray.indexOf(this.selectedMonth)+1)%12);
    }

    decrementMonth(){
      this.getCalenderByMonth((this.monthsArray.indexOf(this.selectedMonth)- 1)%12);
    }
}
