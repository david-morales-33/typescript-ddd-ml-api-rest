import { CountingRecordsOrderSecondQualityNotChecked } from "../../../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityNotChecked";
import { ProductionOrderRepository } from "../../../../domain/repositories/ProductionOrderRepository";


export class CountingRecordsOrderSecondQualityCreator{
    constructor(
        private productionOrderRepository: ProductionOrderRepository
    ) { }

    async execute(countingRecordsOrderList: CountingRecordsOrderSecondQualityNotChecked[]) {

        if(countingRecordsOrderList.length === 0)
            throw new Error('Counting Records Order not provided on creator')

        const [{ productionOrderId }] = countingRecordsOrderList;
        const productionOrder = await this.productionOrderRepository.find(productionOrderId);

        countingRecordsOrderList.forEach(countingRecordsOrder => {
            productionOrder.addCountingRecordsOrder(countingRecordsOrder);
        });
    }
}