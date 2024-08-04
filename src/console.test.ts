import { CountingRecordsOrderFirstQualityNotChecked } from "./contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityNotChecked";
import { CountingRecordsOrderAmount } from "./contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
import { CountingRecordsOrderEventIdOnProductionModule } from "./contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule";
import { CountingRecordsOrderFinalTime } from "./contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderFinalTime";
import { CountingRecordsOrderId } from "./contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
import { CountingRecordsOrderInitialTime } from "./contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderInitialTime";
import { CountingRecordsOrderProductionScheduleId } from "./contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderProductionScheduleId";
import { ProductionModuleId } from "./contexts/SewingProductionAreaManagement/ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionOrderInProgress } from "./contexts/SewingProductionAreaManagement/ProductionOrder/domain/entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "./contexts/SewingProductionAreaManagement/ProductionOrder/domain/entities/ProductionOrderNotStarted";
import { ProductionOrderExecutedAmount } from "./contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "./contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "./contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderPlannedAmount";
import { ProductionOrderProcessStartDate } from "./contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderProcessStartDate";
import { ProductionOrderRecordsCheckedCounter } from "./contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderRecordsCheckedCounter";
import { ProductionOrderRecordsCounter } from "./contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderRecordsCounter";
import { ProductionOrderReference } from "./contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderReference";
import { ProductionOrderDetailInProgress } from "./contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/entities/ProductionOrderDetailInProgress";
import { ProductionOrderDetailNotStarted } from "./contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderDetailExecutedAmount } from "./contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailExecutedAmount";
import { ProductionOrderDetailPlannedAmount } from "./contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailPlannedAmount";
import { ProductionOrderDetailProcessStartDate } from "./contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailProcessStartDate";
import { ProductionOrderDetailRecordsOrederCheckedCounter } from "./contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailRecordsOrederCheckedCounter";
import { ProductionOrderDetailRecordsOrederCounter } from "./contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailRecordsOrederCounter";
import { BarcodeEan } from "./contexts/SewingProductionAreaManagement/Shared/domain/value-object/BarcodeEan";
import { ColorId } from "./contexts/SewingProductionAreaManagement/Shared/domain/value-object/ColorId";
import { CreationDate } from "./contexts/SewingProductionAreaManagement/Shared/domain/value-object/CreationDate";
import { GarmentSize } from "./contexts/SewingProductionAreaManagement/Shared/domain/value-object/GarmentSize";
import { UserId } from "./contexts/SewingProductionAreaManagement/Shared/domain/value-object/UserId";

// const productionOrderNotStarted = new ProductionOrderNotStarted(
//     new ProductionOrderId('MOB3547'),
//     new ProductionOrderReference('MAR8546'),
//     new ProductionOrderPlannedAmount(100),
//     new ProductionOrderExecutedAmount(0),
//     null,
//     new ProductionOrderRecordsCounter(0),
//     new UserId('11446441925'),
//     []
// )


// const productionOrderDetailNotStarted2 = new ProductionOrderDetailNotStarted(
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('36'),
//     new BarcodeEan('7704666565678'),
//     new ProductionOrderDetailPlannedAmount(100),
//     new ProductionOrderDetailExecutedAmount(0),
//     null,
//     new ProductionOrderDetailRecordsOrederCounter(0),
//     []
// )
// const productionOrderDetailNotStarted3 = new ProductionOrderDetailNotStarted(
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('38'),
//     new BarcodeEan('7704666565679'),
//     new ProductionOrderDetailPlannedAmount(150),
//     new ProductionOrderDetailExecutedAmount(0),
//     null,
//     new ProductionOrderDetailRecordsOrederCounter(0),
//     []
// )

// const countingRecordsOrder1 = new CountingRecordsOrderFirstQualityNotChecked(
//     new CountingRecordsOrderId(1),
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('34'),
//     new CountingRecordsOrderInitialTime('10:21:31'),
//     new CountingRecordsOrderFinalTime('11:21:31'),
//     new CountingRecordsOrderAmount(20),
//     new ProductionModuleId(6),
//     new CountingRecordsOrderProductionScheduleId(1),
//     new CountingRecordsOrderEventIdOnProductionModule('08'),
//     new CreationDate(new Date('2024-07-01')),
//     new UserId('11446441925'),
//     []
// )
// const countingRecordsOrder2 = new CountingRecordsOrderFirstQualityNotChecked(
//     new CountingRecordsOrderId(105),
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('34'),
//     new CountingRecordsOrderInitialTime('10:21:31'),
//     new CountingRecordsOrderFinalTime('11:21:31'),
//     new CountingRecordsOrderAmount(30),
//     new ProductionModuleId(6),
//     new CountingRecordsOrderProductionScheduleId(1),
//     new CountingRecordsOrderEventIdOnProductionModule('08'),
//     new CreationDate(new Date('2024-07-01')),
//     new UserId('11446441925'),
//     []
// )
// const countingRecordsOrder3 = new CountingRecordsOrderFirstQualityNotChecked(
//     new CountingRecordsOrderId(15),
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('34'),
//     new CountingRecordsOrderInitialTime('10:21:31'),
//     new CountingRecordsOrderFinalTime('11:21:31'),
//     new CountingRecordsOrderAmount(25),
//     new ProductionModuleId(6),
//     new CountingRecordsOrderProductionScheduleId(1),
//     new CountingRecordsOrderEventIdOnProductionModule('08'),
//     new CreationDate(new Date('2024-07-01')),
//     new UserId('11446441925'),
//     []
// )


// productionOrderNotStarted.addProductionOrderDetail(productionOrderDetailNotStarted1);
// productionOrderNotStarted.addProductionOrderDetail(productionOrderDetailNotStarted2);
// productionOrderNotStarted.addProductionOrderDetail(productionOrderDetailNotStarted3);

const productionOrderDetailNotStarted1 = new ProductionOrderDetailNotStarted(
    new ProductionOrderId('MOB3547'),
    new ColorId('1302'),
    new GarmentSize('32'),
    new BarcodeEan('7704666565677'),
    new ProductionOrderDetailPlannedAmount(100),
    new ProductionOrderDetailExecutedAmount(0),
    new ProductionOrderDetailRecordsOrederCounter(0)
);

const productionOrderDetailInProgress1 = new ProductionOrderDetailInProgress(
    new ProductionOrderId('MOB3547'),
    new ColorId('1302'),
    new GarmentSize('34'),
    new BarcodeEan('7704666565677'),
    new ProductionOrderDetailPlannedAmount(100),
    new ProductionOrderDetailExecutedAmount(20),
    new ProductionOrderDetailProcessStartDate(new Date()),
    new ProductionOrderDetailRecordsOrederCounter(0),
    new ProductionOrderDetailRecordsOrederCheckedCounter(0),
    [
        new CountingRecordsOrderId(1),
        new CountingRecordsOrderId(105),
        new CountingRecordsOrderId(34),
        new CountingRecordsOrderId(35),
        new CountingRecordsOrderId(36),
        new CountingRecordsOrderId(37)
    ],
    [
        new CountingRecordsOrderId(1),
        new CountingRecordsOrderId(105)
    ]
);

const productionOrderDetailInProgress2 = new ProductionOrderDetailInProgress(
    new ProductionOrderId('MOB3547'),
    new ColorId('1302'),
    new GarmentSize('36'),
    new BarcodeEan('7704666565677'),
    new ProductionOrderDetailPlannedAmount(100),
    new ProductionOrderDetailExecutedAmount(20),
    new ProductionOrderDetailProcessStartDate(new Date()),
    new ProductionOrderDetailRecordsOrederCounter(0),
    new ProductionOrderDetailRecordsOrederCheckedCounter(0),
    [
        new CountingRecordsOrderId(2),
        new CountingRecordsOrderId(3),
        new CountingRecordsOrderId(4),
        new CountingRecordsOrderId(5),
        new CountingRecordsOrderId(6),
        new CountingRecordsOrderId(7)
    ],
    [
        new CountingRecordsOrderId(2),
        new CountingRecordsOrderId(3),
        new CountingRecordsOrderId(5),
    ]
);

const productionOrderInProgress = new ProductionOrderInProgress(
    new ProductionOrderId('MOB3547'),
    new ProductionOrderReference('MAR8546'),
    new ProductionOrderPlannedAmount(400),
    new ProductionOrderExecutedAmount(0),
    new ProductionOrderProcessStartDate(new Date()),
    new UserId('11446441925'),
    [
        productionOrderDetailInProgress1,
        productionOrderDetailInProgress2,
        productionOrderDetailNotStarted1
    ],
)

const countingRecordsOrder4 = new CountingRecordsOrderFirstQualityNotChecked(
    new CountingRecordsOrderId(37),
    new ProductionOrderId('MOB3547'),
    new ColorId('1302'),
    new GarmentSize('32'),
    new CountingRecordsOrderInitialTime('10:21:31'),
    new CountingRecordsOrderFinalTime('11:21:31'),
    new CountingRecordsOrderAmount(400),
    new ProductionModuleId(6),
    new CountingRecordsOrderProductionScheduleId(1),
    new CountingRecordsOrderEventIdOnProductionModule('08'),
    new CreationDate(new Date('2024-07-01')),
    new UserId('11446441925'),
    []
)

// productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrder1);
// productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrder2);
// productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrder3);
// productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrder4);

// console.log(productionOrderInProgress.toPrimitives())
// productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrder4)

// productionOrderDetailNotStarted3.addCountingRecordOrder(countingRecordsOrder1);
// productionOrderDetailNotStarted3.addCountingRecordOrder(countingRecordsOrder2);
// productionOrderDetailNotStarted3.addCountingRecordOrder(countingRecordsOrder3);


console.log(productionOrderInProgress.toPrimitives())