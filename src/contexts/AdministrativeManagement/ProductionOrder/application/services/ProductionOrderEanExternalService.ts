
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderEanExternalServiceDTO } from "../data-transfer-objects/ProductionOrderEanExternalServiceDTO";

export interface ProductionOrderEanExternalService {
    matching(params: { reference?: any, colorId?: ColorId, garmentSize?: GarmentSize }): Promise<ProductionOrderEanExternalServiceDTO[] | null>;
}