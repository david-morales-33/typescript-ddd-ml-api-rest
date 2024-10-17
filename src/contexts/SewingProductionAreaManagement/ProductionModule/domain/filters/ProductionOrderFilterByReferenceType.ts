import { Filter } from "../../../../Shared/domain/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/Criteria/FilterValue";

export class ProductionOrderFilterByReferenceType extends Filter {
    constructor(value: number) {
        super(
            new FilterField('tipo_proceso_id'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(value.toString())
        )
    }
}