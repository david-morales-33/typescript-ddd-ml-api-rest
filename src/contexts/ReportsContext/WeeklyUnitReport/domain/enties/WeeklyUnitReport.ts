import { WeeklyUnitReportRoot } from '../interfaces/WeeklyUnitReportRoot';
import { WeeklyUnitReportDTO } from '../data-transfer-objects/WeeklyUnitReportDTO';
import { WeeklyUnitReportId } from '../value-objects/WeeklyUnitReportId';
import { WeeklyUnitReportAmount } from '../value-objects/WeeklyUnitReportAmount';
import { WeeklyUnitReportReference } from '../value-objects/WeeklyUnitReportReference'
import { WeeklyUnitReportProductionOrderType } from '../value-objects/WeeklyUnitReportProductionOrderType';
import { WeeklyUnitReportWeek } from '../value-objects/WeeklyUnitReportWeek';
import { WeeklyUnitReportYear } from '../value-objects/WeeklyUnitReportYear';

export class WeeklyUnitReport implements WeeklyUnitReportRoot {

    constructor(
        readonly id: WeeklyUnitReportId,
        readonly amount: WeeklyUnitReportAmount,
        readonly reference: WeeklyUnitReportReference,
        readonly productionOrderType: WeeklyUnitReportProductionOrderType,
        readonly week: WeeklyUnitReportWeek,
        readonly year: WeeklyUnitReportYear
    ) { }

    static create(
        id: WeeklyUnitReportId,
        amount: WeeklyUnitReportAmount,
        reference: WeeklyUnitReportReference,
        productionOrderType: WeeklyUnitReportProductionOrderType,
        week: WeeklyUnitReportWeek,
        year: WeeklyUnitReportYear
    ): WeeklyUnitReport {
        return new WeeklyUnitReport(id, amount, reference, productionOrderType, week, year)
    }

    static fromPrimitives(data: WeeklyUnitReportDTO): WeeklyUnitReport {
        return new WeeklyUnitReport(
            new WeeklyUnitReportId(data.id),
            new WeeklyUnitReportAmount(data.amount),
            new WeeklyUnitReportReference(data.reference),
            new WeeklyUnitReportProductionOrderType(data.productionOrderType),
            new WeeklyUnitReportWeek(data.week),
            new WeeklyUnitReportYear(data.year)
        )
    }

    toPrimitives(): WeeklyUnitReportDTO {
        return new WeeklyUnitReportDTO(
            this.id.value,
            this.amount.value,
            this.reference.value,
            this.productionOrderType.value,
            this.week.value,
            this.year.value
        )
    }
}