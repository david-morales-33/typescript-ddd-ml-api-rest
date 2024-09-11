import { ProductionOrderId } from "../../../../shared/domain/value-objects/ProductionOrderId";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
import { UserPermissionState } from "../../../../UserPermission/domain/value-objects/UserPermissionState";

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