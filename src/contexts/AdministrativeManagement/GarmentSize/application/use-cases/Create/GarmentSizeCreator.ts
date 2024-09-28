import { Uuid } from "../../../../../Shared/domain/value-object/Uuid";
import { CommonCreationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonCreationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { GarmentSize } from "../../../domain/entities/GarmentSize";
import { GarmentSizeCommandRepository } from "../../../domain/repositories/GarmentSizeCommandRepository";
import { GarmentSizeId } from "../../../domain/value-objects/GarmentSizeId";
import { GarmentSizeLabel } from "../../../domain/value-objects/GarmentSizeLabel";
import { GarmentSizeOrder } from "../../../domain/value-objects/GarmentSizeOrder";
import { GarmentSizeState } from "../../../domain/value-objects/GarmentSizeState";
import { GarmentSizeType } from "../../../domain/value-objects/GarmentSizeType";

export class GarmentSizeCreator {
    constructor(private garmentSizeRepository: GarmentSizeCommandRepository) { }

    async execute(params: {
        garmentSizeId: GarmentSizeId,
        garmentSizeLabel: GarmentSizeLabel,
        garmentSizeType: GarmentSizeType,
        garmentSizeOrder: GarmentSizeOrder,
        createBy: UserId
    }) {
        const { garmentSizeOrder, garmentSizeId, garmentSizeLabel, garmentSizeType, createBy } = params;

        const eventId = new EventId(Uuid.random().value);
        const creationDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Creación de usuario');

        const garmentSizeState = new GarmentSizeState(true);

        const creationEvent = CommonCreationEvent.create(
            eventId,
            createBy,
            creationDate,
            eventDescription
        );

        const garmentSize = GarmentSize.create(
            garmentSizeId,
            garmentSizeLabel,
            garmentSizeType,
            garmentSizeOrder,
            garmentSizeState,
            [creationEvent]
        )

        await this.garmentSizeRepository.save(garmentSize);
    }
}