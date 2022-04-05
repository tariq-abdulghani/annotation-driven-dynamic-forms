import { CrossValidationSpec } from './cross-validation';
export const CROSS_VALIDATION_METADATA_KEY = Symbol('CrossValidation');

export class CrossValidationMeta {
  public static add(spec: CrossValidationSpec, constructor: any) {
    const crossValidationMeta = Reflect.getMetadata(
      CROSS_VALIDATION_METADATA_KEY,
      constructor.prototype
    );
    if (!crossValidationMeta) {
      return Reflect.defineMetadata(
        CROSS_VALIDATION_METADATA_KEY,
        [spec],
        constructor.prototype
      );
    } else {
      crossValidationMeta.push(spec);
    }
  }

  public static get(target: any): CrossValidationSpec[] | undefined {
    return Reflect.getMetadata(CROSS_VALIDATION_METADATA_KEY, target);
  }
}
