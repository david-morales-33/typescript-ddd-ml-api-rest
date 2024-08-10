import { ColorId } from "../../../Color/domain/value-objects/ColorId";
import { GarmentSize } from "../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderId } from "../../../ProductionOrder/domain/value-objects/ProductionOrderId";

export class ProductionOrderDetailId {

    constructor(
        readonly colorId: ColorId,
        readonly garmentSize: GarmentSize,
        readonly productionOrderId: ProductionOrderId
    ) { }

    static create(
        colorId: ColorId,
        garmentSize: GarmentSize,
        productionOrderId: ProductionOrderId
    ): ProductionOrderDetailId {
        return new ProductionOrderDetailId(
            colorId,
            garmentSize,
            productionOrderId
        )
    }
    public getProductionOrderDetalId(): string {
        return `${this.productionOrderId.value}-${this.colorId.value}-${this.garmentSize.value}`;
    }

}