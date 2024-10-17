import { CommonCreationEvent } from "../../../../../Shared/domain/entities/CommonCreationEvent";
import { EventCreateDate } from "../../../../../Shared/domain/value-object/EventCreateDate";
import { EventDescription } from "../../../../../Shared/domain/value-object/EventDescription";
import { EventId } from "../../../../../Shared/domain/value-object/EventId";
import { ProductionOrder } from "../../../../ProductionOrder/domain/entities/ProductionOrder";
import { ProductionOrderCommandRepository } from "../../../../ProductionOrder/domain/repositories/ProductionOrderCommandRepository";
import { Uuid } from "../../../../../Shared/domain/value-object/Uuid";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { ReferenceId } from "../../../../../Shared/domain/value-object/ReferenceId";


export class ProductionOrderDetailCreator {
    constructor(private productionOrderRepository: ProductionOrderCommandRepository) { }

    async execute(params: {
        createBy: UserId,
        reference: ReferenceId,
        
    }) {
        const { createBy } = params;

        const eventId = new EventId(Uuid.random().value);
        const creationDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Creación de OP');

        const creationEvent = CommonCreationEvent.create(
            eventId,
            createBy,
            creationDate,
            eventDescription
        );


        // const productionOrder = ProductionOrder.create()
    }
}