import { container } from '../application';
import { InMemoryCountingRecordsOrderRepository } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/InMemory/InMemoryCountingRecordsOrderRepository';
import { CountingRecordsOrderFinder } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/Find/CountingRecordsOrderFinder';
import { CountingRecordsOrderQueryHandler } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/Find/CountingRecordsOrderQueryHandler';
import { SQLServerCountingOrderRecordsRepository } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/persistence/SQLServer/SQLServerCountingOrderRecordsRepository'

const inMemoryCountingRecordsOrderRepository = container.register('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.InMemoryCountingRecordsOrderRepository', InMemoryCountingRecordsOrderRepository);

const sqlServerCountingOrderRecordsRepository = container.register('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.SqlServerCountingOrderRecordsRepository', SQLServerCountingOrderRecordsRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'))

const countingRecordsOrderFinder = container.register('SewingProductionAreaManagement.application.CountingRecordsOrder.CountingRecordsOrderFinder', CountingRecordsOrderFinder).
    addArgument(inMemoryCountingRecordsOrderRepository);

container.register('SewingProductionAreaManagement.application.CountingRecordsOrder.CountingRecordsOrderQueryHandler', CountingRecordsOrderQueryHandler).
    addArgument(countingRecordsOrderFinder);
