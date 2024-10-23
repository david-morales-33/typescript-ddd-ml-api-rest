import { UserAuthenticatorByCredentials } from "../../../../contexts/Authentication/AuthenticationUser/application/AccessByCredentials/UserAuthenticatorByCredentials";
import { UserAuthenticatorByCredentialsQueryHandler } from "../../../../contexts/Authentication/AuthenticationUser/application/AccessByCredentials/UserAuthenticatorByCredentialsQueryHandler";
import { UserAuthenticatorByToken } from "../../../../contexts/Authentication/AuthenticationUser/application/AccessByToken/UserAuthenticatorByToken";
import { UserAuthenticatorByTokenQueryHandler } from "../../../../contexts/Authentication/AuthenticationUser/application/AccessByToken/UserAuthenticatorByTokenQueryHandler";
import { SQLServerUserRepository } from "../../../../contexts/Authentication/AuthenticationUser/infrastructure/Persistence/SQLServer/SQLServerUserRepository";
import { container } from "../application";

container.
    register('Authentication.infrastructure.User.SqlServerUserRepository', SQLServerUserRepository).
    addArgument(container.get('Authentication.infrastructure.shared.ConnectionManager'));

//==================================================================================================
container.
    register('Authentication.infrastructure.User.UserAuthenticatorByToken', UserAuthenticatorByToken).
    addArgument(container.get('Authentication.infrastructure.User.SqlServerUserRepository')).
    addArgument(container.get('Authentication.infrastructure.Token.JWTAuthenticationTokenService'));

container.
    register('Authentication.infrastructure.User.UserAuthenticatorByTokenQueryHandler', UserAuthenticatorByTokenQueryHandler).
    addArgument(container.get('Authentication.infrastructure.User.UserAuthenticatorByToken'))

//==================================================================================================

container.
    register('Authentication.infrastructure.User.UserAuthenticatorByCredentials', UserAuthenticatorByCredentials).
    addArgument(container.get('Authentication.infrastructure.User.SqlServerUserRepository')).
    addArgument(container.get('Authentication.infrastructure.shared.BcryptPasswordService')).
    addArgument(container.get('Authentication.infrastructure.Token.JWTAuthenticationTokenService'))

container.
    register('Authentication.infrastructure.User.UserAuthenticatorByCredentialsQueryHandler', UserAuthenticatorByCredentialsQueryHandler).
    addArgument(container.get('Authentication.infrastructure.User.UserAuthenticatorByCredentials'))
