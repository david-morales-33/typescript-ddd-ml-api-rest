import { ProductionModuleDTO } from "../data-transfer-objects/ProductionModuleDTO";
import { ProductionModuleRoot } from "../interfaces/ProductionModuleRoot";
import { ProductionModuleId } from "../value-objects/ProductionModuleId";
import { ProductionModuleName } from "../value-objects/ProductionModuleName";
import { ProductionModuleState } from "../value-objects/ProductionModuleState";


export class ProductionModule implements ProductionModuleRoot {

    constructor(
        readonly id: ProductionModuleId,
        readonly name: ProductionModuleName,
        readonly state: ProductionModuleState
    ) { }

    static create(
        id: ProductionModuleId,
        name: ProductionModuleName,
        state: ProductionModuleState
    ): ProductionModule {
        return new ProductionModule(id, name, state)
    }

    static fromPrimitives(data: ProductionModuleDTO): ProductionModule {
        return new ProductionModule(
            new ProductionModuleId(data.id),
            new ProductionModuleName(data.name),
            new ProductionModuleState(data.state)
        )
    }

    toPrimitives(): ProductionModuleDTO {
        return new ProductionModuleDTO(
            this.id.value,
            this.name.value,
            this.state.value
        )
    }
}