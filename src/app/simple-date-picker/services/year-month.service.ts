import { Injectable } from "@angular/core";


@Injectable()
export class YearMonthService{

    constructor(){}

    getYearsInDecade(date: Date): number[]{
        return this.generateRange(this.getStartingYear(date));
    }

    getYearsInNextDecade(date: Date): number[]{
        let startingDate = this.getStartingYear(date)+10;
        date.setFullYear(date.getFullYear()+10);
        return this.generateRange(startingDate);
    }

    getYearsInPreviousDecade(date: Date): number[]{
        let startingDate = this.getStartingYear(date)-10;
        date.setFullYear(date.getFullYear()-10);
        return this.generateRange(this.getStartingYear(date)-10);
    }

    private getStartingYear(date: Date): number{
        return date.getFullYear()-date.getFullYear()%10;
    }

    private generateRange(startingYear: number): number[]{
        return [...Array(10).keys()].map(v => v+startingYear);
    }
}