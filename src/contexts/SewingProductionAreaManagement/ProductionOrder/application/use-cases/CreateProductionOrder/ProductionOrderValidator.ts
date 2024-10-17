import { UserPermissionValidator } from "../../../../../Shared/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../../Shared/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../../Shared/domain/repositories/UserPermissionRepository";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserPermissionId } from "../../../../../Shared/domain/value-object/UserPermissionId";
import { UserPermissionLabel } from "../../../../../Shared/domain/value-object/UserPermissionLabel";

export class ProductionOrderValidator {

    constructor(
        private userPermissionsRepository: UserPermissionRepository,
    ) { }

    async execute(openByUser: UserId) {

        const eventPermission = UserPermission.create(
            new UserPermissionId(21),
            new UserPermissionLabel('Abrir OP')
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);

        await userPermissionValidator.execute({
            userId: openByUser,
            useCasePermission: eventPermission
        });

    }
}