import { Response } from "../../../../Shared/domain/design-patterns/CQRS/Response";
import { ProductionModuleViewDTO } from "../../../domain/data-transfer-object/ProductionModuleViewDTO";

export class SearchAllProductionModuleResponse extends ProductionModuleViewDTO implements Response { }