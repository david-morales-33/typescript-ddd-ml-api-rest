import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { AuthenticationToken } from "../../../AuthenticationToken/domain/entity/AuthenticationToken";
import { AuthenticationTokenService } from "../../../AuthenticationToken/domain/services/AuthenticationTokenService";
import { TokenCreationDate } from "../../../AuthenticationToken/domain/value-objects/TokenCreationDate";
import { TokenExpirationDate } from "../../../AuthenticationToken/domain/value-objects/TokenExpirationDate";
import { TokenId } from "../../../AuthenticationToken/domain/value-objects/TokenId";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { AuthenticationResponse } from "../AuthenticationResponse";

export class UserAuthenticatorByToken {
    constructor(
        private userRepository: UserRepository,
        private tokenService: AuthenticationTokenService
    ) { }
    async execute(token: TokenId) {

        const data = await this.tokenService.deserialize(token);

        if (data === null) throw new Error('Token no válido');

        if (new Date() > data.expirationDate) throw new Error('El token ha experido');

        const user = await this.userRepository.find(new UserId(data.userId));

        if (user === null) throw new Error('El usuario solicitado no existe');

        return new AuthenticationResponse(
            user,
            new AuthenticationToken(
                token,
                new TokenExpirationDate(data.expirationDate),
                new TokenCreationDate(data.craetionDate)
            )
        );
    }
}