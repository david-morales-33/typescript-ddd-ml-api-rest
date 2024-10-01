import { container } from '../application';
import { InMemeryProductionModuelResponseRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionModule/infrastructure/InMemory/InMemoryProductionModuelResponseRepository';
import { ProductionModuleFinder } from '../../../../contexts/SewingProductionAreaManagement/ProductionModule/application/use-cases/Find/ProductionModuleFinder';
import { ProductionModuleFinder as ProductionModuleSearcher } from '../../../../contexts/SewingProductionAreaManagement/ProductionModule/application/use-cases/SearchAll/ProductionModuleFinder';
import { SearchAllProductionModuleQueryHandler } from '../../../../contexts/SewingProductionAreaManagement/ProductionModule/application/use-cases/SearchAll/SearchAllProductionModuleQueryHandler'
import { InMemoryProductionModuleQueryRepository } from '../../../../contexts/SewingProductionAreaManagement/ProductionModule/infrastructure/InMemory/InMemoryProductionModuleQueryRepository'

const inMemeryProductionModuelResponseRepository = container.register('SewingProductionAreaManagement.infrastructure.ProductionModule.InMemeryProductionModuelResponseRepository', InMemeryProductionModuelResponseRepository);

const productionModuleFinder = container.register('SewingProductionAreaManagement.application.ProductionModule.ProductionModuleFinder', ProductionModuleFinder).addArgument(inMemeryProductionModuelResponseRepository);

container.register('SewingProductionAreaManagement.application.ProductionModule.ProductionModuleQueryHandler').addArgument(productionModuleFinder);

const productionModuleSearcher = container.register('SewingProductionAreaManagement.application.ProductionModule.ProductionModuleSearcher', ProductionModuleSearcher).addArgument(inMemeryProductionModuelResponseRepository);

container.register('SewingProductionAreaManagement.application.ProductionModule.SearchAllProductionModuleQueryHandler', SearchAllProductionModuleQueryHandler).addArgument(productionModuleSearcher);

container.register('SewingProductionAreaManagement.infrastructure.ProductionModule.InMemoryProductionModuleQueryRepository', InMemoryProductionModuleQueryRepository);


