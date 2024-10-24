import { SQLServerConfigFactory } from '../../../../contexts/SharedAdministrativeManagement/Shared/infrastructure/Persistence/SQLServer/SQLServerConfigFactory';
import { SQLServerPoolFactory } from '../../../../contexts/Shared/infrastructure/persistence/SQLServere/SQLServerPoolFactory';
import { container } from '../application';
import { ConnectionPool } from 'mssql';

container.register('SharedAdministrativeManagement.infrastructure.shared.SQLServerConfigFactory', 'SQLServerConfig').setFactory(SQLServerConfigFactory, 'createConfig');

container.register('SharedAdministrativeManagement.infrastructure.shared.ConnectionManager', ConnectionPool).
    addArgument('SharedAdministrativeManagement').
    addArgument(container.get('SharedAdministrativeManagement.infrastructure.shared.SQLServerConfigFactory')).
    setFactory(SQLServerPoolFactory, 'createPool');