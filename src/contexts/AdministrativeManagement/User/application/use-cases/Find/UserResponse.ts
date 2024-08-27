import { Response } from "../../../../../Shared/domain/design-patterns/CQRS/Response";
import { UserViewDTO } from "../../data-transfer-objects/UserViewDTO";

export class UserResponse extends UserViewDTO implements Response { }