import { CountingRecordsOrderFirstQualityNotChecked } from "../entities/CountingRecordOrderFirstQualityNotChecked"

export interface CountingRecordsOrderFirstQualityNotCheckedRepository {
    find(): Promise<CountingRecordsOrderFirstQualityNotChecked[]>;
    searchAll(): Promise<CountingRecordsOrderFirstQualityNotChecked[]>;
    matching(criteria: any): Promise<CountingRecordsOrderFirstQualityNotChecked[]>;
}