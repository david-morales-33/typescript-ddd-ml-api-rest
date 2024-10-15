import { ConnectionPool } from 'mssql';
import { SQLServerConfigFactory } from '../../../../contexts/PlatformsManagement/Shared/infrastructure/Persistence/SQLServer/SQLServerConfigFactory';
import { SQLServerPoolFactory } from '../../../../contexts/Shared/infrastructure/persistence/SQLServere/SQLServerPoolFactory';
import { container } from '../application'

container.register('PlatformManagement.infrastructure.shared.SQLServerConfigFactory', 'SQLServerConfig').setFactory(SQLServerConfigFactory, 'createConfig');


container.register('PlatformManagement.infrastructure.shared.ConnectionManager', ConnectionPool).
    addArgument('PlatformManagement').
    addArgument(container.get('PlatformManagement.infrastructure.shared.SQLServerConfigFactory')).
    setFactory(SQLServerPoolFactory, 'createPool');