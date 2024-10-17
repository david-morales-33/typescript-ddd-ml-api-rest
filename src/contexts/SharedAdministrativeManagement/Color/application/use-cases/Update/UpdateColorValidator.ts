import { UserPermissionValidator } from "../../../../../Shared/application/Validate/UserPermissionValidator";
import { UserPermissionRepository } from "../../../../../Shared/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../../Shared/domain/value-object/UserPermissionId";
import { UserPermissionLabel } from "../../../../../Shared/domain/value-object/UserPermissionLabel";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserPermission } from "../../../../../Shared/domain/entities/UserPermission";


export class UpdateColorValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
    ) { }

    async execute(createBy: UserId) {

        const eventPermission = UserPermission.create(
            new UserPermissionId(0),
            new UserPermissionLabel('Editar propiedades de color')
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: createBy,
            useCasePermission: eventPermission
        });

    }
}