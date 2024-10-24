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
import { ProductionOrderState } from "../../../../../Shared/domain/value-object/ProductionOrderState";
import { ProductionOrderNotFoundException } from "../../exceptions/ProductionOrderNotFoundException";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class ProductionOrderUpdater {
    constructor(
        private produdtionOrderQueryRepository: ProductionOrderQueryRepository,
        private productionOrderCommandRepository: ProductionOrderCommandRepository
    ) { }

    async execute(params: {
        productionOrderId: ProductionOrderId;
        processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null;
        processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null;
        state: ProductionOrderState | null;
        updateBy: UserId
    }) {
        const { productionOrderId, processEndDatePlanned, processStartDatePlanned, state, updateBy } = params;

        const productionOrder = await this.produdtionOrderQueryRepository.find(productionOrderId);

        if (productionOrder === null)
            throw new ProductionOrderNotFoundException(productionOrderId);

        const eventCreateDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Actualización de OP');

        if (processStartDatePlanned !== null) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Fecha planeada para inicio de proceso');
            const previusValue = new EventPreviusValue(
                productionOrder.processStartDatePlanned === null ?
                    'Sin asignar' : productionOrder.processStartDatePlanned.value.toLocaleString()
            );
            const newValue = new EventNewValue(processStartDatePlanned.value.toLocaleString());
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );

            productionOrder.updateProcessStartDatePlanned({
                value: processStartDatePlanned,
                event
            });
        }

        if (processEndDatePlanned !== null) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Fecha planeada para finalización de proceso');
            const previusValue = new EventPreviusValue(
                productionOrder.processEndDatePlanned === null ?
                    'Sin asignar' : productionOrder.processEndDatePlanned.value.toLocaleString()
            );
            const newValue = new EventNewValue(processEndDatePlanned.value.toLocaleString());
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );

            productionOrder.updateProcessEndDatePlanned({
                value: processEndDatePlanned,
                event
            });
        }

        if (state !== null) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Estado');
            const previusValue = new EventPreviusValue(productionOrder.state ? 'Habilitado' : 'Deshabilitado');
            const newValue = new EventNewValue(state.value ? 'Habilitado' : 'Deshabilitado');
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );

            productionOrder.updateState({
                value: state,
                event
            });
        }

        await this.productionOrderCommandRepository.save(productionOrder);
    }
}