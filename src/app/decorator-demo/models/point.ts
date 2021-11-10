import { Control } from "./form-models/form-control";
import "reflect-metadata";
import { FormModel } from "./form-models/form-model";


@FormModel({
    showReset: true, 
    resetBtnLabel: 'reset', 
    submitBtnLabel: 'submit'
})
export class Point{

    @Control({name:'xCoordinate', type: 'number', validator: 'max', class: 'form-control'})
    x: number = 100;

    @Control({name:'yCoordinate', type: 'number', validator: 'max'})
    y: number;

    @Control({name:'zCoordinate', type: 'number', validator: 'max'})
    z: number;

    @Control({name:'dateOfProcessing', type: 'date', validator: 'maxDate'})
    dateOfProcessing: Date;


    constructor(x: number,y: number,z: number, dateOfProcessing: Date){
        console.log("point constructor is called")
        // this.x = x;
        this.y = y;
        this.z = z;
        this.dateOfProcessing = dateOfProcessing;
    }

    // @before
    toString(): string{
        return `${this.x} ${this.y} ${this.z}`;
    }

    // do(x: number, y:number):number;
    // do(x:string, y: string): string;

    // do(x: number | string, y: number| string): number | string{
    //     if(typeof x == 'string') return ''
    //     else return 0;
    // }
}