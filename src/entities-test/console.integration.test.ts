import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application'
import { SQLServerCountingOrderRecordsRepository } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/persistence/SQLServer/SQLServerCountingOrderRecordsRepository'
import { Criteria } from '../contexts/Shared/domain/design-patterns/Criteria/Criteria'
import { Filters } from '../contexts/Shared/domain/design-patterns/Criteria/Filters'
import { Order } from '../contexts/Shared/domain/design-patterns/Criteria/Order'
import { CountingRecordsOrderId } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId'
import { FilterByOpType } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/filters/FilterByOpType'

async function query() {
    try {
        const filtros =  new Filters([
            new FilterByOpType('MOB%')
        ])
        const orden = Order.fromValues();
        const criterio = new Criteria(filtros, orden)

        const id = new CountingRecordsOrderId(CountingRecordsOrderId.random().value)

        const res = await container.get<SQLServerCountingOrderRecordsRepository>('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.SqlServerCountingOrderRecordsRepository').match(criterio)
        console.log(res)

    } catch (error) {
        console.log(error)
    }
}

query();
