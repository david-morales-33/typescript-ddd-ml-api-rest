import { ProductionOrder } from "../interfaces/ProductionOrder";
import { ProductionOrderRecordsCounter } from "../value-objects/ProductionOrderRecordsCounter";
import { ProductionOrderExecutedAmount } from "../value-objects/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "../value-objects/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "../value-objects/ProductionOrderPlannedAmount";
import { ProductionOrderProcessStartDate } from "../value-objects/ProductionOrderProcessStartDate";
import { ProductionOrderReference } from "../value-objects/ProductionOrderReference";
import { UserId } from "../../../Shared/domain/value-object/UserId";
import { ProductionOrderDetailNotStarted } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderINotStartedDTO } from "../data-transfer-objects/ProductionOrderINotStartedDTO";
import { CountingRecordsOrderFirstQualityNotChecked } from "../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityNotChecked";
import { CountingRecordsOrderSecondQualityNotChecked } from "../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityNotChecked";
import { ProductionOrderDetailId } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailId";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";

export class ProductionOrderNotStarted implements ProductionOrder {

    constructor(
        readonly productionOrderid: ProductionOrderId,
        readonly reference: ProductionOrderReference,
        readonly plannedAmount: ProductionOrderPlannedAmount,
        private _executedAmount: ProductionOrderExecutedAmount,
        private _processStartDate: ProductionOrderProcessStartDate | null,
        private _recordsOrderCounter: ProductionOrderRecordsCounter,
        readonly openByUser: UserId,
        readonly productionOrderDetailList: ProductionOrderDetailNotStarted[]
    ) { }

    public get executedAmount(): ProductionOrderExecutedAmount {
        return this._executedAmount;
    }

    public get recordsOrderCounter(): ProductionOrderRecordsCounter {
        return this._recordsOrderCounter;
    }

    public get processStartDate(): ProductionOrderProcessStartDate | null {
        return this._processStartDate
    }

    static create(
        productionOrderid: ProductionOrderId,
        reference: ProductionOrderReference,
        plannedAmount: ProductionOrderPlannedAmount,
        executedAmount: ProductionOrderExecutedAmount,
        processStartDate: ProductionOrderProcessStartDate | null,
        recordsOrderCounter: ProductionOrderRecordsCounter,
        openByUser: UserId,
        productionOrderDetailList: ProductionOrderDetailNotStarted[]
    ): ProductionOrderNotStarted {

        return new ProductionOrderNotStarted(
            productionOrderid,
            reference,
            plannedAmount,
            executedAmount,
            processStartDate,
            recordsOrderCounter,
            openByUser,
            productionOrderDetailList
        );
    }

    addCountingRecordsOrder(countingRecordsOrder: CountingRecordsOrderFirstQualityNotChecked | CountingRecordsOrderSecondQualityNotChecked): void {

        const productionOrderDetailId = ProductionOrderDetailId.create(
            countingRecordsOrder.colorId,
            countingRecordsOrder.garmentSize,
            countingRecordsOrder.productionOrderId
        );

        const productionOrderDetail = this.productionOrderDetailList.find(element => element.productionOrderDetailId.getProductionOrderDetalId() === productionOrderDetailId.getProductionOrderDetalId());

        if (productionOrderDetail === undefined)
            throw new Error('Production Order Detail not found');

        productionOrderDetail.addCountingRecordOrder(countingRecordsOrder)
        this.incrementExecutedAmount(countingRecordsOrder.recordsAmount);
        this.incrementRecordsCounter();

        this.openOrder();
    }

    incrementRecordsCounter(): void {
        this._recordsOrderCounter = this.recordsOrderCounter.increment();
    }

    incrementExecutedAmount(amount: CountingRecordsOrderAmount): void {
        this._executedAmount = this.executedAmount.increment(amount);
    }

    addProductionOrderDetail(productionOrderDetail: ProductionOrderDetailNotStarted): void {
        if (this.hasAddedProductionOrderDetail(productionOrderDetail))
            throw new Error('The Production Order Detail has already been added')

        this.productionOrderDetailList.push(productionOrderDetail);
    }

    openOrder(): void {
        this._processStartDate = new ProductionOrderProcessStartDate(new Date);
    }

    private hasAddedProductionOrderDetail(productionOrderDetail: ProductionOrderDetailNotStarted): boolean {
        const findedProductionOrderDetail = this.productionOrderDetailList.find(element => element.toPrimitives().productionOrderDetailId === productionOrderDetail.toPrimitives().productionOrderDetailId);
        return findedProductionOrderDetail !== undefined;
    }

    static fromPrimitives(data: ProductionOrderINotStartedDTO) {

        return new ProductionOrderNotStarted(
            new ProductionOrderId(data.productionOrderid),
            new ProductionOrderReference(data.reference),
            new ProductionOrderPlannedAmount(data.plannedAmount),
            new ProductionOrderExecutedAmount(data.executedAmount),
            data.processStartDate ? new ProductionOrderProcessStartDate(data.processStartDate) : null,
            new ProductionOrderRecordsCounter(data.recordsOrderCounter),
            new UserId(data.openByUser),
            data.productionOrderDetailList.map(entry => ProductionOrderDetailNotStarted.fromPrimitives(entry))
        )
    }

    toPrimitives(): ProductionOrderINotStartedDTO {
        return new ProductionOrderINotStartedDTO(
            this.productionOrderid.value,
            this.reference.value,
            this.plannedAmount.value,
            this.executedAmount.value,
            this.processStartDate ? this.processStartDate.value : null,
            this.recordsOrderCounter.value,
            this.productionOrderDetailList.map(entry => { return entry.toPrimitives() }),
            this.openByUser.value
        )
    }
}