import { BasicActionMeta } from '../../types/actions/actions';

export const ACTION_METADATA_KEY = Symbol('actions');

export class ActionsMetaData {
  public static add(meta: any, constructor: any) {
    const actions = ActionsMetaData.get(constructor.prototype);
    if (actions) {
      actions.push(meta);
    } else {
      Reflect.defineMetadata(
        ACTION_METADATA_KEY,
        [meta],
        constructor.prototype
      );
    }
  }

  public static get(target: any) {
    return Reflect.getMetadata(ACTION_METADATA_KEY, target) as
      | BasicActionMeta[]
      | undefined;
  }
}
