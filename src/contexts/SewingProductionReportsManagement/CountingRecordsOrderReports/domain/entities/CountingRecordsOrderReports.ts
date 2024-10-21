import { CountingRecordsOrderReportsRoot } from '../interfaces/CountingRecordsOrderReportsRoot';
import { DailyUnitReport } from '../../../DailyUnitReport/domain/entities/DailyUnitReport'
import { WeeklyUnitReport } from '../../../WeeklyUnitReport/domain/enties/WeeklyUnitReport'
import { MonthlyUnitReport } from '../../../MonthlyUnitReport/domain/entities/MonthlyUnitReport';
import { AnnualUnitReport } from '../../../AnnualUnitReport/domain/entities/AnnualUnitReport';
import { CountingRecordsOrderReportsId } from '../value-objects/CountingRecordsOrderReportsId';
import { CountingRecordsOrderReportsDTO } from '../data-transfer-objects/CountingRecordsOrderReportsDTO';
import { CountingRecordsOrderReportsReference } from '../value-objects/CountingRecordsOrderReportsReference'
import { CountingRecordsOrderReportsProductionOrderType } from '../value-objects/CountingRecordsOrderReportsType';

export class CountingRecordsOrderReports implements CountingRecordsOrderReportsRoot {
    constructor(
        readonly id: CountingRecordsOrderReportsId,
        readonly Reference: CountingRecordsOrderReportsReference,
        readonly ProductionOrderType: CountingRecordsOrderReportsProductionOrderType,
        readonly dailyUnitReport: DailyUnitReport,
        readonly weeklyUnitReport: WeeklyUnitReport,
        readonly monthlyUnitReport: MonthlyUnitReport,
        readonly annualUnitReport: AnnualUnitReport
    ) { }

    static create(
        id: CountingRecordsOrderReportsId,
        Reference: CountingRecordsOrderReportsReference,
        ProductionOrderType: CountingRecordsOrderReportsProductionOrderType,
        dailyUnitReport: DailyUnitReport,
        weeklyUnitReport: WeeklyUnitReport,
        monthlyUnitReport: MonthlyUnitReport,
        annualUnitReport: AnnualUnitReport
    ): CountingRecordsOrderReports {
        return new CountingRecordsOrderReports(
            id,
            Reference,
            ProductionOrderType,
            dailyUnitReport,
            weeklyUnitReport,
            monthlyUnitReport,
            annualUnitReport
        )
    }

    static fromPrimitives(data: CountingRecordsOrderReportsDTO): CountingRecordsOrderReports {
        return new CountingRecordsOrderReports(
            new CountingRecordsOrderReportsId(
                new CountingRecordsOrderReportsReference(data.reference),
                new CountingRecordsOrderReportsProductionOrderType(data.productionOrderType)
            ),
            new CountingRecordsOrderReportsReference(data.reference),
            new CountingRecordsOrderReportsProductionOrderType(data.productionOrderType),
            DailyUnitReport.fromPrimitives(data.dailyUnitReport),
            WeeklyUnitReport.fromPrimitives(data.weeklyUnitReport),
            MonthlyUnitReport.fromPrimitives(data.monthlyUnitReport),
            AnnualUnitReport.fromPrimitives(data.annualUnitReport)
        )
    }

    toPrimitives(): CountingRecordsOrderReportsDTO {
        return new CountingRecordsOrderReportsDTO(
            this.id.getCountingRecordsOrderReportsId(),
            this.Reference.value,
            this.ProductionOrderType.value,
            this.dailyUnitReport.toPrimitives(),
            this.weeklyUnitReport.toPrimitives(),
            this.monthlyUnitReport.toPrimitives(),
            this.annualUnitReport.toPrimitives()
        )
    }
}