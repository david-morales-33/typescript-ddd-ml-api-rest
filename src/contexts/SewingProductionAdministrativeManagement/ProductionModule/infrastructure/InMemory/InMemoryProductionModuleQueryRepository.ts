import { ProductionModule } from "../../domain/entities/productionModule";
import { ProductionModuleQueryRepository } from "../../domain/repositories/ProductionModuleQuerydRepository";
import { ProductionModuleCreateBy } from "../../domain/value-objects/ProductionModuleCreateBy";
import { ProductionModuleCreationDate } from "../../domain/value-objects/ProductionModuleCreationDate";
import { ProductionModuleId } from "../../domain/value-objects/ProductionModuleId";
import { ProductionModuleLabel } from "../../domain/value-objects/ProductionModuleLabel";
import { ProductionModuleMachineAmount } from "../../domain/value-objects/ProductionModuleMachineAmount";
import { ProductionModuleSupervisorId } from "../../domain/value-objects/ProductionModuleSupervisorId";

export class InMemoryProductionModuleQueryRepository implements ProductionModuleQueryRepository {

    private productionModuleList: ProductionModule[];

    constructor() {
        this.productionModuleList = [
            new ProductionModule(
                new ProductionModuleId(1),
                new ProductionModuleLabel('MODULO-1'),
                new ProductionModuleMachineAmount(9),
                new ProductionModuleSupervisorId('11452152156'), [],
                new ProductionModuleCreationDate(new Date()),
                new ProductionModuleCreateBy('1146441925'), []
            ),
            new ProductionModule(
                new ProductionModuleId(2),
                new ProductionModuleLabel('MODULO-2'),
                new ProductionModuleMachineAmount(8),
                new ProductionModuleSupervisorId('11858965296'), [],
                new ProductionModuleCreationDate(new Date()),
                new ProductionModuleCreateBy('1146441925'), []
            ),
        ]
    }

    async find(productionModuleId: ProductionModuleId): Promise<ProductionModule | null> {
        const productionModule = this.productionModuleList.find(entry => entry.id.value === productionModuleId.value);
        if (productionModule === undefined)
            return null;
        return productionModule;
    }
}