import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";

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
        readonly productionOrderDetailList: any[],
        readonly administrativeEventList: CommonModificationEventDTO[],
    ) { }
}