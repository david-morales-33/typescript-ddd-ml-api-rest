import { ProductionModule } from "../../domain/entities/productionModule";
import { ProductionModuleCommandRepository } from "../../domain/repositories/ProductionModuleCommandRepository";

export class InMemoryUpdateProductionModuleCommandRepository implements ProductionModuleCommandRepository {
    async save(ProductionModule: ProductionModule): Promise<void> {
        // const productionModuleQueryRepository = new InMemoryProductionModuleQueryRepository();
        // const userPermission = new InMemoryUserPermissionRepository();
        // const productionModuleUpdate = new InMemoryUpdateProductionModuleCommandRepository()

        // const validator = new UpdateProductionModuleValidator(productionModuleQueryRepository, userPermission)

        // const updater = new ProductionModuleUpdater(productionModuleQueryRepository, productionModuleUpdate);

        // const commandHandler = new ProductionModuleCommandHandler(updater, validator);

        // const command = new UpdateProductionModuleCommand({
        //     productionModuleId:1,
        //     newCurrentSupervisor:'23456878',
        //     newMachineAmount:10,
        //     newOperationState:false,
        //     newState: false,
        //     updateBy:'1146441925'
        // });

        // commandHandler.handle(command);
        console.log('Se ha actualizado la informacion del odulo')
        console.log(ProductionModule.toPrimitives())
    }
}