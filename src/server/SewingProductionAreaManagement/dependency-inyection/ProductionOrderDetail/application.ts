import { ProductionOrderDetailFinder } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrderDetail/application/use-cases/Find/ProductionOrderDetailFinder';
import { ProductionOrderDetailQueryHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrderDetail/application/use-cases/Find/ProductionOrderDetailQueryHandler';
import { SQLServerProductionOrderDetail } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrderDetail/infrastructure/Persistence/SQLServer/SQLServerProductionOrderDetail';
import { container } from '..';

container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrderDetail.SqlServerProductionOrderDetail', SQLServerProductionOrderDetail).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'))

container.
    register('SewingProductionAreaManagement.application.ProductionOrderDetail.ProductionOrderDetailFinder', ProductionOrderDetailFinder).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionOrderDetail.SqlServerProductionOrderDetail'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrderDetail.ProductionOrderDetailQueryHandler', ProductionOrderDetailQueryHandler).
    addArgument(container.get('SewingProductionAreaManagement.application.ProductionOrderDetail.ProductionOrderDetailFinder'));