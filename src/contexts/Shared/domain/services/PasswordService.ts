import { PasswordCompareState } from "../value-object/PasswordCompareState";
import { UserPassword } from "../value-object/UserPassword";

export interface PasswordService {
    compare(hash: UserPassword, password: UserPassword): Promise<PasswordCompareState>;
    encrypt(password: UserPassword): Promise<UserPassword>;
}