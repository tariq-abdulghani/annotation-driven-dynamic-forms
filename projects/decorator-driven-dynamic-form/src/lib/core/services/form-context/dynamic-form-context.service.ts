import { Injectable } from '@angular/core';

@Injectable()
export class DynamicFormContextService {
  private context: any;
  constructor() {}

  public setContext(ctx: any) {
    this.context = ctx;
  }

  public getContext() {
    return this.context;
  }
}
