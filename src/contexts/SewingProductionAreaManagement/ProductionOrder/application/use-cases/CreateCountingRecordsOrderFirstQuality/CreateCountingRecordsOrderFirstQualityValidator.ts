import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionModuleRepository } from "../../../../ProductionModule/domain/repositories/ProductionModuleRepository";
import { ProductionModuleEventRepository } from "../../../../ProductionModuleEvent/domain/repositories/ProductionModuleEventRepository";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { CountingRecordsOrderEventIdOnProductionModule } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule";

export class CreateCountingRecordsOrderFirstQualityValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
        private productionModuleRepository: ProductionModuleRepository,
        private productionModuleEventRepository: ProductionModuleEventRepository,
    ) { }

    async execute(params: {
        userId: UserId,
        productionModuleId: ProductionModuleId,
        productionModuleEventId?: CountingRecordsOrderEventIdOnProductionModule | null
    }) {

        const { userId, productionModuleId, productionModuleEventId } = params;

        const eventPermission = UserPermission.create(
            new UserPermissionId(16),
            new UserPermissionLabel('Crear OCR')
        );

        const userPermissionValidation = new UserPermissionValidator(this.userPermissionsRepository);

        await userPermissionValidation.execute({
            userId: userId,
            useCasePermission: eventPermission
        });

        const productionModuleFounded = await this.productionModuleRepository.find(productionModuleId);

        if (productionModuleFounded === null || productionModuleFounded === undefined)
            throw new Error('El modulo solicitado no existe');


        if (productionModuleEventId) {
            const productionModuleEventFound = await this.productionModuleEventRepository.find(productionModuleEventId);

            if (productionModuleEventFound === null || productionModuleEventFound === undefined)
                throw new Error('El evento que se intenta ingresar no existe');
        }
    }
}