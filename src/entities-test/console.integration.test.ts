import { container } from '../server/SewingProductionArea/dependency-inyection/application';

const repo = container.get('SewingProductionAreaManagement.application.ProductionOrder.CreateCountingRecordsOrderSecondQualityCommandHandler')

console.log(repo);