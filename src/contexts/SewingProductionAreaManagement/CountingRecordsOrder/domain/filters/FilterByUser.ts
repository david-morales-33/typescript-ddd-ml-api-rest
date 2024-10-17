import { Filter } from "../../../../Shared/domain/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/Criteria/FilterValue";

export class FilterByUser extends Filter {
    constructor(userId: string) {
        super(
            new FilterField('creado_por'),
            new FilterOperator(Operator.EQUAL),
            new FilterValue(userId)
        )
    }
}