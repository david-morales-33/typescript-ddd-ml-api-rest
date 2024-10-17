import { AuthUser } from "../../domain/entities/AuthUser";
import { UserCommandRepository } from "../../../../SharedAdministrativeManagement/User/domain/repositories/UserCommandRepository";

export class InMemoryCreateUserCommandRepository implements UserCommandRepository {
    async save(user: AuthUser): Promise<void> {
        // const userqueryRepository = new InMemoryUserAdminQueryRepository();
        // const userExternalRepository = new InMemoryExternalService();
        // const userCommandRepository = new InMemoryCreateUserCommandRepository();
        // const userPermissionRepository = new InMemoryUserPermissionRepository();

        // const userCreator = new UserCreator(userExternalRepository, userCommandRepository);
        // const userValidator = new CreateUserValidator(userPermissionRepository, userqueryRepository);

        // const commandHandler = new CreateUserCommandHandler(userCreator, userValidator);

        // const command = new CreateUserCommand({
        // userId: '114644155',
        // userIdType: 1,
        // userPassword: '1234',
        // userProfileId: 1,
        // createBy: '114644192'
        // });

        // commandHandler.handle(command)
        console.log('Se ha creado el usuari: ')
        console.log(user.toPrimitives())
    }
}