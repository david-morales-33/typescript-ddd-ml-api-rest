import { CommonCreationEvent } from "../../../../../Shared/domain/entities/CommonCreationEvent";
import { EventCreateDate } from "../../../../../Shared/domain/value-object/EventCreateDate";
import { EventDescription } from "../../../../../Shared/domain/value-object/EventDescription";
import { EventId } from "../../../../../Shared/domain/value-object/EventId";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionOrder } from "../../../../ProductionOrder/domain/entities/ProductionOrder";
import { ProductionOrderCommandRepository } from "../../../../ProductionOrder/domain/repositories/ProductionOrderCommandRepository";
import { ProductionOrderReference } from "../../../../ProductionOrder/domain/value-objects/ProductionOrderReference";
import { Uuid } from "../../../../../Shared/domain/value-object/Uuid";


export class ProductionOrderDetailCreator {
    constructor(private productionOrderRepository: ProductionOrderCommandRepository) { }

    async execute(params: {
        createBy: UserId,
        reference: ProductionOrderReference,
        
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