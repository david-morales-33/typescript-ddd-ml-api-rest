import { Query } from "../../../../../Shared/domain/CQRS/Query";

export class FindProductionOrderQuery implements Query {
    constructor(readonly productionOrderId: string) { }
}