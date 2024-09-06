import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { CountingRecordsOrderSecondQualityNotChecked } from "../../../../CountingRecordsOrder/domain/entities/CountingRecordOrderSecondQualityNotChecked";
import { CountingRecordsOrderAmount } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
import { CountingRecordsOrderId } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderProductionScheduleId } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderProductionScheduleId";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { CreationDate } from "../../../../Shared/domain/value-object/CreationDate";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { CreateCountingRecordsOrderSecondQualityCommand } from "../../../domain/data-transfer-objects/CreateCountingRecordsOrderSecondQualityCommand";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { CountingRecordsOrderNotProvided } from "../../exception/CountingRecordsOrderNotProvided";
import { CountingRecordsOrderSecondQualityCreator } from "./CountingRecordsOrderSecondQualityCreator";
import { CreateCountingRecordsOrderSecondQualityValidator } from "./CreateCountingRecordsOrderSecondQualityValidator";


export class CreateCountingRecordsOrderSecondQualityCommandHandler implements CommandHandler<CreateCountingRecordsOrderSecondQualityCommand> {
    constructor(
        private countingRecordsOrderCreator: CountingRecordsOrderSecondQualityCreator,
        private validator: CreateCountingRecordsOrderSecondQualityValidator
    ) { }

    subscribedTo(): Command {
        return CreateCountingRecordsOrderSecondQualityCommand;
    }

    async handle(command: CreateCountingRecordsOrderSecondQualityCommand): Promise<void> {

        if (command.countingRecordsOrders.length === 0)
            throw new CountingRecordsOrderNotProvided();

        const countingRecordsOrderList = command.countingRecordsOrders.map(entry => {
            return CountingRecordsOrderSecondQualityNotChecked.create(
                new CountingRecordsOrderId(entry.id),
                new ProductionOrderId(entry.productionOrderId),
                new ColorId(entry.colorId),
                new GarmentSize(entry.garmentSize),
                new CountingRecordsOrderAmount(entry.amount),
                new ProductionModuleId(entry.productionModuleId),
                new CountingRecordsOrderProductionScheduleId(1),
                new UserId(entry.userId),
                new CreationDate(new Date())
            )
        });
        await this.validator.execute({
            userId: new UserId(command.countingRecordsOrders[0].userId),
            productionModuleId: new ProductionModuleId(command.countingRecordsOrders[0].productionModuleId)
        })
        await this.countingRecordsOrderCreator.execute(countingRecordsOrderList)
    }

}