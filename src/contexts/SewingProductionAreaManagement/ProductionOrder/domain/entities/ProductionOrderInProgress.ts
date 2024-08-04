import { UserId } from "../../../Shared/domain/value-object/UserId";
import { ProductionOrder } from "../interfaces/ProductionOrder";
import { ProductionOrderRecordsCounter } from "../value-objects/ProductionOrderRecordsCounter";
import { ProductionOrderRecordsCheckedCounter } from "../value-objects/ProductionOrderRecordsCheckedCounter";
import { ProductionOrderExecutedAmount } from "../value-objects/ProductionOrderExecutedAmount";
import { ProductionOrderProcessEndDate } from "../value-objects/ProductionOrderProcessEndDate";
import { ProductionOrderId } from "../value-objects/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "../value-objects/ProductionOrderPlannedAmount";
import { ProductionOrderProcessStartDate } from "../value-objects/ProductionOrderProcessStartDate";
import { ProductionOrderReference } from "../value-objects/ProductionOrderReference";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
import { ProductionOrderDetailId } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailId";
import { CountingRecordsOrderFirstQualityNotChecked } from "../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityNotChecked";
import { CountingRecordsOrderSecondQualityNotChecked } from "../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityNotChecked";
import { ProductionOrderDetailInProgress } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailInProgress";
import { ProductionOrderDetailNotStarted } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderInProgressDTO } from "../data-transfer-objects/ProductionOrderInProgressDTO";
import { ProductionOrderDetailInProgressDTO } from "../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailInProgressDTO";
import { ProductionOrderDetailNotStartedDTO } from "../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailNotStartedDTO";

export class ProductionOrderInProgress implements ProductionOrder {

    private _recordsOrderCounter: ProductionOrderRecordsCounter;
    private _recordsOrderCheckedCounter: ProductionOrderRecordsCheckedCounter;
    private _processEndDate: ProductionOrderProcessEndDate | null;

    constructor(
        readonly productionOrderid: ProductionOrderId,
        readonly reference: ProductionOrderReference,
        readonly plannedAmount: ProductionOrderPlannedAmount,
        private _executedAmount: ProductionOrderExecutedAmount,
        readonly processStartDate: ProductionOrderProcessStartDate,
        readonly openByUser: UserId,
        readonly productionOrderDetailList: (ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted)[],
    ) {
        if (productionOrderDetailList.length === 0)
            throw new Error(`<Production Order Detail List> were not provided in Production Order ${productionOrderid.value}`);

        this._recordsOrderCounter = this.setInitialCountingRecordsOrderCounter(productionOrderDetailList);
        this._recordsOrderCheckedCounter = this.setInitialCountingRecordsOrderCheckedCounter(productionOrderDetailList);
        this._processEndDate = null;
    }

    public get executedAmount(): ProductionOrderExecutedAmount {
        return this._executedAmount;
    }

    public get processEndDate(): ProductionOrderProcessEndDate | null {
        return this._processEndDate;
    }

    public get recordsOrderCounter(): ProductionOrderRecordsCounter {
        return this._recordsOrderCounter;
    }

    public get recordsOrderCheckedCounter(): ProductionOrderRecordsCheckedCounter {
        return this._recordsOrderCheckedCounter;
    }

    static create(
        productionOrderid: ProductionOrderId,
        reference: ProductionOrderReference,
        plannedAmount: ProductionOrderPlannedAmount,
        executedAmount: ProductionOrderExecutedAmount,
        processStartDate: ProductionOrderProcessStartDate,
        openByUser: UserId,
        productionOrderDetailList: ProductionOrderDetailInProgress[] | ProductionOrderDetailNotStarted[]
    ): ProductionOrderInProgress {

        return new ProductionOrderInProgress(
            productionOrderid,
            reference,
            plannedAmount,
            executedAmount,
            processStartDate,
            openByUser,
            productionOrderDetailList,
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

        productionOrderDetail.addCountingRecordOrder(countingRecordsOrder);
        this.incrementExecutedAmount(countingRecordsOrder.recordsAmount);
        this.incrementRecordsCounter();

        if (this.hasCompletedPlannedAmount())
            this.closeOrder();
    }

    addCountingRecordsOrderNotChecked(countingRecordsOrder: CountingRecordsOrderFirstQualityNotChecked | CountingRecordsOrderSecondQualityNotChecked): void {

        const productionOrderDetailId = ProductionOrderDetailId.create(
            countingRecordsOrder.colorId,
            countingRecordsOrder.garmentSize,
            countingRecordsOrder.productionOrderId
        );

        const productionOrderDetail = this.productionOrderDetailList.find(element => element.productionOrderDetailId.getProductionOrderDetalId() === productionOrderDetailId.getProductionOrderDetalId());

        if (productionOrderDetail === undefined)
            throw new Error('Production Order Detail not found');

        const productionOrderDetailInProgrees = productionOrderDetail as ProductionOrderDetailInProgress;
        productionOrderDetailInProgrees.checkCoutingRecordOrder(countingRecordsOrder.id);
    }

    incrementRecordsCounter(): void {
        this._recordsOrderCounter = this.recordsOrderCounter.increment();
    }

    incrementExecutedAmount(amount: CountingRecordsOrderAmount): void {
        this._executedAmount = this.executedAmount.increment(amount);
    }

    closeOrder(): void {
        this._processEndDate = new ProductionOrderProcessEndDate(new Date());
    }

    private hasCompletedPlannedAmount(): boolean {
        return this.plannedAmount.value <= this.executedAmount.value;
    }

    private setInitialCountingRecordsOrderCounter(productionOrderDetailList: (ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted)[]): ProductionOrderRecordsCounter {
        const counterList = productionOrderDetailList.map(element => element.countingRecordsOrderListId.length);
        let counterAmount = 0;

        counterList.forEach(element => {
            counterAmount = counterAmount + element;
        });

        return new ProductionOrderRecordsCounter(counterAmount);
    }

    private setInitialCountingRecordsOrderCheckedCounter(productionOrderDetailList: (ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted)[]): ProductionOrderRecordsCheckedCounter {
        let counterAmount = 0;

        productionOrderDetailList.forEach(element => {
            if (element.toPrimitives().className === 'ProductionOrderDetail.inProgressDTO') {
                const DetailinProgressDTO = element as ProductionOrderDetailInProgress;
                counterAmount = counterAmount + DetailinProgressDTO.countingRecordsOrderCheckedListId.length;
            }
        });

        return new ProductionOrderRecordsCheckedCounter(counterAmount);
    }

    toPrimitives(): ProductionOrderInProgressDTO {
        return new ProductionOrderInProgressDTO(
            this.productionOrderid.value,
            this.reference.value,
            this.plannedAmount.value,
            this.executedAmount.value,
            this.processStartDate.value,
            this.processEndDate ? this.processEndDate.value : null,
            this.recordsOrderCounter.value,
            this.recordsOrderCheckedCounter.value,
            this.openByUser.value,
            this.productionOrderDetailList.map(entry => { return entry.toPrimitives() }),
        )
    }

    static fromPrimitives(data: ProductionOrderInProgressDTO): ProductionOrderInProgress {
        return new ProductionOrderInProgress(
            new ProductionOrderId(data.productionOrderid),
            new ProductionOrderReference(data.reference),
            new ProductionOrderPlannedAmount(data.plannedAmount),
            new ProductionOrderExecutedAmount(data.executedAmount),
            new ProductionOrderProcessStartDate(data.processStartDate),
            new UserId(data.openByUser),
            data.productionOrderDetailList.map(entry => {
                if (entry.className === 'ProductionOrderDetail.inProgressDTO')
                    return ProductionOrderDetailInProgress.fromPrimitives(entry as ProductionOrderDetailInProgressDTO);
                return ProductionOrderDetailNotStarted.fromPrimitives(entry as ProductionOrderDetailNotStartedDTO)
            }),
        )
    }
}
