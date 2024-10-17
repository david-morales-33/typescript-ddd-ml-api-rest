import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { UpdateProductionOrderCommand } from "../../../domain/data-transfer-objects/UpdateProductionOrderCommand";
import { ProductionOrderProcessEndDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderState } from "../../../../../Shared/domain/value-object/ProductionOrderState";
import { ProductionOrderUpdater } from "./ProductionOrderUpdater";
import { UpdateProductionOrderValidator } from "./UpdateProductionOrderValidator";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

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