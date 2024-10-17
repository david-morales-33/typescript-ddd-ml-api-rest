import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";
import { CommonUserResponse } from "./CommonUserResponse";
import { SearchUsersByCriteriaQuery } from "./SearchUsersByCriteriaQuery";
import { UsersByCriteriaSearcher } from "./UsersByCriteriaSearcher";


export class SearchUserByCriteriaQueryHandler implements QueryHandler<SearchUsersByCriteriaQuery, CommonUserResponse[]> {
    constructor(private usersSearcher: UsersByCriteriaSearcher) { }

    subscribedTo(): Query {
        return CommonUserResponse;
    }

    async handle(query: SearchUsersByCriteriaQuery): Promise<CommonUserResponse[]> {
        const filters = Filters.fromValues(query.filters);
        const order = Order.fromValues(query.orderBy, query.orderType);

        return this.usersSearcher.execute(filters, order, query.limit, query.offset)
    }
}