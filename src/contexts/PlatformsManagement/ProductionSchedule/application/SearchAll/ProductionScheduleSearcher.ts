import { ProductionModuleId } from "../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionScheduleRepository } from "../../domain/repositories/ProductionScheduleRepository";
import { ProductionScheduleResponse } from "./ProductionScheduleResponse";

export class ProductionScheduleSearcher {
    constructor(private productionScheduleRepository: ProductionScheduleRepository) { }

    async execute(productionModuleId: ProductionModuleId) {
        const productionScheduleList = await this.productionScheduleRepository.searchAll(productionModuleId);
        return new ProductionScheduleResponse(productionScheduleList);
    }
}