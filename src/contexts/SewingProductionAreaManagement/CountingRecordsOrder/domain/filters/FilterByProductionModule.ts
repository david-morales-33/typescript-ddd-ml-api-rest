import { Filter } from "../../../../Shared/domain/design-patterns/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/design-patterns/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/design-patterns/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/design-patterns/Criteria/FilterValue";

export class FilterByProductionModule extends Filter {
    constructor(productionModule: number) {
        super(
            new FilterField('modulo'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(productionModule.toString())
        )
    }
}