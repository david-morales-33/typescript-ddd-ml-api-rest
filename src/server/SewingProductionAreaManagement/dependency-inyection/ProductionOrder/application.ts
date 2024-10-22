import { container } from '../application';
import { ProductionOrderValidator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/ProductionOrderValidator';
import { ProductionOrderCreator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/ProductionOrderCreator';
import { CreateProductionOrderCommandHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/CreateProductionOrderCommandHandler';
import { CountingRecordsOrderFirstQualityCreator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CountingRecordsOrderFirstQualityCreator';
import { CreateCountingRecordsOrderFirstQualityCommandHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CreateCountingRecordsOrderFirstQualityCommandHandler'
import { SQLServerProductionOrderResponseRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerProductionOrderResponseRepository';
import { SQLServerProductionOrderQueryRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerProductionOrderQueryRepository';
import { SQLServerCreateProductionOrderCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerCreateProductionOrderCommandRepository'
import { SQLServerCreateCountingRecordsOrderOneCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerCreateCountingRecordsOrderOneCommandRepository';
import { ProductionOrderByCriteriaSearcher } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/SearchByCriteria/ProductionOrderByCriteriaSearcher';
import { SearchProductionOrderByCriteriaQueryHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/SearchByCriteria/SearchProductionOrderByCriteriaQueryHandler';

// =========================================== Repositories =============================================== 
container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerProductionOrderResponseRepository', SQLServerProductionOrderResponseRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'));

container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerProductionOrderQueryRepository', SQLServerProductionOrderQueryRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'));


// ======================================= <create order> ==============================================
container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateProductionOrderCommandRepository', SQLServerCreateProductionOrderCommandRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.SqlServerCreatorProductionOrder', ProductionOrderCreator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateProductionOrderCommandRepository')).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.Services.WebServiceProductionOrder')).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.Services.WebServiceEAN'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.PersistenceProductionOrderValidator', ProductionOrderValidator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.SQLServerUserPermission'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.SqlServerCreateProductionOrderCommandHandler', CreateProductionOrderCommandHandler).
    addArgument(container.get('SewingProductionAreaManagement.application.ProductionOrder.SqlServerCreatorProductionOrder'));

// ======================================== Create Counting Records Order ================================================
container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateCountingRecordsOrderOneCommandRepository', SQLServerCreateCountingRecordsOrderOneCommandRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CountingRecordsOrderFirstQualityCreator', CountingRecordsOrderFirstQualityCreator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerProductionOrderQueryRepository')).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateCountingRecordsOrderOneCommandRepository'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderFirstQualityCommandHandler', CreateCountingRecordsOrderFirstQualityCommandHandler).
    addArgument(container.get('SewingProductionAreaManagement.application.ProductionOrder.CountingRecordsOrderFirstQualityCreator'));

//=============================================== Search Order By criteria ================================================
container.
    register('SewingProductionAreaManagement.application.ProductionOrder.ProductionOrderByCriteriaSearcher', ProductionOrderByCriteriaSearcher).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerProductionOrderResponseRepository'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.SearchProductionOrderByCriteriaQueryHandler', SearchProductionOrderByCriteriaQueryHandler).
    addArgument(container.get('SewingProductionAreaManagement.application.ProductionOrder.ProductionOrderByCriteriaSearcher'))