import { Filter } from "../../../../Shared/domain/design-patterns/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/design-patterns/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/design-patterns/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/design-patterns/Criteria/FilterValue";

export class FilterByCategory extends Filter {
    constructor(category: string) {
        super(
            new FilterField('categoria_id'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(category)
        )
    }
}