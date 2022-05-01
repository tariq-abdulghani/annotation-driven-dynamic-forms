import { MapUtil } from '../../../utils/map-util';
import { FormMeta, FormSpec } from '../../types/forms/form-meta';

export const FORM_METADATA_KEY = Symbol('FormSpec');

export class FormMetaData {
  public static add(formSpec: FormSpec, constructor: any) {
    Reflect.defineMetadata(
      FORM_METADATA_KEY,
      MapUtil.formObject(new FormMeta(formSpec)),
      constructor.prototype
    );
  }

  public static get(target: any) {
    // console.log(target);
    return Reflect.getMetadata(FORM_METADATA_KEY, target) as Map<string, any>;
  }
}
