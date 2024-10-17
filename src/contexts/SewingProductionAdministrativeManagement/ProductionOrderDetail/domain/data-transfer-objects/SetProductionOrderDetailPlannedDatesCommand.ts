import { Command } from "../../../../Shared/domain/CQRS/Command";

type params = {
    productionOrderId: string,
    colorId: string;
    garmentSize: string;
    processStartDatePlanned: Date,
    processEndDatePlanned: Date,
    productionModuleId: number,
    setBy: string
}

export class SetProductionOrderDetailPlannedDatesCommand extends Command {
    readonly productionOrderId: string;
    readonly colorId: string;
    readonly garmentSize: string;
    readonly processStartDatePlanned: Date;
    readonly processEndDatePlanned: Date;
    readonly productionModuleId: number;
    readonly setBy: string;

    constructor({
        processEndDatePlanned,
        garmentSize,
        colorId,
        processStartDatePlanned,
        productionOrderId,
        productionModuleId,
        setBy,
    }: params) {
        super();
        this.setBy = setBy;
        this.productionOrderId = productionOrderId;
        this.colorId = colorId;
        this.garmentSize = garmentSize;
        this.processEndDatePlanned = processEndDatePlanned;
        this.processStartDatePlanned = processStartDatePlanned;
        this.productionModuleId = productionModuleId;
    }
}