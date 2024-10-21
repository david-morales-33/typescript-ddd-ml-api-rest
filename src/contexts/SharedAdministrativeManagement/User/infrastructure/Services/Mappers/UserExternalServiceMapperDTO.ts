import { UserExternalServiceDTO } from "../../../domain/data-transfer-objects/UserExternalServiceDTO";

export interface UserServiceObject { [key: string]: string[] }

export class UserExternalServiceMapperDTO {
    static convertFromServiceData(entity: UserServiceObject): UserExternalServiceDTO {
        return new UserExternalServiceDTO(
            entity.TIPO_ID[0].trim(),
            entity.CC[0].trim(),
            entity.NOMBRE[0].trim(),
            entity.Descripcion[0].trim()
        )
    }
}