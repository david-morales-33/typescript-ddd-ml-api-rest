import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";
import { ProductionModuleAnomalyId } from "../../../domain/value-objects/ProductionModuleAnomalyId";

export class FindProductionModuleAnomalyQuery implements Query {
    constructor(readonly productionModuleAnomalyId: string) { }
}