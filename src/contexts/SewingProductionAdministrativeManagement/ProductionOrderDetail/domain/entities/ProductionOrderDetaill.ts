import { CommonModificationEvent } from "../../../../Shared/domain/entities/CommonModificationEvent";
import { EventId } from "../../../../Shared/domain/value-object/EventId";
import { CountingRecordsOrderId } from "../../../countingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
import { BarcodeEan } from "../../../shared/domain/value-objects/BarcodeEan";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderDetailDTO } from "../data-transfer-objects/ProductionOrderDetailDTO";
import { ProductionOrderDetailRoot } from "../interfaces/ProductionOrderDetailRoot";
import { ProductionOrderDetailId } from "../value-objects/ProductionOrderDetailId";
import { ProductionOrderDetailProductionModulePlanned } from "../value-objects/ProductionOrderDetailProductionModulePlanned";
import { ProductionOrderDetailRecordsOrederCheckedCounter } from "../value-objects/ProductionOrderDetailRecordsOrederCheckedCounter";
import { ProductionOrderDetailRecordsOrederCounter } from "../value-objects/ProductionOrderDetailRecordsOrederCounter";
import { ProductionOrderPlannedAmount } from "../../../../Shared/domain/value-object/ProductionOrderPlannedAmount";
import { ProductionOrderExecutedAmount } from "../../../../Shared/domain/value-object/ProductionOrderExecutedAmount";
import { ProductionOrderProcessStartDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDate";
import { ProductionOrderDetailFinishDate } from "../../../../SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailFinishDate";
import { ProductionOrderProcessStartDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderProcessEndDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderState } from "../../../../Shared/domain/value-object/ProductionOrderState";

export class ProductionOrderDetail implements ProductionOrderDetailRoot {

    readonly productionOrderDetailId: ProductionOrderDetailId;
    readonly productionOrderId: ProductionOrderId;
    readonly colorId: ColorId;
    readonly garmentSize: GarmentSize;
    readonly ean: BarcodeEan;
    readonly plannedAmount: ProductionOrderPlannedAmount;
    readonly executedAmount: ProductionOrderExecutedAmount;
    readonly recordsOrderCounter: ProductionOrderDetailRecordsOrederCounter;
    readonly recordsOrderCheckedCounter: ProductionOrderDetailRecordsOrederCheckedCounter;
    readonly processStartDate: ProductionOrderProcessStartDate | null;
    readonly processEndDate: ProductionOrderDetailFinishDate | null;
    readonly state: ProductionOrderState;
    readonly countingRecordsOrderCheckedListId: CountingRecordsOrderId[];
    readonly countingRecordsOrderListId: CountingRecordsOrderId[];
    readonly administrativeEventList: CommonModificationEvent[]

    private _processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null;
    private _processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null;
    private _productionModulePlanned: ProductionOrderDetailProductionModulePlanned | null;

    constructor(
        productionOrderId: ProductionOrderId,
        colorId: ColorId,
        garmentSize: GarmentSize,
        ean: BarcodeEan,
        processStartDate: ProductionOrderProcessStartDate | null,
        processEndDate: ProductionOrderDetailFinishDate | null,
        processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null,
        processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null,
        productionModulePlanned: ProductionOrderDetailProductionModulePlanned | null,
        plannedAmount: ProductionOrderPlannedAmount,
        executedAmount: ProductionOrderExecutedAmount,
        state: ProductionOrderState,
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

        this._processEndDatePlanned = processEndDatePlanned;
        this._processStartDatePlanned = processStartDatePlanned;
        this._productionModulePlanned = productionModulePlanned;

        this.recordsOrderCounter = this.setInitialCountingRecordsOrderCounter(countingRecordsOrderListId);
        this.recordsOrderCheckedCounter = this.setInitialCountingRecordsOrderCheckedCounter(countingRecordsOrderCheckedListId);
    }

    public get processStartDatePlanned(): ProductionOrderProcessStartDate | null {
        return this._processStartDatePlanned;
    }

    public get processEndDatePlanned(): ProductionOrderProcessEndDatePlanned | null {
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
        processStartDate: ProductionOrderProcessStartDate | null,
        processEndDate: ProductionOrderDetailFinishDate | null,
        processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null,
        processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null,
        productionModulePlanned: ProductionOrderDetailProductionModulePlanned | null,
        plannedAmount: ProductionOrderPlannedAmount,
        executedAmount: ProductionOrderExecutedAmount,
        state: ProductionOrderState,
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

    updateProcessStartDatePlanned(params: { value: ProductionOrderProcessStartDatePlanned, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._processStartDatePlanned = new ProductionOrderProcessStartDatePlanned(value.value)
        }
    }

    updateProcessEndDatePlanned(params: { value: ProductionOrderProcessEndDatePlanned, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._processEndDatePlanned = new ProductionOrderProcessEndDatePlanned(value.value)
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
            data.processStartDate ? new ProductionOrderProcessStartDate(data.processStartDate) : null,
            data.processEndDate ? new ProductionOrderDetailFinishDate(data.processEndDate) : null,
            data.processStartDatePlanned ? new ProductionOrderProcessStartDatePlanned(data.processStartDatePlanned) : null,
            data.processEndDatePlanned ? new ProductionOrderProcessEndDatePlanned(data.processEndDatePlanned) : null,
            data.productionModulePlanned ? new ProductionOrderDetailProductionModulePlanned(data.productionModulePlanned) : null,
            new ProductionOrderPlannedAmount(data.plannedAmount),
            new ProductionOrderExecutedAmount(data.executedAmount),
            new ProductionOrderState(data.state),
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