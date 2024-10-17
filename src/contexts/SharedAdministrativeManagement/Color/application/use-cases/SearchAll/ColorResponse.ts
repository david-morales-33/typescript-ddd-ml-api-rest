import { Response } from "../../../../../Shared/domain/CQRS/Response";
import { ColorViewDTO } from "../../../domain/data-transfer-objects/ColorViewDTO";

export class ColorResponse extends ColorViewDTO implements Response { }