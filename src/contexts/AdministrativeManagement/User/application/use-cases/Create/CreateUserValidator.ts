import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
import { UserAdminQueryRepository } from "../../../domain/repositories/UserAdminQueryRepository";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserAlreadyExistException } from "../../exceptions/UserAlreadyExistException";

export class CreateUserValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
        private userRepository: UserAdminQueryRepository
    ) { }

    async execute(params : {createBy: UserId, userId: UserId}) {

        const { createBy, userId } = params;

        const eventPermission = UserPermission.create(
            new UserPermissionId(4),
            new UserPermissionLabel('Crear Cuenta')
        );

        const userFinded = await this.userRepository.find(userId);
        if (userFinded !== null || userFinded !== undefined)
            throw new UserAlreadyExistException(userId.value)

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: createBy,
            useCasePermission: eventPermission
        });
    }
}