import { User } from "../entities/User";

export interface UserRepository {
    search(): Promise<User>
    searchAll(): Promise<User[]>
    match(criteria: any): Promise<User[]>
}