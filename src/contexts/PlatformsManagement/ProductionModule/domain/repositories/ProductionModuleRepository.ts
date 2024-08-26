import { ProductionModule } from "../entities/ProductionModule";

export interface ProductionModuleRepository{
    search():Promise<ProductionModule[]>
}