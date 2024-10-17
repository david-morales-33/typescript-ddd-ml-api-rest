import { UserPermissionDTO } from "../../../domain/data-transfer-object/UserPermissionDTO"
import { UserPermission } from "../../../domain/entities/UserPermission"

export interface UserPermissionPersistenceObject {
    usuario_id: string
    tipo_documento_id: number,
    operacion_id: number,
    operacion: string,
    estado: boolean
}

export class UserPermissionMapper {
    static convertFromPersistenceObject(entity: UserPermissionPersistenceObject): UserPermission {
        return UserPermission.fromPrimitives(
            new UserPermissionDTO(
                entity.operacion_id,
                entity.operacion,
                entity.estado
            )
        )
    }
}