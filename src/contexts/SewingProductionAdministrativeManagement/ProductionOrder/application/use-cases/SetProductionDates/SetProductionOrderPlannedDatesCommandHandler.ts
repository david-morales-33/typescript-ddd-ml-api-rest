import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { SetProductionOrderPlannedDatesCommand } from "../../../domain/data-transfer-objects/SetProductionOrderPlannedDatesCommand";
import { ProductionOrderProcessEndDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderSetterPlannedDates } from "./ProductionOrderSetterPlannedDates";
import { SetProductionOrderPlannedDatesValidator } from "./SetProductionOrderPlannedDatesValidator";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class SetProductionOrderPlannedDatesCommandHandler implements CommandHandler<SetProductionOrderPlannedDatesCommand> {

    constructor(
        private setProductionOrderPlannedDatesValidator: SetProductionOrderPlannedDatesValidator,
        private productionOrderSetterPlannedDates: ProductionOrderSetterPlannedDates
    ) { }

    subscribedTo(): Command {
        return SetProductionOrderPlannedDatesCommand;
    }

    async handle(command: SetProductionOrderPlannedDatesCommand): Promise<void> {

        const setBy = new UserId(command.setBy);
        const productionOrderId = new ProductionOrderId(command.productionOrderId);
        const processStartDatePlanned = new ProductionOrderProcessStartDatePlanned(command.processStartDatePlanned);
        const processEndDatePlanned = new ProductionOrderProcessEndDatePlanned(command.processEndDatePlanned);

        await this.setProductionOrderPlannedDatesValidator.execute(setBy);
        await this.productionOrderSetterPlannedDates.execute({
            setBy,
            productionOrderId,
            processEndDatePlanned,
            processStartDatePlanned
        })

    }
}