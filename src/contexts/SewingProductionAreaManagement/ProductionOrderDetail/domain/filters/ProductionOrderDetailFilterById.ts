import { Filter } from "../../../../Shared/domain/design-patterns/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/design-patterns/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/design-patterns/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/design-patterns/Criteria/FilterValue";

export class ProductionOrderDetailFilterById extends Filter {
    constructor(op: string) {
        super(
            new FilterField('op'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(op)
        )
    }
}