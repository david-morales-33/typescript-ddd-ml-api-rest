
import { ColorId } from "../../../shared/domain/value-objects/ColorId";
import { GarmentSize } from "../../../shared/domain/value-objects/GarmentSize";
import { ProductionOrderEanExternalServiceDTO } from "../data-transfer-objects/ProductionOrderEanExternalServiceDTO";

export interface ProductionOrderEanExternalService {
    matching(params: { reference?: any, colorId?: ColorId, garmentSize?: GarmentSize }): Promise<ProductionOrderEanExternalServiceDTO[] | null>;
}