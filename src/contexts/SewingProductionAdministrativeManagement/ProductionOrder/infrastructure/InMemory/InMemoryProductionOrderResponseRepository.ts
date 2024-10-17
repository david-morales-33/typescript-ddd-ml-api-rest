import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderViewDTO } from "../../domain/data-transfer-objects/ProductionOrderViewDTO";
import { ProductionOrderResponseRepository } from "../../domain/repositories/ProductionOrderResponseRepository";

export class InMemoryProductionOrderResponseRepository implements ProductionOrderResponseRepository {

    private productionOrderList: ProductionOrderViewDTO[]

    constructor() {
        this.productionOrderList = [
            new ProductionOrderViewDTO('MOP3254', 'CHE7546', 8, 200, 200, 0, true, '1146441925', 'David Morales', 'desarrollador', null, null, null, null),
            new ProductionOrderViewDTO('MOP3258', 'CHE7542', 8, 300, 0, 300, true, '1146441925', 'David Morales', 'desarrollador', null, null, null, null),
        ]
    }

    async find(productionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null> {
        // const productionOrderResponseRepository = new InMemoryProductionOrderResponseRepository();
        // const finder = new ProductionOrderFinder(productionOrderResponseRepository);
        
        // const queryHandler = new FindProductionOrderQueryHandler(finder);
        
        // const query = new FindProductionOrderQuery('MOP3254');
        
        // queryHandler.handle(query).then(res => console.log(res))

        const productionOrder = this.productionOrderList.find(entry => entry.opId === productionOrderId.value);
        if (productionOrder === undefined)
            return null;

        return productionOrder;
    }
}