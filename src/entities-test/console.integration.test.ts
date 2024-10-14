import { v4 as uuid } from 'uuid';
import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application';
import { SQLServerCreateProductionOrderCommandRepository } from '../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerCreateProductionOrderCommandRepository';
import { InMemoryProductionOrderQueryRepository } from '../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderQueryRepository';
import { ProductionOrderId } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderId';
import { ProductionOrderNotStarted } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/entities/ProductionOrderNotStarted';
import { SQLServerCountingOrderRecordsRepository } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/persistence/SQLServer/SQLServerCountingOrderRecordsRepository';
import { CountingRecordsOrderId } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId';

async function query() {
    try {
        const repository = new InMemoryProductionOrderQueryRepository();
        const productionOrder = (await repository.find(new ProductionOrderId('MOP4415'))) as ProductionOrderNotStarted;
        // console.log(productionOrder.toPrimitives())

        await container.get<SQLServerCreateProductionOrderCommandRepository>('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateProductionOrderCommandRepository')
        .save(productionOrder);
        // const res= await container.get<SQLServerCountingOrderRecordsRepository>('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.SqlServerCountingOrderRecordsRepository')
        // .find(new CountingRecordsOrderId('18f20e0c-6914-4e41-9a12-5907e9871d75'));

        // console.log(res)

    } catch (error) {
        console.log(error)
    }
}

query();

// console.log(validate('55575788-6c23-4d62-ba353-05226891149'))