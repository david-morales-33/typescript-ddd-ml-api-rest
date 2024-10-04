import { Criteria } from "../../../../../Shared/domain/design-patterns/Criteria/Criteria";
import { Filters } from "../../../../../Shared/domain/design-patterns/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/design-patterns/Criteria/Order";
import { CountingRecordsOrderResponseRepository } from "../../../domain/repositories/CountingRecordsOrderResponseRepository";
import { CountingRecordsOrderResponse } from "./CountingRecordsOrderResponse";

export class CountingRecordsOrderByCriteriaSearcher {
    constructor(private countingRecordsOrderResponseRepository: CountingRecordsOrderResponseRepository) { }

    async execute(filters: Filters, order: Order, limit?: number, offset?: number): Promise<CountingRecordsOrderResponse[]> {
        const criteria = new Criteria(filters, order, limit, offset);
        return await this.countingRecordsOrderResponseRepository.match(criteria)
    }
}