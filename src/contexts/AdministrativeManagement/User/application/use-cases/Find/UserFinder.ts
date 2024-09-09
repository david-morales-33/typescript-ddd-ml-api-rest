import { UserResponseRepository } from "../../../domain/repositories/UserResponseRepository";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserNotFoundException } from "../../exceptions/UserNotFoundException";

export class UserFinder {
    constructor(private userRepository: UserResponseRepository) { }

    async execute(userId: UserId) {
        const user = await this.userRepository.find(userId);

        if (user === null)
            throw new UserNotFoundException(userId)

        return user;
    }
}