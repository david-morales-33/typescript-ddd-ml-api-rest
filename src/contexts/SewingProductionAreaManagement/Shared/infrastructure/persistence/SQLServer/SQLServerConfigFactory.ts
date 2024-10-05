import { EnviromentConfig } from '../../../../../../server/EnviromentConfig';
// import {SQLServerConfig} from '../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerConfig'
import { config as SQLServerConfig } from 'mssql';


export class SQLServerConfigFactory {
    static createConfig(): SQLServerConfig {
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
            port: parseInt(env.DB_PORT),
            password: env.DB_PASSWORD,
            server: env.DB_HOST,
            database: env.DB_DATABASE,
            pool,
            options
        }
    }
}
