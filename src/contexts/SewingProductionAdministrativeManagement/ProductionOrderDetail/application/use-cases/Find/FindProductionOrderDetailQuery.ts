import { Query } from "../../../../../Shared/domain/CQRS/Query";

export class FindProductionOrderDetailQuery implements Query {
    constructor(readonly productionOrderId: string){}
}