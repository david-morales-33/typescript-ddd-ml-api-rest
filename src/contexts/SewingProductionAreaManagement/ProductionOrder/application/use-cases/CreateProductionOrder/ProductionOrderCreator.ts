import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionOrderDetailNotStarted } from "../../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderDetailPlannedAmount } from "../../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailPlannedAmount";
import { BarcodeEan } from "../../../../Shared/domain/value-object/BarcodeEan";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { ColorLabel } from "../../../../Shared/domain/value-object/ColorLabel";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { GarmentType } from "../../../../Shared/domain/value-object/GarmentType";
import { ProductionOrderNotStarted } from "../../../domain/entities/ProductionOrderNotStarted";
import { ProductionOrderCommandRepository } from "../../../domain/repositories/ProductionOrderCommandRepository";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderReference } from "../../../domain/value-objects/ProductionOrderReference";
import { ProductionOrderEanExternalServiceDTO } from "../../data-transfer-objects/ProductionOrderEanExternalServiceDTO";
import { ProductionOrderExternalServiceDTO } from "../../data-transfer-objects/ProductionOrderExternalServiceDTO";
import { EanNotFound } from "../../exception/EanNotFound";
import { ProductionOrderNotFound } from "../../exception/ProductionOrderNotFoundOnService";
import { ProductionOrderEanExternalService } from "../../services/ProductionOrderEanExternalService";
import { ProductionOrderExternalService } from "../../services/ProductionOrderExternalService";

export class ProductionOrderCreator {

    constructor(
        private productionOrderRepository: ProductionOrderCommandRepository,
        private productionOrderExternalService: ProductionOrderExternalService,
        private productionOrderEanExternalService: ProductionOrderEanExternalService,
    ) { }

    async execute(params: { 
        productionOrderId: ProductionOrderId, 
        userId: UserId,
        productionModule: ProductionModuleId,
        garmentType: GarmentType
     }): Promise<void> {

        const { productionOrderId, userId, productionModule, garmentType } = params;

        const productionOrderDetailListFromService = await this.productionOrderExternalService.find(productionOrderId);


        if (productionOrderDetailListFromService === null)
            throw new ProductionOrderNotFound(productionOrderId);

        const [{ reference }] = productionOrderDetailListFromService;

        const productionOrderReference = new ProductionOrderReference(reference);

        const eanListFromService = await this.productionOrderEanExternalService.match({
            reference: productionOrderReference
        });

        if (eanListFromService.length === 0)
            throw new EanNotFound();

        const productionOrderDetailList = this.mapper({
            productionOrderDetailEanList: eanListFromService,
            productionOrderDetailList: productionOrderDetailListFromService,
        });

        const productionOrderNotStated = ProductionOrderNotStarted.create(
            productionOrderId,
            productionOrderReference,
            garmentType,
            productionModule, 
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
                new ColorLabel(entry.colorLabel),
                new GarmentSize(entry.garmentSize),
                new BarcodeEan(ean.ean),
                new ProductionOrderDetailPlannedAmount(entry.plannedAmount)
            )
        })
    }
}