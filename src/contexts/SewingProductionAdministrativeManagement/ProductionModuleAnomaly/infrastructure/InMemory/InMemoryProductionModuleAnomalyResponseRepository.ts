import { ProductionModuleAnomalyViewDTO } from "../../domain/data-transfer-objects/ProductionModuleAnomalyViewDTO";
import { ProductionModuleAnomalyResponseRepository } from "../../domain/repositories/ProductionModuleAnomalyResponseRepository";
import { ProductionModuleAnomalyId } from "../../domain/value-objects/ProductionModuleAnomalyId";


export class InMemoryProductionModuleAnomalyResponseRepository implements ProductionModuleAnomalyResponseRepository {

    private ProductionModuleAnomalyList: ProductionModuleAnomalyViewDTO[];

    constructor() {
        this.ProductionModuleAnomalyList = [
            new ProductionModuleAnomalyViewDTO('02', 'DAÑO MECÁNICO', true, new Date().toDateString(), '11446441925'),
            new ProductionModuleAnomalyViewDTO('05', 'CAPACITACIÓN', true, new Date().toDateString(), '11446441925'),
        ]
    }

    async find(productionModuleAnomalyId: ProductionModuleAnomalyId): Promise<ProductionModuleAnomalyViewDTO | null> {
        // const responseRepository = new InMemoryProductionModuleAnomalyResponseRepository();
        // const finder = new ProductionModuleAnomalyFinder(responseRepository);
        // const query = new FindProductionModuleAnomalyQuery('10');
        // const queryHandler = new FindProductionModuleAnomalyQueryHandler(finder);
        // queryHandler.handle(query).then(res => console.log(res))
        const productionModuleAnomaly = this.ProductionModuleAnomalyList.find(entry => entry.id === productionModuleAnomalyId.value);

        if (productionModuleAnomaly === undefined)
            return null;
        return productionModuleAnomaly;
    }
}