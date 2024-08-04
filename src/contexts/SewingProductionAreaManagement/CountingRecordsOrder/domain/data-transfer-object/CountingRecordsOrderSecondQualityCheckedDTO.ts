

export class CountingRecordsOrderSecondQualityCheckedDTO {

    private _className: string = 'CountingRecordOrder.SecondQualityCheckedDTO';

    constructor(
        readonly id: number,
        readonly productionOrderId: string,
        readonly colorId: string,
        readonly garmentSize: string,
        readonly recordsAmount: number,
        readonly productionModuleId: number,
        readonly productionScheduleId: number,
        readonly creationDate: Date,
        readonly checkDate: Date,
        readonly createdByUser: string,
        readonly checkedByUser: string
    ) { }

    public get className(): string {
        return this._className;
    }
}