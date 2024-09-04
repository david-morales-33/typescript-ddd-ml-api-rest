import { CountingRecordsOrderFirstQualityNotChecked } from "../../../CountingRecordsOrder/domain/entities/CountingRecordOrderFirstQualityNotChecked";
import { CountingRecordsOrderSecondQualityNotChecked } from "../../../CountingRecordsOrder/domain/entities/CountingRecordOrderSecondQualityNotChecked";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";

export abstract class ProductionOrderDetailRoot {
    abstract toPrimitives(): any;
    abstract addCountingRecordOrder(countingRecordsOrderId: CountingRecordsOrderFirstQualityNotChecked | CountingRecordsOrderSecondQualityNotChecked): void;
    abstract incrementExecutedAmount(countingRecordsOrderAmount: CountingRecordsOrderAmount): void;
    abstract incrementCounterRecords(): void;
}

