import { ProductionOrderEanExternalServiceDTO } from "../../../application/data-transfer-objects/ProductionOrderEanExternalServiceDTO";

export interface ProductionOrderEanServiceObject { [key: string]: string[] }

export class ProductionOrderEanExternalServiceMapperDTO {
    static convertFromServiceData(entity: ProductionOrderEanServiceObject): ProductionOrderEanExternalServiceDTO {
        return new ProductionOrderEanExternalServiceDTO(
            entity.Barras[0].trim(),
            entity.Referencia[0].trim(),
            entity.EXT1[0].trim(),
            entity.DESCRIPCION_EXT1[0].trim(),
            entity.EXT2[0].trim()
        )
    }
}