import { Response } from "../../../Shared/domain/CQRS/Response";
import { AuthenticationToken } from "../../AuthenticationToken/domain/entity/AuthenticationToken";
import { User } from "../domain/entities/User";

interface AuthenticationResponseData {
    id: string,
    nombre: string,
    perfilId: number,
    perfilEtiqueta: string,
    descripcion: string,
    token: {
        tokenId: string,
        fechaExpiracion: Date,
        fechaCreacion: Date,
        estado: boolean
    }
}

export class AuthenticationResponse implements Response {
    public readonly authenticationResponseData: AuthenticationResponseData;

    constructor(user: User, token: AuthenticationToken) {
        this.authenticationResponseData = {
            id: user.id.value,
            nombre: user.name.value,
            perfilId: user.profileId.value,
            perfilEtiqueta: user.profileName.value,
            descripcion: user.description.value,
            token: {
                tokenId: token.tokenId.value,
                fechaCreacion: token.creationDate.value,
                fechaExpiracion: token.expirationDate.value,
                estado: token.state.value
            }
        }
    }
}