import { ProductionModuleRoot } from "../../domain/interfaces/productionModuleRoot";
import { ProductionModuleQueryRepository } from "../../domain/repositories/ProductionModuleQueryRepository";
import { ProductionModuleId } from "../../domain/value-objects/ProductionModuleId";
import { ProductionModule } from '../../domain/entities/productionModule'
import { ProductionModuleReferences } from "../../domain/value-objects/ProductionModuleReferences";
import { ProductionModuleProductionOrderId } from "../../domain/value-objects/ProductionModuleProductionOrderId";
import { ProductionModuleGarmentSize } from "../../domain/value-objects/ProductionModuleGarmentSize";
import { ProductionModuleColorId } from "../../domain/value-objects/ProductionModuleColorId";
import { ProductionModuleSupervisorId } from "../../domain/value-objects/ProductionModuleSupervisorId";
import { ProductionModuleState } from "../../domain/value-objects/ProductionModuleState";
import { ProductionModuleSewingWorkerCounter } from "../../domain/value-objects/ProductionModuleSewingWorkerAmount";


export class InMemoryProductionModuleQueryRepository implements ProductionModuleQueryRepository {

    private productionModuleList: ProductionModule[]

    constructor() {
        this.productionModuleList = [
            new ProductionModule(
                new ProductionModuleId(1),
                new ProductionModuleReferences('MAR8582'),
                new ProductionModuleProductionOrderId('MOP3245'),
                new ProductionModuleGarmentSize('XL'),
                new ProductionModuleColorId('1010'),
                new ProductionModuleSupervisorId('1146441925'),
                new ProductionModuleState(true),
                new ProductionModuleSewingWorkerCounter(5),
                [],
                []
            ),
            new ProductionModule(
                new ProductionModuleId(2),
                new ProductionModuleReferences('MAR8582'),
                new ProductionModuleProductionOrderId('MOB3546'),
                new ProductionModuleGarmentSize('XL'),
                new ProductionModuleColorId('1010'),
                new ProductionModuleSupervisorId('1146441925'),
                new ProductionModuleState(true),
                new ProductionModuleSewingWorkerCounter(5),
                [],
                []
            ),
            new ProductionModule(
                new ProductionModuleId(3),
                new ProductionModuleReferences('MAR8582'),
                new ProductionModuleProductionOrderId('MOP3245'),
                new ProductionModuleGarmentSize('2XL'),
                new ProductionModuleColorId('1020'),
                new ProductionModuleSupervisorId('1146441925'),
                new ProductionModuleState(true),
                new ProductionModuleSewingWorkerCounter(0),
                [],
                []
            ),
        ]
    }

    async find(productionModuleId: ProductionModuleId): Promise<ProductionModuleRoot | null> {
        const productionModule = this.productionModuleList.find(entry => entry.id.value === productionModuleId.value);

        if (productionModule === undefined)
            return null;

        return productionModule;
    }
}