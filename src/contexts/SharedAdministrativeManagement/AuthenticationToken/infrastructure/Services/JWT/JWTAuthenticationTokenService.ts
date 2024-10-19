import fs from 'fs';
import path from 'path';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserProfileId } from "../../../../../Shared/domain/value-object/UserProfileId";
import { AuthenticationToken } from "../../../domain/entity/AuthenticationToken";
import { AuthenticationTokenService } from "../../../domain/services/AuthenticationTokenService";
import { TokenState } from '../../../domain/value-objects/TokenState';
import { AuthenticationTokenDTO } from '../../../domain/data-transfer-objects/AuthenticationTokenDTO';
import { AuthenticationDataDTO } from '../../../domain/data-transfer-objects/AuthenticationDataDTO';
import { TokenId } from '../../../domain/value-objects/TokenId';

interface Payload extends JwtPayload {
    userId: string,
    profileId: number,
    iat: number,
    exp: number
}

export class JWTAuthenticationTokenService implements AuthenticationTokenService {

    async generate(userId: UserId, profileId: UserProfileId): Promise<AuthenticationToken> {
        const route = path.join(__dirname, '../../../../../../../private.pem');
        const privateKey = fs.readFileSync(route, 'utf8');
        const token = jwt.sign({ userId: userId.value, profileId: profileId.value }, privateKey, { algorithm: 'RS256', expiresIn: 2629800 });
        const today = new Date();
        const expirationDate = new Date();
        expirationDate.setDate(today.getDate() + 30);
        return AuthenticationToken.fromPrimitives(new AuthenticationTokenDTO(token, today, expirationDate))
    }

    async deserialize(token: TokenId): Promise<AuthenticationDataDTO | null> {
        const route = path.join(__dirname, '../../../../../../../public.pem');
        const publicKey = fs.readFileSync(route, 'utf8');
        try {
            const tokenPayload = jwt.verify(token.value, publicKey, { algorithms: ['RS256'] }) as Payload;
            const issuedAtDate = new Date(tokenPayload.iat * 1000);
            const expirationDate = new Date(tokenPayload.exp * 1000);
            return new AuthenticationDataDTO(
                tokenPayload.userId,
                tokenPayload.profileId,
                issuedAtDate,
                expirationDate
            )
        } catch (error) {
            return null;
        }
    }
}