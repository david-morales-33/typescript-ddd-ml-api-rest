import { UserId } from "../../../domain/value-objects/UserId";
import { UserViewDTO } from "../../data-transfer-objects/UserViewDTO";
import { UserNotFoundException } from "../../exceptions/UserNotFoundException";
import { UserQueryRepository } from "../../repositories/UserQueryRepository";

export class UserFinder {
    constructor(private userRepository: UserQueryRepository) { }

    async execute(userId: UserId): Promise<UserViewDTO> {
        const user = await this.userRepository.find(userId);

        if (user === null)
            throw new UserNotFoundException(userId)

        return user;
    }
}