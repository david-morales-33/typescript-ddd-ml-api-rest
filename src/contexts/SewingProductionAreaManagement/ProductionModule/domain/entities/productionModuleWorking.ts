import { ProductionModuleI } from "../interfaces/productionModule";
import { ProductionModuleId } from "../value-objects/ProductionModuleId";
import { ProductionModuleSewingWorkerId } from "../value-objects/ProductionModuleSewingWorkerId";
import { ProductionModuleSewingWorkerCounter } from "../value-objects/ProductionModuleSewingWorkerAmount";
import { ProductionModuleState } from "../value-objects/ProductionModuleState";
import { ProductionModuleGarmentSize } from "../value-objects/ProductionModuleGarmentSize";
import { ProductionModuleColorId } from "../value-objects/ProductionModuleColorId";
import { ProductionModuleSupervisorId } from "../value-objects/ProductionModuleSupervisorId";
import { ProductionModuleReferences } from "../value-objects/ProductionModuleReferences";
import { ProductionModuleDTO } from "../data-transfer-object/ProductionModuleDTO";
import { ProductionModuleProductionOrderId } from "../value-objects/ProductionModuleProductionOrderId";

export class ProductionModule implements ProductionModuleI {

    constructor(
        readonly id: ProductionModuleId,
        private _currentReference: ProductionModuleReferences,
        private _currentProductionOrderId: ProductionModuleProductionOrderId,
        private _currentGarmentSize: ProductionModuleGarmentSize,
        private _currentColorId: ProductionModuleColorId,
        private _currentSupervisorId: ProductionModuleSupervisorId,
        private _currentState: ProductionModuleState,
        private _currentSewingWorkerCounter: ProductionModuleSewingWorkerCounter,
        private _currentSewingWorkerIdList: ProductionModuleSewingWorkerId[]
    ) { }

    public get currentReference(): ProductionModuleReferences {
        return this._currentReference;
    }

    public get currentProductionOrderId(): ProductionModuleProductionOrderId {
        return this._currentProductionOrderId;
    }

    public get currentGarmentSize(): ProductionModuleGarmentSize {
        return this._currentGarmentSize;
    }

    public get currentColorId(): ProductionModuleColorId {
        return this._currentColorId;
    }

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

    incrementSewingWorkerCounter() {
        this._currentSewingWorkerCounter = this.currentSewingWorkerCounter.increment();
    }

    decrementSewingWorkerCounter(): void {
        this._currentSewingWorkerCounter = this.currentSewingWorkerCounter.decrement();
    }

    addSewingWorker(sewingWorkerId: ProductionModuleSewingWorkerId) {
        if (this.hasAddedSewingWorkerInProductionModule(sewingWorkerId))
            throw new Error(`The Sewing Worker <${sewingWorkerId}> has already added`);
        this.currentSewingWorkerIdList.push(sewingWorkerId)
        this.incrementSewingWorkerCounter();
    }

    removeSewingWorker(sewingWorkerId: ProductionModuleSewingWorkerId): void {
        if (!this.hasAddedSewingWorkerInProductionModule(sewingWorkerId))
            throw new Error(`The Sewing Worker <${sewingWorkerId}> was not added`);
        const listWithoutSewingWorker = this.currentSewingWorkerIdList.filter(workerId => workerId.value !== sewingWorkerId.value);
        this._currentSewingWorkerIdList = listWithoutSewingWorker;
    }

    managementSewingWorker(sewingWorkerId: ProductionModuleSewingWorkerId): void {
        this.hasAddedSewingWorkerInProductionModule(sewingWorkerId) ?
            this.removeSewingWorker(sewingWorkerId) :
            this.addSewingWorker(sewingWorkerId);
    }

    updateOperationData(productionModule: ProductionModule) {
        if (this.hasChangedCurrentOperationData(productionModule)) {
            this._currentReference = this.currentReference.setValue(productionModule.currentReference.value);
            this._currentProductionOrderId = this.currentProductionOrderId.setValue(productionModule.currentProductionOrderId.value);
            this._currentColorId = this.currentColorId.setValue(productionModule.currentColorId.value);
            this._currentGarmentSize = this.currentGarmentSize.setValue(productionModule.currentGarmentSize.value);
            this._currentSupervisorId = this.currentSupervisorId.setValue(productionModule.currentSupervisorId.value);
        }

        if (this._currentSupervisorId.value !== productionModule.currentSupervisorId.value) {
            this._currentSupervisorId = this.currentSupervisorId.setValue(productionModule.currentSupervisorId.value)
        }
    }

    private hasAddedSewingWorkerInProductionModule(sewingWorkerId: ProductionModuleSewingWorkerId): boolean {
        const findedSewingWorker = this.currentSewingWorkerIdList.find(workerId => workerId.value === sewingWorkerId.value);
        return findedSewingWorker !== undefined;
    }

    private hasChangedCurrentOperationData(productionModule: ProductionModule): boolean {
        return (
            productionModule.currentColorId.value !== this.currentColorId.value ||
            productionModule.currentGarmentSize.value !== this.currentGarmentSize.value ||
            productionModule.currentReference.value !== this.currentReference.value ||
            productionModule.currentProductionOrderId.value !== this.currentProductionOrderId.value
        )
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
            data.currentSewingWorkerIdList.map(entry => new ProductionModuleSewingWorkerId(entry))
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
            this.currentSewingWorkerIdList.map(entry => entry.value)
        )
    }
}

