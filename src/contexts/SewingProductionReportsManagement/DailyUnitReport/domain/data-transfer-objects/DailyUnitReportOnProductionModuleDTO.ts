
export class DailyUnitReportOnProductionModuleDTO {
    constructor(
        readonly id: number,
        readonly amount: number,
        readonly reference: string,
        readonly productionModule: number,
        readonly productionOrderType: string,
        readonly day: number,
        readonly year: number
    ) { }
}