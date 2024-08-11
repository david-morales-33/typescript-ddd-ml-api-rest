import { CountingRecordsOrderSecondQuality } from "../Interfaces/CountingRecordOrderSecondQuality";
import { GarmentSize } from "../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderId } from "../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { CountingRecordsOrderProductionScheduleId } from "../value-objects/CountingRecordsOrderProductionScheduleId";
import { ProductionModuleId } from "../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { UserId } from "../../../User/domain/value-objects/UserId";
import { CountingRecordsOrderId } from "../value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderAmount } from "../value-objects/CountingRecordsOrderAmount";
import { CreationDate } from "../../../Shared/domain/value-object/CreationDate";
import { CountingRecordsOrderSecondQualityCheckedDTO } from "../data-transfer-object/CountingRecordsOrderSecondQualityCheckedDTO";
import { ColorId } from "../../../Shared/domain/value-object/ColorId";

export class CountingRecordsOrderSecondQualityChecked implements CountingRecordsOrderSecondQuality {

    constructor(
        readonly id: CountingRecordsOrderId,
        readonly productionOrderId: ProductionOrderId,
        readonly colorId: ColorId,
        readonly garmentSize: GarmentSize,
        readonly recordsAmount: CountingRecordsOrderAmount,
        readonly productionModuleId: ProductionModuleId,
        readonly productionScheduleId: CountingRecordsOrderProductionScheduleId,
        readonly creationDate: CreationDate,
        readonly checkDate: CreationDate,
        readonly createdByUser: UserId,
        readonly checkedByUser: UserId
    ) { }

    static create(
        id: CountingRecordsOrderId,
        productionOrderId: ProductionOrderId,
        colorId: ColorId,
        garmentSize: GarmentSize,
        recordsAmount: CountingRecordsOrderAmount,
        productionModuleId: ProductionModuleId,
        productionScheduleId: CountingRecordsOrderProductionScheduleId,
        creationDate: CreationDate,
        checkDate: CreationDate,
        createByUser: UserId,
        checkByUser: UserId
    ): CountingRecordsOrderSecondQualityChecked {
        return new CountingRecordsOrderSecondQualityChecked(
            id,
            productionOrderId,
            colorId,
            garmentSize,
            recordsAmount,
            productionModuleId,
            productionScheduleId,
            creationDate,
            checkDate,
            createByUser,
            checkByUser
        );
    }

    static fromPrimitives(data: CountingRecordsOrderSecondQualityCheckedDTO): CountingRecordsOrderSecondQualityChecked {
        return new CountingRecordsOrderSecondQualityChecked(
            new CountingRecordsOrderId(data.id),
            new ProductionOrderId(data.productionOrderId),
            new ColorId(data.colorId),
            new GarmentSize(data.garmentSize),
            new CountingRecordsOrderAmount(data.recordsAmount),
            new ProductionModuleId(data.productionModuleId),
            new CountingRecordsOrderProductionScheduleId(data.productionScheduleId),
            new CreationDate(data.creationDate),
            new CreationDate(data.checkDate),
            new UserId(data.createdByUser),
            new UserId(data.checkedByUser),
        )
    }

    toPrimitives(): CountingRecordsOrderSecondQualityCheckedDTO {
        return new CountingRecordsOrderSecondQualityCheckedDTO(
            this.id.value,
            this.productionOrderId.value,
            this.colorId.value,
            this.garmentSize.value,
            this.recordsAmount.value,
            this.productionModuleId.value,
            this.productionScheduleId.value,
            this.creationDate.value,
            this.checkDate.value,
            this.createdByUser.value,
            this.checkedByUser.value
        )
    }
}