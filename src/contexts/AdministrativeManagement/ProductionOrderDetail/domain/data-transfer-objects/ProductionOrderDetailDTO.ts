import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";

export class ProductionOrderDetailDTO {
    constructor(
        readonly productionOrderDetailId: string,
        readonly productionOrderId: string,
        readonly colorId: string,
        readonly garmentSize: string,
        readonly ean: string,
        readonly plannedAmount: number,
        readonly executedAmount: number,
        readonly state: boolean,
        readonly processStartDate: Date | null,
        readonly processEndDate: Date | null,
        readonly processStartDatePlanned: Date | null,
        readonly processEndDatePlanned: Date | null,
        readonly recordsOrderCounter: number,
        readonly recordsOrderCheckedCounter: number,
        readonly countingRecordsOrderListId: number[],
        readonly countingRecordsOrderCheckedListId: number[],
        readonly administrativeEventList: CommonModificationEventDTO[],
    ) { }
}