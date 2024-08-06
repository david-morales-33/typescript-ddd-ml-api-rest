import { CountingRecordsOrderFirstQualityNotChecked } from "../Entities/CountingRecordOrderFirstQualityNotChecked"

export interface CountingRecordsOrderFirstQualityNotCheckedRepository {
    save(countingRecordOrderFirstQualityNotChecked: CountingRecordsOrderFirstQualityNotChecked): Promise<void>
    update(countingRecordOrderFirstQualityNotChecked: CountingRecordsOrderFirstQualityNotChecked): Promise<void>;
    search(): Promise<CountingRecordsOrderFirstQualityNotChecked[]>;
    searchAll(): Promise<CountingRecordsOrderFirstQualityNotChecked[]>;
    matching(criteria: any): Promise<CountingRecordsOrderFirstQualityNotChecked[]>;
}