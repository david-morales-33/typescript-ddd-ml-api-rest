
export class MonthlyUnitReportByProductionModuleDTO {
    constructor(
        readonly id: number,
        readonly amount: number,
        readonly reference: string,
        readonly productionModule: number,
        readonly productionOrderType: string,
        readonly month: number,
        readonly year: number
    ) { }
}