import sql, { ConnectionPool } from 'mssql';
import { SQLQueryFilters, SQLServerCriteriaConverter } from './SQLServerCriteriaConverter';

type paramType = | sql.ISqlTypeFactoryWithLength
    | sql.ISqlTypeFactoryWithNoParams
    | sql.ISqlTypeFactoryWithPrecisionScale
    | sql.ISqlTypeFactoryWithScale
    | sql.ISqlTypeFactoryWithTvpType;

export type dbParameters = {
    name: string;
    type: paramType;
    value: any
}
export abstract class SQLServerRepository {
    protected criteriaConverter: SQLServerCriteriaConverter;

    constructor(private _pool: Promise<ConnectionPool>) {
        this.criteriaConverter = new SQLServerCriteriaConverter();
    }

    protected abstract procedureStoreName(): string;

    protected pool(): Promise<ConnectionPool> {
        return this._pool;
    }

    protected async connection() {
        return (await this._pool).connect()
    }
    protected async disconnection() {
        return (await this._pool).close()
    }

    protected async execute(params: dbParameters[] | []): Promise<sql.IProcedureResult<any>> {
        const query = (await this.connection()).request();

        if (params !== undefined)
            params.forEach(element => { query.input(element.name, element.type, element.value) });

        return await query.execute<Promise<sql.IProcedureResult<any>>>(this.procedureStoreName());
    }

    protected createTVPTable(values: any[], tableType: string, columns: { name: string, type: paramType }[]) {
        const table = new sql.Table(tableType); 

        columns.forEach(col => {
            table.columns.add(col.name, col.type);
        });

        values.forEach(row => {
            table.rows.add(...columns.map(col => row[col.name]));
        });
        return table;
    }

    protected convertToPersistenceFilters(filters: SQLQueryFilters[]) {
        return filters.map(filter => {
            return {
                operador_logico: filter.logicOperator,
                campo: filter.field,
                operador_comparacion: filter.comparisonOperator,
                valor: filter.value
            }
        });
    }
}
