import { Filter } from "../../../../Shared/domain/design-patterns/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/design-patterns/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/design-patterns/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/design-patterns/Criteria/FilterValue";

export class FilterByOpType extends Filter {
    constructor(opType: string) {
        super(
            new FilterField('op'),
            new FilterOperator(Operator.CONTAINS),
            new FilterValue(opType)
        )
        this.ensureValidOpType(opType)
    }
    private ensureValidOpType(value: string) {
        if (value !== 'MOP%' && value !== 'MOB%')
            throw new Error(`Value <${value}> not valid`)
    }
}