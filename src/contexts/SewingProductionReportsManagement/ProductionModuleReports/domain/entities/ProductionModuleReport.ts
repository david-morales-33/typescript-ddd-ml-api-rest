import { ProductionModuleReportRoot } from '../interfaces/ProductionModuleReportRoot';
import { DailyUnitReportOnProductionModule } from '../../../DailyUnitReport/domain/entities/DailyUnitReportOnProductionModule'
import { WeeklyUnitReportByProductionModule } from '../../../WeeklyUnitReport/domain/enties/WeeklyUnitReportByProductionModule'
import { MonthlyUnitReportByProductionModule } from '../../../MonthlyUnitReport/domain/entities/MonthlyUnitReportByProductionModule';
import { AnnualUnitReportByProductionModule } from '../../../AnnualUnitReport/domain/entities/AnnualUnitReportByProductionModule';
import { ProductionModuleReportReference } from '../value-objects/ProductionModuleReportReference';
import { ProductionModuleReportModuleId } from '../value-objects/ProductionModuleReportModuleId';
import { ProductionModuleReportId } from '../value-objects/ProductionModuleReportId';
import { ProductionModuleReportDTO } from '../data-transfer-objects/ProductionModuleReportDTO';

export class ProductionModuleReport implements ProductionModuleReportRoot {
    constructor(
        readonly id: ProductionModuleReportId,
        readonly Reference: ProductionModuleReportReference,
        readonly productionModule: ProductionModuleReportModuleId,
        readonly dailyUnitReport: DailyUnitReportOnProductionModule,
        readonly weeklyUnitReport: WeeklyUnitReportByProductionModule,
        readonly monthlyUnitReport: MonthlyUnitReportByProductionModule,
        readonly annualUnitReport: AnnualUnitReportByProductionModule
    ) { }

    static create(
        id: ProductionModuleReportId,
        Reference: ProductionModuleReportReference,
        productionModule: ProductionModuleReportModuleId,
        dailyUnitReport: DailyUnitReportOnProductionModule,
        weeklyUnitReport: WeeklyUnitReportByProductionModule,
        monthlyUnitReport: MonthlyUnitReportByProductionModule,
        annualUnitReport: AnnualUnitReportByProductionModule
    ) {
        return new ProductionModuleReport(
            id,
            Reference,
            productionModule,
            dailyUnitReport,
            weeklyUnitReport,
            monthlyUnitReport,
            annualUnitReport
        )
    }

    static fromPrimitives(data: ProductionModuleReportDTO): ProductionModuleReport {
        return new ProductionModuleReport(
            new ProductionModuleReportId(
                new ProductionModuleReportReference(data.reference),
                new ProductionModuleReportModuleId(data.productionModule)
            ),
            new ProductionModuleReportReference(data.reference),
            new ProductionModuleReportModuleId(data.productionModule),
            DailyUnitReportOnProductionModule.fromPrimitives(data.dailyUnitReport),
            WeeklyUnitReportByProductionModule.fromPrimitives(data.weeklyUnitReport),
            MonthlyUnitReportByProductionModule.fromPrimitives(data.monthlyUnitReport),
            AnnualUnitReportByProductionModule.fromPrimitives(data.annualUnitReport)
        )
    }

    toPrimitives(): ProductionModuleReportDTO {
        return new ProductionModuleReportDTO(
            this.id.getProductionModuleReportId(),
            this.Reference.value,
            this.productionModule.value,
            this.dailyUnitReport.toPrimitives(),
            this.weeklyUnitReport.toPrimitives(),
            this.monthlyUnitReport.toPrimitives(),
            this.annualUnitReport.toPrimitives()
        )
    }
}