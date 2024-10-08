import { UserId } from "../../../User/domain/value-objects/UserId";
import { UserPermissionDTO } from "../../domain/data-transfer-objects/UserPermissionDTO";
import { UserPermission } from "../../domain/entities/UserPermission";
import { UserPermissionRepository } from "../../domain/repositories/UserPermissionRepository";

export class InMemoryUserPermissionRepository implements UserPermissionRepository {
    private userPermissions: UserPermission[];

    constructor() {
        this.userPermissions = [
            UserPermission.fromPrimitives(new UserPermissionDTO(21, 'Abrir OP', true)),
            UserPermission.fromPrimitives(new UserPermissionDTO(16, 'Crear OCR', true)),
            UserPermission.fromPrimitives(new UserPermissionDTO(33, 'Crear OCR de segundas', true)),
        ]
    }

    
    async searchAll(userId: UserId): Promise<UserPermission[]> {
        console.log(`Se obtuvieron los permisos del usuario <${userId.value}>...`)
        return this.userPermissions;
    }
}