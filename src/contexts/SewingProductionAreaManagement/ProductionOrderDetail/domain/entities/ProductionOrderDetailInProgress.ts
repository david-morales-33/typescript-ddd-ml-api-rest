import { ColorId } from '../../../Shared/domain/value-object/ColorId';
import { GarmentSize } from '../../../Shared/domain/value-object/GarmentSize';
import { ProductionOrderId } from '../../../ProductionOrder/domain/value-objects/ProductionOrderId';
import { ProductionOrderDetail } from '../interfaces/ProductionOrderDetail'
import { ProductionOrderDetailRecordsOrederCounter } from '../value-objects/ProductionOrderDetailRecordsOrederCounter';
import { ProductionOrderDetailExecutedAmount } from '../value-objects/ProductionOrderDetailExecutedAmount';
import { ProductionOrderDetailFinishDate } from '../value-objects/ProductionOrderDetailFinishDate';
import { ProductionOrderDetailId } from '../value-objects/ProductionOrderDetailId';
import { ProductionOrderDetailPlannedAmount } from '../value-objects/ProductionOrderDetailPlannedAmount';
import { ProductionOrderDetailProcessStartDate } from '../value-objects/ProductionOrderDetailProcessStartDate';
import { ProductionOrderDetailRecordsOrederCheckedCounter } from '../value-objects/ProductionOrderDetailRecordsOrederCheckedCounter';
import { BarcodeEan } from '../../../Shared/domain/value-object/BarcodeEan';
import { CountingRecordsOrderId } from '../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId';
import { ProductionOrderDetailInProgressDTO } from '../data-transfer-objects/ProductionOrderDetailInProgressDTO';
import { CountingRecordsOrderFirstQualityNotChecked } from '../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityNotChecked';
import { CountingRecordsOrderSecondQualityNotChecked } from '../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityNotChecked';
import { CountingRecordsOrderAmount } from '../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount';

export class ProductionOrderDetailInProgress implements ProductionOrderDetail {

    private _className: string = 'ProductionOrderDetail.inProgress'; 

    private _processEndDate: ProductionOrderDetailFinishDate | null;
    private _recordsOrderCounter: ProductionOrderDetailRecordsOrederCounter;
    readonly productionOrderDetailId: ProductionOrderDetailId;
    private _recordsOrderCheckedCounter: ProductionOrderDetailRecordsOrederCheckedCounter;

    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly colorId: ColorId,
        readonly garmentSize: GarmentSize,
        readonly ean: BarcodeEan,
        readonly plannedAmount: ProductionOrderDetailPlannedAmount,
        private _executedAmount: ProductionOrderDetailExecutedAmount,
        readonly processStartDate: ProductionOrderDetailProcessStartDate,
        readonly countingRecordsOrderListId: CountingRecordsOrderId[],
        readonly countingRecordsOrderCheckedListId: CountingRecordsOrderId[]
    ) {
        this.productionOrderDetailId = new ProductionOrderDetailId(colorId, garmentSize, productionOrderId);
        this._processEndDate = null;

        if(countingRecordsOrderListId.length===0)
            throw new Error(`<Counting Records Order Id List> was not provided in Production Order Detail <${this.productionOrderDetailId.getProductionOrderDetalId()}>`);

        this._recordsOrderCounter = this.setInitialCountingRecordsOrderCounter(countingRecordsOrderListId);
        this._recordsOrderCheckedCounter= this.setInitialCountingRecordsOrderCheckedCounter(countingRecordsOrderCheckedListId);

    }

    public get className(): string {
        return this._className;
    }

    public get executedAmount(): ProductionOrderDetailExecutedAmount {
        return this._executedAmount;
    }

    public get processEndDate(): ProductionOrderDetailFinishDate | null {
        return this._processEndDate;
    }

    public get recordsOrderCounter(): ProductionOrderDetailRecordsOrederCounter {
        return this._recordsOrderCounter;
    }

    public get recordsOrderCheckedCounter(): ProductionOrderDetailRecordsOrederCheckedCounter {
        return this._recordsOrderCheckedCounter;
    }

    static create(
        productionOrderId: ProductionOrderId,
        colorId: ColorId,
        garmentSize: GarmentSize,
        ean: BarcodeEan,
        plannedAmount: ProductionOrderDetailPlannedAmount,
        executedAmount: ProductionOrderDetailExecutedAmount,
        processStartDate: ProductionOrderDetailProcessStartDate,
        countingRecordsOrderListId: CountingRecordsOrderId[],
        countingRecordsOrderCheckedListId: CountingRecordsOrderId[]

    ): ProductionOrderDetailInProgress {
        return new ProductionOrderDetailInProgress(
            productionOrderId,
            colorId,
            garmentSize,
            ean,
            plannedAmount,
            executedAmount,
            processStartDate,
            countingRecordsOrderListId,
            countingRecordsOrderCheckedListId
        );
    }

    addCountingRecordOrder(countingRecordsOrder: CountingRecordsOrderFirstQualityNotChecked | CountingRecordsOrderSecondQualityNotChecked): void {
        if (this.hasAddedCountingRecordOrder(countingRecordsOrder.id))
            throw new Error('Counting Records Order has already been added');

        this.countingRecordsOrderListId.push(countingRecordsOrder.id);
        this.incrementCounterRecords();
        this.incrementExecutedAmount(countingRecordsOrder.recordsAmount);

        if (this.hasCompletedPlannedAmount(countingRecordsOrder.recordsAmount))
            this.closeOrder();

    }

    incrementCounterRecords(): void {
        this._recordsOrderCounter = this.recordsOrderCounter.increment();
    }

    incrementExecutedAmount(countingRecordsOrderAmount: CountingRecordsOrderAmount): void {
        this._executedAmount = this.executedAmount.increment(countingRecordsOrderAmount);
    }

    incrementCounterRecordsChecked(): void {
        this._recordsOrderCheckedCounter = this.recordsOrderCheckedCounter.increment();
    }

    checkCoutingRecordOrder(countingRecordsOrder: CountingRecordsOrderId): void {

        if (this.hasCheckedCountingRecordOrder(countingRecordsOrder))
            throw new Error('Counting Records Order has already been checked');

        this.countingRecordsOrderCheckedListId.push(countingRecordsOrder);
        this.incrementCounterRecordsChecked();

    }

    closeOrder() {
        this._processEndDate = this.processEndDate && this.processEndDate.setValue();
    }

    private hasAddedCountingRecordOrder(countingRecordsOrder: CountingRecordsOrderId): boolean {
        const findedCountingRecordsOrder = this.countingRecordsOrderListId.
            find(element => element.value === countingRecordsOrder.value);
        return findedCountingRecordsOrder !== undefined;
    }

    private hasCheckedCountingRecordOrder(countingRecordsOrderChecked: CountingRecordsOrderId): boolean {
        const findedCountingRecordsOrderChecked = this.countingRecordsOrderCheckedListId.
            find(element => element.value === countingRecordsOrderChecked.value);
        return findedCountingRecordsOrderChecked !== undefined;
    }

    private hasCompletedPlannedAmount(countingRecordsOrderAmount: CountingRecordsOrderAmount): boolean {
        return this.plannedAmount.value === (countingRecordsOrderAmount.value + this.executedAmount.value) ||
            this.plannedAmount.value < (countingRecordsOrderAmount.value + this.executedAmount.value);
    }

    private setInitialCountingRecordsOrderCounter(countingRecordsOrderList : CountingRecordsOrderId[]):ProductionOrderDetailRecordsOrederCounter{
        const counterRecords = countingRecordsOrderList.length;
        return new ProductionOrderDetailRecordsOrederCounter(counterRecords)
    }

    private setInitialCountingRecordsOrderCheckedCounter(countingRecordsOrderList : CountingRecordsOrderId[]):ProductionOrderDetailRecordsOrederCheckedCounter{
        const counterRecords = countingRecordsOrderList.length;
        return new ProductionOrderDetailRecordsOrederCheckedCounter(counterRecords);
    }

    static fromPrimitives(data: {
        productionOrderDetailId: string;
        productionOrderId: string;
        colorId: string;
        garmentSize: string;
        ean: string;
        plannedAmount: number;
        executedAmount: number;
        processStartDate: Date;
        recordsOrderCounter: number;
        recordsOrderCheckedCounter: number;
        countingRecordsOrderListId: number[];
        countingRecordsOrderCheckedListId: number[];
    }) {
        return new ProductionOrderDetailInProgress(
            new ProductionOrderId(data.productionOrderId),
            new ColorId(data.colorId),
            new GarmentSize(data.garmentSize),
            new BarcodeEan(data.ean),
            new ProductionOrderDetailPlannedAmount(data.plannedAmount),
            new ProductionOrderDetailExecutedAmount(data.executedAmount),
            new ProductionOrderDetailProcessStartDate(data.processStartDate),
            data.countingRecordsOrderListId.map(entry => new CountingRecordsOrderId(entry)),
            data.countingRecordsOrderCheckedListId.map(entry => new CountingRecordsOrderId(entry))
        )
    }

    toPrimitives(): ProductionOrderDetailInProgressDTO {
        return new ProductionOrderDetailInProgressDTO(
            this.productionOrderDetailId.getProductionOrderDetalId(),
            this.productionOrderId.value,
            this.colorId.value,
            this.garmentSize.value,
            this.ean.value,
            this.plannedAmount.value,
            this.executedAmount.value,
            this.processStartDate.value,
            this.processEndDate && this.processEndDate.value,
            this.recordsOrderCounter.value,
            this.recordsOrderCheckedCounter.value,
            this.countingRecordsOrderListId.map(element => { return element.value }),
            this.countingRecordsOrderCheckedListId.map(element => { return element.value })
        )
    }

}