import { UserId } from "../../../User/domain/value-objects/UserId";
import { UserPermission } from "../../domain/entities/UserPermission";
import { UnauthorizedUserAccessException } from "../exceptions/UnauthorizedUserAccessException";
import { UserDoesNotHavePermissionException } from "../exceptions/UserDoesNotHavePermissionException";
import { UserPermissionRepository } from "../../domain/repositories/UserPermissionRepository";

export class UserPermissionValidator {

    constructor(private userPermissionRepository: UserPermissionRepository) { }

    async execute(data: { userId: UserId, useCasePermission: UserPermission }): Promise<void> {

        const userPermissions = await this.userPermissionRepository.searchAll(data.userId);

        if (userPermissions.length === 0)
            throw new UserDoesNotHavePermissionException(data.userId);

        const userPermissionFinded = userPermissions.find(value => value.id.value === data.useCasePermission.id.value);

        if (userPermissionFinded === undefined)
            throw new UnauthorizedUserAccessException(data.userId);

        data.useCasePermission.isUserPermissionValid(userPermissionFinded)
    }
}