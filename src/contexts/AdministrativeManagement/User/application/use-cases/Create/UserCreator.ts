import { CommonUser } from "../../../domain/entities/CommonUser";
import { CommonUserRepository } from "../../../domain/repositories/CommonUserRepository";
import { UserDescription } from "../../../domain/value-objects/UserDescription";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserName } from "../../../domain/value-objects/UserName";
import { UserProfileId } from "../../../domain/value-objects/UserProfileId";
import { UserProfileName } from "../../../domain/value-objects/UserProfileName";
import { UserNotFoundException } from "../../exceptions/UserNotFoundException";
import { UserExternalService } from "../../services/UserExternalService";


export class UserCreator {
    constructor(
        private userExternalService: UserExternalService,
        private userRepository: CommonUserRepository,

    ) { }

    async execute(params: { userId: UserId, userProfileId: UserProfileId, userPassword: any }) {

        const { userId, userPassword, userProfileId } = params;

        const userFinded = await this.userExternalService.find(userId);

        if (userFinded === null || userFinded === undefined)
            throw new UserNotFoundException(userId);

        const userName = new UserName(userFinded.userName);
        const userProfileName = new UserProfileName('No defined');
        const userDescription = new UserDescription(userFinded.userDescription)

        const newUser = CommonUser.create(
            userId,
            userName,
            userProfileId,
            userProfileName,
            userDescription,
            []
        );

        await this.userRepository.save(newUser);
    }
}