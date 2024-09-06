import { InMemoryProductionOrderQueryRepository } from "../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderQueryRepository";
import { InMemoryCreateCountingRecordsOrderTwoCommandRepository } from "../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryCreateCountingRecordsOrderTwoCommandRepository";
import { CountingRecordsOrderSecondQualityCreator } from "../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderSecondQuality/CountingRecordsOrderSecondQualityCreator";
import { CreateCountingRecordsOrderSecondQualityCommandHandler } from "../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderSecondQuality/CreateCountingRecordsOrderSecondQualityCommandHandler";
import {CreateCountingRecordsOrderSecondQualityCommand } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/data-transfer-objects/CreateCountingRecordsOrderSecondQualityCommand'
import { CreateCountingRecordsOrderSecondQualityValidator } from "../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderSecondQuality/CreateCountingRecordsOrderSecondQualityValidator";
import { InMemoryUserPermissionRepository } from "../contexts/SewingProductionAreaManagement/UserPermission/infrastructure/InMemory/InMemoryUserPermissionRepository";
import { InMemoryProductionModuleQueryRepository } from "../contexts/SewingProductionAreaManagement/ProductionModule/infrastructure/InMemory/InMemoryProductionModuleQueryRepository";


const validator = new CreateCountingRecordsOrderSecondQualityValidator(
    new InMemoryUserPermissionRepository(),
    new InMemoryProductionModuleQueryRepository()
)

const countingRecordsOrderCreator = new CountingRecordsOrderSecondQualityCreator(
    new InMemoryProductionOrderQueryRepository(),
    new InMemoryCreateCountingRecordsOrderTwoCommandRepository()
)
const commandHandler = new CreateCountingRecordsOrderSecondQualityCommandHandler(
    countingRecordsOrderCreator,
    validator
);

const countingRecordsOrderCommand = new CreateCountingRecordsOrderSecondQualityCommand([
    {
        id: 'sasa-asde-gthy-asas-rvdv',
        productionOrderId: 'MOB3547',
        colorId: '1302',
        garmentSize: '36',
        userId: '1146441925',
        productionModuleId: 1,
        amount: 60,
    },
    {
        id: 'sasa-asde-gthy-asas-rvds',
        productionOrderId: 'MOB3547',
        colorId: '1302',
        garmentSize: '38',
        userId: '1146441925',
        productionModuleId: 1,
        amount: 40,
    },
])

commandHandler.handle(countingRecordsOrderCommand);