import { AbstractControl, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { ControlTypes } from "./control-types.enum";

export function splittedDateRangeControl(metaData: {
    startDateLabel:string;
    startDate: Date;
    endDateLabel:string;
    endDate: Date;
    required?: boolean;
    width?: number;
    style?: string;
    class?: string;
    [x: string]: any;
  }) {
    return function (target: any, propertyKey: string) {
      console.log("splitted date decorator runs");
      const startDateMeta ={
        type:'date',
        name: metaData.startDateLabel,
        propertyKey: metaData.startDateLabel,
        minDate: metaData.startDate,
        maxDate: metaData.endDate,
        controlType: ControlTypes.Date,
        formControl: null,
        width:metaData.width,
        style: metaData.style,
        class:metaData.class,
      }
  
      const endDateMeta ={
        type:'date',
        name: metaData.endDateLabel,
        propertyKey: metaData.endDateLabel,
        minDate: metaData.startDate,
        maxDate: metaData.endDate,
        controlType: ControlTypes.Date,
        formControl: null,
        width:metaData.width,
        style: metaData.style,
        class:metaData.class,
      }
      const startDateSetter = (n: Date)=>{
        console.log("start date setter", n);
        endDateMeta.minDate = n;
        startDateFormControl.setValue(n);
      }
      const startDateGetter = ()=>{
        
        return startDateFormControl.value;
      }
      const startDateFormControl = new FormControl(
          metaData.startDate,
          // [
          //   Validators.min(startDateMeta.minDate.valueOf()),
          //   Validators.max(startDateMeta.maxDate.valueOf()),
          // ]
          );
  
      const endDateSetter = (n: Date)=>{
        startDateMeta.maxDate = n;
        endDateFormControl.setValue(n);
      }
      const endDateGetter = ()=>{
        return endDateFormControl.value;
      }
      const endDateFormControl = new FormControl(
        metaData.endDate,
        // [
        //   Validators.min(endDateMeta.minDate.valueOf()),
        //   Validators.max(endDateMeta.maxDate.valueOf()),
        // ]
        );
    //   startDateFormControl.addValidators(Validators.max(endDateFormControl.value.valueOf()))
        
      Object.defineProperty(target, metaData.startDateLabel, {
        set: startDateSetter,
        get: startDateGetter,
        enumerable: true,
      });

      //@ts-ignore
      startDateMeta.formControl = startDateFormControl;
      startDateFormControl.valueChanges.subscribe(n => endDateMeta.minDate = new Date(n));
      Reflect.defineMetadata(metaData.startDateLabel, startDateMeta, target, metaData.startDateLabel);

      Object.defineProperty(target, metaData.endDateLabel, {
        set: endDateSetter,
        get: endDateGetter,
        enumerable: true,
      });
      
      //@ts-ignore
      endDateMeta.formControl = endDateFormControl;
      endDateFormControl.valueChanges.subscribe(n => {
        Reflect.getMetadata(metaData.startDateLabel, target, metaData.startDateLabel).maxDate = new Date(n);
        console.log("end date changes ", Reflect.getMetadata(metaData.startDateLabel, target, metaData.startDateLabel))
        // startDateMeta.maxDate = new Date(n)
      })
      Reflect.defineMetadata(metaData.endDateLabel, endDateMeta, target, metaData.endDateLabel);

      const setter = function (val?: any) {
        if(Array.isArray(val)&& val.length ==2){
          startDateSetter(val[0]);
          endDateSetter(val[1]);
        }else{
          throw new Error("value must be array ");
        }
      };
    
      const getter = function () {
        return [startDateGetter(), endDateGetter()];
      };
    
      Object.defineProperty(target, propertyKey, {
        set: setter,
        get: getter,
        enumerable: true,
      });
    };
  }

  const minDate = function(dateValue: Date): ValidatorFn {
    return function(control: AbstractControl){
      if(typeof control.value == 'string'){
          let dateValue = new Date(control.value);
      }
      return null;
    }
  }