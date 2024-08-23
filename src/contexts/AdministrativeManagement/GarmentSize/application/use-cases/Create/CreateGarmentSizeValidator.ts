import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
import { GarmentSizeRepository } from "../../../domain/repositories/GarmentSizeRepository";
import { GarmentSizeId } from "../../../domain/value-objects/GarmentSizeId";
import { GarmentSIzeAlreadyExists } from "../../exceptions/GarmentSIzeAlreadyExists";


export class CreateGarmentSizeValidator {
    constructor (
        private garmentSizeRepository : GarmentSizeRepository,
        private userPermissionsRepository: UserPermissionRepository,
    ){}

    async execute(params:{createBy: UserId, garmentSizeId: GarmentSizeId}){

        const { createBy, garmentSizeId }=params;

        const eventPermission = UserPermission.create(
            new UserPermissionId(12),
            new UserPermissionLabel('Agregar Talla')
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: createBy,
            useCasePermission: eventPermission
        });

        const garmentSize = await this.garmentSizeRepository.find(garmentSizeId);

        if(garmentSize!==null)
            throw new GarmentSIzeAlreadyExists(garmentSizeId);
        
    }
}