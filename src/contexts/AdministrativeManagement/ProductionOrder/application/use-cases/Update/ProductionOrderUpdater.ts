import { CommonModificationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { EventModifiedField } from "../../../../AdministrativeEvent/domain/value-objects/EventModifiedField";
import { EventNewValue } from "../../../../AdministrativeEvent/domain/value-objects/EventNewValue";
import { EventPreviusValue } from "../../../../AdministrativeEvent/domain/value-objects/EventPreviusValue";
import { ProductionOrderId } from "../../../../shared/domain/value-objects/ProductionOrderId";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionOrderCommandRepository } from "../../../domain/repositories/ProductionOrderCommandRepository";
import { ProductionOrderQueryRepository } from "../../../domain/repositories/ProductionOrderQueryRepository";
import { ProductionOrderProcessEndDatePlanned } from "../../../domain/value-objects/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../domain/value-objects/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderState } from "../../../domain/value-objects/ProductionOrderState";
import { ProductionOrderNotFoundException } from "../../exceptions/ProductionOrderNotFoundException";

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
            const eventId = new EventId(1);
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
            const eventId = new EventId(2);
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
            const eventId = new EventId(3);
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