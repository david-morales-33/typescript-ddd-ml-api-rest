import { CountingRecordsOrderFirstQualityChecked } from "../Entities/CountingRecordOrderFirstQualityChecked";

export interface CountingRecordsOrderFirstQualityCheckedRepository {
    search(): Promise<CountingRecordsOrderFirstQualityChecked[]>;
    searchAll(): Promise<CountingRecordsOrderFirstQualityChecked[]>;
    matching(criteria: any): Promise<CountingRecordsOrderFirstQualityChecked[]>;
}