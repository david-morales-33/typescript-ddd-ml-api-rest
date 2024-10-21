import { SQLServerUserRepository } from "../../../../contexts/Authentication/AuthenticationUser/infrastructure/Persistence/SQLServer/SQLServerUserRepository";
import { container } from "../application";

container.
    register('Authentication.infrastructure.User.SqlServerUserRepository', SQLServerUserRepository).
    addArgument(container.get('Authentication.infrastructure.shared.ConnectionManager'));