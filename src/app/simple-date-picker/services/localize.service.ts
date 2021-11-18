import { Injectable } from "@angular/core";


export class LocalizeDatePickerViewService{

    constructor(public locale: string){}

    public getLocale(): string{
        return this.locale;
    }

    public setLocale(locale: string){
        this.locale = locale;
    }

    public monthsOfYearList(): string[]{
        let date = new Date();
        let months:string[] = [];
        [...Array(12).keys()].forEach(k =>{
            date.setMonth(k)
            months.push(date.toLocaleString(this.locale, {month: "short"}));
        });
        return months;
    }

    public daysOfWeekList(): string[]{
        let date = new Date();date.setDate(1);
        let shift = date.getDay()!= 0? date.getDay(): 0;
        let weekDay:string[] = [];
        [...Array(7).keys()].forEach(k =>{
            date.setDate(k+8-shift)
            weekDay.push(date.toLocaleString(this.locale, {weekday: "narrow"}));
        });
        return weekDay;
    }

    public monthsAndDays():[string[], string[]]{
        
        return [this.monthsOfYearList(), this.daysOfWeekList()];
    }

    public localizeNumber(num: number){
        return num.toLocaleString(this.locale, {useGrouping: false});
    }

    public localizeNumArray(numbers: number[]): string[]{
        return [...numbers.map(n => n.toLocaleString(this.locale, {useGrouping: false}))];
    }

    public writingDirection(locale?: string): string{
        const rtl = ['ar-', 'zh-', 'he-', 'fa-', 'ps', 'ur'];
        if(locale){
            return rtl.some(str => locale.includes(str))? 'rtl': 'ltr';
        }else{
            return rtl.some(str => this.locale.includes(str))? 'rtl': 'ltr';
        }
    }
}
