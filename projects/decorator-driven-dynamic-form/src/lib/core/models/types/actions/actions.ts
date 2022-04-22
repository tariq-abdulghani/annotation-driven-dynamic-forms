import { FormGroup } from '@angular/forms';

export interface BasicActionMeta {
  id: string;
  label: string;
  type: 'button' | 'submit' | 'reset';
  width?: number;
  class?: string;
  enableFn?: (ctx?: FormGroup) => boolean;
}

export type NativeActionSpec = Omit<BasicActionMeta, 'type'>;
