
export interface FormValueTransformer<T,V>{
    transform(formValue: T): V;
}