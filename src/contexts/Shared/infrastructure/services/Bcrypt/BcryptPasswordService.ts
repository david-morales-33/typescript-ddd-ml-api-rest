import { PasswordService } from "../../../domain/services/PasswordService";
import { PasswordCompareState } from "../../../domain/value-object/PasswordCompareState";
import { UserPassword } from "../../../domain/value-object/UserPassword";
import bcrypt from 'bcrypt'

export class BcryptPasswordService implements PasswordService {
    
    async compare(hash: UserPassword, password: UserPassword): Promise<PasswordCompareState> {
        const response = await bcrypt.compare(password.value, hash.value);
        return new PasswordCompareState(response)
    }

    async encrypt(password: UserPassword): Promise<UserPassword | null> {
        try {
            const response = await bcrypt.hash(password.value, 10);
            return new UserPassword(response);
        } catch (error) { return null }
    }
}