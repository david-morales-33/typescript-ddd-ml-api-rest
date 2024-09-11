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
            UserPermission.fromPrimitives(new UserPermissionDTO(4, 'Crear Cuenta', true)),
            UserPermission.fromPrimitives(new UserPermissionDTO(5, 'Editar Cuenta', true)),
            UserPermission.fromPrimitives(new UserPermissionDTO(7, 'Agregar Módulo', true)),
            UserPermission.fromPrimitives(new UserPermissionDTO(24, 'Editar OP', true)),
            UserPermission.fromPrimitives(new UserPermissionDTO(8, 'Editar Módulo', true)),
            UserPermission.fromPrimitives(new UserPermissionDTO(12, 'Agregar Talla', true)),
            UserPermission.fromPrimitives(new UserPermissionDTO(0, 'Editar propiedades de color', true)),
            UserPermission.fromPrimitives(new UserPermissionDTO(35, 'Agregar nueva anormalidad de módulo', true)),
        ]
    }

    async searchAll(userId: UserId): Promise<UserPermission[]> {
        console.log(`Se obtuvieron los permisos del usuario <${userId.value}>...`)
        return this.userPermissions;
    }
}