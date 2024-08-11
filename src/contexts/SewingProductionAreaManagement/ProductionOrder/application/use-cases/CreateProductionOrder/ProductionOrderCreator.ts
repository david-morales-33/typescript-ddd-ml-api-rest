import { ProductionOrderDetailNotStarted } from "../../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderDetailPlannedAmount } from "../../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailPlannedAmount";
import { BarcodeEan } from "../../../../Shared/domain/value-object/BarcodeEan";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionOrderNotStarted } from "../../../domain/entities/ProductionOrderNotStarted";
import { ProductionOrderNotStartedRepository } from "../../../domain/repositories/ProductionOrderNotStartedRepository";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderReference } from "../../../domain/value-objects/ProductionOrderReference";
import { ProductionOrderEanExternalServiceDTO } from "../../data-transfer-objects/ProductionOrderEanExternalServiceDTO";
import { ProductionOrderExternalServiceDTO } from "../../data-transfer-objects/ProductionOrderExternalServiceDTO";
import { EanNotFound } from "../../exception/EanNotFound";
import { ProductionOrderNotFound } from "../../exception/ProductionOrderNotFound";
import { ProductionOrderEanExternalService } from "../../services/ProductionOrderEanExternalService";
import { ProductionOrderExternalService } from "../../services/ProductionOrderExternalService";
import { CreateProductionOrderValidator } from "./CreateProductionOrderValidator";

export class ProductionOrderCreator {

    constructor(
        private productionOrderRepository: ProductionOrderNotStartedRepository,
        private productionOrderExternalService: ProductionOrderExternalService,
        private productionOrderEanExternalService: ProductionOrderEanExternalService,
        private createProductionOrderValidator: CreateProductionOrderValidator
    ) { }

    async execute(params: { productionOrderId: ProductionOrderId, userId: UserId }): Promise<void> {

        const { productionOrderId, userId } = params;

        await this.createProductionOrderValidator.execute(userId);

        const productionOrderDetailListFromService = await this.productionOrderExternalService.find(productionOrderId);

        if (productionOrderDetailListFromService === null || productionOrderDetailListFromService === undefined)
            throw new ProductionOrderNotFound(params.productionOrderId);

        const [{ reference }] = productionOrderDetailListFromService;

        const productionOrderReference = new ProductionOrderReference(reference);

        const eanListFromService = await this.productionOrderEanExternalService.matching({
            reference: productionOrderReference
        });

        if (eanListFromService === null || eanListFromService === undefined)
            throw new EanNotFound();

        const productionOrderDetailList = this.mapper({
            productionOrderDetailEanList: eanListFromService,
            productionOrderDetailList: productionOrderDetailListFromService,
        });

        const productionOrderNotStated = ProductionOrderNotStarted.create(
            productionOrderId,
            productionOrderReference,
            userId,
            productionOrderDetailList
        );

        await this.productionOrderRepository.save(productionOrderNotStated);
    }

    private mapper(params: {
        productionOrderDetailList: ProductionOrderExternalServiceDTO[],
        productionOrderDetailEanList: ProductionOrderEanExternalServiceDTO[]
    }): ProductionOrderDetailNotStarted[] {

        const { productionOrderDetailEanList, productionOrderDetailList } = params;

        return productionOrderDetailList.map(entry => {

            const ean = productionOrderDetailEanList.find(elemnt =>
                elemnt.colorId === entry.colorId &&
                elemnt.garmentSize === entry.garmentSize);

            if (ean === undefined || ean === null)
                throw new EanNotFound();

            return ProductionOrderDetailNotStarted.create(
                new ProductionOrderId(entry.op),
                new ColorId(entry.colorId),
                new GarmentSize(entry.garmentSize),
                new BarcodeEan(ean.ean),
                new ProductionOrderDetailPlannedAmount(entry.plannedAmount)
            )
        })
    }
}