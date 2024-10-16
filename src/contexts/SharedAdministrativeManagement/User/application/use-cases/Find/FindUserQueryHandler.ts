import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
import { FindUserQuery } from "./FindUserQuery";
import { UserFinder } from "./UserFinder";
import { UserResponse } from "./UserResponse";

export class FindUserQueryHandler implements QueryHandler<FindUserQuery, UserResponse> {
    constructor(private userFinder: UserFinder) { }

    subscribedTo(): Query {
        return FindUserQuery;
    }
    async handle(query: FindUserQuery): Promise<UserResponse> {
        return await this.userFinder.execute(query.userId)
    }
}