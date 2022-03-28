import {
  BasicAction,
  BasicActionMeta,
  NativeActionSpec,
} from '../../types/actions/actions-api';

export function Submit(meta: NativeActionSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      submit = new BasicAction({ ...meta, type: 'submit' });
    };
  };
}
