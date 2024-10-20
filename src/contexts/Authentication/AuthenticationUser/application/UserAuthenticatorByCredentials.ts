import { PasswordService } from "../../../Shared/domain/services/PasswordService";
import { UserId } from "../../../Shared/domain/value-object/UserId";
import { UserPassword } from "../../../Shared/domain/value-object/UserPassword";
import { AuthenticationTokenService } from "../../AuthenticationToken/domain/services/AuthenticationTokenService";
import { UserRepository } from "../domain/repositories/UserRepository";
import { AuthenticationResponse } from "./AccessByCredentials/AuthenticationResponse";

export class UserAuthenticatorByCredentials {
    constructor(
        private userRepository: UserRepository,
        private encryptService: PasswordService,
        private tokenService: AuthenticationTokenService
    ) { }

    async execute(userId: UserId, userPassword: UserPassword) {
        const user = await this.userRepository.find(userId);
        if (user === null) {
            throw new Error('Documento incorrecto')
        }

        const verify = await this.encryptService.compare(user.password, userPassword);
        if (!verify.value) {
            throw new Error('Contraseña incorrecta');
        }

        const token = await this.tokenService.generate(user.id, user.profileId);

        return new AuthenticationResponse(user, token);
    }
}