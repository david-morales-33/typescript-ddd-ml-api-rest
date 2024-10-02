import sql, { ConnectionPool } from 'mssql';

type dbParameters = {
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

    constructor(private _pool: Promise<ConnectionPool>) { }

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

    protected async execute(parameters?: dbParameters[]): Promise<sql.IProcedureResult<any>> {
        const query = (await this.connection()).request();

        if (parameters !== undefined)
            parameters.forEach(element => {
                query.input(element.name, element.type, element.value)
            })

        return await query.execute<Promise<sql.IProcedureResult<any>>>(this.procedureStoreName());
    }
}