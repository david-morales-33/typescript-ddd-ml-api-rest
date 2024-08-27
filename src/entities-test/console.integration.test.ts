// import { CountingRecordsOrderFirstQualityChecked } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityChecked";
// import { CountingRecordsOrderFirstQualityNotChecked } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/Entities/CountingRecordOrderFirstQualityNotChecked";
// import { CountingRecordsOrderSecondQualityChecked } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityChecked";
// import { CountingRecordsOrderSecondQualityNotChecked } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/Entities/CountingRecordOrderSecondQualityNotChecked";
// import { CountingRecordsOrderAmount } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
// import { CountingRecordsOrderEventIdOnProductionModule } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule";
// import { CountingRecordsOrderFinalTime } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderFinalTime";
// import { CountingRecordsOrderId } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
// import { CountingRecordsOrderInitialTime } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderInitialTime";
// import { CountingRecordsOrderProductionScheduleId } from "../src/contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderProductionScheduleId";
// import { ProductionModuleId } from "../src/contexts/SewingProductionAreaManagement/ProductionModule/domain/value-objects/ProductionModuleId";
// import { ProductionOrderInProgress } from "../src/contexts/SewingProductionAreaManagement/ProductionOrder/domain/entities/ProductionOrderInProgress";
// import { ProductionOrderNotStarted } from "../src/contexts/SewingProductionAreaManagement/ProductionOrder/domain/entities/ProductionOrderNotStarted";
// import { ProductionOrderExecutedAmount } from "../src/contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderExecutedAmount";
// import { ProductionOrderId } from "../src/contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderId";
// import { ProductionOrderPlannedAmount } from "../src/contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderPlannedAmount";
// import { ProductionOrderProcessStartDate } from "../src/contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderProcessStartDate";
// import { ProductionOrderRecordsCheckedCounter } from "../src/contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderRecordsCheckedCounter";
// import { ProductionOrderRecordsCounter } from "../src/contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderRecordsCounter";
// import { ProductionOrderReference } from "../src/contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderReference";
// import { ProductionOrderDetailInProgress } from "../src/contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/entities/ProductionOrderDetailInProgress";
// import { ProductionOrderDetailNotStarted } from "../src/contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
// import { ProductionOrderDetailExecutedAmount } from "../src/contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailExecutedAmount";
// import { ProductionOrderDetailPlannedAmount } from "../src/contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailPlannedAmount";
// import { ProductionOrderDetailProcessStartDate } from "../src/contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailProcessStartDate";
// import { ProductionOrderDetailRecordsOrederCheckedCounter } from "../src/contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailRecordsOrederCheckedCounter";
// import { ProductionOrderDetailRecordsOrederCounter } from "../src/contexts/SewingProductionAreaManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailRecordsOrederCounter";
// import { BarcodeEan } from "../src/contexts/SewingProductionAreaManagement/Shared/domain/value-object/BarcodeEan";
// import { ColorId } from "../src/contexts/SewingProductionAreaManagement/Shared/domain/value-object/ColorId";
// import { CreationDate } from "../src/contexts/SewingProductionAreaManagement/Shared/domain/value-object/CreationDate";
// import { GarmentSize } from "../src/contexts/SewingProductionAreaManagement/Shared/domain/value-object/GarmentSize";
// import { UserId } from "../src/contexts/SewingProductionAreaManagement/User/domain/value-objects/UserId";

// // const productionOrderNotStarted = new ProductionOrderNotStarted(
// //     new ProductionOrderId('MOB3547'),
// //     new ProductionOrderReference('MAR8546'),
// //     new ProductionOrderPlannedAmount(100),
// //     new ProductionOrderExecutedAmount(0),
// //     null,
// //     new ProductionOrderRecordsCounter(0),
// //     new UserId('11446441925'),
// //     []
// // )


// // const productionOrderDetailNotStarted2 = new ProductionOrderDetailNotStarted(
// //     new ProductionOrderId('MOB3547'),
// //     new ColorId('1302'),
// //     new GarmentSize('36'),
// //     new BarcodeEan('7704666565678'),
// //     new ProductionOrderDetailPlannedAmount(100),
// //     new ProductionOrderDetailExecutedAmount(0),
// //     null,
// //     new ProductionOrderDetailRecordsOrederCounter(0),
// //     []
// // )
// // const productionOrderDetailNotStarted3 = new ProductionOrderDetailNotStarted(
// //     new ProductionOrderId('MOB3547'),
// //     new ColorId('1302'),
// //     new GarmentSize('38'),
// //     new BarcodeEan('7704666565679'),
// //     new ProductionOrderDetailPlannedAmount(150),
// //     new ProductionOrderDetailExecutedAmount(0),
// //     null,
// //     new ProductionOrderDetailRecordsOrederCounter(0),
// //     []
// // )

// // const countingRecordsOrder1 = new CountingRecordsOrderFirstQualityNotChecked(
// //     new CountingRecordsOrderId(1),
// //     new ProductionOrderId('MOB3547'),
// //     new ColorId('1302'),
// //     new GarmentSize('34'),
// //     new CountingRecordsOrderInitialTime('10:21:31'),
// //     new CountingRecordsOrderFinalTime('11:21:31'),
// //     new CountingRecordsOrderAmount(20),
// //     new ProductionModuleId(6),
// //     new CountingRecordsOrderProductionScheduleId(1),
// //     new CountingRecordsOrderEventIdOnProductionModule('08'),
// //     new CreationDate(new Date('2024-07-01')),
// //     new UserId('11446441925'),
// //     []
// // )
// // const countingRecordsOrder2 = new CountingRecordsOrderFirstQualityNotChecked(
// //     new CountingRecordsOrderId(105),
// //     new ProductionOrderId('MOB3547'),
// //     new ColorId('1302'),
// //     new GarmentSize('34'),
// //     new CountingRecordsOrderInitialTime('10:21:31'),
// //     new CountingRecordsOrderFinalTime('11:21:31'),
// //     new CountingRecordsOrderAmount(30),
// //     new ProductionModuleId(6),
// //     new CountingRecordsOrderProductionScheduleId(1),
// //     new CountingRecordsOrderEventIdOnProductionModule('08'),
// //     new CreationDate(new Date('2024-07-01')),
// //     new UserId('11446441925'),
// //     []
// // )

// // const countingRecordsOrder3 = new CountingRecordsOrderFirstQualityNotChecked(
// //     new CountingRecordsOrderId(15),
// //     new ProductionOrderId('MOB3547'),
// //     new ColorId('1302'),
// //     new GarmentSize('34'),
// //     new CountingRecordsOrderInitialTime('10:21:31'),
// //     new CountingRecordsOrderFinalTime('11:21:31'),
// //     new CountingRecordsOrderAmount(25),
// //     new ProductionModuleId(6),
// //     new CountingRecordsOrderProductionScheduleId(1),
// //     new CountingRecordsOrderEventIdOnProductionModule('08'),
// //     new CreationDate(new Date('2024-07-01')),
// //     new UserId('11446441925'),
// //     []
// // )

// // productionOrderNotStarted.addProductionOrderDetail(productionOrderDetailNotStarted1);
// // productionOrderNotStarted.addProductionOrderDetail(productionOrderDetailNotStarted2);
// // productionOrderNotStarted.addProductionOrderDetail(productionOrderDetailNotStarted3);

// const records1 = [1, 2, 3, 4, 5, 6, 7]
// const records2 = [10, 20, 30, 40, 50, 60, 70]

// const productionOrderDetailInProgress1 = new ProductionOrderDetailInProgress(
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('34'),
//     new BarcodeEan('7704666565677'),
//     new ProductionOrderDetailPlannedAmount(100),
//     new ProductionOrderDetailExecutedAmount(20),
//     new ProductionOrderDetailProcessStartDate(new Date()),
//     records1.map(entry => new CountingRecordsOrderId(entry)),
//     []
// );

// const productionOrderDetailInProgress2 = new ProductionOrderDetailInProgress(
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('36'),
//     new BarcodeEan('7704666565677'),
//     new ProductionOrderDetailPlannedAmount(100),
//     new ProductionOrderDetailExecutedAmount(20),
//     new ProductionOrderDetailProcessStartDate(new Date()),
//     records2.map(entry => new CountingRecordsOrderId(entry)),
//     []
// );



// // const productionOrderDetailNotStarted2 = new ProductionOrderDetailNotStarted(
// //     new ProductionOrderId('MOB3547'),
// //     new ColorId('1302'),
// //     new GarmentSize('36'),
// //     new BarcodeEan('7704666565678'),
// //     new ProductionOrderDetailPlannedAmount(100),
// //     new ProductionOrderDetailExecutedAmount(0),
// //     null,
// //     new ProductionOrderDetailRecordsOrederCounter(0),
// //     []
// // )

// const productionOrderDetailNotStarted1 = new ProductionOrderDetailNotStarted(
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('32'),
//     new BarcodeEan('7704666565677'),
//     new ProductionOrderDetailPlannedAmount(100)
// );
// const productionOrderDetailNotStarted2 = new ProductionOrderDetailNotStarted(
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('32'),
//     new BarcodeEan('7704666565677'),
//     new ProductionOrderDetailPlannedAmount(150)
// );
// const productionOrderDetailNotStarted3 = new ProductionOrderDetailNotStarted(
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('32'),
//     new BarcodeEan('7704666565677'),
//     new ProductionOrderDetailPlannedAmount(150)
// );

// const productionOrderNotStarted = new ProductionOrderNotStarted(
//     new ProductionOrderId('MOB3547'),
//     new ProductionOrderReference('MAR8546'),
//     new UserId('11446441925'),
//     [
//         productionOrderDetailNotStarted1,
//         productionOrderDetailNotStarted2,
//         productionOrderDetailNotStarted3  
//     ]
// )

// const productionOrderInProgress = new ProductionOrderInProgress(
//     new ProductionOrderId('MOB3547'),
//     new ProductionOrderReference('MAR8546'),
//     new ProductionOrderProcessStartDate(new Date()),
//     new UserId('11446441925'),
//     [
//         productionOrderDetailInProgress1, 
//         productionOrderDetailInProgress2, 
//         productionOrderDetailNotStarted1,
//         productionOrderDetailNotStarted2,
//     ]
// )

// const countingRecordsOrder = new CountingRecordsOrderFirstQualityNotChecked(
//     new CountingRecordsOrderId(370),
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('32'),
//     new CountingRecordsOrderInitialTime('10:21:31'),
//     new CountingRecordsOrderFinalTime('11:21:31'),
//     new CountingRecordsOrderAmount(45),
//     new ProductionModuleId(6),
//     new CountingRecordsOrderProductionScheduleId(1),
//     new CountingRecordsOrderEventIdOnProductionModule('08'),
//     new CreationDate(new Date('2024-07-01')),
//     new UserId('11446441925'),
//     []
// );

// const countingRecordsOrderSecond = new CountingRecordsOrderSecondQualityNotChecked(
//     new CountingRecordsOrderId(370),
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('32'),
//     new CountingRecordsOrderAmount(33),
//     new ProductionModuleId(6),
//     new CountingRecordsOrderProductionScheduleId(1),
//     new CreationDate(new Date('2024-07-01')),
//     new UserId('11446441925')
// );

// const countingRecordsOrderChecked = new CountingRecordsOrderFirstQualityChecked(
//     new CountingRecordsOrderId(370),
//     new ProductionOrderId('MOB3547'),
//     new ColorId('1302'),
//     new GarmentSize('32'),
//     new CountingRecordsOrderInitialTime('10:21:31'),
//     new CountingRecordsOrderFinalTime('11:21:31'),
//     new CountingRecordsOrderAmount(45),
//     new ProductionModuleId(6),
//     new CountingRecordsOrderProductionScheduleId(1),
//     new CountingRecordsOrderEventIdOnProductionModule('08'),
//     new CreationDate(new Date()),
//     new CreationDate(new Date()),
//     new UserId('11446441925'),
//     new UserId('11446441925'),
//     []
// )


// // productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrder1);
// // productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrder2);
// // productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrder3);
// // productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrder4);

// // console.log(productionOrderInProgress.toPrimitives())
// productionOrderInProgress.addCountingRecordsOrder(countingRecordsOrderSecond)
// // productionOrderNotStarted.addCountingRecordsOrder(countingRecordsOrderChecked);

// // productionOrderDetailNotStarted3.addCountingRecordOrder(countingRecordsOrder1);
// // productionOrderDetailNotStarted3.addCountingRecordOrder(countingRecordsOrder2);
// // productionOrderDetailNotStarted3.addCountingRecordOrder(countingRecordsOrder3);

// console.log('holaats')