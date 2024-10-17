import { Criteria } from "../../../../Shared/domain/Criteria/Criteria";
import { Filters } from "../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../Shared/domain/Criteria/Order";
import { MenuRepository } from "../../domain/repositories/MenuRepository";
import { MenusResponse } from "./MenuResponse";


export class MenuFinder {
    constructor(private menuRepository: MenuRepository) { }

    async execute(filters: Filters, order: Order, limit?: number, offset?: number) {
        const criteria = new Criteria(filters, order, limit, offset);
        const menu = await this.menuRepository.match(criteria);

        // return new MenusResponse(menu);
    }
}