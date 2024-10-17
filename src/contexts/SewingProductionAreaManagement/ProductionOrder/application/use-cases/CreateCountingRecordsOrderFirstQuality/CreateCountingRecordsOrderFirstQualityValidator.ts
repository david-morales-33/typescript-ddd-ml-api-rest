import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionModuleQueryRepository } from "../../../../ProductionModule/domain/repositories/ProductionModuleQueryRepository";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserPermissionRepository } from "../../../../../Shared/domain/repositories/UserPermissionRepository";
import { UserPermission } from "../../../../../Shared/domain/entities/UserPermission";
import { UserPermissionId } from "../../../../../Shared/domain/value-object/UserPermissionId";
import { UserPermissionLabel } from "../../../../../Shared/domain/value-object/UserPermissionLabel";
import { UserPermissionValidator } from "../../../../../Shared/application/Validate/UserPermissionValidator";

export class CreateCountingRecordsOrderFirstQualityValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
        private productionModuleQueryRepository: ProductionModuleQueryRepository,
    ) { }

    async execute(params: {
        userId: UserId,
        productionModuleId: ProductionModuleId,
    }) {

        const { userId, productionModuleId} = params;

        const eventPermission = UserPermission.create(
            new UserPermissionId(16),
            new UserPermissionLabel('Crear OCR')
        );

        const userPermissionValidation = new UserPermissionValidator(this.userPermissionsRepository);

        await userPermissionValidation.execute({
            userId: userId,
            useCasePermission: eventPermission
        });

        const productionModuleFounded = await this.productionModuleQueryRepository.find(productionModuleId);

        if (productionModuleFounded === null || productionModuleFounded === undefined)
            throw new Error('El modulo solicitado no existe');

    }
}