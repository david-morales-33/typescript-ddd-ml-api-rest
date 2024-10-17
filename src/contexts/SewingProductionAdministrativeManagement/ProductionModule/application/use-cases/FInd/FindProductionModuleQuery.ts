import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";

export class FindProductionModuleQuery implements Query {
    constructor(public readonly productionModuleId: number) { }
}