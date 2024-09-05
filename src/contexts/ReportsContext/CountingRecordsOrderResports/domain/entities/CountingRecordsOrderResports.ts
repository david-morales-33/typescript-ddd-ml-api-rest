import { CountingRecordsOrderResportsRoot } from '../interfaces/CountingRecordsOrderResportsRoot';
import { DailyUnitReport } from '../../../DailyUnitReport/domain/entities/DailyUnitReport'
import { WeeklyUnitReport } from '../../../WeeklyUnitReport/domain/enties/WeeklyUnitReport'
import { MonthlyUnitReport } from '../../../MonthlyUnitReport/domain/entities/MonthlyUnitReport';
import { AnnualUnitReport } from '../../../AnnualUnitReport/domain/entities/AnnualUnitReport';
import { CountingRecordsOrderReportsId } from '../value-objects/CountingRecordsOrderReportsId'

export class CountingRecordsOrderResports implements CountingRecordsOrderResportsRoot {
    constructor(
        readonly id: CountingRecordsOrderReportsId,
        readonly dailyUnitReport: DailyUnitReport,
        readonly weeklyUnitReport: WeeklyUnitReport,
        readonly monthlyUnitReport: MonthlyUnitReport,
        readonly annualUnitReport: AnnualUnitReport
    ) { }

    toPrimitives() {

    }
}