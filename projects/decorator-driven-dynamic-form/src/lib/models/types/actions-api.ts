import {FormGroup} from "@angular/forms";

 export interface BasicActionMeta {
  label: string;
  width?: number;
  class?: string;
}

 interface AdditionalActionMeta extends  BasicActionMeta{
  id: string;
  enableFn?: (context: FormGroup) => boolean;
  emitFn: (context: FormGroup) => any;
}
