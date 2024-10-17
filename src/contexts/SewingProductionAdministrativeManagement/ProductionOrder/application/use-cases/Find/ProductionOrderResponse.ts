import { Response } from "../../../../../Shared/domain/CQRS/Response";
import { ProductionOrderViewDTO } from "../../../domain/data-transfer-objects/ProductionOrderViewDTO";

export class ProductionOrderResponse extends ProductionOrderViewDTO implements Response { }