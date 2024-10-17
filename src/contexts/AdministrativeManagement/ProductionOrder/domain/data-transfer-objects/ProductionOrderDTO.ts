import { CommonModificationEventDTO } from "../../../../Shared/data-transfer-object/CommonModificationEventDTO";
import { ProductionOrderDetailDTO } from "../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailDTO";

export class ProductionOrderDTO {
    constructor(
        readonly productionOrderid: string,
        readonly reference: string,
        readonly plannedAmount: number,
        readonly executedAmount: number,
        readonly processStartDate: Date | null,
        readonly processEndDate: Date | null,
        readonly processStartDatePlanned: Date | null,
        readonly processEndDatePlanned: Date | null,
        readonly recordsOrderCounter: number,
        readonly recordsOrderCheckedCounter: number,
        readonly openByUser: string,
        readonly state: boolean,
        readonly productionOrderDetailList: ProductionOrderDetailDTO[],
        readonly administrativeEventList: CommonModificationEventDTO[],
    ) { }
}