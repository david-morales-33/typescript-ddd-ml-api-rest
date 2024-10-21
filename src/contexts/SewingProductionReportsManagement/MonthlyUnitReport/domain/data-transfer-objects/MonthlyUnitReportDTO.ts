
export class MonthlyUnitReportDTO {
    constructor(
        readonly id: number,
        readonly amount: number,
        readonly reference: string,
        readonly productionOrderType: string,
        readonly month: number,
        readonly year: number
    ){}
}