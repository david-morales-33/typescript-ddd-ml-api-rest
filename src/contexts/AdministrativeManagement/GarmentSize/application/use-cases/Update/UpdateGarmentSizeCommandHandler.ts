import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UpdateGarmentSizeCommand } from "../../../domain/data-transfer-objects/UpdateGarmentSizeCommand";
import { GarmentSizeId } from "../../../domain/value-objects/GarmentSizeId";
import { GarmentSizeLabel } from "../../../domain/value-objects/GarmentSizeLabel";
import { GarmentSizeOrder } from "../../../domain/value-objects/GarmentSizeOrder";
import { GarmentSizeState } from "../../../domain/value-objects/GarmentSizeState";
import { GarmentSizeType } from "../../../domain/value-objects/GarmentSizeType";
import { GarmentSizeUpdater } from "./GarmentSizeUpdater";
import { UpdateGarmentSizeValidator } from "./UpdateGarmentSizeValidator";

export class UpdateGarmentSizeCommandHandler implements CommandHandler<UpdateGarmentSizeCommand> {

    constructor(
        private UpdateGarmentSizeValidator: UpdateGarmentSizeValidator,
        private garmentSizeUpdater: GarmentSizeUpdater
    ) { }

    subscribedTo(): Command {
        return UpdateGarmentSizeCommand;
    }

    async handle(command: UpdateGarmentSizeCommand): Promise<void> {

        const updateBy = new UserId(command.updateBy);
        const garmentSizeId = new GarmentSizeId(command.garmentSizeId);


        await this.UpdateGarmentSizeValidator.execute(updateBy)
        await this.garmentSizeUpdater.execute({
            updateBy,
            garmentSizeId,
            newLabel: command.garmentSizeLabel ? new GarmentSizeLabel(command.garmentSizeLabel) : null,
            newOrder: command.garmenSizeOrder ? new GarmentSizeOrder(command.garmenSizeOrder) : null,
            newState: command.garmentSizeState !== null ? new GarmentSizeState(command.garmentSizeState) : null,
            newType: command.garmentSizeType ? new GarmentSizeType(command.garmentSizeType): null
        })
    }
}