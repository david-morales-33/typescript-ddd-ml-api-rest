import { ConnectionPool, config as SQLServerConfig } from 'mssql';

export class SQLServerPoolFactory {

    private static pools: { [key: string]: ConnectionPool } = {};

    static async createPool(contextName: string, config: SQLServerConfig): Promise<ConnectionPool> {
        let pool = SQLServerPoolFactory.getPool(contextName);

        if (!pool) {
            pool = await SQLServerPoolFactory.createAndConnectPool(config);
            SQLServerPoolFactory.registerPool(pool, contextName);
        }
        return pool;
    }

    private static getPool(contextName: string): ConnectionPool | null {
        return SQLServerPoolFactory.pools[contextName] || null;
    }

    private static async createAndConnectPool(config: SQLServerConfig): Promise<ConnectionPool> {
        const pool = new ConnectionPool(config);
        await pool.connect();
        return pool;
    }

    private static registerPool(pool: ConnectionPool, contextName: string): void {
        SQLServerPoolFactory.pools[contextName] = pool;
    }
}
