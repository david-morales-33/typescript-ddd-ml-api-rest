import { Filter } from "../../../../Shared/domain/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/Criteria/FilterValue";

export class FilterByCategory extends Filter {
    constructor(category: string) {
        super(
            new FilterField('categoria_id'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(category)
        )
    }
}