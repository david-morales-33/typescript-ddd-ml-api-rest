import { Response } from "../../../../../Shared/domain/design-patterns/CQRS/Response";
import { GarmentSizeViewDTO } from "../../data-transfer-objects/GarmentSizeViewDTO";

export class GarmentSizeReponse extends GarmentSizeViewDTO implements Response { }