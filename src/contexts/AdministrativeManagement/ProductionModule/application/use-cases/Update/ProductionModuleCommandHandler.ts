import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UpdateProductionModuleCommand } from "../../../domain/data-transfer-objects/UpdateProductionModuleCommand";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleMachineAmount } from "../../../domain/value-objects/ProductionModuleMachineAmount";
import { ProductionModuleState } from "../../../domain/value-objects/ProductionModuleState";
import { ProductionModuleSupervisorId } from "../../../domain/value-objects/ProductionModuleSupervisorId";
import { CreateProductionModuleValidator } from "../Create/CreateProductionModuleValidator";
import { ProductionModuleUpdater } from "./ProductionModuleUpdater";
import { UpdateProductionModuleValidator } from "./UpdateProductionModuleValidator";


export class ProductionModuleCommandHandler implements CommandHandler<UpdateProductionModuleCommand> {

    constructor(
        private productionModuleUpdater: ProductionModuleUpdater,
        private updateProductionModuleValidator: UpdateProductionModuleValidator
    ) { }

    subscribedTo(): Command {
        return UpdateProductionModuleCommand;
    }

    async handle(command: UpdateProductionModuleCommand): Promise<void> {

        const productionModuleId = new ProductionModuleId(command.productionModuleId);
        const updateBy = new UserId(command.updateBy);

        await this.updateProductionModuleValidator.execute({ updateBy, productionModuleId });
        await this.productionModuleUpdater.execute({
            newCurrentSupervisor: command.newCurrentSupervisor ? new ProductionModuleSupervisorId(command.newCurrentSupervisor) : null,
            newMachineAmount: command.newMachineAmount ? new ProductionModuleMachineAmount(command.newMachineAmount) : null,
            newOperationState: command.newOperationState ? new ProductionModuleState(command.newOperationState) : null,
            newState: command.newState ? new ProductionModuleState(command.newState) : null,
            productionModuleId,
            updateBy,
        })
    }
}