import { UserExternalServiceDTO } from "../../application/data-transfer-objects/UserExternalServiceDTO";
import { UserExternalService } from "../../application/services/UserExternalService";
import { UserId } from "../../domain/value-objects/UserId";

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
