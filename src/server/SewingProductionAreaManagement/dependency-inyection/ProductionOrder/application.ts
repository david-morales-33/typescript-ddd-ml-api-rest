import { container } from '../application';
import { InMemoryProductionOrderResponseRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderResponseRepository';
import { ProductionOrderFInder } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/FindProductionOrder/ProductionOrderFInder';
import { ProductionOrderQueryHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/FindProductionOrder/ProductionOrderQueryHandler';
import { ProductionOrderValidator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/ProductionOrderValidator';
import { InMemoryProductionOrderEANExternalService } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderEANExternalService';
import { InMemoryExternalServiceRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderExternalService'
import { InMemoryCreateProductionOrderCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryCreateProductionOrderCommandRepository'
import { ProductionOrderCreator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/ProductionOrderCreator';
import { CreateProductionOrderCommandHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/CreateProductionOrderCommandHandler';
import { CreateCountingRecordsOrderFirstQualityValidator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CreateCountingRecordsOrderFirstQualityValidator'
import { CountingRecordsOrderFirstQualityCreator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CountingRecordsOrderFirstQualityCreator';
import { InMemoryCreateCountingRecordsOrderOneCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryCreateCountingRecordsOrderOneCommandRepository';
import { InMemoryProductionOrderQueryRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderQueryRepository';
import { CreateCountingRecordsOrderFirstQualityCommandHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CreateCountingRecordsOrderFirstQualityCommandHandler'
import { CountingRecordsOrderSecondQualityCreator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderSecondQuality/CountingRecordsOrderSecondQualityCreator'
import { CreateCountingRecordsOrderSecondQualityValidator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderSecondQuality/CreateCountingRecordsOrderSecondQualityValidator'
import { InMemoryCreateCountingRecordsOrderTwoCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryCreateCountingRecordsOrderTwoCommandRepository'
import { CreateCountingRecordsOrderSecondQualityCommandHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderSecondQuality/CreateCountingRecordsOrderSecondQualityCommandHandler'
import { SQLServerProductionOrderResponseRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerProductionOrderResponseRepository';
import { SQLServerProductionOrderQueryRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerProductionOrderQueryRepository';
import { SQLServerCreateProductionOrderCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerCreateProductionOrderCommandRepository'
import { SQLServerCreateCountingRecordsOrderOneCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerCreateCountingRecordsOrderOneCommandRepository';

const inMemoryProductionOrderResponseRepository = container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.InMemoryProductionOrderResponseRepository', InMemoryProductionOrderResponseRepository);

const inMemoryProductionOrderEANExternalService = container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.InMemoryProductionOrderEANExternalService', InMemoryProductionOrderEANExternalService)

const inMemoryProductionOrderExternalServiceRepository = container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.InMemoryExternalServiceRepository', InMemoryExternalServiceRepository);

const inMemoryCreateProductionOrderCommandRepository = container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.inMemoryCreateProductionOrderCommandRepository', InMemoryCreateProductionOrderCommandRepository);

const inMemoryProductionOrderQueryRepository = container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.InMemoryProductionOrderQueryRepository', InMemoryProductionOrderQueryRepository);

const inMemoryCreateCountingRecordsOrderOneCommandRepository = container.
    register('SewingProductionAreaManagement.infrastruture.ProductionOrder.InMemoryCreateCountingRecordsOrderOneCommandRepository', InMemoryCreateCountingRecordsOrderOneCommandRepository);

const inMemoryCreateCountingRecordsOrderTwoCommandRepository = container.
    register('SewingProductionAreaManagement.infrastruture.ProductionOrder.InMemoryCreateCountingRecordsOrderTwoCommandRepository', InMemoryCreateCountingRecordsOrderTwoCommandRepository)

const productionOrderFinder = container.register('SewingProductionAreaManagement.application.ProductionOrder.ProductionOrderFinder', ProductionOrderFInder).
    addArgument(inMemoryProductionOrderResponseRepository);

container.register('SewingProductionAreaManagement.application.ProductionOrder.ProductionOrderQueryHandler', ProductionOrderQueryHandler).
    addArgument(productionOrderFinder);

container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerProductionOrderResponseRepository', SQLServerProductionOrderResponseRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'));

container.
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerProductionOrderQueryRepository', SQLServerProductionOrderQueryRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'));


const productionOrderCreatorInMemory = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.inMemoryCreateProductionOrderCommandRepository', ProductionOrderCreator).
    addArgument(inMemoryCreateProductionOrderCommandRepository).
    addArgument(inMemoryProductionOrderExternalServiceRepository).
    addArgument(inMemoryProductionOrderEANExternalService);

const productionOrderValidatorInMemory = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.ProductionOrderValidator', ProductionOrderValidator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateProductionOrderCommandHandlerInMemory', CreateProductionOrderCommandHandler).
    addArgument(productionOrderCreatorInMemory).
    addArgument(productionOrderValidatorInMemory);

// ================================sql server <create order> ==================================================================

container.                  //Registro de repositorio <command> para crear la OP
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateProductionOrderCommandRepository', SQLServerCreateProductionOrderCommandRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'));

container.                              //Registro de creador 
    register('SewingProductionAreaManagement.application.ProductionOrder.SqlServerCreatorProductionOrder', ProductionOrderCreator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateProductionOrderCommandRepository')).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.Services.WebServiceProductionOrder')).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.Services.WebServiceEAN'));

container.                              //Registro de validador 
    register('SewingProductionAreaManagement.application.ProductionOrder.PersistenceProductionOrderValidator', ProductionOrderValidator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.SQLServerUserPermission'));

container.                           //Registro de command handler 
    register('SewingProductionAreaManagement.application.ProductionOrder.SqlServerCreateProductionOrderCommandHandler', CreateProductionOrderCommandHandler).
    addArgument(container.get('SewingProductionAreaManagement.application.ProductionOrder.SqlServerCreatorProductionOrder'));
//=========================================================================================================================================

// ================================================crear orden de conteo===================================================================
container.                  //Registro de repositorio <command> para crear orden de registro
    register('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateCountingRecordsOrderOneCommandRepository', SQLServerCreateCountingRecordsOrderOneCommandRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CountingRecordsOrderFirstQualityCreator', CountingRecordsOrderFirstQualityCreator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerProductionOrderQueryRepository')).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateCountingRecordsOrderOneCommandRepository'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderFirstQualityCommandHandler', CreateCountingRecordsOrderFirstQualityCommandHandler).
    addArgument(container.get('SewingProductionAreaManagement.application.ProductionOrder.CountingRecordsOrderFirstQualityCreator'));
//=========================================================================================================================================

//=========================================================================================================================================
container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderFirstQualityValidator', CreateCountingRecordsOrderFirstQualityValidator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository')).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionModule.InMemoryProductionModuleQueryRepository'));

const createCountingRecordsOrderSecondQualityValidator = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderSecondQualityValidator', CreateCountingRecordsOrderSecondQualityValidator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository')).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionModule.InMemoryProductionModuleQueryRepository'));

const countingRecordsOrderSecondQualityCreator = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CountingRecordsOrderSecondQualityCreator', CountingRecordsOrderSecondQualityCreator).
    addArgument(inMemoryProductionOrderQueryRepository).
    addArgument(inMemoryCreateCountingRecordsOrderTwoCommandRepository);

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderSecondQualityCommandHandler', CreateCountingRecordsOrderSecondQualityCommandHandler).
    addArgument(countingRecordsOrderSecondQualityCreator).
    addArgument(createCountingRecordsOrderSecondQualityValidator);
