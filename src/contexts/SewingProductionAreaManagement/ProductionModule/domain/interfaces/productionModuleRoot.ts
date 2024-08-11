import { AggregateRoot } from "../../../../Shared/domain/value-object/AggregateRoot";
import { ProductionModuleSewingWorkerId } from "../value-objects/ProductionModuleSewingWorkerId";

export interface ProductionModuleRoot extends AggregateRoot {
    startOperation(): void;
    stopOperation(): void;
    incrementSewingWorkerCounter(): void;
    decrementSewingWorkerCounter(): void;
    addSewingWorker(sewingWorkerId: ProductionModuleSewingWorkerId): void;
    removeSewingWorker(sewingWorkerId: ProductionModuleSewingWorkerId): void;
    managementSewingWorker(sewingWorkerId: ProductionModuleSewingWorkerId): void;
}