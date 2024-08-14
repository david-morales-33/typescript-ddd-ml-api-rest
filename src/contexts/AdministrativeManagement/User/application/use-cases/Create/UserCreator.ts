import { CommonCreationEvent } from "../../../../CreationEvent/domain/entities/CommonCreationEvent";
import { CreationEventCreateDate } from "../../../../CreationEvent/domain/value-objects/CreationEventCreateDate";
import { CreationEventDescription } from "../../../../CreationEvent/domain/value-objects/CreationEventDescription";
import { CreationEventId } from "../../../../CreationEvent/domain/value-objects/CreationEventId";
import { AuthUser } from "../../../domain/entities/AuthUser";
import { AuthUserRepository } from "../../../domain/repositories/AuthUserRepository";
import { UserDescription } from "../../../domain/value-objects/UserDescription";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserIdType } from "../../../domain/value-objects/UserIdType";
import { UserName } from "../../../domain/value-objects/UserName";
import { UserPassword } from "../../../domain/value-objects/UserPassword";
import { UserProfileId } from "../../../domain/value-objects/UserProfileId";
import { UserNotFoundException } from "../../exceptions/UserNotFoundException";
import { UserExternalService } from "../../services/UserExternalService";


export class UserCreator {
    constructor(
        private userExternalService: UserExternalService,
        private userRepository: AuthUserRepository,

    ) { }

    async execute(params: {
        userId: UserId,
        userProfileId: UserProfileId,
        userPassword: UserPassword,
        userIdType: UserIdType,
        createBy: UserId
    }) {

        const { userId, userPassword, userProfileId, userIdType, createBy } = params;

        const userFinded = await this.userExternalService.find(userId);

        if (userFinded === null || userFinded === undefined)
            throw new UserNotFoundException(userId);

        const eventId = new CreationEventId(1);
        const creationDate = new CreationEventCreateDate(new Date());
        const eventDescription = new CreationEventDescription('Integración de usuario');

        const creationEvent = CommonCreationEvent.create(
            eventId,
            createBy,
            creationDate,
            eventDescription
        );

        const userName = new UserName(userFinded.userName);
        const userDescription = new UserDescription(userFinded.userDescription);

        const newUser = AuthUser.create(
            userId,
            userName,
            userIdType,
            userProfileId,
            userDescription,
            userPassword,
            creationEvent
        )

        await this.userRepository.save(newUser);
    }
}