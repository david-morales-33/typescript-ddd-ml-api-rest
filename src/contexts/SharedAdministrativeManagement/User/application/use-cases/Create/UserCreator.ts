import { Uuid } from '../../../../../Shared/domain/value-object/Uuid';
import { UserCommandRepository } from '../../../domain/repositories/UserCommandRepository';
import { UserId } from '../../../../../Shared/domain/value-object/UserId';
import { UserProfileId } from '../../../../../Shared/domain/value-object/UserProfileId';
import { UserPassword } from '../../../../../Shared/domain/value-object/UserPassword';
import { UserName } from '../../../../../Shared/domain/value-object/UserName';
import { UserState } from '../../../../../Shared/domain/value-object/UserState';
import { AuthUser } from '../../../domain/entities/AuthUser';
import { UserDescription } from '../../../../../Shared/domain/value-object/UserDescription';
import { UserNotFoundException } from '../../../../../Shared/domain/exceptions/UserNotFoundException';
import { UserExternalService } from '../../services/UserExternalService';
import { UserIdType } from '../../../../../Shared/domain/value-object/UserIdType';
import { EventId } from '../../../../../Shared/domain/value-object/EventId';
import { EventCreateDate } from '../../../../../Shared/domain/value-object/EventCreateDate';
import { EventDescription } from '../../../../../Shared/domain/value-object/EventDescription';
import { CommonCreationEvent } from '../../../../../Shared/domain/entities/CommonCreationEvent';
import { PasswordService } from '../../../../../Shared/domain/services/PasswordService';

export class UserCreator {
    constructor(
        private userExternalService: UserExternalService,
        private passwordService: PasswordService,
        private userRepository: UserCommandRepository
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

        if (userFinded.length === 0) throw new UserNotFoundException(userId);

        const eventId = new EventId(Uuid.random().value);
        const creationDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Integración de usuario');

        const creationEvent = CommonCreationEvent.create(
            eventId,
            createBy,
            creationDate,
            eventDescription
        );

        const userName = new UserName(userFinded[0].userName);
        const userDescription = new UserDescription(userFinded[0].userDescription);
        const userState = new UserState(true);
        const hash = await this.passwordService.encrypt(userPassword)

        if (hash! == null) throw new Error('Falló la encriptación de la contraseña');

        const newUser = AuthUser.create(
            userId,
            userName,
            userIdType,
            userProfileId,
            userDescription,
            hash,
            userState,
            [creationEvent]
        )

        await this.userRepository.save(newUser);
    }
}