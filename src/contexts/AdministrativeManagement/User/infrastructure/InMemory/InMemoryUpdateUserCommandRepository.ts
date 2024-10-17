import { AuthUser } from "../../domain/entities/AuthUser";
import { UserCommandRepository } from "../../../../SharedAdministrativeManagement/User/domain/repositories/UserCommandRepository";

export class InMemoryUpdateUserCommandRepository implements UserCommandRepository {
    async save(user: AuthUser): Promise<void> {
        // const userqueryRepository = new InMemoryUserAuthRepository();
        // const userPermissionRepository = new InMemoryUserPermissionRepository();
        // const userCommandRepository = new InMemoryUpdateUserCommandRepository();

        // const updater = new UserUpdater(userqueryRepository, userCommandRepository)
        // const validator = new UpdateUserValidator(userPermissionRepository);

        // const commadHandler = new UpdateUserCommandHandler(updater, validator);

        // const command = new UpdateUserCommand({
        //     userId: '1146441925',
        //     newName: 'David morale',
        //     newState: false,
        //     updateBy: '1424441121'
        // });

        // commadHandler.handle(command)
        console.log('Se ha actualizado el usuario')
        console.log(user.toPrimitives())
    }
}