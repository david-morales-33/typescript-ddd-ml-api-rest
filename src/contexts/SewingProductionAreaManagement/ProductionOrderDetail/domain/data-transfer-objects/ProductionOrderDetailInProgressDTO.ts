export class ProductionOrderDetailInProgressDTO {

    private _className : string = 'ProductionOrderDetail.inProgressDTO';

    constructor(
        readonly productionOrderDetailId: string,
        readonly productionOrderId: string,
        readonly colorId: string,
        readonly garmentSize: string,
        readonly ean: string,
        readonly plannedAmount: number,
        readonly executedAmount: number,
        readonly processStartDate: Date,
        readonly processEndDate: Date | null,
        readonly recordsOrderCounter: number,
        readonly recordsOrderCheckedCounter: number,
        readonly countingRecordsOrderListId: number[],
        readonly countingRecordsOrderCheckedListId: number[]
    ) { }
    
    public get className(): string {
        return this._className;
    }
}

