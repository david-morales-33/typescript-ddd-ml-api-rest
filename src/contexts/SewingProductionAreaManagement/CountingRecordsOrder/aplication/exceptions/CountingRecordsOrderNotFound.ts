import { CountingRecordsOrderId } from "../../domain/value-objects/CountingRecordsOrderId";

export class CountingRecordsOrderNotFound extends Error {
    constructor(countingRecordOrderId: CountingRecordsOrderId) {
        super(`El registro <${countingRecordOrderId.value}> no fue encontrado`)
    }
}