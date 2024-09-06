import { CountingRecordsOrderEventIdOnProductionModule } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule";
import { ProductionModuleEvent } from "../../domain/entities/ProductionModuleEvent";
import { ProductionModuleEventQueryRepository } from "../../domain/repositories/ProductionModuleEventQueryRepository";
import { ProductionModuleEventId } from "../../domain/value-objects/ProductionModuleEventId";


// export class InMemoryProductionModuleEventQueryRepository implements ProductionModuleEventQueryRepository{

//     private productionModuleEventList: ProductionModuleEvent[];

//     constructor(){
//         this.productionModuleEventList=[
//             new ProductionModuleEvent(new ProductionModuleEventId(1))
//         ]
//     }

//     async find(productionModuleEventId: CountingRecordsOrderEventIdOnProductionModule): Promise<ProductionModuleEvent | null> {
        
//     }
// }