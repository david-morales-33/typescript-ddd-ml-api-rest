import { container } from "../server/SewingProductionAreaManagement/dependency-inyection/application";
import { SQLServerCountingOrderRecordsRepository } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/persistence/SQLServer/SQLServerCountingOrderRecordsRepository'
import { CountingRecordsOrderId } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
import { } from 'uuid'
import { SQLServerPoolFactory } from "../contexts/Shared/infrastructure/persistence/SQLServere/SQLServerPoolFactory";
import { SQLServerConfigFactory } from "../contexts/SewingProductionAreaManagement/Shared/infrastructure/persistence/SQLServer/SQLServerConfigFactory";
import { Criteria } from "../contexts/Shared/domain/design-patterns/Criteria/Criteria";
import { Filters } from "../contexts/Shared/domain/design-patterns/Criteria/Filters";
import { Order } from "../contexts/Shared/domain/design-patterns/Criteria/Order";

const repo = container.get<SQLServerCountingOrderRecordsRepository>('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.SqlServerCountingOrderRecordsRepository');

async function query() {
    try {
        // const id = new CountingRecordsOrderId(CountingRecordsOrderId.random().value);
        const filters = Filters.fromValues([]);
        const order = Order.fromValues('asc','asc')
        const criteria = new Criteria(filters,order,0,0)
        await repo.match(criteria)
        // await repo.find(id)
        // const pool = await container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager')

        // const pool = await SQLServerPoolFactory.createPool('SewingProductionAreaManagement',SQLServerConfigFactory.createConfig())
        // console.log(pool)
    } catch (error) {
        console.log(error)
    }
}

query();