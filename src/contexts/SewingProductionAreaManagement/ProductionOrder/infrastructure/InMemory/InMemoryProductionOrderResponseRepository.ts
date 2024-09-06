import { ProductionOrderViewDTO } from "../../domain/data-transfer-objects/ProductionOrderViewDTO";
import { ProductionOrderResponseRepository } from "../../domain/repositories/ProductionOrderResponseRepository";
import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";

export class InMemoryProductionOrderResponseRepository implements ProductionOrderResponseRepository {

    private productionOrderList: ProductionOrderViewDTO[];

    constructor() {
        this.productionOrderList = [
            new ProductionOrderViewDTO('MOP3214', 'MAR8582', 5, 800, 255, 545, true, '1146441925', 'David morales', 'Operario de manual', new Date(), null),

            new ProductionOrderViewDTO('MOP3215', 'MAR8582', 0, 700, 0, 700, true, '1146441925', 'David morales', 'Operario de manual', null, null),

            new ProductionOrderViewDTO('MOP3216', 'MAR8522', 5, 900, 255, 645, true, '1146441925', 'David morales', 'Operario de manual', new Date(), null),

            new ProductionOrderViewDTO('MOP3217', 'MAR8514', 5, 800, 255, 545, true, '1146441925', 'David morales', 'Operario de manual', new Date(), new Date()),

            new ProductionOrderViewDTO('MOP3218', 'MAR8587', 0, 500, 0, 500, true, '1146441925', 'David morales', 'Operario de manual', null, null),

            new ProductionOrderViewDTO('MOP3219', 'MAR8532', 5, 1200, 200, 1000, true, '1146441925', 'David morales', 'Operario de manual', new Date(), null),
        ]
    }

    async find(productionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null> {
        /*===================================== integration-test =========================================
            const inMemoryProductionOrderResponseRepository = new InMemoryProductionOrderResponseRepository();
            const productionOrderFinder = new ProductionOrderFInder(inMemoryProductionOrderResponseRepository);
            const productionOrderQueryHandler = new ProductionOrderQueryHandler(productionOrderFinder);
            const productionOrderQuery = new FindProductionOrderQuery('MOP3214')
            productionOrderQueryHandler.handle(productionOrderQuery).then(entry => console.log(entry));
        */
        const productionOrder = this.productionOrderList.find(entry => entry.opId === productionOrderId.value);

        if (productionOrder === undefined) {
            return null;
        }

        return productionOrder;
    }

    async searchAll(): Promise<ProductionOrderViewDTO[]> {
        return this.productionOrderList;
    }

    async matching(): Promise<ProductionOrderViewDTO[]> {
        return this.productionOrderList;
    }
}