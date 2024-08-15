import { CommonCreationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonCreationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionModuleAnomaly } from "../../../domain/entities/ProductionModuleAnomaly";
import { ProductionModuleAnomalyRepository } from "../../../domain/repositories/ProductionModuleAnomalyRepository";
import { ProductionModuleAnomalyId } from "../../../domain/value-objects/ProductionModuleAnomalyId";
import { ProductionModuleAnomalyName } from "../../../domain/value-objects/ProductionModuleAnomalyName";


export class CreatorProductionModuleAnomaly {
    constructor(private productionModuleAnomalyRepository: ProductionModuleAnomalyRepository) { }
    async execute(params: {
        createBy: UserId,
        productionModuleAnomalyId: ProductionModuleAnomalyId,
        productionModuleAnomalyName: ProductionModuleAnomalyName
    }) {
        const { createBy, productionModuleAnomalyId, productionModuleAnomalyName } = params;

        const eventId = new EventId(0);
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