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

export class InMemoryProductionOrderQueryRepository implements ProductionOrderQueryRepository {
    private productionOrderList: (ProductionOrderNotStarted | ProductionOrderInProgress)[]

    constructor() {
        const DetailNotStarted1 = new ProductionOrderDetailNotStarted(
            new ProductionOrderId('MOB3547'),
            new ColorId('1302'),
            new GarmentSize('34'),
            new BarcodeEan('7704666565678'),
            new ProductionOrderDetailPlannedAmount(200)
        )

        const DetailNotStarted2 = new ProductionOrderDetailNotStarted(
            new ProductionOrderId('MOB3547'),
            new ColorId('1302'),
            new GarmentSize('36'),
            new BarcodeEan('7704666565678'),
            new ProductionOrderDetailPlannedAmount(200)
        )

        const DetailNotStarted3 = new ProductionOrderDetailNotStarted(
            new ProductionOrderId('MOB3547'),
            new ColorId('1302'),
            new GarmentSize('38'),
            new BarcodeEan('7704666565678'),
            new ProductionOrderDetailPlannedAmount(200)
        )

        const productionOrderNotStarted = new ProductionOrderNotStarted(
            new ProductionOrderId('MOB3547'),
            new ProductionOrderReference('MAR8546'),
            new UserId('11446441925'),
            [DetailNotStarted1, DetailNotStarted2, DetailNotStarted3]
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