import { CountingRecordsOrderId } from "../value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderViewDTO } from "../data-transfer-object/CountingRecordsOrderViewDTO";

export interface CountingRecordsOrderResponseRepository {
    find(countingRecordsOrderId: CountingRecordsOrderId): Promise<CountingRecordsOrderViewDTO | null>;
    match(criteria: any): Promise<CountingRecordsOrderViewDTO[]>;
}