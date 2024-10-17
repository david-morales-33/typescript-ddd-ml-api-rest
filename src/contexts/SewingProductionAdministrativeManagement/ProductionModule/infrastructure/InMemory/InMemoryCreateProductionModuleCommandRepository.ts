import { ProductionModule } from "../../domain/entities/productionModule";
import { ProductionModuleCommandRepository } from "../../domain/repositories/ProductionModuleCommandRepository";

export class InMemoryCreateProductionModuleCommandRepository implements ProductionModuleCommandRepository {
    async save(ProductionModule: ProductionModule): Promise<void> {
        // const productionModuleQueryRepository = new InMemoryProductionModuleQueryRepository();
        // const productionModuleCreate = new InMemoryCreateProductionModuleCommandRepository();
        // const userPermission = new InMemoryUserPermissionRepository();

        // const creator = new ProductionModuleCreator(productionModuleCreate);
        // const validator = new CreateProductionModuleValidator(productionModuleQueryRepository, userPermission);

        // const commandHandler = new CreateProductionModuleCommandHandler(validator, creator)

        // const command = new CreateProductionModuleCommand({ productionModuleId: 5, machineAmount: 10, createBy: '1146441925' });

        // commandHandler.handle(command)
        console.log('Se ha creado el modulo: ')
        console.log(ProductionModule.toPrimitives());
    }
}