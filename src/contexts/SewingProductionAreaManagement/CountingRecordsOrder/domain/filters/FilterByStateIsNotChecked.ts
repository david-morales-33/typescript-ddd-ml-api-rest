import { Filter } from "../../../../Shared/domain/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/Criteria/FilterValue";

export class FilterByStateIsNotChecked extends Filter {
    constructor() {
        super(
            new FilterField('revisado_por'),
            new FilterOperator(Operator.IS_NULL),
            new FilterValue('NULL')
        )
    }
}