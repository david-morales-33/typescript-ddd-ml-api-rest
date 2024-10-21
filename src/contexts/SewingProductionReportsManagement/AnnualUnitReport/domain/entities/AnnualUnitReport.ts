import { AnnualUnitReportRoot } from '../interfaces/AnnualUnitReportRoot';
import { AnnualUnitReportDTO } from '../data-transfer-objects/AnnualUnitReportDTO';
import { AnnualUnitReportId } from '../value-objects/AnnualUnitReportId';
import { AnnualUnitReportAmount } from '../value-objects/AnnualUnitReportAmount';
import { AnnualUnitReportReference } from '../value-objects/AnnualUnitReportReference';
import { AnnualUnitReportProductionOrderType } from '../value-objects/AnnualUnitReportProductionOrderId';
import { AnnualUnitReportYear } from '../value-objects/AnnualUnitReportYear';

export class AnnualUnitReport implements AnnualUnitReportRoot {
    constructor(
        readonly id: AnnualUnitReportId,
        readonly amount: AnnualUnitReportAmount,
        readonly reference: AnnualUnitReportReference,
        readonly productionOrderType: AnnualUnitReportProductionOrderType,
        readonly year: AnnualUnitReportYear
    ) { }

    static create(
        id: AnnualUnitReportId,
        amount: AnnualUnitReportAmount,
        reference: AnnualUnitReportReference,
        productionOrderType: AnnualUnitReportProductionOrderType,
        year: AnnualUnitReportYear
    ): AnnualUnitReport {
        return new AnnualUnitReport(id, amount, reference, productionOrderType, year);
    }

    static fromPrimitives(data: AnnualUnitReportDTO): AnnualUnitReport {
        return new AnnualUnitReport(
            new AnnualUnitReportId(data.id),
            new AnnualUnitReportAmount(data.amount),
            new AnnualUnitReportReference(data.reference),
            new AnnualUnitReportProductionOrderType(data.productionOrderType),
            new AnnualUnitReportYear(data.year)
        )
    }

    toPrimitives(): AnnualUnitReportDTO {
        return new AnnualUnitReportDTO(
            this.id.value,
            this.amount.value,
            this.reference.value,
            this.productionOrderType.value,
            this.year.value
        )
    }
}