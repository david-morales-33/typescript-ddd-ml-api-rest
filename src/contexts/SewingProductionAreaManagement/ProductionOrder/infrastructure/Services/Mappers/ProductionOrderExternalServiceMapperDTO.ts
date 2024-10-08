import { ProductionOrderExternalServiceDTO } from "../../../application/data-transfer-objects/ProductionOrderExternalServiceDTO";

export interface ProductionOrderServiceObject { [key: string]: string[] }

export class ProductionOrderExternalServiceMapperDTO {
    static convertFromServiceDate(entity: ProductionOrderServiceObject): ProductionOrderExternalServiceDTO {
        return new ProductionOrderExternalServiceDTO(
            entity.OP[0].trim(),
            entity.Referencia[0].trim(),
            entity.Id_Color[0].trim(),
            entity.Talla[0].trim(),
            parseInt(entity.Planeada[0].trim()),
            parseInt(entity.Completada[0].trim()),
            parseInt(entity.Pendiente[0].trim())
        )
    }
}