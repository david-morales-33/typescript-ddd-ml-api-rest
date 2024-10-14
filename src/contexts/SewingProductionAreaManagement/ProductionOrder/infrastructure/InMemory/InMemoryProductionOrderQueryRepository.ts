import { ProductionOrderRoot } from "../../domain/interfaces/ProductionOrderRoot";
import { ProductionOrderQueryRepository } from "../../domain/repositories/ProductionOrderQueryRepository";
import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailNotStarted } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderDetailPlannedAmount } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailPlannedAmount";
import { BarcodeEan } from "../../../Shared/domain/value-object/BarcodeEan";
import { ColorId } from "../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../Shared/domain/value-object/GarmentSize";
import { UserId } from "../../../User/domain/value-objects/UserId";
import { ProductionOrderInProgress } from "../../domain/entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "../../domain/entities/ProductionOrderNotStarted";
import { ProductionOrderReference } from "../../domain/value-objects/ProductionOrderReference";
import { ColorLabel } from "../../../Shared/domain/value-object/ColorLabel";
import { GarmentType } from "../../../Shared/domain/value-object/GarmentType";
import { ProductionModuleId } from "../../../ProductionModule/domain/value-objects/ProductionModuleId";

export class InMemoryProductionOrderQueryRepository implements ProductionOrderQueryRepository {
    private productionOrderList: (ProductionOrderNotStarted | ProductionOrderInProgress)[]

    constructor() {
        const DetailNotStarted1 = new ProductionOrderDetailNotStarted(
            new ProductionOrderId('MOP4415'),
            new ColorId('1603'),
            new ColorLabel('PALO/ROSA'),
            new GarmentSize('L'),
            new BarcodeEan('7703498019402'),
            new ProductionOrderDetailPlannedAmount(50)
        )

        const DetailNotStarted2 = new ProductionOrderDetailNotStarted(
            new ProductionOrderId('MOP4415'),
            new ColorId('1603'),
            new ColorLabel('PALO/ROSA'),
            new GarmentSize('M'),
            new BarcodeEan('7703498019419'),
            new ProductionOrderDetailPlannedAmount(600)
        )

        const DetailNotStarted3 = new ProductionOrderDetailNotStarted(
            new ProductionOrderId('MOP4415'),
            new ColorId('1603'),
            new ColorLabel('PALO/ROSA'),
            new GarmentSize('XL'),
            new BarcodeEan('7703498019426'),
            new ProductionOrderDetailPlannedAmount(800)
        )
        // const DetailNotStarted4 = new ProductionOrderDetailNotStarted(
        //     new ProductionOrderId('MOP4414'),
        //     new ColorId('1100'),
        //     new ColorLabel('BLANCO'),
        //     new GarmentSize('XL'),
        //     new BarcodeEan('7703498019242'),
        //     new ProductionOrderDetailPlannedAmount(250)
        // )

        const productionOrderNotStarted = new ProductionOrderNotStarted(
            new ProductionOrderId('MOP4415'),
            new ProductionOrderReference('MAR579'),
            new GarmentType('MOP'),
            new ProductionModuleId(10),
            new UserId('1146441925'),
            [
                DetailNotStarted1, 
                DetailNotStarted2, 
                DetailNotStarted3,
                // DetailNotStarted4
            ]
        );

        this.productionOrderList = [
            productionOrderNotStarted
        ]
    }

    async find(productionOrderId: ProductionOrderId): Promise<ProductionOrderNotStarted | ProductionOrderInProgress | null> {
        const productionOrder = this.productionOrderList.find(entry => entry.productionOrderid.value === productionOrderId.value);
        if (productionOrder === undefined)
            return null;
        return productionOrder

    }

    async searchAll(): Promise<(ProductionOrderNotStarted | ProductionOrderInProgress)[]> {
        return this.productionOrderList
    }
}