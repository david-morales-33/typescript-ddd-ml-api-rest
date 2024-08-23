import { CommonModificationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { EventModifiedField } from "../../../../AdministrativeEvent/domain/value-objects/EventModifiedField";
import { EventNewValue } from "../../../../AdministrativeEvent/domain/value-objects/EventNewValue";
import { EventPreviusValue } from "../../../../AdministrativeEvent/domain/value-objects/EventPreviusValue";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { GarmentSizeRepository } from "../../../domain/repositories/GarmentSizeRepository";
import { GarmentSizeId } from "../../../domain/value-objects/GarmentSizeId";
import { GarmentSizeLabel } from "../../../domain/value-objects/GarmentSizeLabel";
import { GarmentSizeOrder } from "../../../domain/value-objects/GarmentSizeOrder";
import { GarmentSizeState } from "../../../domain/value-objects/GarmentSizeState";
import { GarmentSizeType } from "../../../domain/value-objects/GarmentSizeType";
import { GarmentSizeNotFoundException } from "../../exceptions/GarmentSizeNotFoundException";

export class GarmentSizeUpdater {
    constructor(private garmentSizeRepository: GarmentSizeRepository) { }

    async execute(params: {
        garmentSizeId: GarmentSizeId,
        newLabel: GarmentSizeLabel | null,
        newType: GarmentSizeType | null,
        newOrder: GarmentSizeOrder | null,
        newState: GarmentSizeState | null,
        updateBy: UserId
    }) {
        const { updateBy, garmentSizeId, newLabel, newOrder, newState, newType } = params;

        const garmentSize = await this.garmentSizeRepository.find(garmentSizeId);

        if (garmentSize === null)
            throw new GarmentSizeNotFoundException(garmentSizeId);

        const eventId = new EventId(0);
        const eventCreateDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Actualización de talla');

        if (newLabel !== null) {
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

        await this.garmentSizeRepository.save(garmentSize);
    }
}