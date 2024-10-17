import { Command } from "../../../../Shared/domain/Command";

type params = {
    productionOrderId: string,
    processStartDatePlanned: Date,
    processEndDatePlanned: Date,
    setBy: string
}

export class SetProductionOrderPlannedDatesCommand extends Command {
    readonly productionOrderId: string;
    readonly processStartDatePlanned: Date;
    readonly processEndDatePlanned: Date;
    readonly setBy: string;

    constructor({
        processEndDatePlanned,
        processStartDatePlanned,
        productionOrderId,
        setBy,
    }: params) {
        super();
        this.setBy = setBy;
        this.productionOrderId = productionOrderId;
        this.processEndDatePlanned = processEndDatePlanned;
        this.processStartDatePlanned = processStartDatePlanned;
    }
}