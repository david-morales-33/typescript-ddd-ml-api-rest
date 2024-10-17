import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderEanExternalServiceDTO } from "../../application/data-transfer-objects/ProductionOrderEanExternalServiceDTO";
import { ProductionOrderEanExternalService } from "../../application/services/ProductionOrderEanExternalService";

export class InMemoryProductionOrderEANExternalService implements ProductionOrderEanExternalService {
    private barcodeList: ProductionOrderEanExternalServiceDTO[]

    constructor() {
        this.barcodeList = [
            new ProductionOrderEanExternalServiceDTO('7744588458566', 'MAR8248', '1010','NEGRO', '42'),
            new ProductionOrderEanExternalServiceDTO('7744588458565', 'MAR8248', '1010','NEGRO', '40'),
            new ProductionOrderEanExternalServiceDTO('7744588458564', 'MAR8248', '1010','NEGRO', '38'),
            new ProductionOrderEanExternalServiceDTO('7744588458563', 'MAR8248', '1010','NEGRO', '36'),
            new ProductionOrderEanExternalServiceDTO('7744588458562', 'MAR8245', '1010','NEGRO', '2XL'),
            new ProductionOrderEanExternalServiceDTO('7744588458561', 'MAR8245', '1010','NEGRO', 'XL'),
            new ProductionOrderEanExternalServiceDTO('7744588458560', 'MAR8245', '1010','NEGRO', 'L'),
            new ProductionOrderEanExternalServiceDTO('7744588458569', 'MAR8245', '1010','NEGRO', 'S'),
        ]
    }

    async match(params: { reference?: any; colorId?: ColorId; garmentSize?: GarmentSize; }): Promise<ProductionOrderEanExternalServiceDTO[]> {
        const { reference } = params;
        const barcodeList = this.barcodeList.filter(entry => entry.reference === reference.value )
        return barcodeList;
    }
}