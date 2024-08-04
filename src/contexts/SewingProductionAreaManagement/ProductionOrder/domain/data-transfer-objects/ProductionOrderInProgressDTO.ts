import { ProductionOrderDetailInProgressDTO } from '../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailInProgressDTO'
import { ProductionOrderDetailNotStartedDTO } from '../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailNotStartedDTO'

export class ProductionOrderInProgressDTO {
    constructor(
        readonly productionOrderid: string,
        readonly reference: string,
        readonly plannedAmount: number,
        readonly executedAmount: number,
        readonly processStartDate: Date,
        readonly processEndDate: Date | null,
        readonly recordsOrderCounter: number,
        readonly recordsOrderCheckedCounter: number,
        readonly openByUser: string,
        readonly productionOrderDetailList: (ProductionOrderDetailInProgressDTO | ProductionOrderDetailNotStartedDTO)[],
    ) { }
}