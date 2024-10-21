import { WeeklyUnitReportRoot } from '../interfaces/WeeklyUnitReportRoot'
import { WeeklyUnitReportId } from '../value-objects/WeeklyUnitReportId';
import { WeeklyUnitReportAmount } from '../value-objects/WeeklyUnitReportAmount';
import { WeeklyUnitReportReference } from '../value-objects/WeeklyUnitReportReference'
import { WeeklyUnitReportProductionOrderType } from '../value-objects/WeeklyUnitReportProductionOrderType';
import { WeeklyUnitReportWeek } from '../value-objects/WeeklyUnitReportWeek';
import { WeeklyUnitReportYear } from '../value-objects/WeeklyUnitReportYear';
import { WeeklyUnitReportProductionModuleId } from '../value-objects/WeeklyUnitReportProductionModuleId';
import { WeeklyUnitReportByProductionModuleDTO } from '../data-transfer-objects/WeeklyUnitReportByProductionModuleDTO'

export class WeeklyUnitReportByProductionModule implements WeeklyUnitReportRoot {
    constructor(
        readonly id: WeeklyUnitReportId,
        readonly amount: WeeklyUnitReportAmount,
        readonly reference: WeeklyUnitReportReference,
        readonly productionModule: WeeklyUnitReportProductionModuleId,
        readonly productionOrderType: WeeklyUnitReportProductionOrderType,
        readonly week: WeeklyUnitReportWeek,
        readonly year: WeeklyUnitReportYear
    ) { }

    static create(
        id: WeeklyUnitReportId,
        amount: WeeklyUnitReportAmount,
        reference: WeeklyUnitReportReference,
        productionModule: WeeklyUnitReportProductionModuleId,
        productionOrderType: WeeklyUnitReportProductionOrderType,
        week: WeeklyUnitReportWeek,
        year: WeeklyUnitReportYear
    ): WeeklyUnitReportByProductionModule {
        return new WeeklyUnitReportByProductionModule(id, amount, reference,productionModule, productionOrderType, week, year)
    }

    static fromPrimitives(data: WeeklyUnitReportByProductionModuleDTO): WeeklyUnitReportByProductionModule {
        return new WeeklyUnitReportByProductionModule(
            new WeeklyUnitReportId(data.id),
            new WeeklyUnitReportAmount(data.amount),
            new WeeklyUnitReportReference(data.reference),
            new WeeklyUnitReportProductionModuleId(data.productionModule),
            new WeeklyUnitReportProductionOrderType(data.productionOrderType),
            new WeeklyUnitReportWeek(data.week),
            new WeeklyUnitReportYear(data.year)
        )
    }

    toPrimitives(): WeeklyUnitReportByProductionModuleDTO {
        return new WeeklyUnitReportByProductionModuleDTO(
            this.id.value,
            this.amount.value,
            this.reference.value,
            this.productionModule.value,
            this.productionOrderType.value,
            this.week.value,
            this.year.value
        )
    }
}