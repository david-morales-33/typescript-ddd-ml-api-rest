import { UserPermissionValidator } from "../../../../../Shared/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../../Shared/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../../Shared/domain/repositories/UserPermissionRepository";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserPermissionId } from "../../../../../Shared/domain/value-object/UserPermissionId";
import { UserPermissionLabel } from "../../../../../Shared/domain/value-object/UserPermissionLabel";
import { ProductionModuleQueryRepository } from "../../../domain/repositories/ProductionModuleQuerydRepository";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleNotFoundException } from "../../exceptions/ProductionModuleNotFoundException";

export class UpdateProductionModuleValidator {
    constructor(
        private productionModuleRepository: ProductionModuleQueryRepository,
        private userPermissionsRepository: UserPermissionRepository
    ) { }
    async execute(params: {
        updateBy: UserId,
        productionModuleId: ProductionModuleId
    }) {
        const { productionModuleId, updateBy } = params;

        const eventPermission = UserPermission.create(
            new UserPermissionId(8),
            new UserPermissionLabel('Editar Módulo')
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: updateBy,
            useCasePermission: eventPermission
        });

        const productionModule = await this.productionModuleRepository.find(productionModuleId);

        if (productionModule === null)
            throw new ProductionModuleNotFoundException(productionModuleId)
    }
}