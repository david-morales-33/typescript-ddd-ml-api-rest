import { EnumValueObject } from "../value-object/EnumValueObject";

export enum Operator {
    AND = '&&',
    OR = '||'
}

export class LogicOperator extends EnumValueObject<Operator> {
    constructor(value: Operator) {
        super(value, Object.values(Operator));
    }

    static fromValue(value: string): LogicOperator {
        for (const operatorValue of Object.values(Operator)) {
            if (value === operatorValue.toString()) {
                return new LogicOperator(operatorValue);
            }
        }
        throw new Error(`The filter operator ${value} is invalid`);
    }

    protected throwErrorForInvalidValue(value: Operator): void {
        throw new Error(`The filter operator ${value} is invalid`);
    }
}
