import { ProductionOrderExternalServiceDTO } from "../../application/data-transfer-objects/ProductionOrderExternalServiceDTO";
import { ProductionOrderExternalService } from "../../application/services/ProductionOrderExternalService";
import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";

export class InMemoryExternalServiceRepository implements ProductionOrderExternalService {

    private productionOrderList: ProductionOrderExternalServiceDTO[];

    constructor() {
        this.productionOrderList = [
            new ProductionOrderExternalServiceDTO('MOP3214', 'MAR8245', '1010','NEGRO', '2XL', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3214', 'MAR8245', '1010','NEGRO', 'XL', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3214', 'MAR8245', '1010','NEGRO', 'L', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3214', 'MAR8245', '1010','NEGRO', 'S', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3218', 'MAR8248', '1010','NEGRO', '42', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3218', 'MAR8248', '1010','NEGRO', '40', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3218', 'MAR8248', '1010','NEGRO', '38', 200, 0, 0),
            new ProductionOrderExternalServiceDTO('MOP3218', 'MAR8248', '1010','NEGRO', '36', 200, 0, 0),
        ]
    }
    

    async find(productionOderId: ProductionOrderId): Promise<ProductionOrderExternalServiceDTO[]> {
        const productionOrderDetailList = this.productionOrderList.filter(entry => entry.op === productionOderId.value)
        return productionOrderDetailList;
    }

    async getAll(): Promise<ProductionOrderExternalServiceDTO[]> {
        return this.productionOrderList;
    }
}