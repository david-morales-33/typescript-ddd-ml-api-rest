import { DailyUnitReportRoot } from '../interfaces/DailyUnitReportRoot';
import { DailyUnitReportId } from '../value-objects/DailyUnitReportId'
import { DailyUnitReportAmount } from '../value-objects/DailyUnitReportAmount'
import { DailyUnitReportReference } from '../value-objects/DailyUnitReportReference'
import { DailyUnitReportProductionType } from '../value-objects/DailyUnitReportProductionType'
import { DailyUnitReportDay } from '../value-objects/DailyUnitReportDay'
import { DailyUnitReportYear } from '../value-objects/DailyUnitReportYear';
import { DailyUnitReportDTO } from '../data-transfer-objects/DailyUnitReportDTO'

export class DailyUnitReport implements DailyUnitReportRoot {
    constructor(
        readonly id: DailyUnitReportId,
        readonly amount: DailyUnitReportAmount,
        readonly reference: DailyUnitReportReference,
        readonly productionOrderType: DailyUnitReportProductionType,
        readonly day: DailyUnitReportDay,
        readonly year: DailyUnitReportYear
    ) { }

    static create(
        id: DailyUnitReportId,
        amount: DailyUnitReportAmount,
        reference: DailyUnitReportReference,
        productionOrderType: DailyUnitReportProductionType,
        day: DailyUnitReportDay,
        year: DailyUnitReportYear
    ): DailyUnitReport {
        return new DailyUnitReport(id, amount, reference, productionOrderType, day, year)
    }

    static fromPrimitives(data: DailyUnitReportDTO): DailyUnitReport {
        return new DailyUnitReport(
            new DailyUnitReportId(data.id),
            new DailyUnitReportAmount(data.amount),
            new DailyUnitReportReference(data.reference),
            new DailyUnitReportProductionType(data.productionOrderType),
            new DailyUnitReportDay(data.day),
            new DailyUnitReportYear(data.year)
        )
    }

    toPrimitives(): DailyUnitReportDTO {
        return new DailyUnitReportDTO(
            this.id.value,
            this.amount.value,
            this.reference.value,
            this.productionOrderType.value,
            this.day.value,
            this.year.value
        )
    }
}