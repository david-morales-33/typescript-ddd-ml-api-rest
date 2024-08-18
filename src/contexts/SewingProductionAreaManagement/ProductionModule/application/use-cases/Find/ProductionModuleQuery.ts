import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";

export class ProductionModuleQuery implements Query {
    constructor(readonly productionModuleId: ProductionModuleId) { }
}