import { CommonModificationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonModificationEventDTO";
import { ProductionOrderNotPlannedCuttingProcessDTO } from "../../../ProductionOrderCuttingProcess/domain/data-transfer-object/ProductionOrderNotPlannedCuttingProcessDTO";
import { ProductionOrderPlannedCuttingProcessDTO } from "../../../ProductionOrderCuttingProcess/domain/data-transfer-object/ProductionOrderPlannedCuttingProcessDTO";
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
        readonly sewingProcess: ProductionOrderNotPlannedSewingProcessDTO | ProductionOrderPlannedSewingProcessDTO,
        readonly cuttingProcess: ProductionOrderNotPlannedCuttingProcessDTO | ProductionOrderPlannedCuttingProcessDTO
    ) { }
}