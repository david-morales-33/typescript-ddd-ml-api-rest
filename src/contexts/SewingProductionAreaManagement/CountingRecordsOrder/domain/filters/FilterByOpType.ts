import { Filter } from "../../../../Shared/domain/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/Criteria/FilterValue";

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