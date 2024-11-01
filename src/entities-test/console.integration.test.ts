import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate'
import { containerPromise } from '../server/Authentication/dependency-inyection/'
import { ProductionOrderDetailQueryHandler } from '../contexts/SewingProductionAreaManagement/ProductionOrderDetail/application/use-cases/Find/ProductionOrderDetailQueryHandler';
import { FindProductionOrderDetailQuery } from '../contexts/SewingProductionAreaManagement/ProductionOrderDetail/application/use-cases/Find/FindProductionOrderDetailQuery';
import { JWTAuthenticationTokenService } from '../contexts/Authentication/AuthenticationToken/infrastructure/Services/JWT/JWTAuthenticationTokenService';

async function request() {
    try {
        const container = await containerPromise;
        const service = container.get<JWTAuthenticationTokenService>('Authentication.infrastructure.Token.JWTAuthenticationTokenService')
        
    } catch (error) { console.log(error) }
}

request();