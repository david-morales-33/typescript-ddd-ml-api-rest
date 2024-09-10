import { ProductionModuleCommandHandler } from "../contexts/AdministrativeManagement/ProductionModule/application/use-cases/Update/ProductionModuleCommandHandler";
import { ProductionModuleUpdater } from "../contexts/AdministrativeManagement/ProductionModule/application/use-cases/Update/ProductionModuleUpdater";
import { UpdateProductionModuleValidator } from "../contexts/AdministrativeManagement/ProductionModule/application/use-cases/Update/UpdateProductionModuleValidator";
import { UpdateProductionModuleCommand } from "../contexts/AdministrativeManagement/ProductionModule/domain/data-transfer-objects/UpdateProductionModuleCommand";
import { InMemoryCreateProductionModuleCommandRepository } from "../contexts/AdministrativeManagement/ProductionModule/infrastructure/InMemory/InMemoryCreateProductionModuleCommandRepository";
import { InMemoryProductionModuleQueryRepository } from "../contexts/AdministrativeManagement/ProductionModule/infrastructure/InMemory/InMemoryProductionModuleQueryRepository";
import { InMemoryProductionModuleResponseRepository } from "../contexts/AdministrativeManagement/ProductionModule/infrastructure/InMemory/InMemoryProductionModuleResponseRepository";
import { InMemoryUpdateProductionModuleCommandRepository } from "../contexts/AdministrativeManagement/ProductionModule/infrastructure/InMemory/InMemoryUpdateProductionModuleCommandRepository";
import { InMemoryUserPermissionRepository } from "../contexts/AdministrativeManagement/UserPermission/infrastructure/InMemory/InMemoryUserPermissionRepository";

const productionModuleResposeRepository = new InMemoryProductionModuleResponseRepository();
const productionModuleCreate = new InMemoryCreateProductionModuleCommandRepository();

const productionModuleQueryRepository = new InMemoryProductionModuleQueryRepository();
const userPermission = new InMemoryUserPermissionRepository();
const productionModuleUpdate = new InMemoryUpdateProductionModuleCommandRepository()

const validator = new UpdateProductionModuleValidator(productionModuleQueryRepository, userPermission)

const updater = new ProductionModuleUpdater(productionModuleQueryRepository, productionModuleUpdate);

const commandHandler = new ProductionModuleCommandHandler(updater, validator);

const command = new UpdateProductionModuleCommand({
    productionModuleId:1,
    newCurrentSupervisor:'23456878',
    newMachineAmount:10,
    newOperationState:false,
    newState: false,
    updateBy:'1146441925'
});

commandHandler.handle(command);
