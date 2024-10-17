import { Response } from "../../../../../Shared/domain/CQRS/Response";
import { GarmentSizeViewDTO } from "../../../domain/data-transfer-objects/GarmentSizeViewDTO";

export class GarmentSizeReponse extends GarmentSizeViewDTO implements Response { }