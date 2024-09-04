import { CountingRecordsOrderFirstQualityNotChecked } from "../../../../CountingRecordsOrder/domain/entities/CountingRecordOrderFirstQualityNotChecked";
import { ProductionOrderCommandRepository } from "../../../domain/repositories/ProductionOrderCommandRepository";
import { ProductionOrderQueryRepository } from '../../../domain/repositories/ProductionOrderQueryRepository'
import { CountingRecordsOrderNotProvided } from "../../exception/CountingRecordsOrderNotProvided";
import { ProductionOrderNotFound } from "../../exception/ProductionOrderNotFoundOnService";

export class CountingRecordsOrderFirstQualityCreator {
    constructor(
        private productionOrderQueryRepository: ProductionOrderQueryRepository,
        private productionOrderCommandRepository: ProductionOrderCommandRepository
    ) { }

    async execute(countingRecordsOrderList: CountingRecordsOrderFirstQualityNotChecked[]) {

        if (countingRecordsOrderList.length === 0)
            throw new CountingRecordsOrderNotProvided();

        const [{ productionOrderId }] = countingRecordsOrderList;

        const productionOrder = await this.productionOrderQueryRepository.find(productionOrderId);

        if (productionOrder === null)
            throw new ProductionOrderNotFound(productionOrderId);

        countingRecordsOrderList.forEach(countingRecordsOrder => {
            productionOrder.addCountingRecordsOrder(countingRecordsOrder);
        });

        await this.productionOrderCommandRepository.save(productionOrder);
    }
}