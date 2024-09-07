import { ProductionModuleViewDTO } from "../../domain/data-transfer-object/ProductionModuleViewDTO";
import { ProductionModuleResponseRepository } from "../../domain/repositories/ProductionModuleResponseRepository";
import { ProductionModuleId } from "../../domain/value-objects/ProductionModuleId";

export class InMemeryProductionModuelResponseRepository implements ProductionModuleResponseRepository {
    private productionModuleList: ProductionModuleViewDTO[];

    constructor() {
        this.productionModuleList = [
            new ProductionModuleViewDTO(1, 12, true, 7, 'MOP3245', 'MAR8285', '2XL', 'BLANCO', null, 'David Morales'),
            new ProductionModuleViewDTO(2, 10, true, 7, 'MOP3246', 'MAR8287', '36', 'NEGRO', null, 'David Morales'),
            new ProductionModuleViewDTO(3, 11, true, 7, 'MOP3247', 'MAR8231', '3XL', 'AMARILLO', null, 'David Morales'),
        ]
    }
    async searchAll(): Promise<ProductionModuleViewDTO[]> {
        //==================================integration-test=========================================
        // const productionModuleRepository = new InMemeryProductionModuelResponseRepository();
        // const productionModuleSearcher = new ProductionModuleFinder(productionModuleRepository);
        // const productionModuleQueryHandler = new SearchAllProductionModuleQueryHandler(productionModuleSearcher);
        // const productionModuleQuery = new SearchAllProductionModuleQuery();
        // productionModuleQueryHandler.handle(productionModuleQuery).then(res => console.log(res))

        return this.productionModuleList;
    }

    async find(productionModuleId: ProductionModuleId): Promise<ProductionModuleViewDTO | null> {
        //=================================integration-test===========================================
        // const productionModuleRepository = new InMemeryProductionModuelResponseRepository();
        // const productionModuleFinder = new ProductionModuleFinder(productionModuleRepository);
        // const productionModuleQuery = new ProductionModuleQuery(5);
        // const productionModuleQueryHandler = new ProductionModuleQueryHandler(productionModuleFinder);
        const productionModule = this.productionModuleList.find(entry => entry.productionModuleId === productionModuleId.value);
        if (productionModule === undefined)
            return null;

        return productionModule;
    }

    async matching(critery: any): Promise<ProductionModuleViewDTO[]> {
        console.log(critery)
        return this.productionModuleList;
    }
}