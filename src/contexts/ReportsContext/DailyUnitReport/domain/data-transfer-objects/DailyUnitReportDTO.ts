
export class DailyUnitReportDTO {
    constructor(
        readonly id: number,
        readonly amount: number,
        readonly reference: string,
        readonly productionOrderType: string,
        readonly day: number,
        readonly year: number
    ){}
}