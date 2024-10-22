import { container } from '../application';
import { InMemoryCountingRecordsOrderRepository } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/InMemory/InMemoryCountingRecordsOrderRepository';
import { CountingRecordsOrderFinder } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/Find/CountingRecordsOrderFinder';
import { CountingRecordsOrderQueryHandler } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/Find/CountingRecordsOrderQueryHandler';
import { SQLServerCountingOrderRecordsRepository } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/persistence/SQLServer/SQLServerCountingOrderRecordsRepository'
import { CountingRecordsOrderByCriteriaSearcher } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/SearchByCriteria/CountingRecordsOrderByCriteriaSearcher';
import { SearchCountingRecordsOrderByCriteriaQueryHandler } from '../../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/SearchByCriteria/SearchCountingRecordsOrderByCriteriaQueryHandler';

const inMemoryCountingRecordsOrderRepository = container.register('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.InMemoryCountingRecordsOrderRepository', InMemoryCountingRecordsOrderRepository);

container.register('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.SqlServerCountingOrderRecordsRepository', SQLServerCountingOrderRecordsRepository).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'))
//==================================================== Busqueda por Id =====================================================

container.register('SewingProductionAreaManagement.application.CountingRecordsOrder.CountingRecordsOrderFinder', CountingRecordsOrderFinder).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.SqlServerCountingOrderRecordsRepository'));

container.register('SewingProductionAreaManagement.application.CountingRecordsOrder.CountingRecordsOrderQueryHandler', CountingRecordsOrderQueryHandler).
    addArgument(container.get('SewingProductionAreaManagement.application.CountingRecordsOrder.CountingRecordsOrderFinder'));

//==================================================Búsqueda por criterios=======================

container.register('SewingProductionAreaManagement.application.CountingRecordsOrder.CountingRecordsOrderByCriteriaSearcher', CountingRecordsOrderByCriteriaSearcher).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.SqlServerCountingOrderRecordsRepository'))

container.register('SewingProductionAreaManagement.application.CountingRecordsOrder.SearchCountingRecordsOrderByCriteriaQueryHandler', SearchCountingRecordsOrderByCriteriaQueryHandler).
    addArgument(container.get('SewingProductionAreaManagement.application.CountingRecordsOrder.CountingRecordsOrderByCriteriaSearcher'));