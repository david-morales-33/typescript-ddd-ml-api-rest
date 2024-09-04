import { Command } from "../../../../Shared/domain/Command";

type params = {
    id: string,
    productionOrderId: string,
    colorId: string,
    garmentSize: string,
    userId: string,
    productionModuleId: number,
    amount: number,
    eventOnProductionModule: string | null,
}

export class CreateCountingRecordsOrderSecondQualityCommand extends Command {
    readonly countingRecordsOrders: params[];

    constructor(countingRecordsOrders: params[]) {
        super();
        this.countingRecordsOrders = countingRecordsOrders;
    }

}