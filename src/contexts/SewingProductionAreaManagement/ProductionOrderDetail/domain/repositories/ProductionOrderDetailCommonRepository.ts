import { ProductionOrderId } from "../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { ColorId } from "../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderDetailInProgress } from "../entities/ProductionOrderDetailInProgress";
import { ProductionOrderDetailNotStarted } from "../entities/ProductionOrderDetailNotStarted";

export interface ProductionOrderDetailCommonRepository {
    find(params: { productionOrderId: ProductionOrderId, colorId: ColorId, garmentSize: GarmentSize }): Promise<(ProductionOrderDetailNotStarted | ProductionOrderDetailInProgress)[] | null | undefined>;
    searchAll(): Promise<(ProductionOrderDetailNotStarted | ProductionOrderDetailInProgress)[]>;
    matching(criteria: any): Promise<(ProductionOrderDetailNotStarted | ProductionOrderDetailInProgress)[]>;
}