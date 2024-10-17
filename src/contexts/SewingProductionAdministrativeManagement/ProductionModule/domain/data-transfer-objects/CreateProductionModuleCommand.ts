import { Command } from "../../../../Shared/domain/CQRS/Command";

type params = {
    productionModuleId: number;
    machineAmount: number,
    createBy: string,
}

export class CreateProductionModuleCommand extends Command {
    public readonly productionModuleId: number;
    public readonly machineAmount: number;
    public readonly createBy: string;

    constructor({
        productionModuleId,
        machineAmount,
        createBy
    }: params) {
        super();
        this.createBy = createBy;
        this.machineAmount = machineAmount;
        this.productionModuleId = productionModuleId;
    }
}