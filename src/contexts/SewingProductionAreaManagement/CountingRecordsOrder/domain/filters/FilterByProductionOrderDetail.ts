import { Filter } from "../../../../Shared/domain/design-patterns/Criteria/Filter";
import { FilterField } from "../../../../Shared/domain/design-patterns/Criteria/FilterField";
import { FilterOperator, Operator } from "../../../../Shared/domain/design-patterns/Criteria/FilterOperator";
import { Filters } from "../../../../Shared/domain/design-patterns/Criteria/Filters";
import { FilterValue } from "../../../../Shared/domain/design-patterns/Criteria/FilterValue";

export class FilterByProductionOrderDetail extends Filters {
    constructor(productionOrder: string, color: string, size: string) {
        super([
            new Filter(
                new FilterField('op'),
                new FilterOperator(Operator.EQUAL),
                new FilterValue(productionOrder)
            ),
            new Filter(
                new FilterField('color_id'),
                new FilterOperator(Operator.EQUAL),
                new FilterValue(color)
            ),
            new Filter(
                new FilterField('talla_id'),
                new FilterOperator(Operator.EQUAL),
                new FilterValue(size)
            ),
        ])
    }
}