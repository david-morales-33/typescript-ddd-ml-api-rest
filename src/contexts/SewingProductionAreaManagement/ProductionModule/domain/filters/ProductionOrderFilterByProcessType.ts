import { Filter } from "../../../../Shared/domain/design-patterns/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/design-patterns/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/design-patterns/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/design-patterns/Criteria/FilterValue";

export class ProductionOrderFilterByProcessType extends Filter {
    constructor(value: number) {
        super(
            new FilterField('tipo_proceso_id'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(value.toString())
        )
    }
}