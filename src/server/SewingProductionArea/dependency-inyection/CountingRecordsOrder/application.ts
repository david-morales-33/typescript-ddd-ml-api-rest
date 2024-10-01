import { container } from '../application';
import { InMemoryCountingRecordsOrderRepository } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/InMemory/InMemoryCountingRecordsOrderRepository';
import { CountingRecordsOrderFinder } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/Find/CountingRecordsOrderFinder';
import { CountingRecordsOrderQueryHandler } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/Find/CountingRecordsOrderQueryHandler';

const inMemoryCountingRecordsOrderRepository = container.register('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.InMemoryCountingRecordsOrderRepository', InMemoryCountingRecordsOrderRepository);

const countingRecordsOrderFinder = container.register('SewingProductionAreaManagement.application.CountingRecordsOrder.CountingRecordsOrderFinder', CountingRecordsOrderFinder).addArgument(inMemoryCountingRecordsOrderRepository);

container.register('SewingProductionAreaManagement.application.CountingRecordsOrder.CountingRecordsOrderQueryHandler', CountingRecordsOrderQueryHandler).addArgument(countingRecordsOrderFinder);
