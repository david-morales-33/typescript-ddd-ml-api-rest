import { Response } from "../../../../../Shared/domain/design-patterns/CQRS/Response";
import { ColorViewDTO } from "../../data-transfer-objects/ColorViewDTO";

export class ColorResponse extends ColorViewDTO implements Response { }