import { CommonModificationEvent } from "../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { EventId } from "../../../AdministrativeEvent/domain/value-objects/EventId";
import { CountingRecordsOrderId } from "../../../countingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
import { BarcodeEan } from "../../../shared/domain/value-objects/BarcodeEan";
import { ColorId } from "../../../shared/domain/value-objects/ColorId";
import { GarmentSize } from "../../../shared/domain/value-objects/GarmentSize";
import { ProductionOrderId } from "../../../shared/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailDTO } from "../data-transfer-objects/ProductionOrderDetailDTO";
import { CountingRecordsOrderListEmptyException } from "../exceptions/CountingRecordsOrderListEmptyException";
import { ProductionOrderDetailRoot } from "../interfaces/ProductionOrderDetailRoot";
import { ProductionOrderDetailExecutedAmount } from "../value-objects/ProductionOrderDetailExecutedAmount";
import { ProductionOrderDetailFinishDate } from "../value-objects/ProductionOrderDetailFinishDate";
import { ProductionOrderDetailFinishDatePlanned } from "../value-objects/ProductionOrderDetailFinishDatePlanned";
import { ProductionOrderDetailId } from "../value-objects/ProductionOrderDetailId";
import { ProductionOrderDetailPlannedAmount } from "../value-objects/ProductionOrderDetailPlannedAmount";
import { ProductionOrderDetailProcessStartDate } from "../value-objects/ProductionOrderDetailProcessStartDate";
import { ProductionOrderDetailProcessStartDatePlanned } from "../value-objects/ProductionOrderDetailProcessStartDatePlanned";
import { ProductionOrderDetailProductionModulePlanned } from "../value-objects/ProductionOrderDetailProductionModulePlanned";
import { ProductionOrderDetailRecordsOrederCheckedCounter } from "../value-objects/ProductionOrderDetailRecordsOrederCheckedCounter";
import { ProductionOrderDetailRecordsOrederCounter } from "../value-objects/ProductionOrderDetailRecordsOrederCounter";
import { ProductionOrderDetailState } from "../value-objects/ProductionOrderDetailState";

export class ProductionOrderDetail implements ProductionOrderDetailRoot {

    readonly ean: BarcodeEan;
    readonly colorId: ColorId;
    readonly garmentSize: GarmentSize;
    readonly productionOrderId: ProductionOrderId;
    readonly productionOrderDetailId: ProductionOrderDetailId;
    readonly plannedAmount: ProductionOrderDetailPlannedAmount;
    readonly executedAmount: ProductionOrderDetailExecutedAmount;
    readonly recordsOrderCounter: ProductionOrderDetailRecordsOrederCounter;
    readonly recordsOrderCheckedCounter: ProductionOrderDetailRecordsOrederCheckedCounter;
    readonly processStartDate: ProductionOrderDetailProcessStartDate | null;
    readonly processEndDate: ProductionOrderDetailFinishDate | null;
    readonly state: ProductionOrderDetailState;
    readonly countingRecordsOrderCheckedListId: CountingRecordsOrderId[];
    readonly countingRecordsOrderListId: CountingRecordsOrderId[];
    readonly administrativeEventList: CommonModificationEvent[]

    private _processStartDatePlanned: ProductionOrderDetailProcessStartDatePlanned | null;
    private _processEndDatePlanned: ProductionOrderDetailFinishDatePlanned | null;
    private _productionModulePlanned: ProductionOrderDetailProductionModulePlanned | null;

    constructor(
        productionOrderId: ProductionOrderId,
        colorId: ColorId,
        garmentSize: GarmentSize,
        ean: BarcodeEan,
        processStartDate: ProductionOrderDetailProcessStartDate | null,
        processEndDate: ProductionOrderDetailFinishDate | null,
        processStartDatePlanned: ProductionOrderDetailProcessStartDatePlanned | null,
        processEndDatePlanned: ProductionOrderDetailFinishDatePlanned | null,
        productionModulePlanned: ProductionOrderDetailProductionModulePlanned | null,
        plannedAmount: ProductionOrderDetailPlannedAmount,
        executedAmount: ProductionOrderDetailExecutedAmount,
        state: ProductionOrderDetailState,
        countingRecordsOrderListId: CountingRecordsOrderId[],
        countingRecordsOrderCheckedListId: CountingRecordsOrderId[],
        administrativeEventList: CommonModificationEvent[]
    ) {
        this.productionOrderDetailId = new ProductionOrderDetailId(
            colorId, 
            garmentSize, 
            productionOrderId
        );

        this.ean = ean;
        this.state = state;
        this.colorId = colorId;
        this.garmentSize = garmentSize;
        this.plannedAmount = plannedAmount;
        this.executedAmount = executedAmount;
        this.processEndDate = processEndDate;
        this.processStartDate = processStartDate;
        this.productionOrderId = productionOrderId;
        this.countingRecordsOrderListId = countingRecordsOrderListId;
        this.countingRecordsOrderCheckedListId = countingRecordsOrderCheckedListId;
        this.administrativeEventList = administrativeEventList;

        if (countingRecordsOrderListId.length === 0)
            throw new CountingRecordsOrderListEmptyException(this.productionOrderDetailId);

        this._processEndDatePlanned = processEndDatePlanned;
        this._processStartDatePlanned = processStartDatePlanned;
        this._productionModulePlanned = productionModulePlanned;

        this.recordsOrderCounter = this.setInitialCountingRecordsOrderCounter(countingRecordsOrderListId);
        this.recordsOrderCheckedCounter = this.setInitialCountingRecordsOrderCheckedCounter(countingRecordsOrderCheckedListId);
    }

    public get processStartDatePlanned(): ProductionOrderDetailProcessStartDate | null {
        return this._processStartDatePlanned;
    }

    public get processEndDatePlanned(): ProductionOrderDetailFinishDate | null {
        return this._processEndDatePlanned;
    }

    public get productionModulePlanned(): ProductionOrderDetailProductionModulePlanned | null {
        return this._productionModulePlanned;
    }

    static create(
        productionOrderId: ProductionOrderId,
        colorId: ColorId,
        garmentSize: GarmentSize,
        ean: BarcodeEan,
        processStartDate: ProductionOrderDetailProcessStartDate | null,
        processEndDate: ProductionOrderDetailFinishDate | null,
        processStartDatePlanned: ProductionOrderDetailProcessStartDatePlanned | null,
        processEndDatePlanned: ProductionOrderDetailFinishDatePlanned | null,
        productionModulePlanned: ProductionOrderDetailProductionModulePlanned | null,
        plannedAmount: ProductionOrderDetailPlannedAmount,
        executedAmount: ProductionOrderDetailExecutedAmount,
        state: ProductionOrderDetailState,
        countingRecordsOrderListId: CountingRecordsOrderId[],
        countingRecordsOrderCheckedListId: CountingRecordsOrderId[],
        administrativeEventList: CommonModificationEvent[]

    ): ProductionOrderDetail {
        return new ProductionOrderDetail(
            productionOrderId,
            colorId,
            garmentSize,
            ean,
            processStartDate,
            processEndDate,
            processStartDatePlanned,
            processEndDatePlanned,
            productionModulePlanned,
            plannedAmount,
            executedAmount,
            state,
            countingRecordsOrderListId,
            countingRecordsOrderCheckedListId,
            administrativeEventList
        );
    }

    private setInitialCountingRecordsOrderCounter(countingRecordsOrderList: CountingRecordsOrderId[]): ProductionOrderDetailRecordsOrederCounter {
        const counterRecords = countingRecordsOrderList.length;
        return new ProductionOrderDetailRecordsOrederCounter(counterRecords)
    }

    private setInitialCountingRecordsOrderCheckedCounter(countingRecordsOrderList: CountingRecordsOrderId[]): ProductionOrderDetailRecordsOrederCheckedCounter {
        const counterRecords = countingRecordsOrderList.length;
        return new ProductionOrderDetailRecordsOrederCheckedCounter(counterRecords);
    }

    updateProcessStartDatePlanned(params: { value: ProductionOrderDetailProcessStartDatePlanned, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._processStartDatePlanned = new ProductionOrderDetailProcessStartDatePlanned(value.value)
        }
    }

    updateProcessEndDatePlanned(params: { value: ProductionOrderDetailFinishDatePlanned, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._processEndDatePlanned = new ProductionOrderDetailFinishDatePlanned(value.value)
        }
    }

    updateProductionModulePlanned(params: { value: ProductionOrderDetailProductionModulePlanned, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._productionModulePlanned= new ProductionOrderDetailProductionModulePlanned(value.value)
        }
    }

    private addNewEvent(event: CommonModificationEvent): void {
        this.administrativeEventList.push(event);
    }

    private hasAddedEvent(eventId: EventId) {
        const eventFound = this.administrativeEventList.find(elemente => elemente.id.value === eventId.value);
        return eventFound !== undefined;
    }

    static fromPrimitives(data: ProductionOrderDetailDTO) {
        return new ProductionOrderDetail(
            new ProductionOrderId(data.productionOrderId),
            new ColorId(data.colorId),
            new GarmentSize(data.garmentSize),
            new BarcodeEan(data.ean),
            data.processStartDate ? new ProductionOrderDetailProcessStartDate(data.processStartDate) : null,
            data.processEndDate ? new ProductionOrderDetailFinishDate(data.processEndDate) : null,
            data.processStartDatePlanned ? new ProductionOrderDetailProcessStartDatePlanned(data.processStartDatePlanned) : null,
            data.processEndDatePlanned ? new ProductionOrderDetailFinishDatePlanned(data.processEndDatePlanned) : null,
            data.productionModulePlanned ? new ProductionOrderDetailProductionModulePlanned(data.productionModulePlanned) : null,
            new ProductionOrderDetailPlannedAmount(data.plannedAmount),
            new ProductionOrderDetailExecutedAmount(data.executedAmount),
            new ProductionOrderDetailState(data.state),
            data.countingRecordsOrderListId.map(entry => { return new CountingRecordsOrderId(entry) }),
            data.countingRecordsOrderCheckedListId.map(entry => { return new CountingRecordsOrderId(entry) }),
            data.administrativeEventList.map(entry => { return CommonModificationEvent.fromPrimitives(entry) })
        )
    }

    toPrimitives(): ProductionOrderDetailDTO {
        return new ProductionOrderDetailDTO(
            this.productionOrderDetailId.getProductionOrderDetalId(),
            this.productionOrderId.value,
            this.colorId.value,
            this.garmentSize.value,
            this.ean.value,
            this.plannedAmount.value,
            this.executedAmount.value,
            this.state.value,
            this.processStartDate ? this.processStartDate.value : null,
            this.processEndDate ? this.processEndDate.value : null,
            this.processStartDatePlanned ? this.processStartDatePlanned.value : null,
            this.processEndDatePlanned ? this.processEndDatePlanned.value : null,
            this.productionModulePlanned ? this.productionModulePlanned.value : null,
            this.recordsOrderCounter.value,
            this.recordsOrderCheckedCounter.value,
            this.countingRecordsOrderListId.map(entry => { return entry.value }),
            this.countingRecordsOrderCheckedListId.map(entry => { return entry.value }),
            this.administrativeEventList.map(element => { return element.toPrimitives() })
        )
    }

}