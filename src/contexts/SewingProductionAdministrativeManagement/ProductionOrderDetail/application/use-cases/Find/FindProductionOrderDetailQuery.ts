import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";

export class FindProductionOrderDetailQuery implements Query {
    constructor(readonly productionOrderId: string){}
}