import { UserPermissionValidator } from "../../../../AdministrativeManagement/UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../AdministrativeManagement/UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../AdministrativeManagement/UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../AdministrativeManagement/UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../AdministrativeManagement/UserPermission/domain/value-objects/UserPermissionLabel";
import { UserPermissionState } from "../../../../AdministrativeManagement/UserPermission/domain/value-objects/UserPermissionState";
import { UserAdminQueryRepository } from "../../../../AdministrativeManagement/User/domain/repositories/UserAdminQueryRepository";
import { UserAlreadyExistException } from "../../../../Shared/domain/exceptions/UserAlreadyExistException";
import { UserId } from "../../../../Shared/domain/value-object/UserId";

export class CreateUserValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
        private userRepository: UserAdminQueryRepository
    ) { }

    async execute(params : {createBy: UserId, userId: UserId}) {

        const { createBy, userId } = params;

        const eventPermission = UserPermission.create(
            new UserPermissionId(4),
            new UserPermissionLabel('Crear Cuenta'),
            new UserPermissionState(true)
        );

        const userFinded = await this.userRepository.find(userId);
        if (userFinded !== null )
            throw new UserAlreadyExistException(userId)

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: createBy,
            useCasePermission: eventPermission
        });
    }
}