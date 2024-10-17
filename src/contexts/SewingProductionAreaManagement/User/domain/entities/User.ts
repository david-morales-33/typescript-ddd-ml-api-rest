import { UserDTO } from '../data-transfer-objects/UserDTO';
import { UserRoot } from '../interfaces/User';
import { UserPermissionListNotProvided } from '../exceptions/UserPermissionListNotProvided';
import { UserId } from '../../../../Shared/domain/value-object/UserId';
import { UserProfileId } from '../../../../Shared/domain/value-object/UserProfileId';
import { UserProfileName } from '../../../../Shared/domain/value-object/UserProfileName';
import { UserName } from '../../../../Shared/domain/value-object/UserName';
import { UserPermission } from '../../../../Shared/domain/entities/UserPermission';
import { UserDescription } from '../../../../Shared/domain/value-object/UserDescription';
import { UserPermissionId } from '../../../../Shared/domain/value-object/UserPermissionId';
import { UserPermissionLabel } from '../../../../Shared/domain/value-object/UserPermissionLabel';
import { UserPermissionState } from '../../../../Shared/domain/value-object/UserPermissionState';

export class User implements UserRoot {
    constructor(
        readonly id: UserId,
        readonly name: UserName,
        readonly profileId: UserProfileId,
        readonly profileName: UserProfileName,
        readonly permissions: UserPermission[],
        readonly description: UserDescription
    ) {
        if (permissions.length === 0)
            throw new UserPermissionListNotProvided();
    }

    static create(
        id: UserId,
        name: UserName,
        profileId: UserProfileId,
        profileName: UserProfileName,
        permissions: UserPermission[],
        description: UserDescription,
    ): User {
        return new User(
            id,
            name,
            profileId,
            profileName,
            permissions,
            description
        )
    }

    static fromPrimitives(data: UserDTO): User {
        return new User(
            new UserId(data.id),
            new UserName(data.name),
            new UserProfileId(data.profileId),
            new UserProfileName(data.profileName),
            data.permissions.map(entry => {
                return new UserPermission(
                    new UserPermissionId(entry.id),
                    new UserPermissionLabel(entry.label),
                    new UserPermissionState(entry.state)
                )
            }),
            new UserDescription(data.description),
        )
    }

    toPrimitives(): UserDTO {
        return new UserDTO(
            this.id.value,
            this.name.value,
            this.profileId.value,
            this.profileName.value,
            this.permissions.map(entry => { return entry.toPrimitives() }),
            this.description.value
        )
    }
}