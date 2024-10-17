import { Command } from "../../../../Shared/domain/CQRS/Command";

type params = {
    productionModuleId: number,
    newCurrentSupervisor?: string,
    newMachineAmount?: number,
    newOperationState?: boolean,
    newState?: boolean,
    updateBy: string
}

export class UpdateProductionModuleCommand extends Command {

    readonly productionModuleId: number;
    readonly newCurrentSupervisor: string | null;
    readonly newMachineAmount: number | null;
    readonly newOperationState: boolean | null;
    readonly newState: boolean | null;
    readonly updateBy: string;

    constructor({
        productionModuleId,
        newCurrentSupervisor,
        newMachineAmount,
        newOperationState,
        newState,
        updateBy
    }: params) {
        super();
        this.productionModuleId = productionModuleId;
        this.newCurrentSupervisor = newCurrentSupervisor ?? null;
        this.newMachineAmount = newMachineAmount ?? null;
        this.newOperationState = newOperationState ?? null;
        this.newState = newState ?? null;
        this.updateBy = updateBy;
    }
}