import {CommonCreationEventDTO } from '../../../Event/domain/data-transfer-object/CommonCreationEventDTO'
import {CommonModificationEventDTO} from '../../../Event/domain/data-transfer-object/CommonModificationEventDTO'
import {CommonCreationEvent} from '../../../Event/domain/entities/CommonCreationEvent'
import {CommonModificationEvent} from '../../../Event/domain/entities/CommonModificationEvent'
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
        readonly creationEvent: (CommonCreationEvent | CommonModificationEvent)[]
    ) { }

    static create(
        id: UserId,
        name: UserName,
        idType: UserIdType,
        profileId: UserProfileId,
        description: UserDescription,
        password: UserPassword,
        creationEvent: (CommonCreationEvent | CommonModificationEvent)[]

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
            data.eventList.map(entry => {
                if (entry.className === 'CreationEvent.commonDTO')
                    return CommonCreationEvent.fromPrimitives(entry as CommonCreationEventDTO)
                return CommonModificationEvent.fromPrimitives(entry as CommonModificationEventDTO)
            })
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
            this.creationEvent.map(entry => {
                return entry.toPrimitives()
            })
        )
    }
}