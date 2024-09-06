import { ProductionOrderInProgress } from "../../domain/entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "../../domain/entities/ProductionOrderNotStarted";
import { ProductionOrderCommandRepository } from "../../domain/repositories/ProductionOrderCommandRepository";

export class InMemoryCreateCountingRecordsOrderOneCommandRepository implements ProductionOrderCommandRepository {
    async save(productionOrder: ProductionOrderNotStarted | ProductionOrderInProgress): Promise<void> {
        /* ======================================integration-test===========================================================
        const createCountingRecordsOrderCommandRepository = new InMemoryCreateCountingRecordsOrderOneCommandRepository();
        const countingRecordsOrderQueryRepository = new InMemoryProductionOrderQueryRepository();
        const countingRecordsOrderCreator = new CountingRecordsOrderFirstQualityCreator(
            countingRecordsOrderQueryRepository,
            createCountingRecordsOrderCommandRepository
        );
        const commandHandler = new CreateCountingRecordsOrderFirstQualityCommandHandler(countingRecordsOrderCreator);
        const countingRecordsOrderCommand = new CreateCountingRecordsOrderFirstQualityCommand([{//Registros//}])
        */
        console.log('Se creo el nuevo registro...');
        console.log('El estado del agregado es...');
        console.log(productionOrder.toPrimitives())
    }
}