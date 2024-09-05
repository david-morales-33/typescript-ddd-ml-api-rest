
export class ProductionScheduleDetailDTO {
    private _className: string = 'productionScheduleDetail.DTO'
    constructor(
        readonly id: number,
        readonly schedule: string,
        readonly plannedAmount: number,
        readonly currentAmount: number,
        readonly plannedAmountAccumulated?: number,
        readonly currentAmountAccumulated?: number,
        readonly currentPercentageAmount?: number,
        readonly accumulatedPercentageAmount?: number
    ) { }

    public get className(): string {
        return this._className;
    }
}