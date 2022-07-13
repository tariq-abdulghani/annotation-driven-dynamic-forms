export interface FormController {
  markAllAsTouched(): void;
  markAsTouched(path: string): void;

  markAsInvalid(
    path?: string,
    errConfig?: { errName: string; errMessage: string }
  ): void;

  markFieldAsInvalid(
    path: string,
    errConfig: { errName: string; errMessage: string }
  ): void;

  disable(path: string): void;
  enable(path: string): void;

  setReadonly(path: string): void;
  unsetReadonly(path: string): void;

  getRowValue(): any;
  getValue(): any;

  fireAction(id: string): void;
  reset(value?: any, emitEvent?: boolean): void;
  patch(value?: any, emitEvent?: boolean): void;
  getName(): string;

  isValid(): boolean;
}
