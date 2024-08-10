import { User } from "../entities/User";

export interface UserRepository {
    find(): Promise<User>
    searchAll(): Promise<User[]>
    match(criteria: any): Promise<User[]>
}