import 'reflect-metadata';

export type UseContext =
  | 'CREATE'
  | 'UPDATE'
  | 'NONE'
  | 'SEARCH'
  | 'PATCH'
  | string;
export const ID_META_KEY = Symbol('Id');
export const ON_CONTEXT_META_KEY = Symbol('ON_CONTEXT_META_KEY');
export const USE_CONTEXT_META_KEY = Symbol('USE_CONTEXT_META');

// export type IdSpecs = {
//   generate: 'INPUT' | 'SERVER'; // if input input will appear when form is used to create the entity else will not appear
//   //   update: 'INPUT' | 'READ_ONLY';
// };

export type ContextSpecs = {
  context: string;
  properties: OverridableProperties;
};

export type OverridableProperties = {
  readonly?: boolean;
  disabled?: boolean;
  class?: string;
  [x: string]: any;
};

/**
 * used to override some attributes in some context
 * a filed may be disabled in a context and enabled in another
 * or may have different style and so on ..
 *
 * @param specs {context: string;
  properties: OverridableProperties;}
 * @returns none
 */
export function ContextOverride(specs: {
  context: string;
  properties: OverridableProperties;
}) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(ON_CONTEXT_META_KEY, specs, target, propertyKey);
  };
}

export function Id() {
  return function (target: any, propertyKey: string) {
    // console.log('target id', target);
    Reflect.defineMetadata(ID_META_KEY, propertyKey, target);
  };
}

/**
 * used to bind field existence with context variable
 * the field will only appear if its context equals form context
 * if no context is specified to field it appears in all contexts
 *
 * @param ctx string
 * @returns none
 */
export function UseContext(ctx: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(USE_CONTEXT_META_KEY, ctx, target, propertyKey);
  };
}
