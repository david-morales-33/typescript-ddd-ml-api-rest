import { UserPermissionValidator } from "../../../../../AdministrativeManagement/UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../../AdministrativeManagement/UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../../AdministrativeManagement/UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../../AdministrativeManagement/UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../../AdministrativeManagement/UserPermission/domain/value-objects/UserPermissionLabel";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class UpdateGarmentSizeValidator {
    constructor (
        private userPermissionsRepository: UserPermissionRepository,
    ){}

    async execute(createBy: UserId){

        const eventPermission = UserPermission.create(
            new UserPermissionId(12),
            new UserPermissionLabel('Agregar Talla')
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: createBy,
            useCasePermission: eventPermission
        });
        
    }
}