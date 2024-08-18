import { Response } from "../../../../Shared/domain/design-patterns/CQRS/Response";
import { ProductionModuleViewDTO } from "../../data-transfer-objects/ProductionModuleViewDTO";

export class SearchAllProductionModuleResponse extends ProductionModuleViewDTO implements Response { }