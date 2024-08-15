import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { UpdateUserCommand } from "../../../domain/data-transfer-objects/UpdateUserCommand";
import { UserDescription } from "../../../domain/value-objects/UserDescription";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserIdType } from "../../../domain/value-objects/UserIdType";
import { UserName } from "../../../domain/value-objects/UserName";
import { UserPassword } from "../../../domain/value-objects/UserPassword";
import { UserProfileId } from "../../../domain/value-objects/UserProfileId";
import { UpdateUserValidator } from "./UpdateUserValidator";
import { UserUpdater } from "./UserUpdater";

export class UpdateUserCommandHandler implements CommandHandler<UpdateUserCommand> {

    constructor(
        private userUpdater: UserUpdater,
        private updateUserValidator: UpdateUserValidator
    ) { }

    subscribedTo(): Command {
        return UpdateUserCommand;
    }

    async handle(command: UpdateUserCommand): Promise<void> {
        
        const userId = new UserId(command.userId);
        const updateBy = new UserId(command.updateBy);

        await this.updateUserValidator.execute(userId);
        await this.userUpdater.execute({
            userId,
            updateBy,
            newName: command.newName ? new UserName(command.newName) : null,
            newPassword: command.newPassword ? new UserPassword(command.newPassword) : null,
            newDescription: command.newDescription ? new UserDescription(command.newDescription) : null,
            newIdType: command.newIdType ? new UserIdType(command.newIdType) : null,
            newProfileId: command.newProfileId ? new UserProfileId(command.newProfileId) : null
        })
    }
}