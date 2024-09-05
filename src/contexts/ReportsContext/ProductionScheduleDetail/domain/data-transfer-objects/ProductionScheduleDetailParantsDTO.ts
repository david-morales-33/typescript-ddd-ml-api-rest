import { ProductionScheduleDetailDTO } from '../data-transfer-objects/ProductionScheduleDetailDTO';

export class ProductionScheduleDetailParantsDTO {
    private _className: string = 'ProductionScheduleDetail.DTO'
    constructor(
        readonly id: number,
        readonly schedule: string,
        readonly plannedAmount: number,
        readonly currentAmount: number,
        readonly productionScheduleChild: ProductionScheduleDetailParantsDTO | ProductionScheduleDetailDTO,
        readonly plannedAmountAccumulated?: number,
        readonly currentAmountAccumulated?: number,
        readonly currentPercentageAmount?: number,
        readonly accumulatedPercentageAmount?: number
    ) { }

    public get className(): string {
        return this._className;
    }
}