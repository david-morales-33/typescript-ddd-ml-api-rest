

export class CountingRecordsOrderEventDTO {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly previusValue: number,
        readonly currentValue: number,
        readonly eventDate: Date
    ) { }
}