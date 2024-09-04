import { Command } from "../../../../Shared/domain/Command";

type eventOnCountingRecordsOrder = {
    id: string,
    name: string,
    previusValue: number,
    currentValue: number,
    eventDate: Date
}

type params = {
    id: string,
    productionOrderId: string,
    colorId: string,
    garmentSize: string,
    initialTime: string,
    finalTime: string,
    userId: string,
    productionModuleId: number,
    amount: number,
    eventOnProductionModule: string | null,
    eventOnCountingRecordsOrder: eventOnCountingRecordsOrder[]
}

export class CreateCountingRecordsOrderFirstQualityCommand extends Command {
    readonly countingRecordsOrders: params[];

    constructor(countingRecordsOrders: params[]) {
        super();
        this.countingRecordsOrders = countingRecordsOrders;
    }

}