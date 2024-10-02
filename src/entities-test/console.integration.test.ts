import { Criteria } from "../contexts/Shared/domain/design-patterns/Criteria/Criteria";
import { Filter } from "../contexts/Shared/domain/design-patterns/Criteria/Filter";
import { FilterOperator } from "../contexts/Shared/domain/design-patterns/Criteria/FilterOperator";
import { Filters } from "../contexts/Shared/domain/design-patterns/Criteria/Filters";
import { Order } from "../contexts/Shared/domain/design-patterns/Criteria/Order";
import { SQLServerCriteriaConverter } from "../contexts/Shared/infrastructure/percistence/SQLServere/SQLServerCriteriaConverter";

const converter = new SQLServerCriteriaConverter();
// const operador = new FilterOperator()

const filter1 = Filter.fromValues(
    new Map<string, string>([
        ['field', 'op'],
        ['operator', 'CONTAINS'],
        ['value', '3654']
    ])
);
const filter2 = Filter.fromValues(
    new Map<string, string>([
        ['field', 'referencia'],
        ['operator', '='],
        ['value', 'mar3654']
    ])
);
const order = Order.fromValues('fecha','asc')
const filters = new Filters([filter1,filter2]);
const criterio = new Criteria(filters,order);

const query = converter.convert(criterio);

console.log(query)