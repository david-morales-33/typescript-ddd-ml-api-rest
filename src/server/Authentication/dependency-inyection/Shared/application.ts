import { ConnectionPool } from "mssql";
import { SQLServerConfigFactory } from "../../../../contexts/Authentication/Shared/infrastructure/Persistence/SQLServer/SQLServerConfigFactory";
import { SQLServerPoolFactory } from "../../../../contexts/Shared/infrastructure/persistence/SQLServere/SQLServerPoolFactory";
import { container } from "../application";

container.register('Authentication.infrastructure.shared.SQLServerConfigFactory', 'SQLServerConfig').
    setFactory(SQLServerConfigFactory, 'createConfig');

container.register('Authentication.infrastructure.shared.ConnectionManager', ConnectionPool).
    addArgument('Authentication').
    addArgument(container.get('Authentication.infrastructure.shared.SQLServerConfigFactory')).
    setFactory(SQLServerPoolFactory, 'createPool');