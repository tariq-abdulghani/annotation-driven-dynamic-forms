export interface ActionMeta {}

export interface BasicActionMeta {
  label: string;
  width?: number;
  class?: string;
}

export function Submit(meta: BasicActionMeta) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      submit = meta;
    };
  };
}

export function Reset(meta: BasicActionMeta) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      reset = meta;
    };
  };
}
