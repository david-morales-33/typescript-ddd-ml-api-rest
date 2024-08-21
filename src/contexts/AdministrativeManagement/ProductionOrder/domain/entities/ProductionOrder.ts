import { CommonModificationEvent } from "../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { EventId } from "../../../AdministrativeEvent/domain/value-objects/EventId";
import { UserId } from "../../../User/domain/value-objects/UserId";
import { ProductionOrderDTO } from "../data-transfer-objects/ProductionOrderDTO";
import { ProductionOrderDetailListEmptyException } from "../exceptions/ProductionOrderDetailListEmptyException";
import { ProductionOrderRoot } from "../interfaces/ProductionOrderRoot";
import { ProductionOrderExecutedAmount } from "../value-objects/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "../value-objects/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "../value-objects/ProductionOrderPlannedAmount";
import { ProductionOrderProcessEndDate } from "../value-objects/ProductionOrderProcessEndDate";
import { ProductionOrderProcessEndDatePlanned } from "../value-objects/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDate } from "../value-objects/ProductionOrderProcessStartDate";
import { ProductionOrderProcessStartDatePlanned } from "../value-objects/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderRecordsCheckedCounter } from "../value-objects/ProductionOrderRecordsCheckedCounter";
import { ProductionOrderRecordsCounter } from "../value-objects/ProductionOrderRecordsCounter";
import { ProductionOrderReference } from "../value-objects/ProductionOrderReference";

export class ProductionOrder implements ProductionOrderRoot {

    readonly productionOrderId: ProductionOrderId;
    readonly reference: ProductionOrderReference;
    readonly openByUser: UserId;
    readonly productionOrderDetailList: [];
    readonly recordsOrderCounter: ProductionOrderRecordsCounter;
    readonly recordsOrderCheckedCounter: ProductionOrderRecordsCheckedCounter;
    readonly plannedAmount: ProductionOrderPlannedAmount;
    readonly executedAmount: ProductionOrderExecutedAmount;
    readonly processStartDate: ProductionOrderProcessStartDate | null;
    readonly processEndDate: ProductionOrderProcessEndDate | null;
    readonly administrativeEventList: CommonModificationEvent[]

    private _processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null;
    private _processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null;

    constructor(
        productionOrderid: ProductionOrderId,
        reference: ProductionOrderReference,
        processStartDate: ProductionOrderProcessStartDate | null,
        processEndDate: ProductionOrderProcessEndDate | null,
        processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null,
        processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null,
        openByUser: UserId,
        productionOrderDetailList: [],
        administrativeEventList: CommonModificationEvent[]
    ) {
        this._processStartDatePlanned = processStartDatePlanned;
        this._processEndDatePlanned = processEndDatePlanned;

        if (productionOrderDetailList.length === 0)
            throw new ProductionOrderDetailListEmptyException(productionOrderid)

        this.administrativeEventList = administrativeEventList;
        this.productionOrderDetailList = productionOrderDetailList;
        this.productionOrderId = productionOrderid;
        this.processStartDate = processStartDate;
        this.processEndDate = processEndDate;
        this.openByUser = openByUser;
        this.reference = reference;
        this.recordsOrderCheckedCounter = this.setInitialCountingRecordsOrderCheckedCounter(productionOrderDetailList);
        this.recordsOrderCounter = this.setInitialCountingRecordsOrderCounter(productionOrderDetailList);
        this.executedAmount = this.setInitialExecutedAmount(productionOrderDetailList);
        this.plannedAmount = this.setInitialPlannedAmount(productionOrderDetailList);
    }

    public get processStartDatePlanned(): ProductionOrderProcessStartDatePlanned | null {
        return this._processStartDatePlanned;
    }

    public get processEndDatePlanned(): ProductionOrderProcessEndDatePlanned | null {
        return this._processEndDatePlanned;
    }

    static create(
        productionOrderid: ProductionOrderId,
        reference: ProductionOrderReference,
        processStartDate: ProductionOrderProcessStartDate | null,
        processEndDate: ProductionOrderProcessEndDate | null,
        processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null,
        processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null,
        openByUser: UserId,
        productionOrderDetailList: [],
        administrativeEventList: CommonModificationEvent[]
    ): ProductionOrder {

        return new ProductionOrder(
            productionOrderid,
            reference,
            processStartDate,
            processEndDate,
            processStartDatePlanned,
            processEndDatePlanned,
            openByUser,
            productionOrderDetailList,
            administrativeEventList
        );
    }

    private setInitialCountingRecordsOrderCounter(productionOrderDetailList: any[]): ProductionOrderRecordsCounter {
        const counterList = productionOrderDetailList.map(element => element.countingRecordsOrderListId.length);
        let counterAmount = 0;

        counterList.forEach(element => {
            counterAmount = counterAmount + element;
        });

        return new ProductionOrderRecordsCounter(counterAmount);
    }

    private setInitialCountingRecordsOrderCheckedCounter(productionOrderDetailList: any[]): ProductionOrderRecordsCheckedCounter {
        let counterAmount = 0;
        return new ProductionOrderRecordsCheckedCounter(counterAmount);
    }

    private setInitialPlannedAmount(productionOrderDetailList: any[]): ProductionOrderPlannedAmount {
        let plannedAmount = 0;
        productionOrderDetailList.forEach(element => {
            plannedAmount = plannedAmount + element.plannedAmount.value;
        });
        return new ProductionOrderPlannedAmount(plannedAmount);
    }

    private setInitialExecutedAmount(productionOrderDetailList: any[]): ProductionOrderExecutedAmount {
        let executedAmount = 0;
        productionOrderDetailList.forEach(element => {
            executedAmount = executedAmount + element.executedAmount.value;
        });
        return new ProductionOrderExecutedAmount(executedAmount);
    }

    updateProcessStartDatePlanned(params: { value: ProductionOrderProcessStartDatePlanned, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._processStartDatePlanned = new ProductionOrderProcessStartDatePlanned(value.value)
        }
    }

    updateProcessEndDatePlanned(params: { value: ProductionOrderProcessStartDatePlanned, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._processEndDatePlanned = new ProductionOrderProcessEndDatePlanned(value.value)
        }
    }

    private addNewEvent(event: CommonModificationEvent): void {
        this.administrativeEventList.push(event);
    }

    private hasAddedEvent(eventId: EventId) {
        const eventFound = this.administrativeEventList.find(elemente => elemente.id.value === eventId.value);
        return eventFound !== undefined;
    }


    toPrimitives(): ProductionOrderDTO {
        return new ProductionOrderDTO(
            this.productionOrderId.value,
            this.reference.value,
            this.plannedAmount.value,
            this.executedAmount.value,
            this.processStartDate ? this.processStartDate.value : null,
            this.processEndDate ? this.processEndDate.value : null,
            this.processStartDatePlanned ? this.processStartDatePlanned.value : null,
            this.processEndDatePlanned ? this.processEndDatePlanned.value : null,
            this.recordsOrderCounter.value,
            this.recordsOrderCheckedCounter.value,
            this.openByUser.value,
            [],
            this.administrativeEventList.map(entry => { return entry.toPrimitives() })
        )
    }

    static fromPrimitives(data: ProductionOrderDTO): ProductionOrder {
        return new ProductionOrder(
            new ProductionOrderId(data.productionOrderid),
            new ProductionOrderReference(data.reference),
            data.processStartDate ? new ProductionOrderProcessStartDate(data.processStartDate) : null,
            data.processEndDate ? new ProductionOrderProcessEndDate(data.processEndDate) : null,
            data.processStartDatePlanned ? new ProductionOrderProcessStartDatePlanned(data.processStartDatePlanned) : null,
            data.processEndDatePlanned ? new ProductionOrderProcessEndDatePlanned(data.processEndDatePlanned) : null,
            new UserId(data.openByUser),
            [],
            data.administrativeEventList.map(entry => { return CommonModificationEvent.fromPrimitives(entry) }
            )
        )
    }
}
