
export class AnnualUnitReportByProductionModuleDTO {
    constructor(
        readonly id: number,
        readonly amount: number,
        readonly reference: string,
        readonly productionModule: number,
        readonly productionOrderType: string,
        readonly year: number
    ){}
}