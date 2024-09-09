import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
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