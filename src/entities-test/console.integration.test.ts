import { CountingRecordsOrderFirstQualityCreator } from "../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CountingRecordsOrderFirstQualityCreator";
import { CreateCountingRecordsOrderFirstQualityCommandHandler } from "../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CreateCountingRecordsOrderFirstQualityCommandHandler";
import { InMemoryCreateCountingRecordsOrderOneCommandRepository } from "../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryCreateCountingRecordsOrderOneCommandRepository";
import { InMemoryProductionOrderQueryRepository } from "../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderQueryRepository";
import { CreateCountingRecordsOrderFirstQualityCommand } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/data-transfer-objects/CreateCountingRecordsOrderFirstQualityCommand'
import { CreateCountingRecordsOrderFirstQualityValidator } from "../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CreateCountingRecordsOrderFirstQualityValidator";
import { InMemoryProductionModuleQueryRepository } from "../contexts/SewingProductionAreaManagement/ProductionModule/infrastructure/InMemory/InMemoryProductionModuleQueryRepository";
import { InMemoryUserPermissionRepository } from "../contexts/SewingProductionAreaManagement/UserPermission/infrastructure/InMemory/InMemoryUserPermissionRepository";

const validator = new CreateCountingRecordsOrderFirstQualityValidator(
    new InMemoryUserPermissionRepository(),
    new InMemoryProductionModuleQueryRepository(),
)

const createCountingRecordsOrderCommandRepository = new InMemoryCreateCountingRecordsOrderOneCommandRepository();
const countingRecordsOrderQueryRepository = new InMemoryProductionOrderQueryRepository();
const countingRecordsOrderCreator = new CountingRecordsOrderFirstQualityCreator(countingRecordsOrderQueryRepository, createCountingRecordsOrderCommandRepository);
const commandHandler = new CreateCountingRecordsOrderFirstQualityCommandHandler(countingRecordsOrderCreator, validator);
const countingRecordsOrderCommand = new CreateCountingRecordsOrderFirstQualityCommand([
    {
        id: 'sasa-asde-gthy-asas-rvdv',
        productionOrderId: 'MOB3547',
        colorId: '1302',
        garmentSize: '36',
        initialTime: '01:21:41',
        finalTime: '02:24:1',
        userId: '1146441925',
        productionModuleId: 1,
        amount: 60,
        scheduelId: 1,
        eventOnProductionModule: null,
        eventOnCountingRecordsOrder: []
    },
    {
        id: 'sasa-asde-gthy-asas-rvdi',
        productionOrderId: 'MOB3547',
        colorId: '1302',
        garmentSize: '36',
        initialTime: '01:21:41',
        finalTime: '02:24:14',
        userId: '1146441925',
        productionModuleId: 1,
        amount: 60,
        scheduelId: 1,
        eventOnProductionModule: null,
        eventOnCountingRecordsOrder: []
    },
    {
        id: 'sasa-asde-gthy-asas-rvdx',
        productionOrderId: 'MOB3547',
        colorId: '1302',
        garmentSize: '38',
        initialTime: '01:21:41',
        finalTime: '02:24:14',
        userId: '1146441925',
        productionModuleId: 1,
        amount: 60,
        scheduelId: 1,
        eventOnProductionModule: null,
        eventOnCountingRecordsOrder: []
    }

])

commandHandler.handle(countingRecordsOrderCommand)

// countingRecordsOrderQueryRepository.find(new ProductionOrderId('MOB3547')).then(res => console.log(res?.toPrimitives()))