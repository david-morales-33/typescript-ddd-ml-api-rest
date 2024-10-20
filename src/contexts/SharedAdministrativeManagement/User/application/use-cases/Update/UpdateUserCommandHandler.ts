import { Command } from "../../../../../Shared/domain/CQRS/Command";
import { CommandHandler } from "../../../../../Shared/domain/CQRS/CommandHandler";
import { UserDescription } from "../../../../../Shared/domain/value-object/UserDescription";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserIdType } from "../../../../../Shared/domain/value-object/UserIdType";
import { UserName } from "../../../../../Shared/domain/value-object/UserName";
import { UserProfileId } from "../../../../../Shared/domain/value-object/UserProfileId";
import { UserState } from "../../../../../Shared/domain/value-object/UserState";
import { UpdateUserCommand } from "../../../domain/data-transfer-objects/UpdateUserCommand";
import { UserPassword } from "../../../../../Shared/domain/value-object/UserPassword";
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
            newState: command.newState !== null ? new UserState(command.newState) : null,
            newProfileId: command.newProfileId ? new UserProfileId(command.newProfileId) : null
        })
    }
}