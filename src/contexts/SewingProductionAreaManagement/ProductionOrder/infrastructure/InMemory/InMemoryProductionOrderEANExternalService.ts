import { ColorId } from "../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderEanExternalServiceDTO } from "../../application/data-transfer-objects/ProductionOrderEanExternalServiceDTO";
import { ProductionOrderEanExternalService } from "../../application/services/ProductionOrderEanExternalService";

export class InMemoryProductionOrderEANExternalService implements ProductionOrderEanExternalService {
    private barcodeList: ProductionOrderEanExternalServiceDTO[]

    constructor() {
        this.barcodeList = [
            new ProductionOrderEanExternalServiceDTO('7744588458566', 'MAR8248', '1010', '42'),
            new ProductionOrderEanExternalServiceDTO('7744588458565', 'MAR8248', '1010', '40'),
            new ProductionOrderEanExternalServiceDTO('7744588458564', 'MAR8248', '1010', '38'),
            new ProductionOrderEanExternalServiceDTO('7744588458563', 'MAR8248', '1010', '36'),
            new ProductionOrderEanExternalServiceDTO('7744588458562', 'MAR8245', '1010', '2XL'),
            new ProductionOrderEanExternalServiceDTO('7744588458561', 'MAR8245', '1010', 'XL'),
            new ProductionOrderEanExternalServiceDTO('7744588458560', 'MAR8245', '1010', 'L'),
            new ProductionOrderEanExternalServiceDTO('7744588458569', 'MAR8245', '1010', 'S'),
        ]
    }

    async matching(params: { reference?: any; colorId?: ColorId; garmentSize?: GarmentSize; }): Promise<ProductionOrderEanExternalServiceDTO[] | null> {
        const { reference } = params;

        const barcodeList = this.barcodeList.filter(entry => entry.reference === reference.value )

        if (barcodeList.length === 0)
            return null;

        return barcodeList;

    }
}