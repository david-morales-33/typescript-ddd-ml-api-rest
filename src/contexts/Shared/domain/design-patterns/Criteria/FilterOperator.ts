import { EnumValueObject } from "../../value-object/EnumValueObject";

export enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  CONTAINS = 'CONTAINS',
  CONTAINS_RIGHT = 'CONTAINS_RIGHT',
  CONTAINS_LEFT = 'CONTAINS_LEFT',
  NOT_CONTAINS = 'NOT_CONTAINS'
}


export class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Object.values(Operator));
  }

  static fromValue(value: string): FilterOperator {
    for (const operatorValue of Object.values(Operator)) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue);
      }
    }

    throw new Error(`The filter operator ${value} is invalid`);
  }

  public isPositive(): boolean {
    return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
  }

  protected throwErrorForInvalidValue(value: Operator): void {
    throw new Error(`The filter operator ${value} is invalid`);
  }

  static equal() {
    return this.fromValue(Operator.EQUAL);
  }
}
