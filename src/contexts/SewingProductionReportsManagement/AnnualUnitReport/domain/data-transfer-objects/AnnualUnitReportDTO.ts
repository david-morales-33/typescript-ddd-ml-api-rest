
export class AnnualUnitReportDTO {
    constructor(
        readonly id: number,
        readonly amount: number,
        readonly reference: string,
        readonly productionOrderType: string,
        readonly year: number
    ) { }
}