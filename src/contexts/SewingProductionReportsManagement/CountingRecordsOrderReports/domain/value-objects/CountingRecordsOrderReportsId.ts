import { CountingRecordsOrderReportsReference } from './CountingRecordsOrderReportsReference'
import { CountingRecordsOrderReportsProductionOrderType } from './CountingRecordsOrderReportsType';

export class CountingRecordsOrderReportsId {
    constructor(
        readonly countingRecordsOrderReportsReference: CountingRecordsOrderReportsReference,
        readonly countingRecordsOrderReportsProductionOrderType: CountingRecordsOrderReportsProductionOrderType
    ) { }

    getCountingRecordsOrderReportsId():string{
        return `${this.countingRecordsOrderReportsReference.value}-${this.countingRecordsOrderReportsProductionOrderType.value}`
    }
}