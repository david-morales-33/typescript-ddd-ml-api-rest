import { ProductionOrderId } from "../../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";

export class FindProductionOrderDetailQuery implements Query{
    constructor(readonly productionOderId: string){}
}