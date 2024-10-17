import { Response } from "../../../../../Shared/domain/CQRS/Response";
import { ProductionModuleAnomalyViewDTO } from "../../../domain/data-transfer-objects/ProductionModuleAnomalyViewDTO";

export class ProductionModuleAnomalyResponse extends ProductionModuleAnomalyViewDTO implements Response{ }