

export class CountingRecordsOrderEventDTO {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly previusValue: number,
        readonly currentValue: number,
        readonly eventDate: Date
    ) { }
}