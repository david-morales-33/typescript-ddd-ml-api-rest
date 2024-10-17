import { ProductionOrderDetailRoot } from '../interfaces/ProductionOrderDetailRoot';
import { ProductionOrderDetailRecordsOrederCounter } from '../value-objects/ProductionOrderDetailRecordsOrederCounter';
import { ProductionOrderDetailExecutedAmount } from '../value-objects/ProductionOrderDetailExecutedAmount';
import { ProductionOrderDetailId } from '../value-objects/ProductionOrderDetailId';
import { ProductionOrderDetailPlannedAmount } from '../value-objects/ProductionOrderDetailPlannedAmount';
import { ProductionOrderDetailProcessStartDate } from '../value-objects/ProductionOrderDetailProcessStartDate';
import { ProductionOrderDetailNotStartedDTO } from '../data-transfer-objects/ProductionOrderDetailNotStartedDTO';
import { CountingRecordsOrderId } from '../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId';
import { CountingRecordsOrderAmount } from '../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount';
import { CountingRecordsOrderFirstQualityNotChecked } from '../../../CountingRecordsOrder/domain/entities/CountingRecordOrderFirstQualityNotChecked';
import { CountingRecordsOrderSecondQualityNotChecked } from '../../../CountingRecordsOrder/domain/entities/CountingRecordOrderSecondQualityNotChecked';
import { CountingRecordsOrderHasAlreadyBeenAddedException } from '../../exceptions/CountingRecordsOrderHasAlreadyBeenAddedException';
import { ProductionOrderId } from '../../../../Shared/domain/value-object/ProductionOrderId';
import { ColorId } from '../../../../Shared/domain/value-object/ColorId';
import { ColorLabel } from '../../../../Shared/domain/value-object/ColorLabel';
import { GarmentSize } from '../../../../Shared/domain/value-object/GarmentSize';
import { BarcodeEan } from '../../../../SewingProductionAdministrativeManagement/shared/domain/value-objects/BarcodeEan';

export class ProductionOrderDetailNotStarted implements ProductionOrderDetailRoot {

    readonly productionOrderDetailId: ProductionOrderDetailId;

    private _className: string = 'ProductionOrderDetail.notStarted';
    private _processStartDate: ProductionOrderDetailProcessStartDate | null;
    private _recordsOrderCounter: ProductionOrderDetailRecordsOrederCounter;
    private _executedAmount: ProductionOrderDetailExecutedAmount;
    private _countingRecordsOrderListId: CountingRecordsOrderId[];

    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly colorId: ColorId,
        readonly colorLabel: ColorLabel,
        readonly garmentSize: GarmentSize,
        readonly ean: BarcodeEan,
        readonly plannedAmount: ProductionOrderDetailPlannedAmount,
    ) {
        this.productionOrderDetailId = new ProductionOrderDetailId(colorId, garmentSize, productionOrderId)
        this._countingRecordsOrderListId = [];
        this._processStartDate = null;
        this._recordsOrderCounter = ProductionOrderDetailRecordsOrederCounter.initialize();
        this._executedAmount = ProductionOrderDetailExecutedAmount.initialize();
    }

    public get className(): string {
        return this._className;
    }

    public get countingRecordsOrderListId(): CountingRecordsOrderId[] {
        return this._countingRecordsOrderListId;
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
        colorLabel: ColorLabel,
        garmentSize: GarmentSize,
        ean: BarcodeEan,
        plannedAmount: ProductionOrderDetailPlannedAmount,
    ): ProductionOrderDetailNotStarted {
        return new ProductionOrderDetailNotStarted(
            productionOrderId,
            colorId,
            colorLabel,
            garmentSize,
            ean,
            plannedAmount
        );
    }

    addCountingRecordOrder(countingRecordsOrder: CountingRecordsOrderFirstQualityNotChecked | CountingRecordsOrderSecondQualityNotChecked): void {
        if (this.hasAddedCountingRecordOrder(countingRecordsOrder.id))
            throw new CountingRecordsOrderHasAlreadyBeenAddedException(this.productionOrderDetailId)

        this.countingRecordsOrderListId.push(countingRecordsOrder.id);
        this.incrementCounterRecords();
        this.incrementExecutedAmount(countingRecordsOrder.recordsAmount);
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
        const findedCountingRecordsOrder = this.countingRecordsOrderListId.find(element => element.value === countingRecordsOrder.value);
        return findedCountingRecordsOrder !== undefined;
    }

    static fromPrimitives(data: {
        productionOrderId: string;
        colorId: string;
        colorLabel: string;
        garmentSize: string;
        ean: string;
        plannedAmount: number;
    }) {
        return new ProductionOrderDetailNotStarted(
            new ProductionOrderId(data.productionOrderId),
            new ColorId(data.colorId),
            new ColorLabel(data.colorLabel),
            new GarmentSize(data.garmentSize),
            new BarcodeEan(data.ean),
            new ProductionOrderDetailPlannedAmount(data.plannedAmount),
        )
    }

    toPrimitives(): ProductionOrderDetailNotStartedDTO {
        return new ProductionOrderDetailNotStartedDTO(
            this.productionOrderDetailId.getProductionOrderDetalId(),
            this.productionOrderId.value,
            this.colorId.value,
            this.colorLabel.value,
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
