export interface NativeActionSpec {
  label: string;
  width?: number;
  class?: string;
}

export interface BasicActionMeta {
  label: string;
  type: 'button' | 'submit' | 'reset';
  width?: number;
  class?: string;
}

export class BasicAction implements BasicActionMeta {
  constructor(actionSpec: BasicActionMeta) {
    this.label = actionSpec.label;
    this.class = actionSpec.class;
    this.width = actionSpec.width;
    this.type = actionSpec.type;
  }
  type: 'button' | 'submit' | 'reset';

  label: string;
  width?: number | undefined;
  class?: string | undefined;
}
