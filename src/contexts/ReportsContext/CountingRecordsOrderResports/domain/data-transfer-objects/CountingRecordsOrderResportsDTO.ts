import { DailyUnitReportDTO } from '../../../DailyUnitReport/domain/data-transfer-objects/DailyUnitReportDTO'
import { WeeklyUnitReportDTO } from '../../../WeeklyUnitReport/domain/data-transfer-objects/WeeklyUnitReportDTO'
import { MonthlyUnitReportDTO } from '../../../MonthlyUnitReport/domain/data-transfer-objects/MonthlyUnitReportDTO'
import { AnnualUnitReportDTO } from '../../../AnnualUnitReport/domain/data-transfer-objects/AnnualUnitReportDTO'

export class CountingRecordsOrderResportsDTO {
    constructor(
        readonly id: string,
        readonly reference: string,
        readonly productionOrderType: string,
        readonly dailyUnitReport: DailyUnitReportDTO,
        readonly weeklyUnitReport: WeeklyUnitReportDTO,
        readonly monthlyUnitReport: MonthlyUnitReportDTO,
        readonly annualUnitReport: AnnualUnitReportDTO
    ) { }
}