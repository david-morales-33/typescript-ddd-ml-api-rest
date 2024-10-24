import { Response } from "../../../../Shared/domain/CQRS/Response";
import { ProductionModuleDTO } from "../../domain/data-transfer-objects/ProductionModuleDTO";
import { ProductionModule } from "../../domain/entities/ProductionModule";

export class ProductionModuleResponse implements Response {
    public readonly productionModules: ProductionModuleDTO[];

    constructor(productionModule: ProductionModule[]) {
        this.productionModules = productionModule.map(entry => entry.toPrimitives())
    }
}