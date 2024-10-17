import { Filter } from "../../../../Shared/domain/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/Criteria/FilterValue";

export class FilterByProductionModule extends Filter {
    constructor(productionModule: number) {
        super(
            new FilterField('modulo'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(productionModule.toString())
        )
    }
}