import { UserPermissionValidator } from "../../../../../Shared/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../../Shared/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../../Shared/domain/repositories/UserPermissionRepository";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserPermissionId } from "../../../../../Shared/domain/value-object/UserPermissionId";
import { UserPermissionLabel } from "../../../../../Shared/domain/value-object/UserPermissionLabel";
import { UserPermissionState } from "../../../../../Shared/domain/value-object/UserPermissionState";

export class UpdateProductionOrderValidator {
    constructor(private userPermissionsRepository: UserPermissionRepository) { }

    async execute(updateBy: UserId) {

        const eventPermission = UserPermission.create(
            new UserPermissionId(24),
            new UserPermissionLabel('Editar OP'),
            new UserPermissionState(true)
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: updateBy,
            useCasePermission: eventPermission
        });
    }
}