import { WebServiceProductionOrder } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Services/WebService/WebServiceProductionOrder';
import { container } from '../application'

const inMemoryProductionOrderExternalServiceRepository = container.
    register('SewingProductionAreaManagement.infrastructure.Services.WebServiceProductionOrder', WebServiceProductionOrder);
