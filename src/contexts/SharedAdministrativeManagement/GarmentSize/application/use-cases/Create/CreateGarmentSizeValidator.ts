import { UserPermissionValidator } from "../../../../../Shared/application/Validate/UserPermissionValidator";
import { UserPermissionRepository } from "../../../../../Shared/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../../Shared/domain/value-object/UserPermissionId";
import { UserPermissionLabel } from "../../../../../Shared/domain/value-object/UserPermissionLabel";
import { UserPermissionState } from "../../../../../Shared/domain/value-object/UserPermissionState";
import { GarmentSize as GarmentSizeId } from "../../../../../Shared/domain/value-object/GarmentSize";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { GarmentSizeQueryRepository } from "../../../domain/repositories/GarmentSizeQueryRepository";
import { GarmentSIzeAlreadyExists } from "../../exceptions/GarmentSIzeAlreadyExists";
import { UserPermission } from "../../../../../Shared/domain/entities/UserPermission";

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