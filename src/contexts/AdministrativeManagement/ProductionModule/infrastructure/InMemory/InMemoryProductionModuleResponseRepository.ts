import { ProductionModuleViewDTO } from "../../domain/data-transfer-objects/ProductionModuleViewDTO";
import { ProductionModuleResponseRepository } from "../../domain/repositories/ProductionModuleResponseRepository";
import { ProductionModuleId } from "../../domain/value-objects/ProductionModuleId";

export class InMemoryProductionModuleResponseRepository implements ProductionModuleResponseRepository {

    private productionModuleList: ProductionModuleViewDTO[]

    constructor() {
        this.productionModuleList = [
            new ProductionModuleViewDTO(1, 5, true, 10, true, 'MOP3245', 'MAR8582', 'XL', 'BLANCO', null, '1146441925'),
            new ProductionModuleViewDTO(2, 5, true, 12, true, 'MOB3287', 'CHE8582', '36', 'NEGRO', null, '415469566'),
        ]
    }

    async find(productionModuleId: ProductionModuleId): Promise<ProductionModuleViewDTO | null> {
        const productionModule = this.productionModuleList.find(entry => entry.moduloId === productionModuleId.value);

        if (productionModule === undefined)
            return null;

        return productionModule;
    }
}