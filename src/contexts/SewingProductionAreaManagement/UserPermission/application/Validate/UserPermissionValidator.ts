import { UserId } from "../../../User/domain/value-objects/UserId";
import { UserPermission } from "../../domain/entities/UserPermission";
import { UserPermissionService } from "../../domain/interfaces/UserPermissionService";
import { UserPermissionRepository } from "../../domain/repositories/UserPermissionRepository";


export class UserPermissionValidator implements UserPermissionService {

    constructor(private userPermissionRepository: UserPermissionRepository) { }

    async validateUserPermissions(data: { userId: UserId, useCasePermission: UserPermission }): Promise<void> {

        const userPermissions = await this.userPermissionRepository.searchAll(data.userId);

        if (userPermissions.length === 0)
            throw new Error(`The user <${data.userId.value}> does not have permissions`);

        const userPermissionFinded = userPermissions.find(value => value.id.value === data.useCasePermission.id.value);

        if (userPermissionFinded === undefined)
            throw new Error(`Unauthorized user <${data.userId.value}>`);

        if (data.useCasePermission.isUserPermissionValid(userPermissionFinded))
            throw new Error(`User permission not valid`);

    }
}