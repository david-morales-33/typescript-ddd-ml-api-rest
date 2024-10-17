import { Response } from "../../../../../Shared/domain/design-patterns/CQRS/Response";
import { ProductionModuleAnomalyViewDTO } from "../../../domain/data-transfer-objects/ProductionModuleAnomalyViewDTO";

export class ProductionModuleAnomalyResponse extends ProductionModuleAnomalyViewDTO implements Response{ }