import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { CreateProductionOrderCommand } from "../../../domain/data-transfer-objects/CreateProductionOrderCommand";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderCreator } from "./ProductionOrderCreator";

export class CreateProductionOrderCommandHandler implements CommandHandler<CreateProductionOrderCommand> {

    constructor(private productionOrderCreator: ProductionOrderCreator) { }

    subscribedTo(): Command {
        return ProductionOrderCreator;
    }

    async handle(command: CreateProductionOrderCommand): Promise<void> {
        const productionOrderId = new ProductionOrderId(command.productionOrderId);
        const userId = new UserId(command.userId);
        await this.productionOrderCreator.execute({ productionOrderId, userId })
    }
}