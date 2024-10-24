import { Command } from "../../../../../Shared/domain/CQRS/Command";
import { CreateUserCommand } from "../../../domain/data-transfer-objects/CreateUserCommand";
import { CreateUserValidator } from "./CreateUserValidator";
import { UserCreator } from "./UserCreator";
import { UserProfileId } from "../../../../../Shared/domain/value-object/UserProfileId";
import { UserPassword } from "../../../../../Shared/domain/value-object/UserPassword";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserIdType } from "../../../../../Shared/domain/value-object/UserIdType";
import { CommandHandler } from "../../../../../Shared/domain/CQRS/CommandHandler";

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {

    constructor(private userCreator: UserCreator) { }

    subscribedTo(): Command {
        return CreateUserCommand;
    }

    async handle(command: CreateUserCommand): Promise<void> {

        const userProfileId = new UserProfileId(command.userProfileId);
        const userPassword = new UserPassword(command.userPassword);
        const userIdType = new UserIdType(command.userIdType);
        const createBy = new UserId(command.createBy);
        const userId = new UserId(command.userId);
        await this.userCreator.execute({ userId, createBy, userIdType, userPassword, userProfileId })
    }
}