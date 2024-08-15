import { Command } from "../../../../Shared/domain/Command";

type detailParams = {
    id: number;
    colorId: string;
    garmentSize: string;
    recordsAmount: number;
    creationDate: Date;
    createByUser: string;
}

type commandParams = {
    userId: string;
    productionOrderId: string;
    productionModuleId: number;
    productionScheduleId: number;
    detailList: detailParams[]
}

export class CreateCountingRecordsOrderSecondQualityCommand extends Command {

    readonly userId: string;
    readonly productionOrderId: string;
    readonly productionModuleId: number;
    readonly productionScheduleId: number;
    readonly detailList: detailParams[]

    constructor({
        productionModuleId,
        productionOrderId,
        productionScheduleId,
        detailList,
        userId
    }: commandParams) {
        super();
        this.productionOrderId = productionOrderId;
        this.productionModuleId = productionModuleId;
        this.productionScheduleId = productionScheduleId;
        this.detailList = detailList;
        this.userId = userId;
    }
}
