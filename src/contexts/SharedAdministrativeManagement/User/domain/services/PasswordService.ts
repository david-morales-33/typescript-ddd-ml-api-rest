import { PasswordCompareState } from "../value-objets/PasswordCompareState";
import { UserPassword } from "../value-objets/UserPassword";

export interface PasswordService {
    compare(hash: UserPassword, password: UserPassword): Promise<PasswordCompareState>;
    encrypt(password: UserPassword): Promise<UserPassword>;
}