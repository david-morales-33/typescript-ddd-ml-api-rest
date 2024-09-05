import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";

export class ProductionModuleQuery implements Query {
    constructor(readonly productionModuleId: number) { }
}