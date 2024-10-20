import { UserDTO } from '../data-transfer-objects/UserDTO';
import { UserRoot } from '../interfaces/User';
import { UserId } from '../../../../Shared/domain/value-object/UserId';
import { UserProfileId } from '../../../../Shared/domain/value-object/UserProfileId';
import { UserProfileName } from '../../../../Shared/domain/value-object/UserProfileName';
import { UserName } from '../../../../Shared/domain/value-object/UserName';
import { UserDescription } from '../../../../Shared/domain/value-object/UserDescription';
import { UserPassword } from '../../../../Shared/domain/value-object/UserPassword';

export class User implements UserRoot {
    constructor(
        readonly id: UserId,
        readonly name: UserName,
        readonly password: UserPassword,
        readonly profileId: UserProfileId,
        readonly profileName: UserProfileName,
        readonly description: UserDescription,
    ) { }

    static create(
        id: UserId,
        name: UserName,
        password: UserPassword,
        profileId: UserProfileId,
        profileName: UserProfileName,
        description: UserDescription,
    ): User {
        return new User(
            id,
            name,
            password,
            profileId,
            profileName,
            description,
        )
    }

    static fromPrimitives(data: UserDTO): User {
        return new User(
            new UserId(data.id),
            new UserName(data.name),
            new UserPassword(data.password),
            new UserProfileId(data.profileId),
            new UserProfileName(data.profileName),
            new UserDescription(data.description)
        )
    }

    toPrimitives(): UserDTO {
        return new UserDTO(
            this.id.value,
            this.name.value,
            this.password.value,
            this.profileId.value,
            this.profileName.value,
            this.description.value,
        )
    }
}