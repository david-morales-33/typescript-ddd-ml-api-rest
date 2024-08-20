import { Response } from "../../../../../Shared/domain/design-patterns/CQRS/Response";
import { CommonUserViewDTO } from "../../data-transfer-objects/CommonUserViewDTO";

export class CommonUserResponse extends CommonUserViewDTO implements Response { }