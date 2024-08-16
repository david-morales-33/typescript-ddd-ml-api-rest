import { ProductionModuleId } from "../value-objects/ProductionModuleId";
import { ProductionModuleSewingWorkerId } from "../value-objects/ProductionModuleSewingWorkerId";
import { ProductionModuleSewingWorkerCounter } from "../value-objects/ProductionModuleSewingWorkerAmount";
import { ProductionModuleState } from "../value-objects/ProductionModuleState";
import { ProductionModuleGarmentSize } from "../value-objects/ProductionModuleGarmentSize";
import { ProductionModuleColorId } from "../value-objects/ProductionModuleColorId";
import { ProductionModuleSupervisorId } from "../value-objects/ProductionModuleSupervisorId";
import { ProductionModuleReferences } from "../value-objects/ProductionModuleReferences";
import { ProductionModuleProductionOrderId } from "../value-objects/ProductionModuleProductionOrderId";
import { CommonCreationEvent } from "../../../AdministrativeEvent/domain/entities/CommonCreationEvent";
import { CommonModificationEvent } from "../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { ProductionModuleCreationDate } from "../value-objects/ProductionModuleCreationDate";
import { ProductionModuleCreateBy } from "../value-objects/ProductionModuleCreateBy";
import { ProductionModuleDTO } from "../data-transfer-objects/ProductionModuleDTO";
import { CommonCreationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";
import { EventId } from "../../../AdministrativeEvent/domain/value-objects/EventId";
import { ProductionModuleRoot } from "../interfaces/productionModuleRoot";

export class ProductionModule implements ProductionModuleRoot {

    constructor(
        readonly id: ProductionModuleId,
        readonly currentReference: ProductionModuleReferences,
        readonly currentProductionOrderId: ProductionModuleProductionOrderId,
        readonly currentGarmentSize: ProductionModuleGarmentSize,
        readonly currentColorId: ProductionModuleColorId,
        private _currentSupervisorId: ProductionModuleSupervisorId,
        private _currentState: ProductionModuleState,
        private _currentSewingWorkerCounter: ProductionModuleSewingWorkerCounter,
        private _currentSewingWorkerIdList: ProductionModuleSewingWorkerId[],
        readonly creationDate: ProductionModuleCreationDate,
        readonly createBy: ProductionModuleCreateBy,
        readonly administrativeEventList: (CommonCreationEvent | CommonModificationEvent)[]
    ) { }

    public get currentState(): ProductionModuleState {
        return this._currentState;
    }

    public get currentSupervisorId(): ProductionModuleSupervisorId {
        return this._currentSupervisorId;
    }

    public get currentSewingWorkerCounter(): ProductionModuleSewingWorkerCounter {
        return this._currentSewingWorkerCounter;
    }

    public get currentSewingWorkerIdList(): ProductionModuleSewingWorkerId[] {
        return this._currentSewingWorkerIdList;
    }

    startOperation(): void {
        this._currentState = this.currentState.setInTrue();
    }

    stopOperation(): void {
        this._currentState = this.currentState.setInFalse();
    }

    updateCurrentSupervisor(params: { value: ProductionModuleSupervisorId, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._currentSupervisorId = this.currentSupervisorId.setValue(value.value)
        }
    }

    updateCurrentState(params: { value: ProductionModuleState, event: CommonModificationEvent }) {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            if (this._currentState.value === value.value)
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
            new ProductionModuleReferences(data.currentReference),
            new ProductionModuleProductionOrderId(data.currentProductionOrder),
            new ProductionModuleGarmentSize(data.currentGarmentSize),
            new ProductionModuleColorId(data.currentColorId),
            new ProductionModuleSupervisorId(data.currentSupervisorId),
            new ProductionModuleState(data.currentState),
            new ProductionModuleSewingWorkerCounter(data.currentSewingWorkerCounter),
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
            this.currentReference.value,
            this.currentProductionOrderId.value,
            this.currentGarmentSize.value,
            this.currentColorId.value,
            this.currentSupervisorId.value,
            this.currentState.value,
            this.currentSewingWorkerCounter.value,
            this.currentSewingWorkerIdList.map(entry => entry.value),
            this.creationDate.value,
            this.createBy.value,
            this.administrativeEventList.map(entry => { return entry.toPrimitives() })
        )
    }
}

