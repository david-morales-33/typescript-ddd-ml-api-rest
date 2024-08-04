import { ProductionOrderDetail } from '../interfaces/ProductionOrderDetail';
import { ColorId } from '../../../Shared/domain/value-object/ColorId';
import { GarmentSize } from '../../../Shared/domain/value-object/GarmentSize';
import { ProductionOrderId } from '../../../ProductionOrder/domain/value-objects/ProductionOrderId';
import { ProductionOrderDetailRecordsOrederCounter } from '../value-objects/ProductionOrderDetailRecordsOrederCounter';
import { ProductionOrderDetailExecutedAmount } from '../value-objects/ProductionOrderDetailExecutedAmount';
import { ProductionOrderDetailId } from '../value-objects/ProductionOrderDetailId';
import { ProductionOrderDetailPlannedAmount } from '../value-objects/ProductionOrderDetailPlannedAmount';
import { ProductionOrderDetailProcessStartDate } from '../value-objects/ProductionOrderDetailProcessStartDate';
import { BarcodeEan } from '../../../Shared/domain/value-object/BarcodeEan';
import { ProductionOrderDetailNotStartedDTO } from '../data-transfer-objects/ProductionOrderDetailNotStartedDTO';
import { CountingRecordsOrderId } from '../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId';
import { CountingRecordsOrderAmount } from '../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount';
import { CountingRecordsOrderFirstQualityNotChecked } from '../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityNotChecked';
import { CountingRecordsOrderSecondQualityNotChecked } from '../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityNotChecked';

export class ProductionOrderDetailNotStarted implements ProductionOrderDetail {

    readonly productionOrderDetailId: ProductionOrderDetailId;

    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly colorId: ColorId,
        readonly garmentSize: GarmentSize,
        readonly ean: BarcodeEan,
        readonly plannedAmount: ProductionOrderDetailPlannedAmount,
        private _executedAmount: ProductionOrderDetailExecutedAmount,
        private _processStartDate: ProductionOrderDetailProcessStartDate | null,
        private _recordsOrderCounter: ProductionOrderDetailRecordsOrederCounter,
        readonly countingRecordsOrderListId: CountingRecordsOrderId[],
    ) {
        this.productionOrderDetailId = new ProductionOrderDetailId(colorId, garmentSize, productionOrderId)
    }

    public get executedAmount(): ProductionOrderDetailExecutedAmount {
        return this._executedAmount;
    }

    public get processStartDate(): ProductionOrderDetailProcessStartDate | null {
        return this._processStartDate;
    }

    public get recordsOrderCounter(): ProductionOrderDetailRecordsOrederCounter {
        return this._recordsOrderCounter;
    }

    static create(
        productionOrderId: ProductionOrderId,
        colorId: ColorId,
        garmentSize: GarmentSize,
        ean: BarcodeEan,
        plannedAmount: ProductionOrderDetailPlannedAmount,
        processStartDate: ProductionOrderDetailProcessStartDate,

    ): ProductionOrderDetailNotStarted {
        return new ProductionOrderDetailNotStarted(
            productionOrderId,
            colorId,
            garmentSize,
            ean,
            plannedAmount,
            ProductionOrderDetailExecutedAmount.initialize(),
            processStartDate,
            ProductionOrderDetailRecordsOrederCounter.initialize(),
            []
        );
    }

    addCountingRecordOrder(countingRecordsOrder: CountingRecordsOrderFirstQualityNotChecked | CountingRecordsOrderSecondQualityNotChecked): void {
        if (this.hasAddedCountingRecordOrder(countingRecordsOrder.id)) 
            throw new Error('The Counting Records Order has already been added');

        this.countingRecordsOrderListId.push(countingRecordsOrder.id);
        this.incrementCounterRecords();
        this.incrementExecutedAmount(countingRecordsOrder.recordsAmount);

        if (!this.hasOpenedOrder())
            this.openOrder();
        
    }

    incrementCounterRecords(): void {
        this._recordsOrderCounter = this.recordsOrderCounter.increment();
    }

    incrementExecutedAmount(countingRecordsOrderAmount: CountingRecordsOrderAmount): void {
        this._executedAmount = this.executedAmount.increment(countingRecordsOrderAmount);
    }

    openOrder(): void {
        this._processStartDate = new ProductionOrderDetailProcessStartDate(new Date())
    }

    private hasAddedCountingRecordOrder(countingRecordsOrder: CountingRecordsOrderId): boolean {
        const findedCountingRecordsOrder = this.countingRecordsOrderListId.
            find(element => element.value === countingRecordsOrder.value);
        return findedCountingRecordsOrder !== undefined;
    }

    private hasOpenedOrder(): boolean {
        return this._processStartDate !== null
    }

    static fromPrimitives(data: {
        productionOrderId: string;
        colorId: string;
        garmentSize: string;
        ean: string;
        plannedAmount: number;
    }) {
        return new ProductionOrderDetailNotStarted(
            new ProductionOrderId(data.productionOrderId),
            new ColorId(data.colorId),
            new GarmentSize(data.garmentSize),
            new BarcodeEan(data.ean),
            new ProductionOrderDetailPlannedAmount(data.plannedAmount),
            new ProductionOrderDetailExecutedAmount(0),
            null,
            new ProductionOrderDetailRecordsOrederCounter(0),
            [],
        )
    }

    toPrimitives(): ProductionOrderDetailNotStartedDTO {
        return new ProductionOrderDetailNotStartedDTO(
            this.productionOrderDetailId.getProductionOrderDetalId(),
            this.productionOrderId.value,
            this.colorId.value,
            this.garmentSize.value,
            this.ean.value,
            this.plannedAmount.value,
            this.executedAmount.value,
            this.processStartDate && this.processStartDate.value,
            this.recordsOrderCounter.value,
            this.countingRecordsOrderListId.map(element => { return element.value })
        )
    }
}
