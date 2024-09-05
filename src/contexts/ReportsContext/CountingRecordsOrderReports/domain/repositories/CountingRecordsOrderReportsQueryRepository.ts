import { CountingRecordsOrderReportsDTO } from '../data-transfer-objects/CountingRecordsOrderReportsDTO';
import { CountingRecordsOrderReportsId } from '../value-objects/CountingRecordsOrderReportsId';

export interface CountingRecordsOrderReportsQueryRepository{
    find(countingRecordsOrderReportsId: CountingRecordsOrderReportsId): Promise<CountingRecordsOrderReportsDTO | null>;
    searchAll(): Promise<CountingRecordsOrderReportsDTO[]>;
}