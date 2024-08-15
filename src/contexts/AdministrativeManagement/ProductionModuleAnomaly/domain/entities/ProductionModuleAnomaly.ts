import { ProductionModuleAnomalyDTO } from "../data-transfer-objects/ProductionModuleAnomalyDTO";
import { ProductionModuleAnomalyRoot } from "../interfaces/ProductionModuleAnomalyRoot";
import { ProductionModuleAnomalyId } from "../value-objects/ProductionModuleAnomalyId";
import { ProductionModuleAnomalyName } from "../value-objects/ProductionModuleAnomalyName";
import { ProductionModuleAnomalyState } from "../value-objects/ProductionModuleAnomalyState";

export class ProductionModuleAnomaly implements ProductionModuleAnomalyRoot {
    constructor(
        readonly id: ProductionModuleAnomalyId,
        readonly name: ProductionModuleAnomalyName,
        readonly state: ProductionModuleAnomalyState
    ) { }

    static create(
        id: ProductionModuleAnomalyId,
        name: ProductionModuleAnomalyName,
        state: ProductionModuleAnomalyState
    ): ProductionModuleAnomaly {
        return new ProductionModuleAnomaly(
            id,
            name,
            state
        )
    }

    static fromPrimitives(data: ProductionModuleAnomalyDTO): ProductionModuleAnomaly {
        return new ProductionModuleAnomaly(
            new ProductionModuleAnomalyId(data.id),
            new ProductionModuleAnomalyName(data.name),
            new ProductionModuleAnomalyState(data.state)
        )
    }

    toPrimitives(): ProductionModuleAnomalyDTO {
        return new ProductionModuleAnomalyDTO(
            this.id.value,
            this.name.value,
            this.state.value
        )
    }
}