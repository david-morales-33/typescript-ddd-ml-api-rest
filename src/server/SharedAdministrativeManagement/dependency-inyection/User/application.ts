import { CreateUserCommandHandler } from '../../../../contexts/SharedAdministrativeManagement/User/application/use-cases/Create/CreateUserCommandHandler';
import { UserCreator } from '../../../../contexts/SharedAdministrativeManagement/User/application/use-cases/Create/UserCreator';
import { SQLServerCreateUserCommand } from '../../../../contexts/SharedAdministrativeManagement/User/infrastructure/Persistence/SQLServer/SQLServerCreateUserCommand'
import { container } from '../application'

container.
    register('SharedAdministrativeManagement.infrastructure.User.SQLServerCreateUserCommand', SQLServerCreateUserCommand).
    addArgument(container.get('SharedAdministrativeManagement.infrastructure.shared.ConnectionManager'));

container.
    register('SharedAdministrativeManagement.application.User.UserCreator', UserCreator).
    addArgument(container.get('SharedAdministrativeManagement.infrastructure.services.WebServiceUser')).
    addArgument(container.get('SharedAdministrativeManagement.infrastructure.User.SQLServerCreateUserCommand'));

container.
    register('SharedAdministrativeManagement.application.User.CreateUserCommandHandler', CreateUserCommandHandler).
    addArgument(container.get('SharedAdministrativeManagement.application.User.UserCreator'));