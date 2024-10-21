import { DailyUnitReport } from "../entities/DailyUnitReport";

export interface DailyUnitReportRepository {
    match(criteria: any): Promise<DailyUnitReport>;
}