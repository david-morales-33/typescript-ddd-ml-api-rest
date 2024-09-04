import { CountingRecordsOrderEventDTO } from "../../../CountingRecordsOrderEvent/domain/data-transfer-object/CountingRecordsOrderEventDTO";


export class CountingRecordsOrderFirstQualityCheckedDTO{

    private _className : string = 'CountingRecordOrder.firstQualityChecked';

    constructor(
        readonly id: string,
        readonly productionOrderId: string,
        readonly colorId: string,
        readonly garmentSize: string,
        readonly initialTime: string,
        readonly finalTime: string,
        readonly recordsAmount: number,
        readonly productionModuleId: number,
        readonly productionScheduleId: number,
        readonly eventOnProductionModuleId: string,
        readonly creationDate: Date,
        readonly checkedDate: Date,
        readonly createdByUser: string,
        readonly checkedByUser: string,
        readonly eventOnCountingRecordsOrderList: CountingRecordsOrderEventDTO[]
    ){ }

    public get className(): string {
        return this._className;
    }
}