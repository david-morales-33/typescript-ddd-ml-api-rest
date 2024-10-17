import { Query } from "../../../../../Shared/domain/CQRS/Query";

export class ProductionModuleQuery implements Query {
    constructor(readonly productionModuleId: number) { }
}