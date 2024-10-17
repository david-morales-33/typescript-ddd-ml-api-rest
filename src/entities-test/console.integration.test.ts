import { v4 as uuid } from 'uuid';
import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application';
import { SQLServerCreateProductionOrderCommandRepository } from '../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerCreateProductionOrderCommandRepository';
import { InMemoryProductionOrderQueryRepository } from '../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderQueryRepository';
import { ProductionOrderId } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderId';
import { ProductionOrderNotStarted } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/entities/ProductionOrderNotStarted';
import { SQLServerCountingOrderRecordsRepository } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/persistence/SQLServer/SQLServerCountingOrderRecordsRepository';
import { CountingRecordsOrderId } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId';
import { SQLServerUserPermission } from '../contexts/SewingProductionAreaManagement/UserPermission/infrastructure/Persistence/SQLServer/SQLServerUserPermission';
import { UserId } from '../contexts/SewingProductionAreaManagement/User/domain/value-objects/UserId';
import { CreateProductionOrderCommandHandler } from '../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/CreateProductionOrderCommandHandler';
import { CreateProductionOrderCommand } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/data-transfer-objects/CreateProductionOrderCommand';

async function query() {
    try {
        await container.get<CreateProductionOrderCommandHandler>('SewingProductionAreaManagement.application.ProductionOrder.SqlServerCreateProductionOrderCommandHandler')
            .handle(new CreateProductionOrderCommand({
                userId: '1146441925',
                productionOrderId: 'MOP4418',
                garmentType: 'MOB',
                productionModuleAssigned: 15
            }))

    } catch (error) { console.log(error) }
}
query();

// console.log(validate('55575788-6c23-4d62-ba353-05226891149'))