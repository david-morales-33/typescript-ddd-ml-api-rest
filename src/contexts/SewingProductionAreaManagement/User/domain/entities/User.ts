import { UserId } from '../value-objects/UserId';
import { UserDTO } from '../data-transfer-objects/UserDTO';
import { UserRoot } from '../interfaces/User';
import { UserDescription } from '../value-objects/UserDescription';
import { UserName } from '../value-objects/UserName';
import { UserProfileId } from '../value-objects/UserProfileId';
import { UserProfileName } from '../value-objects/UserProfileName';
import { UserPermission } from '../../../UserPermission/domain/entities/UserPermission';
import { UserPermissionDTO } from '../../../UserPermission/domain/data-transfer-objects/UserPermissionDTO';
import { UserPermissionId } from '../../../UserPermission/domain/value-objects/UserPermissionId';
import { UserPermissionLabel } from '../../../UserPermission/domain/value-objects/UserPermissionLabel';
import { UserPermissionState } from '../../../UserPermission/domain/value-objects/UserPermissionState';
import { UserPermissionListNotProvided } from '../exceptions/UserPermissionListNotProvided';

export class User implements UserRoot {
    constructor(
        readonly id: UserId,
        readonly name: UserName,
        readonly profileId: UserProfileId,
        readonly profileName: UserProfileName,
        readonly permissions: UserPermission[],
        readonly description: UserDescription,
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