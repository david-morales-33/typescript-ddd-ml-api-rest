import { Response } from "../../../../Shared/domain/design-patterns/CQRS/Response";
import { ProductionOrderDetailViewDTO } from "../../../domain/data-transfer-objects/ProductionOrderDetailViewDTO";

export class ProductionOrderDetailResponse extends ProductionOrderDetailViewDTO implements Response { }