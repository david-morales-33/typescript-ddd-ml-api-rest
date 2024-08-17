import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";

export class FindProductionOrderQuery implements Query {
    constructor(readonly productionOrderId: ProductionOrderId) { }
}