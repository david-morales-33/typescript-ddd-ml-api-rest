import { UserRoot } from "../interfaces/UserRoot";

export interface UserRepository {
    find(): Promise<UserRoot>
    searchAll(): Promise<UserRoot[]>
    match(criteria: any): Promise<UserRoot[]>
}