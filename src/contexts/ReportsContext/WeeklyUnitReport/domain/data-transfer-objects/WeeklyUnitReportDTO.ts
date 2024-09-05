
export class WeeklyUnitReportDTO {
    constructor(
        readonly id: number,
        readonly amount: number,
        readonly reference: string,
        readonly productionOrderType: string,
        readonly week: number,
        readonly year: number
    ){}
}