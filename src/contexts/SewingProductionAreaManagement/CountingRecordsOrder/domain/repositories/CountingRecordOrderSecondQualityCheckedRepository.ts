import { CountingRecordsOrderSecondQualityChecked } from "../Entities/CountingRecordOrderSecondQualityChecked";

export interface CountingRecordOrderSecondQualityCheckedRepository{
    search(): Promise<CountingRecordsOrderSecondQualityChecked[]>;
    searchAll(): Promise<CountingRecordsOrderSecondQualityChecked[]>;
    matching(criteria: any): Promise<CountingRecordsOrderSecondQualityChecked[]>;
}