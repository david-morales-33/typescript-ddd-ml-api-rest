import { UserDescription } from "../../../../Shared/domain/value-object/UserDescription";
import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserIdType } from "../../../../Shared/domain/value-object/UserIdType";
import { UserName } from "../../../../Shared/domain/value-object/UserName";
import { UserProfileId } from "../../../../Shared/domain/value-object/UserProfileId";
import { UserState } from "../../../../Shared/domain/value-object/UserState";
import { AuthUser } from "../../../../SharedAdministrativeManagement/User/domain/entities/AuthUser";
import { UserAuthQueryRepository } from "../../../../SharedAdministrativeManagement/User/domain/repositories/UserAuthQueryRepository";
import { UserPassword } from "../../../../SharedAdministrativeManagement/User/domain/value-objets/UserPassword";

export class InMemoryUserAuthRepository implements UserAuthQueryRepository {
    private userList: AuthUser[];

    constructor() {
        this.userList = [
            new AuthUser(
                new UserId('1146441925'),
                new UserName('David morales'),
                new UserIdType(1),
                new UserProfileId(1),
                new UserDescription('Desarrollador junior'),
                new UserPassword('123456'),
                new UserState(true),
                []
            ),
            new AuthUser(
                new UserId('1865445522'),
                new UserName('Luisa Garcia'),
                new UserIdType(1),
                new UserProfileId(3),
                new UserDescription('Operario(a) de manual'),
                new UserPassword('123456'),
                new UserState(true),
                []
            )
        ]
    }

    async find(userId: UserId): Promise<AuthUser | null> {
        const user = this.userList.find(entry => entry.id.value === userId.value);

        if (user === undefined)
            return null;

        return user;
    }
}