import { UserDTO } from "../../../domain/data-transfer-objects/UserDTO";
import { User } from "../../../domain/entities/User";

export interface UserPersistenceObject {
    doc_id: string;
    nombre: string;
    clave: string;
    perfil: string;
    id_perfil: number;
    tipo_documento: string;
    id_tipo_documento: number;
    id_cargo: number;
    cargo: string;
    estado: boolean;
    fecha_creacion: Date;
}

export class UserMapperDTO {
    static convertFromPersistenceObject(entity: UserPersistenceObject) {
        return User.fromPrimitives(
            new UserDTO(
                entity.doc_id,
                entity.nombre,
                entity.clave,
                entity.id_perfil,
                entity.perfil,
                entity.cargo||'no defined'
            )
        )
    }
}