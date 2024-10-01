import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application';

const repo = container.get('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderSecondQualityCommandHandler')

console.log(repo);