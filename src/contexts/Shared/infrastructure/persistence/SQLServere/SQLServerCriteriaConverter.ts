import { Criteria } from "../../../domain/design-patterns/Criteria/Criteria";
import { Filter } from "../../../domain/design-patterns/Criteria/Filter";
import { Order } from "../../../domain/design-patterns/Criteria/Order";
import { Operator as ComparisonOperator } from "../../../domain/design-patterns/Criteria/FilterOperator";
import { Operator as LogicOperator } from "../../../domain/design-patterns/Criteria/LogicOperator";

type SQLComparisonOperator = '=' | '<>' | '>' | '<' | 'LIKE' | 'NOT LIKE' | 'IS' | 'IS NOT';
type SQLLogicOperator = 'AND' | 'OR';
type SQLDirection = 'ASC' | 'DESC';

export interface SQLQueryFilters {
    comparisonOperator: SQLComparisonOperator;
    logicOperator: SQLLogicOperator;
    field: string;
    value: string
}

interface TransformerFunction<K> { (): K }

export class SQLServerCriteriaConverter {
    private filterComparisonOperatorTransformers: Map<ComparisonOperator, TransformerFunction<SQLComparisonOperator>>;
    private filterLogicOperatorTransformers: Map<LogicOperator, TransformerFunction<SQLLogicOperator>>;

    constructor() {
        this.filterComparisonOperatorTransformers = new Map<ComparisonOperator, TransformerFunction<SQLComparisonOperator>>([
            [ComparisonOperator.EQUAL, this.equalFilter],
            [ComparisonOperator.NOT_EQUAL, this.notEqualFilter],
            [ComparisonOperator.GT, this.greaterThanFilter],
            [ComparisonOperator.LT, this.lowerThanFilter],
            [ComparisonOperator.CONTAINS, this.containsFilter],
            [ComparisonOperator.NOT_CONTAINS, this.notContainsFilter],
            [ComparisonOperator.IS_NULL, this.isFilter],
            [ComparisonOperator.IS_NOT_NULL, this.isNotFilter],
        ]);
        this.filterLogicOperatorTransformers = new Map<LogicOperator, TransformerFunction<SQLLogicOperator>>([
            [LogicOperator.AND, this.AndFilter],
            [LogicOperator.OR, this.OrFilter]
        ]);
    }

    public convert(criteria: Criteria): SQLQueryFilters[] {
        return criteria.filters.filters.map(filter => {
            const sqlQueryFilters: SQLQueryFilters = {
                logicOperator: this.generateLogicOperatorFilter(LogicOperator.AND), // modificar//
                field: filter.field.value,
                comparisonOperator: this.generateComparisonOperatorFilter(filter),
                value: filter.value.value
            }
            return sqlQueryFilters;
        });
    }

    protected generateComparisonOperatorFilter(filter: Filter): SQLComparisonOperator {
        const transformer = this.filterComparisonOperatorTransformers.get(filter.operator.value);
        if (!transformer) {
            throw new Error(`Unexpected operator value ${filter.operator.value}`);
        }
        return transformer()
    }

    protected generateLogicOperatorFilter(filter: LogicOperator): SQLLogicOperator {
        const transformer = this.filterLogicOperatorTransformers.get(filter);
        if (!transformer) {
            throw new Error(`Unexpected operator value ${filter}`);
        }
        return transformer()
    }

    private equalFilter(): SQLComparisonOperator {
        return '='
    }
    private notEqualFilter(): SQLComparisonOperator {
        return '<>'
    }
    private greaterThanFilter(): SQLComparisonOperator {
        return '>'
    }
    private lowerThanFilter(): SQLComparisonOperator {
        return '<'
    }
    private containsFilter(): SQLComparisonOperator {
        return 'LIKE'
    }
    private notContainsFilter(): SQLComparisonOperator {
        return 'NOT LIKE'
    }
    private isFilter(): SQLComparisonOperator {
        return 'IS';
    }
    private isNotFilter(): SQLComparisonOperator {
        return 'IS NOT'
    }
    private AndFilter(): SQLLogicOperator {
        return 'AND'
    }
    private OrFilter(): SQLLogicOperator {
        return 'OR'
    }
}