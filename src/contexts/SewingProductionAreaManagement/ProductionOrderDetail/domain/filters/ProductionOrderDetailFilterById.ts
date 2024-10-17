import { Filter } from "../../../../Shared/domain/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/Criteria/FilterValue";

export class ProductionOrderDetailFilterById extends Filter {
    constructor(op: string) {
        super(
            new FilterField('op'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(op)
        )
    }
}