import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application'
import { SQLServerCountingOrderRecordsRepository } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/persistence/SQLServer/SQLServerCountingOrderRecordsRepository'
import { CountingRecordsOrderPersistenceDTO } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/persistence/data-transfer-objects/CountingRecordsOrderPersistenceDTO'
import { Criteria } from '../contexts/Shared/domain/design-patterns/Criteria/Criteria'
import { Filters } from '../contexts/Shared/domain/design-patterns/Criteria/Filters'
import { FilterField } from '../contexts/Shared/domain/design-patterns/Criteria/FilterField'
import { Order } from '../contexts/Shared/domain/design-patterns/Criteria/Order'

async function query() {
    try {
        const filtros = Filters.fromValues([
            // new Map([
            //     ['field', 'ocr_id'], 
            //     ['operator', '='], 
            //     ['value', 'ssrthgff-dffdfd-rfgtrfgtf-fdrtgf']
            // ]),
            new Map([
                ['field', 'op'], 
                ['operator', 'CONTAINS'], 
                ['value', 'MOB%']
            ]),
            new Map([
                ['field', 'cantidad_registros'], 
                ['operator', '>'], 
                ['value', '63']
            ]),
        ]);

        const orden = Order.fromValues();
        const criterio = new Criteria(filtros, orden)

        container.get<SQLServerCountingOrderRecordsRepository>('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.SqlServerCountingOrderRecordsRepository').match(criterio)

    } catch (error) {
        console.log(error)
    }
}

query();
