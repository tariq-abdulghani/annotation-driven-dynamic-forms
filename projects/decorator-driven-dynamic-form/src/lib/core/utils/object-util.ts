export class ObjectUtil {
  /**
   *Patches an object with some value
   *
   * @param {Object} obj
   * @param {Object} patch new state of some attributes
   * @returns {Object}
   */
  static patchObject(obj: any, patch: any) {
    let state: { [x: string]: any } = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (
        obj[key] instanceof Object &&
        !(obj[key] instanceof Date) &&
        !Array.isArray(obj[key]) &&
        !(obj[key] instanceof Function)
      ) {
        if (patch[key]) {
          state[key] = ObjectUtil.patchObject(obj[key], patch[key]);
        } else {
          state[key] = obj[key];
        }
      } else if (Array.isArray(obj[key])) {
        state[key] = patch[key] || obj[key];
      } else {
        state[key] = patch[key] || obj[key];
      }
    });
    return state;
  }
}
