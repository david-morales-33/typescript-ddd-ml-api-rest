import { Uuid } from "../../../../../Shared/domain/value-object/Uuid";
import { CommonModificationEvent } from "../../../../../Shared/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../../Shared/domain/value-object/EventCreateDate";
import { EventDescription } from "../../../../../Shared/domain/value-object/EventDescription";
import { EventId } from "../../../../../Shared/domain/value-object/EventId";
import { EventModifiedField } from "../../../../../Shared/domain/value-object/EventModifiedField";
import { EventNewValue } from "../../../../../Shared/domain/value-object/EventNewValue";
import { EventPreviusValue } from "../../../../../Shared/domain/value-object/EventPreviusValue";
import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderCommandRepository } from "../../../domain/repositories/ProductionOrderCommandRepository";
import { ProductionOrderQueryRepository } from "../../../domain/repositories/ProductionOrderQueryRepository";
import { ProductionOrderProcessEndDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderNotFoundException } from "../../exceptions/ProductionOrderNotFoundException";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class ProductionOrderSetterPlannedDates {
    constructor(
        private productionOrderQueryRepository: ProductionOrderQueryRepository,
        private productionOrderCommandRepository: ProductionOrderCommandRepository
    ) { }

    async execute(params: {
        productionOrderId: ProductionOrderId,
        processStartDatePlanned: ProductionOrderProcessStartDatePlanned,
        processEndDatePlanned: ProductionOrderProcessEndDatePlanned,
        setBy: UserId
    }) {

        const { productionOrderId, processEndDatePlanned, processStartDatePlanned, setBy } = params;

        const productionOrder = await this.productionOrderQueryRepository.find(productionOrderId);

        if (productionOrder === null)
            throw new ProductionOrderNotFoundException(productionOrderId);

        const eventId = new EventId(Uuid.random().value);
        const eventCreateDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Asignación de fecha de ejecución');
        const modifiedField = new EventModifiedField('nombre');
        const previusValue = new EventPreviusValue('No asigando');

        const newStartPlannedDate = new EventNewValue(processStartDatePlanned.value.toDateString());
        const newEndPlannedDate = new EventNewValue(processEndDatePlanned.value.toDateString());

        const setStartPlannedDateEvent = CommonModificationEvent.create(
            eventId,
            setBy,
            eventCreateDate,
            eventDescription,
            modifiedField,
            previusValue,
            newStartPlannedDate
        );

        const setEndPlannedDateEvent = CommonModificationEvent.create(
            eventId,
            setBy,
            eventCreateDate,
            eventDescription,
            modifiedField,
            previusValue,
            newEndPlannedDate
        );

        productionOrder.updateProcessStartDatePlanned({
            value: processStartDatePlanned,
            event: setStartPlannedDateEvent
        });

        productionOrder.updateProcessEndDatePlanned({
            value: processEndDatePlanned,
            event: setEndPlannedDateEvent
        });

        await this.productionOrderCommandRepository.save(productionOrder);

    }
}