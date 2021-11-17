import { Injectable } from "@angular/core";


@Injectable()
export class MonthDaysService {

    constructor() { }

    public getNumberOfDaysAndStartDay(year: number, month: number): [number, number] {
        return [new Date(year, month + 1, 0).getDate(), new Date(year, month, 1).getDay()];
    }

    public getDaysArray(date: Date): number[] {
        const days = Array(42).fill(0);
        const [numOfDays, startDayIndex] = this.getNumberOfDaysAndStartDay(date.getFullYear(), date.getMonth());
        console.log(numOfDays, startDayIndex, date.getFullYear(),  date.getMonth());
        let dayCount = 1;
        days.forEach((element, index) => {
            if (index >= startDayIndex && dayCount <= numOfDays) {
                days[index] = dayCount++;
            }
        });
        return days;
    }


    incrementMonth(date: Date):number[]{
        date.setMonth(date.getMonth()+1);
        return this.getDaysArray(date)
    }
  
    decrementMonth(date: Date):number[]{
        date.setMonth(date.getMonth()-1);
        return this.getDaysArray(date)
    }

}