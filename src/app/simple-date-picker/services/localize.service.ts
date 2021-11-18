import { Injectable } from "@angular/core";


@Injectable()
export class LocalizeDatePickerViewService{

    private locale = 'en-US';

    public getLocale(): string{
        return this.locale;
    }

    public setLocale(locale: string){
        this.locale = locale;
    }

    public monthsList(): string[]{
        let date = new Date();
        let months:string[] = [];
        [...Array(12).keys()].forEach(k =>{
            date.setMonth(k)
            months.push(date.toLocaleString(this.locale, {month: "short"}));
        });
        return months;
    }

    public daysList(): string[]{
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
        
        return [this.monthsList(), this.daysList()];
    }

    public localizeNumArray(numbers: number[]): string[]{
        return [...numbers.map(n => n.toLocaleString(this.locale))];
    }

    writingDirection(locale?: string): string{
        const rtl = ['ar-', 'zh-', 'he-', 'fa-', 'ps', 'ur'];
        if(locale){
            return rtl.some(str => locale.includes(str))? 'rtl': 'ltr';
        }else{
            return rtl.some(str => this.locale.includes(str))? 'rtl': 'ltr';
        }
    }
}
