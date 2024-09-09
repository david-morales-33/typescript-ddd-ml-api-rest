import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
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
            new UserPermissionId(0),
            new UserPermissionLabel('')
        );
        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: createBy,
            useCasePermission: eventPermission
        });
    }
}