import { CountingRecordsOrderId } from "../../../domain/value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderResponseRepository } from "../../../domain/repositories/CountingRecordsOrderResponseRepository";
import { CountingRecordsOrderNotFound } from "../../exceptions/CountingRecordsOrderNotFound";

export class CountingRecordsOrderFinder {
    constructor(private CountingRecordsOrderQueryRepository: CountingRecordsOrderResponseRepository) { }

    async execute(countingRecordsOrderId: CountingRecordsOrderId) {
        const productionOrder = await this.CountingRecordsOrderQueryRepository.find(countingRecordsOrderId);

        if (productionOrder === null)
            throw new CountingRecordsOrderNotFound(countingRecordsOrderId)

        return productionOrder;
    }
}