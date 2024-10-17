import { Response } from "../../../../../Shared/domain/CQRS/Response";
import { ProductionOrderDetailViewDTO } from "../../../domain/data-transfer-objects/ProductionOrderDetailViewDTO";

export class ProductionOrderDetailResponse extends ProductionOrderDetailViewDTO implements Response { }