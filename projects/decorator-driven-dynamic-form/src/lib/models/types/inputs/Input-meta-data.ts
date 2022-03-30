
export class InputMetaData {

  private properties: Map<string, any> = new Map();
  constructor(specs: any) {
    Object.entries(specs).forEach(entry => {
      this.properties.set(entry[0], entry[1]);
    });
  }
  get(name: string): any {
    return this.properties.get(name);
  }

  add(name: string, value: any) {
    this.properties.set(name, value);
  }

  getProperties() {
    return this.properties;
  }

  setProperties(properties: Map<string, any>) {
    this.properties = properties;
  }
}
