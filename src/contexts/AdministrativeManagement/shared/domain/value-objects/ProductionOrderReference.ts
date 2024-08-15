import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class ProductionOrderReference extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan15Characters(value);
  }

  private ensureLengthIsLessThan15Characters(value: string): void {
    if (value.length > 15) {
      throw new Error(`The Reference <${value}> has more than 15 characters`);
    }
  }
}