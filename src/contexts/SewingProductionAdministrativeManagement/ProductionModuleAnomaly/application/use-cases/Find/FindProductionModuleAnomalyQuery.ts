import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";

export class FindProductionModuleAnomalyQuery implements Query {
    constructor(readonly productionModuleAnomalyId: string) { }
}