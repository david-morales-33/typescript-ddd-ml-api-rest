import { Query } from "../../../../../Shared/domain/CQRS/Query";

export class FindProductionModuleQuery implements Query {
    constructor(public readonly productionModuleId: number) { }
}