import { UserId } from '../value-objects/UserId';
import { CommonUserDTO } from '../data-transfer-objects/CommonUserDTO';
import { UserRoot } from '../interfaces/UserRoot';
import { UserDescription } from '../value-objects/UserDescription';
import { UserName } from '../value-objects/UserName';
import { UserProfileId } from '../value-objects/UserProfileId';
import { UserProfileName } from '../value-objects/UserProfileName';

export class CommonUser implements UserRoot {

    constructor(
        readonly id: UserId,
        readonly name: UserName,
        readonly profileId: UserProfileId,
        readonly profileName: UserProfileName,
        readonly description: UserDescription,
        readonly modificationEventList: any[]
    ) { }

    static create(
        id: UserId,
        name: UserName,
        profileId: UserProfileId,
        profileName: UserProfileName,
        description: UserDescription,
        modificationEventList: any[]
    ): CommonUser {
        return new CommonUser(
            id,
            name,
            profileId,
            profileName,
            description,
            modificationEventList
        )
    }

    static fromPrimitives(data: CommonUserDTO): CommonUser {
        return new CommonUser(
            new UserId(data.id),
            new UserName(data.name),
            new UserProfileId(data.profileId),
            new UserProfileName(data.profileName),
            new UserDescription(data.description),
            []
        )
    }

    toPrimitives(): CommonUserDTO {
        return new CommonUserDTO(
            this.id.value,
            this.name.value,
            this.profileId.value,
            this.profileName.value,
            this.description.value,
            []
        )
    }
}