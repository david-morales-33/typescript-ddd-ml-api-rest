import { container } from '../server/SewingProductionArea/dependency-inyection/application';

const repo = container.get('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.InMemoryCountingRecordsOrderRepository')

console.log(repo);