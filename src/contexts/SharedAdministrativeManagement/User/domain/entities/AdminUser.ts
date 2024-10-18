
import { AdminUserDTO } from '../data-transfer-objects/AdminUserDTO';
import { UserId } from '../../../../Shared/domain/value-object/UserId';
import { UserName } from '../../../../Shared/domain/value-object/UserName';
import { UserProfileId } from '../../../../Shared/domain/value-object/UserProfileId';
import { UserProfileName } from '../../../../Shared/domain/value-object/UserProfileName';
import { UserDescription } from '../../../../Shared/domain/value-object/UserDescription';
import { UserRoot } from '../interface/UserRoot';
import { UserPermission } from '../../../../Shared/domain/entities/UserPermission';
import { UserPermissionListNotProvided } from '../exceptions/UserPermissionListNotProvided';
import { UserPermissionId } from '../../../../Shared/domain/value-object/UserPermissionId';
import { UserPermissionLabel } from '../../../../Shared/domain/value-object/UserPermissionLabel';
import { UserPermissionState } from '../../../../Shared/domain/value-object/UserPermissionState';

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