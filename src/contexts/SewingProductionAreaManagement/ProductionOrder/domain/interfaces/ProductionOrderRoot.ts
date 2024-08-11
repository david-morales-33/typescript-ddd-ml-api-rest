import { AggregateRoot } from "../../../../Shared/domain/value-object/AggregateRoot";
import { CountingRecordsOrder } from "../../../CountingRecordsOrder/domain/Interfaces/CountingRecordOrderRoot";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";

export abstract class ProductionOrderRoot extends AggregateRoot {
    abstract addCountingRecordsOrder(countingRecordsOrder: CountingRecordsOrder): void;
    abstract incrementExecutedAmount(amount: CountingRecordsOrderAmount): void;
    abstract incrementRecordsCounter(): void;
}

