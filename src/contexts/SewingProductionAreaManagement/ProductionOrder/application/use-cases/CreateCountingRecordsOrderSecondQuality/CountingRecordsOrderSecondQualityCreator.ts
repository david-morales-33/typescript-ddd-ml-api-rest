import { CountingRecordsOrderSecondQualityNotChecked } from "../../../../CountingRecordsOrder/domain/entities/CountingRecordOrderSecondQualityNotChecked";
import { ProductionOrderCommandRepository } from "../../../domain/repositories/ProductionOrderCommandRepository";
import { ProductionOrderQueryRepository } from "../../../domain/repositories/ProductionOrderQueryRepository";
import { ProductionOrderNotFound } from "../../exception/ProductionOrderNotFoundOnService";

export class CountingRecordsOrderSecondQualityCreator {
    constructor(
        private productionOrderQueryRepository: ProductionOrderQueryRepository,
        private productionOrderCommandRepository: ProductionOrderCommandRepository
    ) { }

    async execute(countingRecordsOrderList: CountingRecordsOrderSecondQualityNotChecked[]) {

        const [{ productionOrderId }] = countingRecordsOrderList;

        const productionOrder = await this.productionOrderQueryRepository.find(productionOrderId);

        if (productionOrder === null)
            throw new ProductionOrderNotFound(productionOrderId)

        countingRecordsOrderList.forEach(countingRecordsOrder => {
            productionOrder.addCountingRecordsOrder(countingRecordsOrder);
        });

        await this.productionOrderCommandRepository.save(productionOrder);
    }
}