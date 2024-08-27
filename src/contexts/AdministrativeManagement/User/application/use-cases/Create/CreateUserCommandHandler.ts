import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { CreateUserCommand } from "../../../domain/data-transfer-objects/CreateUserCommand";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserIdType } from "../../../domain/value-objects/UserIdType";
import { UserPassword } from "../../../domain/value-objects/UserPassword";
import { UserProfileId } from "../../../domain/value-objects/UserProfileId";
import { CreateUserValidator } from "./CreateUserValidator";
import { UserCreator } from "./UserCreator";

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {

    constructor(
        private userCreator: UserCreator,
        private createUserValidator: CreateUserValidator
    ) { }

    subscribedTo(): Command {
        return CreateUserCommand;
    }

    async handle(command: CreateUserCommand): Promise<void> {

        const userProfileId = new UserProfileId(command.userProfileId);
        const userPassword = new UserPassword(command.userPassword);
        const userIdType = new UserIdType(command.userIdType);
        const createBy = new UserId(command.createBy);
        const userId = new UserId(command.userId);

        await this.createUserValidator.execute({ createBy, userId });
        await this.userCreator.execute({ userId, createBy, userIdType, userPassword, userProfileId })
    }
}