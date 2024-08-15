import { CountingRecordsOrderFirstQualityNotChecked } from "../../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityNotChecked";
import { ProductionOrderRepository } from "../../../domain/repositories/ProductionOrderRepository";


export class CountingRecordsOrderFirstQualityCreator {
    constructor(
        private productionOrderRepository: ProductionOrderRepository
    ) { }

    async execute(countingRecordsOrderList: CountingRecordsOrderFirstQualityNotChecked[]) {

        if(countingRecordsOrderList.length === 0)
            throw new Error('Counting Records Order not provided on creator')

        const [{ productionOrderId }] = countingRecordsOrderList;
        
        const productionOrder = await this.productionOrderRepository.find(productionOrderId);

        countingRecordsOrderList.forEach(countingRecordsOrder => {
            productionOrder.addCountingRecordsOrder(countingRecordsOrder);
        });

        await this.productionOrderRepository.save(productionOrder);
    }
}