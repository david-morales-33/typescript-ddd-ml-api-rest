import { UserPermissionDTO } from "../../../../Shared/domain/data-transfer-object/UserPermissionDTO";
import { UserPermission } from "../../../../Shared/domain/entities/UserPermission";
import { UserDescription } from "../../../../Shared/domain/value-object/UserDescription";
import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserName } from "../../../../Shared/domain/value-object/UserName";
import { UserProfileId } from "../../../../Shared/domain/value-object/UserProfileId";
import { UserProfileName } from "../../../../Shared/domain/value-object/UserProfileName";
import { UserAdminQueryRepository } from "../../../../SharedAdministrativeManagement/User/domain/repositories/UserAdminQueryRepository";
import { AdminUser } from "../../domain/entities/AdminUser";

export class InMemoryUserAdminQueryRepository implements UserAdminQueryRepository {

    private adminUserList: AdminUser[];

    constructor() {
        this.adminUserList = [
            new AdminUser(
                new UserId('1146441925'),
                new UserName('David morales'),
                new UserProfileId(1),
                new UserProfileName('Administrador'),
                new UserDescription('Desarrollador junior'),
                [UserPermission.fromPrimitives(new UserPermissionDTO(4, 'Crear Cuenta', true))]
            )
        ]
    }

    async find(userId: UserId): Promise<AdminUser | null> {
        const user = this.adminUserList.find(entry => entry.id.value === userId.value);

        if (user === undefined)
            return null;
        return user
    }
}