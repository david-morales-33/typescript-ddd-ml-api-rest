import { Command } from "../../../../Shared/domain/CQRS/Command";

type params = {
    userId: string,
    productionOrderId: string,
    garmentType: string,
    productionModuleAssigned: number
}

export class CreateProductionOrderCommand extends Command {

    readonly userId: string;
    readonly productionOrderId: string;
    readonly garmentType: string;
    readonly productionModuleAssigned: number;

    constructor({ userId, productionOrderId, garmentType, productionModuleAssigned }: params) {
        super();
        this.userId = userId;
        this.productionOrderId = productionOrderId;
        this.garmentType = garmentType;
        this.productionModuleAssigned = productionModuleAssigned;
    }

}