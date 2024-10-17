import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { CreateProductionOrderCommand } from "../../../domain/data-transfer-objects/CreateProductionOrderCommand";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderValidator } from "./ProductionOrderValidator";
import { ProductionOrderCreator } from "./ProductionOrderCreator";
import { GarmentType } from "../../../../Shared/domain/value-object/GarmentType";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

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
        const garmentType = new GarmentType(command.garmentType);
        const productionModule = new ProductionModuleId(command.productionModuleAssigned);

        await this.productionOrderValidator.execute(userId)
        await this.productionOrderCreator.execute({ productionOrderId, userId, garmentType, productionModule })
    }
}