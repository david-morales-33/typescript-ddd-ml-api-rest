import { Filter } from "../../../../Shared/domain/design-patterns/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/design-patterns/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/design-patterns/Criteria/FilterOperator";
import { FilterValue } from "../../../../Shared/domain/design-patterns/Criteria/FilterValue";

export class FilterByEvent extends Filter {
    constructor() {
        super(
            new FilterField('event_id'),
            new FilterOperator(Operator.IS_NOT_NULL),
            new FilterValue('NULL')
        )
    }
}