import { Command } from "../../../../Shared/domain/Command";

type event = {
    id: number;
    name: string;
    previusValue: number;
    currentValue: number;
    eventDate: Date;
}

type detailParams = {
    id: number;
    colorId: string;
    garmentSize: string;
    recordsAmount: number;
    creationDate: Date;
    createByUser: string;
    eventOnCountingRecordsOrderList: event[] | [];
}

type commandParams = {
    userId: string;
    productionOrderId: string;
    initialTime: string;
    finalTime: string;
    productionModuleId: number;
    eventOnProductionModuleId: string | null;
    productionScheduleId: number;
    detailList: detailParams[]
}

export class CreateCountingRecordsOrderFirstQualityCommand extends Command {

    readonly userId: string;
    readonly productionOrderId: string;
    readonly initialTime: string;
    readonly finalTime: string;
    readonly productionModuleId: number;
    readonly eventOnProductionModuleId: string | null;
    readonly productionScheduleId: number;
    readonly detailList: detailParams[]

    constructor({
        productionModuleId,
        finalTime,
        initialTime,
        productionOrderId,
        productionScheduleId,
        eventOnProductionModuleId,
        detailList,
        userId
    }: commandParams) {
        super();
        this.productionOrderId = productionOrderId;
        this.productionModuleId = productionModuleId;
        this.finalTime = finalTime;
        this.initialTime = initialTime;
        this.eventOnProductionModuleId = eventOnProductionModuleId;
        this.productionScheduleId = productionScheduleId;
        this.detailList = detailList;
        this.userId = userId;
    }
}
