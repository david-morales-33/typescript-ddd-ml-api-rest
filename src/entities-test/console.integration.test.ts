import { v4 as uuid } from 'uuid';
import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application';
import { CreateProductionOrderCommandHandler } from '../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/CreateProductionOrderCommandHandler';
import { CreateProductionOrderCommand } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/data-transfer-objects/CreateProductionOrderCommand';
import { SQLServerCreateCountingRecordsOrderOneCommandRepository } from '../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerCreateCountingRecordsOrderOneCommandRepository';
import { InMemoryProductionOrderQueryRepository } from '../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderQueryRepository';
import { ProductionOrderId } from '../contexts/Shared/domain/value-object/ProductionOrderId';
import { CountingRecordsOrderFirstQualityNotChecked } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/entities/CountingRecordOrderFirstQualityNotChecked';
import { CountingRecordsOrderFirstQualityNotCheckedDTO } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/data-transfer-object/CountingRecordsOrderFirstQualityNotCheckedDTO';
import { JWTAuthenticationTokenService } from '../contexts/Authentication/AuthenticationToken/infrastructure/Services/JWT/JWTAuthenticationTokenService';
import { UserId } from '../contexts/Shared/domain/value-object/UserId';
import { UserProfileId } from '../contexts/Shared/domain/value-object/UserProfileId';
import { AuthenticationToken } from '../contexts/Authentication/AuthenticationToken/domain/entity/AuthenticationToken';
import { AuthenticationTokenDTO } from '../contexts/Authentication/AuthenticationToken/domain/data-transfer-objects/AuthenticationTokenDTO';
import { TokenId } from '../contexts/Authentication/AuthenticationToken/domain/value-objects/TokenId';

async function query() {
    try {
        const repo = new InMemoryProductionOrderQueryRepository();
        const op = await repo.find(new ProductionOrderId('MOP4415'));
        // console.log(op?.toPrimitives());
        const countingRecordsOrder1 = CountingRecordsOrderFirstQualityNotChecked.fromPrimitives(
            new CountingRecordsOrderFirstQualityNotCheckedDTO(
                '3b78e834-339b-4733-9742-1423e2092b82', 'MOP4415', '1603', 'XL', '10:21:45', '11:21:45',
                40, 5, 4, null, new Date(), '1146441925', []
            )
        )
        const countingRecordsOrder2 = CountingRecordsOrderFirstQualityNotChecked.fromPrimitives(
            new CountingRecordsOrderFirstQualityNotCheckedDTO(
                '3b78e834-339b-4733-9742-1423e2092b85', 'MOP4415', '1603', 'L', '10:21:45', '11:21:45',
                80, 5, 4, null, new Date(), '1146441925', []
            )
        )
        const countingRecordsOrder3 = CountingRecordsOrderFirstQualityNotChecked.fromPrimitives(
            new CountingRecordsOrderFirstQualityNotCheckedDTO(
                '3b78e834-339b-4733-9742-1423e2092b86', 'MOP4415', '1603', 'M', '10:21:45', '11:21:45',
                67, 5, 4, null, new Date(), '1146441925', []
            )
        )
        const countingRecordsOrder4 = CountingRecordsOrderFirstQualityNotChecked.fromPrimitives(
            new CountingRecordsOrderFirstQualityNotCheckedDTO(
                '3b78e834-339b-4733-9742-1423e2092b87', 'MOP4415', '1603', 'M', '10:21:45', '11:21:45',
                100, 5, 4, null, new Date(), '1146441925', []
            )
        )
        const countingRecordsOrder5 = CountingRecordsOrderFirstQualityNotChecked.fromPrimitives(
            new CountingRecordsOrderFirstQualityNotCheckedDTO(
                '3b78e834-339b-4733-9742-1423e2092b88', 'MOP4415', '1603', 'M', '10:21:45', '11:21:45',
                65, 5, 4, null, new Date(), '1146441925', []
            )
        )
        const countingRecordsOrder6 = CountingRecordsOrderFirstQualityNotChecked.fromPrimitives(
            new CountingRecordsOrderFirstQualityNotCheckedDTO(
                '3b78e834-339b-4733-9742-1423e2092b90', 'MOP4415', '1603', 'M', '10:21:45', '11:21:45',
                50, 5, 4, null, new Date(), '1146441925', []
            )
        )
        op?.addCountingRecordsOrder(countingRecordsOrder1)
        op?.addCountingRecordsOrder(countingRecordsOrder2)
        op?.addCountingRecordsOrder(countingRecordsOrder3)
        op?.addCountingRecordsOrder(countingRecordsOrder4)
        op?.addCountingRecordsOrder(countingRecordsOrder5)
        op?.addCountingRecordsOrder(countingRecordsOrder6)
        // console.log(op?.toPrimitives())
        // await container.get<SQLServerCreateCountingRecordsOrderOneCommandRepository>('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerCreateCountingRecordsOrderOneCommandRepository').save(op!)

    } catch (error) { console.log(error) }
}

query();
// console.log(validate('55575788-6c23-4d62-ba353-05226891149'))