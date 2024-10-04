import sql, { ConnectionPool } from 'mssql';
import { SQLServerCriteriaConverter } from './SQLServerCriteriaConverter';

export type dbParameters = {
    name: string;
    type:
    | sql.ISqlTypeFactoryWithLength
    | sql.ISqlTypeFactoryWithNoParams
    | sql.ISqlTypeFactoryWithPrecisionScale
    | sql.ISqlTypeFactoryWithScale
    | sql.ISqlTypeFactoryWithTvpType;
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
            tvp_params: dbParameters[] | []
        }
    ): Promise<sql.IProcedureResult<any>> {

        if (tvp !== undefined) {
            const { tvp_name, tvp_param, tvp_params } = tvp;
            const tvpParameters = this.TVPConverter(tvp_param, tvp_name, tvp_params);
            const newParams = [...tvp_params, tvpParameters];

            const query = this.setterQueryInputs((await this.connection()).request(), newParams)
            return await query.execute<Promise<sql.IProcedureResult<any>>>(this.procedureStoreName());
        }
        
        const query = this.setterQueryInputs((await this.connection()).request(), params)
        return await query.execute<Promise<sql.IProcedureResult<any>>>(this.procedureStoreName());
    }

    protected TVPConverter(tvp_param: string, tvp_name: string, params?: dbParameters[]): dbParameters {
        const TvpParam: dbParameters = { name: tvp_param, type: sql.TVP, value: new sql.Table(tvp_name) }

        if (params !== undefined)
            params.forEach((element, idx) => {
                TvpParam.value.columns.add(element.name, element.type);
                TvpParam.value.rows.add((idx + 1), element.value);
            });
        return TvpParam;
    }

    private setterQueryInputs(query: sql.Request, params?: dbParameters[]): sql.Request {
        if (params !== undefined)
            params.forEach(element => { query.input(element.name, element.type, element.value) });
        return query;
    }

}