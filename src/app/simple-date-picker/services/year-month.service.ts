
export class YearMonthService{
    readonly STEP = 10;
    constructor(){}

    getYearsInDecade(date: Date): number[]{
        return this.generateRange(this.getStartingYear(date));
    }

    getYearsInNextDecade(date: Date): number[]{
        let startingDate = this.getStartingYear(date)+this.STEP;
        date.setFullYear(date.getFullYear()+this.STEP);
        return this.generateRange(startingDate);
    }

    getYearsInPreviousDecade(date: Date): number[]{
        let startingDate = this.getStartingYear(date)-this.STEP;
        date.setFullYear(date.getFullYear()-this.STEP);
        return this.generateRange(this.getStartingYear(date)-this.STEP);
    }

    private getStartingYear(date: Date): number{
        return date.getFullYear()-date.getFullYear()%this.STEP;
    }

    private generateRange(startingYear: number): number[]{
        return [...Array(this.STEP).keys()].map(v => v+startingYear);
    }
}