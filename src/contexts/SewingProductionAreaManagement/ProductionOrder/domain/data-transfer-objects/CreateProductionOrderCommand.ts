import { Command } from "../../../../Shared/domain/Command";

type params = {
    userId: string,
    productionOrderId: string
}

export class CreateProductionOrderCommand extends Command {

    readonly userId: string;
    readonly productionOrderId: string;

    constructor({ userId, productionOrderId }: params) {
        super();
        this.userId = userId;
        this.productionOrderId = productionOrderId;
    }

}