import { Uuid } from "../../../../../Shared/domain/value-object/Uuid";
import { CommonModificationEvent } from "../../../../../Shared/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../../Shared/domain/value-object/EventCreateDate";
import { EventDescription } from "../../../../../Shared/domain/value-object/EventDescription";
import { EventId } from "../../../../../Shared/domain/value-object/EventId";
import { EventModifiedField } from "../../../../../Shared/domain/value-object/EventModifiedField";
import { EventNewValue } from "../../../../../Shared/domain/value-object/EventNewValue";
import { EventPreviusValue } from "../../../../../Shared/domain/value-object/EventPreviusValue";
import { ColorId } from "../../../../../Shared/domain/value-object/ColorId";
import { ColorCommandRepository } from "../../../domain/repositories/ColorCommandRepository";
import { ColorQueryRepository } from "../../../domain/repositories/ColorQueryRepository";
import { ColorLabel } from "../../../domain/value-objects/ColorLabel";
import { ColorState } from "../../../domain/value-objects/ColorState";
import { ColorNotFoundException } from "../../exceptions/ColorNotFoundException";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class ColorUpdater {
    constructor(
        private colorQueryRepository: ColorQueryRepository,
        private colorCommandRepository: ColorCommandRepository,
    ) { }

    async execute(params: {
        updateBy: UserId,
        colorId: ColorId,
        newLabel: ColorLabel | null,
        newState: ColorState | null
    }) {

        const { updateBy, colorId, newLabel, newState } = params;

        const color = await this.colorQueryRepository.find(colorId);

        if (color === null)
            throw new ColorNotFoundException(colorId);

        const eventCreateDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Actualización de color');

        if (newLabel !== null) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Etiqueta');
            const previusValue = new EventPreviusValue(color.label.value);
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

            color.updateLabel({
                value: newLabel,
                event
            })
        }

        if (newState !== null) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Etiqueta');
            const previusValue = new EventPreviusValue(color.state.value ? 'Habilitado' : 'Deshabilitado');
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

            color.updateState({
                value: newState,
                event
            })
        }

        await this.colorCommandRepository.save(color);
    }
}