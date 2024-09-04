import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";

export class FindProductionOrderQuery implements Query {
    constructor(readonly productionOrderId: string) { }
}