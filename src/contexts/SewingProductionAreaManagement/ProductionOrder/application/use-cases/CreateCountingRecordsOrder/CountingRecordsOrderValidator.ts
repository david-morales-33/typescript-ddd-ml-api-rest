import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionModuleRepository } from "../../../../ProductionModule/domain/repositories/ProductionModuleRepository";
import { ProductionModuleEventRepository } from "../../../../ProductionModuleEvent/domain/repositories/ProductionModuleEventRepository";
import { ProductionOrderDetailCommonRepository } from "../../../../ProductionOrderDetail/domain/repositories/ProductionOrderDetailCommonRepository";
import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { CountingRecordsOrderEventIdOnProductionModule } from "../../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule";

export class CountingRecordsOrderValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
        private productionModuleRepository: ProductionModuleRepository,
        private productionModuleEventRepository: ProductionModuleEventRepository,
        private productionOrderDetailRepository: ProductionOrderDetailCommonRepository
    ) { }

    async execute(params: {
        userId: UserId,
        colorId: ColorId,
        productionOrderId: ProductionOrderId,
        garmentSize: GarmentSize,
        productionModuleId: ProductionModuleId,
        productionModuleEventId: CountingRecordsOrderEventIdOnProductionModule
    }) {

        const { userId, productionModuleId, productionModuleEventId, colorId, productionOrderId, garmentSize } = params;

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

        const productionModuleEventFound = await this.productionModuleEventRepository.find(productionModuleEventId);

        if (productionModuleEventFound === null || productionModuleEventFound === undefined)
            throw new Error('El evento que se intenta ingresar no existe');

        const productionOrderDetailFounded = await this.productionOrderDetailRepository.find({ colorId, productionOrderId, garmentSize });

        if (productionOrderDetailFounded === null || productionOrderDetailFounded === undefined)
            throw new Error('El datalle de lo OP en la que está intentado ingresar el registro no existe')

    }
}