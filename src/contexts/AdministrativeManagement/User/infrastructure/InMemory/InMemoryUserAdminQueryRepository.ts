import { UserPermissionDTO } from "../../../UserPermission/domain/data-transfer-objects/UserPermissionDTO";
import { UserPermission } from "../../../UserPermission/domain/entities/UserPermission";
import { AdminUser } from "../../domain/entities/AdminUser";
import { UserAdminQueryRepository } from "../../domain/repositories/UserAdminQueryRepository";
import { UserDescription } from "../../domain/value-objects/UserDescription";
import { UserId } from "../../domain/value-objects/UserId";
import { UserName } from "../../domain/value-objects/UserName";
import { UserProfileId } from "../../domain/value-objects/UserProfileId";
import { UserProfileName } from "../../domain/value-objects/UserProfileName";

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