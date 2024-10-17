import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionModuleQueryRepository } from "../../../../ProductionModule/domain/repositories/ProductionModuleQueryRepository";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class CreateCountingRecordsOrderSecondQualityValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
        private productionModuleQueryRepository: ProductionModuleQueryRepository,
    ) { }

    async execute(params: {
        userId: UserId,
        productionModuleId: ProductionModuleId,
    }) {

        const { userId, productionModuleId } = params;

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