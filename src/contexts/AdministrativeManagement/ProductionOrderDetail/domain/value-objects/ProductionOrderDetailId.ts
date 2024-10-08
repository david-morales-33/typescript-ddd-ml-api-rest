import { ColorId } from "../../../shared/domain/value-objects/ColorId";
import { GarmentSize } from "../../../shared/domain/value-objects/GarmentSize";
import { ProductionOrderId } from "../../../shared/domain/value-objects/ProductionOrderId";

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