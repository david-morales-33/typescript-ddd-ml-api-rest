import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";
import { ProductionOrderExternalServiceDTO } from "../data-transfer-objects/ProductionOrderExternalServiceDTO";

export interface ProductionOrderExternalService {
    find(productionOderId: ProductionOrderId): Promise<ProductionOrderExternalServiceDTO[] | null>
    getAll(): Promise<ProductionOrderExternalServiceDTO[]>
}