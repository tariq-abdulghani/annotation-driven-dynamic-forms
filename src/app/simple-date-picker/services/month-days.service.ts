export class MonthDaysService {
  constructor() {}

  public getNumberOfDaysAndStartDay(
    year: number,
    month: number
  ): [number, number] {
    return [
      new Date(year, month + 1, 0).getDate(),
      new Date(year, month, 1).getDay(),
    ];
  }

  public getDaysArray(date: Date): number[] {
    const days = Array(42).fill(null);
    const [numOfDays, startDayIndex] = this.getNumberOfDaysAndStartDay(
      date.getFullYear(),
      date.getMonth()
    );
    let dayCount = 1;
    days.forEach((element, index) => {
      if (index >= startDayIndex && dayCount <= numOfDays) {
        days[index] = dayCount++;
      }
    });
    return days;
  }

  incrementMonth(date: Date): number[] {
    date.setMonth(date.getMonth() + 1);
    return this.getDaysArray(date);
  }

  decrementMonth(date: Date): number[] {
    date.setMonth(date.getMonth() - 1);
    return this.getDaysArray(date);
  }

  canIncrementMonth(date: Date, maxDate?: Date): boolean{
    if(maxDate){
        const dateWithIncreasedMonth = new Date(date);
        // const compareMax = new Date(maxDate.getFullYear(), maxDate.getMonth());
        dateWithIncreasedMonth.setMonth(date.getMonth() +1);
        console.log(dateWithIncreasedMonth <= maxDate, dateWithIncreasedMonth, maxDate, dateWithIncreasedMonth.getMonth() <= maxDate.getMonth());
        return dateWithIncreasedMonth.getMonth() <= maxDate.getMonth() && dateWithIncreasedMonth.getFullYear() <= maxDate.getFullYear();
    }
    return true;
  }

  canDecrementMonth(date: Date, minDate?: Date): boolean{
    if(minDate){
        const dateWithDecrementedMonth = new Date(date);
        dateWithDecrementedMonth.setMonth(date.getMonth() -1);
        return dateWithDecrementedMonth >= minDate;
    }
    return true;
  }
}
