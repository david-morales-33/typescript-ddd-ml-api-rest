import { DailyUnitReportOnProductionModuleDTO } from '../../../DailyUnitReport/domain/data-transfer-objects/DailyUnitReportOnProductionModuleDTO'
import { WeeklyUnitReportByProductionModuleDTO } from '../../../WeeklyUnitReport/domain/data-transfer-objects/WeeklyUnitReportByProductionModuleDTO'
import { MonthlyUnitReportByProductionModuleDTO } from '../../../MonthlyUnitReport/domain/data-transfer-objects/MonthlyUnitReportByProductionModuleDTO'
import { AnnualUnitReportByProductionModuleDTO } from '../../../AnnualUnitReport/domain/data-transfer-objects/AnnualUnitReportByProductionModuleDTO'

export class ProductionModuleReportDTO {
    constructor(
        readonly id: string,
        readonly reference: string,
        readonly productionModule: number,
        readonly dailyUnitReport: DailyUnitReportOnProductionModuleDTO,
        readonly weeklyUnitReport: WeeklyUnitReportByProductionModuleDTO,
        readonly monthlyUnitReport: MonthlyUnitReportByProductionModuleDTO,
        readonly annualUnitReport: AnnualUnitReportByProductionModuleDTO
    ) { }
}