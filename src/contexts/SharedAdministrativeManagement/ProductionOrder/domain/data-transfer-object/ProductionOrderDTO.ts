import { CommonModificationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonModificationEventDTO";
import { ProductionOrderNotPlannedSewingProcessDTO } from "../../../ProductionOrderSewingProcess/domain/data-transfer-objects/ProductionOrderNotPlannedSewingProcessDTO";
import { ProductionOrderPlannedSewingProcessDTO } from "../../../ProductionOrderSewingProcess/domain/data-transfer-objects/ProductionOrderPlannedSewingProcessDTO";

export class ProductionOrderDTO {
    constructor(
        readonly productionOrderId: string,
        readonly reference: string,
        readonly garmentType: string,
        readonly plannedAmount: number,
        readonly administrativeEventList: CommonModificationEventDTO[],
        readonly creationDate: Date,
        readonly state: number,
        readonly processStartDate: Date | null,
        readonly processEndDate: Date | null,
        readonly processStartDatePlanned: Date | null,
        readonly processEndDatePlanned: Date | null,
        readonly sewingProccess: ProductionOrderNotPlannedSewingProcessDTO | ProductionOrderPlannedSewingProcessDTO | null
    ) { }
}