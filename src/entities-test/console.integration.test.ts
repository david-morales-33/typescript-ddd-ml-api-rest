import { FindProductionOrderQuery } from "../contexts/AdministrativeManagement/ProductionOrder/application/use-cases/Find/FindProductionOrderQuery";
import { FindProductionOrderQueryHandler } from "../contexts/AdministrativeManagement/ProductionOrder/application/use-cases/Find/FindProductionOrderQueryHandler";
import { ProductionOrderFinder } from "../contexts/AdministrativeManagement/ProductionOrder/application/use-cases/Find/ProductionOrderFinder";
import { InMemoryProductionOrderQueryRepository } from "../contexts/AdministrativeManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderQueryRepository";
import { InMemoryProductionOrderResponseRepository } from "../contexts/AdministrativeManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderResponseRepository";
import { InMemoryUpdateProductionOrderRepository } from "../contexts/AdministrativeManagement/ProductionOrder/infrastructure/InMemory/InMemoryUpdateProductionOrderRepository";
import { InMemoryUserPermissionRepository } from "../contexts/AdministrativeManagement/UserPermission/infrastructure/InMemory/InMemoryUserPermissionRepository";

const productionOrderQueryRepository = new InMemoryProductionOrderQueryRepository();
const productionOrderCommandRepository = new InMemoryUpdateProductionOrderRepository();

const userPermision = new InMemoryUserPermissionRepository();

const productionOrderResponseRepository = new InMemoryProductionOrderResponseRepository();
const finder = new ProductionOrderFinder(productionOrderResponseRepository);

const queryHandler = new FindProductionOrderQueryHandler(finder);

const query = new FindProductionOrderQuery('MOP3254');

queryHandler.handle(query).then(res => console.log(res))