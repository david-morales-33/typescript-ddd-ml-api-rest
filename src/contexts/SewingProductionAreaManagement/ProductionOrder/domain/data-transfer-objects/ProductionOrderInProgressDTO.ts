import { ProductionOrderDetailInProgressDTO } from '../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailInProgressDTO'
import { ProductionOrderDetailNotStartedDTO } from '../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailNotStartedDTO'

export class ProductionOrderInProgressDTO {
    private _className: string = 'ProductionOrder.inProgressDTO'
    constructor(
        readonly productionOrderid: string,
        readonly reference: string,
        readonly garmentType: string,
        readonly productionModuleAsigned: number,
        readonly plannedAmount: number,
        readonly executedAmount: number,
        readonly processStartDate: Date,
        readonly processEndDate: Date | null,
        readonly recordsOrderCounter: number,
        readonly recordsOrderCheckedCounter: number,
        readonly openByUser: string,
        readonly productionOrderDetailList: (ProductionOrderDetailInProgressDTO | ProductionOrderDetailNotStartedDTO)[],
    ) { }

    public get className(): string {
        return this._className
    }
}