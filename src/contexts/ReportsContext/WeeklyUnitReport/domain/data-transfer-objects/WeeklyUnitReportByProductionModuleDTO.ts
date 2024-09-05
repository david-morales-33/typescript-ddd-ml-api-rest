
export class WeeklyUnitReportByProductionModuleDTO {
    constructor(
        readonly id: number,
        readonly amount: number,
        readonly reference: string,
        readonly productionModule: number,
        readonly productionOrderType: string,
        readonly week: number,
        readonly year: number
    ) { }
}