import { Command } from "../../../../../Shared/domain/CQRS/Command";
import { CommandHandler } from "../../../../../Shared/domain/CQRS/CommandHandler";
import { GarmentSize as GarmentSizeId } from "../../../../../Shared/domain/value-object/GarmentSize";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { CreateGarmentSizeComman } from "../../../domain/data-transfer-objects/CreateGarmentSizeComman";
import { GarmentSizeLabel } from "../../../domain/value-objects/GarmentSizeLabel";
import { GarmentSizeOrder } from "../../../domain/value-objects/GarmentSizeOrder";
import { GarmentSizeType } from "../../../domain/value-objects/GarmentSizeType";
import { CreateGarmentSizeValidator } from "./CreateGarmentSizeValidator";
import { GarmentSizeCreator } from "./GarmentSizeCreator";

export class CreateGarmentSizeCommandHandler implements CommandHandler<CreateGarmentSizeComman> {
    constructor(
        private createGarmentSizeValidator: CreateGarmentSizeValidator,
        private garmentSizeCreator: GarmentSizeCreator
    ) { }

    subscribedTo(): Command {
        return CreateGarmentSizeComman;
    }
    async handle(command: CreateGarmentSizeComman): Promise<void> {

        const createBy = new UserId(command.createBy);
        const garmentSizeId = new GarmentSizeId(command.garmentSizeId);
        const garmentSizeOrder = new GarmentSizeOrder(command.garmenSizeOrder);
        const garmentSizeType = new GarmentSizeType(command.garmentSizeType);
        const garmentSizeLabel = new GarmentSizeLabel(command.garmentSizeLabel);

        await this.createGarmentSizeValidator.execute({ garmentSizeId, createBy });
        await this.garmentSizeCreator.execute({
            createBy,
            garmentSizeId,
            garmentSizeOrder,
            garmentSizeLabel,
            garmentSizeType
        })
    }
}