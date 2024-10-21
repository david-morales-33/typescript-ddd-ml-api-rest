import { JWTAuthenticationTokenService } from '../../../../contexts/Authentication/AuthenticationToken/infrastructure/Services/JWT/JWTAuthenticationTokenService'
import { container } from '../application'

container.register('Authentication.infrastructure.Token.JWTAuthenticationTokenService', JWTAuthenticationTokenService);