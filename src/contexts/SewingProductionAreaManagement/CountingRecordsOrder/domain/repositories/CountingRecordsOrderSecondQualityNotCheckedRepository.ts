import { CountingRecordsOrderSecondQualityNotChecked } from "../Entities/CountingRecordOrderSecondQualityNotChecked";

export interface CountingRecordOrderSecondQualityNotCheckedRepository {
    save(countingRecordOrderFirstQualityNotChecked: CountingRecordsOrderSecondQualityNotChecked): Promise<void>
    update(countingRecordOrderFirstQualityNotChecked: CountingRecordsOrderSecondQualityNotChecked): Promise<void>;
    search(): Promise<CountingRecordsOrderSecondQualityNotChecked[]>;
    searchAll(): Promise<CountingRecordsOrderSecondQualityNotChecked[]>;
    matching(criteria: any): Promise<CountingRecordsOrderSecondQualityNotChecked[]>;
}