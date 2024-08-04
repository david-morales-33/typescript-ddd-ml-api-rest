

export class CountingRecordsOrderSecondQualityNotCheckedDTO {

    private _className : string= 'countingRecordsOrder.secondtQualityNotCheckedDTO';

    constructor(
        readonly id: number,
        readonly productionOrderId: string,
        readonly colorId: string,
        readonly garmentSize: string,
        readonly recordsAmount: number,
        readonly productionModuleId: number,
        readonly productionScheduleId: number,
        readonly creationDate: Date,
        readonly createByUser: string
    ) { }

    public get className(): string {
        return this._className;
    }
}