import { CountingRecordsOrderFirstQualityNotChecked } from "../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityNotChecked";
import { CountingRecordsOrderSecondQualityNotChecked } from "../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityNotChecked";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";

export abstract class ProductionOrderDetail {
    abstract toPrimitives(): any;
    abstract addCountingRecordOrder(countingRecordsOrderId: CountingRecordsOrderFirstQualityNotChecked | CountingRecordsOrderSecondQualityNotChecked): void;
    abstract incrementExecutedAmount(countingRecordsOrderAmount: CountingRecordsOrderAmount): void;
    abstract incrementCounterRecords(): void;
}

