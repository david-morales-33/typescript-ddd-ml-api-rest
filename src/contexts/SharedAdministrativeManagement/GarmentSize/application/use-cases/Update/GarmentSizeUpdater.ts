import { Uuid } from "../../../../../Shared/domain/value-object/Uuid";
import { CommonModificationEvent } from "../../../../../Shared/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../../Shared/domain/value-object/EventCreateDate";
import { EventDescription } from "../../../../../Shared/domain/value-object/EventDescription";
import { EventId } from "../../../../../Shared/domain/value-object/EventId";
import { EventModifiedField } from "../../../../../Shared/domain/value-object/EventModifiedField";
import { EventNewValue } from "../../../../../Shared/domain/value-object/EventNewValue";
import { EventPreviusValue } from "../../../../../Shared/domain/value-object/EventPreviusValue";
import { GarmentSizeCommandRepository } from "../../../domain/repositories/GarmentSizeCommandRepository";
import { GarmentSizeQueryRepository } from "../../../domain/repositories/GarmentSizeQueryRepository";
import { GarmentSizeLabel } from "../../../domain/value-objects/GarmentSizeLabel";
import { GarmentSizeOrder } from "../../../domain/value-objects/GarmentSizeOrder";
import { GarmentSizeState } from "../../../domain/value-objects/GarmentSizeState";
import { GarmentSizeType } from "../../../domain/value-objects/GarmentSizeType";
import { GarmentSizeNotFoundException } from "../../exceptions/GarmentSizeNotFoundException";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { GarmentSize as GarmentSizeId } from "../../../../../Shared/domain/value-object/GarmentSize";

export class GarmentSizeUpdater {
    constructor(
        private garmentSizeQueryRepository: GarmentSizeQueryRepository,
        private garmentSizeCommandRepository: GarmentSizeCommandRepository,
    ) { }

    async execute(params: {
        garmentSizeId: GarmentSizeId,
        newLabel: GarmentSizeLabel | null,
        newType: GarmentSizeType | null,
        newOrder: GarmentSizeOrder | null,
        newState: GarmentSizeState | null,
        updateBy: UserId
    }) {
        const { updateBy, garmentSizeId, newLabel, newOrder, newState, newType } = params;

        const garmentSize = await this.garmentSizeQueryRepository.find(garmentSizeId);

        if (garmentSize === null)
            throw new GarmentSizeNotFoundException(garmentSizeId);

        const eventCreateDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Actualización de talla');

        if (newLabel !== null) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Etiqueta de la talla');
            const previusValue = new EventPreviusValue(garmentSize.label.value);
            const newValue = new EventNewValue(newLabel.value);
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );

            garmentSize.updateLabel({
                value: newLabel,
                event
            })
        }

        if (newType !== null) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Tipo de talla');
            const previusValue = new EventPreviusValue(garmentSize.garmentType.value);
            const newValue = new EventNewValue(newType.value);
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );
            garmentSize.updateGarmentType({
                value: newType,
                event
            })
        }

        if (newOrder !== null) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Orden');
            const previusValue = new EventPreviusValue(garmentSize.order.value.toString());
            const newValue = new EventNewValue(newOrder.value.toString());
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );
            garmentSize.updateOrder({
                value: newOrder,
                event
            })
        }

        if (newState !== null) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Estado de la talla');
            const previusValue = new EventPreviusValue(garmentSize.state.value ? 'Habilitado' : 'Deshabilitado');
            const newValue = new EventNewValue(newState.value ? 'Habilitado' : 'Deshabilitado');
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );
            garmentSize.updateState({
                value: newState,
                event
            })
        }

        await this.garmentSizeCommandRepository.save(garmentSize);
    }
}