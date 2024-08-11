import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { CreateProductionOrderCommand } from "../../../domain/data-transfer-objects/CreateProductionOrderCommand";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderValidator } from "./ProductionOrderValidator";
import { ProductionOrderCreator } from "./ProductionOrderCreator";

export class CreateProductionOrderCommandHandler implements CommandHandler<CreateProductionOrderCommand> {

    constructor(
        private productionOrderCreator: ProductionOrderCreator,
        private productionOrderValidator: ProductionOrderValidator
    ) { }

    subscribedTo(): Command {
        return ProductionOrderCreator;
    }

    async handle(command: CreateProductionOrderCommand): Promise<void> {

        const productionOrderId = new ProductionOrderId(command.productionOrderId);
        const userId = new UserId(command.userId);

        await this.productionOrderValidator.execute(userId);
        await this.productionOrderCreator.execute({ productionOrderId, userId })
    }
}