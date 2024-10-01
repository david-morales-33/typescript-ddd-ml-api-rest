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

const productionOrderCreator = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.inMemoryCreateProductionOrderCommandRepository', ProductionOrderCreator).
    addArgument(inMemoryCreateProductionOrderCommandRepository).
    addArgument(inMemoryProductionOrderExternalServiceRepository).
    addArgument(inMemoryProductionOrderEANExternalService);

const productionOrderValidator = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.ProductionOrderValidator', ProductionOrderValidator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository'));

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateProductionOrderCommandHandler', CreateProductionOrderCommandHandler).
    addArgument(productionOrderCreator).
    addArgument(productionOrderValidator);

const createCountingRecordsOrderFirstQualityValidator = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderFirstQualityValidator', CreateCountingRecordsOrderFirstQualityValidator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository')).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.ProductionModule.InMemoryProductionModuleQueryRepository'));

const countingRecordsOrderFirstQualityCreator = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CountingRecordsOrderFirstQualityCreator', CountingRecordsOrderFirstQualityCreator).
    addArgument(inMemoryProductionOrderQueryRepository).
    addArgument(inMemoryCreateCountingRecordsOrderOneCommandRepository);

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderFirstQualityCommandHandler', CreateCountingRecordsOrderFirstQualityCommandHandler).
    addArgument(countingRecordsOrderFirstQualityCreator).
    addArgument(createCountingRecordsOrderFirstQualityValidator);

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
