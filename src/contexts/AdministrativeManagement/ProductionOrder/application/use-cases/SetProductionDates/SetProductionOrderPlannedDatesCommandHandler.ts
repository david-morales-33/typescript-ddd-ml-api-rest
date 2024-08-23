import { Command } from "../../../../../Shared/domain/Command";
import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { SetProductionOrderPlannedDatesCommand } from "../../../domain/data-transfer-objects/SetProductionOrderPlannedDatesCommand";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderProcessEndDatePlanned } from "../../../domain/value-objects/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../domain/value-objects/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderSetterPlannedDates } from "./ProductionOrderSetterPlannedDates";
import { SetProductionOrderPlannedDatesValidator } from "./setProductionOrderPlannedDatesValidator";

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