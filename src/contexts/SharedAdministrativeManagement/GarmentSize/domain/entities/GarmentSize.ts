import { CommonCreationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonModificationEventDTO";
import { CommonCreationEvent } from "../../../../Shared/domain/entities/CommonCreationEvent";
import { CommonModificationEvent } from "../../../../Shared/domain/entities/CommonModificationEvent";
import { EventId } from "../../../../Shared/domain/value-object/EventId";
import { GarmentSizeDTO } from "../data-transfer-objects/GarmentSizeDTO";
import { GarmentSizeRoot } from "../interfaces/GarmentSizeRoot";
import { GarmentSizeLabel } from "../value-objects/GarmentSizeLabel";
import { GarmentSizeOrder } from "../value-objects/GarmentSizeOrder";
import { GarmentSizeState } from "../value-objects/GarmentSizeState";
import { GarmentSizeType } from "../value-objects/GarmentSizeType";
import { GarmentSize as GarmentSizeId} from '../../../../Shared/domain/value-object/GarmentSize'

export class GarmentSize implements GarmentSizeRoot {

    readonly id: GarmentSizeId;
    readonly eventList: (CommonModificationEvent | CommonCreationEvent)[];

    private _label: GarmentSizeLabel;
    private _garmentType: GarmentSizeType;
    private _order: GarmentSizeOrder;
    private _state: GarmentSizeState;

    constructor(
        id: GarmentSizeId,
        label: GarmentSizeLabel,
        garmentType: GarmentSizeType,
        order: GarmentSizeOrder,
        state: GarmentSizeState,
        eventList: (CommonModificationEvent | CommonCreationEvent)[]
    ) {
        this.id = id;
        this.eventList = eventList;
        this._label = label;
        this._garmentType = garmentType;
        this._order = order;
        this._state = state;
    }

    public get label() {
        return this._label;
    }

    public get garmentType() {
        return this._garmentType;
    }

    public get order() {
        return this._order;
    }

    public get state() {
        return this._state;
    }

    static create(
        id: GarmentSizeId,
        label: GarmentSizeLabel,
        garmentType: GarmentSizeType,
        order: GarmentSizeOrder,
        state: GarmentSizeState,
        administrativeEventList: (CommonModificationEvent | CommonCreationEvent)[]
    ): GarmentSize {
        return new GarmentSize(id, label, garmentType, order, state, administrativeEventList)
    }

    updateGarmentType(params: { value: GarmentSizeType, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._garmentType = this._garmentType.setValue(value.value)
        }
    }

    updateLabel(params: { value: GarmentSizeLabel, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._label = this._label.setValue(value.value)
        }
    }

    updateState(params: { value: GarmentSizeState, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._state = this._state.setValue(value.value)
        }
    }

    updateOrder(params: { value: GarmentSizeOrder, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._order = this._order.setValue(value.value)
        }
    }

    private addNewEvent(event: CommonModificationEvent): void {
        this.eventList.push(event);
    }

    private hasAddedEvent(eventId: EventId) {
        const eventFound = this.eventList.find(elemente => elemente.id.value === eventId.value);
        return eventFound !== undefined;
    }

    static fromPrimitives(data: GarmentSizeDTO): GarmentSize {
        return new GarmentSize(
            new GarmentSizeId(data.id),
            new GarmentSizeLabel(data.label),
            new GarmentSizeType(data.garmentType),
            new GarmentSizeOrder(data.order),
            new GarmentSizeState(data.state),
            data.administrativeEventList.map(entry => {
                if (entry.className === 'CreationEvent.commonDTO')
                    return CommonCreationEvent.fromPrimitives(entry as CommonCreationEventDTO)
                return CommonModificationEvent.fromPrimitives(entry as CommonModificationEventDTO)
            })
        )
    }

    toPrimitives(): GarmentSizeDTO {
        return new GarmentSizeDTO(
            this.id.value,
            this.label.value,
            this.garmentType.value,
            this.order.value,
            this.state.value,
            this.eventList.map(entry => { return entry.toPrimitives() })
        )
    }
}