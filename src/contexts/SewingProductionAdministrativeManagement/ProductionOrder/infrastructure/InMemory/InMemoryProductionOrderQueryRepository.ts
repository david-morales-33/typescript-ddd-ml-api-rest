import { ProductionOrderDetail } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetaill";
import { ProductionOrderDetailExecutedAmount } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailExecutedAmount";
import { ProductionOrderDetailPlannedAmount } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailPlannedAmount";
import { ProductionOrderDetailState } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailState";
import { BarcodeEan } from "../../../shared/domain/value-objects/BarcodeEan";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrder } from "../../domain/entities/ProductionOrder";
import { ProductionOrderQueryRepository } from "../../domain/repositories/ProductionOrderQueryRepository";
import { ProductionOrderState } from "../../../../Shared/domain/value-object/ProductionOrderState";
import { ReferenceId } from "../../../../Shared/domain/value-object/ReferenceId";
import { UserId } from "../../../../Shared/domain/value-object/UserId";

export class InMemoryProductionOrderQueryRepository implements ProductionOrderQueryRepository {

    private productionOrderList: ProductionOrder[];

    constructor() {
        this.productionOrderList = [
            new ProductionOrder(
                new ProductionOrderId('MOP3541'),
                new ReferenceId('MAR8564'), null, null, null, null,
                new UserId('1146441925'),
                new ProductionOrderState(true),
                [
                    new ProductionOrderDetail(
                        new ProductionOrderId('MOP3541'),
                        new ColorId('1010'),
                        new GarmentSize('XL'),
                        new BarcodeEan('1234567894567'), null, null, null, null, null,
                        new ProductionOrderDetailPlannedAmount(200),
                        new ProductionOrderDetailExecutedAmount(0),
                        new ProductionOrderDetailState(true), [], [], [],
                    ),
                    new ProductionOrderDetail(
                        new ProductionOrderId('MOP3541'),
                        new ColorId('1010'),
                        new GarmentSize('L'),
                        new BarcodeEan('1234567894578'), null, null, null, null, null,
                        new ProductionOrderDetailPlannedAmount(300),
                        new ProductionOrderDetailExecutedAmount(0),
                        new ProductionOrderDetailState(true), [], [], [],
                    ),
                ],
                []
            )
        ]
    }

    async find(ProductionOrderId: ProductionOrderId): Promise<ProductionOrder | null> {
        const productionOrder = this.productionOrderList.find(entry => entry.productionOrderId.value === ProductionOrderId.value);

        if(productionOrder === undefined)
            return null;
        return productionOrder;
    }
}