import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { CountingRecordsOrderFirstQualityNotChecked } from "../../../../CountingRecordsOrder/domain/entities/CountingRecordOrderFirstQualityNotChecked";
import { CountingRecordsOrderAmount } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
import { CountingRecordsOrderEventIdOnProductionModule } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule";
import { CountingRecordsOrderFinalTime } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderFinalTime";
import { CountingRecordsOrderId } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderInitialTime } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderInitialTime";
import { CountingRecordsOrderProductionScheduleId } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderProductionScheduleId";
import { CountingRecordsOrderEvent } from "../../../../CountingRecordsOrderEvent/domain/entities/CountingRecordsOrderEvent";
import { CountingRecordsOrderEventId } from "../../../../CountingRecordsOrderEvent/domain/value-objects/CountingRecordsOrderEventId";
import { CountingRecordsOrderEventName } from "../../../../CountingRecordsOrderEvent/domain/value-objects/CountingRecordsOrderEventName";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { CreationDate } from "../../../../Shared/domain/value-object/CreationDate";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { CreateCountingRecordsOrderFirstQualityCommand } from "../../../domain/data-transfer-objects/CreateCountingRecordsOrderFirstQualityCommand";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { CountingRecordsOrderFirstQualityCreator } from "./CountingRecordsOrderFirstQualityCreator";

export class CreateCountingRecordsOrderFirstQualityCommandHandler implements
    CommandHandler<CreateCountingRecordsOrderFirstQualityCommand> {

    constructor(private countingRecordsOrderCreator: CountingRecordsOrderFirstQualityCreator) { }

    subscribedTo(): Command {
        return CreateCountingRecordsOrderFirstQualityCommand;
    }

    async handle(command: CreateCountingRecordsOrderFirstQualityCommand): Promise<void> {

        const countingRecordsOrderList = command.countingRecordsOrders.map(entry => {
            return CountingRecordsOrderFirstQualityNotChecked.create(
                new CountingRecordsOrderId(entry.id),
                new ProductionOrderId(entry.productionOrderId),
                new ColorId(entry.colorId),
                new GarmentSize(entry.garmentSize),
                new CountingRecordsOrderInitialTime(entry.initialTime),
                new CountingRecordsOrderFinalTime(entry.finalTime),
                new CountingRecordsOrderAmount(entry.amount),
                new ProductionModuleId(entry.productionModuleId),
                new CountingRecordsOrderProductionScheduleId(0),
                entry.eventOnProductionModule ? new CountingRecordsOrderEventIdOnProductionModule(entry.eventOnProductionModule) : null,
                new UserId(entry.userId),
                new CreationDate(new Date()),
                
                entry.eventOnCountingRecordsOrder.map(evnt => {
                    return CountingRecordsOrderEvent.create(
                        new CountingRecordsOrderEventId(evnt.id),
                        new CountingRecordsOrderEventName(evnt.name),
                        new CountingRecordsOrderAmount(evnt.previusValue),
                        new CountingRecordsOrderAmount(evnt.currentValue),
                        new CreationDate(new Date())
                    )
                })
            )
        });

        await this.countingRecordsOrderCreator.execute(countingRecordsOrderList)
    }
}