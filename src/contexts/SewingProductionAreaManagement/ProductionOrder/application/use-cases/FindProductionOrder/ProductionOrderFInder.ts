import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderNotFoundOnDataBase } from "../../exception/ProductionOrderNotFoundOnDataBase";
import { ProductionOrderResponseRepository} from '../../../domain/repositories/ProductionOrderResponseRepository'

export class ProductionOrderFInder {
    constructor(
        private productionOrderResponseRepository: ProductionOrderResponseRepository
    ) { }

    async execute(productionOrderId: ProductionOrderId) {
        
        const productionOrder = await this.productionOrderResponseRepository.find(productionOrderId);

        if (productionOrder === null)
            throw new ProductionOrderNotFoundOnDataBase(productionOrderId);

        return productionOrder;
    }
}