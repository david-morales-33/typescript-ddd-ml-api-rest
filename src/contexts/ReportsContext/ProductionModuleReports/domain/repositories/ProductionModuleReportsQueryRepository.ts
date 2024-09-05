import { ProductionModuleReportDTO } from '../data-transfer-objects/ProductionModuleReportDTO';
import { ProductionModuleReportId } from '../../domain/value-objects/ProductionModuleReportId'
import { ProductionModuleReportModuleId } from '../../domain/value-objects/ProductionModuleReportModuleId';

export interface ProductionModuleReportsQueryRepository {
    find(productionModuleReportId: ProductionModuleReportId): Promise<ProductionModuleReportDTO | null>;
    searchAll(productionModuleReportModuleId: ProductionModuleReportModuleId): Promise<ProductionModuleReportDTO[]>;
}