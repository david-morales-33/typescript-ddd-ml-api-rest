import { CountingRecordsOrderSecondQualityNotChecked } from "../../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityNotChecked";
import { ProductionOrderRepository } from "../../../domain/repositories/ProductionOrderRepository";


export class CountingRecordsOrderSecondQualityCreator{
    constructor(
        private productionOrderRepository: ProductionOrderRepository
    ) { }

    async execute(countingRecordsOrderList: CountingRecordsOrderSecondQualityNotChecked[]) {

        if(countingRecordsOrderList.length === 0)
            throw new Error('Counting Records Order not provided on creator')

        const [{ productionOrderId }] = countingRecordsOrderList;
        
        const productionOrder = await this.productionOrderRepository.find(productionOrderId);

        if(productionOrder === null)
            throw new Error(`The Production Order Id <${productionOrderId.value}> not found`)

        countingRecordsOrderList.forEach(countingRecordsOrder => {
            productionOrder.addCountingRecordsOrder(countingRecordsOrder);
        });

        await this.productionOrderRepository.save(productionOrder);
    }
}