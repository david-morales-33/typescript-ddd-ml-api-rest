import { SQLServerProductionOrderDetail } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrderDetail/infrastructure/Persistence/SQLServer/SQLServerProductionOrderDetail';
import { container } from '../application';

const sqlServerProductionOrderDetail = container.register('SewingProductionAreaManagement.infrastructure.ProductionOrderDetail.SqlServerProductionOrderDetail', SQLServerProductionOrderDetail).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'))

