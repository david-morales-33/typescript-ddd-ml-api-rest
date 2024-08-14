import { UserRepository } from "../../../../../SewingProductionAreaManagement/User/domain/repositories/UserRepository";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
import { CommonUserRepository } from "../../../domain/repositories/CommonUserRepository";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserNotFoundException } from "../../exceptions/UserNotFoundException";

export class UpdateUserValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
        private commonUserRepository: CommonUserRepository
    ) { }

    async execute(userId: UserId) {

        const eventPermission = UserPermission.create(
            new UserPermissionId(5),
            new UserPermissionLabel('Editar Cuenta')
        );

        const userFinded = await this.commonUserRepository.find(userId);

        if (userFinded !== null || userFinded !== undefined)
            throw new UserNotFoundException(userId);

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: userId,
            useCasePermission: eventPermission
        });
    }
}