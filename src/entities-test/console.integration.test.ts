import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application'
import { Criteria } from '../contexts/Shared/domain/design-patterns/Criteria/Criteria'
import { Filters } from '../contexts/Shared/domain/design-patterns/Criteria/Filters'
import { Order } from '../contexts/Shared/domain/design-patterns/Criteria/Order'
import { CountingRecordsOrderId } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId'
import { FilterByOpType } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/filters/FilterByOpType'
import { ProductionOrderId } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderId'
import { Filter } from '../contexts/Shared/domain/design-patterns/Criteria/Filter'
import { FilterField } from '../contexts/Shared/domain/design-patterns/Criteria/FilterField'
import { FilterOperator, Operator } from '../contexts/Shared/domain/design-patterns/Criteria/FilterOperator'
import { FilterValue } from '../contexts/SewingProductionAreaManagement/Shared/domain/design-patterns/Criteria/FilterValue';
import { SQLServerUserPermission } from '../contexts/SewingProductionAreaManagement/UserPermission/infrastructure/Persistence/SQLServer/SQLServerUserPermission'
import { UserId } from '../contexts/SewingProductionAreaManagement/User/domain/value-objects/UserId'

async function query() {
    try {
        // const filtros =  new Filters([
        //     new FilterByOpType('MOB%')
        // ])

        // const filtros = new Filters([
        //     new Filter(
        //         new FilterField('tpo_proceso_id'),
        //         new FilterOperator(Operator.EQUAL),
        //         new FilterValue('1')
        //     )
        // ])
        // const orden = Order.fromValues();
        // const criterio = new Criteria(filtros, orden)

        const id = new ProductionOrderId('MOB4399')

        const res = await container.get<SQLServerUserPermission>('SewingProductionAreaManagement.infrastructure.UserPermission.SQLServerUserPermission').searchAll(new UserId('1146441925'))
        console.log(res)

    } catch (error) {
        console.log(error)
    }
}

query();
