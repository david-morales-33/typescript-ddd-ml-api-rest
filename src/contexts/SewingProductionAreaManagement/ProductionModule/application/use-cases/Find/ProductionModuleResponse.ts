import { Response } from "../../../../../Shared/domain/CQRS/Response";
import { ProductionModuleViewDTO } from "../../../domain/data-transfer-object/ProductionModuleViewDTO";

export class ProductionModuleResponse extends ProductionModuleViewDTO implements Response { }