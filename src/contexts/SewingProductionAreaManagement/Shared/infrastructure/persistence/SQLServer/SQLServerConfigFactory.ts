import { EnviromentConfig } from '../../../../../../server/EnviromentConfig';

interface ConfigureDB {
    user: string
    password: string
    server: string
    database: string,
    pool: any,
    options: any
}

export class SQLServerConfigFactory {
    static createConfig(): ConfigureDB {
        const env = new EnviromentConfig();
        const pool = {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000,
        };
        const options = {
            encrypt: true,
            trustServerCertificate: true
        }
        return {
            user: env.DB_USER,
            password: env.DB_PASSWORD,
            server: env.DB_HOST,
            database: env.DB_DATABASE,
            pool,
            options
        }
    }
}