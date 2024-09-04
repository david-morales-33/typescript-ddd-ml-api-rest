import { CommonModificationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { EventModifiedField } from "../../../../AdministrativeEvent/domain/value-objects/EventModifiedField";
import { EventNewValue } from "../../../../AdministrativeEvent/domain/value-objects/EventNewValue";
import { EventPreviusValue } from "../../../../AdministrativeEvent/domain/value-objects/EventPreviusValue";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionOrderCommandRepository } from "../../../domain/repositories/ProductionOrderCommandRepository";
import { ProductionOrderQueryRepository } from "../../../domain/repositories/ProductionOrderQueryRepository";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderProcessEndDatePlanned } from "../../../domain/value-objects/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../domain/value-objects/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderNotFoundException } from "../../exceptions/ProductionOrderNotFoundException";

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

        const eventId = new EventId(0);
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