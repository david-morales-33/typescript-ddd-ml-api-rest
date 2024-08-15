import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { CreateCountingRecordsOrderSecondQualityCommand } from "../../../../CountingRecordsOrder/domain/data-transfer-object/CreateCountingRecordsOrderSecondQualityCommand";
import { CountingRecordsOrderSecondQualityNotChecked } from "../../../../CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityNotChecked";
import { CountingRecordsOrderAmount } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
import { CountingRecordsOrderId } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderProductionScheduleId } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderProductionScheduleId";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { CreationDate } from "../../../../Shared/domain/value-object/CreationDate";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";

import { CountingRecordsOrderSecondQualityCreator } from "./CountingRecordsOrderSecondQualityCreator";
import { CreateCountingRecordsOrderSecondQualityValidator } from "./CreateCountingRecordsOrderSecondQualityValidator";


export class CountingRecordsOrderSecondQualityCommandHandler implements CommandHandler<CreateCountingRecordsOrderSecondQualityCommand>{

    constructor(
        private countingRecordsOrderSecondQualityCreator: CountingRecordsOrderSecondQualityCreator,
        private countingRecordsOrderValidator: CreateCountingRecordsOrderSecondQualityValidator
    ){}

    subscribedTo(): Command {
        return CreateCountingRecordsOrderSecondQualityCommand;
    }

    async handle(command: CreateCountingRecordsOrderSecondQualityCommand): Promise<void> {
        const userId = new UserId(command.userId);
        const productionOrderId = new ProductionOrderId(command.productionOrderId);
        const productionModuleId = new ProductionModuleId(command.productionModuleId);
        const productionScheduleId = new CountingRecordsOrderProductionScheduleId(command.productionScheduleId);

        await this.countingRecordsOrderValidator.execute({
            userId,
            productionModuleId
        });

        const countingRecordsOrderList = command.detailList.map(countingRecordsOrder => {

            const id = new CountingRecordsOrderId(countingRecordsOrder.id);
            const amount = new CountingRecordsOrderAmount(countingRecordsOrder.recordsAmount);
            const colorId = new ColorId(countingRecordsOrder.colorId);
            const garmentSize = new GarmentSize(countingRecordsOrder.garmentSize);
            const creationDate = new CreationDate(countingRecordsOrder.creationDate);

            const newCountingRecordsOrder = CountingRecordsOrderSecondQualityNotChecked.create(
                id,
                productionOrderId,
                colorId,
                garmentSize,
                amount,
                productionModuleId,
                productionScheduleId,
                userId,
                creationDate
            )

            return newCountingRecordsOrder;
        });

        await this.countingRecordsOrderSecondQualityCreator.execute(countingRecordsOrderList);
    }
}