import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { CreateProductionModuleAnomalyCommand } from "../../../domain/data-transfer-objects/CreateProductionModuleAnomalyCommand";
import { ProductionModuleAnomalyId } from "../../../domain/value-objects/ProductionModuleAnomalyId";
import { ProductionModuleAnomalyName } from "../../../domain/value-objects/ProductionModuleAnomalyName";
import { CreateProductionModuleAnomalyValidator } from "./CreateProductionModuleAnomalyValidator";
import { CreatorProductionModuleAnomaly } from "./CreatorProductionModuleAnomaly";

export class CreateProductionModuleAnomalyCommandHandler implements CommandHandler<CreateProductionModuleAnomalyCommand> {

    constructor(
        private creatorProductionModuleAnomaly: CreatorProductionModuleAnomaly,
        private createProductionModuleAnomalyValidator: CreateProductionModuleAnomalyValidator
    ) { }

    subscribedTo(): Command {
        return CreateProductionModuleAnomalyCommand;
    }
    async handle(command: CreateProductionModuleAnomalyCommand): Promise<void> {

        const productionModuleAnomalyName = new ProductionModuleAnomalyName(command.productionModuleAnomalyName);
        const productionModuleAnomalyId = new ProductionModuleAnomalyId(command.productionModuleAnomalyId);
        const createBy = new UserId(command.createBy);

        await this.createProductionModuleAnomalyValidator.execute({
            createBy,
            productionModuleAnomalyId
        });

        await this.creatorProductionModuleAnomaly.execute({
            createBy,
            productionModuleAnomalyId,
            productionModuleAnomalyName
        })

    }
}