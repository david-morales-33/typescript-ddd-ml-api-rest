import { Uuid } from '../../../../../Shared/domain/value-object/Uuid';
import { CommonCreationEvent } from '../../../../../Shared/domain/entities/CommonCreationEvent';
import { EventCreateDate } from "../../../../../Shared/domain/value-object/EventCreateDate";
import { EventDescription } from "../../../../../Shared/domain/value-object/EventDescription";
import { EventId } from "../../../../../Shared/domain/value-object/EventId";
import { AuthUser } from "../../../domain/entities/AuthUser";
import { UserCommandRepository } from '../../../../../SharedAdministrativeManagement/User/domain/repositories/UserCommandRepository';
import { UserDescription } from "../../../domain/value-objects/UserDescription";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserIdType } from "../../../../../Shared/domain/value-object/UserIdType";
import { UserName } from "../../../domain/value-objects/UserName";
import { UserPassword } from "../../../domain/value-objects/UserPassword";
import { UserProfileId } from "../../../domain/value-objects/UserProfileId";
import { UserState } from '../../../domain/value-objects/UserState';
import { UserNotFoundException } from "../../../../../Shared/domain/exceptions/UserNotFoundException";
import { UserExternalService } from "../../services/UserExternalService";

export class UserCreator {
    constructor(
        private userExternalService: UserExternalService,
        private userRepository: UserCommandRepository,
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

        const eventId = new EventId(Uuid.random().value);
        const creationDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Integración de usuario');

        const creationEvent = CommonCreationEvent.create(
            eventId,
            createBy,
            creationDate,
            eventDescription
        );

        const userName = new UserName(userFinded.userName);
        const userDescription = new UserDescription(userFinded.userDescription);
        const userState = new UserState(true);

        const newUser = AuthUser.create(
            userId,
            userName,
            userIdType,
            userProfileId,
            userDescription,
            userPassword,
            userState,
            [creationEvent]
        )

        await this.userRepository.save(newUser);
    }
}