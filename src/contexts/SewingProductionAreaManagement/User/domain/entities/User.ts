import { UserId } from '../../../Shared/domain/value-object/UserId';
import { UserDTO } from '../data-transfer-objects/UserDTO';
import { UserRoot } from '../interfaces/User';
import { UserDescription } from '../value-objects/UserDescription';
import { UserName } from '../value-objects/UserName';
import { UserProfileId } from '../value-objects/UserProfileId';
import { UserProfileName } from '../value-objects/UserProfileName';

export class User implements UserRoot {
    constructor(
        readonly id: UserId,
        readonly name: UserName,
        readonly profileId: UserProfileId,
        readonly profileName: UserProfileName,
        readonly description: UserDescription,
    ) { }

    static create(
        id: UserId,
        name: UserName,
        profileId: UserProfileId,
        profileName: UserProfileName,
        description: UserDescription,
    ): User {
        return new User(
            id,
            name,
            profileId,
            profileName,
            description
        )
    }

    static fromPrimitives(data: UserDTO): User {
        return new User(
            new UserId(data.id),
            new UserName(data.name),
            new UserProfileId(data.profileId),
            new UserProfileName(data.profileName),
            new UserDescription(data.description),
        )
    }

    toPrimitives(): UserDTO {
        return new UserDTO(
            this.id.value,
            this.name.value,
            this.profileId.value,
            this.profileName.value,
            this.description.value
        )
    }
}