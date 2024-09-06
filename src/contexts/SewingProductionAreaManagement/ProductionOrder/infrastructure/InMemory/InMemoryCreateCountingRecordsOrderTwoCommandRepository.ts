import { ProductionOrderInProgress } from "../../domain/entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "../../domain/entities/ProductionOrderNotStarted";
import { ProductionOrderCommandRepository } from "../../domain/repositories/ProductionOrderCommandRepository";

export class InMemoryCreateCountingRecordsOrderTwoCommandRepository implements ProductionOrderCommandRepository{
    async save(productionOrder: ProductionOrderNotStarted | ProductionOrderInProgress): Promise<void> {
        console.log('Se creo el nuevo registro...');
        console.log('El estado del agregado es...');
        console.log(productionOrder.toPrimitives())
    }
}