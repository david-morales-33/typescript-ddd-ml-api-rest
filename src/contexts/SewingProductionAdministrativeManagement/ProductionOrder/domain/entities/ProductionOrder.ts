import { CommonModificationEvent } from "../../../../Shared/domain/entities/CommonModificationEvent";
import { EventId } from "../../../../Shared/domain/value-object/EventId";
import { ProductionOrderDetail } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetaill";
import { ProductionOrderDTO } from "../data-transfer-objects/ProductionOrderDTO";
import { ProductionOrderDetailListEmptyException } from "../exceptions/ProductionOrderDetailListEmptyException";
import { ProductionOrderRoot } from "../interfaces/ProductionOrderRoot";
import { ProductionOrderExecutedAmount } from "../../../../Shared/domain/value-object/ProductionOrderExecutedAmount";
import { ProductionOrderPlannedAmount } from "../../../../Shared/domain/value-object/ProductionOrderPlannedAmount";
import { ProductionOrderProcessEndDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDate";
import { ProductionOrderProcessEndDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDate";
import { ProductionOrderProcessStartDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderRecordsCheckedCounter } from "../value-objects/ProductionOrderRecordsCheckedCounter";
import { ProductionOrderRecordsCounter } from "../value-objects/ProductionOrderRecordsCounter";
import { ProductionOrderId } from '../../../../Shared/domain/value-object/ProductionOrderId'
import { ProductionOrderState } from "../../../../Shared/domain/value-object/ProductionOrderState";
import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { ReferenceId } from "../../../../Shared/domain/value-object/ReferenceId";

export class ProductionOrder implements ProductionOrderRoot {

    readonly productionOrderId: ProductionOrderId;
    readonly reference: ReferenceId;
    readonly openByUser: UserId;
    readonly productionOrderDetailList: ProductionOrderDetail[];
    readonly recordsOrderCounter: ProductionOrderRecordsCounter;
    readonly recordsOrderCheckedCounter: ProductionOrderRecordsCheckedCounter;
    readonly plannedAmount: ProductionOrderPlannedAmount;
    readonly executedAmount: ProductionOrderExecutedAmount;
    readonly processStartDate: ProductionOrderProcessStartDate | null;
    readonly processEndDate: ProductionOrderProcessEndDate | null;
    readonly administrativeEventList: CommonModificationEvent[]

    private _processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null;
    private _processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null;
    private _state: ProductionOrderState;

    constructor(
        productionOrderid: ProductionOrderId,
        reference: ReferenceId,
        processStartDate: ProductionOrderProcessStartDate | null,
        processEndDate: ProductionOrderProcessEndDate | null,
        processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null,
        processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null,
        openByUser: UserId,
        state: ProductionOrderState,
        productionOrderDetailList: ProductionOrderDetail[],
        administrativeEventList: CommonModificationEvent[]
    ) {
        this._processStartDatePlanned = processStartDatePlanned;
        this._processEndDatePlanned = processEndDatePlanned;
        this._state = state;

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

    public get state(): ProductionOrderState {
        return this._state;
    }

    static create(
        productionOrderid: ProductionOrderId,
        reference: ReferenceId,
        processStartDate: ProductionOrderProcessStartDate | null,
        processEndDate: ProductionOrderProcessEndDate | null,
        processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null,
        processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null,
        openByUser: UserId,
        state: ProductionOrderState,
        productionOrderDetailList: ProductionOrderDetail[],
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
            state,
            productionOrderDetailList,
            administrativeEventList
        );
    }

    private setInitialCountingRecordsOrderCounter(productionOrderDetailList: ProductionOrderDetail[]): ProductionOrderRecordsCounter {
        const counterList = productionOrderDetailList.map(element => element.countingRecordsOrderListId.length);
        let counterAmount = 0;

        counterList.forEach(element => {
            counterAmount = counterAmount + element;
        });

        return new ProductionOrderRecordsCounter(counterAmount);
    }

    private setInitialCountingRecordsOrderCheckedCounter(productionOrderDetailList: ProductionOrderDetail[]): ProductionOrderRecordsCheckedCounter {
        let counterAmount = 0;
        productionOrderDetailList.forEach(element => {
            counterAmount = counterAmount + element.countingRecordsOrderCheckedListId.length;
        });

        return new ProductionOrderRecordsCheckedCounter(counterAmount);
    }

    private setInitialPlannedAmount(productionOrderDetailList: ProductionOrderDetail[]): ProductionOrderPlannedAmount {
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

    updateState(params: { value: ProductionOrderState, event: CommonModificationEvent }) {
        const { value, event } = params;

        if (!this.hasAddedEvent(event.id) && this._state.value !== value.value) {
            this.addNewEvent(event);
            value.value ?
                this._state = this.state.setInTrue() :
                this._state = this.state.setInFalse();
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
            this.state.value,
            this.productionOrderDetailList.map(entry => { return entry.toPrimitives() }),
            this.administrativeEventList.map(entry => { return entry.toPrimitives() })
        )
    }

    static fromPrimitives(data: ProductionOrderDTO): ProductionOrder {
        return new ProductionOrder(
            new ProductionOrderId(data.productionOrderid),
            new ReferenceId(data.reference),
            data.processStartDate ? new ProductionOrderProcessStartDate(data.processStartDate) : null,
            data.processEndDate ? new ProductionOrderProcessEndDate(data.processEndDate) : null,
            data.processStartDatePlanned ? new ProductionOrderProcessStartDatePlanned(data.processStartDatePlanned) : null,
            data.processEndDatePlanned ? new ProductionOrderProcessEndDatePlanned(data.processEndDatePlanned) : null,
            new UserId(data.openByUser),
            new ProductionOrderState(data.state),
            data.productionOrderDetailList.map(entry => { return ProductionOrderDetail.fromPrimitives(entry) }),
            data.administrativeEventList.map(entry => { return CommonModificationEvent.fromPrimitives(entry) })
        )
    }
}
