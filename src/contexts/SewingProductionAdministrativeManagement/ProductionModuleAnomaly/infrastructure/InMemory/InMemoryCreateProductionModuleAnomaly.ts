import { ProductionModuleAnomaly } from "../../domain/entities/ProductionModuleAnomaly";
import { ProductionModuleAnomalyCommandRepository } from "../../domain/repositories/ProductionModuleAnomalyCommandRepository";

export class InMemoryCreateProductionModuleAnomaly implements ProductionModuleAnomalyCommandRepository {
    async save(productionModuleAnomaly: ProductionModuleAnomaly): Promise<void> {
        // const queryRepository = new InMemoryProductionModuleAnomalyQueryRepository();
        // const create = new InMemoryCreateProductionModuleAnomaly();
        // const userPermission = new InMemoryUserPermissionRepository();
        // const validator = new CreateProductionModuleAnomalyValidator(queryRepository, userPermission);
        // const creator = new CreatorProductionModuleAnomaly(create)
        // const commandHnadler = new CreateProductionModuleAnomalyCommandHandler(creator,validator);
        // const command = new CreateProductionModuleAnomalyCommand({
        //     createBy:'1146441925',
        //     productionModuleAnomalyId:'10',
        //     productionModuleAnomalyName:'DIA CÍVICO'
        // });
        // commandHnadler.handle(command)
        console.log('Se ha creado el evento...')
        console.log(productionModuleAnomaly.toPrimitives())
    }
}