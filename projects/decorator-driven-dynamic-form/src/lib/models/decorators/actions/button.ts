import { NativeActionSpec } from '../../types/actions/actions';
import { ActionsMetaData } from './actions-metadata';

export function Button(meta: NativeActionSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    ActionsMetaData.add({ ...meta, type: 'button' }, constructor);
    return class extends constructor {};
  };
}
