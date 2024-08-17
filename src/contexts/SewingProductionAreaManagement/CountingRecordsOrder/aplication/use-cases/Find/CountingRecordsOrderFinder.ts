import { CountingRecordsOrderId } from "../../../domain/value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderQueryRepository } from "../../repositories/CountingRecordsOrderQueryRepository";

export class CountingRecordsOrderFinder {
    constructor(private CountingRecordsOrderQueryRepository: CountingRecordsOrderQueryRepository) { }

    async execute(countingRecordsOrderId: CountingRecordsOrderId) {
        const productionOrder = await this.CountingRecordsOrderQueryRepository.find(countingRecordsOrderId);

        if (productionOrder === null)
            throw new Error(`The Counting Records Order Id <${countingRecordsOrderId.value}> Not found`);

        return productionOrder;
    }
}