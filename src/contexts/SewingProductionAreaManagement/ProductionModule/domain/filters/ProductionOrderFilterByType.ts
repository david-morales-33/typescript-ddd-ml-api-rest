import { Filter } from "../../../../Shared/domain/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/Criteria/FilterValue";

export class ProductionOrderFilterByType extends Filter {
    constructor(value: string) {
        super(
            new FilterField('tipo_op_id'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(value)
        )
    }
}