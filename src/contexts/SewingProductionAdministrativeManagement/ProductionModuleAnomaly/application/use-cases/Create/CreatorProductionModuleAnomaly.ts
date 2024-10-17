import { Uuid } from "../../../../../Shared/domain/value-object/Uuid";
import { CommonCreationEvent } from "../../../../../Shared/domain/entities/CommonCreationEvent";
import { EventCreateDate } from "../../../../../Shared/domain/value-object/EventCreateDate";
import { EventDescription } from "../../../../../Shared/domain/value-object/EventDescription";
import { EventId } from "../../../../../Shared/domain/value-object/EventId";
import { ProductionModuleAnomaly } from "../../../domain/entities/ProductionModuleAnomaly";
import { ProductionModuleAnomalyCommandRepository } from "../../../domain/repositories/ProductionModuleAnomalyCommandRepository";
import { ProductionModuleAnomalyId } from "../../../domain/value-objects/ProductionModuleAnomalyId";
import { ProductionModuleAnomalyName } from "../../../domain/value-objects/ProductionModuleAnomalyName";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class CreatorProductionModuleAnomaly {
    constructor(private productionModuleAnomalyRepository: ProductionModuleAnomalyCommandRepository) { }
    async execute(params: {
        createBy: UserId,
        productionModuleAnomalyId: ProductionModuleAnomalyId,
        productionModuleAnomalyName: ProductionModuleAnomalyName
    }) {
        const { createBy, productionModuleAnomalyId, productionModuleAnomalyName } = params;

        const eventId = new EventId(Uuid.random().value);
        const creationDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Integración de nueva anormalidad');

        const creationEvent = CommonCreationEvent.create(
            eventId,
            createBy,
            creationDate,
            eventDescription
        );
        const productionModuleAnomaly = ProductionModuleAnomaly.create(
            productionModuleAnomalyId,
            productionModuleAnomalyName,
            [creationEvent]
        )

        await this.productionModuleAnomalyRepository.save(productionModuleAnomaly);
    }
}