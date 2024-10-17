import { Response } from "../../../../../Shared/domain/CQRS/Response";
import { AuthUserViewDTO } from "../../../domain/data-transfer-objects/AuthUserViewDTO";

export class UserResponse extends AuthUserViewDTO implements Response { }