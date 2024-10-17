import { Criteria } from "../../../../Shared/domain/design-patterns/Criteria/Criteria";
import { Filters } from "../../../../Shared/domain/design-patterns/Criteria/Filters";
import { Order } from "../../../../Shared/domain/design-patterns/Criteria/Order";
import { OperationRepository } from "../../domain/repositories/OperationRepository";
import { OperationsResponse } from "./OperationResponse";

export class OperationSearcher {
    constructor(private operationRepository: OperationRepository) { }

    async execute(filters: Filters, order: Order, limit?: number, offset?: number) {
        const criteria = new Criteria(filters, order, limit, offset);
        const operations = await this.operationRepository.match(criteria);
        return new OperationsResponse(operations);
    }
}