import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { UpdateProductionModuleValidator } from "../../../../ProductionModule/application/use-cases/Update/UpdateProductionModuleValidator";
import { ProductionOrderId } from "../../../../shared/domain/value-objects/ProductionOrderId";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UpdateProductionOrderCommand } from "../../../domain/data-transfer-objects/UpdateProductionOrderCommand";
import { ProductionOrderProcessEndDatePlanned } from "../../../domain/value-objects/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../domain/value-objects/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderState } from "../../../domain/value-objects/ProductionOrderState";
import { ProductionOrderUpdater } from "./ProductionOrderUpdater";
import { UpdateProductionOrderValidator } from "./UpdateProductionOrderValidator";

export class ProductionOrderCommandHandler implements CommandHandler<UpdateProductionOrderCommand> {
    constructor(
        private productionOrderUpdater: ProductionOrderUpdater,
        private productionOrderValidator: UpdateProductionOrderValidator
    ) { }

    subscribedTo(): Command {
        return UpdateProductionOrderCommand;
    }

    async handle(command: UpdateProductionOrderCommand): Promise<void> {
        await this.productionOrderValidator.execute(new UserId(command.updateBy))
        await this.productionOrderUpdater.execute({
            updateBy: new UserId(command.updateBy),
            productionOrderId: new ProductionOrderId(command.productionOrderId),
            processEndDatePlanned: command.newProcessEndDatePlanned ? new ProductionOrderProcessEndDatePlanned(command.newProcessEndDatePlanned) : null,
            processStartDatePlanned: command.newProcessStartDatePlanned ? new ProductionOrderProcessStartDatePlanned(command.newProcessStartDatePlanned) : null,
            state: command.newState !== null ? new ProductionOrderState(command.newState) : null
        })
    }

}