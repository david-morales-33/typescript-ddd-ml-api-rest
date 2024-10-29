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

