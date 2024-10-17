import { Filter } from "../../../../Shared/domain/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/Criteria/FilterValue";

export class FilterByEvent extends Filter {
    constructor() {
        super(
            new FilterField('event_id'),
            new FilterOperator(Operator.IS_NOT_NULL),
            new FilterValue('NULL')
        )
    }
}