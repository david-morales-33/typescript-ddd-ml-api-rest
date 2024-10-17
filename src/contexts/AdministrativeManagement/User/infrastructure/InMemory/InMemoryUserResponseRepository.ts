import { AuthUserViewDTO } from "../../../../SharedAdministrativeManagement/User/domain/data-transfer-objects/AuthUserViewDTO";
import { CommonUserViewDTO } from "../../domain/data-transfer-objects/CommonUserViewDTO";
import { UserResponseRepository } from "../../domain/repositories/UserResponseRepository";
import { UserId } from "../../domain/value-objects/UserId";

export class InMemoryUserResponseRepository implements UserResponseRepository {

    private authUserList: AuthUserViewDTO[];
    private responseUserList: CommonUserViewDTO[];

    constructor() {
        this.authUserList = [
            new AuthUserViewDTO('David esteban Morales Ñustes', '1146441925784', '13126865sdjhsds2f3s6s4fssd', 'Desarrollador junior', true, 1, 'Cedula de ciudadania', 1, 'Administrador'),
            new AuthUserViewDTO('Kevin Restrepo', '11435545454', 'd6sf4s6f4sf64f9s754f9df94xf', 'Analista de tiempos', true, 1, 'Cedula de ciudadania', 1, 'Operario de bodega'),
        ]

        this.responseUserList = [
            new CommonUserViewDTO('David esteban Morales Ñustes', '1146441925784', 'Desarrollador junior', true, 1, 'Cedula de ciudadania', 1, 'Administrador'),
            new CommonUserViewDTO('Kevin Restrepo', '11435545454', 'Analista de tiempos', true, 1, 'Cedula de ciudadania', 1, 'Operario de bodega'),
            new CommonUserViewDTO('Lina marcela García', '18565226596', 'Supervisor(a)', true, 1, 'Cedula de ciudadania', 1, 'Administrador(a) de procesos'),
        ]
    }

    async find(userId: UserId): Promise<AuthUserViewDTO | null> {
        // const userResponseRepository = new InMemoryUserResponseRepository();

        // const userFinder = new UserFinder(userResponseRepository);
        // const query = new FindUserQuery(new UserId('1146441925784'));
        // const queryHandler = new FindUserQueryHandler(userFinder);
        const user = this.authUserList.find(entry => entry.documentoId === userId.value);

        if (user === undefined)
            return null;

        return user;
    }

    async searchAll(): Promise<CommonUserViewDTO[]> {
        return this.responseUserList;
    }

    async match(criteria: any): Promise<CommonUserViewDTO[]> {
        console.log('Filtrado por...', criteria);
        return this.responseUserList;
    }
}