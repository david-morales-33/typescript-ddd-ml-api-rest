import { container } from '../application';
import { InMemoryProductionOrderEANExternalService } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderEANExternalService';
import { InMemoryExternalServiceRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderExternalService'
import { InMemoryCreateProductionOrderCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryCreateProductionOrderCommandRepository'
import { InMemoryCreateCountingRecordsOrderOneCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryCreateCountingRecordsOrderOneCommandRepository';
import { InMemoryProductionOrderQueryRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderQueryRepository';
import { InMemoryCreateCountingRecordsOrderTwoCommandRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryCreateCountingRecordsOrderTwoCommandRepository';
import { InMemoryProductionOrderResponseRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderResponseRepository';
import { ProductionOrderFInder } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/FindProductionOrder/ProductionOrderFInder';
import { ProductionOrderQueryHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/FindProductionOrder/ProductionOrderQueryHandler';
import { ProductionOrderValidator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/ProductionOrderValidator';
import { ProductionOrderCreator } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/ProductionOrderCreator';
import { CreateProductionOrderCommandHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/CreateProductionOrderCommandHandler';

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

const productionOrderFinder = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.ProductionOrderFinder', ProductionOrderFInder).
    addArgument(inMemoryProductionOrderResponseRepository);

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.ProductionOrderQueryHandler', ProductionOrderQueryHandler).
    addArgument(productionOrderFinder);

const productionOrderValidatorInMemory = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.ProductionOrderValidator', ProductionOrderValidator).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository'));


const productionOrderCreatorInMemory = container.
    register('SewingProductionAreaManagement.application.ProductionOrder.inMemoryCreateProductionOrderCommandRepository', ProductionOrderCreator).
    addArgument(inMemoryCreateProductionOrderCommandRepository).
    addArgument(inMemoryProductionOrderExternalServiceRepository).
    addArgument(inMemoryProductionOrderEANExternalService);

container.
    register('SewingProductionAreaManagement.application.ProductionOrder.CreateProductionOrderCommandHandlerInMemory', CreateProductionOrderCommandHandler).
    addArgument(productionOrderCreatorInMemory).
    addArgument(productionOrderValidatorInMemory);