import { Response } from '../../../../../Shared/domain/CQRS/Response';
import { ProductionModuleReportDTO } from '../../../domain/data-transfer-objects/ProductionModuleReportDTO';

export class ProductionModuleReportsSearcherResponse extends ProductionModuleReportDTO implements Response { }