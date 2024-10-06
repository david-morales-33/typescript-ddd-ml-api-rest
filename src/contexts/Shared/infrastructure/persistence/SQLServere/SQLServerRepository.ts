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

    protected async execute(
        params: dbParameters[] | [],
        tvp?: {
            tvp_param: string,
            tvp_name: string,
            tvp_values: dbParameters[] | []
        }
    ): Promise<sql.IProcedureResult<any>> {

        if (tvp !== undefined) {
            const { tvp_name, tvp_param, tvp_values } = tvp;
            const tvpParameters = this.TVPConverter(tvp_param, tvp_name, tvp_values);
            const newParams = [...params, tvpParameters];

            const query = this.setterQueryInputs((await this.connection()).request(), newParams)
            return await query.execute<Promise<sql.IProcedureResult<any>>>(this.procedureStoreName());
        }
        const query = this.setterQueryInputs((await this.connection()).request(), params)
        return await query.execute<Promise<sql.IProcedureResult<any>>>(this.procedureStoreName());
    }

    protected createTVPTable(values: any[], tableType: string, columns: { name: string, type: paramType }[]) {
        const table = new sql.Table(tableType);  // Crea la tabla de tipo TVP

        columns.forEach(col => {
            table.columns.add(col.name, col.type);
        });

        values.forEach(row => {
            table.rows.add(...columns.map(col => row[col.name]));
        });
        return table;
    }

    protected TVPConverter(tvp_param: string, tvp_name: string, values?: dbParameters[]): dbParameters {
        const TvpParam: dbParameters = { name: tvp_param, type: sql.TVP, value: new sql.Table(tvp_name) }

        if (values !== undefined)
            values.forEach((element, idx) => {
                TvpParam.value.columns.add(element.name, element.type);
                TvpParam.value.rows.add((idx + 1), element.value);
            });
        return TvpParam;
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

    private setterQueryInputs(query: sql.Request, params?: dbParameters[]): sql.Request {
        if (params !== undefined)
            params.forEach(element => { query.input(element.name, element.type, element.value) });
        return query;
    }

}
Object.keys(SQLServerRepository)
