import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { CreateCountingRecordsOrderFirstQualityCommand } from "../../../../CountingRecordsOrder/domain/data-transfer-object/CreateCountingRecordsOrderFirstQualityCommand";
import { CountingRecordsOrderFirstQualityNotChecked } from "../../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityNotChecked";
import { CountingRecordsOrderAmount } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
import { CountingRecordsOrderEventIdOnProductionModule } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule";
import { CountingRecordsOrderFinalTime } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderFinalTime";
import { CountingRecordsOrderId } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderInitialTime } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderInitialTime";
import { CountingRecordsOrderProductionScheduleId } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderProductionScheduleId";
import { CountingRecordsOrderEvent } from "../../../../CountingRecordsOrderEvent/domain/entities/CountingRecordsOrderEvent";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { CreationDate } from "../../../../Shared/domain/value-object/CreationDate";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { CreateCountingRecordsOrderFirstQualityValidator } from "./CreateCountingRecordsOrderFirstQualityValidator";
import { CountingRecordsOrderFirstQualityCreator } from "./CountingRecordsOrderFirstQualityCreator";

export class CreateCountingRecordsOrderFirstQualityCommandHandler implements CommandHandler<CreateCountingRecordsOrderFirstQualityCommand> {

    constructor(
        private countingRecordsOrderFirstQualityCreator: CountingRecordsOrderFirstQualityCreator,
        private countingRecordsOrderValidator: CreateCountingRecordsOrderFirstQualityValidator
    ) { }

    subscribedTo(): Command {
        return CountingRecordsOrderFirstQualityCreator;
    }

    async handle(command: CreateCountingRecordsOrderFirstQualityCommand): Promise<void> {

        const userId = new UserId(command.userId);
        const finalTime = new CountingRecordsOrderFinalTime(command.finalTime);
        const initialTime = new CountingRecordsOrderInitialTime(command.initialTime);
        const productionOrderId = new ProductionOrderId(command.productionOrderId);
        const productionModuleId = new ProductionModuleId(command.productionModuleId);
        const productionScheduleId = new CountingRecordsOrderProductionScheduleId(command.productionScheduleId);
        const productionModuleEventId = command.eventOnProductionModuleId ? new CountingRecordsOrderEventIdOnProductionModule(command.eventOnProductionModuleId) : null

        await this.countingRecordsOrderValidator.execute({
            userId,
            productionModuleId,
            productionModuleEventId
        })

        const countingRecordsOrderList = command.detailList.map(countingRecordsOrder => {

            const id = new CountingRecordsOrderId(countingRecordsOrder.id);
            const amount = new CountingRecordsOrderAmount(countingRecordsOrder.recordsAmount);
            const colorId = new ColorId(countingRecordsOrder.colorId);
            const garmentSize = new GarmentSize(countingRecordsOrder.garmentSize);
            const creationDate = new CreationDate(countingRecordsOrder.creationDate);

            const newCountingRecordsOrder = CountingRecordsOrderFirstQualityNotChecked.create(
                id,
                productionOrderId,
                colorId,
                garmentSize,
                initialTime,
                finalTime,
                amount,
                productionModuleId,
                productionScheduleId,
                productionModuleEventId,
                userId,
                creationDate,
                []
            )

            if (countingRecordsOrder.eventOnCountingRecordsOrderList.length !== 0) {
                countingRecordsOrder.eventOnCountingRecordsOrderList.forEach(entry => {
                    newCountingRecordsOrder.addEventOnCountingRecordsOrder(
                        CountingRecordsOrderEvent.fromPrimitives(entry)
                    );
                });
            }

            return newCountingRecordsOrder;
        });

        await this.countingRecordsOrderFirstQualityCreator.execute(countingRecordsOrderList);
    }
}