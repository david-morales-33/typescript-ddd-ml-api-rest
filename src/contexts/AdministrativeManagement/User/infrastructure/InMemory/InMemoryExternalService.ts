import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserExternalService } from "../../../../SharedAdministrativeManagement/User/application/services/UserExternalService";
import { UserExternalServiceDTO } from "../../../../SharedAdministrativeManagement/User/domain/data-transfer-objects/UserExternalServiceDTO";

export class InMemoryExternalService implements UserExternalService {

    private userList: UserExternalServiceDTO[];

    constructor() {
        this.userList = [
            new UserExternalServiceDTO('CC', '114644155', 'Juan Lopez', 'Operario(a) de maquina'),
            new UserExternalServiceDTO('CC', '1166585855', 'Luisa Fernanda García', 'Operario(a) de maquina'),
            new UserExternalServiceDTO('CC', '182652556', 'Karolina Ramirez', 'Operario(a) de maquina'),
        ]
    }

    async find(userId: UserId): Promise<UserExternalServiceDTO | null> {
        const user = this.userList.find(entry => entry.userId === userId.value);

        if (user === undefined)
            return null;

        return user;
    }
}
