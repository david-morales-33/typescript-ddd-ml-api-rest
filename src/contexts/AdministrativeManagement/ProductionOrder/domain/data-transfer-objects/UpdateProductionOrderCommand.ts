import { Command } from "../../../../Shared/domain/Command";

type params = {
    productionOrderId: string,
    newProcessStartDatePlanned?: Date;
    newProcessEndDatePlanned?: Date;
    newState?: boolean,
    updateBy: string
}

export class UpdateProductionOrderCommand implements Command {
    readonly productionOrderId: string;
    readonly newProcessStartDatePlanned: Date | null;
    readonly newProcessEndDatePlanned: Date | null;
    readonly newState: boolean | null;
    readonly updateBy: string;

    constructor({
        productionOrderId,
        updateBy,
        newProcessEndDatePlanned,
        newProcessStartDatePlanned,
        newState
    }: params) {
        this.productionOrderId = productionOrderId;
        this.updateBy = updateBy;
        this.newProcessStartDatePlanned = newProcessStartDatePlanned ?? null;
        this.newProcessEndDatePlanned = newProcessEndDatePlanned ?? null;
        this.newState = newState ?? null;
    }
}