import {
  BasicAction,
  BasicActionMeta,
  NativeActionSpec,
} from '../../types/actions/actions-api';

export function Reset(meta: NativeActionSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      reset = new BasicAction({ ...meta, type: 'reset' });
    };
  };
}
