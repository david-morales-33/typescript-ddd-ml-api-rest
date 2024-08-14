import { CommonCreationEvent } from "../../../CreationEvent/domain/entities/CommonCreationEvent";
import { CreationEventCreateBy } from "../../../CreationEvent/domain/value-objects/CreationEventCreateBy";
import { CreationEventCreateDate } from "../../../CreationEvent/domain/value-objects/CreationEventCreateDate";
import { CreationEventDescription } from "../../../CreationEvent/domain/value-objects/CreationEventDescription";
import { CreationEventId } from "../../../CreationEvent/domain/value-objects/CreationEventId";
import { AuthUserDTO } from "../data-transfer-objects/AuthUserDTO";
import { UserRoot } from "../interfaces/UserRoot";
import { UserDescription } from "../value-objects/UserDescription";
import { UserId } from "../value-objects/UserId";
import { UserIdType } from "../value-objects/UserIdType";
import { UserName } from "../value-objects/UserName";
import { UserPassword } from "../value-objects/UserPassword";
import { UserProfileId } from "../value-objects/UserProfileId";

export class AuthUser implements UserRoot {

    constructor(
        readonly id: UserId,
        readonly name: UserName,
        readonly idType: UserIdType,
        readonly profileId: UserProfileId,
        readonly description: UserDescription,
        readonly password: UserPassword,
        readonly creationEvent: CommonCreationEvent
    ) { }

    static create(
        id: UserId,
        name: UserName,
        idType: UserIdType,
        profileId: UserProfileId,
        description: UserDescription,
        password: UserPassword,
        creationEvent: CommonCreationEvent

    ): AuthUser {
        return new AuthUser(
            id,
            name,
            idType,
            profileId,
            description,
            password,
            creationEvent
        )
    }

    static fromPrimitives(data: AuthUserDTO): AuthUser {
        return new AuthUser(
            new UserId(data.id),
            new UserName(data.name),
            new UserIdType(data.idType),
            new UserProfileId(data.profileId),
            new UserDescription(data.description),
            new UserPassword(data.password),
            new CommonCreationEvent(
                new CreationEventId(data.creationEvent.id),
                new CreationEventCreateBy(data.creationEvent.createBy),
                new CreationEventCreateDate(data.creationEvent.createDate),
                new CreationEventDescription(data.creationEvent.description)
            )
        )
    }

    toPrimitives(): AuthUserDTO {
        return new AuthUserDTO(
            this.id.value,
            this.name.value,
            this.idType.value,
            this.profileId.value,
            this.description.value,
            this.password.value,
            this.creationEvent.toPrimitive()
        )
    }
}