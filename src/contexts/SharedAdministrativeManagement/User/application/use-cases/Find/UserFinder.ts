import { UserResponseRepository } from "../../../domain/repositories/UserResponseRepository";
import { UserNotFoundException } from "../../../../../Shared/domain/exceptions/UserNotFoundException";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class UserFinder {
    constructor(private userRepository: UserResponseRepository) { }

    async execute(userId: UserId) {
        const user = await this.userRepository.find(userId);

        if (user === null)
            throw new UserNotFoundException(userId)

        return user;
    }
}