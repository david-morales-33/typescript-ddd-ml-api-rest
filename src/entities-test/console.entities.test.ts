import { ProductionOrder } from "../contexts/AdministrativeManagement/ProductionOrder/domain/entities/ProductionOrder";
import { ProductionOrderProcessStartDate } from "../contexts/AdministrativeManagement/ProductionOrder/domain/value-objects/ProductionOrderProcessStartDate";
import { ProductionOrderReference } from "../contexts/AdministrativeManagement/ProductionOrder/domain/value-objects/ProductionOrderReference";
import { ProductionOrderDetail } from "../contexts/AdministrativeManagement/ProductionOrderDetail/domain/entities/ProductionOrderDetaill";
import { ProductionOrderDetailExecutedAmount } from "../contexts/AdministrativeManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailExecutedAmount";
import { ProductionOrderDetailPlannedAmount } from "../contexts/AdministrativeManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailPlannedAmount";
import { ProductionOrderDetailProductionModulePlanned } from "../contexts/AdministrativeManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailProductionModulePlanned";
import { ProductionOrderDetailState } from "../contexts/AdministrativeManagement/ProductionOrderDetail/domain/value-objects/ProductionOrderDetailState";
import { BarcodeEan } from "../contexts/AdministrativeManagement/shared/domain/value-objects/BarcodeEan";
import { ColorId } from "../contexts/AdministrativeManagement/shared/domain/value-objects/ColorId";
import { UserId } from "../contexts/AdministrativeManagement/User/domain/value-objects/UserId";
import { ProductionOrderId } from '../contexts/AdministrativeManagement/shared/domain/value-objects/ProductionOrderId'
import { GarmentSize } from '../contexts/AdministrativeManagement/shared/domain/value-objects/GarmentSize'
import { ProductionOrderState } from "../contexts/AdministrativeManagement/ProductionOrder/domain/value-objects/ProductionOrderState";

const productionOrderDetail = new ProductionOrderDetail(
    new ProductionOrderId('MOP3541'),
    new ColorId('1012'),
    new GarmentSize('XL'),
    new BarcodeEan('1234567891234'), null, null, null, null,
    new ProductionOrderDetailProductionModulePlanned(1),
    new ProductionOrderDetailPlannedAmount(100),
    new ProductionOrderDetailExecutedAmount(0),
    new ProductionOrderDetailState(true), [], [], []
)

const productionOrder = new ProductionOrder(
    new ProductionOrderId('MOP3542'),
    new ProductionOrderReference('MAR8582'),
    new ProductionOrderProcessStartDate(new Date()), null, null, null,
    new UserId('1146441925'),
    new ProductionOrderState(true),
    [productionOrderDetail]
    , []
)

console.log(productionOrder.toPrimitives())