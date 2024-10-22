import { v4 as uuid } from 'uuid';
import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application';
import { CreateCountingRecordsOrderFirstQualityCommand } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/data-transfer-objects/CreateCountingRecordsOrderFirstQualityCommand';
import { CreateCountingRecordsOrderFirstQualityCommandHandler } from '../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CreateCountingRecordsOrderFirstQualityCommandHandler';

async function query() {
    try {

        const handler = container.get<CreateCountingRecordsOrderFirstQualityCommandHandler>('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderFirstQualityCommandHandler');
        const command = new CreateCountingRecordsOrderFirstQualityCommand([
            {
                id: uuid(),
                productionOrderId: 'MOP4420',
                colorId: '1200',
                garmentSize: 'L',
                initialTime: '08:05:12',
                finalTime: '09:01:17',
                userId: '1146441925',
                productionModuleId: 3,
                amount: 50,
                scheduelId: 4,
                eventOnProductionModule: null,
                eventOnCountingRecordsOrder: []
            },
            {
                id: uuid(),
                productionOrderId: 'MOP4420',
                colorId: '1200',
                garmentSize: 'XL',
                initialTime: '07:05:12',
                finalTime: '08:01:17',
                userId: '1146441925',
                productionModuleId: 3,
                amount: 40,
                scheduelId: 3,
                eventOnProductionModule: null,
                eventOnCountingRecordsOrder: []
            },
        ])
        const resp = await handler.handle(command);
        console.log(resp)
    } catch (error) { console.log(error) }
}
query();