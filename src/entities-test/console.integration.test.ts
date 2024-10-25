import { v4 as uuid } from 'uuid';
import { ProductionOrder } from '../contexts/SharedAdministrativeManagement/ProductionOrder/domain/entities/ProductionOrder';
import { ProductionOrderId } from '../contexts/Shared/domain/value-object/ProductionOrderId';
import { ReferenceId } from '../contexts/Shared/domain/value-object/ReferenceId';
import { ProductionOrderGarmentType } from '../contexts/SharedAdministrativeManagement/ProductionOrder/domain/value-objects/ProductionOrderGarmentType';
import { CreationDate } from '../contexts/Shared/domain/value-object/CreationDate';
import { ProductionOrderProccessState } from '../contexts/SharedAdministrativeManagement/ProductionOrder/domain/value-objects/ProductionOrderProccessState';
import { ProductionOrderType } from '../contexts/SharedAdministrativeManagement/Shared/domain/value-objects/ProductionOrderType';
import { ProductionModuleId } from '../contexts/SharedAdministrativeManagement/ProductionOrderSewingProcess/domain/value-objects/ProductionModuleId';
import { ProductionOrderProcessStartDatePlanned } from '../contexts/Shared/domain/value-object/ProductionOrderProcessStartDatePlanned';
import { ProductionOrderProcessEndDatePlanned } from '../contexts/Shared/domain/value-object/ProductionOrderProcessEndDatePlanned';
import { ProductionOrderPlannedAmount } from '../contexts/Shared/domain/value-object/ProductionOrderPlannedAmount';

const order = new ProductionOrder(
    new ProductionOrderId('MOP4245'),
    new ReferenceId('MAR8582'),
    new ProductionOrderGarmentType('MOP'),
    new ProductionOrderPlannedAmount(1500),
    new CreationDate(new Date()),
    new ProductionOrderProccessState(4)
);

order.plannedSewingProccess(
    new ProductionOrderType('MOP'),
    new ProductionModuleId(2),
    new ProductionOrderProcessStartDatePlanned(new Date()),
    new ProductionOrderProcessEndDatePlanned(new Date())
)

console.log(order.toPrimitives())