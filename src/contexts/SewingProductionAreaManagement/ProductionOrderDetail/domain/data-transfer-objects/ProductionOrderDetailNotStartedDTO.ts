export class ProductionOrderDetailNotStartedDTO {
    private _className : string = 'ProductionOrderDetail.notStartedDTO';
    constructor(
        readonly productionOrderDetailId: string,
        readonly productionOrderId: string,
        readonly colorId: string,
        readonly colorLabel: string,
        readonly garmentSize: string,
        readonly ean: string,
        readonly plannedAmount: number,
        readonly executedAmount: number,
        readonly processStartDate: Date | null,
        readonly recordsOrderCounter: number,
        readonly countingRecordsOrderListId: string[]
    ) { }
    public get className(): string {
        return this._className;
    }
}