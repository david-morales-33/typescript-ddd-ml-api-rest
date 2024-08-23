import { Criteria } from "../../../../../Shared/domain/design-patterns/Criteria/Criteria";
import { Filters } from "../../../../../Shared/domain/design-patterns/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/design-patterns/Criteria/Order";
import { CommonUserRepository } from "../../../domain/repositories/CommonUserRepository";

export class UsersByCriteriaSearcher {

    constructor(private commonUserRepository: CommonUserRepository) { }

    async execute(filters: Filters, order: Order, limit?: number, offset?: number) {
        const criteria = new Criteria(filters, order, limit, offset);

        const userList = await this.commonUserRepository.match(criteria);

        return userList;
    }
}