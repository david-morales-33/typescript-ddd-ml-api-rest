import { CountingRecordsOrderId } from "../../domain/value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderViewDTO } from "../data-transfer-objects/CountingRecordsOrderViewDTO";

export interface CountingRecordsOrderQueryRepository {
    find(countingRecordsOrderId: CountingRecordsOrderId): Promise<CountingRecordsOrderViewDTO | null>;
    match(criteria: any): Promise<CountingRecordsOrderViewDTO[]>;
}