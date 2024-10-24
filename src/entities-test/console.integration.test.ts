import { v4 as uuid } from 'uuid';
import { container } from '../server/SharedAdministrativeManagement/dependency-inyection/application'
import { CreateUserCommandHandler } from '../contexts/SharedAdministrativeManagement/User/application/use-cases/Create/CreateUserCommandHandler';
import { CreateUserCommand } from '../contexts/SharedAdministrativeManagement/User/domain/data-transfer-objects/CreateUserCommand';

async function query() {
    try {
        const handler = container.get<CreateUserCommandHandler>('SharedAdministrativeManagement.application.User.CreateUserCommandHandler');

        const command = new CreateUserCommand({
            userId: '1020475912',
            userPassword:'1234',
            userProfileId:2,
            userIdType:1,
            createBy:'1146441925'
        });
        const response = await handler.handle(command)
        console.log(response)

    } catch (error) { console.log(error) }
}
query();