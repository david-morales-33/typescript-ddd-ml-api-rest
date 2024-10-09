import { WebServiceEAN } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Services/WebService/WebServiceEAN';
import { WebServiceProductionOrder } from '../../../../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Services/WebService/WebServiceProductionOrder';
import { container } from '../application'

container.register('SewingProductionAreaManagement.infrastructure.Services.WebServiceProductionOrder', WebServiceProductionOrder);

container.register('SewingProductionAreaManagement.infrastructure.Services.WebServiceEAN', WebServiceEAN);
