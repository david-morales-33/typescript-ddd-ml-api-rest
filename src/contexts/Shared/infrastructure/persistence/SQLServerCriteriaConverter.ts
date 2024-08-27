import { Criteria } from "../../domain/design-patterns/Criteria/Criteria";
import { Filter } from "../../domain/design-patterns/Criteria/Filter";
import { Operator } from "../../domain/design-patterns/Criteria/FilterOperator";
import { Filters } from "../../domain/design-patterns/Criteria/Filters";
import { Order } from "../../domain/design-patterns/Criteria/Order";

type SQLFilterOperator = '=' | '<>' | '>' | '<' | 'LIKE' | 'NOT LIKE';
type SQLDirection = 'ASC' | 'DESC';

interface SQLQuery {
    query: string;
    params: any[];
}

interface TransformerFunction<T, K> {
    (value: T): K;
}

export class SQLServerCriteriaConverter {
    private filterTransformers: Map<Operator, TransformerFunction<Filter, string>>;

    constructor() {
        this.filterTransformers = new Map<Operator, TransformerFunction<Filter, string>>([
            [Operator.EQUAL, this.equalFilter],
            [Operator.NOT_EQUAL, this.notEqualFilter],
            [Operator.GT, this.greaterThanFilter],
            [Operator.LT, this.lowerThanFilter],
            [Operator.CONTAINS, this.containsFilter],
            [Operator.NOT_CONTAINS, this.notContainsFilter]
        ]);
    }

    public convert(criteria: Criteria): SQLQuery {
        const filters = criteria.hasFilters() ? this.generateFilter(criteria.filters) : '';
        const order = criteria.order.hasOrder() ? this.generateOrder(criteria.order) : '';
        const limit = criteria.limit ? `LIMIT ${criteria.limit}` : '';
        const offset = criteria.offset ? `OFFSET ${criteria.offset}` : '';

        const query = `SELECT * FROM your_table_name ${filters} ${order} ${limit} ${offset}`.trim();

        return { query, params: [] };
    }

    protected generateFilter(filters: Filters): string {
        const conditions = filters.filters.map(filter => {
            const transformer = this.filterTransformers.get(filter.operator.value);

            if (!transformer) {
                throw new Error(`Unexpected operator value ${filter.operator.value}`);
            }

            return transformer(filter);
        });

        return `WHERE ${conditions.join(' AND ')}`;
    }

    protected generateOrder(order: Order): string {
        const direction: SQLDirection = order.orderType.isAsc() ? 'ASC' : 'DESC';
        return `ORDER BY ${order.orderBy.value === 'id' ? 'id' : order.orderBy.value} ${direction}`;
    }

    private equalFilter(filter: Filter): string {
        return `${filter.field.value} = '${filter.value.value}'`;
    }

    private notEqualFilter(filter: Filter): string {
        return `${filter.field.value} != '${filter.value.value}'`;
    }

    private greaterThanFilter(filter: Filter): string {
        return `${filter.field.value} > '${filter.value.value}'`;
    }

    private lowerThanFilter(filter: Filter): string {
        return `${filter.field.value} < '${filter.value.value}'`;
    }

    private containsFilter(filter: Filter): string {
        return `${filter.field.value} LIKE '%${filter.value.value}%'`;
    }

    private notContainsFilter(filter: Filter): string {
        return `${filter.field.value} NOT LIKE '%${filter.value.value}%'`;
    }
}