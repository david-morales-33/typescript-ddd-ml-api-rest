import { MonthlyUnitReportRoot } from '../interface/MonthlyUnitReportRoot';
import { MonthlyUnitReportDTO } from '../data-transfer-objects/MonthlyUnitReportDTO';
import { MonthilyUnitReportMonth } from '../value-objects/MonthilyUnitReportMonth';
import { MonthlyUnitReportId } from '../value-objects/MonthlyUnitReportId';
import { MonthlyUnitReportAmount } from '../value-objects/MonthlyUnitReportAmount';
import { MonthlyUnitReportYear } from '../value-objects/MonthlyUnitReportYear';
import { MonthlyUnitsReportProductionOrderType } from '../value-objects/MonthlyUnitsReportProductionOrderType';
import { MonthilyUnitReportReference } from '../value-objects/MonthilyUnitReportReference';

export class MonthlyUnitReport implements MonthlyUnitReportRoot {

    constructor(
        readonly id: MonthlyUnitReportId,
        readonly amount: MonthlyUnitReportAmount,
        readonly reference: MonthilyUnitReportReference,
        readonly productionOrderType: MonthlyUnitsReportProductionOrderType,
        readonly month: MonthilyUnitReportMonth,
        readonly year: MonthlyUnitReportYear
    ) { }

    static create(
        id: MonthlyUnitReportId,
        amount: MonthlyUnitReportAmount,
        reference: MonthilyUnitReportReference,
        productionOrderType: MonthlyUnitsReportProductionOrderType,
        month: MonthilyUnitReportMonth,
        year: MonthlyUnitReportYear
    ): MonthlyUnitReport {
        return new MonthlyUnitReport(id, amount, reference, productionOrderType, month, year)
    }

    static fromPrimitives(data: MonthlyUnitReportDTO): MonthlyUnitReport {
        return new MonthlyUnitReport(
            new MonthlyUnitReportId(data.id),
            new MonthlyUnitReportAmount(data.amount),
            new MonthilyUnitReportReference(data.reference),
            new MonthlyUnitsReportProductionOrderType(data.productionOrderType),
            new MonthilyUnitReportMonth(data.month),
            new MonthlyUnitReportYear(data.year)
        )
    }

    toPrimitives(): MonthlyUnitReportDTO {
        return new MonthlyUnitReportDTO(
            this.id.value,
            this.amount.value,
            this.reference.value,
            this.productionOrderType.value,
            this.month.value,
            this.year.value
        )
    }
}