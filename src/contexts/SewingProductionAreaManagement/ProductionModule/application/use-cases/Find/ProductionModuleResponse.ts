import { Response } from "../../../../Shared/domain/design-patterns/CQRS/Response";
import { ProductionModuleViewDTO } from "../../data-transfer-objects/ProductionModuleViewDTO";

export class ProductionModuleResponse extends ProductionModuleViewDTO implements Response { }