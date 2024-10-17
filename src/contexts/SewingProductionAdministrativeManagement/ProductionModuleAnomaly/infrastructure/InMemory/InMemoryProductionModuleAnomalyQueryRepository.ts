import { ProductionModuleAnomaly } from "../../domain/entities/ProductionModuleAnomaly";
import { ProductionModuleAnomalyQueryRepository } from "../../domain/repositories/ProductionModuleAnomalyQueryRepository";
import { ProductionModuleAnomalyId } from "../../domain/value-objects/ProductionModuleAnomalyId";
import { ProductionModuleAnomalyName } from "../../domain/value-objects/ProductionModuleAnomalyName";
import { ProductionModuleAnomalyState } from "../../domain/value-objects/ProductionModuleAnomalyState";


export class InMemoryProductionModuleAnomalyQueryRepository implements ProductionModuleAnomalyQueryRepository {
    private productionModuleAnomalyList: ProductionModuleAnomaly[];

    constructor() {
        this.productionModuleAnomalyList = [
            new ProductionModuleAnomaly(
                new ProductionModuleAnomalyId('02'),
                new ProductionModuleAnomalyName('DAÑO MECÁNICO'),
                [],
                new ProductionModuleAnomalyState(true)
            ),
            new ProductionModuleAnomaly(
                new ProductionModuleAnomalyId('05'),
                new ProductionModuleAnomalyName('CAPACITACIÓN'),
                [],
                new ProductionModuleAnomalyState(true)
            ),
        ]
    }

    async find(productionModuleAnomalyId: ProductionModuleAnomalyId): Promise<ProductionModuleAnomaly | null> {
        const productionModuleAnomaly = this.productionModuleAnomalyList.find(entry => entry.id.value === productionModuleAnomalyId.value);

        if (productionModuleAnomaly === undefined)
            return null;

        return productionModuleAnomaly;
    }
}