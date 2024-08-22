import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionOrderProcessEndDatePlanned } from "../../../../ProductionOrder/domain/value-objects/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../../ProductionOrder/domain/value-objects/ProductionOrderProcessStartDatePlanned";
import { ColorId } from "../../../../shared/domain/value-objects/ColorId";
import { GarmentSize } from "../../../../shared/domain/value-objects/GarmentSize";
import { ProductionOrderId } from "../../../../shared/domain/value-objects/ProductionOrderId";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { SetProductionOrderDetailPlannedDatesCommand } from "../../../domain/data-transfer-objects/SetProductionOrderDetailPlannedDatesCommand";
import { ProductionOrderDetailId } from "../../../domain/value-objects/ProductionOrderDetailId";
import { ProductionOrderDetailSetterPlannedDates } from "./ProductionOrderDetailSetterPlannedDates";
import { SetProductionOrderDetailPlannedDatesValidator } from "./SetProductionOrderDetailPlannedDatesValidator";

export class SetProductionOrderPlannedDatesCommandHandler implements CommandHandler<SetProductionOrderDetailPlannedDatesCommand> {

    constructor(
        private setProductionOrderPlannedDatesValidator: SetProductionOrderDetailPlannedDatesValidator,
        private productionOrderSetterPlannedDates: ProductionOrderDetailSetterPlannedDates
    ) { }

    subscribedTo(): Command {
        return SetProductionOrderDetailPlannedDatesCommand;
    }

    async handle(command: SetProductionOrderDetailPlannedDatesCommand): Promise<void> {

        const setBy = new UserId(command.setBy);
        const processStartDatePlanned = new ProductionOrderProcessStartDatePlanned(command.processStartDatePlanned);
        const processEndDatePlanned = new ProductionOrderProcessEndDatePlanned(command.processEndDatePlanned);
        const productionModuleId = new ProductionModuleId(command.productionModuleId);

        const productionOrderDetailId = ProductionOrderDetailId.create(
            new ColorId(command.colorId),
            new GarmentSize(command.garmentSize),
            new ProductionOrderId(command.productionOrderId),
        );

        await this.setProductionOrderPlannedDatesValidator.execute(setBy);
        await this.productionOrderSetterPlannedDates.execute({
            setBy,
            productionModuleId,
            productionOrderDetailId,
            processEndDatePlanned,
            processStartDatePlanned
        })

    }
}