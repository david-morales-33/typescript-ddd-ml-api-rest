import { CommonCreationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonModificationEventDTO";
import { CommonCreationEvent } from "../../../../Shared/domain/entities/CommonCreationEvent";
import { CommonModificationEvent } from "../../../../Shared/domain/entities/CommonModificationEvent";
import { EventId } from "../../../../Shared/domain/value-object/EventId";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { ColorDTO } from "../data-transfer-objects/ColorDTO";
import { ColorRoot } from "../interfaces/ColorRoot";
import { ColorState } from "../value-objects/ColorState";
import { ColorLabel } from "../../../../Shared/domain/value-object/ColorLabel";

export class Color implements ColorRoot {
    readonly id: ColorId;
    readonly administrativeEventList: (CommonModificationEvent | CommonCreationEvent)[];
    private _label: ColorLabel;
    private _state: ColorState;

    constructor(
        id: ColorId,
        label: ColorLabel,
        state: ColorState,
        administrativeEventList: (CommonModificationEvent | CommonCreationEvent)[]
    ) {
        this.id = id;
        this.administrativeEventList = administrativeEventList;
        this._label = label;
        this._state = state;
    }

    public get label(): ColorLabel {
        return this._label;
    }

    public get state(): ColorState {
        return this._state;
    }

    static create(
        id: ColorId,
        label: ColorLabel,
        state: ColorState,
        eventList: (CommonModificationEvent | CommonCreationEvent)[]
    ) {
        return new Color(id, label, state, eventList)
    }

    updateLabel(params: { value: ColorLabel, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._label = new ColorLabel(value.value)
        }
    }

    updateState(params: { value: ColorState, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            if (this.state.value === value.value)
                throw new Error(`The Color State has already been set to <${value.value}>`)
            if (value.value)
                this._state = this.state.setInTrue();
            else
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

    static fromPrimitives(data: ColorDTO) {
        return new Color(
            new ColorId(data.id),
            new ColorLabel(data.label),
            new ColorState(data.state),
            data.administrativeEventList.map(entry => {
                if (entry.className === 'CreationEvent.commonDTO')
                    return CommonCreationEvent.fromPrimitives(entry as CommonCreationEventDTO)
                return CommonModificationEvent.fromPrimitives(entry as CommonModificationEventDTO)
            })
        )
    }

    toPrimitives(): ColorDTO {
        return new ColorDTO(
            this.id.value,
            this.label.value,
            this.state.value,
            this.administrativeEventList.map(entry => entry.toPrimitives())
        )
    }
}