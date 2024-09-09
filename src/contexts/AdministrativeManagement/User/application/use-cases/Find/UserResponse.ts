import { Response } from "../../../../../Shared/domain/design-patterns/CQRS/Response";
import { AuthUserViewDTO } from "../../../domain/data-transfer-objects/AuthUserViewDTO";

export class UserResponse extends AuthUserViewDTO implements Response { }