import { ProductionOrderExternalServiceDTO } from "../../application/data-transfer-objects/ProductionOrderExternalServiceDTO";
import { ProductionOrderExternalService } from "../../application/services/ProductionOrderExternalService";
import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";

export class InMemoryExternalServiceRepository implements ProductionOrderExternalService {

    private productionOrderList: ProductionOrderExternalServiceDTO[];

    constructor() {
        this.productionOrderList = [
            new ProductionOrderExternalServiceDTO('MOP3214', 'MAR8245', '1010', '2XL', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3214', 'MAR8245', '1010', 'XL', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3214', 'MAR8245', '1010', 'L', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3214', 'MAR8245', '1010', 'S', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3218', 'MAR8248', '1010', '42', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3218', 'MAR8248', '1010', '40', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3218', 'MAR8248', '1010', '38', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3218', 'MAR8248', '1010', '36', 200, 0, 0),
        ]
    }
    

    async find(productionOderId: ProductionOrderId): Promise<ProductionOrderExternalServiceDTO[] | null> {
        const productionOrderDetailList = this.productionOrderList.filter(entry => entry.op === productionOderId.value)
        if (productionOrderDetailList.length === 0)
            return null;
        return productionOrderDetailList;
    }

    async getAll(): Promise<ProductionOrderExternalServiceDTO[]> {
        return this.productionOrderList;
    }
}