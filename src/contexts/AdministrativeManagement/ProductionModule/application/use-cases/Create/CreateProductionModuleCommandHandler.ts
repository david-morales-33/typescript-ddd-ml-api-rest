import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { CreateProductionModuleCommand } from "../../../domain/data-transfer-objects/CreateProductionModuleCommand";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleMachineAmount } from "../../../domain/value-objects/ProductionModuleMachineAmount";
import { CreateProductionModuleValidator } from "./CreateProductionModuleValidator";
import { ProductionModuleCreator } from "./ProductionModuleCreator";


export class CreateProductionModuleCommandHandler implements CommandHandler<CreateProductionModuleCommand> {

    constructor(
        private createProductionModuleValidator: CreateProductionModuleValidator,
        private productionModuloCreator: ProductionModuleCreator
    ) { }
    subscribedTo(): Command {
        return CreateProductionModuleCommand;
    }

    async handle(command: CreateProductionModuleCommand): Promise<void> {

        const productionModuleId = new ProductionModuleId(command.productionModuleId);
        const machineAmount = new ProductionModuleMachineAmount(command.machineAmount);
        const createBy = new UserId(command.createBy);

        await this.createProductionModuleValidator.execute({ createBy, productionModuleId });
        await this.productionModuloCreator.execute({ productionModuleId, machineAmount, createBy })
    }
}