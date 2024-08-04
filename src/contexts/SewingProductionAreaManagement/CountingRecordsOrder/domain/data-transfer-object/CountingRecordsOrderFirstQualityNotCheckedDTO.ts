import { CountingRecordsOrderEventDTO } from "../../../CountingRecordsOrderEvent/domain/data-transfer-object/CountingRecordsOrderEventDTO";


export class CountingRecordsOrderFirstQualityNotCheckedDTO {

    private _className: string = 'CountingRecordsOrder.firstQualityNotCheckedDTO';

    constructor(
        readonly id: number,
        readonly productionOrderId: string,
        readonly colorId: string,
        readonly garmentSize: string,
        readonly initialTime: string,
        readonly finalTime: string,
        readonly recordsAmount: number,
        readonly productionModuleId: number,
        readonly productionScheduleId: number,
        readonly eventOnProductionModuleId: string | null,
        readonly creationDate: Date,
        readonly createByUser: string,
        readonly eventOnCountingRecordsOrderList: CountingRecordsOrderEventDTO[]
    ) { }

    public get className(): string {
        return this._className;
    }
}