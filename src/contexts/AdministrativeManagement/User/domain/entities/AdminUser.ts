import { UserId } from '../value-objects/UserId';
import { CommonUserDTO } from '../data-transfer-objects/CommonUserDTO';
import { UserRoot } from '../interfaces/UserRoot';
import { UserDescription } from '../value-objects/UserDescription';
import { UserName } from '../value-objects/UserName';
import { UserProfileId } from '../value-objects/UserProfileId';
import { UserProfileName } from '../value-objects/UserProfileName';
import { UserPermission } from '../../../UserPermission/domain/entities/UserPermission';
import { UserPermissionId } from '../../../UserPermission/domain/value-objects/UserPermissionId';
import { UserPermissionLabel } from '../../../UserPermission/domain/value-objects/UserPermissionLabel';
import { UserPermissionState } from '../../../UserPermission/domain/value-objects/UserPermissionState';
import { UserPermissionListNotProvided } from '../exceptions/UserPermissionListNotProvided';
import { AdminUserDTO } from '../data-transfer-objects/AdminUserDTO';

export class AdminUser implements UserRoot {

    constructor(
        readonly id: UserId,
        readonly name: UserName,
        readonly profileId: UserProfileId,
        readonly profileName: UserProfileName,
        readonly description: UserDescription,
        readonly permissions: UserPermission[],
    ) {
        if (permissions.length === 0)
            throw new UserPermissionListNotProvided();
    }

    static create(
        id: UserId,
        name: UserName,
        profileId: UserProfileId,
        profileName: UserProfileName,
        description: UserDescription,
        permissions: UserPermission[],
    ): AdminUser {
        return new AdminUser(
            id,
            name,
            profileId,
            profileName,
            description,
            permissions,
        )
    }

    static fromPrimitives(data: AdminUserDTO): AdminUser {
        return new AdminUser(
            new UserId(data.id),
            new UserName(data.name),
            new UserProfileId(data.profileId),
            new UserProfileName(data.profileName),
            new UserDescription(data.description),
            data.permissions.map(entry => {
                return new UserPermission(
                    new UserPermissionId(entry.id),
                    new UserPermissionLabel(entry.label),
                    new UserPermissionState(entry.state)
                )
            }),
        )
    }

    toPrimitives(): AdminUserDTO {
        return new AdminUserDTO(
            this.id.value,
            this.name.value,
            this.profileId.value,
            this.profileName.value,
            this.description.value,
            this.permissions.map(entry => { return entry.toPrimitives() }),
        )
    }
}