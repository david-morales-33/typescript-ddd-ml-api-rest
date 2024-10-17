import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderExternalServiceDTO } from "../data-transfer-objects/ProductionOrderExternalServiceDTO";

export interface ProductionOrderExternalService {
    find(productionOderId: ProductionOrderId): Promise<ProductionOrderExternalServiceDTO[]>
    getAll(): Promise<ProductionOrderExternalServiceDTO[]>
}