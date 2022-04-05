import { NativeActionSpec } from '../../types/actions/actions';
import { ActionsMetaData } from './actions-metadata';

export function Submit(meta: NativeActionSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    ActionsMetaData.add({ ...meta, type: 'submit' }, constructor);
    return class extends constructor {};
  };
}
