import { container } from '../server/SewingProductionArea/dependency-inyection/application';

const repo = container.get('SewingProductionAreaManagement.application.ProductionModule.SearchAllProductionModuleQueryHandler')

console.log(repo);