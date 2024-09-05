import { DailyUnitReportRoot } from '../interfaces/DailyUnitReportRoot'
import { DailyUnitReportId } from '../value-objects/DailyUnitReportId'
import { DailyUnitReportAmount } from '../value-objects/DailyUnitReportAmount'
import { DailyUnitReportReference } from '../value-objects/DailyUnitReportReference'
import { DailyUnitReportProductionType } from '../value-objects/DailyUnitReportProductionType'
import { DailyUnitReportDay } from '../value-objects/DailyUnitReportDay'
import { DailyUnitReportYear } from '../value-objects/DailyUnitReportYear';
import { DailyUnitReportProductionModuleId } from '../value-objects/DailyUnitReportProductionModuleId';
import { DailyUnitReportOnProductionModuleDTO } from '../data-transfer-objects/DailyUnitReportOnProductionModuleDTO'

export class DailyUnitReportOnProductionModule implements DailyUnitReportRoot {
    constructor(
        readonly id: DailyUnitReportId,
        readonly amount: DailyUnitReportAmount,
        readonly reference: DailyUnitReportReference,
        readonly productionModule: DailyUnitReportProductionModuleId,
        readonly productionOrderType: DailyUnitReportProductionType,
        readonly day: DailyUnitReportDay,
        readonly year: DailyUnitReportYear
    ) { }

    static create(
        id: DailyUnitReportId,
        amount: DailyUnitReportAmount,
        reference: DailyUnitReportReference,
        productionModule: DailyUnitReportProductionModuleId,
        productionOrderType: DailyUnitReportProductionType,
        day: DailyUnitReportDay,
        year: DailyUnitReportYear
    ): DailyUnitReportOnProductionModule {
        return new DailyUnitReportOnProductionModule(id, amount, reference, productionModule, productionOrderType, day, year)
    }

    static fromPrimitives(data: DailyUnitReportOnProductionModuleDTO): DailyUnitReportOnProductionModule {
        return new DailyUnitReportOnProductionModule(
            new DailyUnitReportId(data.id),
            new DailyUnitReportAmount(data.amount),
            new DailyUnitReportReference(data.reference),
            new DailyUnitReportProductionModuleId(data.productionModule),
            new DailyUnitReportProductionType(data.productionOrderType),
            new DailyUnitReportDay(data.day),
            new DailyUnitReportYear(data.year)
        )
    }

    toPrimitives(): DailyUnitReportOnProductionModuleDTO{
        return new DailyUnitReportOnProductionModuleDTO(
            this.id.value,
            this.amount.value,
            this.reference.value,
            this.productionModule.value,
            this.productionOrderType.value,
            this.day.value,
            this.year.value
        )
    }
}