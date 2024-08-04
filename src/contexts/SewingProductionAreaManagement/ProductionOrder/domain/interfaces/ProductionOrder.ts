import { AggregateRoot } from "../../../../Shared/domain/value-object/AggregateRoot";
import { CountingRecordsOrder } from "../../../CountingRecordsOrder/domain/Interfaces/CountingRecordOrder";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";

export interface ProductionOrder extends AggregateRoot {
    addCountingRecordsOrder(countingRecordsOrder: CountingRecordsOrder): void;
    incrementRecordsCounter(): void;
    incrementExecutedAmount(amount: CountingRecordsOrderAmount): void;
}

