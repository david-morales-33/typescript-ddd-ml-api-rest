import { v4 as uuid } from 'uuid';
import { container } from '../server/Platforms/dependency-inyection/application';
import { SQLServerOperationRepository } from '../contexts/PlatformsManagement/Operation/infrastructure/Persistence/SQLServer/SQLServerOperationRepository';
import { Criteria } from '../contexts/Shared/domain/design-patterns/Criteria/Criteria';
import { Filters } from '../contexts/Shared/domain/design-patterns/Criteria/Filters';
import { Order } from '../contexts/Shared/domain/design-patterns/Criteria/Order';
import { OrderBy } from '../contexts/Shared/domain/design-patterns/Criteria/OrderBy';
import { OrderType, OrderTypes } from '../contexts/Shared/domain/design-patterns/Criteria/OrderType';
import { Filter } from '../contexts/Shared/domain/design-patterns/Criteria/Filter';
import { FilterField } from '../contexts/Shared/domain/design-patterns/Criteria/FilterField';
import { FilterOperator, Operator } from '../contexts/Shared/domain/design-patterns/Criteria/FilterOperator';
import { FilterValue } from '../contexts/Shared/domain/design-patterns/Criteria/FilterValue';
import { SQLServerMenuRepository } from '../contexts/PlatformsManagement/Menu/infrastructure/Persistence/SQLServer/SQLServerMenuRepository';

async function query() {
    try {
        
        const criterio = new Criteria(
            new Filters([
                new Filter(
                    new FilterField('ptf_id'),
                    new FilterOperator(Operator.EQUAL),
                    new FilterValue('2')
                ),
                new Filter(
                    new FilterField('prf_id'),
                    new FilterOperator(Operator.EQUAL),
                    new FilterValue('1')
                ),
            ]), 
            new Order(
                new OrderBy('asc'),
                new OrderType(OrderTypes.ASC)
            )
        )
        const res = await container.get<SQLServerMenuRepository>('PlatformManagement.infrastructure.menu.SqlServerMenuRepository').match(criterio);
        console.log(res)
    } catch (error) { console.log(error) }
}

query();

// console.log(validate('55575788-6c23-4d62-ba353-05226891149'))

