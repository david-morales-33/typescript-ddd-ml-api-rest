import { ProductionOrder } from "../../domain/entities/ProductionOrder";
import { ProductionOrderCommandRepository } from "../../domain/repositories/ProductionOrderCommandRepository";

export class InMemoryUpdateProductionOrderRepository implements ProductionOrderCommandRepository{
    async save(productionOrder: ProductionOrder): Promise<void> {
        // const productionOrderQueryRepository = new InMemoryProductionOrderQueryRepository();
        // const productionOrderCommandRepository = new InMemoryUpdateProductionOrderRepository();

        // const userPermision = new InMemoryUserPermissionRepository();

        // const vaidator = new UpdateProductionOrderValidator(userPermision);
        // const updater = new ProductionOrderUpdater(productionOrderQueryRepository, productionOrderCommandRepository);

        // const commandHandler = new ProductionOrderCommandHandler(updater, vaidator);

        // const command = new UpdateProductionOrderCommand({
        // productionOrderId: 'MOP3541',
        // updateBy: '1146441925'
        // });

        // commandHandler.handle(command)
        console.log('Se ha actualizado la información del módulo...')
        console.log(productionOrder.toPrimitives())
    }
}