import { Validators } from "@angular/forms";
import { FormModel, TextControl } from "./common-controls";


@FormModel({})
export class Address{

    @TextControl({
        name: 'city',
        type: 'city',
        id: 'city',
        validators: [Validators.required],
      })
    city!: string;

    @TextControl({
        name: 'state',
        type: 'state',
        id: 'state',
        validators: [Validators.required],
      })
    state!: string;

    @TextControl({
        name: 'zipCode',
        type: 'zipCode',
        id: 'zipCode',
        validators: [Validators.required],
      })
    zipCode!: string;

    constructor(){}

}