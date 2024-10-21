import { UserAuthenticatorByCredentials } from "../../../../contexts/Authentication/AuthenticationUser/application/AccessByCredentials/UserAuthenticatorByCredentials";
import { UserAuthenticatorByToken } from "../../../../contexts/Authentication/AuthenticationUser/application/AccessByToken/UserAuthenticatorByToken";
import { SQLServerUserRepository } from "../../../../contexts/Authentication/AuthenticationUser/infrastructure/Persistence/SQLServer/SQLServerUserRepository";
import { container } from "../application";

container.
    register('Authentication.infrastructure.User.SqlServerUserRepository', SQLServerUserRepository).
    addArgument(container.get('Authentication.infrastructure.shared.ConnectionManager'));

container.
    register('Authentication.infrastructure.User.UserAuthenticatorByToken', UserAuthenticatorByToken).
    addArgument(container.get('Authentication.infrastructure.User.SqlServerUserRepository')).
    addArgument(container.get('Authentication.infrastructure.Token.JWTAuthenticationTokenService'))
container.
    register('Authentication.infrastructure.User.UserAuthenticatorByCredentials', UserAuthenticatorByCredentials).
    addArgument(container.get('Authentication.infrastructure.User.SqlServerUserRepository')).
    addArgument(container.get('Authentication.infrastructure.shared.BcryptPasswordService')).
    addArgument(container.get('Authentication.infrastructure.Token.JWTAuthenticationTokenService'))