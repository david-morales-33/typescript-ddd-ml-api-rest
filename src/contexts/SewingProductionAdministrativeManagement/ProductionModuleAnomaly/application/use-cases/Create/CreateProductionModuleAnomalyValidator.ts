import { UserPermissionValidator } from "../../../../../Shared/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../../Shared/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../../Shared/domain/repositories/UserPermissionRepository";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { UserPermissionId } from "../../../../../Shared/domain/value-object/UserPermissionId";
import { UserPermissionLabel } from "../../../../../Shared/domain/value-object/UserPermissionLabel";
import { ProductionModuleAnomalyQueryRepository } from "../../../domain/repositories/ProductionModuleAnomalyQueryRepository";
import { ProductionModuleAnomalyId } from "../../../domain/value-objects/ProductionModuleAnomalyId";

export class CreateProductionModuleAnomalyValidator {
    constructor(
        private productionModuleAnomalyQueryRepository: ProductionModuleAnomalyQueryRepository,
        private userPermissionsRepository: UserPermissionRepository,
    ) { }
    async execute(params: { createBy: UserId, productionModuleAnomalyId: ProductionModuleAnomalyId }) {
        const { createBy, productionModuleAnomalyId } = params;

        const productionModuleAnomaly = await this.productionModuleAnomalyQueryRepository.find(productionModuleAnomalyId)
        if (productionModuleAnomaly !== null)
            throw new Error(`The Production Module Anomaly <${productionModuleAnomalyId.value}> already exists`);

        const eventPermission = UserPermission.create(
            new UserPermissionId(35),
            new UserPermissionLabel('Agregar nueva anormalidad de módulo')
        );
        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: createBy,
            useCasePermission: eventPermission
        });
    }
}