import { InMemoryProductionModuleQueryRepository } from "../contexts/SewingProductionAreaManagement/ProductionModule/infrastructure/InMemory/InMemoryProductionModuleQueryRepository";
import { CountingRecordsOrderFirstQualityCreator } from "../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CountingRecordsOrderFirstQualityCreator";
import { CreateCountingRecordsOrderFirstQualityCommandHandler } from "../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CreateCountingRecordsOrderFirstQualityCommandHandler";
import { CreateCountingRecordsOrderFirstQualityValidator } from "../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateCountingRecordsOrderFirstQuality/CreateCountingRecordsOrderFirstQualityValidator";
import { CreateCountingRecordsOrderFirstQualityCommand } from "../contexts/SewingProductionAreaManagement/ProductionOrder/domain/data-transfer-objects/CreateCountingRecordsOrderFirstQualityCommand";
import { InMemoryCreateCountingRecordsOrderOneCommandRepository } from "../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryCreateCountingRecordsOrderOneCommandRepository";
import { InMemoryProductionOrderQueryRepository } from "../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/InMemory/InMemoryProductionOrderQueryRepository";
import { InMemoryUserPermissionRepository } from "../contexts/SewingProductionAreaManagement/UserPermission/infrastructure/InMemory/InMemoryUserPermissionRepository";
import { Uuid } from "../contexts/Shared/domain/value-object/Uuid";

const createCountingRecordsOrderCommandRepository = new InMemoryCreateCountingRecordsOrderOneCommandRepository();
const countingRecordsOrderQueryRepository = new InMemoryProductionOrderQueryRepository();
const countingRecordsOrderCreator = new CountingRecordsOrderFirstQualityCreator(
    countingRecordsOrderQueryRepository,
    createCountingRecordsOrderCommandRepository
);


const userPermission = new InMemoryUserPermissionRepository();
const productionModuleQuery = new InMemoryProductionModuleQueryRepository();
const validator = new CreateCountingRecordsOrderFirstQualityValidator(
    userPermission,
    productionModuleQuery
);

const commandHandler = new CreateCountingRecordsOrderFirstQualityCommandHandler(
    countingRecordsOrderCreator,
    validator
);

const command = new CreateCountingRecordsOrderFirstQualityCommand([
    {
        eventOnCountingRecordsOrder: [],
        eventOnProductionModule: null,
        productionModuleId: 1,
        productionOrderId: 'MOB3547',
        initialTime: '11:21:45',
        garmentSize: '34',
        finalTime: '10:12:21',
        colorId: '1302',
        userId: '114641925',
        amount: 50,
        id: Uuid.random().value,
        scheduelId: 1
    }, {
        id: Uuid.random().value,
        productionModuleId: 1,
        finalTime: '10:12:21',
        initialTime: '11:21:45',
        userId: '114641925',
        productionOrderId: 'MOB3547',
        colorId: '1302',
        garmentSize: '34',
        amount: 80,
        eventOnProductionModule: null,
        eventOnCountingRecordsOrder: [],
        scheduelId: 1
    }, {
        id: Uuid.random().value,
        productionModuleId: 1,
        finalTime: '10:12:21',
        initialTime: '11:21:45',
        userId: '114641925',
        productionOrderId: 'MOB3547',
        colorId: '1302',
        garmentSize: '34',
        amount: 80,
        eventOnProductionModule: null,
        eventOnCountingRecordsOrder: [],
        scheduelId: 1
    }, {
        id: Uuid.random().value,
        productionModuleId: 1,
        finalTime: '10:12:21',
        initialTime: '11:21:45',
        userId: '114641925',
        productionOrderId: 'MOB3547',
        colorId: '1302',
        garmentSize: '34',
        amount: 40,
        eventOnProductionModule: null,
        eventOnCountingRecordsOrder: [],
        scheduelId: 1
    },
]);

commandHandler.handle(command);