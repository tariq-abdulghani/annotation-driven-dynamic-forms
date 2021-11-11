import { Validators } from "@angular/forms";
import { formModel, textControl } from "./controls-meta";

@formModel({showReset: false,submitBtnLabel:'submit', resetBtnLabel:''})
export class Person{

    @textControl({name: 'name',type:'text',validators: [Validators.required]})
    name: string;

    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
}