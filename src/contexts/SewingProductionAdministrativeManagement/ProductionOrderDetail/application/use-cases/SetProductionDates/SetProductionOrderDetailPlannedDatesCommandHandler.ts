import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionOrderProcessEndDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ColorId } from "../../../../../Shared/domain/value-object/ColorId";
import { GarmentSize } from "../../../../../Shared/domain/value-object/GarmentSize";
import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { SetProductionOrderDetailPlannedDatesCommand } from "../../../domain/data-transfer-objects/SetProductionOrderDetailPlannedDatesCommand";
import { ProductionOrderDetailId } from "../../../domain/value-objects/ProductionOrderDetailId";
import { ProductionOrderDetailSetterPlannedDates } from "./ProductionOrderDetailSetterPlannedDates";
import { SetProductionOrderDetailPlannedDatesValidator } from "./SetProductionOrderDetailPlannedDatesValidator";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

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