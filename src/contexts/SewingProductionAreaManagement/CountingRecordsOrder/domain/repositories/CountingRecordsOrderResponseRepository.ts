import { CountingRecordsOrderId } from "../value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderViewDTO } from "../data-transfer-object/CountingRecordsOrderViewDTO";
import { Criteria } from "../../../../Shared/domain/design-patterns/Criteria/Criteria";

export interface CountingRecordsOrderResponseRepository {
    find(countingRecordsOrderId: CountingRecordsOrderId): Promise<CountingRecordsOrderViewDTO | null>;
    match(criteria: Criteria): Promise<CountingRecordsOrderViewDTO[]>;
}