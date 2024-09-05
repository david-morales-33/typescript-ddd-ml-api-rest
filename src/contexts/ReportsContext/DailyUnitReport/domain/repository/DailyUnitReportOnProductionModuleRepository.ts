import { DailyUnitReportOnProductionModule } from '../entities/DailyUnitReportOnProductionModule';
import { DailyUnitReportProductionModuleId } from '../value-objects/DailyUnitReportProductionModuleId';
import { DailyUnitReportReference } from '../value-objects/DailyUnitReportReference';

export interface DailyUnitReportOnProductionModuleRepository {
    match(
        productionModule: DailyUnitReportProductionModuleId,
        reference: DailyUnitReportReference): Promise<DailyUnitReportOnProductionModule>;
}