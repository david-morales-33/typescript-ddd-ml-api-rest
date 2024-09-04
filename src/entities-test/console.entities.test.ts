import { CountingRecordsOrderFirstQualityNotChecked } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/entities/CountingRecordOrderFirstQualityNotChecked"
import { CountingRecordsOrderAmount } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount"
import { CountingRecordsOrderEventIdOnProductionModule } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule"
import { CountingRecordsOrderFinalTime } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderFinalTime"
import { CountingRecordsOrderId } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId"
import { CountingRecordsOrderInitialTime } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderInitialTime"
import { CountingRecordsOrderProductionScheduleId } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderProductionScheduleId"
import { CountingRecordsOrderEvent } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrderEvent/domain/entities/CountingRecordsOrderEvent"
import { CountingRecordsOrderEventId } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrderEvent/domain/value-objects/CountingRecordsOrderEventId"
import { CountingRecordsOrderEventName } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrderEvent/domain/value-objects/CountingRecordsOrderEventName"
import { ProductionModuleId } from "../contexts/SewingProductionAreaManagement/ProductionModule/domain/value-objects/ProductionModuleId"
import { ProductionOrderNotStarted } from "../contexts/SewingProductionAreaManagement/ProductionOrder/domain/entities/ProductionOrderNotStarted"
import { ProductionOrderId } from "../contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderId"
import { ProductionOrderReference } from "../contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderReference"
import { ProductionOrderDetailNotStarted } from "../contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted"
import { ProductionOrderDetailPlannedAmount } from "../contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailPlannedAmount"
import { BarcodeEan } from "../contexts/SewingProductionAreaManagement/Shared/domain/value-object/BarcodeEan"
import { ColorId } from "../contexts/SewingProductionAreaManagement/Shared/domain/value-object/ColorId"
import { CreationDate } from "../contexts/SewingProductionAreaManagement/Shared/domain/value-object/CreationDate"
import { GarmentSize } from "../contexts/SewingProductionAreaManagement/Shared/domain/value-object/GarmentSize"
import { UserId } from "../contexts/SewingProductionAreaManagement/User/domain/value-objects/UserId"

const event1 = new CountingRecordsOrderEvent(
    new CountingRecordsOrderEventId(''),
    new CountingRecordsOrderEventName('Modificacion de registro'),
    new CountingRecordsOrderAmount(10),
    new CountingRecordsOrderAmount(15),
    new CreationDate(new Date)
)

const event2 = new CountingRecordsOrderEvent(
    new CountingRecordsOrderEventId(''),
    new CountingRecordsOrderEventName('Modificacion de registro'),
    new CountingRecordsOrderAmount(10),
    new CountingRecordsOrderAmount(15),
    new CreationDate(new Date)
)

const countingRecordsOrder1 = new CountingRecordsOrderFirstQualityNotChecked(
    new CountingRecordsOrderId(''),
    new ProductionOrderId('MOB3547'),
    new ColorId('1302'),
    new GarmentSize('36'),
    new CountingRecordsOrderInitialTime('10:21:31'),
    new CountingRecordsOrderFinalTime('11:21:31'),
    new CountingRecordsOrderAmount(25),
    new ProductionModuleId(6),
    new CountingRecordsOrderProductionScheduleId(1),
    new CountingRecordsOrderEventIdOnProductionModule('08'),
    new CreationDate(new Date('2024-07-01')),
    new UserId('11446441925'),
    []
)
const countingRecordsOrder2 = new CountingRecordsOrderFirstQualityNotChecked(
    new CountingRecordsOrderId(''),
    new ProductionOrderId('MOB3547'),
    new ColorId('1302'),
    new GarmentSize('36'),
    new CountingRecordsOrderInitialTime('10:21:31'),
    new CountingRecordsOrderFinalTime('11:21:31'),
    new CountingRecordsOrderAmount(25),
    new ProductionModuleId(6),
    new CountingRecordsOrderProductionScheduleId(1),
    new CountingRecordsOrderEventIdOnProductionModule('08'),
    new CreationDate(new Date('2024-07-01')),
    new UserId('11446441925'),
    []
)

const productionOrderDetailNotStarted1 = new ProductionOrderDetailNotStarted(
    new ProductionOrderId('MOB3547'),
    new ColorId('1302'),
    new GarmentSize('36'),
    new BarcodeEan('7704666565678'),
    new ProductionOrderDetailPlannedAmount(200)
)

const productionOrderNotStarted = new ProductionOrderNotStarted(
    new ProductionOrderId('MOB3547'),
    new ProductionOrderReference('MAR8546'),
    new UserId('11446441925'),
    [productionOrderDetailNotStarted1]
);

// productionOrderNotStarted.addCountingRecordsOrder(countingRecordsOrder1)
// productionOrderNotStarted.addCountingRecordsOrder(countingRecordsOrder2)

console.log(productionOrderNotStarted.toPrimitives())