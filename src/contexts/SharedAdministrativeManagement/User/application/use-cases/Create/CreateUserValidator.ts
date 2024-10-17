import { UserPermissionValidator } from "../../../../../Shared/application/Validate/UserPermissionValidator";
import { UserPermissionRepository } from "../../../../../Shared/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../../Shared/domain/value-object/UserPermissionId";
import { UserPermissionLabel } from "../../../../../Shared/domain/value-object/UserPermissionLabel";
import { UserPermissionState } from "../../../../../Shared/domain/value-object/UserPermissionState";
import { UserAdminQueryRepository } from "../../../domain/repositories/UserAdminQueryRepository";
import { UserAlreadyExistException } from "../../../../../Shared/domain/exceptions/UserAlreadyExistException";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserPermission } from "../../../../../Shared/domain/entities/UserPermission";

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