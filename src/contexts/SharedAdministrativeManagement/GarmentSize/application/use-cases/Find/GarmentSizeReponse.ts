import { Response } from "../../../../../Shared/domain/design-patterns/CQRS/Response";
import { GarmentSizeViewDTO } from "../../../domain/data-transfer-objects/GarmentSizeViewDTO";

export class GarmentSizeReponse extends GarmentSizeViewDTO implements Response { }