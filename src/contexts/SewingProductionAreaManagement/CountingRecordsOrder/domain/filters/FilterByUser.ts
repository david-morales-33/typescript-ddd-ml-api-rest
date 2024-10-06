import { Filter } from "../../../../Shared/domain/design-patterns/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/design-patterns/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/design-patterns/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/design-patterns/Criteria/FilterValue";

export class FilterByUser extends Filter {
    constructor(userId: string) {
        super(
            new FilterField('creado_por'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(userId)
        )
    }
}