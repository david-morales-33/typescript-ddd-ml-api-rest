import { UserPermissionValidator } from "../../../../../AdministrativeManagement/UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../../AdministrativeManagement/UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../../AdministrativeManagement/UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../../AdministrativeManagement/UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../../AdministrativeManagement/UserPermission/domain/value-objects/UserPermissionLabel";
import { UserPermissionState } from "../../../../../AdministrativeManagement/UserPermission/domain/value-objects/UserPermissionState";
import { GarmentSizeId } from "../../../../../Shared/domain/value-object/GarmentSizeId";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { GarmentSizeQueryRepository } from "../../../domain/repositories/GarmentSizeQueryRepository";
import { GarmentSIzeAlreadyExists } from "../../exceptions/GarmentSIzeAlreadyExists";

export class CreateGarmentSizeValidator {
    constructor(
        private garmentSizeRepository: GarmentSizeQueryRepository,
        private userPermissionsRepository: UserPermissionRepository,
    ) { }

    async execute(params: { createBy: UserId, garmentSizeId: GarmentSizeId }) {

        const { createBy, garmentSizeId } = params;

        const eventPermission = UserPermission.create(
            new UserPermissionId(12),
            new UserPermissionLabel('Agregar Talla'),
            new UserPermissionState(true)
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: createBy,
            useCasePermission: eventPermission
        });

        const garmentSize = await this.garmentSizeRepository.find(garmentSizeId);

        if (garmentSize !== null)
            throw new GarmentSIzeAlreadyExists(garmentSizeId);

    }
}