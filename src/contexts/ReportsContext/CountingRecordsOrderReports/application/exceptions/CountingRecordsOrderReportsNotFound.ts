import { CountingRecordsOrderReportsId } from "../../domain/value-objects/CountingRecordsOrderReportsId";

export class CountingRecordsOrderReportsNotFound extends Error {
    constructor(value: CountingRecordsOrderReportsId){
        super(`The Counting Records Order Reports <${value.getCountingRecordsOrderReportsId()}> not found`)
    }
}