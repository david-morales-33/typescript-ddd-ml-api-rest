
export class CountingRecordsOrderHasAlreadyBeenCheckedException extends Error {
    constructor() {
        super(`Counting Records Order has already been checked`)
    }
}