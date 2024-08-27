import { ProductionScheduleRepository } from "../domain/repositories/ProductionScheduleRepository";
import { ProductionScheduleResponse } from "./ProductionScheduleResponse";


export class ProductionScheduleSearcher {
    constructor(private productionScheduleRepository: ProductionScheduleRepository){}

    async execute(){
        const productionScheduleList = await this.productionScheduleRepository.searchAll();
        return new ProductionScheduleResponse(productionScheduleList);
    }
}