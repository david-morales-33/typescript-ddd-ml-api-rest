import { GarmentSize } from "../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderId } from "../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { CountingRecordsOrderFirstQuality } from "../Interfaces/CountingRecordOrderFirstQuality";
import { CountingRecordsOrderEventIdOnProductionModule } from "../value-objects/CountingRecordsOrderEventIdOnProductionModule";
import { CountingRecordsOrderFinalTime } from "../value-objects/CountingRecordsOrderFinalTime";
import { CountingRecordsOrderProductionScheduleId } from "../value-objects/CountingRecordsOrderProductionScheduleId";
import { CountingRecordsOrderInitialTime } from "../value-objects/CountingRecordsOrderInitialTime";
import { ProductionModuleId } from "../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { UserId } from "../../../User/domain/value-objects/UserId";
import { CountingRecordsOrderId } from "../value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderAmount } from "../value-objects/CountingRecordsOrderAmount";
import { CreationDate } from "../../../Shared/domain/value-object/CreationDate";
import { CountingRecordsOrderEvent } from "../../../CountingRecordsOrderEvent/domain/entities/CountingRecordsOrderEvent";
import { CountingRecordsOrderFirstQualityNotCheckedDTO } from "../data-transfer-object/CountingRecordsOrderFirstQualityNotCheckedDTO";
import { CountingRecordsOrderEventDTO } from "../../../CountingRecordsOrderEvent/domain/data-transfer-object/CountingRecordsOrderEventDTO";
import { ColorId } from "../../../Shared/domain/value-object/ColorId";

export class CountingRecordsOrderFirstQualityNotChecked implements CountingRecordsOrderFirstQuality {
    constructor(
        readonly id: CountingRecordsOrderId,
        readonly productionOrderId: ProductionOrderId,
        readonly colorId: ColorId,
        readonly garmentSize: GarmentSize,
        readonly initialTime: CountingRecordsOrderInitialTime,
        readonly finalTime: CountingRecordsOrderFinalTime,
        readonly recordsAmount: CountingRecordsOrderAmount,
        readonly productionModuleId: ProductionModuleId,
        readonly productionScheduleId: CountingRecordsOrderProductionScheduleId,
        readonly eventOnProductionModuleId: CountingRecordsOrderEventIdOnProductionModule | null,
        readonly creationDate: CreationDate,
        readonly createByUser: UserId,
        readonly eventOnCountingRecordsOrderList: CountingRecordsOrderEvent[] 
    ) { }

    addEventOnCountingRecordsOrder(countingRecordsOrderEvent: CountingRecordsOrderEvent): void {
        if(this.hasAddedEventOnCountingRecordsOrder( countingRecordsOrderEvent))
            throw new Error('The Counting Records Order Event has already been added');

        this.eventOnCountingRecordsOrderList.push(countingRecordsOrderEvent)
    }

    hasAddedEventOnCountingRecordsOrder(countingRecordsOrderEvent: CountingRecordsOrderEvent): boolean {
        const countingRecordsOrderEventFinded = this.eventOnCountingRecordsOrderList?.find(element => element.id.value === countingRecordsOrderEvent.id.value);
        return countingRecordsOrderEventFinded !== undefined;
    }

    static create(
        id: CountingRecordsOrderId,
        productionOrderId: ProductionOrderId,
        colorId: ColorId,
        garmentSize: GarmentSize,
        initialTime: CountingRecordsOrderInitialTime,
        finalTime: CountingRecordsOrderFinalTime,
        recordsAmount: CountingRecordsOrderAmount,
        productionModuleId: ProductionModuleId,
        productionScheduleId: CountingRecordsOrderProductionScheduleId,
        eventOnProductionModuleId: CountingRecordsOrderEventIdOnProductionModule | null,
        createByUser: UserId,
        creationDate: CreationDate,
        eventOnCountingRecordsOrderList?: CountingRecordsOrderEvent[]
    ): CountingRecordsOrderFirstQualityNotChecked {
        return new CountingRecordsOrderFirstQualityNotChecked(
            id,
            productionOrderId,
            colorId,
            garmentSize,
            initialTime,
            finalTime,
            recordsAmount,
            productionModuleId,
            productionScheduleId,
            eventOnProductionModuleId,
            creationDate,
            createByUser,
            eventOnCountingRecordsOrderList || []
        );
    }

    static fromPrimitives(data: CountingRecordsOrderFirstQualityNotCheckedDTO): CountingRecordsOrderFirstQualityNotChecked {
        return new CountingRecordsOrderFirstQualityNotChecked(
            new CountingRecordsOrderId(data.id),
            new ProductionOrderId(data.productionOrderId),
            new ColorId(data.colorId),
            new GarmentSize(data.garmentSize),
            new CountingRecordsOrderInitialTime(data.initialTime),
            new CountingRecordsOrderFinalTime(data.finalTime),
            new CountingRecordsOrderAmount(data.recordsAmount),
            new ProductionModuleId(data.productionModuleId),
            new CountingRecordsOrderProductionScheduleId(data.productionScheduleId),
            data.eventOnProductionModuleId ? new CountingRecordsOrderEventIdOnProductionModule(data.eventOnProductionModuleId): null,
            new CreationDate(data.creationDate),
            new UserId(data.createByUser),
            data.eventOnCountingRecordsOrderList.map(entry => CountingRecordsOrderEvent.fromPrimitives(entry))
        )
    }

    toPrimitives(): CountingRecordsOrderFirstQualityNotCheckedDTO {
        return new CountingRecordsOrderFirstQualityNotCheckedDTO(
            this.id.value,
            this.productionOrderId.value,
            this.colorId.value,
            this.garmentSize.value,
            this.initialTime.value,
            this.finalTime.value,
            this.recordsAmount.value,
            this.productionModuleId.value,
            this.productionScheduleId.value,
            this.eventOnProductionModuleId? this.eventOnProductionModuleId.value : null,
            this.creationDate.value,
            this.createByUser.value,
            this.eventOnCountingRecordsOrderList ? this.eventOnCountingRecordsOrderList.map(entry => new CountingRecordsOrderEventDTO(
                entry.id.value,
                entry.name.value,
                entry.previusValue.value,
                entry.currentValue.value,
                entry.eventDate.value
            )) : []
        );
    }
}