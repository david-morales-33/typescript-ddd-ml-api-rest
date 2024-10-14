import { ProductionOrderDetailNotStartedDTO } from "../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailNotStartedDTO";

export class ProductionOrderINotStartedDTO {

    private _className: string = 'ProductionOrder.notStartedDTO'

    constructor(
        readonly productionOrderid: string,
        readonly reference: string,
        readonly garmentType: string,
        readonly productionModuleAsigned: number,
        readonly plannedAmount: number,
        readonly executedAmount: number,
        readonly processStartDate: Date | null,
        readonly recordsOrderCounter: number,
        readonly productionOrderDetailList: ProductionOrderDetailNotStartedDTO[],
        readonly openByUser: string,
    ) { }
    
    public get className(): string{
        return this._className
    }
}