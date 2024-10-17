import { Query } from "../../../../../Shared/domain/CQRS/Query";

export class FindProductionModuleAnomalyQuery implements Query {
    constructor(readonly productionModuleAnomalyId: string) { }
}