import { GarmentSize } from "../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderId } from "../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { CountingRecordsOrderFirstQuality } from "../Interfaces/CountingRecordOrderFirstQuality";
import { CountingRecordsOrderProductionScheduleId } from "../value-objects/CountingRecordsOrderProductionScheduleId";
import { ProductionModuleId } from "../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { UserId } from "../../../User/domain/value-objects/UserId";
import { CountingRecordsOrderId } from "../value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderAmount } from "../value-objects/CountingRecordsOrderAmount";
import { CreationDate } from "../../../Shared/domain/value-object/CreationDate";
import { CountingRecordsOrderSecondQualityNotCheckedDTO } from "../data-transfer-object/CountingRecordsOrderSecondQualityNotCheckedDTO";
import { ColorId } from "../../../Shared/domain/value-object/ColorId";

export class CountingRecordsOrderSecondQualityNotChecked implements CountingRecordsOrderFirstQuality {

    constructor(
        readonly id: CountingRecordsOrderId,
        readonly productionOrderId: ProductionOrderId,
        readonly colorId: ColorId,
        readonly garmentSize: GarmentSize,
        readonly recordsAmount: CountingRecordsOrderAmount,
        readonly productionModuleId: ProductionModuleId,
        readonly productionScheduleId: CountingRecordsOrderProductionScheduleId,
        readonly creationDate: CreationDate,
        readonly createByUser: UserId
    ) { }

    static create(
        id: CountingRecordsOrderId,
        productionOrderId: ProductionOrderId,
        colorId: ColorId,
        garmentSize: GarmentSize,
        recordsAmount: CountingRecordsOrderAmount,
        productionModuleId: ProductionModuleId,
        productionScheduleId: CountingRecordsOrderProductionScheduleId,
        createByUser: UserId,
        creationDate: CreationDate
    ): CountingRecordsOrderSecondQualityNotChecked {
        return new CountingRecordsOrderSecondQualityNotChecked(
            id,
            productionOrderId,
            colorId,
            garmentSize,
            recordsAmount,
            productionModuleId,
            productionScheduleId,
            creationDate,
            createByUser
        );
    }

    static fromPrimitives(data: CountingRecordsOrderSecondQualityNotCheckedDTO): CountingRecordsOrderSecondQualityNotChecked {
        return new CountingRecordsOrderSecondQualityNotChecked(
            new CountingRecordsOrderId(data.id),
            new ProductionOrderId(data.productionOrderId),
            new ColorId(data.colorId),
            new GarmentSize(data.garmentSize),
            new CountingRecordsOrderAmount(data.recordsAmount),
            new ProductionModuleId(data.productionModuleId),
            new CountingRecordsOrderProductionScheduleId(data.productionScheduleId),
            new CreationDate(data.creationDate),
            new UserId(data.createByUser)
        )
    }

    toPrimitives(): CountingRecordsOrderSecondQualityNotCheckedDTO {
        return new CountingRecordsOrderSecondQualityNotCheckedDTO(
            this.id.value,
            this.productionOrderId.value,
            this.colorId.value,
            this.garmentSize.value,
            this.recordsAmount.value,
            this.productionModuleId.value,
            this.productionScheduleId.value,
            this.creationDate.value,
            this.createByUser.value
        );
    }
}