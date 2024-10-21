import { container } from '../application';
import { SQLServerConfigFactory } from '../../../../contexts/SewingProductionAreaManagement/Shared/infrastructure/persistence/SQLServer/SQLServerConfigFactory'
import { SQLServerPoolFactory } from '../../../../contexts/Shared/infrastructure/persistence/SQLServere/SQLServerPoolFactory';
import { ConnectionPool } from 'mssql'

container.
register('SewingProductionAreaManagement.infrastructure.shared.SQLServerConfigFactory', 'SQLServerConfig').
setFactory(SQLServerConfigFactory, 'createConfig');

container.register('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager', ConnectionPool).
    addArgument('SewingProductionAreaManagement').
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.SQLServerConfigFactory')).
    setFactory(SQLServerPoolFactory, 'createPool');