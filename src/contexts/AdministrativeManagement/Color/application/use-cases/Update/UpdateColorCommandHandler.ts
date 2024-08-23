import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { ColorId } from "../../../../shared/domain/value-objects/ColorId";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UpdateColorCommand } from "../../../domain/data-transfer-objects/UpdateColorCommand";
import { ColorLabel } from "../../../domain/value-objects/ColorLabel";
import { ColorState } from "../../../domain/value-objects/ColorState";
import { ColorUpdater } from "./ColorUpdater";
import { UpdateColorValidator } from "./UpdateColorValidator";

export class UpdateColorCommandHandler implements CommandHandler<UpdateColorCommand> {
    constructor(
        private colorUpdater: ColorUpdater,
        private updateColorValidator: UpdateColorValidator
    ) { }

    subscribedTo(): Command {
        return UpdateColorCommand;
    }

    async handle(command: UpdateColorCommand): Promise<void> {
        await this.updateColorValidator.execute(new UserId(command.updateBy));
        await this.colorUpdater.execute({
            updateBy: new UserId(command.updateBy),
            colorId: new ColorId(command.colorId),
            newLabel: command.newLabel !== null ? new ColorLabel(command.newLabel) : null,
            newState: command.newState !== null ? new ColorState(command.newState) : null,
        })
    }
}