import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
import { UserId } from "../../../domain/value-objects/UserId";

export class UpdateUserValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
    ) { }

    async execute(userId: UserId) {

        const eventPermission = UserPermission.create(
            new UserPermissionId(5),
            new UserPermissionLabel('Editar Cuenta')
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: userId,
            useCasePermission: eventPermission
        });
    }
}