import { CommonModificationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { EventModifiedField } from "../../../../AdministrativeEvent/domain/value-objects/EventModifiedField";
import { EventNewValue } from "../../../../AdministrativeEvent/domain/value-objects/EventNewValue";
import { EventPreviusValue } from "../../../../AdministrativeEvent/domain/value-objects/EventPreviusValue";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionModuleRepository } from "../../../domain/repositories/ProductionModuleRepository";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleMachineAmount } from "../../../domain/value-objects/ProductionModuleMachineAmount";
import { ProductionModuleState } from "../../../domain/value-objects/ProductionModuleState";
import { ProductionModuleSupervisorId } from "../../../domain/value-objects/ProductionModuleSupervisorId";
import { ProductionModuleNotFoundException } from "../../exceptions/ProductionModuleNotFoundException";

export class ProductionModuleUpdater {
    constructor(private productionModuleRepository: ProductionModuleRepository) { }

    async execute(params: {
        productionModuleId: ProductionModuleId,
        newCurrentSupervisor: ProductionModuleSupervisorId | null,
        newMachineAmount: ProductionModuleMachineAmount | null,
        newState: ProductionModuleState | null,
        newOperationState: ProductionModuleState | null,
        updateBy: UserId
    }) {

        const { newCurrentSupervisor, newMachineAmount, newOperationState, newState, productionModuleId, updateBy } = params;

        const productionModule = await this.productionModuleRepository.find(productionModuleId)

        if (productionModule === null)
            throw new ProductionModuleNotFoundException(productionModuleId)

        const eventId = new EventId(0);
        const eventCreateDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Actualización de usuario');

        if (newCurrentSupervisor !== null) {
            const modifiedField = new EventModifiedField('supervisor');
            const previusValue = new EventPreviusValue(!productionModule.currentSupervisorId ? 'null' : productionModule.currentSupervisorId.value);
            const newValue = new EventNewValue(newCurrentSupervisor.value);
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );

            productionModule.updateCurrentSupervisor({
                value: newCurrentSupervisor,
                event: event
            })
        }

        if (newMachineAmount !== null) {
            const modifiedField = new EventModifiedField('cantidad de maquina');
            const previusValue = new EventPreviusValue(!productionModule.machineAmount ? 'Sin valor asignado' : productionModule.machineAmount.value.toString());
            const newValue = new EventNewValue(newMachineAmount.value.toString());
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );

            productionModule.updateMachineAmount({
                value: newMachineAmount,
                event: event
            })
        }

        if (newOperationState !== null) {
            const modifiedField = new EventModifiedField('Estado de operación');
            const previusValue = new EventPreviusValue(!productionModule.currentOperationState ? 'Sin valor asignado' : newOperationState.value ? 'En proceso' : 'Detenido');
            const newValue = new EventNewValue(newOperationState.value ? 'En proceso' : 'Detenido');
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );

            productionModule.updateCurrentOperationState({
                value: newOperationState,
                event: event
            })
        }

        if (newState !== null) {
            const modifiedField = new EventModifiedField('supervisor');
            const previusValue = new EventPreviusValue(!productionModule.state ? 'No Asignado' : productionModule.state ? 'Habilitado' : 'Deshabilitado');
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

            productionModule.updateState({
                value: newState,
                event: event
            })
        }

        await this.productionModuleRepository.save(productionModule);

    }
}