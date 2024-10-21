import { CountingRecordsOrderReports } from '../entities/CountingRecordsOrderReports';
import { CountingRecordsOrderReportsId } from '../value-objects/CountingRecordsOrderReportsId';

export interface CountingRecordsOrderReportsRepository {
    save(): Promise<void>;
    find(countingRecordsOrderReportsId: CountingRecordsOrderReportsId): Promise<CountingRecordsOrderReports | null>;
}