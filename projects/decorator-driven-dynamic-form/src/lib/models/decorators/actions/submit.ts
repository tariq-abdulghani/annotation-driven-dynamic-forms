import {
  BasicAction,
  BasicActionMeta,
  NativeActionSpec,
} from '../../types/actions/actions-api';
import { ActionsMetaData } from './actions-metadata';

export function Submit(meta: NativeActionSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    ActionsMetaData.add(new BasicAction({ ...meta, type: 'submit' }), constructor);
    return class extends constructor {
      submit = new BasicAction({ ...meta, type: 'submit' });
    };
  };
}
