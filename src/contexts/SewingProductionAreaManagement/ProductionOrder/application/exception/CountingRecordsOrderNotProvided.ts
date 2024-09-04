export class CountingRecordsOrderNotProvided extends Error {
    constructor(){
        super('Counting Records Order not provided on creator')
    }
}