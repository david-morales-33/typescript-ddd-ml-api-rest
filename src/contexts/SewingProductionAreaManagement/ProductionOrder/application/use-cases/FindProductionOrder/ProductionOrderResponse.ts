import { Response } from "../../../../Shared/domain/design-patterns/CQRS/Response";
import { ProductionOrderViewDTO } from "../../data-transfer-objects/ProductionOrderViewDTO";

export class ProductionOrderResponse extends ProductionOrderViewDTO implements Response{}