import { MonthlyUnitReportRoot } from "../interface/MonthlyUnitReportRoot";
import { MonthilyUnitReportMonth } from '../value-objects/MonthilyUnitReportMonth';
import { MonthlyUnitReportId } from '../value-objects/MonthlyUnitReportId';
import { MonthlyUnitReportAmount } from '../value-objects/MonthlyUnitReportAmount';
import { MonthlyUnitReportYear } from '../value-objects/MonthlyUnitReportYear';
import { MonthlyUnitsReportProductionOrderType } from '../value-objects/MonthlyUnitsReportProductionOrderType';
import { MonthilyUnitReportReference } from '../value-objects/MonthilyUnitReportReference';
import { MonthlyUnitReportProductionModule } from '../value-objects/MonthlyUnitReportProductionModule';
import { MonthlyUnitReportByProductionModuleDTO } from '../data-transfer-objects/MonthlyUnitReportByProductionModuleDTO';

export class MonthlyUnitReportByProductionModule implements MonthlyUnitReportRoot {
    constructor(
        readonly id: MonthlyUnitReportId,
        readonly amount: MonthlyUnitReportAmount,
        readonly reference: MonthilyUnitReportReference,
        readonly productionModule: MonthlyUnitReportProductionModule,
        readonly productionOrderType: MonthlyUnitsReportProductionOrderType,
        readonly month: MonthilyUnitReportMonth,
        readonly year: MonthlyUnitReportYear
    ) { }

    static create(
        id: MonthlyUnitReportId,
        amount: MonthlyUnitReportAmount,
        reference: MonthilyUnitReportReference,
        productionModule: MonthlyUnitReportProductionModule,
        productionOrderType: MonthlyUnitsReportProductionOrderType,
        month: MonthilyUnitReportMonth,
        year: MonthlyUnitReportYear
    ): MonthlyUnitReportByProductionModule {
        return new MonthlyUnitReportByProductionModule(id, amount, reference, productionModule, productionOrderType, month, year)
    }

    static fromPrimitives(data: MonthlyUnitReportByProductionModuleDTO): MonthlyUnitReportByProductionModule {
        return new MonthlyUnitReportByProductionModule(
            new MonthlyUnitReportId(data.id),
            new MonthlyUnitReportAmount(data.amount),
            new MonthilyUnitReportReference(data.reference),
            new MonthlyUnitReportProductionModule(data.productionModule),
            new MonthlyUnitsReportProductionOrderType(data.productionOrderType),
            new MonthilyUnitReportMonth(data.month),
            new MonthlyUnitReportYear(data.year)
        )
    }

    toPrimitives(): MonthlyUnitReportByProductionModuleDTO {
        return new MonthlyUnitReportByProductionModuleDTO(
            this.id.value,
            this.amount.value,
            this.reference.value,
            this.productionModule.value,
            this.productionOrderType.value,
            this.month.value,
            this.year.value
        )
    }
}