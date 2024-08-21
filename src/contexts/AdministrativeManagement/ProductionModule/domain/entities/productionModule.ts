import { ProductionModuleId } from "../value-objects/ProductionModuleId";
import { ProductionModuleSewingWorkerId } from "../value-objects/ProductionModuleSewingWorkerId";
import { ProductionModuleSewingWorkerCounter } from "../value-objects/ProductionModuleSewingWorkerAmount";
import { ProductionModuleState } from "../value-objects/ProductionModuleState";
import { ProductionModuleSupervisorId } from "../value-objects/ProductionModuleSupervisorId";
import { CommonCreationEvent } from "../../../AdministrativeEvent/domain/entities/CommonCreationEvent";
import { CommonModificationEvent } from "../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { ProductionModuleCreationDate } from "../value-objects/ProductionModuleCreationDate";
import { ProductionModuleCreateBy } from "../value-objects/ProductionModuleCreateBy";
import { ProductionModuleDTO } from "../data-transfer-objects/ProductionModuleDTO";
import { CommonCreationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";
import { EventId } from "../../../AdministrativeEvent/domain/value-objects/EventId";
import { ProductionModuleRoot } from "../interfaces/ProductionModuleRoot";
import { ProductionModuleLabel } from "../value-objects/ProductionModuleLabel";
import { ProductionModuleMachineAmount } from "../value-objects/ProductionModuleMachineAmount";

export class ProductionModule implements ProductionModuleRoot {

    private _currentSewingWorkerCounter: ProductionModuleSewingWorkerCounter;
    private _currentOperationState: ProductionModuleState;
    private _state: ProductionModuleState;

    constructor(
        readonly id: ProductionModuleId,
        readonly label: ProductionModuleLabel,
        private _machineAmount: ProductionModuleMachineAmount,
        private _currentSupervisorId: ProductionModuleSupervisorId | null,
        private _currentSewingWorkerIdList: ProductionModuleSewingWorkerId[],
        readonly creationDate: ProductionModuleCreationDate,
        readonly createBy: ProductionModuleCreateBy,
        readonly administrativeEventList: (CommonCreationEvent | CommonModificationEvent)[]
    ) {
        this._currentSewingWorkerCounter = new ProductionModuleSewingWorkerCounter(_currentSewingWorkerIdList.length);
        this._state = new ProductionModuleState(true);
        this._currentOperationState = new ProductionModuleState(true);
    }

    public get currentOperationState(): ProductionModuleState {
        return this._currentOperationState;
    }

    public get currentSupervisorId(): ProductionModuleSupervisorId | null {
        return this._currentSupervisorId;
    }

    public get currentSewingWorkerCounter(): ProductionModuleSewingWorkerCounter {
        return this._currentSewingWorkerCounter;
    }

    public get currentSewingWorkerIdList(): ProductionModuleSewingWorkerId[] {
        return this._currentSewingWorkerIdList;
    }

    public get machineAmount(): ProductionModuleMachineAmount {
        return this._machineAmount;
    }

    public get state(): ProductionModuleState {
        return this._state;
    }

    static create(
        id: ProductionModuleId,
        label: ProductionModuleLabel,
        machineAmount: ProductionModuleMachineAmount,
        currentSupervisorId: ProductionModuleSupervisorId | null,
        creationDate: ProductionModuleCreationDate,
        createBy: ProductionModuleCreateBy,
        administrativeEventList: (CommonCreationEvent | CommonModificationEvent)[]
    ): ProductionModule {
        return new ProductionModule(
            id,
            label,
            machineAmount,
            currentSupervisorId,
            [],
            creationDate,
            createBy,
            administrativeEventList
        )
    }

    startOperation(): void {
        this._currentOperationState = this.currentOperationState.setInTrue();
    }

    stopOperation(): void {
        this._currentOperationState = this.currentOperationState.setInFalse();
    }

    updateCurrentSupervisor(params: { value: ProductionModuleSupervisorId, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._currentSupervisorId = new ProductionModuleSupervisorId(value.value)
        }
    }

    updateMachineAmount(params: { value: ProductionModuleMachineAmount, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._machineAmount = this.machineAmount.setValue(value.value)
        }
    }

    updateState(params: { value: ProductionModuleState, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            if (this.state.value === value.value)
                throw new Error(`The Production Module State has already been set to <${value.value}>`)
            if (value.value)
                this._state = this.state.setInTrue();
            else
                this._state = this.state.setInFalse();
        }
    }

    updateCurrentOperationState(params: { value: ProductionModuleState, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            if (this._currentOperationState.value === value.value)
                throw new Error(`The Production Module State has already been set to <${value.value}>`)

            if (value.value)
                this.startOperation();
            else
                this.stopOperation();
            this.addNewEvent(event);
        }
    }

    updateCurrentSewingWorkerIdList(params: { value: ProductionModuleSewingWorkerId[], event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._currentSewingWorkerIdList = [];
            this._currentSewingWorkerIdList = value;
            this.updateSewingWorkerCounter(value);
        }
    }

    private addNewEvent(event: CommonModificationEvent): void {
        this.administrativeEventList.push(event);
    }

    private hasAddedEvent(eventId: EventId) {
        const eventFound = this.administrativeEventList.find(elemente => elemente.id.value === eventId.value);
        return eventFound !== undefined;
    }

    private updateSewingWorkerCounter(value: ProductionModuleSewingWorkerId[]): void {
        this._currentSewingWorkerCounter = new ProductionModuleSewingWorkerCounter(value.length);
    }

    static fromPrimitives(data: ProductionModuleDTO): ProductionModule {
        return new ProductionModule(
            new ProductionModuleId(data.id),
            new ProductionModuleLabel(data.label),
            new ProductionModuleMachineAmount(data.machineAmount),
            data.currentSupervisorId ? new ProductionModuleSupervisorId(data.currentSupervisorId) : null,
            data.currentSewingWorkerIdList.map(entry => new ProductionModuleSewingWorkerId(entry)),
            new ProductionModuleCreationDate(data.creationDate),
            new ProductionModuleCreateBy(data.createBy),
            data.administrativeEventList.map(entry => {
                if (entry.className === 'CreationEvent.commonDTO')
                    return CommonCreationEvent.fromPrimitives(entry as CommonCreationEventDTO)
                return CommonModificationEvent.fromPrimitives(entry as CommonModificationEventDTO)
            })
        )
    }

    toPrimitives(): ProductionModuleDTO {
        return new ProductionModuleDTO(
            this.id.value,
            this.label.value,
            this.machineAmount.value,
            this.currentOperationState.value,
            this.currentSupervisorId ? this.currentSupervisorId.value : null,
            this.currentSewingWorkerCounter.value,
            this.currentSewingWorkerIdList.map(entry => entry.value),
            this.state.value,
            this.creationDate.value,
            this.createBy.value,
            this.administrativeEventList.map(entry => { return entry.toPrimitives() })
        )
    }
}
