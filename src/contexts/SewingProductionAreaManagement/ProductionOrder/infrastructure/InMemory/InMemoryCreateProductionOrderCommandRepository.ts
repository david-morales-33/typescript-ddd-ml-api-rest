import { ProductionOrderNotStarted } from "../../domain/entities/ProductionOrderNotStarted";
import { ProductionOrderRoot } from "../../domain/interfaces/ProductionOrderRoot";
import { ProductionOrderCommandRepository } from "../../domain/repositories/ProductionOrderCommandRepository";

export class InMemoryCreateProductionOrderCommandRepository implements ProductionOrderCommandRepository {

    private productionOrderList: ProductionOrderNotStarted[] = []

    async save(productionOrderNotStarted: ProductionOrderNotStarted): Promise<void> {
        /* =============================integration-test=========================================
        const productionOrderCreator = new ProductionOrderCreator(
            new InMemoryCreateProductionOrderCommandRepository(),
            new InMemoryExternalServiceRepository(),
            new InMemoryProductionOrderEANExternalService()
        )
        const userPermissionsRepository = new InMemoryUserPermissionRepository();
        const productionOrderValidator = new ProductionOrderValidator(userPermissionsRepository);
        const productionOrderCommanHandler = new CreateProductionOrderCommandHandler(productionOrderCreator,productionOrderValidator);
        const createProductionOrderCommand = new CreateProductionOrderCommand({
            userId:'1146441925',
            productionOrderId: 'MOP321'
        });
        productionOrderCommanHandler.handle(createProductionOrderCommand)
        */
        this.productionOrderList.push(productionOrderNotStarted);
        console.log('Se creo la orden de produccion...');
        console.log(this.productionOrderList)
    }
}