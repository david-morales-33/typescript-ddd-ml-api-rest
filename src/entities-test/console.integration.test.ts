import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application'
import { SQLServerProductionOrderResponseRepository } from '../contexts/SewingProductionAreaManagement/ProductionOrder/infrastructure/Persistence/SQLServer/SQLServerProductionOrderResponseRepository'
import { Criteria } from '../contexts/Shared/domain/design-patterns/Criteria/Criteria'
import { Filters } from '../contexts/Shared/domain/design-patterns/Criteria/Filters'
import { Order } from '../contexts/Shared/domain/design-patterns/Criteria/Order'
import { CountingRecordsOrderId } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId'
import { FilterByOpType } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/filters/FilterByOpType'
import { ProductionOrderId } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/value-objects/ProductionOrderId'
import { Filter } from '../contexts/Shared/domain/design-patterns/Criteria/Filter'
import { FilterField } from '../contexts/Shared/domain/design-patterns/Criteria/FilterField'
import { FilterOperator, Operator } from '../contexts/Shared/domain/design-patterns/Criteria/FilterOperator'
import { FilterValue } from '../contexts/SewingProductionAreaManagement/Shared/domain/design-patterns/Criteria/FilterValue'

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

        const id = new ProductionOrderId('MOP4399')

        const res = await container.get<SQLServerProductionOrderResponseRepository>('SewingProductionAreaManagement.infrastructure.ProductionOrder.SQLServerProductionOrderResponseRepository').find(id)
        console.log(res)

    } catch (error) {
        console.log(error)
    }
}

query();
