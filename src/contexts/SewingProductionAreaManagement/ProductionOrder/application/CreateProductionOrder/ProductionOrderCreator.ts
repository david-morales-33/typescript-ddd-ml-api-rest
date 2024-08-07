import { ProductionOrderDetailNotStarted } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { UserId } from "../../../Shared/domain/value-object/UserId";
import { ProductionOrderNotStarted } from "../../domain/entities/ProductionOrderNotStarted";
import { ProductionOrderNotStartedRepository } from "../../domain/repositories/ProductionOrderNotStartedRepository";
import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";
import { ProductionOrderReference } from "../../domain/value-objects/ProductionOrderReference";


export class ProductionOrderCreator {

    constructor(
        private productionOrderRepository: ProductionOrderNotStartedRepository,
    ){}

    async run(params:{
        productionOrderid: ProductionOrderId, 
        reference: ProductionOrderReference, 
        openByUser: UserId,
        productionOrderDetailList: ProductionOrderDetailNotStarted[],
    }): Promise<void>{

        const productionOrder = ProductionOrderNotStarted.create(
            params.productionOrderid,
            params.reference,
            params.openByUser,
            params.productionOrderDetailList
        );

        await this.productionOrderRepository.save(productionOrder);
    }

}