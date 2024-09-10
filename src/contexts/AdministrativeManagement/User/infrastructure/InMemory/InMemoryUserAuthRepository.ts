import { AuthUser } from "../../domain/entities/AuthUser";
import { UserAuthQueryRepository } from "../../domain/repositories/UserAuthQueryRepository";
import { UserDescription } from "../../domain/value-objects/UserDescription";
import { UserId } from "../../domain/value-objects/UserId";
import { UserIdType } from "../../domain/value-objects/UserIdType";
import { UserName } from "../../domain/value-objects/UserName";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { UserProfileId } from "../../domain/value-objects/UserProfileId";
import { UserState } from "../../domain/value-objects/UserState";

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