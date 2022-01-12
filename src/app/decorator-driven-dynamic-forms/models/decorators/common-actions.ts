import {BasicActionMeta} from "../types/actions-api";


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